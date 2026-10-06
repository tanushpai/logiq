import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useNavigate } from "@tanstack/react-router";
import {
  Code2,
  FolderDown,
  Home,
  Mail,
  MessageCircle,
  Sparkles,
  User,
  Workflow,
  FileText,
} from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home, hint: "Landing & Overview" },
  { to: "/labs", label: "Projects & Architecture", icon: Workflow, hint: "Systems & Demos" },
  { to: "/about", label: "About & Certifications", icon: User, hint: "Tech Stack & Badges" },
  { to: "/resume", label: "Resume", icon: FileText, hint: "Experience & CV" },
  { to: "/contact", label: "Contact Tanush", icon: Mail, hint: "Reach Out" },
] as const;

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-background/70 px-4 pt-[18vh] backdrop-blur-md"
      onClick={() => setOpen(false)}
    >
      <Command
        onClick={(e) => e.stopPropagation()}
        className="glass shadow-cinema w-full max-w-xl overflow-hidden rounded-2xl border border-border/60"
        label="Navigate"
      >
        <div className="flex items-center gap-3 border-b border-border/50 px-5 py-4">
          <Sparkles className="h-4 w-4 text-bronze" />
          <Command.Input
            placeholder="Search portfolio… (try 'projects', 'notes', 'python', 'certifications')"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            autoFocus
          />
          <span className="font-mono-soft rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
            ESC
          </span>
        </div>
        <Command.List className="max-h-[60vh] overflow-y-auto p-2">
          <Command.Empty className="px-4 py-6 text-center text-sm text-muted-foreground">
            No matches found.
          </Command.Empty>
          <Command.Group heading="Navigation" className="px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">
            {items.map((it) => (
              <Command.Item
                key={it.to}
                value={`${it.label} ${it.hint}`}
                onSelect={() => {
                  setOpen(false);
                  navigate({ to: it.to });
                }}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm aria-selected:bg-secondary"
              >
                <div className="flex items-center gap-3">
                  <it.icon className="h-4 w-4 text-bronze" />
                  <span>{it.label}</span>
                </div>
                <span className="font-mono-soft text-[10px] uppercase text-muted-foreground">
                  {it.hint}
                </span>
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="Actions" className="px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">
            <Command.Item
              value="ask qai chat"
              onSelect={() => {
                setOpen(false);
                window.dispatchEvent(new CustomEvent("qai:open"));
              }}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm aria-selected:bg-secondary"
            >
              <MessageCircle className="h-4 w-4 text-bronze" />
              <span>Ask QAI Companion</span>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}