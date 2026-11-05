"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import { sound } from "@/lib/audio";
import { Zap, Activity, CheckCircle2, SlidersHorizontal, Terminal, Sparkles, ShieldCheck } from "lucide-react";

export default function InteractiveShowcase() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(10, Math.min(90, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percent = Math.max(10, Math.min(90, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  return (
    <section className="relative bg-[#08090B] py-24 border-t border-b border-white/[0.08] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="font-mono text-xs text-[#00D9FF] uppercase tracking-[0.25em] mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Interactive Architecture Demonstration</span>
            </div>
            <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight uppercase">
              From Raw Code<span className="text-[#00D9FF]">.</span> To Living Intelligence<span className="text-[#00D9FF]">.</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-white/50 max-w-md">
            Drag the divider to inspect how algorithmic data models transform into actionable clinical intelligence in AstroVitals &amp; Asclepius.
          </p>
        </div>

        {/* Interactive Comparison Slider Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative h-[480px] md:h-[520px] rounded-2xl overflow-hidden border border-white/10 bg-[#111418] cursor-ew-resize select-none shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
        >
          {/* SIDE A: RAW DATA & CODE (Underneath) */}
          <div className="absolute inset-0 bg-[#0c0e12] p-6 md:p-10 font-mono text-xs md:text-sm text-white/80 overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2 text-white/40">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs text-[#00D9FF] flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>terminal // asclepius-engine.ts</span>
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">[RAW INPUT TELEMETRY]</span>
              </div>

              <pre className="text-white/70 leading-relaxed font-mono text-[11px] md:text-xs overflow-hidden">
                <code>
{`// ASTROVITALS & ASCLEPIUS REASONING ENGINE
interface AstronautVitalsPayload {
  astronaut_id: "ORBIT-04",
  biometrics: {
    heart_rate_bpm: 114,
    spO2_percent: 94.2,
    systolic_bp: 138,
    diastolic_bp: 88,
    core_temp_c: 38.4
  },
  symptoms: ["acute_cephalalgia", "ocular_strain", "microgravity_fatigue"],
  spatial_radiation_mSv: 1.82,
  diagnostic_model: "gemini-1.5-pro-vision-medical",
  language_target: ["en-US"],
  offline_cache_hash: "0x7F9B1E43D8"
}

// Executing Autonomous Triage Logic...
const diagnosis = await MedicalIntelligence.infer({
  confidence_threshold: 0.94,
  generateClinicalSummary: true
});`}
                </code>
              </pre>
            </div>

            <div className="flex items-center gap-4 text-white/40 text-[11px]">
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Synthesis Buffer
              </span>
              <span>Input Bytes: 1,420</span>
              <span>Inference: 34ms</span>
            </div>
          </div>

          {/* SIDE B: LIVING INTELLIGENCE (Clipped on top) */}
          <div
            className="absolute inset-0 bg-[#08090B] p-6 md:p-10 border-r border-[#00D9FF] overflow-hidden flex flex-col justify-between shadow-[10px_0_40px_rgba(0,217,255,0.25)]"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="w-[1000px] max-w-none">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 max-w-[850px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00D9FF] animate-ping" />
                  <span className="font-mono text-xs text-[#00D9FF] font-bold flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    <span>ASCLEPIUS CLINICAL DIAGNOSTIC MATRIX</span>
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  CONFIDENCE: 94.6%
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-[850px] mb-6">
                <div className="p-4 rounded-xl bg-[#111418] border border-white/10">
                  <div className="font-mono text-[10px] text-white/40 uppercase">Heart Rate</div>
                  <div className="font-display font-black text-2xl text-white mt-1">
                    114 <span className="text-xs text-white/40 font-mono">BPM</span>
                  </div>
                  <div className="font-mono text-[10px] text-amber-400 mt-1">Elevated (Mild Tachycardia)</div>
                </div>

                <div className="p-4 rounded-xl bg-[#111418] border border-white/10">
                  <div className="font-mono text-[10px] text-white/40 uppercase">Blood Oxygen (SpO2)</div>
                  <div className="font-display font-black text-2xl text-white mt-1">
                    94.2 <span className="text-xs text-white/40 font-mono">%</span>
                  </div>
                  <div className="font-mono text-[10px] text-[#00D9FF] mt-1">Sub-optimal Space Range</div>
                </div>

                <div className="p-4 rounded-xl bg-[#111418] border border-white/10">
                  <div className="font-mono text-[10px] text-white/40 uppercase">System Status</div>
                  <div className="font-display font-black text-2xl text-emerald-400 mt-1">
                    ACTIVE
                  </div>
                  <div className="font-mono text-[10px] text-white/40 mt-1">Clinical Directive Synthesized</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#111418] border border-white/10 max-w-[850px] space-y-2.5">
                <div className="font-mono text-[10px] text-[#00D9FF] uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Synthesized Clinical Summary (AI Recommendation)</span>
                </div>
                <p className="text-xs text-white/80 leading-relaxed font-sans">
                  Space-adapted microgravity cephalalgia detected with secondary ocular pressure elevation. Recommend immediate 300ml electrolyte rehydration, 20-minute cabin dark-cycle pause, and offline biometric tracking.
                </p>
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span>PROTOCOL: Administer 300ml electrolyte solution, reduce optical illumination for 20 minutes, and log continuous biometric telemetry.</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-[#00D9FF] pt-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Diagnostic rendered from raw telemetry in 34ms</span>
            </div>
          </div>

          {/* DRAGGABLE DIVIDER LINE & HANDLE */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-[#00D9FF] shadow-[0_0_15px_#00D9FF] pointer-events-none flex items-center justify-center"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="w-8 h-8 rounded-full bg-[#08090B] border-2 border-[#00D9FF] text-[#00D9FF] flex items-center justify-center text-xs shadow-lg font-mono">
              ↔
            </div>
          </div>
        </div>

        {/* Drag Helper Text */}
        <div className="flex items-center justify-between pt-4 font-mono text-[11px] text-white/40">
          <span className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3 h-3 text-[#00D9FF]" />
            <span>← Slide left/right to compare Raw Code vs Living UI →</span>
          </span>
          <span className="text-[#00D9FF]">Real architecture behind Asclepius &amp; AstroVitals</span>
        </div>
      </div>
    </section>
  );
}
