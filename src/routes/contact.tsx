import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Github, Linkedin, Phone, ArrowRight, MessageCircle, Copy, Check, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { RevealLines, SectionLabel, Magnetic } from "@/components/landing/motion-kit";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Tanush Pai — AI/ML Engineer · LOG!Q" },
      { name: "description", content: "Let's build something practical together. Connect with Tanush Pai via Email, LinkedIn, GitHub, or WhatsApp." },
      { property: "og:title", content: "Contact Tanush Pai · LOG!Q" },
      { property: "og:description", content: "Reach out to Tanush Pai for AI engineering opportunities and collaborations." },
    ],
  }),
  component: Contact,
});

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        });
      }}
      className="font-mono-soft inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground hover:text-bronze transition-colors"
    >
      {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : label}
    </button>
  );
}

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [channel, setChannel] = useState<"whatsapp" | "email">("whatsapp");
  const [dispatched, setDispatched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (channel === "whatsapp") {
      const waText = `*New Inquiry via Portfolio*\n\n*Name:* ${name}\n*Email:* ${email}\n\n*Message:* ${message}`;
      const waUrl = `https://wa.me/919567805222?text=${encodeURIComponent(waText)}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");
    } else {
      const subject = `Portfolio Inquiry from ${name}`;
      const body = `Hi Tanush,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
      const mailtoUrl = `mailto:tanushpai06@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
    }

    setDispatched(true);
  };

  return (
    <div className="relative min-h-screen px-6 pt-36 pb-36 md:pt-44">
      {/* Background Aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 50% at 50% 12%, oklch(0.82 0.14 75 / 0.14), transparent 70%), radial-gradient(40% 30% at 85% 65%, oklch(0.66 0.11 60 / 0.08), transparent 60%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-16 md:grid-cols-12 md:items-start">
        {/* Left Info Column */}
        <div className="md:col-span-6">
          <SectionLabel index="01" className="mb-6">
            Direct Communication
          </SectionLabel>

          <RevealLines
            delay={0.15}
            className="font-display text-[clamp(2.8rem,6.5vw,5.75rem)] leading-[0.95] tracking-[-0.035em] text-foreground"
            lines={[
              "Have an",
              <>
                <span className="italic text-bronze">interesting</span> problem?
              </>,
              "Let's build it.",
            ]}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Whether it's an AI engineering challenge, an enterprise ML pipeline, or an innovative agentic system — I'm
            open for full-time opportunities and technical discussions.
          </motion.p>

          {/* Contact Direct Cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 space-y-4"
          >
            <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-card p-5 transition hover:border-bronze/50">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bronze/10 text-bronze">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono-soft text-[10px] uppercase tracking-wider text-muted-foreground">Email</p>
                  <a href="mailto:tanushpai06@gmail.com" className="text-sm font-medium text-foreground hover:text-bronze transition-colors">
                    tanushpai06@gmail.com
                  </a>
                </div>
              </div>
              <CopyButton text="tanushpai06@gmail.com" label="Copy" />
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-card p-5 transition hover:border-bronze/50">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bronze/10 text-bronze">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono-soft text-[10px] uppercase tracking-wider text-muted-foreground">Direct Line</p>
                  <a href="tel:+919567805222" className="text-sm font-medium text-foreground hover:text-bronze transition-colors">
                    +91 9567805222
                  </a>
                </div>
              </div>
              <CopyButton text="+919567805222" label="Copy" />
            </div>

            <div className="flex items-center gap-3.5 rounded-2xl border border-border/70 bg-card p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bronze/10 text-bronze">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="font-mono-soft text-[10px] uppercase tracking-wider text-muted-foreground">Location</p>
                <p className="text-sm font-medium text-foreground">Ernakulam, Kerala, India (IST / Remote)</p>
              </div>
            </div>
          </motion.div>

          {/* Social Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Magnetic strength={0.2}>
              <a
                href="https://github.com/tanushpai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-xs font-medium text-foreground transition hover:border-bronze hover:text-bronze"
              >
                <Github className="h-4 w-4" />
                GitHub ↗
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a
                href="https://www.linkedin.com/in/tanushpai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-xs font-medium text-foreground transition hover:border-bronze hover:text-bronze"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn ↗
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a
                href="https://wa.me/919567805222?text=Hi%20Tanush,%20I%20came%20across%20your%20LOG!Q%20portfolio%20and%20would%20like%20to%20connect!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 transition hover:border-emerald-500 hover:bg-emerald-500/20"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Chat ↗
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass shadow-cinema rounded-[2rem] border border-border/80 p-8 sm:p-10 md:col-span-6"
        >
          {dispatched ? (
            <div className="py-12 text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-500">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="font-display text-3xl text-foreground">Message Ready</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                {channel === "whatsapp"
                  ? "Opening WhatsApp chat with your details filled in."
                  : "Opening your email client with message prepared to send."}
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setDispatched(false)}
                  className="font-mono-soft text-xs text-bronze hover:underline uppercase tracking-wider"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <p className="font-mono-soft text-xs uppercase tracking-widest text-bronze">Direct Inquiry</p>
                <h3 className="font-display text-2xl sm:text-3xl text-foreground mt-1">Start a conversation</h3>
              </div>

              {/* Delivery Channel Selector */}
              <div>
                <span className="font-mono-soft text-[10px] uppercase text-muted-foreground tracking-wider block mb-2.5">
                  Send Via
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setChannel("whatsapp")}
                    className={cn(
                      "flex items-center justify-center gap-2.5 rounded-2xl border p-3.5 text-xs font-medium transition-all",
                      channel === "whatsapp"
                        ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-sm"
                        : "border-border/70 bg-card/60 text-muted-foreground hover:border-border hover:text-foreground",
                    )}
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </button>

                  <button
                    type="button"
                    onClick={() => setChannel("email")}
                    className={cn(
                      "flex items-center justify-center gap-2.5 rounded-2xl border p-3.5 text-xs font-medium transition-all",
                      channel === "email"
                        ? "border-bronze bg-bronze/10 text-bronze shadow-sm"
                        : "border-border/70 bg-card/60 text-muted-foreground hover:border-border hover:text-foreground",
                    )}
                  >
                    <Mail className="h-4 w-4" />
                    Email Client
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block">
                  <span className="font-mono-soft text-[10px] uppercase text-muted-foreground tracking-wider">Your Name</span>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ada Lovelace"
                    className="mt-2 w-full rounded-2xl border border-border bg-background/50 px-4 py-3.5 text-sm outline-none transition focus:border-bronze"
                  />
                </label>

                <label className="block">
                  <span className="font-mono-soft text-[10px] uppercase text-muted-foreground tracking-wider">Your Email Address</span>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ada@domain.com"
                    className="mt-2 w-full rounded-2xl border border-border bg-background/50 px-4 py-3.5 text-sm outline-none transition focus:border-bronze"
                  />
                </label>

                <label className="block">
                  <span className="font-mono-soft text-[10px] uppercase text-muted-foreground tracking-wider">Project / Opportunity Details</span>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your engineering problem, stack, or project scope…"
                    className="mt-2 w-full resize-none rounded-2xl border border-border bg-background/50 px-4 py-3.5 text-sm outline-none transition focus:border-bronze"
                  />
                </label>
              </div>

              <button
                type="submit"
                className={cn(
                  "group inline-flex w-full items-center justify-center gap-2 rounded-full py-4 text-xs font-semibold transition text-white shadow-md active:scale-[0.99]",
                  channel === "whatsapp"
                    ? "bg-[#25D366] hover:bg-[#20ba5a]"
                    : "bg-foreground text-background hover:bg-bronze hover:text-white",
                )}
              >
                <span>{channel === "whatsapp" ? "Send via WhatsApp" : "Send via Email"}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}