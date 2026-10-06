import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Compass,
  FlaskConical,
  Cpu,
  Quote,
  Star,
  Award,
  Globe2,
  Layers,
  Boxes,
  Network,
  Brain,
  Wand2,
  PlayCircle,
} from "lucide-react";
import robotClean from "@/assets/qai-robot-clean.png";
import { usePortfolioData } from "@/hooks/use-portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LOG!Q — Intelligent systems, crafted with care" },
      {
        name: "description",
        content:
          "LOG!Q is the personal innovation studio of Tanush — designing intelligent systems, generative tools, and applied AI for the next decade.",
      },
      { property: "og:title", content: "LOG!Q — Intelligent systems, crafted with care" },
      {
        property: "og:description",
        content: "A studio for intelligent systems, generative tools, and applied AI.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative">
      <Hero />
      <Marquee />
      <Manifesto />
      <Pillars />
      <Process />
      <Showcase />
      <CTA />
    </div>
  );
}

function Hero() {
  const { projects } = usePortfolioData();
  const projectCount = projects?.length ?? 12;

  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-24 md:pt-40 md:pb-32">
      {/* soft beige aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 20%, oklch(0.82 0.14 75 / 0.18), transparent 60%), radial-gradient(50% 40% at 10% 90%, oklch(0.66 0.11 60 / 0.10), transparent 60%)",
        }}
      />
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-bronze/40 bg-bronze/10 px-3 py-1 text-[11px] font-medium text-bronze">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bronze opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-bronze" />
              </span>
              Open for one engagement · Q3 2026
            </span>
            <span className="font-mono-soft text-xs uppercase tracking-[0.22em] text-muted-foreground">
              ✦ Studio for Intelligent Systems
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display mt-6 text-5xl leading-[1.02] tracking-tight md:text-7xl lg:text-[5.5rem]"
          >
            Intelligence,{" "}
            <span className="italic text-bronze">crafted</span> with care.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            LOG!Q is the personal innovation studio of Tanush — designing
            intelligent systems, generative tools, and applied AI that feel
            considered, useful, and quietly powerful.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/labs"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
            >
              Explore Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition hover:border-bronze/50"
            >
              About & Credentials
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          <div className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-border/60 pt-6">
            {[
              { k: `${projectCount}+`, v: "Systems" },
              { k: "6", v: "Domains" },
              { k: "∞", v: "Curiosity" },
            ].map((s) => (
              <div key={s.v}>
                <p className="font-display text-3xl tracking-tight">{s.k}</p>
                <p className="font-mono-soft mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative md:col-span-5">
          <div className="relative mx-auto aspect-square w-full max-w-[480px]">
            {/* concentric rings */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-full border border-bronze/20"
            />
            <div
              aria-hidden
              className="absolute inset-6 rounded-full border border-bronze/15"
            />
            <div
              aria-hidden
              className="absolute inset-14 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 50% 45%, oklch(0.82 0.14 75 / 0.28), transparent 65%)",
              }}
            />
            <img
              src={robotClean}
              alt="QAI — the LOG!Q intelligent companion"
              className="absolute inset-0 h-full w-full object-contain"
              style={{
                filter:
                  "drop-shadow(0 24px 50px oklch(0.66 0.11 60 / 0.25))",
              }}
            />
          </div>
          <p className="font-mono-soft mt-6 text-center text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            QAI · Companion intelligence
          </p>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "Agentic Systems",
    "Generative Interfaces",
    "ESG Intelligence",
    "Applied Research",
    "Sustainability AI",
    "Cognitive Memory",
    "Studio Practice",
    "Quiet Craft",
  ];
  return (
    <section className="relative border-y border-border/60 bg-card/40 py-5">
      <div className="flex gap-10 overflow-hidden">
        <div className="flex shrink-0 animate-[marquee_40s_linear_infinite] gap-10 whitespace-nowrap">
          {[...items, ...items, ...items].map((t, i) => (
            <span
              key={i}
              className="font-mono-soft text-xs uppercase tracking-[0.22em] text-muted-foreground"
            >
              ✦&nbsp;&nbsp;{t}
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }`}</style>
    </section>
  );
}

function Pillars() {
  const pillars = [
    {
      icon: Compass,
      k: "Direction",
      v: "Each system begins as a thesis — a clear point of view on what intelligence should feel like.",
    },
    {
      icon: FlaskConical,
      k: "Craft",
      v: "Research, prototyping, and design held to the same standard as the final artifact.",
    },
    {
      icon: Cpu,
      k: "Systems",
      v: "Architected platforms with memory, reasoning, and an interface that disappears.",
    },
  ];
  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex items-end justify-between gap-6">
          <div>
            <p className="font-mono-soft text-xs uppercase tracking-[0.22em] text-bronze">
              The practice
            </p>
            <h2 className="font-display mt-4 max-w-2xl text-4xl leading-[1.05] tracking-tight md:text-5xl">
              Three principles behind every LOG!Q system.
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border/70 bg-border/60 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.k} className="bg-background p-8 md:p-10">
              <p.icon className="h-6 w-6 text-bronze" />
              <h3 className="font-display mt-8 text-2xl tracking-tight">
                {p.k}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.v}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Showcase() {
  const items = [
    {
      tag: "Flagship",
      title: "QAI — Companion intelligence",
      desc: "A conversational companion threaded through the LOG!Q ecosystem. Memory, taste, presence.",
    },
    {
      tag: "Platform",
      title: "ESG Intelligence",
      desc: "Sustainability analytics that turn compliance into clarity for teams that care.",
    },
    {
      tag: "Research",
      title: "AcademicXchange",
      desc: "An AI-native space for academic collaboration, discovery, and quiet scholarship.",
    },
  ];
  return (
    <section className="relative border-t border-border/60 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="font-mono-soft text-xs uppercase tracking-[0.22em] text-bronze">
              Selected work
            </p>
            <h2 className="font-display mt-4 text-4xl leading-[1.05] tracking-tight md:text-5xl">
              A few systems, in motion.
            </h2>
          </div>
          <Link
            to="/labs"
            className="group hidden items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground md:inline-flex"
          >
            Browse all
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Link
                to="/labs"
                className="group block h-full rounded-3xl border border-border/70 bg-card p-8 transition hover:-translate-y-0.5 hover:border-bronze/50"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-soft text-[10px] uppercase tracking-[0.22em] text-bronze">
                    {it.tag}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
                <h3 className="font-display mt-16 text-2xl leading-tight tracking-tight">
                  {it.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {it.desc}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative px-6 pb-28 pt-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-border/70 bg-foreground p-10 text-background md:p-16">
        <div className="grid items-end gap-10 md:grid-cols-2">
          <div>
            <p className="font-mono-soft text-xs uppercase tracking-[0.22em] opacity-70">
              <Sparkles className="mr-1 inline h-3 w-3" /> A quiet invitation
            </p>
            <h2 className="font-display mt-5 text-4xl leading-[1.05] tracking-tight md:text-5xl">
              Build something considered, together.
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <p className="max-w-md text-sm opacity-80 md:text-right">
              Collaborations, conversations, and commissions on intelligent
              systems are open. If your work resonates with this practice — say
              hello.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition hover:opacity-90"
            >
              Start a conversation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="relative px-6 py-32 md:py-44">
      <div className="mx-auto max-w-5xl text-center">
        <p className="font-mono-soft text-xs uppercase tracking-[0.22em] text-bronze">
          ✦ Manifesto
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="font-display mx-auto mt-8 text-4xl leading-[1.08] tracking-tight text-foreground md:text-6xl lg:text-7xl"
        >
          We believe intelligence should feel{" "}
          <span className="italic text-bronze">human</span> — quiet, considered,
          and in service of the work, never the demo.
        </motion.h2>
        <div className="mx-auto mt-12 flex max-w-md items-center justify-center gap-3 text-muted-foreground">
          <span className="h-px w-12 bg-border" />
          <span className="font-mono-soft text-[11px] uppercase tracking-[0.22em]">
            Studio principles · 2026
          </span>
          <span className="h-px w-12 bg-border" />
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  const items = [
    {
      icon: Brain,
      title: "Agentic Reasoning",
      desc: "Multi-step agents with memory, planning, and tool-use that survive contact with real workflows.",
      span: "md:col-span-2 md:row-span-2",
      tone: "from-bronze/20 to-transparent",
    },
    {
      icon: Wand2,
      title: "Generative Interfaces",
      desc: "Surfaces that compose themselves around the user.",
      span: "md:col-span-1",
    },
    {
      icon: Network,
      title: "Orchestration",
      desc: "Routing, retries, and observability across complex chains.",
      span: "md:col-span-1",
    },
    {
      icon: Layers,
      title: "Applied Research",
      desc: "Translating papers into production-grade systems.",
      span: "md:col-span-2",
    },
    {
      icon: Boxes,
      title: "Design Systems",
      desc: "Editorial visual languages built to scale.",
      span: "md:col-span-1",
    },
    {
      icon: Globe2,
      title: "Sustainability AI",
      desc: "Models that turn ESG noise into operating signal.",
      span: "md:col-span-1",
    },
  ];
  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono-soft text-xs uppercase tracking-[0.22em] text-bronze">
              Capabilities
            </p>
            <h2 className="font-display mt-4 max-w-2xl text-4xl leading-[1.05] tracking-tight md:text-5xl">
              A studio of overlapping disciplines.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Research, engineering, and craft — held to the same standard, so the
            work feels inevitable rather than assembled.
          </p>
        </div>
        <div className="grid auto-rows-[180px] grid-cols-1 gap-3 md:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/70 bg-card p-6 transition hover:-translate-y-0.5 hover:border-bronze/50 ${it.span ?? ""}`}
            >
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-0 -z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${it.tone ? `bg-gradient-to-br ${it.tone}` : ""}`}
              />
              <it.icon className="relative h-6 w-6 text-bronze" />
              <div className="relative">
                <h3 className="font-display text-2xl leading-tight tracking-tight">
                  {it.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {it.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    {
      n: "01",
      k: "Listen",
      v: "We start with the problem — not the model. A short engagement defines the wedge and the success surface.",
    },
    {
      n: "02",
      k: "Prototype",
      v: "Two-week loops. Real data, real users, real interfaces. Decisions are made with evidence.",
    },
    {
      n: "03",
      k: "Architect",
      v: "We harden the winning prototype into a system — memory, evaluation, guardrails, telemetry.",
    },
    {
      n: "04",
      k: "Hand off",
      v: "Documented, observable, and owned by your team. We stay close as long as it's useful.",
    },
  ];
  return (
    <section className="relative border-t border-border/60 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14">
          <p className="font-mono-soft text-xs uppercase tracking-[0.22em] text-bronze">
            Process
          </p>
          <h2 className="font-display mt-4 max-w-2xl text-4xl leading-[1.05] tracking-tight md:text-5xl">
            How a LOG!Q engagement unfolds.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border/70 bg-border/60 md:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.n}
              className="group relative flex flex-col gap-6 bg-background p-8 transition hover:bg-card md:p-10"
            >
              <span className="font-mono-soft text-[11px] tracking-[0.22em] text-bronze">
                {s.n}
              </span>
              <div>
                <h3 className="font-display text-3xl tracking-tight">{s.k}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.v}
                </p>
              </div>
              <span className="absolute right-6 top-6 h-1.5 w-1.5 rounded-full bg-bronze/60 transition group-hover:scale-150" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    {
      q: "LOG!Q gave us the unfair advantage of a research lab embedded inside a product team. Calm, fast, and absurdly thoughtful.",
      a: "VP Product",
      c: "Public-market fintech",
    },
    {
      q: "The clearest thinking on agentic systems we've come across. Every artifact felt inevitable in hindsight.",
      a: "Head of AI",
      c: "Healthcare platform",
    },
    {
      q: "An aesthetic of restraint that we now hold every internal team to. We ship slower and ship better because of it.",
      a: "Founder",
      c: "Climate scale-up",
    },
  ];
  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="font-mono-soft text-xs uppercase tracking-[0.22em] text-bronze">
              In their words
            </p>
            <h2 className="font-display mt-4 max-w-2xl text-4xl leading-[1.05] tracking-tight md:text-5xl">
              Trusted by teams that ship serious work.
            </h2>
          </div>
          <div className="hidden items-center gap-1 md:flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-bronze text-bronze" />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {quotes.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative flex h-full flex-col justify-between rounded-3xl border border-border/70 bg-card p-8"
            >
              <Quote className="h-6 w-6 text-bronze/60" />
              <blockquote className="font-display mt-6 text-xl leading-snug tracking-tight">
                "{t.q}"
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3 border-t border-border/60 pt-5">
                <span
                  aria-hidden
                  className="h-9 w-9 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.82 0.14 75), oklch(0.62 0.09 55))",
                  }}
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{t.a}</p>
                  <p className="font-mono-soft text-[11px] uppercase tracking-wider text-muted-foreground">
                    {t.c}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const { projects } = usePortfolioData();
  const projectCount = projects?.length ?? 12;

  const rows = [
    { k: "$48M", v: "Pipeline value influenced", note: "Across enterprise solutions" },
    { k: `${projectCount}`, v: "Systems in production", note: "From agentic to ESG" },
    { k: "4.9 / 5", v: "Client satisfaction", note: "Average across reviews" },
    { k: "6", v: "Domains served", note: "Health, climate, fintech, edu, media, gov" },
  ];
  return (
    <section className="relative border-y border-border/60 bg-card/40 px-6 py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-4">
        {rows.map((r) => (
          <div key={r.v}>
            <p className="font-mono-soft text-[11px] uppercase tracking-[0.22em] text-bronze">
              <Award className="mr-1 inline h-3 w-3" /> Impact
            </p>
            <p className="font-display mt-4 text-5xl leading-none tracking-tight">
              {r.k}
            </p>
            <p className="mt-3 text-sm text-foreground">{r.v}</p>
            <p className="mt-1 text-xs text-muted-foreground">{r.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
