import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import robotClean from "@/assets/qai-robot-clean.png";
import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { useTheme } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ShaderField } from "@/components/landing/shader-field";
import {
  InViewLines,
  LiveClock,
  Magnetic,
  RevealLines,
  ScrollFillText,
  SectionLabel,
  VelocityMarquee,
} from "@/components/landing/motion-kit";
import type { ProjectItem } from "@/lib/portfolio-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tanush Pai — AI/ML Engineer · LOG!Q" },
      {
        name: "description",
        content:
          "Tanush Pai is an AI/ML Engineer building practical AI applications, agentic systems, and data-driven products that solve real problems.",
      },
      { property: "og:title", content: "Tanush Pai — AI/ML Engineer · LOG!Q" },
      {
        property: "og:description",
        content: "AI systems, built to actually work. Practical AI applications, agentic workflows, and software engineering.",
      },
    ],
  }),
  component: Index,
});

const CONTAINER = "mx-auto w-full max-w-[1400px] px-6 md:px-10";

function Index() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <div className="relative">
        <Hero />
        <Marquee />
        <Philosophy />
        <Principles />
        <Process />
        <Projects />
        <CTA />
      </div>
    </MotionConfig>
  );
}

/* ================================================================== */
/* HERO                                                               */
/* ================================================================== */
function Hero() {
  const { theme } = useTheme();
  const { projects, techStack } = usePortfolioData();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);

  // Robot drifts gently against the cursor
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(mx, { stiffness: 60, damping: 18 });
  const ry = useSpring(my, { stiffness: 60, damping: 18 });
  const robotX = useTransform(rx, (v) => v * -28);
  const robotY = useTransform(ry, (v) => v * -20);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <section ref={ref} className="grain relative isolate min-h-[100svh] overflow-hidden">
      <motion.div style={{ scale: bgScale }} className="absolute inset-0 -z-20">
        <ShaderField dark={theme === "dark"} />
      </motion.div>
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent to-background" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className={cn(CONTAINER, "relative flex min-h-[100svh] flex-col pt-28 pb-24 md:pt-32 md:pb-28")}
      >
        {/* Top meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-mono-soft flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
        >
          <span>Tanush Pai — Portfolio ©{new Date().getFullYear()}</span>
          <span className="hidden md:inline">AI / ML Engineer · Builder · Explorer</span>
          <span className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Available
          </span>
        </motion.div>

        {/* Headline + robot */}
        <div className="relative flex flex-1 items-end py-10">
          <motion.img
            src={robotClean}
            alt=""
            aria-hidden
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            style={{ x: robotX, y: robotY, filter: "drop-shadow(0 40px 60px oklch(0.3 0.08 55 / 0.45))" }}
            className="pointer-events-none absolute right-[-4%] top-1/2 hidden w-[min(36vw,500px)] -translate-y-[55%] select-none lg:block"
          />
          <RevealLines
            delay={0.25}
            className="font-display relative z-10 text-[clamp(3.4rem,10.4vw,10.75rem)] leading-[0.9] tracking-[-0.035em] text-foreground"
            lines={[
              "AI systems,",
              <>
                <span className="italic text-bronze">built</span> to
              </>,
              "actually work.",
            ]}
          />
        </div>

        {/* Bottom info row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-8 border-t border-foreground/10 pt-6 md:grid-cols-12"
        >
          <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground md:col-span-5">
            I'm <span className="text-foreground">Tanush Pai</span> — an AI/ML Engineer building practical AI
            applications, agentic systems, and data-driven products that solve real problems.
          </p>

          <div className="flex flex-wrap items-center gap-5 md:col-span-4">
            <Magnetic strength={0.25}>
              <Link
                to="/labs"
                className="group inline-flex items-center gap-3 rounded-full bg-foreground py-3 pl-6 pr-3 text-sm font-medium text-background transition-colors hover:bg-bronze"
              >
                Explore Projects
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background text-foreground">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                </span>
              </Link>
            </Magnetic>
            <Link
              to="/about"
              className="group relative text-sm text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-bronze after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100"
            >
              About Me ↗
            </Link>
          </div>

          <dl className="font-mono-soft grid grid-cols-2 gap-x-6 gap-y-3 text-[11px] uppercase tracking-[0.18em] md:col-span-3">
            <div>
              <dt className="text-muted-foreground">Based in</dt>
              <dd className="mt-1 text-foreground">Ernakulam, IN</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Local time</dt>
              <dd className="mt-1 text-foreground">
                <LiveClock /> IST
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Projects</dt>
              <dd className="mt-1 text-foreground">{String(projects.length).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Technologies</dt>
              <dd className="mt-1 text-foreground">{techStack.length}+</dd>
            </div>
          </dl>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ================================================================== */
/* MARQUEE                                                            */
/* ================================================================== */
function Marquee() {
  const items = [
    "Generative AI",
    "Agentic Systems",
    "RAG",
    "Data Engineering",
    "Machine Learning",
    "AI Applications",
    "Software Engineering",
  ];
  return (
    <section aria-label="Focus areas" className="relative border-y border-border/60 py-7 md:py-9">
      <VelocityMarquee baseVelocity={-2.2}>
        {items.map((t, i) => (
          <span key={t} className="flex items-center">
            <span
              className={cn(
                "font-display px-6 text-[clamp(2.4rem,5.6vw,5.25rem)] leading-none tracking-[-0.02em] md:px-10",
                i % 2 === 1 ? "text-outline" : "text-foreground",
              )}
            >
              {t}
            </span>
            <span className="h-2 w-2 rotate-45 bg-bronze" />
          </span>
        ))}
      </VelocityMarquee>
    </section>
  );
}

/* ================================================================== */
/* PHILOSOPHY                                                         */
/* ================================================================== */
function Philosophy() {
  return (
    <section className="relative py-32 md:py-48">
      <div className={cn(CONTAINER, "grid gap-10 md:grid-cols-12")}>
        <div className="md:col-span-3">
          <SectionLabel index="01">Engineering Philosophy</SectionLabel>
        </div>
        <div className="md:col-span-9">
          <ScrollFillText
            className="font-display text-[clamp(2.5rem,6vw,6rem)] leading-[1] tracking-[-0.03em] text-foreground"
            segments={[{ text: "I build AI that is" }, { text: "useful", accent: true }, { text: "before it is impressive." }]}
          />
          <div className="mt-16 grid gap-10 border-t border-border/60 pt-8 md:grid-cols-2">
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
              I care about systems that solve real problems, behave reliably, and make complex workflows simpler — not
              AI for the sake of a demo.
            </p>
            <div className="font-mono-soft flex flex-col justify-end gap-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:items-end">
              <span className="text-foreground">— Tanush Pai</span>
              <span>AI/ML Engineer · Ernakulam, Kerala</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* PRINCIPLES                                                         */
/* ================================================================== */
function Principles() {
  const items = [
    {
      n: "01",
      k: "Understand",
      v: "Start with the problem, users, data, and constraints before choosing the technology.",
    },
    {
      n: "02",
      k: "Build",
      v: "Prototype quickly, test assumptions, and turn promising ideas into working systems.",
    },
    {
      n: "03",
      k: "Engineer",
      v: "Add the architecture, AI workflows, APIs, data layer, evaluation, and safeguards needed beyond the demo.",
    },
  ];
  return (
    <section className="relative border-t border-border/60 py-28 md:py-36">
      <div className={CONTAINER}>
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <SectionLabel index="02">How I Build</SectionLabel>
          </div>
          <InViewLines
            className="font-display text-[clamp(2.3rem,5vw,4.75rem)] leading-[1] tracking-[-0.03em] md:col-span-9"
            lines={["Three principles behind", "the way I build."]}
          />
        </div>

        <div className="mt-20 grid border-t border-border/60 md:grid-cols-3">
          {items.map((it, i) => (
            <motion.article
              key={it.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative border-b border-border/60 py-10 md:border-b-0 md:border-r md:px-10 md:py-14 md:first:pl-0 md:last:border-r-0"
            >
              <span className="font-display text-outline hover-fill block text-[clamp(5rem,9vw,8.5rem)] leading-none tracking-[-0.04em]">
                {it.n}
              </span>
              <h3 className="font-display mt-8 text-3xl tracking-tight md:text-4xl">{it.k}</h3>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted-foreground">{it.v}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* PROCESS — sticky heading, steps light up as they cross center      */
/* ================================================================== */
const STEPS = [
  { k: "Understand", v: "Define the problem, users, data, and constraints." },
  { k: "Prototype", v: "Build the smallest useful version and validate the idea quickly." },
  {
    k: "Engineer",
    v: "Turn the prototype into a reliable system with the right architecture, AI workflows, APIs, and data layer.",
  },
  { k: "Ship", v: "Deploy, observe, iterate, and keep improving." },
];

function ProcessStep({
  index,
  step,
  active,
  onActive,
}: {
  index: number;
  step: (typeof STEPS)[number];
  active: boolean;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li ref={ref} className="border-t border-border/60 py-14 md:py-20">
      <div className="flex items-baseline gap-6">
        <span
          className={cn(
            "font-mono-soft text-xs tracking-[0.22em] transition-colors duration-500",
            active ? "text-bronze" : "text-muted-foreground/50",
          )}
        >
          0{index + 1}
        </span>
        <div>
          <h3
            className={cn(
              "font-display text-5xl tracking-[-0.03em] transition-colors duration-500 md:text-7xl",
              active ? "text-foreground" : "text-muted-foreground/30",
            )}
          >
            {step.k}
          </h3>
          <p
            className={cn(
              "mt-5 max-w-md text-[15px] leading-relaxed transition-all duration-500",
              active ? "text-muted-foreground opacity-100" : "translate-y-1 text-muted-foreground opacity-40",
            )}
          >
            {step.v}
          </p>
        </div>
      </div>
    </li>
  );
}

function Process() {
  const [active, setActive] = useState(0);
  return (
    <section className="relative border-t border-border/60 py-28 md:py-32">
      <div className={cn(CONTAINER, "grid gap-12 md:grid-cols-12")}>
        <div className="h-fit md:sticky md:top-32 md:col-span-5">
          <SectionLabel index="03">Process</SectionLabel>
          <InViewLines
            className="font-display mt-8 text-[clamp(2.3rem,4.4vw,4.25rem)] leading-[1] tracking-[-0.03em]"
            lines={["How I turn an idea", "into a working system."]}
          />
          <div className="mt-12 hidden items-end gap-4 md:flex">
            <div className="relative h-[1em] overflow-hidden font-display text-[7rem] leading-none tracking-[-0.04em]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={active}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-bronze"
                >
                  0{active + 1}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="font-mono-soft mb-4 text-xs tracking-[0.22em] text-muted-foreground">/ 04</span>
          </div>
          <div className="mt-6 hidden max-w-xs grid-cols-4 gap-2 md:grid">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={cn("h-px transition-colors duration-500", i <= active ? "bg-bronze" : "bg-border")}
              />
            ))}
          </div>
        </div>

        <ol className="md:col-span-7">
          {STEPS.map((s, i) => (
            <ProcessStep key={s.k} index={i} step={s} active={active === i} onActive={setActive} />
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ================================================================== */
/* PROJECTS — horizontal scroll on desktop, stacked on mobile          */
/* ================================================================== */
function ProjectCard({ project, index, total, className }: { project: ProjectItem; index: number; total: number; className?: string }) {
  return (
    <Link
      to="/labs/$projectId"
      params={{ projectId: project.id }}
      className={cn("group relative flex shrink-0 flex-col", className)}
    >
      <div className="relative aspect-[5/4] overflow-hidden rounded-[1.25rem] border border-border/70 bg-card">
        <div
          className="absolute inset-0 transition-[transform,filter] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:[filter:saturate(0.85)_brightness(0.9)]"
          style={{ background: project.gradient, filter: "saturate(0.5) brightness(0.72)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/10" />
        <div className="grain absolute inset-0" />

        <div className="font-mono-soft absolute inset-x-5 top-5 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/75">
          <span>{project.category}</span>
          <span className="flex items-center gap-2">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                project.status === "Live Production" ? "bg-emerald-400" : project.status === "Active Development" ? "bg-amber-300" : "bg-sky-300",
              )}
            />
            {project.status}
          </span>
        </div>

        <span className="font-display absolute bottom-3 left-5 text-[clamp(5rem,9vw,8.5rem)] leading-none tracking-[-0.05em] text-white/90">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-mono-soft absolute bottom-6 right-20 hidden text-[10px] uppercase tracking-[0.2em] text-white/60 sm:block">
          / {String(total).padStart(2, "0")}
        </span>

        <span className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-black transition-transform duration-500 group-hover:scale-110">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
        </span>
      </div>

      <h3 className="font-display mt-6 text-[1.9rem] leading-[1.05] tracking-tight transition-colors group-hover:text-bronze">
        {project.title}
      </h3>
      <p className="mt-2 line-clamp-2 max-w-md text-sm leading-relaxed text-muted-foreground">{project.tagline}</p>
      <p className="font-mono-soft mt-4 text-[11px] text-muted-foreground/80">
        <span className="text-bronze">TECH</span> — {project.techStack.slice(0, 5).join(" / ")}
      </p>
    </Link>
  );
}

function ProjectsHeader({ count }: { count: number }) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <SectionLabel index="04">Selected Projects</SectionLabel>
        <h2 className="font-display mt-6 text-[clamp(2.4rem,5vw,4.75rem)] leading-[1] tracking-[-0.03em]">
          Things I've built,
          <br />
          explored, and <span className="italic text-bronze">shipped.</span>
        </h2>
      </div>
      <div className="flex items-center gap-6 md:flex-col md:items-end md:gap-3">
        <span className="font-mono-soft text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {String(count).padStart(2, "0")} projects
        </span>
        <Link
          to="/labs"
          className="group inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-bronze"
        >
          Browse all
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

function AllProjectsCard({ className }: { className?: string }) {
  return (
    <Link
      to="/labs"
      className={cn(
        "group flex aspect-[5/4] shrink-0 flex-col justify-between rounded-[1.25rem] border border-dashed border-border p-8 transition-colors hover:border-bronze/60 hover:bg-card/50",
        className,
      )}
    >
      <span className="font-mono-soft text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Archive</span>
      <div>
        <p className="font-display text-5xl leading-[1] tracking-[-0.03em]">
          See every
          <br />
          <span className="italic text-bronze">project</span>
        </p>
        <span className="mt-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border transition-colors group-hover:border-bronze group-hover:bg-bronze group-hover:text-background">
          <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
        </span>
      </div>
    </Link>
  );
}

function HorizontalProjects({ projects }: { projects: ProjectItem[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const distance = useMotionValue(0);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const d = Math.max(0, track.scrollWidth - window.innerWidth);
      distance.set(d);
      setHeight(d + window.innerHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [projects.length, distance]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform([scrollYProgress, distance], ([p, d]: number[]) => -p * d);
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const gutter = "max(2.5rem, calc((100vw - 1400px) / 2 + 2.5rem))";

  return (
    <section
      ref={sectionRef}
      className="relative hidden border-t border-border/60 md:block"
      style={{ height: height ?? "300vh" }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className={cn(CONTAINER, "mb-10")}>
          <ProjectsHeader count={projects.length} />
        </div>
        <motion.div ref={trackRef} style={{ x, paddingLeft: gutter, paddingRight: gutter }} className="flex w-max items-start gap-8">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              total={projects.length}
              className="w-[min(40vw,500px)] min-w-[360px]"
            />
          ))}
          <AllProjectsCard className="w-[min(28vw,360px)] min-w-[280px]" />
        </motion.div>
        <div className="absolute inset-x-0 bottom-8" style={{ paddingLeft: gutter, paddingRight: gutter }}>
          <div className="h-px w-full bg-border">
            <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-bronze" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StackedProjects({ projects }: { projects: ProjectItem[] }) {
  return (
    <section className="relative border-t border-border/60 py-24 md:hidden">
      <div className={CONTAINER}>
        <ProjectsHeader count={projects.length} />
        <div className="mt-12 flex flex-col gap-14">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} total={projects.length} className="w-full" />
          ))}
          <AllProjectsCard className="w-full" />
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const { projects } = usePortfolioData();
  const ordered = [...projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  return (
    <>
      <HorizontalProjects projects={ordered} />
      <StackedProjects projects={ordered} />
    </>
  );
}

/* ================================================================== */
/* CTA                                                                */
/* ================================================================== */
function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(email).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        });
      }}
      className="group mt-2 inline-flex items-center gap-3 text-left text-lg text-foreground transition-colors hover:text-bronze"
    >
      {email}
      <span className="font-mono-soft inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}

function CTA() {
  const links = [
    { label: "GitHub", href: "https://github.com/tanushpai" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/tanushpai" },
    {
      label: "WhatsApp",
      href: "https://wa.me/919567805222?text=Hi%20Tanush,%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect!",
    },
  ];
  return (
    <section className="relative overflow-hidden border-t border-border/60 py-28 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-1/2 left-1/2 -z-10 h-[80vh] w-[120vw] -translate-x-1/2 rounded-[50%]"
        style={{ background: "radial-gradient(closest-side, oklch(0.72 0.11 65 / 0.16), transparent)" }}
      />
      <div className={CONTAINER}>
        <SectionLabel index="05">Let's Build</SectionLabel>
        <InViewLines
          as="p"
          className="font-display mt-12 text-[clamp(1.8rem,3.6vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-muted-foreground"
          lines={["Have an interesting problem?"]}
        />
        <Link
          to="/contact"
          aria-label="Let's talk — go to the contact page"
          className="group mt-2 flex flex-wrap items-center gap-x-10 gap-y-6"
        >
          <InViewLines
            as="h2"
            className="font-display text-[clamp(4rem,12.5vw,13rem)] leading-[0.88] tracking-[-0.045em]"
            lines={[
              <>
                Let's{" "}
                <span className="inline-block italic text-bronze transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4">
                  build
                </span>{" "}
                it.
              </>,
            ]}
          />
          <Magnetic strength={0.3}>
            <span className="flex h-24 w-24 items-center justify-center rounded-full bg-foreground text-background transition-colors duration-500 group-hover:bg-bronze md:h-36 md:w-36">
              <ArrowUpRight className="h-9 w-9 transition-transform duration-700 group-hover:rotate-45 md:h-12 md:w-12" />
            </span>
          </Magnetic>
        </Link>

        <div className="mt-20 grid gap-10 border-t border-border/60 pt-8 md:grid-cols-12">
          <p className="max-w-sm text-[15px] leading-relaxed text-muted-foreground md:col-span-5">
            I'm interested in AI, data, and software problems that are worth solving.
          </p>
          <div className="md:col-span-4">
            <p className="font-mono-soft text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Email</p>
            <CopyEmail email="tanushpai06@gmail.com" />
          </div>
          <div className="md:col-span-3">
            <p className="font-mono-soft text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Elsewhere</p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-bronze"
                  >
                    {l.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
