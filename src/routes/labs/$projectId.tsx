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
  Layers,
  Terminal,
} from "lucide-react";
import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { InViewLines, RevealLines, SectionLabel, Magnetic } from "@/components/landing/motion-kit";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/labs/$projectId")({
  head: () => ({
    meta: [
      { title: "Project Blueprint & Architecture — Tanush Pai · LOG!Q" },
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
          <SectionLabel index="404">Not Found</SectionLabel>
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
  const isLive = project.status === "Live Production";
  const isDev = project.status === "Active Development";

  return (
    <div className="relative min-h-screen pb-36">
      {/* Background Aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 45% at 50% 12%, oklch(0.82 0.14 75 / 0.12), transparent 70%), radial-gradient(40% 30% at 10% 40%, oklch(0.66 0.11 60 / 0.08), transparent 60%)",
        }}
      />

      {/* Top Back Nav */}
      <div className="px-6 pt-32 md:pt-40">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/labs"
            className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-card px-4 py-2 text-xs font-medium text-muted-foreground transition hover:border-bronze/60 hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to All Projects
          </Link>
        </div>
      </div>

      {/* Main Project Hero Card */}
      <section className="px-6 pt-8 pb-12">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[2rem] border border-border/70 p-8 sm:p-12 md:p-16 text-white shadow-2xl"
            style={{ background: project.gradient || "linear-gradient(135deg, #1f2937, #111827)" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_65%)]" />
            <div className="grain absolute inset-0" />

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono-soft rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[11px] font-medium backdrop-blur-md">
                  {project.category} · {project.tag}
                </span>
                <span className="font-mono-soft flex items-center gap-1.5 rounded-full border border-white/25 bg-black/30 px-3 py-1 text-[11px] font-medium backdrop-blur-md">
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      isLive ? "bg-emerald-400" : isDev ? "bg-amber-300" : "bg-sky-300",
                    )}
                  />
                  {project.status}
                </span>
              </div>
              <Icon className="h-10 w-10 text-white/90 drop-shadow" />
            </div>

            <div className="relative z-10 mt-8">
              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl tracking-[-0.03em] text-white">
                {project.title}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed font-normal">
                {project.tagline}
              </p>
            </div>

            {/* Links and Actions */}
            <div className="relative z-10 mt-10 flex flex-wrap items-center gap-3">
              {project.githubUrl && (
                <Magnetic strength={0.2}>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/30 px-5 py-2.5 text-xs font-medium text-white backdrop-blur-md transition hover:bg-white/25"
                  >
                    <Github className="h-4 w-4" />
                    Source Repository
                    <ExternalLink className="h-3 w-3 opacity-70" />
                  </a>
                </Magnetic>
              )}
              {project.liveUrl && (
                <Magnetic strength={0.2}>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-slate-950 transition hover:bg-bronze hover:text-white"
                  >
                    <Globe className="h-4 w-4" />
                    Live Deployment
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </Magnetic>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Breakdown Sections */}
      <section className="px-6 py-4">
        <div className="mx-auto max-w-5xl space-y-12">
          {/* Overview Section */}
          {project.overview && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-border/70 bg-card p-8 sm:p-12 shadow-sm"
            >
              <SectionLabel index="01" className="mb-4">
                Overview & Context
              </SectionLabel>
              <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-foreground">
                Engineered to solve real-world bottlenecks.
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
                {project.overview}
              </p>
            </motion.div>
          )}

          {/* Architecture Section */}
          {project.systemArchitecture && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-border/80 bg-secondary/30 p-8 sm:p-12"
            >
              <div className="flex items-center gap-3">
                <Workflow className="h-6 w-6 text-bronze" />
                <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-foreground">
                  {project.systemArchitecture.title || "System Architecture & Execution Pipeline"}
                </h2>
              </div>

              {/* Step by Step Flow */}
              {Array.isArray(project.systemArchitecture.flowSteps) &&
                project.systemArchitecture.flowSteps.length > 0 && (
                  <div className="mt-8 space-y-4">
                    {project.systemArchitecture.flowSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 transition hover:border-bronze/50"
                      >
                        <span className="font-mono-soft flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-bronze/40 bg-bronze/10 text-xs font-semibold text-bronze">
                          0{idx + 1}
                        </span>
                        <p className="text-sm sm:text-base text-foreground/90 leading-relaxed pt-0.5">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

              {/* Architecture Diagram Callout */}
              {project.systemArchitecture.diagramLabel && (
                <div className="mt-8 rounded-2xl border border-dashed border-border/80 bg-card/90 p-6 text-center">
                  <p className="font-mono-soft text-xs text-muted-foreground uppercase tracking-widest mb-2">
                    ✦ Telemetry Data Pipeline
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
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-border/70 bg-card p-8 sm:p-12 shadow-sm"
            >
              <SectionLabel index="02" className="mb-4">
                Key Capabilities & Features
              </SectionLabel>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-6">
                {project.keyFeatures.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/50 p-5"
                  >
                    <CheckCircle2 className="h-5 w-5 text-bronze shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground leading-relaxed">{feat}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tech Stack List */}
          {Array.isArray(project.techStack) && project.techStack.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-border/70 bg-card p-8 sm:p-12"
            >
              <SectionLabel index="03" className="mb-4">
                Deployed Technologies & Frameworks
              </SectionLabel>
              <div className="flex flex-wrap gap-2.5 mt-6">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono-soft rounded-full border border-border/80 bg-secondary/60 px-4 py-2 text-xs font-medium text-foreground hover:border-bronze/60 transition"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}