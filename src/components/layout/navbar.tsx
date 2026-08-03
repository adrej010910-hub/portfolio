"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks, siteConfig } from "@/config/site";
import { ThemeToggle } from "./theme-toggle";
import { Magnetic } from "@/components/effects/magnetic";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={cn(
            "flex w-full max-w-5xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6",
            scrolled
              ? "glass-strong shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)]"
              : "border border-transparent bg-transparent"
          )}
        >
          <a href="#top" className="group flex items-center gap-2.5">
            <span className="relative flex h-9 w-9 items-center justify-center">
              <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-500 to-fuchsia-500 opacity-90 blur-[1px] transition-transform duration-500 group-hover:rotate-12" />
              <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-sm font-bold text-white">
                {siteConfig.name.charAt(0)}
              </span>
            </span>
            <span className="hidden text-sm font-semibold tracking-wide text-white sm:block">
              {siteConfig.name}
              <span className="text-slate-400">.dev</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-colors duration-300 hover:text-white",
                  active === link.href && "text-white"
                )}
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <Magnetic strength={0.25} className="hidden sm:inline-block">
              <a
                href="#contact"
                className="inline-flex h-10 items-center rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 px-5 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(99,102,241,0.7)] transition-shadow hover:shadow-[0_10px_40px_-8px_rgba(99,102,241,0.9)]"
              >
                Обсудить проект
              </a>
            </Magnetic>
            <button
              onClick={() => setOpen(true)}
              aria-label="Открыть меню"
              className="glass flex h-11 w-11 items-center justify-center rounded-full text-white lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex flex-col bg-ink/90 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="text-lg font-bold text-white">{siteConfig.name}</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Закрыть меню"
                className="glass flex h-11 w-11 items-center justify-center rounded-full text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="py-3 text-3xl font-semibold text-slate-200 transition-colors hover:text-white"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="px-6 pb-10">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 text-base font-semibold text-white"
              >
                Обсудить проект
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

