'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronUp } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { agents } from '@/app/data/agents';

export default function AgentsList() {
  const [open, setOpen] = useState(false);
  const visibleAgents = agents.slice(0, 3);
  const hiddenAgents = agents.slice(3);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 border rounded-full px-5 py-2 mb-6">
          <span>🌍</span>
          <span className="text-sm font-medium tracking-widest">LANGUAGE AI STUDIO</span>
        </div>
        <h1 className="text-6xl font-bold tracking-tighter mb-6">
          Meet Your Personal Tutors
        </h1>
        <p className="text-xl max-w-lg mx-auto">
          Real-time voice conversations with expert tutors in 7 languages
        </p>
      </div>

      <Collapsible open={open} onOpenChange={setOpen} className="space-y-8">
        {/* Visible Agents */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleAgents.map((agent) => (
            <div key={agent.id} className="group">
              <div className="transition-all hover:-translate-y-1 rounded-xl overflow-hidden border">
                <div className="relative h-64">
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-semibold">{agent.name}</h3>
                    {agent.toolsEnabled && <Badge>Tools</Badge>}
                  </div>
                  <p className="text-sm mt-1">
                    {agent.voice} • {agent.voiceProperty}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed line-clamp-2">
                    {agent.description}
                  </p>

                  <Popover>
                    <PopoverTrigger >
                      <Button variant="outline" className="mt-4 w-full">
                        View Details
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-lg">{agent.name}</h4>
                          <p className="text-sm">
                            {agent.gender} • {agent.voice}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Expertise</p>
                          <p>{agent.expertise}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Voice Style</p>
                          <p>{agent.voiceProperty}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">About</p>
                          <p className="leading-relaxed">{agent.description}</p>
                        </div>
                        <Link href={`/chat/${agent.id}`} className="block">
                          <Button className="w-full">Start Conversation →</Button>
                        </Link>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hidden Agents */}
        <CollapsibleContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hiddenAgents.map((agent) => (
            <div key={agent.id} className="group">
              <div className="transition-all hover:-translate-y-1 rounded-xl overflow-hidden border">
                <div className="relative h-64">
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-semibold">{agent.name}</h3>
                    {agent.toolsEnabled && <Badge>Tools</Badge>}
                  </div>
                  <p className="text-sm mt-1">
                    {agent.voice} • {agent.voiceProperty}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed line-clamp-2">
                    {agent.description}
                  </p>

                  <Popover>
                    <PopoverTrigger >
                      <Button variant="outline" className="mt-4 w-full">
                        View Details
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-lg">{agent.name}</h4>
                          <p className="text-sm">
                            {agent.gender} • {agent.voice}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Expertise</p>
                          <p>{agent.expertise}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Voice Style</p>
                          <p>{agent.voiceProperty}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">About</p>
                          <p className="leading-relaxed">{agent.description}</p>
                        </div>
                        <Link href={`/chat/${agent.id}`} className="block">
                          <Button className="w-full">Start Conversation →</Button>
                        </Link>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          ))}
        </CollapsibleContent>

        {/* Toggle Button - Safer version to avoid hydration issues */}
        <div className="flex justify-center mt-8">
          <CollapsibleTrigger>
            <Button variant="outline" className="min-w-45">
              {open ? 'Show Less' : 'Show More Languages'}
              <ChevronUp
                className={`ml-2 h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
              />
            </Button>
          </CollapsibleTrigger>
        </div>
      </Collapsible>
    </div>
  );
}