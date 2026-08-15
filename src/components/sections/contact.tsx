"use client";

import { Mail, Send, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/effects/reveal";
import { siteConfig } from "@/config/site";

export function Contact() {
  const contacts = [
    { icon: Send, label: "Telegram", value: "@ShadowwLi", href: siteConfig.telegram },
    { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[140px]" aria-hidden />
      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">Контакты</span>
            <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl">
              Давайте <span className="text-gradient">свяжемся</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-slate-400">
              Если хотите обсудить проект или просто задать вопрос — напишите мне удобным способом.
            </p>
          </Reveal>

          <div className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-2">
            {contacts.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.12}>
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-5 py-5 text-left backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.06]">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/15 to-indigo-500/15 text-cyan-300 transition-transform duration-300 group-hover:scale-110">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-slate-500">{c.label}</div>
                    <div className="truncate text-sm font-semibold text-white">{c.value}</div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300" />
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25}>
            <div className="mx-auto mt-8 inline-flex items-center gap-3 rounded-full border border-emerald-500/15 bg-emerald-500/[0.06] px-5 py-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <p className="text-sm text-emerald-200/90">Открыт к новым проектам</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
