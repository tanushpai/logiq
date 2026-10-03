import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume — Tanush · LOG!Q" },
      { name: "description", content: "Interactive resume: stack, experience, achievements, and certifications." },
      { property: "og:title", content: "Resume — Tanush" },
      { property: "og:description", content: "An interactive, futuristic resume." },
    ],
  }),
  component: Resume,
});

const stack = [
  { name: "Python", note: "ML pipelines, agents" },
  { name: "TypeScript", note: "Product systems" },
  { name: "React / Next", note: "Generative UI" },
  { name: "PyTorch", note: "Models & training" },
  { name: "LangGraph", note: "Multi-agent flows" },
  { name: "Postgres", note: "Vector + relational" },
  { name: "Rust", note: "Systems performance" },
  { name: "Triton / CUDA", note: "Custom kernels" },
];

const experience = [
  { role: "Founder · AI Engineer", org: "LOG!Q", time: "2025 — Now", desc: "Building intelligent systems and products for the post-LLM era." },
  { role: "AI Research Engineer", org: "Independent", time: "2023 — 2025", desc: "Agentic systems, retrieval cognition, and applied research." },
  { role: "ML Engineer", org: "Research Lab", time: "2021 — 2023", desc: "Generative models, clinical and academic AI." },
];

function Resume() {
  return (
    <div className="relative px-6 pt-40 pb-32">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono-soft text-xs uppercase text-bronze">Interactive resume</p>
            <h1 className="font-display mt-4 text-5xl tracking-tight md:text-7xl">
              The <span className="italic text-bronze">stack</span> behind the work.
            </h1>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90"
          >
            <Download className="h-4 w-4" /> Download PDF
          </a>
        </div>

        <div className="mt-16">
          <Tabs defaultValue="stack">
            <TabsList className="rounded-full">
              <TabsTrigger value="stack" className="rounded-full">Stack</TabsTrigger>
              <TabsTrigger value="experience" className="rounded-full">Experience</TabsTrigger>
              <TabsTrigger value="achievements" className="rounded-full">Achievements</TabsTrigger>
              <TabsTrigger value="education" className="rounded-full">Education</TabsTrigger>
            </TabsList>

            <TabsContent value="stack" className="mt-10">
              <div className="flex flex-wrap gap-3">
                {stack.map((s) => (
                  <HoverCard key={s.name}>
                    <HoverCardTrigger asChild>
                      <motion.span
                        whileHover={{ y: -2 }}
                        className="cursor-default rounded-full border border-border bg-card px-5 py-2.5 text-sm shadow-cinema"
                      >
                        {s.name}
                      </motion.span>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-56">
                      <p className="font-mono-soft text-[10px] uppercase text-bronze">{s.name}</p>
                      <p className="mt-2 text-sm">{s.note}</p>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="experience" className="mt-10">
              <div className="space-y-4">
                {experience.map((e) => (
                  <div key={e.role} className="rounded-2xl border border-border bg-card p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-2xl">{e.role}</h3>
                      <span className="font-mono-soft text-xs text-bronze">{e.time}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{e.org}</p>
                    <p className="mt-3 text-sm">{e.desc}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="mt-10">
              <ul className="space-y-3 text-sm">
                {["Built production AI for clinical research", "Shipped multi-agent reasoning prototypes", "Founded LOG!Q innovation lab"].map((a) => (
                  <li key={a} className="rounded-2xl border border-border bg-card px-5 py-4">{a}</li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="education" className="mt-10">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-display text-2xl">Computer Science · AI Specialization</h3>
                <p className="mt-2 text-sm text-muted-foreground">Focus on machine learning, systems, and human-AI interaction.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}