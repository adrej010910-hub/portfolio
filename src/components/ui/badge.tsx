import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05]",
        "px-3.5 py-1.5 text-xs font-medium tracking-wide text-slate-200 backdrop-blur-md",
        className
      )}
      {...props}
    />
  );
}

