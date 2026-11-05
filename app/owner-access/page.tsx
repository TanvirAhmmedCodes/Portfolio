"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { personal, skills } from "@/lib/config";
import {
  Trophy,
  Award,
  Code2,
  Plus,
  Trash2,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Lock,
  ArrowLeft,
  Sparkles,
  Save,
  User,
  RefreshCw,
} from "lucide-react";

interface AchievementItem {
  id: string;
  index: string;
  title: string;
  year: string;
  event: string;
  organizer: string;
  project: string;
  category: string;
  description: string;
  badge: string;
  reward?: string;
}

interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  repo: string;
  demo?: string;
  language: string;
  category: string;
  tags: string[];
}

export default function OwnerAccess() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"achievements" | "projects" | "personal">("achievements");

  // Dynamic state
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [notification, setNotification] = useState("");

  // Personal & Academic Identity Form State
  const [personalData, setPersonalData] = useState({
    name: personal.name,
    brand: personal.brand,
    tagline: personal.tagline,
    secondaryTagline: personal.secondaryTagline,
    title: personal.title,
    subtitle: personal.subtitle,
    university: personal.university,
    degree: personal.degree,
    academicStatus: personal.academicStatus,
    expectedGraduation: personal.expectedGraduation,
    location: personal.location,
    email: personal.email,
    shortBio: personal.shortBio,
  });

  // New Achievement Form State
  const [newAch, setNewAch] = useState({
    title: "",
    event: "",
    organizer: "",
    project: "",
    year: "2025",
    badge: "Hackathon Award",
    reward: "Certificate & Award",
    category: "Smart Solutions",
    description: "",
  });

  // New Project Form State
  const [newProj, setNewProj] = useState({
    title: "",
    tagline: "",
    description: "",
    repo: "https://github.com/TanvirAhmmedCodes/",
    demo: "",
    language: "Python",
    category: "AI & Healthcare",
    tags: "AI, Python, Next.js",
  });

  const loadData = async () => {
    try {
      const res = await fetch("/api/owner-data");
      const data = await res.json();
      if (data.achievements) setAchievements(data.achievements);
      if (data.projects) setProjects(data.projects);
      if (data.personal) {
        setPersonalData({
          name: data.personal.name || personal.name,
          brand: data.personal.brand || personal.brand,
          tagline: data.personal.tagline || personal.tagline,
          secondaryTagline: data.personal.secondaryTagline || personal.secondaryTagline,
          title: data.personal.title || personal.title,
          subtitle: data.personal.subtitle || personal.subtitle,
          university: data.personal.university || personal.university,
          degree: data.personal.degree || personal.degree,
          academicStatus: data.personal.academicStatus || personal.academicStatus,
          expectedGraduation: data.personal.expectedGraduation || personal.expectedGraduation,
          location: data.personal.location || personal.location,
          email: data.personal.email || personal.email,
          shortBio: data.personal.shortBio || personal.shortBio,
        });
      }
    } catch (err) {
      console.error("Failed to load CMS data:", err);
    }
  };

  const handleSavePersonal = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/owner-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_personal",
          personal: personalData,
        }),
      });
      const data = await res.json();
      if (data.success) {
        if (data.personal) {
          setPersonalData(data.personal);
        }
        setNotification("Personal & Academic Identity successfully updated! Changes are now live on your portfolio.");
        setTimeout(() => setNotification(""), 5000);
      } else {
        setError(data.error || "Failed to update personal identity.");
      }
    } catch {
      setError("An error occurred while updating personal identity.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/owner-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        setAuthenticated(true);
        loadData();
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/owner-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add_achievement",
          item: newAch,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAchievements(data.achievements);
        setNotification("Achievement published successfully! It now appears on your live portfolio.");
        setTimeout(() => setNotification(""), 4000);
        setNewAch({
          title: "",
          event: "",
          organizer: "",
          project: "",
          year: "2025",
          badge: "Award",
          reward: "Certificate",
          category: "General",
          description: "",
        });
      }
    } catch {
      setError("Failed to save achievement.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const tagList = newProj.tags.split(",").map((t) => t.trim()).filter(Boolean);
      const res = await fetch("/api/owner-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add_project",
          item: {
            ...newProj,
            tags: tagList,
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
        setNotification("Project published successfully! It now appears in your Selected Work.");
        setTimeout(() => setNotification(""), 4000);
        setNewProj({
          title: "",
          tagline: "",
          description: "",
          repo: "https://github.com/TanvirAhmmedCodes/",
          demo: "",
          language: "Python",
          category: "AI & Healthcare",
          tags: "AI, Python",
        });
      }
    } catch {
      setError("Failed to save project.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (type: "achievement" | "project", id: string) => {
    if (!confirm("Are you sure you want to remove this item?")) return;
    try {
      const res = await fetch("/api/owner-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete_item",
          type,
          id,
        }),
      });
      const data = await res.json();
      if (data.success) {
        if (data.achievements) setAchievements(data.achievements);
        if (data.projects) setProjects(data.projects);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#08090B] flex items-center justify-center px-6 selection:bg-[#00D9FF] selection:text-[#08090B]">
        <div className="w-full max-w-md bg-[#111418] border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#00D9FF]/10 border border-[#00D9FF]/30 mx-auto flex items-center justify-center text-[#00D9FF] mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-display font-black text-3xl text-white">
              TANVIR <span className="text-[#00D9FF]">CMS</span>
            </h1>
            <p className="font-mono text-xs text-white/40 uppercase tracking-widest mt-1">
              Private Owner Control Center
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="font-mono text-xs text-white/60 uppercase tracking-wider block">
                Security Passcode
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter access code..."
                className="w-full bg-[#08090B] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-[#00D9FF] focus:outline-none transition-colors font-mono text-sm"
              />
            </div>

            {error && (
              <div className="text-red-400 text-xs font-mono p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#00D9FF] text-[#08090B] font-display font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#38e1ff] transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Access Dashboard ↗"}
            </button>
          </form>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-white/40 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08090B] text-[#F2F1ED] font-sans selection:bg-[#00D9FF] selection:text-[#08090B]">
      {/* Top Bar */}
      <header className="border-b border-white/10 bg-[#111418]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="font-display font-black text-xl text-white">
              TANVIR <span className="text-[#00D9FF]">CONTROL CENTER</span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Owner Authenticated</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1 font-mono text-xs text-white/70 hover:text-[#00D9FF] transition-colors"
            >
              <span>View Live Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => setAuthenticated(false)}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-mono transition-colors"
            >
              Lock CMS
            </button>
          </div>
        </div>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div className="bg-emerald-500/15 border-b border-emerald-500/30 text-emerald-300 py-3 px-6 text-center text-xs font-mono flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main CMS Layout */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-4 gap-8">
        
        {/* Sidebar Nav */}
        <aside className="space-y-2">
          <button
            onClick={() => setActiveTab("achievements")}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all text-left ${
              activeTab === "achievements"
                ? "bg-[#00D9FF] text-[#08090B] font-bold shadow-lg"
                : "bg-[#111418] text-white/70 hover:text-white border border-white/5"
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Achievements &amp; Certificates</span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all text-left ${
              activeTab === "projects"
                ? "bg-[#00D9FF] text-[#08090B] font-bold shadow-lg"
                : "bg-[#111418] text-white/70 hover:text-white border border-white/5"
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Project Publisher</span>
          </button>

          <button
            onClick={() => setActiveTab("personal")}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all text-left ${
              activeTab === "personal"
                ? "bg-[#00D9FF] text-[#08090B] font-bold shadow-lg"
                : "bg-[#111418] text-white/70 hover:text-white border border-white/5"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Identity &amp; Bio View</span>
          </button>
        </aside>

        {/* Content Pane */}
        <main className="lg:col-span-3 space-y-8">
          
          {/* TAB 1: ACHIEVEMENTS & CERTIFICATES PUBLISHER */}
          {activeTab === "achievements" && (
            <div className="space-y-8">
              {/* Form to Post New Achievement */}
              <div className="bg-[#111418] border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl">
                <div className="flex items-center gap-2 font-mono text-xs text-[#00D9FF] uppercase tracking-wider mb-2">
                  <Plus className="w-4 h-4" />
                  <span>Publish New Achievement or Certificate</span>
                </div>
                <h2 className="font-display font-black text-2xl text-white mb-6">
                  Post Competition Win / Award
                </h2>

                <form onSubmit={handleAddAchievement} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="font-mono text-[11px] text-white/60 uppercase">
                        Award Title / Rank *
                      </label>
                      <input
                        type="text"
                        required
                        value={newAch.title}
                        onChange={(e) => setNewAch({ ...newAch, title: e.target.value })}
                        placeholder="e.g. 1st Runner Up / Champion / Finalist"
                        className="w-full bg-[#08090B] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-[#00D9FF] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[11px] text-white/60 uppercase">
                        Event / Competition Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={newAch.event}
                        onChange={(e) => setNewAch({ ...newAch, event: e.target.value })}
                        placeholder="e.g. Hacktasyne 2025 / NASA Space Apps"
                        className="w-full bg-[#08090B] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-[#00D9FF] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-5">
                    <div className="space-y-1.5">
                      <label className="font-mono text-[11px] text-white/60 uppercase">
                        Organizer
                      </label>
                      <input
                        type="text"
                        value={newAch.organizer}
                        onChange={(e) => setNewAch({ ...newAch, organizer: e.target.value })}
                        placeholder="e.g. BUBT Innovation Club"
                        className="w-full bg-[#08090B] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-[#00D9FF] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[11px] text-white/60 uppercase">
                        Featured Project
                      </label>
                      <input
                        type="text"
                        value={newAch.project}
                        onChange={(e) => setNewAch({ ...newAch, project: e.target.value })}
                        placeholder="e.g. MedDoc Prescriber"
                        className="w-full bg-[#08090B] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-[#00D9FF] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[11px] text-white/60 uppercase">
                        Year
                      </label>
                      <input
                        type="text"
                        value={newAch.year}
                        onChange={(e) => setNewAch({ ...newAch, year: e.target.value })}
                        placeholder="2025"
                        className="w-full bg-[#08090B] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-[#00D9FF] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] text-white/60 uppercase">
                      Award Summary &amp; Impact Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newAch.description}
                      onChange={(e) => setNewAch({ ...newAch, description: e.target.value })}
                      placeholder="Brief details about what the project accomplished, judges' feedback, or prize awarded..."
                      className="w-full bg-[#08090B] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-[#00D9FF] focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#00D9FF] text-[#08090B] font-display font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#38e1ff] transition-all cursor-pointer shadow-lg disabled:opacity-50"
                  >
                    <Trophy className="w-4 h-4" />
                    <span>Publish Achievement to Portfolio</span>
                  </button>
                </form>
              </div>

              {/* Published Achievements List */}
              <div className="bg-[#111418] border border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <h3 className="font-display font-bold text-xl text-white">
                    Live Published Achievements ({achievements.length})
                  </h3>
                  <span className="font-mono text-xs text-[#00D9FF]">Auto-synced with Homepage</span>
                </div>

                <div className="space-y-3">
                  {achievements.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-[#08090B] border border-white/5 flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-[#00D9FF] font-bold">
                            #{item.index}
                          </span>
                          <span className="font-display font-bold text-sm text-white">
                            {item.title} - {item.event}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-white/60">
                            {item.year}
                          </span>
                        </div>
                        <p className="text-xs text-white/50 font-mono">
                          Project: {item.project} · {item.organizer}
                        </p>
                        <p className="text-xs text-[#A7ABB3] line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      {item.id.startsWith("custom-") && (
                        <button
                          onClick={() => handleDeleteItem("achievement", item.id)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                          title="Delete Custom Achievement"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECT PUBLISHER */}
          {activeTab === "projects" && (
            <div className="space-y-8">
              <div className="bg-[#111418] border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl">
                <div className="flex items-center gap-2 font-mono text-xs text-[#00D9FF] uppercase tracking-wider mb-2">
                  <Plus className="w-4 h-4" />
                  <span>Publish New Project</span>
                </div>
                <h2 className="font-display font-black text-2xl text-white mb-6">
                  Add Project to Selected Work
                </h2>

                <form onSubmit={handleAddProject} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="font-mono text-[11px] text-white/60 uppercase">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={newProj.title}
                        onChange={(e) => setNewProj({ ...newProj, title: e.target.value })}
                        placeholder="e.g. AstroVitals AI"
                        className="w-full bg-[#08090B] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-[#00D9FF] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[11px] text-white/60 uppercase">
                        Category *
                      </label>
                      <select
                        value={newProj.category}
                        onChange={(e) => setNewProj({ ...newProj, category: e.target.value })}
                        className="w-full bg-[#08090B] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-[#00D9FF] focus:outline-none"
                      >
                        <option value="AI & Healthcare">AI &amp; Healthcare</option>
                        <option value="AgriTech & IoT">AgriTech &amp; IoT</option>
                        <option value="Systems & Web">Systems &amp; Web</option>
                        <option value="Learning & Tools">Learning &amp; Tools</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] text-white/60 uppercase">
                      One-Line Tagline *
                    </label>
                    <input
                      type="text"
                      required
                      value={newProj.tagline}
                      onChange={(e) => setNewProj({ ...newProj, tagline: e.target.value })}
                      placeholder="e.g. Autonomous Space Medicine Biometric Reasoning Engine"
                      className="w-full bg-[#08090B] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-[#00D9FF] focus:outline-none"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="font-mono text-[11px] text-white/60 uppercase">
                        GitHub Repository URL *
                      </label>
                      <input
                        type="url"
                        required
                        value={newProj.repo}
                        onChange={(e) => setNewProj({ ...newProj, repo: e.target.value })}
                        placeholder="https://github.com/TanvirAhmmedCodes/..."
                        className="w-full bg-[#08090B] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-[#00D9FF] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[11px] text-white/60 uppercase">
                        Live Demo URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={newProj.demo}
                        onChange={(e) => setNewProj({ ...newProj, demo: e.target.value })}
                        placeholder="https://..."
                        className="w-full bg-[#08090B] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-[#00D9FF] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="font-mono text-[11px] text-white/60 uppercase">
                        Primary Language
                      </label>
                      <input
                        type="text"
                        value={newProj.language}
                        onChange={(e) => setNewProj({ ...newProj, language: e.target.value })}
                        placeholder="e.g. Python / TypeScript"
                        className="w-full bg-[#08090B] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-[#00D9FF] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[11px] text-white/60 uppercase">
                        Tech Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        value={newProj.tags}
                        onChange={(e) => setNewProj({ ...newProj, tags: e.target.value })}
                        placeholder="e.g. Next.js, Gemini API, TailScale"
                        className="w-full bg-[#08090B] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-[#00D9FF] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] text-white/60 uppercase">
                      Full Architectural Overview *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newProj.description}
                      onChange={(e) => setNewProj({ ...newProj, description: e.target.value })}
                      placeholder="Explain how the software is built, key algorithms, problems solved, and impact..."
                      className="w-full bg-[#08090B] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-[#00D9FF] focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#00D9FF] text-[#08090B] font-display font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#38e1ff] transition-all cursor-pointer shadow-lg disabled:opacity-50"
                  >
                    <Code2 className="w-4 h-4" />
                    <span>Publish Project to Portfolio</span>
                  </button>
                </form>
              </div>

              {/* Published Projects List */}
              <div className="bg-[#111418] border border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <h3 className="font-display font-bold text-xl text-white">
                    Configured Projects ({projects.length})
                  </h3>
                  <span className="font-mono text-xs text-[#00D9FF]">Auto-synced with Projects Grid</span>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-4 rounded-xl bg-[#08090B] border border-white/5 flex flex-col justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-display font-bold text-sm text-white">
                            {proj.title}
                          </h4>
                          <span className="px-2 py-0.5 rounded bg-[#00D9FF]/10 text-[10px] font-mono text-[#00D9FF]">
                            {proj.category}
                          </span>
                        </div>
                        <p className="font-mono text-[11px] text-white/50 mt-1 line-clamp-1">
                          {proj.tagline}
                        </p>
                        <p className="text-xs text-[#A7ABB3] mt-2 line-clamp-2">
                          {proj.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <span className="text-[10px] font-mono text-white/40">
                          {proj.language}
                        </span>
                        {proj.id.startsWith("custom-project-") && (
                          <button
                            onClick={() => handleDeleteItem("project", proj.id)}
                            className="p-1 rounded text-red-400 hover:text-red-300"
                            title="Delete Custom Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PERSONAL & ACADEMIC IDENTITY (FULLY EDITABLE) */}
          {activeTab === "personal" && (
            <div className="bg-[#111418] border border-white/10 rounded-2xl p-6 md:p-8 space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#00D9FF] uppercase tracking-wider mb-1">
                    <User className="w-3.5 h-3.5" />
                    <span>Identity Configuration // Live Sync</span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
                    Personal &amp; Academic Identity
                  </h2>
                  <p className="font-mono text-xs text-white/50 mt-1">
                    Update your academic semester, curiosity bio, taglines, or contact info anytime.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={loadData}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-white/60 hover:text-white font-mono text-xs transition-colors self-start md:self-center"
                  title="Reload from server"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reload</span>
                </button>
              </div>

              <form onSubmit={handleSavePersonal} className="space-y-6">
                {/* Basic Personal Identity */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-white/70 uppercase tracking-wider flex items-center justify-between">
                      <span>Full Legal / Portfolio Name *</span>
                      <span className="text-[10px] text-white/40">e.g. MD Tanvir Ahmmed</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={personalData.name}
                      onChange={(e) => setPersonalData({ ...personalData, name: e.target.value })}
                      className="w-full bg-[#08090B] border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white focus:border-[#00D9FF] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs text-white/70 uppercase tracking-wider flex items-center justify-between">
                      <span>Brand / Display Identity *</span>
                      <span className="text-[10px] text-white/40">e.g. TANVIR</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={personalData.brand}
                      onChange={(e) => setPersonalData({ ...personalData, brand: e.target.value })}
                      className="w-full bg-[#08090B] border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white focus:border-[#00D9FF] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Academic Status & University */}
                <div className="p-5 rounded-xl bg-[#08090B]/60 border border-white/5 space-y-5">
                  <div className="font-mono text-xs text-[#00D9FF] uppercase tracking-wider font-semibold">
                    Academic Foundation &amp; Progress
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-mono text-xs text-white/70 uppercase tracking-wider flex items-center justify-between">
                        <span>Current Academic Status *</span>
                        <span className="text-[10px] text-[#00D9FF]">Update each semester</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={personalData.academicStatus}
                        onChange={(e) => setPersonalData({ ...personalData, academicStatus: e.target.value })}
                        placeholder="e.g. 2nd Year · 4th Semester"
                        className="w-full bg-[#111418] border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white focus:border-[#00D9FF] focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-xs text-white/70 uppercase tracking-wider flex items-center justify-between">
                        <span>Expected Graduation Date *</span>
                        <span className="text-[10px] text-white/40">e.g. July 2029</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={personalData.expectedGraduation}
                        onChange={(e) => setPersonalData({ ...personalData, expectedGraduation: e.target.value })}
                        placeholder="e.g. July 2029"
                        className="w-full bg-[#111418] border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white focus:border-[#00D9FF] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-mono text-xs text-white/70 uppercase tracking-wider">
                        University Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={personalData.university}
                        onChange={(e) => setPersonalData({ ...personalData, university: e.target.value })}
                        placeholder="e.g. Bangladesh University of Business & Technology (BUBT)"
                        className="w-full bg-[#111418] border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white focus:border-[#00D9FF] focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-xs text-white/70 uppercase tracking-wider">
                        Degree Program *
                      </label>
                      <input
                        type="text"
                        required
                        value={personalData.degree}
                        onChange={(e) => setPersonalData({ ...personalData, degree: e.target.value })}
                        placeholder="e.g. Bachelor of Science in Computer Science & Engineering"
                        className="w-full bg-[#111418] border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white focus:border-[#00D9FF] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Titles & Location */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-white/70 uppercase tracking-wider">
                      Primary Professional Title
                    </label>
                    <input
                      type="text"
                      value={personalData.title}
                      onChange={(e) => setPersonalData({ ...personalData, title: e.target.value })}
                      placeholder="Computer Science & Engineering Student"
                      className="w-full bg-[#08090B] border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white focus:border-[#00D9FF] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs text-white/70 uppercase tracking-wider">
                      Location
                    </label>
                    <input
                      type="text"
                      value={personalData.location}
                      onChange={(e) => setPersonalData({ ...personalData, location: e.target.value })}
                      placeholder="Mirpur, Dhaka, Bangladesh"
                      className="w-full bg-[#08090B] border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white focus:border-[#00D9FF] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs text-white/70 uppercase tracking-wider">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      required
                      value={personalData.email}
                      onChange={(e) => setPersonalData({ ...personalData, email: e.target.value })}
                      placeholder="tanvirahmmed13579@gmail.com"
                      className="w-full bg-[#08090B] border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white focus:border-[#00D9FF] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Taglines & Brand Statements */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-white/70 uppercase tracking-wider flex items-center justify-between">
                      <span>Primary Tagline *</span>
                      <span className="text-[10px] text-white/40">Editorial Headline</span>
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={personalData.tagline}
                      onChange={(e) => setPersonalData({ ...personalData, tagline: e.target.value })}
                      placeholder="Curiosity Beyond Limits.&#10;Innovation Without Boundaries."
                      className="w-full bg-[#08090B] border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white focus:border-[#00D9FF] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs text-white/70 uppercase tracking-wider flex items-center justify-between">
                      <span>Secondary Brand Statement</span>
                      <span className="text-[10px] text-white/40">Philosophy</span>
                    </label>
                    <textarea
                      rows={2}
                      value={personalData.secondaryTagline}
                      onChange={(e) => setPersonalData({ ...personalData, secondaryTagline: e.target.value })}
                      placeholder="Curious by Nature. Builder by Choice."
                      className="w-full bg-[#08090B] border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white focus:border-[#00D9FF] focus:outline-none transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Short Bio */}
                <div className="space-y-2">
                  <label className="font-mono text-xs text-white/70 uppercase tracking-wider flex items-center justify-between">
                    <span>Curiosity Bio &amp; About Statement *</span>
                    <span className="text-[10px] text-white/40">Honest story &amp; technical interests</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={personalData.shortBio}
                    onChange={(e) => setPersonalData({ ...personalData, shortBio: e.target.value })}
                    placeholder="Tell your story as a CS student, explorer, and builder..."
                    className="w-full bg-[#08090B] border border-white/10 rounded-xl p-4 text-sm font-light text-white/90 leading-relaxed focus:border-[#00D9FF] focus:outline-none transition-colors"
                  />
                </div>

                {/* Save Button & Status */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
                  <p className="font-mono text-xs text-white/40">
                    Saves to persistent store and immediately reflects on your live portfolio.
                  </p>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#00D9FF] text-[#08090B] font-display font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#38e1ff] transition-all cursor-pointer shadow-[0_0_20px_rgba(0,217,255,0.3)] disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{loading ? "Saving Changes..." : "Save & Update Live Portfolio"}</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
