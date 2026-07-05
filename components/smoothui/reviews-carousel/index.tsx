"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, useCallback } from "react";
import { agents, type Agent } from "@/app/data/agents";
import Link from "next/link";
import Image from "next/image";

const FRAME_OFFSET = -28;
const FRAMES_VISIBLE_LENGTH = 3;
const SWIPE_THRESHOLD = 65;

function clamp(val: number, [min, max]: [number, number]): number {
  return Math.min(Math.max(val, min), max);
}

interface ReviewCardProps {
  agent: Agent;
  index: number;
  activeIndex: number;
  totalCards: number;
}



function ReviewCard({
  agent,
  index,
  activeIndex,
  totalCards,
}: ReviewCardProps) {
  const shouldReduceMotion = useReducedMotion();

  // position relative to active card
  const relative = index - activeIndex;

  // Hide cards before the active one
  if (relative < 0) return null;

  const isActive = relative === 0;

  const scale = shouldReduceMotion
    ? 1
    : Math.max(0.84, 1 - relative * 0.06);

  const opacity = Math.max(0.25, 1 - relative * 0.18);

  const y = shouldReduceMotion ? 0 : relative * 28;

  return (
    <motion.figure
      animate={{
        y,
        scale,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 28,
      }}
      drag={isActive ? "x" : false}
      dragConstraints={{ left: -100, right: 100 }}
      dragElastic={0.2}
      onDragEnd={(_, info) => {
        if (!isActive) return;

        if (info.offset.x < -SWIPE_THRESHOLD) {
          window.dispatchEvent(new Event("nextAgent"));
        }

        if (info.offset.x > SWIPE_THRESHOLD) {
          window.dispatchEvent(new Event("prevAgent"));
        }
      }}
      className={cn(
        "absolute left-1/2 top-1/2",
        "w-[calc(100%-1.25rem)]",
        "sm:w-[calc(100%-2rem)]",
        "max-w-90",
        "sm:max-w-107.5",
        "md:max-w-130",
        "lg:max-w-[600px]",
        "-translate-x-1/2 -translate-y-1/2",
        "rounded-3xl border border-foreground/10",
        "bg-background/95 shadow-xl backdrop-blur-xl",
        "p-6 md:p-8"
      )}
      style={{
        zIndex: totalCards - relative,
        opacity,
        filter: `blur(${relative * 1.2}px)`,
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      <Link
        href={`/chat/${agent.id}`}
        className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <div className="flex flex-col items-center text-center">
          <Image
  src={agent.image}
  alt={agent.name}
  width={112}
  height={112}
  priority={isActive}
  className="h-24 w-24 md:h-28 md:w-28 rounded-full object-cover shadow-md ring-4 ring-background"
/>

          <blockquote className="relative mt-6 mb-6">
            <div className="absolute -top-3 -left-1 text-5xl text-foreground/10">
              "
            </div>

            <p className="text-[15px] md:text-base leading-relaxed text-foreground/85">
              {agent.description}
            </p>
          </blockquote>

          <figcaption>
            <h3 className="text-lg font-semibold">
              {agent.name}
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {agent.expertise} • {agent.voiceProperty}
            </p>
          </figcaption>
        </div>

        {isActive && (
          <div className="mt-8 text-center text-xs uppercase tracking-widest text-primary/70">
            Tap card to explore →
          </div>
        )}
      </Link>
    </motion.figure>
  );
}


export default function AgentsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const maxIndex = agents.length - 1;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setActiveIndex((i) => Math.max(0, i - 1));
      if (e.key === "ArrowRight") setActiveIndex((i) => Math.min(maxIndex, i + 1));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [maxIndex]);

  useEffect(() => {
    const next = () => setActiveIndex((i) => Math.min(maxIndex, i + 1));
    const prev = () => setActiveIndex((i) => Math.max(0, i - 1));

    window.addEventListener("nextAgent", next);
    window.addEventListener("prevAgent", prev);
    return () => {
      window.removeEventListener("nextAgent", next);
      window.removeEventListener("prevAgent", prev);
    };
  }, [maxIndex]);

  const goPrev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const goNext = () => setActiveIndex((i) => Math.min(maxIndex, i + 1));

  if (agents.length === 0) return null;

  return (
    <div className="relative mx-auto w-full max-w-4xl px-4 ">
      <div className="relative  w-full">
        {agents.map((agent, index) => (
          <ReviewCard
            key={agent.id}
            agent={agent}
            index={index}
            activeIndex={activeIndex}
            totalCards={agents.length}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-6 ">
        <button
          onClick={goPrev}
          disabled={activeIndex === 0}
          className="h-12 w-12 flex items-center justify-center rounded-2xl border bg-background hover:bg-muted disabled:opacity-40 transition-all"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div className="flex gap-2.5">
          {agents.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "h-2.5 rounded-full transition-all",
                i === activeIndex ? "w-9 bg-primary" : "w-2.5 bg-muted hover:bg-foreground/30"
              )}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          disabled={activeIndex === maxIndex}
          className="h-12 w-12 flex items-center justify-center rounded-2xl border bg-background hover:bg-muted disabled:opacity-40 transition-all"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}