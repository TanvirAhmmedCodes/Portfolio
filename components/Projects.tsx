"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GithubRepo, getRepos } from "@/lib/github";
import { manualProjects, Project } from "@/lib/projects";
import { sound } from "@/lib/audio";
import {
  Search,
  X,
  ExternalLink,
  Star,
  GitFork,
  Clock,
  Sparkles,
  Info,
  ArrowUpRight,
  Code2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";

export default function Projects() {
  const [githubRepos, setGithubRepos] = useState<GithubRepo[]>([]);
  const [repoMap, setRepoMap] = useState<Map<string, GithubRepo>>(new Map());
  const [customProjects, setCustomProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);
  const INITIAL_VISIBLE_COUNT = 6;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    // Fetch custom CMS projects & GitHub repos in parallel
    Promise.all([
      getRepos().catch(() => []),
      fetch("/api/owner-data").then((r) => r.json()).catch(() => null),
    ])
      .then(([repos, ownerData]) => {
        if (cancelled) return;
        const map = new Map<string, GithubRepo>();
        repos.forEach((r) => map.set(r.name.toLowerCase(), r));
        setRepoMap(map);
        setGithubRepos(repos);
        if (ownerData?.projects && Array.isArray(ownerData.projects)) {
          // Keep only projects not already in manualProjects
          const extras = ownerData.projects.filter(
            (p: Project) => !manualProjects.some((m) => m.id === p.id)
          );
          setCustomProjects(extras);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Merge manual projects with live GitHub stats
  const allProjects = useMemo(() => {
    const combinedBase = [...manualProjects, ...customProjects];
    const list = combinedBase.map((p) => {
      const repoKey = p.repo.split("/").pop()?.toLowerCase() ?? "";
      const gh = repoMap.get(repoKey);
      return {
        ...p,
        githubData: gh,
        stars: gh?.stargazers_count ?? 0,
        forks: gh?.forks_count ?? 0,
        updatedAt: gh?.updated_at,
      };
    });

    // Automatically append any newly created public repos not in manual list
    githubRepos.forEach((repo) => {
      const exists = list.some((p) => p.repo.toLowerCase().endsWith(repo.name.toLowerCase()));
      if (!exists && repo.name !== "TanvirAhmmedCodes") {
        list.push({
          id: repo.name,
          title: repo.name.replace(/[-_]/g, " "),
          tagline: repo.description ?? "Public GitHub Repository",
          description: repo.description ?? "Open source repository on GitHub by MD Tanvir Ahmmed.",
          repo: repo.html_url,
          demo: repo.homepage || undefined,
          language: repo.language ?? "Code",
          category: "Systems & Web",
          tags: repo.topics?.length ? repo.topics : [repo.language ?? "Open Source"],
          featured: false,
          order: 99,
          githubData: repo,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          updatedAt: repo.updated_at,
        });
      }
    });

    return list;
  }, [repoMap, githubRepos]);

  const categories = ["All", "AI & Healthcare", "AgriTech & IoT", "Systems & Web", "Learning & Tools"];

  const filteredProjects = useMemo(() => {
    const list = allProjects.filter((p) => {
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      const matchSearch =
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.language.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    // Prioritize featured projects first, then manual order / stars
    return list.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (a.order ?? 99) - (b.order ?? 99);
    });
  }, [allProjects, selectedCategory, searchQuery]);

  const displayedProjects = useMemo(() => {
    if (showAll || searchQuery.trim() !== "") {
      return filteredProjects;
    }
    return filteredProjects.slice(0, INITIAL_VISIBLE_COUNT);
  }, [filteredProjects, showAll, searchQuery]);

  return (
    <section id="projects" className="relative bg-[#08090B] py-28 md:py-36 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-white/[0.08] gap-6">
          <div>
            <div className="font-mono text-xs text-[#00D9FF] uppercase tracking-[0.25em] mb-3 flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              <span>01 // SELECTED WORK &amp; REPOSITORIES</span>
            </div>
            <h2 className="font-display font-black text-4xl md:text-6xl text-white tracking-tight uppercase">
              Ideas Into Reality<span className="text-[#00D9FF]">.</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-white/50 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF]" />
              <span>{filteredProjects.length} Verified Repositories</span>
            </span>
            <a
              href="https://github.com/TanvirAhmmedCodes?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#00D9FF] hover:text-white transition-colors"
            >
              <span>ALL ON GITHUB</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-[#00D9FF] text-[#08090B] font-bold shadow-[0_0_15px_rgba(0,217,255,0.4)]"
                    : "bg-[#111418] text-white/60 hover:text-white hover:bg-white/[0.05] border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[280px]">
            <input
              type="text"
              placeholder="Search projects, tags, tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 pr-9 rounded-full bg-[#111418] border border-white/10 text-xs font-mono text-white placeholder-white/40 focus:outline-none focus:border-[#00D9FF] transition-colors"
            />
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project, index) => {
            const indexStr = (index + 1).toString().padStart(2, "0");
            const stars = project.githubData?.stargazers_count ?? project.stars ?? 0;
            const forks = project.githubData?.forks_count ?? 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-2xl bg-[#111418] border border-white/[0.08] hover:border-[#00D9FF]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-[0_12px_35px_rgba(0,217,255,0.08)]"
              >
                {/* Top Banner with index & category */}
                <div className="p-6 pb-0">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display font-black text-2xl text-[#00D9FF] group-hover:scale-105 transition-transform">
                      {indexStr}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#08090B] border border-white/10 font-mono text-[10px] text-white/70 uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>

                  {/* Highlight pill if present */}
                  {project.highlight && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#00D9FF]/10 border border-[#00D9FF]/30 font-mono text-[10px] text-[#00D9FF] font-semibold mb-3">
                      <Sparkles className="w-3 h-3" />
                      <span>{project.highlight}</span>
                    </div>
                  )}

                  {/* Title & Tagline */}
                  <h3 className="font-display font-black text-xl text-white group-hover:text-[#00D9FF] transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs text-white/50 mb-4 line-clamp-1">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-[#A7ABB3] font-light leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-[#08090B] border border-white/5 text-[11px] font-mono text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Bar with Language, GitHub Stars/Forks & Action Links */}
                <div className="px-6 py-4 bg-[#08090B]/60 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3 text-white/50">
                    <span className="flex items-center gap-1.5 text-white/70 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-[#00D9FF]" />
                      {project.language}
                    </span>

                    <span className="flex items-center gap-1 text-white/40" title="GitHub Stars">
                      <Star className="w-3 h-3 text-[#00D9FF]/80 fill-[#00D9FF]/20" />
                      <span>{stars}</span>
                    </span>

                    {forks > 0 && (
                      <span className="flex items-center gap-1 text-white/40" title="GitHub Forks">
                        <GitFork className="w-3 h-3 text-white/40" />
                        <span>{forks}</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playClick();
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-[#00D9FF]/40 text-[#00D9FF] hover:bg-[#00D9FF] hover:text-[#08090B] transition-all duration-200"
                        title="Live Demo"
                      >
                        <span>DEMO</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playClick();
                      }}
                      className="p-1.5 rounded text-white/60 hover:text-white transition-colors"
                      title="View GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => {
                        sound.playClick();
                        setActiveModalProject(project);
                      }}
                      className="p-1.5 rounded text-white/60 hover:text-[#00D9FF] transition-colors"
                      title="Inspect Details"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All / Show Less Curated Projects Toggle */}
        {filteredProjects.length > INITIAL_VISIBLE_COUNT && searchQuery.trim() === "" && (
          <div className="mt-14 flex flex-col items-center justify-center">
            <button
              onClick={() => {
                sound.playClick();
                setShowAll((prev) => !prev);
              }}
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#111418] border border-white/10 hover:border-[#00D9FF] text-white hover:text-[#00D9FF] font-mono text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(0,217,255,0.25)] hover:-translate-y-0.5 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-pulse" />
              <span>
                {showAll
                  ? `Show Featured Highlights (Top ${INITIAL_VISIBLE_COUNT})`
                  : `View All Projects (${filteredProjects.length})`}
              </span>
              {showAll ? (
                <ChevronUp className="w-4 h-4 text-[#00D9FF] transition-transform group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#00D9FF] transition-transform group-hover:translate-y-0.5" />
              )}
            </button>
            <p className="font-mono text-[11px] text-white/40 mt-3">
              {showAll
                ? `Displaying all ${filteredProjects.length} curated & open-source repositories`
                : `Showing ${INITIAL_VISIBLE_COUNT} curated highlights · ${filteredProjects.length - INITIAL_VISIBLE_COUNT} more available`}
            </p>
          </div>
        )}
        {/* Empty state when no projects match filter */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 border border-white/5 rounded-2xl bg-[#111418]">
            <p className="font-mono text-sm text-white/50">No projects match your filter or search query.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-full bg-[#00D9FF] text-[#08090B] font-mono text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* PROJECT INSPECTION MODAL */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#111418] border border-[#00D9FF]/40 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,217,255,0.2)] overflow-hidden"
            >
              <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <span className="font-mono text-xs text-[#00D9FF] uppercase tracking-widest">
                    {activeModalProject.category}
                  </span>
                  <h3 className="font-display font-black text-2xl md:text-3xl text-white mt-1">
                    {activeModalProject.title}
                  </h3>
                  <p className="font-mono text-xs text-white/50 mt-1">
                    {activeModalProject.tagline}
                  </p>
                </div>
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveModalProject(null);
                  }}
                  className="p-2 rounded-lg bg-[#08090B] border border-white/10 text-white/60 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-mono text-xs uppercase text-[#00D9FF] tracking-wider mb-2">
                    Project Overview &amp; Architecture
                  </h4>
                  <p className="text-sm text-[#A7ABB3] leading-relaxed">
                    {activeModalProject.description}
                  </p>
                </div>

                {activeModalProject.highlight && (
                  <div className="p-3.5 rounded-xl bg-[#00D9FF]/10 border border-[#00D9FF]/30 font-mono text-xs text-[#00D9FF] flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span><strong>Recognition:</strong> {activeModalProject.highlight}</span>
                  </div>
                )}

                <div>
                  <h4 className="font-mono text-xs uppercase text-white/50 tracking-wider mb-2">
                    Tech Stack &amp; Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-md bg-[#08090B] border border-white/10 text-xs font-mono text-white/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                  <a
                    href={activeModalProject.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#00D9FF] text-[#08090B] font-display font-bold text-xs uppercase tracking-wider hover:bg-[#38e1ff] transition-all"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View on GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  {activeModalProject.demo && (
                    <a
                      href={activeModalProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-white/20 text-white font-display font-bold text-xs uppercase tracking-wider hover:border-[#00D9FF] hover:text-[#00D9FF] transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Launch Live Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
