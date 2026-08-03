"use client";

import { Monitor, Target, ShoppingBag, RefreshCw, ArrowUpRight, type LucideIcon } from "lucide-react";
import { TiltCard } from "@/components/effects/tilt-card";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/effects/reveal";
import { Magnetic } from "@/components/effects/magnetic";
import { services } from "@/config/site";

const iconMap: Record<string, LucideIcon> = {
  monitor: Monitor,
  target: Target,
  shopping: ShoppingBag,
  refresh: RefreshCw,
};

export function Services() {
  return (
    <section id="services" className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[80%] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[130px]" aria-hidden />

      <div className="container-x relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Услуги
            </span>
            <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl">
              Что я могу для вас <span className="text-gradient">сделать</span>
            </h2>
            <p className="mt-4 text-slate-400">
              Комплексные решения: от идеи и дизайна до готового продукта.
            </p>
          </div>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2" stagger={0.12}>
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? Monitor;
            return (
              <StaggerItem key={service.num}>
                <TiltCard className="h-full rounded-3xl" max={7}>
                  <div className="glass group relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:border-indigo-400/30 hover:shadow-[0_20px_60px_-20px_rgba(99,102,241,0.35)]">
                    <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100" aria-hidden />

                    <div className="flex items-start justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/15 to-indigo-500/15 text-cyan-300 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:text-cyan-200">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-display text-5xl font-bold text-white/[0.06] transition-colors duration-500 group-hover:text-white/[0.12]">
                        {service.num}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-cyan-100">
                        {service.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                        {service.desc}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-white/[0.07] pt-5">
                      <Magnetic strength={0.25}>
                        <a
                          href="#contact"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
                        >
                          Обсудить задачу
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      </Magnetic>
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}

