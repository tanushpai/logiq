import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Masked line reveal — each line slides up from behind a clip mask.  */
/* ------------------------------------------------------------------ */
export function RevealLines({
  lines,
  className,
  delay = 0,
  stagger = 0.09,
  as: Tag = "h1",
}: {
  lines: ReactNode[];
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "p";
}) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block will-change-transform"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* Same effect but triggered when scrolled into view. */
export function InViewLines({
  lines,
  className,
  stagger = 0.08,
  as: Tag = "h2",
}: {
  lines: ReactNode[];
  className?: string;
  stagger?: number;
  as?: "h2" | "h3" | "p";
}) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block will-change-transform"
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1, ease: EASE, delay: i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll-linked word fill — words brighten as the paragraph scrolls. */
/* ------------------------------------------------------------------ */
type Segment = { text: string; accent?: boolean };

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent?: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className={cn("inline-block mr-[0.24em]", accent && "italic text-bronze")}>
      {children}
    </motion.span>
  );
}

export function ScrollFillText({ segments, className }: { segments: Segment[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = segments.flatMap((s) => s.text.split(" ").filter(Boolean).map((w) => ({ w, accent: s.accent })));
  return (
    <p ref={ref} className={className}>
      {words.map((item, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          accent={item.accent}
        >
          {item.w}
        </Word>
      ))}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Velocity marquee — speeds up and flips direction with scroll.      */
/* ------------------------------------------------------------------ */
const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

export function VelocityMarquee({
  children,
  baseVelocity = 3,
  className,
}: {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    baseX.set(baseX.get() + move);
  });

  return (
    <div className={cn("flex overflow-hidden whitespace-nowrap", className)}>
      <motion.div className="flex shrink-0 flex-nowrap" style={{ x }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex shrink-0 items-center" aria-hidden={i > 0}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Magnetic — element drifts toward the cursor on hover.              */
/* ------------------------------------------------------------------ */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={cn("inline-block", className)}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Live clock in a given timezone (client-only to avoid hydration).   */
/* ------------------------------------------------------------------ */
export function LiveClock({ timeZone = "Asia/Kolkata" }: { timeZone?: string }) {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone,
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timeZone]);
  return <span className="tabular-nums">{now ?? "--:--:--"}</span>;
}

/* Small "(01) Label" section marker used across the page. */
export function SectionLabel({ index, children, className }: { index: string; children: ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono-soft flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground", className)}>
      <span className="text-bronze">({index})</span>
      <span className="h-px w-8 bg-border" />
      {children}
    </p>
  );
}
