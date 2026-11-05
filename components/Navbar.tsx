"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { navLinks } from "@/lib/config";
import { usePersonal } from "@/lib/usePersonal";
import { cn } from "@/lib/utils";
import { sound } from "@/lib/audio";
import Logo from "./ui/Logo";
import { Volume2, VolumeX, ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const personal = usePersonal();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Prime sound playback
    sound.setupGlobalAutoplay();

    // Subscribe to unified audio manager
    const unsubscribe = sound.subscribe((enabled, musicActive) => {
      setSoundEnabled(enabled);
      setIsPlaying(musicActive);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      unsubscribe();
    };
  }, []);

  const handleSoundToggle = () => {
    sound.toggle();
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#00D9FF] via-[#7ae5ff] to-[#00D9FF] origin-left z-[60] shadow-[0_0_12px_rgba(0,217,255,0.7)]"
      />

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#08090B]/94 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.85)]"
            : "bg-transparent",
        )}
      >
        <nav className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between h-20 md:h-24">
          {/* Left: Brand logo & name */}
          <a
            href="#home"
            onClick={() => sound.playClick()}
            className="flex items-center gap-3.5 group cursor-pointer"
          >
            <Logo size={36} />
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-black text-xl tracking-tight text-white group-hover:text-[#00D9FF] transition-colors">
                {personal.brand}
              </span>
              <span className="font-mono text-xs text-[#00D9FF] font-bold">®</span>
            </div>
          </a>

          {/* Center: Editorial navigation links */}
          <div className="hidden lg:flex items-center gap-8 px-6 py-2 rounded-full border border-white/[0.08] bg-[#111418]/70 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
                className="text-xs uppercase tracking-[0.2em] font-mono text-white/60 hover:text-white transition-colors relative py-1 group"
              >
                {l.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00D9FF] group-hover:w-full transition-all duration-300 rounded-full" />
              </a>
            ))}
          </div>

          {/* Right: Sound Controller + Let's Talk CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Unified Sound Toggle (Controls Music & Effects) */}
            <button
              onClick={handleSoundToggle}
              className={cn(
                "flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs font-mono transition-all duration-300 group cursor-pointer shadow-md",
                soundEnabled
                  ? "bg-[#00D9FF]/10 border-[#00D9FF]/50 text-[#00D9FF] hover:bg-[#00D9FF]/20"
                  : "bg-[#111418]/80 border-white/10 text-white/40 hover:text-white hover:border-white/20",
              )}
              title={soundEnabled ? "Mute All Sound & Music" : "Enable Sound & Background Music"}
            >
              {soundEnabled ? (
                <>
                  {/* Dynamic Sound Wave Bars */}
                  <div className="flex items-end gap-[2px] h-3">
                    <span
                      className={cn(
                        "w-[2px] rounded-full bg-[#00D9FF] transition-all",
                        isPlaying
                          ? "animate-[soundwave_0.8s_ease-in-out_infinite] h-3"
                          : "h-2",
                      )}
                    />
                    <span
                      className={cn(
                        "w-[2px] rounded-full bg-[#00D9FF] transition-all",
                        isPlaying
                          ? "animate-[soundwave_1.1s_ease-in-out_infinite_0.2s] h-3.5"
                          : "h-1.5",
                      )}
                    />
                    <span
                      className={cn(
                        "w-[2px] rounded-full bg-[#00D9FF] transition-all",
                        isPlaying
                          ? "animate-[soundwave_0.9s_ease-in-out_infinite_0.4s] h-2.5"
                          : "h-2",
                      )}
                    />
                  </div>
                  <span className="tracking-wider font-bold">SOUND ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-white/40" />
                  <span className="tracking-wider">SOUND OFF</span>
                </>
              )}
            </button>

            {/* Let's Talk CTA */}
            <a
              href="#contact"
              onClick={() => sound.playClick()}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00D9FF] text-[#08090B] font-display font-bold text-xs uppercase tracking-wider hover:bg-[#38e1ff] hover:shadow-[0_0_25px_rgba(0,217,255,0.45)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>Let&apos;s talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <button
              onClick={handleSoundToggle}
              className={cn(
                "p-2 rounded-lg border text-xs font-mono transition-all",
                soundEnabled
                  ? "bg-[#00D9FF]/10 border-[#00D9FF]/40 text-[#00D9FF]"
                  : "bg-[#111418] border-white/10 text-white/40",
              )}
              title="Toggle Sound"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-[#00D9FF]" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            <button
              aria-label="Toggle navigation menu"
              onClick={() => {
                sound.playClick();
                setOpen((v) => !v);
              }}
              className="p-2.5 rounded-lg border border-white/10 bg-[#111418]/80 text-white hover:text-[#00D9FF] transition-colors"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-[#08090B]/98 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-4">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => {
                      sound.playClick();
                      setOpen(false);
                    }}
                    className="font-display text-xl text-white/80 hover:text-[#00D9FF] py-2 border-b border-white/5 flex items-center justify-between"
                  >
                    <span>{l.label}</span>
                    <span className="font-mono text-xs text-[#00D9FF]">→</span>
                  </a>
                ))}

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={handleSoundToggle}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono",
                      soundEnabled
                        ? "bg-[#00D9FF]/10 border-[#00D9FF]/40 text-[#00D9FF]"
                        : "border-white/10 text-white/50",
                    )}
                  >
                    {soundEnabled ? (
                      <Volume2 className="w-3.5 h-3.5 text-[#00D9FF]" />
                    ) : (
                      <VolumeX className="w-3.5 h-3.5" />
                    )}
                    <span>{soundEnabled ? "SOUND ON" : "SOUND OFF"}</span>
                  </button>
                  <a
                    href="#contact"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#00D9FF] text-[#08090B] font-display font-bold text-xs uppercase"
                  >
                    <span>Let&apos;s talk</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
