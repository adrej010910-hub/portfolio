"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Sparkle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const items = [
  "Web Development",
  "UI/UX Design",
  "React",
  "GSAP Motion",
  "Creative Frontend",
  "Responsive Web",
  "Digital Products",
  "Figma",
];

export function MarqueeStrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, { xPercent: -50, ease: "none", duration: 30, repeat: -1 });
      gsap.fromTo(sectionRef.current, { opacity: 0.2 }, { opacity: 1, duration: 1, scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(trackRef.current, { x: 60 }, { x: -60, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-y border-white/[0.06] bg-white/[0.02] py-5" aria-hidden>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-ink to-transparent" />
      <div ref={trackRef} className="flex w-max items-center gap-10 whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-lg font-semibold uppercase tracking-wider text-slate-300/80">{item}</span>
            <Sparkle className="h-4 w-4 text-cyan-400/70" />
          </span>
        ))}
      </div>
    </section>
  );
}
