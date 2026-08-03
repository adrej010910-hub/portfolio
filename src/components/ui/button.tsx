import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2/60 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 bg-[length:200%_auto] text-white shadow-[0_8px_40px_-8px_rgba(99,102,241,0.7)] hover:bg-right hover:shadow-[0_12px_50px_-8px_rgba(99,102,241,0.9)]",
        outline:
          "glass text-white hover:border-white/25 hover:bg-white/[0.08]",
        ghost: "text-slate-300 hover:text-white hover:bg-white/[0.06]",
      },
      size: {
        default: "h-12 px-7 text-sm",
        lg: "h-14 px-9 text-base",
        sm: "h-10 px-5 text-sm",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

