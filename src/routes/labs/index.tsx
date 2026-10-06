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
  Cpu,
  Workflow,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { InViewLines, RevealLines, SectionLabel, Magnetic } from "@/components/landing/motion-kit";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/labs/")({
  head: () => ({
    meta: [
      { title: "Engineering & AI Projects — Tanush Pai · LOG!Q" },
      {
        name: "description",
        content:
          "Production systems, AI agents, full-stack applications, and research prototypes built by Tanush. Explore system architecture, source code, and live demos.",
      },
      { property: "og:title", content: "Engineering & AI Projects — Tanush Pai · LOG!Q" },
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

export function ProjectsPage() {
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
      {/* Background Aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 50% at 50% 10%, oklch(0.82 0.14 75 / 0.12), transparent 70%), radial-gradient(40% 30% at 90% 40%, oklch(0.66 0.11 60 / 0.08), transparent 60%)",
        }}
      />

      {/* Hero Header */}
      <section className="relative px-6 pt-36 pb-12 md:pt-44 md:pb-16">
        <div className="mx-auto max-w-6xl">
          <SectionLabel index="01" className="mb-6">
            Engineered Systems · {projects.length} Architectures
          </SectionLabel>

          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <RevealLines
                delay={0.15}
                className="font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.035em] text-foreground"
                lines={[
                  "Built systems,",
                  <>
                    <span className="italic text-bronze">architected</span> with intent.
                  </>,
                ]}
              />
            </div>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground md:col-span-4">
              Detailed technical blueprints across autonomous agents, distributed data pipelines, and full-stack software.
            </p>
          </div>

          {/* Search Bar + Stats Filter */}
          <div className="mt-12 flex flex-col gap-4 border-t border-border/60 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="glass shadow-cinema relative flex w-full max-w-md items-center gap-3 rounded-full border border-border/80 px-4 py-2.5 transition focus-within:border-bronze">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, architecture, tech (e.g. FastAPI)..."
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="font-mono-soft text-[11px] text-muted-foreground hover:text-foreground"
                >
                  CLEAR
                </button>
              )}
            </div>

            <div className="font-mono-soft flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
              <span>Showing:</span>
              <span className="text-bronze font-medium">
                {filteredProjects.length} of {projects.length}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="sticky top-20 z-20 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "rounded-full px-4 py-2 text-xs font-medium transition-all",
                    isActive
                      ? "bg-foreground text-background shadow-sm"
                      : "border border-border/80 bg-card/80 text-muted-foreground hover:border-bronze/60 hover:text-foreground",
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative px-6 pt-6 pb-32">
        <div className="mx-auto max-w-6xl">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-3xl border border-dashed border-border/80 bg-card/40 p-16 text-center"
              >
                <p className="font-display text-2xl text-foreground">No matches found</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try refining your search keyword or switch back to "All" categories.
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((p, index) => {
                  const Icon = getProjectIcon(p.iconName);
                  const isLive = p.status === "Live Production";
                  const isDev = p.status === "Active Development";

                  return (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <Link
                        to="/labs/$projectId"
                        params={{ projectId: p.id }}
                        className="group flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] border border-border/70 bg-card transition-all duration-500 hover:-translate-y-1 hover:border-bronze/60 hover:shadow-cinema"
                      >
                        <div>
                          {/* Banner Visual with Number + Badge */}
                          <div
                            className="relative h-44 overflow-hidden"
                            style={{ background: p.gradient, filter: "saturate(0.7) brightness(0.85)" }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
                            <div className="grain absolute inset-0" />

                            <div className="font-mono-soft absolute inset-x-5 top-4 flex items-center justify-between text-[10px] uppercase tracking-wider text-white/80">
                              <span>{p.category}</span>
                              <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-2.5 py-0.5 backdrop-blur-md">
                                <span
                                  className={cn(
                                    "h-1.5 w-1.5 rounded-full",
                                    isLive ? "bg-emerald-400" : isDev ? "bg-amber-300" : "bg-sky-300",
                                  )}
                                />
                                {p.status}
                              </span>
                            </div>

                            <span className="font-display absolute bottom-2 left-5 text-6xl leading-none text-white/90">
                              {String(index + 1).padStart(2, "0")}
                            </span>

                            <Icon className="absolute right-5 bottom-4 h-8 w-8 text-white/80 transition-transform duration-500 group-hover:scale-110" />
                          </div>

                          {/* Content Section */}
                          <div className="p-6">
                            <span className="font-mono-soft text-[10px] uppercase tracking-[0.2em] text-bronze">
                              {p.tag}
                            </span>
                            <h3 className="font-display mt-2 text-2xl leading-snug tracking-tight text-foreground transition-colors group-hover:text-bronze">
                              {p.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                              {p.tagline}
                            </p>

                            {/* Tech Stack Chips */}
                            <div className="mt-5 flex flex-wrap gap-1.5">
                              {(p.techStack ?? []).slice(0, 4).map((tech) => (
                                <span
                                  key={tech}
                                  className="font-mono-soft rounded-md border border-border/60 bg-secondary/50 px-2 py-0.5 text-[10px] text-muted-foreground"
                                >
                                  {tech}
                                </span>
                              ))}
                              {(p.techStack ?? []).length > 4 && (
                                <span className="font-mono-soft rounded-md border border-border/60 bg-secondary/30 px-2 py-0.5 text-[10px] text-muted-foreground">
                                  +{(p.techStack ?? []).length - 4}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Footer Link */}
                        <div className="border-t border-border/60 px-6 py-4 flex items-center justify-between text-xs text-muted-foreground">
                          <span className="font-mono-soft flex items-center gap-1.5 text-[11px]">
                            <Cpu className="h-3.5 w-3.5 text-bronze" /> Architecture blueprint
                          </span>
                          <span className="font-mono-soft text-bronze group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 text-[11px] font-medium">
                            Explore <ArrowUpRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}