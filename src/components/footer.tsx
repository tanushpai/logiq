import { Link } from "@tanstack/react-router";
import { LogiqLogo } from "./logo";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="space-y-4">
          <LogiqLogo />
          <p className="font-display max-w-md text-2xl leading-tight text-foreground/90 md:text-3xl">
            Built with intelligence.<br />Designed with intent.
          </p>
          <p className="text-xs text-muted-foreground font-mono-soft">
            Autonomous Agents · Systems Engineering · Distilled Notes
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm text-muted-foreground">
          <div className="flex flex-col gap-2.5">
            <span className="font-mono-soft text-xs uppercase tracking-wider text-foreground">Navigation</span>
            <Link to="/" className="transition hover:text-foreground">Home</Link>
            <Link to="/labs" className="transition hover:text-foreground">Projects</Link>
            <Link to="/about" className="transition hover:text-foreground">About & Credentials</Link>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="font-mono-soft text-xs uppercase tracking-wider text-foreground">Connect</span>
            <Link to="/resume" className="transition hover:text-foreground">Resume</Link>
            <Link to="/contact" className="transition hover:text-foreground">Contact</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span>© {new Date().getFullYear()} Tanush · LOG!Q</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Available for Opportunities
        </span>
      </div>
    </footer>
  );
}