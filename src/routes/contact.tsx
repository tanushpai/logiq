import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Github, Linkedin, Twitter, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — LOG!Q" },
      { name: "description", content: "Let's build something intelligent together." },
      { property: "og:title", content: "Contact — LOG!Q" },
      { property: "og:description", content: "Reach out to Tanush." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="relative px-6 pt-40 pb-32">
      <div aria-hidden className="absolute inset-0 aura-glow opacity-40" />
      <div className="relative mx-auto grid max-w-6xl gap-16 md:grid-cols-2">
        <div>
          <p className="font-mono-soft text-xs uppercase text-bronze">Contact</p>
          <h1 className="font-display mt-4 text-5xl leading-[1.05] tracking-tight md:text-7xl">
            Let's build something <span className="italic text-bronze">intelligent</span> together.
          </h1>
          <p className="mt-6 max-w-md text-muted-foreground">
            Whether it's a collaboration, a research thread, or a wild idea — I'd love to hear from you.
          </p>

          <div className="mt-10 space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-bronze" />
              <a href="mailto:hello@logiq.ai" className="transition hover:text-bronze">hello@logiq.ai</a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-bronze" />
              <span>Earth · Building Everywhere</span>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            {[Github, Linkedin, Twitter].map((I, i) => (
              <a key={i} href="#" className="glass rounded-full border border-border p-3 transition hover:border-bronze hover:text-bronze">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onSubmit={(e) => e.preventDefault()}
          className="glass shadow-cinema space-y-5 rounded-3xl border border-border p-8"
        >
          {[
            { l: "Your name", t: "text", p: "Ada Lovelace" },
            { l: "Email", t: "email", p: "you@domain.com" },
          ].map((f) => (
            <label key={f.l} className="block">
              <span className="font-mono-soft text-[10px] uppercase text-muted-foreground">{f.l}</span>
              <input
                type={f.t}
                placeholder={f.p}
                className="mt-2 w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition focus:border-bronze"
              />
            </label>
          ))}
          <label className="block">
            <span className="font-mono-soft text-[10px] uppercase text-muted-foreground">Message</span>
            <textarea
              rows={5}
              placeholder="Tell me what you're imagining…"
              className="mt-2 w-full resize-none rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition focus:border-bronze"
            />
          </label>
          <button
            type="submit"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
          >
            Send message
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </motion.form>
      </div>
    </div>
  );
}