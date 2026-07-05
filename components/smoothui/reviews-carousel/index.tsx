"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
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
    :  Math.max(0.9, 1 - relative * 0.04);

  const opacity = Math.max(0.55, 1 - relative * 0.12);;

const y = shouldReduceMotion ? 0 : relative * 22;

const x = useMotionValue(0);

const rotate = useTransform(
  x,
  [-250, 0, 250],
  [-10, 0, 10]
);
  return (
    <motion.figure
    drag="x"
style={{
    x,
    rotate,
    zIndex: totalCards - relative,
    opacity,
    filter: `blur(${relative * 0.6}px)`,
    pointerEvents: isActive ? "auto" : "none",
}}
      animate={{
        y,
        scale,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 28,
      }}
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
  "w-[92%]",
  "max-w-107.5",
  "sm:max-w-125",
  "-translate-x-1/2 -translate-y-1/2",
  "rounded-[28px]",
  "border border-border/50",
  "bg-background shadow-2xl",
  "p-6"
)}
     
     
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
      <div className="relative h-[520px] md:h-[580px] w-full">
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

    </div>
  );
}