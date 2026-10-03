import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Atom,
  Brain,
  CheckCircle2,
  Cpu,
  ExternalLink,
  Github,
  Globe,
  GraduationCap,
  Music,
  Sparkles,
  Stethoscope,
  Workflow,
} from "lucide-react";
import { usePortfolioData } from "@/hooks/use-portfolio-data";

export const Route = createFileRoute("/labs/$projectId")({
  head: () => ({
    meta: [
      { title: "Project Blueprint & Architecture — Tanush · LOG!Q" },
      { name: "description", content: "Deep dive system architecture, technical blueprints, and live demo." },
    ],
  }),
  component: ProjectDetailPage,
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

function ProjectDetailPage() {
  const { projectId } = useParams({ from: "/labs/$projectId" });
  const { projects } = usePortfolioData();

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 pt-32 pb-24 text-center">
        <div className="max-w-md space-y-4">
          <p className="font-mono-soft text-xs uppercase tracking-wider text-bronze">404 · Not Found</p>
          <h1 className="font-display text-4xl text-foreground">Project Not Found</h1>
          <p className="text-sm text-muted-foreground">
            The project blueprint you are looking for doesn't exist or may have been updated.
          </p>
          <Link
            to="/labs"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-xs font-medium text-background transition hover:opacity-90"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const Icon = getProjectIcon(project.iconName);
  const statusTone =
    project.status === "Live Production"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      : project.status === "Active Development"
        ? "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
        : "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400";

  return (
    <div className="relative min-h-screen pb-32">
      {/* Background Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 12%, oklch(0.82 0.14 75 / 0.12), transparent 70%), radial-gradient(40% 30% at 10% 40%, oklch(0.66 0.11 60 / 0.08), transparent 60%)",
        }}
      />

      {/* Top Navigation */}
      <div className="px-6 pt-32 md:pt-40">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/labs"
            className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-card px-4 py-2 text-xs font-medium text-muted-foreground transition hover:border-bronze/50 hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to All Projects
          </Link>
        </div>
      </div>

      {/* Hero Header Banner */}
      <section className="px-6 pt-8 pb-12">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[2.5rem] border border-border/70 p-8 sm:p-12 md:p-16 text-white shadow-2xl"
            style={{ background: project.gradient || "linear-gradient(135deg, #1f2937, #111827)" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_65%)]" />

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-md">
                  {project.tag}
                </span>
                <span className={`rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-md ${statusTone}`}>
                  {project.status}
                </span>
              </div>
              <Icon className="h-10 w-10 text-white/90 drop-shadow" />
            </div>

            <div className="relative z-10 mt-6">
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight text-white drop-shadow-sm">
                {project.title}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="relative z-10 mt-8 flex flex-wrap items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/30 px-5 py-2.5 text-xs font-medium text-white backdrop-blur-md transition hover:bg-white/25 active:scale-95"
                >
                  <Github className="h-4 w-4" />
                  Source Code & GitHub
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-slate-950 transition hover:opacity-90 active:scale-95"
                >
                  <Globe className="h-4 w-4" />
                  Live Deployment
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Overview Section */}
          {project.overview && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl border border-border/70 bg-card p-8 sm:p-10 shadow-sm"
            >
              <h2 className="font-mono-soft text-xs uppercase tracking-widest text-bronze">
                ✦ Problem & System Overview
              </h2>
              <p className="mt-4 font-display text-2xl sm:text-3xl leading-snug tracking-tight text-foreground">
                Engineered to solve real-world bottlenecks.
              </p>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
                {project.overview}
              </p>
            </motion.div>
          )}

          {/* System Architecture Section */}
          {project.systemArchitecture && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-3xl border border-border/80 bg-secondary/30 p-8 sm:p-10"
            >
              <div className="flex items-center gap-2.5">
                <Workflow className="h-5 w-5 text-bronze" />
                <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-foreground">
                  {project.systemArchitecture.title || "System Architecture & Execution Flow"}
                </h2>
              </div>

              {/* Step-by-Step Flow List */}
              {Array.isArray(project.systemArchitecture.flowSteps) &&
                project.systemArchitecture.flowSteps.length > 0 && (
                  <div className="mt-8 space-y-4">
                    {project.systemArchitecture.flowSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-4 sm:p-5 transition hover:border-bronze/40"
                      >
                        <span className="font-mono-soft flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-bronze/40 bg-bronze/10 text-xs font-medium text-bronze">
                          {idx + 1}
                        </span>
                        <p className="text-sm sm:text-base text-foreground/90 leading-relaxed pt-0.5">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

              {/* Architecture Diagram Representation */}
              {project.systemArchitecture.diagramLabel && (
                <div className="mt-8 rounded-2xl border border-dashed border-border bg-card/90 p-5 sm:p-6 text-center">
                  <p className="font-mono-soft text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    Architectural Data Pipeline
                  </p>
                  <p className="font-mono-soft text-sm text-bronze tracking-wide font-medium">
                    {project.systemArchitecture.diagramLabel}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* Key Capabilities */}
          {Array.isArray(project.keyFeatures) && project.keyFeatures.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-3xl border border-border/70 bg-card p-8 sm:p-10"
            >
              <h2 className="font-mono-soft text-xs uppercase tracking-widest text-bronze">
                ✦ Key Engineering Highlights
              </h2>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.keyFeatures.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-2xl border border-border/50 bg-secondary/40 p-4"
                  >
                    <CheckCircle2 className="h-5 w-5 text-bronze shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-foreground leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Technical Stack */}
          {Array.isArray(project.techStack) && project.techStack.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-3xl border border-border/70 bg-card p-8 sm:p-10"
            >
              <h2 className="font-mono-soft text-xs uppercase tracking-widest text-bronze">
                ✦ Technology Stack & Infrastructure
              </h2>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-secondary/80 px-4 py-2 text-xs sm:text-sm font-medium text-foreground transition hover:border-bronze/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Bottom Back Button */}
          <div className="pt-6 text-center">
            <Link
              to="/labs"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-xs font-medium text-foreground transition hover:border-bronze/50"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to Project Directory
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}