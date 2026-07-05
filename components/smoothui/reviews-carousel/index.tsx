"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { agents, type Agent } from "@/app/data/agents";
import Image from "next/image";
import Link from "next/link";

const SWIPE_THRESHOLD = 80;

interface ReviewCardProps {
  agent: Agent;
  index: number;
  activeIndex: number;
  totalCards: number;
}

function ReviewCard({ agent, index, activeIndex, totalCards }: ReviewCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const relative = index - activeIndex;

  // Hide cards that are before the active one (Tinder style)
  if (relative < 0) return null;

  const isActive = relative === 0;

  const scale = shouldReduceMotion ? 1 : Math.max(0.88, 1 - relative * 0.06);
  const opacity = Math.max(0.4, 1 - relative * 0.18);
  const y = shouldReduceMotion ? 0 : relative * 18;

  return (
    <motion.figure
      animate={{
        y,
        scale,
        transition: {
          type: "spring",
          stiffness: 320,
          damping: 28,
          mass: 0.6,
        },
      }}
      drag={isActive ? "x" : false}
      dragConstraints={{ left: -180, right: 180 }}
      dragElastic={0.3}
      onDragEnd={(_, info) => {
        if (!isActive) return;

        if (info.offset.x < -SWIPE_THRESHOLD) {
          window.dispatchEvent(new Event("nextAgent"));
        } else if (info.offset.x > SWIPE_THRESHOLD) {
          window.dispatchEvent(new Event("prevAgent"));
        }
      }}
      className={cn(
        "absolute left-1/2 top-1/2 w-[92%] max-w-[380px] md:max-w-[420px]",
        "-translate-x-1/2 -translate-y-1/2",
        "rounded-3xl border border-border/60 bg-background shadow-2xl overflow-hidden",
        "p-6 md:p-8"
      )}
      style={{
        zIndex: totalCards - relative,
        opacity,
        filter: `blur(${relative * 0.8}px)`,
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      <Link
        href={`/chat/${agent.id}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
      >
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="mb-7">
            <Image
              src={agent.image}
              alt={agent.name}
              width={128}
              height={128}
              priority={isActive}
              className="mx-auto h-28 w-28 md:h-32 md:w-32 rounded-full object-cover shadow-lg ring-4 ring-background"
            />
          </div>

          {/* Quote */}
          <blockquote className="relative mb-7">
            <div className="absolute -top-4 -left-2 text-6xl text-foreground/10">"</div>
            <p className="text-[15.5px] md:text-base leading-relaxed text-foreground/80">
              {agent.description}
            </p>
          </blockquote>

          {/* Info */}
          <figcaption className="mb-4">
            <h3 className="text-2xl font-semibold text-foreground tracking-tight">
              {agent.name}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {agent.expertise} • {agent.voiceProperty}
            </p>
          </figcaption>

          {/* Action Hint - Only on active card */}
          {isActive && (
            <div className="mt-6 text-xs uppercase tracking-[1px] text-primary/70 font-medium">
              TAP CARD TO CHAT →
            </div>
          )}
        </div>
      </Link>
    </motion.figure>
  );
}

export default function AgentsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const maxIndex = agents.length - 1;

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setActiveIndex((i) => Math.max(0, i - 1));
      if (e.key === "ArrowRight") setActiveIndex((i) => Math.min(maxIndex, i + 1));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [maxIndex]);

  // Swipe Events
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

  if (agents.length === 0) return null;

  return (
    <div className="relative mx-auto w-full max-w-md md:max-w-lg px-4 py-8">
      {/* Tinder-like Container */}
      <div className="relative h-[560px] md:h-[620px] w-full">
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

      {/* Progress Indicator */}
      <div className="flex justify-center gap-1.5 mt-8">
        {agents.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === activeIndex
                ? "w-8 bg-primary"
                : i < activeIndex
                ? "w-1.5 bg-primary/30"
                : "w-1.5 bg-muted"
            )}
          />
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground mt-6">
        Swipe left or right • Tap card to chat
      </p>
    </div>
  );
}