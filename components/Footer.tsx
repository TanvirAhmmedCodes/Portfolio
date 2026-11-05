"use client";

import { motion } from "motion/react";
import { usePersonal } from "@/lib/usePersonal";
import { sound } from "@/lib/audio";
import Logo from "./ui/Logo";
import { ArrowUp, ArrowUpRight, Lock } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const personal = usePersonal();
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#08090B] border-t border-white/[0.08] overflow-hidden pt-20 pb-12">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_bottom,rgba(0,217,255,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08] items-start">
          
          {/* Brand & Statement (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3.5">
              <Logo size={36} />
              <div className="flex items-baseline gap-1">
                <span className="font-display font-black text-2xl tracking-tight text-white">
                  {personal.brand}
                </span>
                <span className="font-mono text-xs text-[#00D9FF] font-bold">®</span>
              </div>
            </div>

            <div className="font-display font-black text-3xl md:text-5xl text-white tracking-tight leading-none uppercase">
              {personal.name.split(" ").slice(0, 2).join(" ")} <span className="text-[#00D9FF]">{personal.name.split(" ").slice(2).join(" ") || "AHMMED"}.</span>
            </div>

            <p className="font-serif italic text-lg md:text-xl text-white/70 max-w-lg">
              &ldquo;{personal.tagline.replace("\n", " ")}&rdquo;
            </p>

            <p className="font-mono text-xs text-[#00D9FF] uppercase tracking-[0.2em]">
              {personal.secondaryTagline || "Curious by Nature. Builder by Choice."}
            </p>
          </div>

          {/* Navigation Links & Connect (5 cols) */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row justify-between gap-8">
            <div className="space-y-3">
              <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">
                NAVIGATION
              </div>
              {[
                { label: "Home", href: "#home" },
                { label: "Selected Projects", href: "#projects" },
                { label: "About Me", href: "#about" },
                { label: "Recognition", href: "#achievements" },
                { label: "Technical Arsenal", href: "#skills" },
                { label: "GitHub Engine", href: "#github" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => sound.playClick()}
                  className="block font-mono text-xs text-white/60 hover:text-[#00D9FF] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="space-y-6 flex flex-col justify-between">
              <div>
                <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">
                  CONNECT
                </div>
                <div className="space-y-2.5 font-mono text-xs">
                  <a
                    href={personal.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3 h-3 text-[#00D9FF]" />
                  </a>
                  <a
                    href={personal.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3 text-[#00D9FF]" />
                  </a>
                  <a
                    href={personal.social.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors"
                  >
                    <span>X (Twitter)</span>
                    <ArrowUpRight className="w-3 h-3 text-[#00D9FF]" />
                  </a>
                  <a
                    href={personal.social.buyMeACoffee}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors"
                  >
                    <span>Buy Me a Coffee</span>
                    <ArrowUpRight className="w-3 h-3 text-[#00D9FF]" />
                  </a>
                </div>
              </div>

              {/* Action Buttons: Back to top + Owner Portal */}
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={scrollToTop}
                  className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-[#00D9FF] bg-[#111418] text-xs font-mono text-white/70 hover:text-white transition-all w-fit"
                >
                  <span>Back to top</span>
                  <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 text-[#00D9FF]" />
                </button>

                <Link
                  href="/owner-access"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/5 hover:border-[#00D9FF]/40 bg-white/[0.02] text-[11px] font-mono text-white/40 hover:text-[#00D9FF] transition-all w-fit"
                  title="Owner CMS & Project Publisher"
                >
                  <Lock className="w-3 h-3 text-[#00D9FF]" />
                  <span>Admin / Owner Access</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Integrity Statement */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <div>
            © 2026 MD Tanvir Ahmmed · TANVIR. All rights reserved.
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Bangladesh University of Business &amp; Technology (BUBT)</span>
            <span className="text-white/20">|</span>
            <span className="text-[#00D9FF]">Mirpur, Dhaka</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
