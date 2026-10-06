import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ExternalLink,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Maximize2,
  X,
  Code2,
  Database,
  Cpu,
  Brain,
  Layers,
  Sparkles,
  Award,
  Calendar,
} from "lucide-react";
import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { CertificationItem } from "@/lib/portfolio-store";
import { InViewLines, RevealLines, SectionLabel, Magnetic } from "@/components/landing/motion-kit";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Credentials — Tanush Pai · LOG!Q" },
      {
        name: "description",
        content:
          "Philosophy, credentials, industry certifications, tech stack mastery, and journey of Tanush Pai — AI/ML Engineer.",
      },
      { property: "og:title", content: "About & Credentials — Tanush Pai · LOG!Q" },
      {
        property: "og:description",
        content: "Verified certifications, technical stack mastery, and engineering philosophy of Tanush Pai.",
      },
    ],
  }),
  component: About,
});

function getCertIcon(id: string) {
  if (id.includes("aws") || id.includes("cloud")) return Cpu;
  if (id.includes("db") || id.includes("sql") || id.includes("postgres")) return Database;
  if (id.includes("rag") || id.includes("ai") || id.includes("ml")) return Brain;
  return Code2;
}

export function About() {
  const { certifications, techStack } = usePortfolioData();
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);
  const [activeTechCategory, setActiveTechCategory] = useState<string>("All");

  const techCategories = ["All", "Languages", "AI & ML", "Backend & DB", "Cloud & DevOps", "Frontend"];

  const filteredTech =
    activeTechCategory === "All"
      ? techStack
      : techStack.filter((t) => t.category === activeTechCategory);

  return (
    <div className="relative min-h-screen pb-36">
      {/* Background Aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 50% at 75% 15%, oklch(0.82 0.14 75 / 0.14), transparent 70%), radial-gradient(50% 40% at 20% 80%, oklch(0.66 0.11 60 / 0.08), transparent 60%)",
        }}
      />

      {/* Hero Section */}
      <section className="relative px-6 pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionLabel index="01" className="mb-6">
              About · AI/ML Engineer
            </SectionLabel>

            <RevealLines
              delay={0.15}
              className="font-display text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.95] tracking-[-0.035em] text-foreground"
              lines={[
                "Building",
                <>
                  <span className="italic text-bronze">practical</span> systems
                </>,
                "with intent.",
              ]}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              I am <span className="text-foreground font-medium">Tanush Pai</span>, an AI/ML Engineer specializing in
              generative AI workflows, multi-agent architectures, RAG, and high-performance backend systems. I combine
              deep-dive algorithmic rigor with clean, reliable software engineering.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Magnetic strength={0.2}>
                <Link
                  to="/labs"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:bg-bronze"
                >
                  Inspect Projects
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Magnetic>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition hover:border-bronze/60"
              >
                Get In Touch
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>

          {/* Profile Card Widget */}
          <div className="relative md:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] border border-border/80 bg-gradient-to-b from-secondary/80 to-card p-8 shadow-cinema flex flex-col justify-between"
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <span className="font-mono-soft text-[11px] uppercase tracking-wider text-bronze">
                  Engineer Profile
                </span>
                <span className="flex items-center gap-1.5 font-mono-soft text-[10px] text-emerald-500 uppercase tracking-widest">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </div>

              <div className="my-auto py-6 text-center space-y-3">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-bronze/40 bg-bronze/10 text-4xl font-display text-bronze shadow-inner">
                  T
                </div>
                <h3 className="font-display text-3xl tracking-tight text-foreground">Tanush Pai</h3>
                <p className="font-mono-soft text-xs text-muted-foreground uppercase tracking-widest">
                  AI/ML Engineer · Systems Builder
                </p>
                <div className="pt-2 flex justify-center gap-2">
                  <span className="font-mono-soft rounded-full border border-border/70 bg-background/60 px-3 py-1 text-[11px] text-muted-foreground">
                    Ernakulam, Kerala · Remote
                  </span>
                </div>
              </div>

              <div className="border-t border-border/60 pt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-mono-soft uppercase tracking-wider text-[10px]">Specialization</span>
                <span className="font-mono-soft text-foreground font-medium">Applied AI & Software</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TECH STACK & LOGOS SECTION */}
      <section className="relative px-6 py-24 border-t border-border/60">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <SectionLabel index="02" className="mb-3">
                Technology Stack
              </SectionLabel>
              <h2 className="font-display text-4xl tracking-tight md:text-5xl">
                Tools of the <span className="italic text-bronze">craft</span>.
              </h2>
              <p className="mt-3 text-sm text-muted-foreground max-w-xl leading-relaxed">
                The battle-tested technologies, languages, and distributed frameworks I deploy across production
                environments.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {techCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveTechCategory(cat)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs font-medium transition",
                    activeTechCategory === cat
                      ? "bg-foreground text-background shadow-sm"
                      : "border border-border/80 bg-card/80 text-muted-foreground hover:border-bronze/50 hover:text-foreground",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Tech Grid */}
          <motion.div layout className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {filteredTech.map((tech) => (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -3 }}
                className="group flex flex-col items-center justify-center rounded-2xl border border-border/70 bg-card p-5 text-center transition-all hover:border-bronze/60 hover:shadow-cinema"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/50 p-2.5 transition-transform group-hover:scale-110">
                  <img
                    src={tech.iconUrl}
                    alt={tech.name}
                    className="h-full w-full object-contain filter drop-shadow"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
                <h3 className="mt-3 text-sm font-medium text-foreground">{tech.name}</h3>
                <span className="font-mono-soft mt-1 text-[10px] uppercase text-bronze tracking-wider">
                  {tech.tag}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* VERIFIED CERTIFICATIONS SECTION */}
      <section className="relative px-6 py-24 border-t border-border/60">
        <div className="mx-auto max-w-6xl">
          <SectionLabel index="03" className="mb-3">
            Industry Credentials
          </SectionLabel>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="font-display text-4xl tracking-tight md:text-5xl">
                Verified <span className="italic text-bronze">mastery</span>.
              </h2>
              <p className="mt-3 text-sm text-muted-foreground max-w-xl leading-relaxed">
                Industry certifications validating architectural competence, data engineering, and machine learning
                foundations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => {
              const CertIcon = getCertIcon(cert.id);
              return (
                <motion.div
                  key={cert.id}
                  whileHover={{ y: -3 }}
                  onClick={() => setSelectedCert(cert)}
                  className="group cursor-pointer flex flex-col justify-between rounded-3xl border border-border/70 bg-card p-6 transition-all hover:border-bronze/60 hover:shadow-cinema"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-bronze/40 bg-bronze/10 text-bronze">
                        <CertIcon className="h-5 w-5" />
                      </div>
                      <span className="font-mono-soft text-[11px] text-muted-foreground">{cert.date}</span>
                    </div>

                    <h3 className="font-display mt-5 text-xl tracking-tight text-foreground group-hover:text-bronze transition-colors">
                      {cert.title}
                    </h3>
                    <p className="mt-1 font-mono-soft text-xs text-muted-foreground">{cert.issuer}</p>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {cert.summary}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-border/50 pt-4 flex items-center justify-between">
                    <span className="font-mono-soft text-[10px] text-bronze uppercase tracking-widest flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3 text-emerald-500" /> Verified Credential
                    </span>
                    <span className="font-mono-soft text-xs text-muted-foreground group-hover:text-foreground">
                      Inspect →
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MODAL FOR CERTIFICATE DETAILS */}
      <AnimatePresence>
        {selectedCert && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 px-4 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-8 shadow-cinema"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-bronze/40 bg-bronze/10 text-bronze">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-foreground">{selectedCert.title}</h3>
                  <p className="font-mono-soft text-xs text-bronze">{selectedCert.issuer} · {selectedCert.date}</p>
                </div>
              </div>

              <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
                {selectedCert.summary}
              </p>

              <div className="mt-6 border-t border-border/60 pt-4">
                <p className="font-mono-soft text-[11px] uppercase tracking-wider text-muted-foreground mb-3">
                  Validated Competencies
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedCert.skills.map((s) => (
                    <span
                      key={s}
                      className="font-mono-soft rounded-md border border-border/80 bg-secondary px-2.5 py-1 text-xs text-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {selectedCert.verifyUrl && (
                <div className="mt-8">
                  <a
                    href={selectedCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3 text-xs font-medium text-background transition hover:bg-bronze"
                  >
                    View Official Credential
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}