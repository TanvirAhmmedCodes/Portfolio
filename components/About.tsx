"use client";

import { motion } from "motion/react";
import { usePersonal } from "@/lib/usePersonal";
import { sound } from "@/lib/audio";
import {
  GraduationCap,
  Sparkles,
  ArrowUpRight,
  BookOpen,
  Code2,
  Trophy,
  HeartHandshake,
  Compass,
} from "lucide-react";

export default function About() {
  const personal = usePersonal();
  return (
    <section id="about" className="relative bg-[#08090B] py-28 md:py-36 border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/[0.08] gap-6">
          <div>
            <div className="font-mono text-xs text-[#00D9FF] uppercase tracking-[0.25em] mb-3 flex items-center gap-2">
              <Compass className="w-4 h-4" />
              <span>02 // BEHIND THE SCREENS</span>
            </div>
            <h2 className="font-display font-black text-4xl md:text-6xl text-white tracking-tight uppercase">
              More Than Just Code<span className="text-[#00D9FF]">.</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-white/50 max-w-sm">
            Curious by nature. Builder by choice. Exploring the frontiers where human need meets computational intelligence.
          </p>
        </div>

        {/* 3-Column Editorial Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* COLUMN 1: Academic Identity & Credentials (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 rounded-2xl bg-[#111418] border border-white/[0.08] p-8 flex flex-col justify-between hover:border-[#00D9FF]/30 transition-colors shadow-lg"
          >
            <div>
              <div className="font-mono text-[10px] text-[#00D9FF] uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>ACADEMIC FOUNDATION</span>
              </div>

              <h3 className="font-display font-bold text-2xl text-white mb-2">
                {personal.degree}
              </h3>
              <p className="font-mono text-xs text-[#00D9FF] mb-6">
                {personal.university}
              </p>

              <div className="space-y-4 pt-4 border-t border-white/5 font-mono text-xs">
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-white/40">Status:</span>
                  <span className="text-white font-semibold">{personal.academicStatus}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-white/40">Expected Graduation:</span>
                  <span className="text-white font-semibold">{personal.expectedGraduation}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-white/40">Location:</span>
                  <span className="text-white">{personal.location}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-white/40">Primary Focus:</span>
                  <span className="text-[#00D9FF]">AI &amp; Software Systems</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <p className="text-xs text-[#A7ABB3] leading-relaxed font-light">
                Rigorous grounding in Data Structures, Algorithms, Object-Oriented Systems, and discrete computational mathematics at BUBT.
              </p>
            </div>
          </motion.div>

          {/* COLUMN 2: Journey & Methodology Timeline (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 rounded-2xl bg-[#111418] border border-white/[0.08] p-8 flex flex-col justify-between hover:border-[#00D9FF]/30 transition-colors shadow-lg"
          >
            <div>
              <div className="font-mono text-[10px] text-[#00D9FF] uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>FROM CURIOSITY TO ARCHITECTURE</span>
              </div>

              {/* Timeline Steps */}
              <div className="space-y-6">
                {[
                  {
                    step: "01",
                    title: "THE CURIOSITY",
                    desc: "Dissecting how complex algorithms, deep neural nets, and systems communicate behind the scenes.",
                    icon: BookOpen,
                  },
                  {
                    step: "02",
                    title: "THE PROTOTYPE",
                    desc: "Writing clean C, C++, Python, and TypeScript to validate logic and push system boundaries.",
                    icon: Code2,
                  },
                  {
                    step: "03",
                    title: "THE ARENA",
                    desc: "Testing engineering skills under pressure in competitive hackathons (Hacktasyne, Hult Prize, NASA Space Apps).",
                    icon: Trophy,
                  },
                  {
                    step: "04",
                    title: "THE IMPACT",
                    desc: "Architecting software for healthcare, agriculture, and civic infrastructure that creates tangible social value.",
                    icon: HeartHandshake,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.step} className="flex items-start gap-4 group">
                      <span className="font-display font-black text-lg text-[#00D9FF] group-hover:scale-110 transition-transform">
                        {item.step}
                      </span>
                      <div className="space-y-1">
                        <div className="font-display font-bold text-sm text-white tracking-wide group-hover:text-[#00D9FF] transition-colors flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5 text-[#00D9FF]" />
                          <span>{item.title}</span>
                        </div>
                        <p className="text-xs text-[#A7ABB3] font-light leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 font-mono text-[11px] text-white/40">
              Honest portrayal: {personal.academicStatus} student dedicated to craftsmanship, self-discipline, and continuous exploration.
            </div>
          </motion.div>

          {/* COLUMN 3: Editorial Philosophy Card (3 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 rounded-2xl bg-gradient-to-b from-[#111418] via-[#0d1620] to-[#08090B] border border-[#00D9FF]/30 p-8 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,217,255,0.08)]"
          >
            <div>
              <div className="font-serif text-5xl text-[#00D9FF]/80 leading-none mb-6">
                &ldquo;
              </div>

              <blockquote className="space-y-4">
                <p className="font-serif italic text-xl text-white leading-relaxed whitespace-pre-line">
                  {personal.tagline}
                </p>
                <p className="text-sm text-[#A7ABB3] font-light leading-relaxed">
                  &ldquo;{personal.secondaryTagline || "I believe technology should not only solve problems but also make the world a better place."}&rdquo;
                </p>
              </blockquote>
            </div>

            <div className="pt-8 border-t border-white/10 mt-8">
              <div className="font-serif italic text-2xl text-white font-medium mb-1">
                {personal.name}
              </div>
              <div className="font-mono text-[10px] text-[#00D9FF] uppercase tracking-widest">
                {personal.brand} // BANGLADESH
              </div>

              <div className="mt-6">
                <a
                  href="#contact"
                  onClick={() => sound.playClick()}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-md bg-[#00D9FF] text-[#08090B] font-display font-bold text-xs uppercase tracking-wider hover:bg-[#38e1ff] transition-colors"
                >
                  <span>Connect With Me</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
