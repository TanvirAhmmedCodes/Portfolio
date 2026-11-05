"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { usePersonal } from "@/lib/usePersonal";
import { sound } from "@/lib/audio";
import {
  ArrowDown,
  ArrowUpRight,
  Sparkles,
  MapPin,
  GraduationCap,
  Trophy,
  Award,
  Layers,
} from "lucide-react";

export default function Hero() {
  const personal = usePersonal();
  return (
    <section
      id="home"
      className="relative min-h-screen bg-[#08090B] flex flex-col justify-between overflow-hidden pt-24 md:pt-28 pb-8"
    >
      {/* 1. ARCHITECTURAL OVERSIZED BACKGROUND TYPOGRAPHY (Z-0) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span
          className="font-display font-black text-[20vw] leading-none text-white/[0.03] tracking-tighter uppercase whitespace-nowrap"
          style={{ letterSpacing: "-0.04em" }}
        >
          TANVIR
        </span>
      </div>

      {/* 2. AMBIENT ATMOSPHERIC GLOWS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(0,217,255,0.12)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#08090B] via-[#08090B]/80 to-transparent z-20" />
      </div>

      {/* 3. WIDE CINEMATIC HERO STAGE (Z-10) */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 md:px-12 flex-1 flex flex-col justify-center">
        
        {/* DESKTOP WIDE EDITORIAL STAGE (lg+) */}
        <div className="hidden lg:block relative w-full">
          {/* THE WIDE CINEMATIC PHOTOGRAPH CANVAS */}
          <div className="relative w-full h-[620px] xl:h-[680px] rounded-3xl overflow-hidden border border-white/10 bg-[#0d1014] shadow-[0_25px_80px_rgba(0,0,0,0.9)]">
            
            {/* The Full HD Wide Photograph */}
            <Image
              src="/tanvir-hero.jpg"
              alt="MD Tanvir Ahmmed - Personal Identity & Portrait"
              fill
              priority
              sizes="1440px"
              className="object-cover filter contrast-[1.05] brightness-[1.02]"
              style={{
                objectPosition: "72% 12%",
              }}
            />

            {/* Cinematic Gradient Overlays to preserve text readability and natural edge falloff */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#08090B]/95 via-[#08090B]/40 to-transparent w-[55%] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-transparent opacity-90 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#08090B]/60 via-transparent to-transparent h-28 pointer-events-none" />

            {/* Giant Bold Name Overlay Spanning Across the Hero */}
            <div className="absolute top-8 left-10 xl:left-14 z-20 pointer-events-none select-none">
              <span className="font-display font-black text-6xl xl:text-7xl text-white/10 tracking-tight uppercase block leading-none">
                {personal.name}
              </span>
            </div>

            {/* Left Content Column Overlay */}
            <div className="absolute inset-y-0 left-0 w-[55%] xl:w-[50%] p-10 xl:p-14 z-20 flex flex-col justify-center">
              {/* Live Status Pill */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#00D9FF]/40 bg-[#00D9FF]/10 backdrop-blur-md mb-5 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D9FF] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D9FF]"></span>
                </span>
                <span className="font-mono text-[11px] text-[#00D9FF] uppercase tracking-[0.2em] font-semibold">
                  {personal.title}
                </span>
              </div>

              <p className="font-serif italic text-2xl xl:text-3xl text-white/80 mb-2">
                Hello, I&apos;m
              </p>

              <h1 className="font-display font-black text-5xl xl:text-6xl text-white tracking-tight uppercase leading-[0.92] mb-4">
                {personal.name.split(" ").slice(0, 2).join(" ")}<br />
                <span className="text-white">{personal.name.split(" ").slice(2).join(" ") || "AHMMED"}<span className="text-[#00D9FF]">.</span></span>
              </h1>

              <div className="font-mono text-xs xl:text-sm text-[#00D9FF] uppercase tracking-[0.2em] font-bold mb-4">
                {personal.subtitle}
              </div>

              <p className="text-[#A7ABB3] text-sm xl:text-base font-light leading-relaxed mb-8 max-w-lg">
                Computer Science student exploring Artificial Intelligence, Machine Learning, and software systems -
                turning raw code into living intelligence.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mb-6">
                <a
                  href="#projects"
                  onClick={() => sound.playClick()}
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#00D9FF] text-[#08090B] font-display font-black text-xs uppercase tracking-wider rounded-md hover:bg-[#38e1ff] hover:shadow-[0_0_30px_rgba(0,217,255,0.45)] transition-all duration-300"
                >
                  <span>Explore My Work</span>
                  <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
                </a>

                <a
                  href="#contact"
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md border border-white/20 bg-black/40 backdrop-blur-md text-white font-display font-bold text-xs uppercase tracking-wider hover:border-[#00D9FF]/70 hover:bg-[#00D9FF]/10 hover:text-[#00D9FF] transition-all duration-300"
                >
                  <span>Let&apos;s Connect</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Metadata */}
              <div className="flex items-center gap-4 text-xs font-mono text-white/50 pt-2 border-t border-white/10">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#00D9FF]" />
                  <span>{personal.location}</span>
                </span>
                <span className="text-white/20">|</span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#00D9FF]" />
                  <span>BUBT · Class of {personal.expectedGraduation.split(" ").pop() || "2029"}</span>
                </span>
              </div>
            </div>

            {/* Right Bottom Floating Badges Overlay */}
            <div className="absolute bottom-6 right-6 xl:bottom-8 xl:right-8 z-20 flex flex-col gap-3">
              {/* Guiding Philosophy Snippet */}
              <div className="bg-[#08090B]/85 backdrop-blur-md border border-white/15 p-4 rounded-xl max-w-xs shadow-xl">
                <div className="font-mono text-[10px] text-[#00D9FF] uppercase tracking-wider flex items-center gap-1 mb-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Guiding Philosophy</span>
                </div>
                <p className="font-serif italic text-xs text-white/90">
                  &ldquo;{personal.tagline.replace("\n", " ")}&rdquo;
                </p>
              </div>

              {/* Accolades Pills */}
              <div className="flex items-center gap-2.5">
                <div className="px-3.5 py-2 rounded-xl bg-[#08090B]/85 border border-white/15 backdrop-blur-md text-right">
                  <div className="font-mono text-[9px] text-[#00D9FF] uppercase">1st Runner Up</div>
                  <div className="font-display font-bold text-xs text-white">Hacktasyne 2025</div>
                </div>

                <div className="px-3.5 py-2 rounded-xl bg-[#08090B]/85 border border-white/15 backdrop-blur-md text-right">
                  <div className="font-mono text-[9px] text-white/40 uppercase">Semi-Finalist</div>
                  <div className="font-display font-bold text-xs text-white">Hult Prize 2026</div>
                </div>

                <div className="px-3.5 py-2 rounded-xl bg-[#08090B]/85 border border-white/15 backdrop-blur-md text-right">
                  <div className="font-mono text-[9px] text-[#00D9FF] uppercase">Open Source</div>
                  <div className="font-display font-bold text-xs text-white">12+ Repos</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE & TABLET HERO STAGE (< lg) */}
        <div className="lg:hidden flex flex-col space-y-6">
          {/* Header */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00D9FF]/30 bg-[#00D9FF]/5 backdrop-blur-md mb-3">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D9FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00D9FF]"></span>
              </span>
              <span className="font-mono text-[10px] text-[#00D9FF] uppercase tracking-wider font-semibold">
                CSE Student · AI Explorer · BUBT
              </span>
            </div>

            <p className="font-serif italic text-lg text-white/70">
              Hello, I&apos;m
            </p>

            <h1 className="font-display font-black text-4xl sm:text-5xl leading-[0.9] tracking-tight text-white uppercase mt-1 mb-2">
              MD TANVIR<br />
              <span className="text-white">AHMMED<span className="text-[#00D9FF]">.</span></span>
            </h1>

            <div className="font-mono text-xs text-[#00D9FF] uppercase tracking-wider font-bold mb-1">
              Aspiring Software Engineer · Creative Builder
            </div>
          </div>

          {/* Wide Mobile Photograph Frame */}
          <div className="relative w-full h-[320px] sm:h-[420px] rounded-2xl overflow-hidden border border-white/15 bg-[#111418] shadow-2xl">
            <Image
              src="/tanvir-hero.jpg"
              alt="MD Tanvir Ahmmed - Portfolio Portrait"
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover filter contrast-[1.05] brightness-[1.02]"
              style={{
                objectPosition: "72% 15%",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-transparent opacity-80 pointer-events-none" />

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/90 bg-[#08090B]/85 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
              <span className="font-display font-bold text-white">MD TANVIR AHMMED</span>
              <span className="text-[#00D9FF] font-semibold">BUBT CSE · Dhaka</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-[#A7ABB3] text-sm leading-relaxed font-light">
            Computer Science student exploring Artificial Intelligence, Machine Learning, and software systems -
            turning raw code into living intelligence.
          </p>

          {/* Mobile Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#projects"
              onClick={() => sound.playClick()}
              className="w-full text-center py-3.5 bg-[#00D9FF] text-[#08090B] font-display font-black text-xs uppercase tracking-wider rounded-md shadow-lg"
            >
              Explore My Work ↓
            </a>
            <a
              href="#contact"
              onClick={() => sound.playClick()}
              className="w-full text-center py-3.5 border border-white/20 text-white font-display font-bold text-xs uppercase tracking-wider rounded-md bg-white/[0.03]"
            >
              Let&apos;s Connect ↗
            </a>
          </div>

          {/* Mobile Accolades */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <div className="p-3 rounded-xl bg-[#111418] border border-white/10">
              <div className="font-mono text-[9px] text-[#00D9FF] uppercase tracking-wider">1st Runner Up</div>
              <div className="font-display font-bold text-xs text-white mt-0.5">Hacktasyne 2025</div>
            </div>
            <div className="p-3 rounded-xl bg-[#111418] border border-white/10">
              <div className="font-mono text-[9px] text-white/40 uppercase tracking-wider">Semi-Finalist</div>
              <div className="font-display font-bold text-xs text-white mt-0.5">Hult Prize 2026</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. ARCHITECTURAL BOTTOM BAR */}
      <div className="relative z-20 border-t border-white/[0.08] bg-[#08090B]/90 backdrop-blur-md mt-6">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-3.5 flex items-center justify-between text-xs font-mono text-white/50">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-pulse" />
            <span className="tracking-widest uppercase text-[10px] md:text-xs">TANVIR.DEV // 2024-2029</span>
          </div>

          <a
            href="#projects"
            onClick={() => sound.playClick()}
            className="flex items-center gap-1.5 hover:text-[#00D9FF] transition-colors text-[10px] md:text-xs group"
          >
            <span className="tracking-widest uppercase">SCROLL TO DISCOVER</span>
            <ArrowDown className="w-3 h-3 transition-transform group-hover:translate-y-0.5 text-[#00D9FF]" />
          </a>

          <div className="hidden sm:block tracking-widest uppercase text-white/40 text-[10px] md:text-xs">
            BANGLADESH UNIVERSITY OF BUSINESS &amp; TECHNOLOGY
          </div>
        </div>
      </div>
    </section>
  );
}
