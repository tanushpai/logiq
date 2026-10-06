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
  FileCheck,
  Settings,
} from "lucide-react";
import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { CertificationItem } from "@/lib/portfolio-store";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Tanush · LOG!Q" },
      {
        name: "description",
        content:
          "Philosophy, credentials, industry certifications, tech stack mastery, and journey of Tanush — AI Engineer and Systems Architect.",
      },
      { property: "og:title", content: "About — Tanush · LOG!Q" },
      {
        property: "og:description",
        content: "Certifications, technical stack, and design philosophy of Tanush.",
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

const timeline = [
  { year: "2026", title: "Autonomous Agent Architectures", desc: "Developing end-to-end multi-agent orchestration engines with long-horizon planning and memory reflection." },
  { year: "2025", title: "Applied Research & LOG!Q", desc: "Engineered scalable RAG pipelines, ESG compliance telemetry, and digital companion frameworks." },
  { year: "2024", title: "Enterprise Database Systems", desc: "Architected high-throughput relational databases with specialized indexing and caching layers." },
  { year: "2023", title: "Applied Machine Learning & NLP", desc: "Shipped semantic search and biomedical entity extraction pipelines for clinical protocol evaluation." },
];

function About() {
  const { certifications, techStack } = usePortfolioData();
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);
  const [activeTechCategory, setActiveTechCategory] = useState<string>("All");

  const techCategories = ["All", "Languages", "AI & ML", "Backend & DB", "Cloud & DevOps", "Frontend"];

  const filteredTech = activeTechCategory === "All"
    ? techStack
    : techStack.filter((t) => t.category === activeTechCategory);

  return (
    <div className="relative min-h-screen">
      {/* Background Aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 40% at 80% 15%, oklch(0.82 0.14 75 / 0.14), transparent 70%), radial-gradient(50% 30% at 20% 80%, oklch(0.66 0.11 60 / 0.08), transparent 60%)",
        }}
      />

      {/* Hero Section */}
      <section className="relative px-6 pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono-soft text-xs uppercase tracking-widest text-bronze"
            >
              ✦ About · Systems Architect & Engineer
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display mt-6 text-5xl leading-[1.05] tracking-tight md:text-7xl"
            >
              Building <span className="italic text-bronze">intelligent</span> systems with intent.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              I am Tanush, an AI engineer and systems developer focusing on agentic architectures,
              relational data engineering, and quiet, human-centered interfaces. I combine deep-dive
              algorithmic rigor with production-grade craft.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/labs"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
              >
                Inspect Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition hover:border-bronze/50"
              >
                Get In Touch
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>

          <div className="relative md:col-span-5 flex justify-center">
            <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-b from-secondary to-card p-6 shadow-cinema flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <span className="font-mono-soft text-[11px] uppercase tracking-wider text-bronze">
                  Engineer Profile
                </span>
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="my-auto py-8 text-center space-y-3">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-bronze/40 bg-bronze/10 text-3xl font-display text-bronze shadow-inner">
                  T
                </div>
                <h3 className="font-display text-2xl tracking-tight text-foreground">Tanush</h3>
                <p className="font-mono-soft text-xs text-muted-foreground uppercase tracking-wider">
                  AI Engineer · Systems Builder
                </p>
                <div className="pt-2 flex justify-center gap-2">
                  <span className="rounded-md border border-border/60 bg-secondary/80 px-2.5 py-0.5 text-[11px] text-muted-foreground">
                    Bangalore, IN / Remote
                  </span>
                </div>
              </div>

              <div className="border-t border-border/60 pt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>Specialization</span>
                <span className="font-mono-soft text-foreground">Applied AI & Systems</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK & LOGOS SECTION */}
      <section className="relative px-6 py-24 border-t border-border/60">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="font-mono-soft text-xs uppercase tracking-widest text-bronze">
                ✦ Technology Stack
              </p>
              <h2 className="font-display mt-3 text-4xl tracking-tight md:text-5xl">
                Tools of the <span className="italic text-bronze">craft</span>.
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-xl">
                The battle-tested technologies, languages, and distributed frameworks I deploy across
                production environments.
              </p>
            </div>

            {/* Category filter for tech stack */}
            <div className="flex flex-wrap gap-1.5">
              {techCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTechCategory(cat)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs transition-all ${
                    activeTechCategory === cat
                      ? "border-foreground bg-foreground text-background"
                      : "border-border/70 bg-card text-muted-foreground hover:border-bronze/50 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Logo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredTech.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                className="group relative flex flex-col items-center justify-center rounded-2xl border border-border/70 bg-card p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-bronze/50 hover:shadow-cinema"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/60 p-2.5 transition-transform group-hover:scale-110">
                  <img
                    src={item.iconUrl}
                    alt={`${item.name} logo`}
                    className="h-9 w-9 object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
                <h4 className="mt-3 font-display text-base font-medium tracking-tight text-foreground">
                  {item.name}
                </h4>
                <span className="font-mono-soft mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                  {item.tag}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS & CREDENTIALS SECTION */}
      <section className="relative px-6 py-24 border-t border-border/60">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="font-mono-soft text-xs uppercase tracking-widest text-bronze">
                ✦ Industry Credentials
              </p>
              <h2 className="font-display mt-3 text-4xl tracking-tight md:text-5xl">
                Verified <span className="italic text-bronze">certifications</span>.
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-xl">
                Accredited industry validations across cloud architecture, relational database
                systems, and deep learning engineering.
              </p>
            </div>
            <span className="font-mono-soft text-xs text-muted-foreground flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              {certifications.length} Credentials Verified & Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => {
              const Icon = getCertIcon(cert.id);
              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  onClick={() => setSelectedCert(cert)}
                  className="group relative cursor-pointer overflow-hidden rounded-3xl border border-border/80 bg-card p-6 md:p-8 transition-all duration-300 hover:border-bronze/60 hover:shadow-cinema"
                >
                  <div
                    aria-hidden
                    className={`absolute inset-0 bg-gradient-to-br ${cert.badgeTone} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  />

                  <div className="relative flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-secondary text-bronze">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="text-right">
                          <span className="font-mono-soft text-xs font-medium text-bronze">
                            {cert.date}
                          </span>
                          <p className="font-mono-soft text-[10px] text-muted-foreground">
                            {cert.credentialId}
                          </p>
                        </div>
                      </div>

                      <h3 className="font-display mt-5 text-2xl leading-snug tracking-tight text-foreground group-hover:text-bronze transition-colors">
                        {cert.title}
                      </h3>

                      <p className="font-mono-soft mt-1 text-xs text-muted-foreground uppercase tracking-wider">
                        Issued by {cert.issuer}
                      </p>

                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {cert.summary}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md border border-border/60 bg-secondary/60 px-2 py-0.5 text-[11px] text-muted-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 border-t border-border/60 pt-4 flex items-center justify-between text-xs">
                      <span className="font-mono-soft text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Verified Authenticity
                      </span>
                      <span className="font-mono-soft text-bronze group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                        View details <Maximize2 className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="px-6 py-24 border-t border-border/60">
        <div className="mx-auto max-w-4xl">
          <p className="font-mono-soft text-xs uppercase text-bronze">✦ Experience timeline</p>
          <h2 className="font-display mt-4 text-4xl tracking-tight md:text-5xl">
            A continuum of curiosity.
          </h2>
          <div className="mt-14 space-y-10 border-l border-border pl-8">
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative"
              >
                <span className="absolute -left-[37px] top-2 h-3 w-3 rounded-full border-2 border-bronze bg-background" />
                <p className="font-mono-soft text-xs text-bronze">{t.year}</p>
                <h3 className="font-display mt-1 text-2xl">{t.title}</h3>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATION DETAIL MODAL */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 bg-background/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono-soft inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified Credential
                </span>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="rounded-full border border-border p-1.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <h3 className="font-display mt-4 text-3xl tracking-tight text-foreground">
                {selectedCert.title}
              </h3>
              <p className="font-mono-soft mt-1 text-sm text-bronze">
                {selectedCert.issuer} · Issued {selectedCert.date}
              </p>

              <div className="mt-6 rounded-2xl border border-border bg-secondary/50 p-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {selectedCert.summary}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs border-t border-border/60 pt-3">
                  <span className="font-mono-soft text-muted-foreground">Credential ID:</span>
                  <span className="font-mono-soft font-medium text-foreground">{selectedCert.credentialId}</span>
                </div>
              </div>

              <div className="mt-6">
                <p className="font-mono-soft text-xs uppercase tracking-wider text-bronze">
                  Validated Competencies
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {selectedCert.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg border border-border bg-secondary px-3 py-1 text-xs text-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
                <a
                  href={selectedCert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-medium text-bronze hover:underline"
                >
                  Verify via Issuer Portal <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="rounded-full bg-foreground px-5 py-2 text-xs font-medium text-background hover:opacity-90"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}