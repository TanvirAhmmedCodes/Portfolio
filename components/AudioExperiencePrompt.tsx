"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Sparkles } from "lucide-react";
import { sound } from "@/lib/audio";

export default function AudioExperiencePrompt() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkState = (enabled: boolean, isPlaying: boolean) => {
      if (enabled && !isPlaying) {
        const timer = setTimeout(() => {
          if (!sound.isPlaying() && sound.isEnabled()) {
            setVisible(true);
          }
        }, 700);
        return () => clearTimeout(timer);
      } else {
        setVisible(false);
      }
    };

    const unsubscribe = sound.subscribe((enabled, isPlaying) => {
      checkState(enabled, isPlaying);
    });

    return () => unsubscribe();
  }, []);

  const handleStart = () => {
    sound.handleUserSoundClick();
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 max-w-sm pointer-events-auto"
        >
          <div
            onClick={handleStart}
            role="button"
            tabIndex={0}
            className="flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-[#08090B]/95 border border-[#00D9FF]/40 text-[#F2F1ED] backdrop-blur-xl shadow-[0_0_30px_rgba(0,217,255,0.25)] hover:border-[#00D9FF] hover:shadow-[0_0_35px_rgba(0,217,255,0.4)] transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#00D9FF]/10 border border-[#00D9FF]/30 flex items-center justify-center text-[#00D9FF] group-hover:scale-110 transition-transform shrink-0">
              <Volume2 className="w-4 h-4 animate-pulse" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-mono font-bold text-[#00D9FF] tracking-wider uppercase flex items-center gap-1.5">
                Audio Experience
                <Sparkles className="w-3 h-3 text-[#00D9FF]" />
              </span>
              <span className="text-[11px] text-white/70 font-sans">
                Click anywhere or tap here to enable ambient sound
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

