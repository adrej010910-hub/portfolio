"use client";

import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { TiltCard } from "@/components/effects/tilt-card";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/effects/reveal";
import { projects } from "@/config/site";

function ProjectMock({ image, accent, title }: { image: string; accent: string; title: string }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0a12]">
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-all duration-700 group-hover:scale-110"
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-30`} aria-hidden />
      {/* floating badge */}
      <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-md">
        {title}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-transparent to-transparent" aria-hidden />
    </div>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute right-[-5%] top-0 h-96 w-96 rounded-full bg-fuchsia-600/10 blur-[120px]" aria-hidden />

      <div className="container-x relative">
        <Reveal>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Портфолио
              </span>
              <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl">
                Избранные <span className="text-gradient">работы</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm text-slate-400">
              Продающие карточки товаров для маркетплейсов — каждая работа создана с фокусом на конверсию.
            </p>
          </div>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {projects.map((project) => (
            <StaggerItem key={project.title}>
              <TiltCard className="group h-full rounded-3xl" max={8}>
                <article className="glass relative flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-500 group-hover:border-indigo-400/30 group-hover:shadow-[0_20px_60px_-20px_rgba(99,102,241,0.4)]">
                  <ProjectMock image={project.image} accent={project.accent} title={project.tag} />

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-cyan-200">
                      {project.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-400">
                      {project.desc}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-5">
                      <a
                        href={project.href}
                        onClick={(e) => e.preventDefault()}
                        className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white/[0.06] px-4 text-xs font-semibold text-white transition-all duration-300 hover:bg-white/[0.12]"
                      >
                        Подробнее
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500/80 to-indigo-500/80 px-4 text-xs font-semibold text-white transition-all duration-300 hover:from-cyan-500 hover:to-indigo-500"
                        >
                          Открыть сайт
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

