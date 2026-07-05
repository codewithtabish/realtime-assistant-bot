"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { agents, type Agent } from "@/app/data/agents";
import Image from "next/image";
import Link from "next/link";

const FRAME_OFFSET = -30;
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

  const blur = activeIndex > index ? 2 : 0;
  const opacity = activeIndex > index ? 0 : 1;
  const scale = shouldReduceMotion
    ? 1
    : clamp(1 - offsetIndex * 0.08, [0.08, 2]);
  const y = shouldReduceMotion
    ? 0
    : clamp(offsetIndex * FRAME_OFFSET, [
        FRAME_OFFSET * FRAMES_VISIBLE_LENGTH,
        Number.POSITIVE_INFINITY,
      ]);

  const isActive = index === activeIndex;

  return (
    <motion.figure
      animate={{
        y,
        scale,
        transition: {
          type: "spring" as const,
          stiffness: 250,
          damping: 20,
          mass: 0.5,
          duration: 0.25,
        },
      }}
      className={cn(
        "absolute left-1/2 w-[calc(100%-2rem)] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-foreground/10 bg-background/80 p-4 shadow-lg backdrop-blur-md sm:p-6"
      )}
      initial={false}
      style={{
        borderWidth: 1 / scale,
        willChange: "opacity, filter, transform",
        filter: `blur(${blur}px)`,
        opacity,
        transitionProperty: "opacity, filter",
        transitionDuration: shouldReduceMotion ? "0ms" : "250ms",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: totalCards - index,
        pointerEvents: isActive ? "auto" : "none",
        top: "50%",
      }}
    >
      <Link href={`/chat/${agent.id}`} className="block">
        <div className="flex flex-col items-center text-center">
          <div className="mb-5">
            <Image
              src={agent.image}
              alt={agent.name}
              width={80}
              height={80}
              className="mx-auto h-20 w-20 rounded-full object-cover"
            />
          </div>

          <h3 className="text-xl font-semibold text-foreground">{agent.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{agent.expertise}</p>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {agent.description}
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
            <span className="bg-muted px-2.5 py-1 rounded-full">
              {agent.fluency}
            </span>
            <span className="bg-muted px-2.5 py-1 rounded-full">
              {agent.teachingStyle}
            </span>
          </div>

          <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
            <span>⭐ {agent.rating}</span>
            <span>•</span>
            <span>{agent.students.toLocaleString()} students</span>
          </div>

          <div className="mt-6 w-full">
            <Link
              href={`/chat/${agent.id}`}
              className="block w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Start Conversation
            </Link>
          </div>
        </div>
      </Link>
    </motion.figure>
  );
}

interface NavigationButtonProps {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}

function NavigationButton({
  direction,
  onClick,
  disabled,
}: NavigationButtonProps) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  return (
    <button
      aria-label={direction === "prev" ? "Anterior" : "Siguiente"}
      className={cn(
        "box-gen group relative z-0 flex h-7 w-7 items-center justify-center rounded-full border-[0.5px] border-foreground/10 bg-background/50 backdrop-blur-sm transition-all duration-200",
        disabled
          ? "cursor-not-allowed opacity-30"
          : "cursor-pointer hover:border-foreground/20 hover:bg-background/70 hover:shadow-lg",
        "dark:border-foreground/5 dark:bg-foreground/5 dark:hover:border-foreground/10 dark:hover:bg-foreground/10"
      )}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <Icon
        className={cn(
          "h-3.5 w-3.5 text-foreground/60 transition-colors",
          "group-hover:text-foreground group-disabled:text-foreground/20"
        )}
      />
    </button>
  );
}

export default function AgentsCarousel() {
  const filteredAgents = agents;

  const maxIndex = filteredAgents.length - 1;
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [maxIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setActiveIndex((i) => clamp(i - 1, [0, maxIndex]));
      if (e.key === "ArrowRight") setActiveIndex((i) => clamp(i + 1, [0, maxIndex]));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [maxIndex]);

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  };

  if (filteredAgents.length === 0) return null;

  return (
    <div
      className="relative mx-auto w-full max-w-4xl mt-10"
      style={{ height: "70vh" }} // 70% height on mobile
    >
      {/* Stack of cards */}
      <div className="relative h-full w-full py-8">
        <div className="grid h-full w-full place-items-center">
          {filteredAgents.map((agent: Agent, index: number) => (
            <AgentCard
              activeIndex={activeIndex}
              index={index}
              key={agent.id}
              agent={agent}
              totalCards={filteredAgents.length}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2">
        <NavigationButton
          direction="prev"
          disabled={activeIndex <= 0}
          onClick={goToPrevious}
        />

        <div className="flex items-center gap-2">
          {filteredAgents.map((agent: Agent, index: number) => (
            <button
              aria-label={`Go to agent ${index + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-200",
                index === activeIndex
                  ? "w-8 bg-brand"
                  : "w-2 bg-brand/30 hover:bg-brand/50"
              )}
              key={agent.id}
              onClick={() => setActiveIndex(index)}
              type="button"
            />
          ))}
        </div>

        <NavigationButton
          direction="next"
          disabled={activeIndex === maxIndex}
          onClick={goToNext}
        />
      </div>
    </div>
  );
}