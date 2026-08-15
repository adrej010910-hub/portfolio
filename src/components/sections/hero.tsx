"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { siteConfig } from "@/config/site";
import { ParticleField } from "@/components/effects/particle-field";
import { FloatingOrbs } from "@/components/effects/floating-orbs";
import { Grid3D } from "@/components/effects/grid-3d";
import { Magnetic } from "@/components/effects/magnetic";

const titleLines = ["Web Developer", "& UI/UX Designer"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.13, delayChildren: 0.25 } } };
  const wordAnim = {
    hidden: { opacity: 0, y: 80, filter: "blur(14px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section id="top" ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="absolute inset-0 mesh-gradient" aria-hidden />
      <FloatingOrbs />
      <Grid3D />
      <ParticleField className="absolute inset-0 h-full w-full opacity-45" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050508_94%)]" aria-hidden />

      <motion.div style={{ y: reduced ? 0 : y, opacity, scale: reduced ? 1 : scale }} className="container-x relative z-10 flex flex-1 flex-col justify-center pb-20 pt-32">
        <div className="grid items-end gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }} className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium tracking-wide text-slate-300 backdrop-blur-xl">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
              Открыт к новым проектам
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            </motion.div>

            <motion.h1 variants={container} initial="hidden" animate="show" className="font-display max-w-6xl text-[clamp(3.2rem,8vw,8rem)] font-bold leading-[0.9] tracking-[-0.055em] text-white">
              {titleLines.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-2">
                  <motion.span variants={wordAnim} className={i === 1 ? "text-gradient block" : "block"}>{line}</motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.9 }} className="mt-8 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
              {siteConfig.subheading}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25, duration: 0.8 }} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Magnetic strength={0.25}>
                <a href="#portfolio" className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-black transition-all duration-300 hover:bg-cyan-300">
                  Смотреть работы <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a href="#contact" className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-8 text-sm font-semibold text-white backdrop-blur-xl transition-all hover:border-white/25 hover:bg-white/[0.08]">
                  Обсудить проект <ArrowUpRight className="h-4 w-4" />
                </a>
              </Magnetic>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.15, duration: 0.8 }} className="hidden lg:block">
            <div className="border-l border-white/10 pl-6">
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-400">Selected work</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">Разные визуальные системы. Один принцип — дизайн должен работать вместе с кодом.</p>
              <a href="#portfolio" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-cyan-300">Смотреть проекты <ArrowRight className="h-4 w-4" /></a>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.8 }} className="mt-16 grid max-w-3xl grid-cols-2 border-y border-white/[0.08] sm:grid-cols-4">
          {siteConfig.stats.map((s) => (
            <div key={s.label} className="border-r border-white/[0.08] px-4 py-5 text-left last:border-r-0">
              <div className="font-display text-2xl font-bold text-white sm:text-3xl"><span className="text-gradient">{s.value}{s.suffix}</span></div>
              <div className="mt-1.5 text-xs text-slate-500">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.a href="#about" aria-label="Прокрутить вниз" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9, duration: 1 }} className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-slate-500 transition-colors hover:text-cyan-300">
        <motion.div animate={reduced ? {} : { y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}><ChevronDown className="h-6 w-6" /></motion.div>
      </motion.a>
    </section>
  );
}
