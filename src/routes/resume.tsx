import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Briefcase, GraduationCap, Award, Cpu, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { InViewLines, RevealLines, SectionLabel, Magnetic } from "@/components/landing/motion-kit";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume — Tanush Pai · LOG!Q" },
      { name: "description", content: "Professional experience, enterprise impact, education, and technical competencies of Tanush Pai." },
      { property: "og:title", content: "Resume — Tanush Pai · LOG!Q" },
      { property: "og:description", content: "AI/ML Engineer resume with verified achievements and enterprise impact." },
    ],
  }),
  component: ResumePage,
});

export function ResumePage() {
  const { resume } = usePortfolioData();

  return (
    <div className="relative min-h-screen pb-36">
      {/* Background Aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 45% at 50% 12%, oklch(0.82 0.14 75 / 0.12), transparent 70%), radial-gradient(40% 30% at 80% 60%, oklch(0.66 0.11 60 / 0.08), transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-5xl px-6 pt-36 md:pt-44">
        {/* Header with Title and Download */}
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end border-b border-border/60 pb-12">
          <div>
            <SectionLabel index="01" className="mb-4">
              Curriculum Vitae · {resume.name}
            </SectionLabel>
            <RevealLines
              delay={0.15}
              className="font-display text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.035em] text-foreground"
              lines={[
                "The",
                <>
                  <span className="italic text-bronze">engineering</span> track
                </>,
                "behind the work.",
              ]}
            />
            <p className="mt-4 font-mono-soft text-xs uppercase tracking-wider text-muted-foreground">
              {resume.title}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Magnetic strength={0.2}>
              <a
                href="/Tanush-Pai-resume.pdf"
                download="Tanush-Pai-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-xs font-medium text-background transition hover:bg-bronze"
              >
                <Download className="h-4 w-4" /> Download PDF Resume
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Executive Summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 rounded-3xl border border-border/70 bg-card p-8 sm:p-10 shadow-sm"
        >
          <p className="font-mono-soft text-xs uppercase tracking-widest text-bronze mb-3">
            ✦ Executive Summary
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-foreground/90 font-normal">
            {resume.summary}
          </p>
        </motion.div>

        {/* Tabs for Structured View */}
        <div className="mt-14">
          <Tabs defaultValue="experience" className="space-y-8">
            <TabsList className="rounded-full bg-card/80 border border-border/70 p-1.5 backdrop-blur-md">
              <TabsTrigger value="experience" className="rounded-full px-5 py-2 text-xs">
                <Briefcase className="mr-1.5 h-3.5 w-3.5" /> Experience
              </TabsTrigger>
              <TabsTrigger value="skills" className="rounded-full px-5 py-2 text-xs">
                <Cpu className="mr-1.5 h-3.5 w-3.5" /> Core Skills
              </TabsTrigger>
              <TabsTrigger value="education" className="rounded-full px-5 py-2 text-xs">
                <GraduationCap className="mr-1.5 h-3.5 w-3.5" /> Education
              </TabsTrigger>
            </TabsList>

            {/* EXPERIENCE CONTENT */}
            <TabsContent value="experience" className="space-y-6">
              {resume.experience.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-3xl border border-border/70 bg-card p-8 sm:p-10 transition hover:border-bronze/50"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 border-b border-border/60 pb-5">
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl text-foreground">{exp.role}</h3>
                      <p className="font-mono-soft text-xs text-bronze mt-1">
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                    <span className="font-mono-soft text-xs rounded-full border border-border bg-secondary/60 px-3 py-1 text-muted-foreground w-fit">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="mt-6 space-y-3.5 text-sm sm:text-base text-muted-foreground">
                    {exp.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3">
                        <span className="font-mono-soft text-bronze mt-1 text-xs">✦</span>
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </TabsContent>

            {/* SKILLS CONTENT */}
            <TabsContent value="skills">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-3xl border border-border/70 bg-card p-8">
                  <h4 className="font-mono-soft text-xs uppercase tracking-widest text-bronze mb-4">
                    AI, LLMs & Generative Workflows
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.aiAndGenAI.map((s) => (
                      <span key={s} className="font-mono-soft rounded-full border border-border/80 bg-secondary/50 px-3.5 py-1.5 text-xs text-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-border/70 bg-card p-8">
                  <h4 className="font-mono-soft text-xs uppercase tracking-widest text-bronze mb-4">
                    Languages & Core Scripting
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.languages.map((s) => (
                      <span key={s} className="font-mono-soft rounded-full border border-border/80 bg-secondary/50 px-3.5 py-1.5 text-xs text-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-border/70 bg-card p-8">
                  <h4 className="font-mono-soft text-xs uppercase tracking-widest text-bronze mb-4">
                    Databases & Data Engineering
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.databases.map((s) => (
                      <span key={s} className="font-mono-soft rounded-full border border-border/80 bg-secondary/50 px-3.5 py-1.5 text-xs text-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-border/70 bg-card p-8">
                  <h4 className="font-mono-soft text-xs uppercase tracking-widest text-bronze mb-4">
                    Backend, Cloud & Tooling
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.backendAndTools.map((s) => (
                      <span key={s} className="font-mono-soft rounded-full border border-border/80 bg-secondary/50 px-3.5 py-1.5 text-xs text-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* EDUCATION CONTENT */}
            <TabsContent value="education" className="space-y-6">
              {resume.education.map((edu, i) => (
                <div key={i} className="rounded-3xl border border-border/70 bg-card p-8 sm:p-10">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 border-b border-border/60 pb-5">
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl text-foreground">{edu.degree}</h3>
                      <p className="font-mono-soft text-xs text-bronze mt-1">
                        {edu.institution} · {edu.location}
                      </p>
                    </div>
                    <span className="font-mono-soft text-xs rounded-full border border-border bg-secondary/60 px-3 py-1 text-muted-foreground w-fit">
                      {edu.period}
                    </span>
                  </div>
                  {edu.details && (
                    <p className="mt-5 text-sm text-muted-foreground leading-relaxed">{edu.details}</p>
                  )}
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}