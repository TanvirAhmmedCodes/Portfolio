import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionTitleProps {
  label: string;
  title: ReactNode;
  className?: string;
}

export default function SectionTitle({ label, title, className }: SectionTitleProps) {
  return (
    <div className={cn("mb-20 relative", className)}>
      {/* Large editorial background text */}
      <div className="absolute -top-12 -left-4 pointer-events-none select-none overflow-visible">
        <span className="font-display font-black text-[18vw] leading-none text-white/[0.025] tracking-tighter">
          {label.toUpperCase()}
        </span>
      </div>

      <div className="flex items-center gap-6 mb-8 relative">
        <span className="font-mono text-xs tracking-[0.35em] text-[#00D9FF] uppercase">
          {label}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        <span className="font-mono text-xs text-white/20 hidden md:block">0{label.length}</span>
      </div>
      <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] leading-[0.9] text-white relative">
        {typeof title === "string" ? (
          <span className="block">{title}</span>
        ) : (
          title
        )}
      </h2>
    </div>
  );
}
