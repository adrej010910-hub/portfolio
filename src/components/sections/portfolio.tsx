"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Sparkles, Eye, X } from "lucide-react";
import { TiltCard } from "@/components/effects/tilt-card";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/effects/reveal";
import { projects } from "@/config/site";

function ProjectMock({ image, accent, title }: { image: string; accent: string; title: string }) {
  const isUnsplash = image.startsWith("http");

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0a12]">
      {isUnsplash ? (
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
        />
      ) : (
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-all duration-700 group-hover:scale-110"
        />
      )}
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
  const [filter, setFilter] = useState<"all" | "websites" | "marketplaces">("all");
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string; desc: string } | null>(null);

  const filteredProjects = projects.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  return (
    <section id="portfolio" className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute right-[-5%] top-0 h-96 w-96 rounded-full bg-fuchsia-600/10 blur-[120px]" aria-hidden />

      <div className="container-x relative">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                <Sparkles className="h-4 w-4" />
                Портфолио & Демо
              </span>
              <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Избранные <span className="text-gradient">проекты</span>
              </h2>
            </div>
            <p className="max-w-md text-sm text-slate-400 leading-relaxed">
              Демонстрационные веб-сайты и продающая инфографика для маркетплейсов. Нажмите на проект, чтобы перейти на полноценный сайт или открыть просмотр.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-full px-5 py-2 text-xs font-medium transition-all ${
                filter === "all"
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                  : "bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-white"
              }`}
            >
              Все работы ({projects.length})
            </button>
            <button
              onClick={() => setFilter("websites")}
              className={`rounded-full px-5 py-2 text-xs font-medium transition-all ${
                filter === "websites"
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                  : "bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-white"
              }`}
            >
              Веб-сайты ({projects.filter((p) => p.category === "websites").length})
            </button>
            <button
              onClick={() => setFilter("marketplaces")}
              className={`rounded-full px-5 py-2 text-xs font-medium transition-all ${
                filter === "marketplaces"
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                  : "bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-white"
              }`}
            >
              Маркетплейсы ({projects.filter((p) => p.category === "marketplaces").length})
            </button>
          </div>
        </Reveal>

        <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {filteredProjects.map((project) => {
            const isInternalRoute = project.href.startsWith("/projects/");
            const isExternalLink = project.href.startsWith("http");

            return (
              <StaggerItem key={project.title}>
                <TiltCard className="group h-full rounded-3xl" max={6}>
                  <article className="glass relative flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-500 group-hover:border-cyan-400/30 group-hover:shadow-[0_20px_60px_-20px_rgba(34,211,238,0.3)]">
                    {isInternalRoute ? (
                      <Link href={project.href} className="block cursor-pointer">
                        <ProjectMock image={project.image} accent={project.accent} title={project.tag} />
                      </Link>
                    ) : isExternalLink ? (
                      <a href={project.href} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
                        <ProjectMock image={project.image} accent={project.accent} title={project.tag} />
                      </a>
                    ) : (
                      <div
                        onClick={() => setPreviewImage({ src: project.image, title: project.title, desc: project.desc })}
                        className="block cursor-pointer"
                      >
                        <ProjectMock image={project.image} accent={project.accent} title={project.tag} />
                      </div>
                    )}

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
                        {isInternalRoute ? (
                          <Link
                            href={project.href}
                            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 text-xs font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
                          >
                            Смотреть проект
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>
                        ) : isExternalLink ? (
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 text-xs font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
                          >
                            Открыть сайт
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <button
                            onClick={() => setPreviewImage({ src: project.image, title: project.title, desc: project.desc })}
                            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white/[0.08] px-4 text-xs font-semibold text-white transition-all duration-300 hover:bg-white/20"
                          >
                            <Eye className="h-3.5 w-3.5 text-cyan-400" />
                            Просмотр дизайна
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>

      {/* Lightbox Modal for Marketplace Cards */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl border border-white/15 bg-slate-900 p-6 shadow-2xl">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-xl font-bold text-white">{previewImage.title}</h3>
            <p className="mt-1 text-xs text-slate-400">{previewImage.desc}</p>
            <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-2xl bg-black">
              <Image
                src={previewImage.src}
                alt={previewImage.title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

