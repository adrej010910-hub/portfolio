"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Переключить тему"
      className={cn(
        "glass relative inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-200",
        "transition-all duration-300 hover:border-white/25 hover:text-white active:scale-95",
        className
      )}
    >
      {!mounted ? (
        <div className="h-4 w-4 rounded-full bg-slate-500/40" />
      ) : (
        <>
          <Sun
            className={cn(
              "absolute h-[18px] w-[18px] transition-all duration-500",
              theme === "dark" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            )}
          />
          <Moon
            className={cn(
              "absolute h-[18px] w-[18px] transition-all duration-500",
              theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
            )}
          />
        </>
      )}
    </button>
  );
}

