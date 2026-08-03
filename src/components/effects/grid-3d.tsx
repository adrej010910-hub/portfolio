"use client";

import { useEffect, useRef } from "react";

export function Grid3D() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    let tiltX = 0;
    let tiltY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const loop = () => {
      tiltX += (targetX - tiltX) * 0.04;
      tiltY += (targetY - tiltY) * 0.04;
      el.style.transform = `perspective(1200px) rotateX(${tiltY * -6}deg) rotateY(${tiltX * 8}deg)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    loop();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0 will-change-transform"
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
        transform: "rotateX(60deg) scale(1.2)",
        opacity: 0.5,
        maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
      }}
      aria-hidden
    >
      <div
        className="absolute left-1/2 top-1/2 h-[160vmax] w-[160vmax] -translate-x-1/2 -translate-y-1/2"
        style={{
          backgroundImage:
            "linear-gradient(rgba(129,140,248,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(129,140,248,0.14) 1px, transparent 1px), linear-gradient(rgba(34,211,238,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px, 60px 60px, 300px 300px, 300px 300px",
          transform: "rotateX(35deg)",
          transformStyle: "preserve-3d",
        }}
      />
    </div>
  );
}

