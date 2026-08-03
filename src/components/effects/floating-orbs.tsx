"use client";

import { motion, useReducedMotion } from "framer-motion";

export function FloatingOrbs() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-32 top-24 h-96 w-96 rounded-full bg-indigo-600/20 blur-[100px]" />
        <div className="absolute right-[-10%] top-1/3 h-[420px] w-[420px] rounded-full bg-cyan-500/15 blur-[110px]" />
        <div className="absolute bottom-[-10%] left-1/3 h-96 w-96 rounded-full bg-fuchsia-600/15 blur-[100px]" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -left-32 top-24 h-96 w-96 rounded-full bg-indigo-600/25 blur-[100px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-10%] top-1/3 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[110px]"
        animate={{ x: [0, -50, 0], y: [0, 60, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-1/3 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-[100px]"
        animate={{ x: [0, 40, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

