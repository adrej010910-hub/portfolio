"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import { TiltCard } from "@/components/effects/tilt-card";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/effects/reveal";
import { projects } from "@/config/site";

function ProjectMock({ image, accent, title }: { image: string; accent: string; title: string }) {
  const remote = image.startsWith("http");
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-[#090a10]">
      {remote ? (
        <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      ) : (
        <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
      )}
      <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-10 mix-blend-screen transition-opacity duration-500 group-hover:opacity-25`} aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08090e] via-transparent to-transparent" aria-hidden />
      <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/35 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-xl">{title}</div>
      <div className="absolute bottom-5 right-5 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white opacity-0 backdrop-blur-xl transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <ArrowUpRight className="h-4 w-4" />
      </div>
    </div>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute right-[-5%] top-0 h-96 w-96 rounded-full bg-fuchsia-600/10 blur-[120px]" aria-hidden />
      <div className="container-x relative">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400"><Sparkles className="h-4 w-4" /> Selected work</span>
              <h2 className="font-display mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">Работы, которые <span className="text-gradient">говорят сами</span></h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-400">Подборка web-проектов с разными визуальными системами — от premium fitness и AI/SaaS до e-commerce, digital agency и fine dining.</p>
          </div>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-7 md:grid-cols-2" stagger={0.08}>
          {projects.map((project, index) => {
            const internal = project.href.startsWith("/projects/");
            const content = <ProjectMock image={project.image} accent={project.accent} title={project.tag} />;
            return (
              <StaggerItem key={project.title}>
                <TiltCard className="group h-full rounded-[2rem]" max={5}>
                  <article className={`glass relative flex h-full flex-col overflow-hidden rounded-[2rem] transition-all duration-500 hover:border-white/15 hover:shadow-[0_30px_90px_-30px_rgba(34,211,238,0.25)] ${index === 0 ? "md:col-span-2" : ""}`}>
                    {internal ? <Link href={project.href}>{content}</Link> : <a href={project.href} target="_blank" rel="noopener noreferrer">{content}</a>}
                    <div className="flex flex-1 flex-col p-6 sm:p-8">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400/80">0{index + 1} · {project.tag}</p>
                          <h3 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">{project.title}</h3>
                        </div>
                        <span className="hidden rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-wider text-slate-500 sm:inline">Case</span>
                      </div>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">{project.desc}</p>
                      <div className="mt-5 flex flex-wrap gap-2">{project.tech.map((tech) => <span key={tech} className="rounded-full border border-white/[0.08] bg-white/[0.035] px-2.5 py-1 text-[10px] font-medium text-slate-300">{tech}</span>)}</div>
                      <div className="mt-7 flex items-center justify-between border-t border-white/[0.07] pt-5">
                        <span className="text-xs text-slate-500">{internal ? "Открыть case study" : "Открыть live project"}</span>
                        {internal ? <Link href={project.href} className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-cyan-300">Смотреть <ArrowUpRight className="h-4 w-4" /></Link> : <a href={project.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-cyan-300">Live <ExternalLink className="h-4 w-4" /></a>}
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
