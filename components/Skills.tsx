"use client";

import { motion } from "motion/react";
import { skills } from "@/lib/config";
import TechIcon from "@/components/ui/TechIcon";
import { Cpu, Code2, Globe, Database, Wrench, Sparkles } from "lucide-react";

export default function Skills() {
  const domainGroups = [
    {
      label: "PROGRAMMING LANGUAGES",
      description: "Core algorithmic foundations and type-safe systems",
      icon: Code2,
      items: skills.programming,
    },
    {
      label: "WEB DEVELOPMENT & FRAMEWORKS",
      description: "Modern component architectures, APIs, and interfaces",
      icon: Globe,
      items: skills.web,
    },
    {
      label: "DATABASE & PERSISTENCE",
      description: "Document stores, schema design, and query optimization",
      icon: Database,
      items: skills.database,
    },
    {
      label: "TOOLS & ENVIRONMENT",
      description: "Version control, workflow efficiency, and UNIX environments",
      icon: Wrench,
      items: skills.tools,
    },
    {
      label: "ACTIVE EXPLORATION & RESEARCH",
      description: "Emerging domains driving current experiments and learning",
      icon: Sparkles,
      items: skills.exploration,
    },
  ];

  return (
    <section id="skills" className="relative bg-[#08090B] py-28 md:py-36 border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/[0.08] gap-6">
          <div>
            <div className="font-mono text-xs text-[#00D9FF] uppercase tracking-[0.25em] mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span>04 // TECHNICAL ARSENAL</span>
            </div>
            <h2 className="font-display font-black text-4xl md:text-6xl text-white tracking-tight uppercase">
              Tools of My Curiosity<span className="text-[#00D9FF]">.</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-white/50 max-w-sm">
            Honest inventory of tools, languages, and technologies I actively use to write, debug, and build software.
          </p>
        </div>

        {/* Domain Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domainGroups.map((group, idx) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`rounded-2xl bg-[#111418] border border-white/[0.08] p-8 flex flex-col justify-between hover:border-[#00D9FF]/40 transition-all duration-300 shadow-lg ${
                  idx === 4 ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div>
                  <div className="font-mono text-[10px] text-[#00D9FF] uppercase tracking-[0.25em] mb-2 flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{group.label}</span>
                  </div>
                  <p className="font-mono text-xs text-white/40 mb-6">
                    {group.description}
                  </p>

                  <div className="flex flex-wrap gap-2.5">
                    {group.items.map((tech) => (
                      <div
                        key={tech}
                        className="group/item flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#08090B] border border-white/5 hover:border-[#00D9FF]/40 transition-all duration-200"
                      >
                        <div className="w-5 h-5 flex items-center justify-center text-white/60 group-hover/item:text-[#00D9FF] transition-colors">
                          <TechIcon name={tech} className="w-4 h-4" />
                        </div>
                        <span className="font-mono text-xs text-white/80 group-hover/item:text-white transition-colors">
                          {tech}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                  <span>Domain verified</span>
                  <span className="text-[#00D9FF]">Active use</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
