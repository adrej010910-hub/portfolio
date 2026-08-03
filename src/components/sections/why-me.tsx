"use client";

import {
  Sparkles,
  Zap,
  User,
  Target,
  Smartphone,
  Code,
  Eye,
  Check,
  type LucideIcon,
} from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/effects/reveal";
import { AnimatedCounter } from "@/components/effects/animated-counter";
import { advantages, siteConfig } from "@/config/site";

const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  zap: Zap,
  user: User,
  target: Target,
  smartphone: Smartphone,
  code: Code,
  eye: Eye,
};

export function WhyMe() {
  return (
    <section id="why-me" className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute right-[-5%] bottom-0 h-96 w-96 rounded-full bg-cyan-600/10 blur-[120px]" aria-hidden />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-2">
        {/* Left: heading + stats */}
        <div>
          <Reveal direction="right">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Почему я
            </span>
            <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl">
              Ответственный подход <br className="hidden sm:block" />
              к <span className="text-gradient">каждому проекту</span>
            </h2>
            <p className="mt-5 max-w-md text-slate-400">
              Может быть, у меня не самый длинный список проектов — но в каждый я
              вкладываю максимум внимания, энергии и желания сделать действительно
              качественный продукт.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {siteConfig.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="glass rounded-2xl px-5 py-6 transition-transform duration-300 hover:-translate-y-1">
                  <div className="font-display text-3xl font-bold text-white sm:text-4xl">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1.5 text-xs leading-snug text-slate-400">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right: advantage checklist */}
        <StaggerGroup className="grid gap-3" stagger={0.07}>
          {advantages.map((adv) => {
            const Icon = iconMap[adv.icon] ?? Sparkles;
            return (
              <StaggerItem key={adv.title} direction="left">
                <div className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:border-indigo-400/30 hover:bg-white/[0.05]">
                  <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/15 to-indigo-500/15">
                    <Icon className="h-5 w-5 text-cyan-300 transition-transform duration-300 group-hover:scale-110" />
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/90">
                      <Check className="h-2.5 w-2.5 text-white" />
                    </span>
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{adv.title}</h3>
                    <p className="mt-0.5 text-xs text-slate-400">{adv.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}

