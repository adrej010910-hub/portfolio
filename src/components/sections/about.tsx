"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Palette, Rocket } from "lucide-react";
import { TiltCard } from "@/components/effects/tilt-card";
import { Reveal } from "@/components/effects/reveal";
import { Magnetic } from "@/components/effects/magnetic";
import { siteConfig } from "@/config/site";

const highlights = [
  {
    icon: Code2,
    title: "Создание сайтов",
    text: "Современные сайты с нуля — быстрые, адаптивные и живые.",
  },
  {
    icon: Palette,
    title: "Дизайн карточек маркетплейсов",
    text: "Продающая инфографика для WB, Ozon и Яндекс Маркета.",
  },
  {
    icon: Rocket,
    title: "Постоянное развитие",
    text: "Каждый день учусь новому и применяю лучшие практики.",
  },
];

export function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute right-[-10%] top-0 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" aria-hidden />

      <div className="container-x relative">
        <Reveal>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Обо мне
              </span>
              <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl">
                Привет, я <span className="text-gradient">{siteConfig.name}</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm text-slate-400">
              Начинающий фрилансер с ответственным подходом и стремлением к идеалу в каждом проекте.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-5">
          {/* Profile card */}
          <Reveal direction="right" className="lg:col-span-2">
            <TiltCard className="h-full rounded-3xl">
              <div className="glass-strong relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-8">
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-cyan-500/30 to-fuchsia-500/20 blur-2xl" aria-hidden />

                <div className="relative">
                  <div className="flex items-center gap-4">
                    <div className="relative flex h-20 w-20 items-center justify-center">
                      <div className="absolute inset-0 animate-spin-slow rounded-2xl bg-[conic-gradient(from_0deg,#22d3ee,#818cf8,#e879f9,#22d3ee)]" />
                      <div className="absolute inset-[3px] flex items-center justify-center rounded-2xl bg-ink text-2xl font-bold text-white">
                        {siteConfig.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{siteConfig.name}</h3>
                      <p className="text-sm text-slate-400">{siteConfig.role}</p>
                      <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Начинающий фрилансер
                      </span>
                    </div>
                  </div>

                  <p className="mt-7 text-sm leading-relaxed text-slate-300">
                    Я создаю современные сайты и продающие карточки товаров для маркетплейсов.
                    Уделяю внимание каждому проекту, вникаю в задачи клиента и предлагаю решения,
                    которые действительно работают.
                  </p>
                </div>

                <div className="relative mt-8 flex items-center justify-between border-t border-white/[0.08] pt-6">
                  <span className="text-xs text-slate-500">{siteConfig.location}</span>
                  <Magnetic strength={0.3}>
                    <a
                      href="#contact"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 text-white transition-shadow hover:shadow-[0_0_24px_rgba(34,211,238,0.5)]"
                      aria-label="Связаться"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Magnetic>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* Highlight cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-3">
            {highlights.map((h, i) => (
              <Reveal
                key={h.title}
                delay={i * 0.12}
                className={i === 2 ? "sm:col-span-2" : ""}
              >
                <TiltCard className="h-full rounded-3xl">
                  <div className="glass group flex h-full flex-col gap-4 rounded-3xl p-7 transition-all duration-300 hover:border-indigo-400/30">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 text-cyan-300 transition-all duration-300 group-hover:scale-110 group-hover:text-cyan-200">
                      <h.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{h.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{h.text}</p>
                    </div>
                    <div className="mt-auto h-1 w-0 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-500 group-hover:w-full" />
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

