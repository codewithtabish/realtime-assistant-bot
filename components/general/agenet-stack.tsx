"use client";

import { useState, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import { agents, type Agent } from "@/app/data/agents";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AgentsStack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);

  const currentAgent = agents[currentIndex];
  const nextAgent = agents[currentIndex + 1];

  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 100;

    if (info.offset.x > swipeThreshold) {
      // Swipe Right
      setExitDirection("right");
      setTimeout(() => {
        setCurrentIndex((prev) => Math.min(prev + 1, agents.length - 1));
        setExitDirection(null);
      }, 180);
    } else if (info.offset.x < -swipeThreshold) {
      // Swipe Left
      setExitDirection("left");
      setTimeout(() => {
        setCurrentIndex((prev) => Math.min(prev + 1, agents.length - 1));
        setExitDirection(null);
      }, 180);
    }
  };

  // Reset when reaching the end
  useEffect(() => {
    if (currentIndex >= agents.length - 1) {
      setTimeout(() => {
        setCurrentIndex(0);
      }, 600);
    }
  }, [currentIndex]);

  if (!currentAgent) return null;

  return (
    <div className="relative mx-auto h-[72vh] w-[92%] max-w-[380px] overflow-hidden">
      {/* Next Card */}
      {nextAgent && (
        <div className="absolute inset-0 scale-95 opacity-60 z-10">
          <div className="h-full w-full rounded-3xl bg-black overflow-hidden border border-zinc-800 shadow-xl">
            <img
              src={nextAgent.image}
              alt={nextAgent.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Current Card */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -120, right: 120 }}
        dragElastic={0.25}
        onDragEnd={handleDragEnd}
        animate={{
          x: exitDirection === "left" ? -420 : exitDirection === "right" ? 420 : 0,
          rotate: exitDirection === "left" ? -22 : exitDirection === "right" ? 22 : 0,
          opacity: exitDirection ? 0 : 1,
          scale: exitDirection ? 0.85 : 1,
        }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="absolute inset-0 cursor-grab active:cursor-grabbing z-20"
      >
        <div className="h-full w-full rounded-3xl bg-black overflow-hidden shadow-2xl border border-zinc-700 relative">
          <img
            src={currentAgent.image}
            alt={currentAgent.name}
            className="h-full w-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-black" />

          {/* Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-3xl font-bold tracking-tight">
              {currentAgent.name}
            </h2>
            <p className="text-zinc-400 mt-1">{currentAgent.expertise}</p>

            <p className="mt-4 text-zinc-200 text-[15px] leading-snug">
              {currentAgent.description}
            </p>

            <div className="mt-7">
              <Link
                href={`/chat/${currentAgent.id}`}
                className="block w-full bg-white text-black font-semibold py-4 rounded-2xl text-center active:scale-95 transition-all"
              >
                Start Conversation
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Swipe Hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-zinc-400 flex items-center gap-2">
        <ChevronLeft className="h-4 w-4" /> Swipe left or right <ChevronRight className="h-4 w-4" />
      </div>
    </div>
  );
}