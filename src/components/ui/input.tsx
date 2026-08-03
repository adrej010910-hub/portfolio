import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "h-12 w-full rounded-xl bg-white/[0.04] px-4 text-sm text-white placeholder:text-slate-500",
          "border border-white/10 transition-all duration-300",
          "focus:border-indigo-400/60 focus:bg-white/[0.06] focus:outline-none focus:ring-4 focus:ring-indigo-500/10",
          error && "border-rose-500/70 focus:border-rose-500 focus:ring-rose-500/10",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

