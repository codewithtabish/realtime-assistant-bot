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
    const swipeThreshold = 120;

    if (info.offset.x > swipeThreshold) {
      // Swipe Right
      setExitDirection("right");
      setTimeout(() => {
        setCurrentIndex((prev) => Math.min(prev + 1, agents.length - 1));
        setExitDirection(null);
      }, 200);
    } else if (info.offset.x < -swipeThreshold) {
      // Swipe Left
      setExitDirection("left");
      setTimeout(() => {
        setCurrentIndex((prev) => Math.min(prev + 1, agents.length - 1));
        setExitDirection(null);
      }, 200);
    }
  };

  // Reset when reaching the end
  useEffect(() => {
    if (currentIndex >= agents.length - 1) {
      setTimeout(() => {
        setCurrentIndex(0);
      }, 800);
    }
  }, [currentIndex]);

  if (!currentAgent) return null;

  return (
    <div className="relative mx-auto h-[70vh] w-[90%] max-w-[380px] overflow-hidden">
      {/* Next Card (Background) */}
      {nextAgent && (
        <div className="absolute inset-0 scale-95 opacity-70">
          <div className="h-full w-full rounded-3xl bg-gradient-to-br from-zinc-900 to-black overflow-hidden border border-zinc-800">
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
        dragConstraints={{ left: -100, right: 100 }}
        dragElastic={0.3}
        onDragEnd={handleDragEnd}
        animate={{
          x: exitDirection === "left" ? -400 : exitDirection === "right" ? 400 : 0,
          rotate: exitDirection === "left" ? -25 : exitDirection === "right" ? 25 : 0,
          opacity: exitDirection ? 0 : 1,
        }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
      >
        <div className="h-full w-full rounded-3xl bg-black overflow-hidden shadow-2xl border border-zinc-700 relative">
          <img
            src={currentAgent.image}
            alt={currentAgent.name}
            className="h-full w-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/90" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  {currentAgent.name}
                </h2>
                <p className="text-zinc-400 mt-1 text-lg">{currentAgent.expertise}</p>
              </div>
            </div>

            <p className="mt-4 text-zinc-300 leading-snug">
              {currentAgent.description}
            </p>

            <div className="mt-6 flex gap-3">
              <Link
                href={`/chat/${currentAgent.id}`}
                className="flex-1 bg-white text-black font-semibold py-4 rounded-2xl text-center active:scale-95 transition-all"
              >
                Start Conversation
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Swipe Hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-zinc-500 flex items-center gap-1.5">
        <ChevronLeft className="h-3 w-3" /> Swipe left or right <ChevronRight className="h-3 w-3" />
      </div>
    </div>
  );
}