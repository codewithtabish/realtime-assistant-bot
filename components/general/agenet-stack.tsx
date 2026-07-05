"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { agents, type Agent } from "@/app/data/agents";
import Link from "next/link";

export default function AgentsStack() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleAgents = agents.slice(currentIndex, currentIndex + 4);

  const handleSwipe = (direction: "left" | "right") => {
    setCurrentIndex((prev) => Math.min(prev + 1, agents.length - 1));
  };

  return (
    <div className="relative mx-auto h-dvh-[10%] w-[92%] max-w-[380px]">
      {visibleAgents.map((agent, relativeIndex) => {
        const isTop = relativeIndex === 0;
        const depth = relativeIndex;

        return (
          <motion.div
            key={agent.id}
            className="absolute left-1/2 w-full -translate-x-1/2 rounded-3xl overflow-hidden border border-zinc-700 shadow-2xl"
            style={{
              top: `${12 + depth * 12}px`,
              zIndex: 10 - depth,
              opacity: isTop ? 1 : 0.75 - depth * 0.2,
              scale: isTop ? 1 : 0.92 - depth * 0.04,
            }}
            animate={{
              y: depth * 8,
              transition: { duration: 0.4, ease: "easeOut" },
            }}
            drag={isTop ? "x" : false}
            dragConstraints={{ left: -80, right: 80 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              if (info.offset.x < -90) handleSwipe("left");
              if (info.offset.x > 90) handleSwipe("right");
            }}
          >
            <div className="relative h-[420px]">
              <img
                src={agent.image}
                alt={agent.name}
                className="h-full w-full object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-black" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-3xl font-bold">{agent.name}</h2>
                <p className="text-zinc-300 mt-1">{agent.expertise}</p>

                <p className="mt-4 text-sm leading-snug text-zinc-200">
                  {agent.description}
                </p>

                <Link
                  href={`/chat/${agent.id}`}
                  className="mt-6 block w-full rounded-2xl bg-white py-4 text-center font-semibold text-black active:scale-95 transition-all"
                >
                  Start Conversation
                </Link>
              </div>
            </div>
          </motion.div>
        );
      })}

    
    </div>
  );
}