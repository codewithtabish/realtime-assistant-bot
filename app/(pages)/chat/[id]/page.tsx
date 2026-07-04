'use client';
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowLeft, Mic, PhoneOff } from 'lucide-react';
import { agents } from '@/app/data/agents';
import { AgentAvatar } from '@/components/agent-avatar';
import { Orb } from 'orb-ui';
import { Button } from '@/components/ui/button';

export default function ChatPage() {
  const params = useParams();
  const agentId = parseInt(params.id as string);

  const agent = agents.find(a => a.id === agentId);

  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'speaking'>('idle');
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    transcriptRef.current?.scrollTo({
      top: transcriptRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [transcript]);

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-2xl">
        Agent not found
      </div>
    );
  }

  const startConversation = async () => {
    setStatus('connecting');
    setTranscript('');
    setIsSpeaking(false);

    try {
      const res = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instructions: agent.instructions }),
      });

      if (!res.ok) throw new Error('Session creation failed');

      const data = await res.json();
      const ephemeralKey = data.value || data.client_secret?.value;
      if (!ephemeralKey) throw new Error("No ephemeral key received");

      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true },
      });

      stream.getTracks().forEach(track => pc.addTrack(track));

      const audio = new Audio();
      audio.autoplay = true;
      audioRef.current = audio;
      pc.ontrack = (e) => (audio.srcObject = e.streams[0]);

      const dc = pc.createDataChannel("oai-events");

      dc.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);

          if (msg.type === 'input_audio_buffer.speech_started') {
            setIsSpeaking(true);
            setStatus('speaking');
          }
          if (msg.type === 'input_audio_buffer.speech_stopped') {
            setIsSpeaking(false);
            setStatus('connected');
          }

          if (msg.type === 'conversation.item.input_audio_transcription.completed') {
            setTranscript(prev => prev + `\nYou: ${msg.transcript || ''}\n`);
          }
          if (msg.type === 'response.audio_transcript.done') {
            setTranscript(prev => prev + `\n${agent.name}: ${msg.transcript || ''}\n\n`);
          }
        } catch (e) {
          console.error("Parse error", e);
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const sdpResponse = await fetch("https://api.openai.com/v1/realtime/calls", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ephemeralKey}`,
          "Content-Type": "application/sdp",
          Accept: "application/sdp",
        },
        body: offer.sdp,
      });

      const answerSdp = await sdpResponse.text();
      await pc.setRemoteDescription({ type: 'answer', sdp: answerSdp });

      setStatus('connected');
      toast.success(`Connected with ${agent.name}`);
    } catch (err: any) {
      console.error(err);
      setStatus('idle');
      toast.error("Connection Failed", { description: err.message });
    }
  };

  const stopConversation = () => {
    pcRef.current?.close();
    audioRef.current?.pause();
    setStatus('idle');
    setIsSpeaking(false);
    setTranscript('');
  };

  // Fixed Orb State
  const orbState = 
    status === 'speaking' ? 'talking' :
    status === 'connected' ? 'listening' :
    status === 'connecting' ? 'thinking' : 
    undefined;

  return (
    <div className="min-h-screen">
      {/* Top Navigation */}
      <div className="max-w-5xl mx-auto pt-8 px-6 flex items-center justify-between">
        <button 
          onClick={() => window.history.back()} 
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Agents
        </button>
        <div className="text-sm text-zinc-500">Voice Tutor • Real-time</div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-12 pb-24 flex flex-col items-center">
        {/* Main Orb Area */}
        <div className="relative mb-12 flex flex-col items-center">
          <div className="relative">
            <AgentAvatar
              seed={String(agent.id)}
              size={180}
              animated={status !== 'idle'}
              ring={true}
            />
            
            {/* Big Orb */}
            <div className="absolute -inset-12 flex items-center justify-center -z-10">
              <Orb 
                state={orbState as any} 
                theme="circle" 
                size={420}
              />
            </div>
          </div>

          <h1 className="text-5xl font-bold mt-10 tracking-tighter">{agent.name}</h1>
          <p className="text-xl text-zinc-400 mt-2">{agent.voice} • Expert Tutor</p>

          <div className={`mt-6 px-6 py-2 rounded-full text-sm font-medium transition-all ${
            status === 'connected' ? 'bg-green-500/10 text-green-400' : 
            status === 'speaking' ? 'bg-purple-500/10 text-purple-400' : 'bg-zinc-800 text-zinc-400'
          }`}>
            {status === 'idle' && 'Ready to Start'}
            {status === 'connecting' && 'Connecting...'}
            {status === 'connected' && '🟢 Listening'}
            {status === 'speaking' && '🎙️ Speaking'}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Button
            onClick={startConversation}
            disabled={status !== 'idle'}
            size="lg"
            className="flex-1 h-16 text-lg font-semibold rounded-2xl active:scale-95 transition-all"
          >
            <Mic className="mr-3 w-6 h-6" />
            Start Voice Chat
          </Button>

          <Button
            onClick={stopConversation}
            disabled={status === 'idle'}
            variant="destructive"
            size="lg"
            className="flex-1 h-16 text-lg font-semibold rounded-2xl active:scale-95 transition-all"
          >
            <PhoneOff className="mr-3 w-6 h-6" />
            End Session
          </Button>
        </div>
      </div>
    </div>
  );
}