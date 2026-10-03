import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sparkles,
  Atom,
  Brain,
  GraduationCap,
  Music,
  Stethoscope,
  Github,
  Globe,
  X,
  ExternalLink,
  Cpu,
  Workflow,
  CheckCircle2,
  Maximize2,
  ArrowUpRight,
} from "lucide-react";
import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { ProjectItem } from "@/lib/portfolio-store";

export const Route = createFileRoute("/labs/")({
  head: () => ({
    meta: [
      { title: "Engineering & AI Projects — Tanush · LOG!Q" },
      {
        name: "description",
        content:
          "Production systems, AI agents, full-stack applications, and research prototypes built by Tanush. Explore system architecture, source code, and live demos.",
      },
      { property: "og:title", content: "Engineering & AI Projects — Tanush · LOG!Q" },
      {
        property: "og:description",
        content: "Explore Tanush's production systems, multi-agent frameworks, and architectural blueprints.",
      },
    ],
  }),
  component: ProjectsPage,
});

function getProjectIcon(name?: string) {
  switch (name) {
    case "Brain":
      return Brain;
    case "Atom":
      return Atom;
    case "GraduationCap":
      return GraduationCap;
    case "Stethoscope":
      return Stethoscope;
    case "Music":
      return Music;
    case "Sparkles":
    default:
      return Sparkles;
  }
}

const categories = ["All", "Agentic AI", "Full-Stack & Cloud", "Applied ML", "Data & Systems"] as const;

function ProjectsPage() {
  const { projects } = usePortfolioData();
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return projects.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.overview.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <div className="relative min-h-screen">
      {/* Background Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 12%, oklch(0.82 0.14 75 / 0.12), transparent 70%), radial-gradient(40% 30% at 10% 40%, oklch(0.66 0.11 60 / 0.08), transparent 60%)",
        }}
      />

      {/* Hero Section */}
      <section className="relative px-6 pt-36 pb-10 md:pt-44">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-bronze/40 bg-bronze/10 px-3.5 py-1 text-xs font-medium text-bronze">
              <Workflow className="h-3.5 w-3.5" />
              Engineered Systems
            </span>
            <span className="font-mono-soft text-xs uppercase tracking-wider text-muted-foreground">
              ✦ {projects.length} Active Architectures & Implementations
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display mt-6 text-5xl leading-[1.05] tracking-tight md:text-7xl"
          >
            Built systems, <span className="italic text-bronze">architected</span> with intent.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Detailed blueprints and production deployments across autonomous AI agents, distributed
            data pipelines, and full-stack software. Click any project to inspect its system architecture,
            telemetry, and source repository.
          </motion.p>

          {/* Search input */}
          <div className="mt-10 max-w-xl">
            <div className="glass shadow-cinema flex items-center gap-3 rounded-2xl border border-border/70 px-4 py-3.5 transition focus-within:border-bronze/60">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by name, architecture, or tech stack (e.g. 'PostgreSQL', 'Agent')..."
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="font-mono-soft text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="relative px-6 pb-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all ${
                    isActive
                      ? "border-foreground bg-foreground text-background shadow-sm"
                      : "border-border/70 bg-card text-muted-foreground hover:border-bronze/50 hover:text-foreground"
                  }`}
                >
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative px-6 pb-32">
        <div className="mx-auto max-w-6xl">
          {filteredProjects.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border/80 bg-card/40 p-12 text-center">
              <p className="font-display text-xl text-foreground">No projects found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try searching for different keywords or select "All" categories.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((p, index) => {
                const Icon = getProjectIcon(p.iconName);
                const statusTone =
                  p.status === "Live Production"
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : p.status === "Active Development"
                      ? "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      : "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400";

                return (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Link
                      to="/labs/$projectId"
                      params={{ projectId: p.id }}
                      className="group flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-bronze/60 hover:shadow-cinema"
                    >
                      <div>
                        {/* Gradient Banner */}
                        <div className="relative h-32 overflow-hidden" style={{ background: p.gradient }}>
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
                          <div className="absolute right-3.5 top-3.5">
                            <span className={`rounded-md border px-2.5 py-0.5 text-[10px] font-medium backdrop-blur-md ${statusTone}`}>
                              {p.status}
                            </span>
                          </div>
                          <Icon className="absolute bottom-3 left-4 h-9 w-9 text-white/90 drop-shadow" />
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-mono-soft text-[10px] uppercase tracking-wider text-bronze">
                              {p.tag}
                            </span>
                            <span className="font-mono-soft inline-flex items-center gap-1 text-[11px] text-muted-foreground group-hover:text-foreground">
                              Deep Dive <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </span>
                          </div>

                          <h3 className="font-display mt-2 text-2xl leading-snug tracking-tight text-foreground group-hover:text-bronze transition-colors">
                            {p.title}
                          </h3>

                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                            {p.tagline}
                          </p>

                          {/* Tech Stack Pills */}
                          <div className="mt-5 flex flex-wrap gap-1.5">
                            {(p.techStack ?? []).slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="rounded-md border border-border/60 bg-secondary/60 px-2 py-0.5 text-[11px] text-muted-foreground"
                              >
                                {tech}
                              </span>
                            ))}
                            {(p.techStack ?? []).length > 4 && (
                              <span className="rounded-md border border-border/60 bg-secondary/40 px-2 py-0.5 text-[11px] text-muted-foreground">
                                +{(p.techStack ?? []).length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-border/60 px-6 py-4 flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Cpu className="h-3.5 w-3.5 text-bronze" /> Architecture blueprint
                        </span>
                        <span className="font-mono-soft text-bronze group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                          View details →
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}