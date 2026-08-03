"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Ripple({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2.2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const span = document.createElement("span");
    span.className = "ripple-span pointer-events-none absolute rounded-full";
    span.style.width = span.style.height = `${size}px`;
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
    span.style.background = "radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 70%)";
    btn.appendChild(span);

    requestAnimationFrame(() => {
      span.style.transition = "transform 0.7s ease-out, opacity 0.7s ease-out";
      span.style.transform = "scale(1)";
      span.style.opacity = "0";
    });

    setTimeout(() => span.remove(), 700);
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={cn("relative overflow-hidden", className)}
    >
      {children}
    </button>
  );
}

