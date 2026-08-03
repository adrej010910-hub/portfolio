"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { useRef } from "react";
import { siteConfig } from "@/config/site";
import { ParticleField } from "@/components/effects/particle-field";
import { FloatingOrbs } from "@/components/effects/floating-orbs";
import { Grid3D } from "@/components/effects/grid-3d";
import { Magnetic } from "@/components/effects/magnetic";

const titleLines = [
  "Создаю современные",
  "сайты и продающий",
  "дизайн карточек",
  "для маркетплейсов.",
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };

  const wordAnim = {
    hidden: { opacity: 0, y: 70, filter: "blur(12px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 mesh-gradient" aria-hidden />
      <FloatingOrbs />
      <Grid3D />
      <ParticleField className="absolute inset-0 h-full w-full opacity-70" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#050508_95%)]"
        aria-hidden
      />

      {/* Content */}
      <motion.div
        style={{ y: reduced ? 0 : y, opacity, scale: reduced ? 1 : scale }}
        className="container-x relative z-10 flex flex-1 flex-col items-center justify-center pb-16 pt-36 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="glass mb-8 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-wide text-slate-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Открыт к новым проектам
          <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
        </motion.div>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="font-display text-[clamp(2rem,6vw,4.6rem)] font-bold leading-[1.06] tracking-tight text-white"
        >
          {titleLines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                variants={wordAnim}
                className={
                  i === titleLines.length - 1 ? "text-gradient block" : "block"
                }
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
        >
          {siteConfig.subheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Magnetic strength={0.3}>
            <a
              href="#portfolio"
              className="group relative inline-flex h-14 items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 bg-[length:200%_auto] px-9 text-base font-semibold text-white shadow-[0_12px_50px_-10px_rgba(99,102,241,0.8)] transition-all duration-500 hover:bg-right"
            >
              Посмотреть работы
              <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a
              href="#contact"
              className="glass inline-flex h-14 items-center gap-2 rounded-full px-9 text-base font-semibold text-white transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08]"
            >
              Связаться со мной
            </a>
          </Magnetic>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {siteConfig.stats.map((s) => (
            <div
              key={s.label}
              className="glass rounded-2xl px-4 py-5 text-center transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="font-display text-2xl font-bold text-white sm:text-3xl">
                <span className="text-gradient">{s.value}</span>
                <span className="text-gradient">{s.suffix}</span>
              </div>
              <div className="mt-1.5 text-xs text-slate-400">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.a
        href="#about"
        aria-label="Прокрутить вниз"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-slate-500 transition-colors hover:text-cyan-300"
      >
        <motion.div
          animate={reduced ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.a>
    </section>
  );
}

