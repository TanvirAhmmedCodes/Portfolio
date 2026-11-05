"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  getGithubUser,
  getRepos,
  getPublicEvents,
  GithubUser,
  GithubRepo,
  GithubEvent,
  GITHUB_USERNAME,
} from "@/lib/github";
import { sound } from "@/lib/audio";
import {
  GitFork,
  Star,
  RefreshCw,
  GitCommit,
  Terminal,
  ExternalLink,
  MapPin,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";

export default function GithubActivity() {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [events, setEvents] = useState<GithubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>("Just now");

  const fetchData = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const [userData, repoList, eventList] = await Promise.all([
        getGithubUser().catch(() => null),
        getRepos().catch(() => []),
        getPublicEvents().catch(() => []),
      ]);

      if (userData) setUser(userData);
      if (repoList) setRepos(repoList);
      if (eventList) setEvents(eventList);
      setLastSyncTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleManualSync = () => {
    sound.playClick();
    fetchData(true);
  };

  // Compute language frequency from verified public repos
  const languageStats = repos.reduce((acc: Record<string, number>, r) => {
    if (r.language) {
      acc[r.language] = (acc[r.language] || 0) + 1;
    }
    return acc;
  }, {});

  const totalTaggedRepos = Object.values(languageStats).reduce((a, b) => a + b, 0);

  // Total stars and forks across all public repos
  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0);

  return (
    <section id="github" className="relative bg-[#08090B] py-28 md:py-36 border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/[0.08] gap-6">
          <div>
            <div className="font-mono text-xs text-[#00D9FF] uppercase tracking-[0.25em] mb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>05 // OPEN SOURCE ENGINE &amp; TELEMETRY</span>
            </div>
            <h2 className="font-display font-black text-4xl md:text-6xl text-white tracking-tight uppercase">
              My Code Leaves a Trace<span className="text-[#00D9FF]">.</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleManualSync}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111418] border border-white/10 hover:border-[#00D9FF]/40 text-xs font-mono text-white/70 hover:text-white transition-all disabled:opacity-50"
              title="Re-sync telemetry with GitHub REST API"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#00D9FF] ${refreshing ? "animate-spin" : ""}`} />
              <span>{refreshing ? "Syncing..." : "Sync Live Data"}</span>
            </button>

            <span className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>REST v3 Connected</span>
            </span>

            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#00D9FF] hover:text-white transition-colors"
            >
              <span>@{GITHUB_USERNAME}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 3-Column GitHub Dashboard Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* 1. PROFILE OVERVIEW & LIVE METRICS (4 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 rounded-2xl bg-[#111418] border border-white/[0.08] p-8 flex flex-col justify-between hover:border-[#00D9FF]/30 transition-colors shadow-lg"
          >
            <div>
              <div className="flex items-start gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-2xl bg-[#08090B] border border-white/10 overflow-hidden flex-shrink-0">
                  {user?.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt={user.login}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-display font-black text-2xl text-[#00D9FF]">
                      TA
                    </div>
                  )}
                  <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-[#00D9FF] border-2 border-[#111418]" />
                </div>

                <div>
                  <h3 className="font-display font-bold text-xl text-white">
                    {user?.name || "MD Tanvir Ahmmed"}
                  </h3>
                  <p className="font-mono text-xs text-[#00D9FF]">
                    @{user?.login || GITHUB_USERNAME}
                  </p>
                  <p className="font-mono text-[11px] text-white/40 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#00D9FF]" />
                    <span>{user?.location || "Mirpur, Dhaka, Bangladesh"}</span>
                  </p>
                </div>
              </div>

              {/* Bio snippet */}
              <p className="text-xs text-[#A7ABB3] font-light leading-relaxed mb-6">
                {user?.bio || "CSE Student | Passionate about coding, problem solving & building practical software."}
              </p>

              {/* 4-Item Live Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 pt-4 border-t border-white/5">
                <div className="p-3.5 rounded-xl bg-[#08090B] border border-white/5">
                  <div className="font-display font-black text-2xl text-white">
                    {loading ? "..." : user?.public_repos ?? repos.length}
                  </div>
                  <div className="font-mono text-[10px] text-white/40 uppercase mt-1">Public Repos</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#08090B] border border-white/5">
                  <div className="font-display font-black text-2xl text-[#00D9FF]">
                    {loading ? "..." : totalStars}
                  </div>
                  <div className="font-mono text-[10px] text-white/40 uppercase mt-1 flex items-center gap-1">
                    <Star className="w-3 h-3 text-[#00D9FF]" /> Total Stars
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#08090B] border border-white/5">
                  <div className="font-display font-black text-2xl text-white">
                    {loading ? "..." : totalForks}
                  </div>
                  <div className="font-mono text-[10px] text-white/40 uppercase mt-1 flex items-center gap-1">
                    <GitFork className="w-3 h-3 text-white/50" /> Forks
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#08090B] border border-white/5">
                  <div className="font-display font-black text-2xl text-[#00D9FF]">
                    {loading ? "..." : user?.followers ?? 5}
                  </div>
                  <div className="font-mono text-[10px] text-white/40 uppercase mt-1">Followers</div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-md bg-[#00D9FF]/10 border border-[#00D9FF]/40 text-[#00D9FF] hover:bg-[#00D9FF] hover:text-[#08090B] font-mono text-xs uppercase tracking-wider transition-all duration-300"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Follow on GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* 2. RECENT CODE EVENTS / AUDIT STREAM (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 rounded-2xl bg-[#111418] border border-white/[0.08] p-8 flex flex-col justify-between hover:border-[#00D9FF]/30 transition-colors shadow-lg"
          >
            <div>
              <div className="font-mono text-[10px] text-[#00D9FF] uppercase tracking-[0.25em] mb-6 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <GitCommit className="w-3.5 h-3.5" />
                  <span>RECENT PUSH TELEMETRY</span>
                </span>
                <span className="text-white/40">Verified Audit Stream</span>
              </div>

              <div className="space-y-3.5">
                {events.length > 0 ? (
                  events.slice(0, 4).map((evt) => {
                    const repoName = evt.repo.name.split("/").pop();
                    const dateFormatted = new Date(evt.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                    const commitMsg = evt.payload?.commits?.[0]?.message || "Pushed code update";

                    return (
                      <div
                        key={evt.id}
                        className="p-3.5 rounded-xl bg-[#08090B] border border-white/5 hover:border-white/15 flex items-start justify-between gap-4 transition-colors group"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF]" />
                            <a
                              href={`https://github.com/${evt.repo.name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-xs font-bold text-white hover:text-[#00D9FF] transition-colors truncate"
                            >
                              {repoName}
                            </a>
                          </div>
                          <p className="font-mono text-[11px] text-[#A7ABB3] line-clamp-1">
                            {commitMsg}
                          </p>
                        </div>
                        <span className="font-mono text-[10px] text-white/30 whitespace-nowrap pt-0.5">
                          {dateFormatted}
                        </span>
                      </div>
                    );
                  })
                ) : loading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-16 rounded-xl bg-[#08090B] animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <div className="py-10 text-center text-xs font-mono text-white/40">
                    No recent public push events returned. Check back shortly.
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 font-mono text-[11px] text-white/40 flex items-center justify-between">
              <span>Last Synced: {lastSyncTime}</span>
              <span className="text-[#00D9FF]">Real-time Event Stream</span>
            </div>
          </motion.div>

          {/* 3. LANGUAGE BREAKDOWN (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 rounded-2xl bg-[#111418] border border-white/[0.08] p-8 flex flex-col justify-between hover:border-[#00D9FF]/30 transition-colors shadow-lg"
          >
            <div>
              <div className="font-mono text-[10px] text-[#00D9FF] uppercase tracking-[0.25em] mb-6 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>LANGUAGE RATIO</span>
                </span>
                <span className="text-white/40">Live Repos</span>
              </div>

              <div className="space-y-4">
                {Object.keys(languageStats).length > 0 ? (
                  Object.entries(languageStats).map(([lang, count]) => {
                    const percentage = totalTaggedRepos ? Math.round((count / totalTaggedRepos) * 100) : 0;
                    return (
                      <div key={lang} className="space-y-1.5">
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="text-white/80">{lang}</span>
                          <span className="text-[#00D9FF] font-semibold">{percentage}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-[#08090B] overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#00D9FF] to-[#38e1ff] rounded-full transition-all duration-700"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : loading ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-6 rounded bg-[#08090B] animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <div className="text-xs font-mono text-white/40 py-8 text-center">
                    No language data available.
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 font-mono text-[11px] text-white/40">
              Computed across {repos.length} public non-fork repositories.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
