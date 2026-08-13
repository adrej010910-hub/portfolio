"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Layers } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

interface ShowcaseHeaderProps {
  title: string;
  category: string;
  currentSlug: string;
}

const projectsList = [
  { slug: "real-estate", label: "Real Estate" },
  { slug: "ai-saas", label: "AI SaaS" },
  { slug: "fashion-store", label: "Fashion Store" },
  { slug: "digital-agency", label: "Digital Agency" },
  { slug: "restaurant", label: "Restaurant" },
];

export function ShowcaseHeader({ title, category, currentSlug }: ShowcaseHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/#portfolio"
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Вернуться в</span> Портфолио
          </Link>
          <div className="hidden h-4 w-px bg-white/15 md:block" />
          <div className="hidden items-center gap-2 text-xs font-medium text-slate-400 md:flex">
            <span className="rounded bg-cyan-500/10 px-2 py-0.5 text-cyan-400 font-mono text-[11px] uppercase tracking-wider">
              {category}
            </span>
            <span className="text-white font-semibold">{title}</span>
          </div>
        </div>

        {/* Project Switcher Bar */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-1 rounded-full border border-white/10 bg-black/40 p-1">
            <span className="px-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Layers className="h-3 w-3" /> Демо:
            </span>
            {projectsList.map((p) => {
              const active = p.slug === currentSlug;
              return (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                    active
                      ? "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {p.label}
                </Link>
              );
            })}
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
