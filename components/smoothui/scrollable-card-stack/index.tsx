"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { agents, type Agent } from "@/app/data/agents";
import Link from "next/link";

const FRAME_OFFSET = -28;
const FRAMES_VISIBLE_LENGTH = 3;

function clamp(val: number, [min, max]: [number, number]): number {
  return Math.min(Math.max(val, min), max);
}

interface AgentCardProps {
  activeIndex: number;
  index: number;
  agent: Agent;
  totalCards: number;
}

function AgentCard({
  agent,
  index,
  activeIndex,
  totalCards,
}: AgentCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const offsetIndex = index - activeIndex;

  const blur = activeIndex > index ? 4 : 0;
  const opacity = activeIndex > index ? 0.25 : 1;
  const scale = shouldReduceMotion
    ? 1
    : clamp(1 - offsetIndex * 0.09, [0.65, 1.08]);
  const y = shouldReduceMotion
    ? 0
    : clamp(offsetIndex * FRAME_OFFSET, [
        FRAME_OFFSET * FRAMES_VISIBLE_LENGTH,
        Number.POSITIVE_INFINITY,
      ]);

  const isActive = index === activeIndex;

  return (
    <motion.div
      animate={{
        y,
        scale,
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 22,
          mass: 0.6,
        },
      }}
      className={cn(
        "absolute left-1/2 w-full max-w-[340px] -translate-x-1/2 rounded-3xl border border-border bg-card p-5 shadow-2xl",
        isActive ? "z-30" : "z-10"
      )}
      initial={false}
      style={{
        filter: `blur(${blur}px)`,
        opacity,
        top: "50%",
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className="flex flex-col items-center text-center">
        {/* Agent Image */}
        <div className="mb-5">
          <img
            alt={agent.name}
            className="mx-auto h-28 w-28 rounded-2xl object-cover ring-4 ring-background shadow-md"
            src={agent.image}
          />
        </div>

        {/* Name & Expertise */}
        <h3 className="text-2xl font-semibold text-foreground">{agent.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{agent.expertise}</p>

        {/* Description */}
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {agent.description}
        </p>

        {/* Start Conversation Button */}
        <div className="mt-6 w-full">
          <Link
            href={`/chat/${agent.id}`}
            className="block w-full rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.985]"
          >
            Start Conversation
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function AgentsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalCards = agents.length;

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev < totalCards - 1 ? prev + 1 : prev));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-md px-4 py-12">
      <div className="relative h-[460px]">
        {agents.map((agent, index) => (
          <AgentCard
            key={agent.id}
            activeIndex={activeIndex}
            index={index}
            agent={agent}
            totalCards={totalCards}
          />
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={goToPrevious}
          disabled={activeIndex === 0}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted active:scale-95 transition-all"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          {agents.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-2 rounded-full transition-all",
                index === activeIndex
                  ? "w-9 bg-primary"
                  : "w-2 bg-muted hover:bg-muted-foreground/60"
              )}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          disabled={activeIndex === totalCards - 1}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted active:scale-95 transition-all"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}