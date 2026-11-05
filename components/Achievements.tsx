"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { achievements as defaultAchievements, Achievement } from "@/lib/config";
import { Trophy, Award, Sparkles } from "lucide-react";

export default function Achievements() {
  const [list, setList] = useState<Achievement[]>(defaultAchievements);

  useEffect(() => {
    fetch("/api/owner-data")
      .then((res) => res.json())
      .then((data) => {
        if (data.achievements && Array.isArray(data.achievements)) {
          setList(data.achievements);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="achievements" className="relative bg-[#08090B] py-28 md:py-36 border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* 2-Column Recognition Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Section Title, Statement & Big Metric */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <div className="font-mono text-xs text-[#00D9FF] uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                <span>03 // RECOGNITION &amp; AWARDS</span>
              </div>
              <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[0.95] uppercase">
                Built With Curiosity<span className="text-[#00D9FF]">.</span>
                <span className="block text-white/90">
                  Recognized Through Action<span className="text-[#00D9FF]">.</span>
                </span>
              </h2>
            </div>

            <p className="text-[#A7ABB3] font-light text-base leading-relaxed">
              Competitive validation for turning academic curiosity into functional, high-impact software solutions under time and design constraints.
            </p>

            {/* Big Stat Box */}
            <div className="inline-flex items-center gap-6 p-6 rounded-2xl bg-[#111418] border border-white/[0.08] hover:border-[#00D9FF]/40 transition-colors shadow-lg">
              <div className="font-display font-black text-6xl text-[#00D9FF]">
                {list.length.toString().padStart(2, "0")}<span className="text-xl text-white font-mono ml-1">+</span>
              </div>
              <div className="space-y-1">
                <div className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#00D9FF]" />
                  <span>Competitive Honors</span>
                </div>
                <div className="font-mono text-xs text-white/40">
                  Hackathons &amp; Global Initiatives
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Editorial Award List */}
          <div className="lg:col-span-7 space-y-6">
            {list.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="group relative rounded-2xl bg-[#111418] border border-white/[0.08] hover:border-[#00D9FF]/40 p-8 transition-all duration-300 shadow-lg hover:-translate-y-1"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-white/5">
                  <div className="flex items-start gap-4">
                    <span className="font-display font-black text-2xl text-[#00D9FF]">
                      {item.index}
                    </span>
                    <div>
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/20 font-mono text-[10px] text-[#00D9FF] uppercase tracking-wider mb-2">
                        <Sparkles className="w-3 h-3" />
                        <span>{item.badge}</span>
                      </div>
                      <h3 className="font-display font-black text-2xl text-white group-hover:text-[#00D9FF] transition-colors">
                        {item.title}
                      </h3>
                      <div className="font-mono text-xs text-white/50 mt-1">
                        {item.event} · {item.organizer}
                      </div>
                    </div>
                  </div>

                  <div className="font-display font-black text-4xl sm:text-5xl text-white/40 group-hover:text-white transition-colors text-right">
                    {item.year}
                  </div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="text-white/40 font-mono">Featured Solution: </span>
                    <span className="text-white font-mono font-bold">{item.project}</span>
                  </div>
                  <div className="text-[#A7ABB3] font-light max-w-md">
                    {item.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
