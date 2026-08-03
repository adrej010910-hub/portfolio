import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "min-h-32 w-full rounded-xl bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-500",
          "border border-white/10 transition-all duration-300 resize-none",
          "focus:border-indigo-400/60 focus:bg-white/[0.06] focus:outline-none focus:ring-4 focus:ring-indigo-500/10",
          error && "border-rose-500/70 focus:border-rose-500 focus:ring-rose-500/10",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

