"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className, size = 38 }: LogoProps) {
  // Native emblem aspect ratio: 1195 / 805 ≈ 1.484
  const width = Math.round(size * 1.484);

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center transition-all duration-300 group-hover:scale-105",
        className,
      )}
      style={{ width, height: size }}
    >
      <div className="absolute inset-0 bg-[#00D9FF]/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <img
        src="/logo-transparent.png"
        alt="Tanvir Logo"
        width={width}
        height={size}
        className="w-full h-full object-contain filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] group-hover:drop-shadow-[0_0_16px_rgba(0,217,255,0.6)] transition-all duration-300"
      />
    </div>
  );
}
