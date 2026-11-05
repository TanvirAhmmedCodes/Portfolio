import { cn } from "@/lib/utils";
import { ReactNode, forwardRef, ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, asChild = false, children, ...props }, ref) => {
    const variants = {
      primary:
        "bg-[#00D9FF] text-[#08090B] font-display font-bold tracking-wider uppercase hover:shadow-[0_0_50px_rgba(0,217,255,0.35)] active:scale-[0.97]",
      ghost:
        "border border-white/12 text-white/80 hover:border-[#00D9FF]/40 hover:text-[#00D9FF] hover:bg-[#00D9FF]/5",
      outline:
        "border border-white/15 text-white/80 hover:border-[#00D9FF]/40 hover:text-white hover:bg-white/[0.03]",
    };
    const sizes = {
      sm: "px-5 py-2.5 text-xs",
      md: "px-7 py-3.5 text-sm",
      lg: "px-10 py-5 text-sm",
    };
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export default Button;
