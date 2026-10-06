import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Github, Linkedin, Phone, ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — LOG!Q" },
      { name: "description", content: "Let's build something intelligent together. Connect with Tanush via Email, LinkedIn, GitHub, or WhatsApp." },
      { property: "og:title", content: "Contact — Tanush · LOG!Q" },
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
            Whether it's a collaboration, AI systems engineering, an enterprise opportunity, or a research thread — I'd love to hear from you.
          </p>

          <div className="mt-10 space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-bronze" />
              <a href="mailto:tanushpai06@gmail.com" className="transition hover:text-bronze">
                tanushpai06@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-bronze" />
              <a href="tel:+919567805222" className="transition hover:text-bronze">
                +91 9567805222
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-bronze" />
              <span>Ernakulam, Kerala, India</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/tanushpai"
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-xs font-medium transition hover:border-bronze hover:text-bronze"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/tanushpai"
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-xs font-medium transition hover:border-bronze hover:text-bronze"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href="https://wa.me/919567805222?text=Hi%20Tanush,%20I%20came%20across%20your%20LOG!Q%20portfolio%20and%20would%20like%20to%20connect!"
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 transition hover:border-emerald-500/50 hover:bg-emerald-500/10"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
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