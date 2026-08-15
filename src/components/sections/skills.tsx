"use client";

import { Pen, Rocket, Layers, Code, Terminal, Atom, Figma, Sparkles, Smartphone, Github, Globe, Eye, type LucideIcon } from "lucide-react";
import { TiltCard } from "@/components/effects/tilt-card";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/effects/reveal";
import { skills } from "@/config/site";

const iconMap: Record<string, LucideIcon> = { pen: Pen, rocket: Rocket, layers: Layers, code: Code, terminal: Terminal, atom: Atom, figma: Figma, sparkles: Sparkles, smartphone: Smartphone, github: Github, globe: Globe, eye: Eye };

export function Skills() {
  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute left-[-10%] top-1/3 h-96 w-96 rounded-full bg-cyan-600/10 blur-[120px]" aria-hidden />
      <div className="container-x relative">
        <Reveal><div className="mx-auto max-w-2xl text-center"><span className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">Stack</span><h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-5xl">Инструменты, которыми я <span className="text-gradient">создаю</span></h2><p className="mt-4 text-slate-400">От концепции и Figma до production frontend, motion и deployment.</p></div></Reveal>
        <StaggerGroup className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" stagger={0.06}>
          {skills.map((skill) => { const Icon = iconMap[skill.icon] ?? Code; return <StaggerItem key={skill.title}><TiltCard className="h-full rounded-2xl" max={12}><div className="glass group relative flex h-full min-h-36 flex-col justify-between overflow-hidden rounded-2xl p-5"><div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${skill.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-10`} aria-hidden /><Icon className="h-6 w-6 text-slate-300 transition-all duration-300 group-hover:scale-110 group-hover:text-white" /><div><h3 className="text-sm font-semibold text-white transition-colors group-hover:text-cyan-200">{skill.title}</h3><p className="mt-1 hidden text-xs leading-relaxed text-slate-500 sm:block">{skill.desc}</p></div><div className={`absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r ${skill.accent} transition-transform duration-500 group-hover:scale-x-100`} /></div></TiltCard></StaggerItem>; })}
        </StaggerGroup>
      </div>
    </section>
  );
}
