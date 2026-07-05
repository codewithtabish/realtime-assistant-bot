'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Mic, PhoneOff } from 'lucide-react';
import { agents } from '@/app/data/agents';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import Image from 'next/image';

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
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


    const stopConversation = () => {
    pcRef.current?.close();
    audioRef.current?.pause();
    setStatus('idle');
    setIsSpeaking(false);
    setTranscript('');
  };

  useEffect(() => {
  const cleanup = () => {
    stopConversation();
  };

  window.addEventListener("beforeunload", cleanup);
  window.addEventListener("pagehide", cleanup);

  return () => {
    window.removeEventListener("beforeunload", cleanup);
    window.removeEventListener("pagehide", cleanup);

    cleanup();
  };
}, []);

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-2xl overflow-x-hidden overflow-y-hidden">
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



  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-black text-white">
      {/* Top Navigation */}
      <div className="max-w-5xl mx-auto pt-6 px-6 flex items-center justify-between">
        <button 
          onClick={() => {
            stopConversation();
            router.back();
          }} 
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
        >
          <div className="p-2 rounded-full bg-zinc-800 group-hover:bg-zinc-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="font-medium">Back to Agents</span>
        </button>

        <div className="text-sm text-zinc-500">Real-time Voice Tutor</div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-12 pb-24 flex flex-col items-center">
        {/* Agent Info */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative mb-8 flex items-center justify-center">

  {/* OUTER GLOW */}
  <div
    className={`
      absolute rounded-full
      transition-all duration-500
      ${
        status === "idle"
          ? "w-72 h-72 bg-white/5 animate-[idleGlow_6s_ease-in-out_infinite]"
          : status === "connected"
          ? "w-80 h-80 bg-cyan-500/20 animate-[listenWave_2.5s_ease-in-out_infinite]"
          : "w-96 h-96 bg-purple-500/30 animate-ping"
      }
    `}
  />

  {/* WAVE RING */}
  <div
    className={`
      absolute rounded-full border
      ${
        status === "connected"
          ? "border-cyan-400 animate-[wave_2s_linear_infinite]"
          : status === "speaking"
          ? "border-purple-400 animate-[waveFast_1s_linear_infinite]"
          : "border-zinc-700"
      }
    `}
    style={{
      width: 260,
      height: 260,
    }}
  />

  {/* ROTATING GRADIENT */}
  <div
    className={`
      absolute -inset-3 rounded-full
      ${
        status !== "idle"
          ? "bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-spin"
          : "bg-zinc-800"
      }
      p-[3px]
    `}
    style={{
      animationDuration:
        status === "speaking" ? "2s" : "8s",
    }}
  >
    <div className="w-full h-full rounded-full bg-black" />
  </div>

  {/* AVATAR */}
  <div
    className={`
      relative rounded-full overflow-hidden
      ${
        status === "idle"
          ? "animate-[float_5s_ease-in-out_infinite]"
          : status === "connected"
          ? "animate-[breathing_2.5s_ease-in-out_infinite]"
          : "animate-[talking_0.35s_ease-in-out_infinite]"
      }
    `}
  >
    <Image
      src={agent.image}
      alt={agent.name}
      width={220}
      height={220}
      className="w-56 h-56 rounded-full object-cover"
    />
  </div>

</div>

<h1
  className="
    text-3xl
    sm:text-4xl
    md:text-5xl
    lg:text-6xl
    font-bold
    tracking-tight
    text-center
    leading-tight
    wrap-break-word
    max-w-3xl
  "
>
  {agent.name}
</h1>

<p
  className="
    mt-3
    text-base
    sm:text-lg
    md:text-xl
    text-muted-foreground
    text-center
    max-w-2xl
    px-4
    leading-relaxed
  "
>
  {agent.expertise}
</p>
          
          <div className="flex gap-4 mt-4">
            <Badge variant="secondary" className="px-4 py-1 text-sm">
              {agent.voiceProperty}
            </Badge>
            <Badge variant="secondary" className="px-4 py-1 text-sm">
              ⭐ {agent.rating}
            </Badge>
          </div>
        </div>

        {/* Status Indicator */}
        <div className={`mb-4 px-8 py-3 rounded-2xl text-sm font-medium flex items-center gap-3 transition-all duration-300 ${
          status === 'connected' ? 'bg-green-500/10 text-green-400' : 
          status === 'speaking' ? 'bg-purple-500/10 text-purple-400' : 'bg-zinc-800 text-zinc-400'
        }`}>
          {status === 'idle' && 'Ready to Start Voice Chat'}
          {status === 'connecting' && 'Connecting...'}
          {status === 'connected' && '🟢 Listening - Speak now'}
          {status === 'speaking' && '🎙️ Speaking'}
        </div>

        {/* Controls */}
    <div className="w-full max-w-xl">
  <div className="grid grid-cols-2 gap-4 sm:gap-5">

    {/* START BUTTON */}
    <Button
      onClick={startConversation}
      disabled={status !== "idle"}
      size="lg"
      className="
      relative
      h-16 sm:h-16
      rounded-3xl
      overflow-hidden
      border
      border-emerald-500/30
      bg-gradient-to-br
      from-emerald-500
      via-emerald-600
      to-emerald-700
      text-white
      shadow-xl
      shadow-emerald-500/20
      transition-all
      duration-300
      hover:scale-[1.03]
      hover:shadow-2xl
      hover:shadow-emerald-500/40
      active:scale-95
      disabled:opacity-50
      disabled:cursor-not-allowed
      group
    "
    >
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />

      <Mic className="mr-3 h-6 w-6 transition-transform group-hover:scale-125 group-hover:rotate-12" />

      <div className="flex flex-col items-start leading-none">
        <span className="font-bold text-sm sm:text-lg ">
          Start Voice
        </span>

        <span className="text-sm opacity-90 ">
          Begin Conversation
        </span>
      </div>
    </Button>

    {/* STOP BUTTON */}
    <Button
      onClick={stopConversation}
      disabled={status === "idle"}
      size="lg"
      className="
      relative
      h-16 sm:h-20
      rounded-3xl
      overflow-hidden
      border
      border-red-500/30
      bg-gradient-to-br
      from-red-500
      via-red-600
      to-rose-700
      text-white
      shadow-xl
      shadow-red-500/20
      transition-all
      duration-300
      hover:scale-[1.03]
      hover:shadow-2xl
      hover:shadow-red-500/40
      active:scale-95
      disabled:opacity-50
      disabled:cursor-not-allowed
      group
    "
    >
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />

      <PhoneOff className="mr-3 h-6 w-6 transition-transform group-hover:rotate-12 group-hover:scale-125" />

      <div className="flex flex-col items-start leading-none">
        <span className="font-bold text-base sm:text-lg">
          End Call
        </span>

        <span className="text-xs opacity-90">
          Disconnect
        </span>
      </div>
    </Button>

  </div>
</div>

    
      </div>
    </div>
  );
}