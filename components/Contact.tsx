"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { usePersonal } from "@/lib/usePersonal";
import { sound } from "@/lib/audio";
import {
  Mail,
  Copy,
  Check,
  Send,
  Coffee,
  MapPin,
  GraduationCap,
  Clock,
  ArrowUpRight,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/BrandIcons";

export default function Contact() {
  const personal = usePersonal();
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const copyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1200);
  };

  const socials = [
    { label: "GitHub", handle: "@TanvirAhmmedCodes", url: personal.social.github, icon: GithubIcon },
    { label: "LinkedIn", handle: "tanvir-ahmmed-codes", url: personal.social.linkedin, icon: LinkedinIcon },
    { label: "X / Twitter", handle: "@Tanviir_Ahmmed", url: personal.social.x, icon: TwitterIcon },
    { label: "Buy Me a Coffee", handle: "tanvirahmmedcodes", url: personal.social.buyMeACoffee, icon: Coffee },
  ];

  return (
    <section id="contact" className="relative bg-[#08090B] py-28 md:py-36 border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/[0.08] gap-6">
          <div>
            <div className="font-mono text-xs text-[#00D9FF] uppercase tracking-[0.25em] mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>06 // INQUIRIES &amp; COLLABORATION</span>
            </div>
            <h2 className="font-display font-black text-4xl md:text-6xl text-white tracking-tight uppercase">
              Have an Idea<span className="text-[#00D9FF]">?</span> Let&apos;s Build Something<span className="text-[#00D9FF]">.</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-white/50 max-w-sm">
            Whether it&apos;s an ambitious hackathon team, open-source AI project, or software architecture discussion - let&apos;s connect.
          </p>
        </div>

        {/* 2-Column Contact Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Direct Channels, Copy Email & Social Links */}
          <div className="lg:col-span-5 space-y-8">
            {/* Primary Email Card */}
            <div className="rounded-2xl bg-[#111418] border border-white/[0.08] p-8 space-y-6 hover:border-[#00D9FF]/30 transition-colors shadow-lg">
              <div className="font-mono text-[10px] text-[#00D9FF] uppercase tracking-[0.25em] flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                <span>PRIMARY DIRECT CONTACT</span>
              </div>

              <div>
                <a
                  href={`mailto:${personal.email}`}
                  onClick={() => sound.playClick()}
                  className="font-display font-bold text-xl md:text-2xl text-white hover:text-[#00D9FF] transition-colors break-all"
                >
                  {personal.email}
                </a>
                <p className="font-mono text-xs text-white/40 mt-1 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-[#00D9FF]" />
                  <span>Average response: Within 24 hours</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.05] border border-white/10 hover:border-[#00D9FF] text-xs font-mono text-white transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied to clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy email address</span>
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${personal.email}`}
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#00D9FF] text-[#08090B] text-xs font-mono font-bold hover:bg-[#38e1ff] transition-all"
                >
                  <span>Open mail client</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Location & University Badge */}
            <div className="rounded-2xl bg-[#111418] border border-white/[0.08] p-8 space-y-4 hover:border-[#00D9FF]/30 transition-colors shadow-lg">
              <div className="font-mono text-[10px] text-[#00D9FF] uppercase tracking-[0.25em]">
                LOCATION &amp; ACADEMICS
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2.5 text-white/80">
                  <MapPin className="w-4 h-4 text-[#00D9FF]" />
                  <span>Mirpur, Dhaka, Bangladesh</span>
                </div>
                <div className="flex items-center gap-2.5 text-white/80">
                  <GraduationCap className="w-4 h-4 text-[#00D9FF]" />
                  <span>BUBT · Class of 2029 (B.Sc in CSE)</span>
                </div>
              </div>
            </div>

            {/* Social Links List */}
            <div className="space-y-2">
              <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-3">
                DIRECT SOCIAL CHANNELS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-[#111418] border border-white/5 hover:border-[#00D9FF]/40 text-xs font-mono group transition-all"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className="w-4 h-4 text-white/50 group-hover:text-[#00D9FF] transition-colors flex-shrink-0" />
                        <span className="text-white/80 group-hover:text-white transition-colors truncate">
                          {s.label}
                        </span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-[#00D9FF] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#111418] border border-white/[0.08] p-8 md:p-10 shadow-lg">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <div>
                  <h3 className="font-display font-black text-2xl text-white">
                    Send a Message
                  </h3>
                  <p className="font-mono text-xs text-white/40 mt-1">
                    Direct dispatch to Tanvir&apos;s personal inbox
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/30 text-[10px] font-mono text-[#00D9FF]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
                  <span>READY</span>
                </div>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-[#00D9FF]/20 border border-[#00D9FF] mx-auto flex items-center justify-center text-[#00D9FF]">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="font-display font-black text-2xl text-white">
                    Message Dispatched Successfully!
                  </h4>
                  <p className="text-xs font-mono text-white/60 max-w-sm mx-auto">
                    Thank you for reaching out. Tanvir will review your message and respond shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block font-mono text-[11px] text-white/60 uppercase tracking-wider">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-[#08090B] border border-white/10 text-xs font-mono text-white placeholder-white/20 focus:outline-none focus:border-[#00D9FF] transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block font-mono text-[11px] text-white/60 uppercase tracking-wider">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#08090B] border border-white/10 text-xs font-mono text-white placeholder-white/20 focus:outline-none focus:border-[#00D9FF] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-[11px] text-white/60 uppercase tracking-wider">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Collaboration / Hackathon / Question"
                      className="w-full px-4 py-3 rounded-xl bg-[#08090B] border border-white/10 text-xs font-mono text-white placeholder-white/20 focus:outline-none focus:border-[#00D9FF] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-[11px] text-white/60 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your thoughts, project idea, or invitation..."
                      className="w-full px-4 py-3 rounded-xl bg-[#08090B] border border-white/10 text-xs font-mono text-white placeholder-white/20 focus:outline-none focus:border-[#00D9FF] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl bg-[#00D9FF] text-[#08090B] font-display font-black text-xs uppercase tracking-wider hover:bg-[#38e1ff] hover:shadow-[0_0_30px_rgba(0,217,255,0.4)] transition-all duration-300 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? "Transmitting..." : "Send Message ↗"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
