import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}

export default function Section({ id, children, className, narrow }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-24 md:py-32",
        narrow ? "max-w-5xl mx-auto px-6" : "px-6 md:px-12",
        className,
      )}
    >
      {children}
    </section>
  );
}