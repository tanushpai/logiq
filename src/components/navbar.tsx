import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Moon, Sun, ArrowDownToLine } from "lucide-react";
import { LogiqLogo } from "./logo";
import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/labs", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav className="glass shadow-cinema flex w-full max-w-6xl items-center justify-between rounded-full border border-border/60 px-4 py-2.5 md:px-6">
        <Link to="/" className="shrink-0">
          <LogiqLogo />
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "relative rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
                pathname === l.to && "text-foreground font-medium",
              )}
            >
              {pathname === l.to && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-secondary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{l.label}</span>
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-full p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link
            to="/resume"
            className="hidden rounded-full border border-border/80 bg-card px-3.5 py-1.5 text-xs font-medium text-foreground transition hover:border-bronze/50 md:inline-flex items-center gap-1.5"
          >
            <ArrowDownToLine className="h-3 w-3 text-bronze" />
            Resume
          </Link>
          <Link
            to="/contact"
            className="hidden rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition hover:opacity-90 md:inline-block"
          >
            Let's Talk
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}