import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Search,
  BookOpen,
  Sparkles,
  Tag,
  CheckCircle2,
  FolderDown,
  Code2,
  Database,
  Brain,
  Cpu,
  Terminal,
  Settings,
} from "lucide-react";
import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { NoteItem } from "@/lib/portfolio-store";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Study Notes & Cheatsheets — Tanush · LOG!Q" },
      {
        name: "description",
        content:
          "Curated collection of downloadable engineering and AI study notes, Python handbooks, SQL cheatsheets, and system design roadmaps.",
      },
      { property: "og:title", content: "Study Notes & Cheatsheets — Tanush · LOG!Q" },
      {
        property: "og:description",
        content: "Downloadable engineering, SQL, Python, and AI study notes.",
      },
    ],
  }),
  component: NotesPage,
});

type NoteCategory = "All" | "Python" | "SQL" | "System Design" | "AI & ML" | "DSA";

const noteCategories: { label: NoteCategory; icon: React.ComponentType<{ className?: string }> }[] = [
  { label: "All", icon: Sparkles },
  { label: "Python", icon: Code2 },
  { label: "SQL", icon: Database },
  { label: "System Design", icon: Cpu },
  { label: "AI & ML", icon: Brain },
  { label: "DSA", icon: Terminal },
];

function getCategoryIcon(cat: string) {
  switch (cat) {
    case "Python":
      return Code2;
    case "SQL":
      return Database;
    case "System Design":
      return Cpu;
    case "AI & ML":
      return Brain;
    case "DSA":
      return Terminal;
    default:
      return BookOpen;
  }
}

function NotesPage() {
  const { notes } = usePortfolioData();
  const [selectedCategory, setSelectedCategory] = useState<NoteCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [downloadedIds, setDownloadedIds] = useState<Record<string, boolean>>({});

  const filteredNotes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return notes.filter((item) => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.highlights.some((h) => h.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [notes, selectedCategory, searchQuery]);

  const handleDownload = (note: NoteItem) => {
    const link = document.createElement("a");
    link.href = note.pdfUrl;
    link.download = `${note.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadedIds((prev) => ({ ...prev, [note.id]: true }));
    setTimeout(() => {
      setDownloadedIds((prev) => ({ ...prev, [note.id]: false }));
    }, 4000);
  };

  return (
    <div className="relative min-h-screen">
      {/* Header Aura Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 10%, oklch(0.82 0.14 75 / 0.12), transparent 70%), radial-gradient(40% 30% at 90% 40%, oklch(0.66 0.11 60 / 0.08), transparent 60%)",
        }}
      />

      {/* Hero Section */}
      <section className="relative px-6 pt-36 pb-12 md:pt-44 md:pb-16">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-bronze/40 bg-bronze/10 px-3.5 py-1 text-xs font-medium text-bronze">
              <FolderDown className="h-3.5 w-3.5" />
              Open Knowledge Base
            </span>
            <span className="font-mono-soft text-xs uppercase tracking-wider text-muted-foreground">
              ✦ {notes.length} PDF Handbooks & Cheatsheets
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display mt-6 text-5xl leading-[1.05] tracking-tight md:text-7xl"
          >
            Study notes, <span className="italic text-bronze">distilled</span> for engineering.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            The exact personal study guides, deep-dive architectural notes, and cheatsheets I rely on
            when designing systems, writing algorithms, and mastering new technologies. Free to download
            and review.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 max-w-xl"
          >
            <div className="glass shadow-cinema flex items-center gap-3 rounded-2xl border border-border/70 px-4 py-3.5 transition focus-within:border-bronze/60">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes (e.g. 'Python', 'SQL indexing', 'Transformers')..."
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="font-mono-soft text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="relative px-6 pb-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap gap-2">
            {noteCategories.map((c) => {
              const Icon = c.icon;
              const isActive = selectedCategory === c.label;
              return (
                <button
                  key={c.label}
                  onClick={() => setSelectedCategory(c.label)}
                  className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all ${
                    isActive
                      ? "border-foreground bg-foreground text-background shadow-sm"
                      : "border-border/70 bg-card text-muted-foreground hover:border-bronze/50 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Notes Grid */}
      <section className="relative px-6 pb-32">
        <div className="mx-auto max-w-5xl">
          {filteredNotes.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border/80 bg-card/40 p-12 text-center">
              <BookOpen className="mx-auto h-8 w-8 text-muted-foreground/60" />
              <p className="mt-3 font-display text-xl text-foreground">No notes found matching your criteria</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try searching for general keywords or choose another category above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filteredNotes.map((note, index) => {
                  const Icon = getCategoryIcon(note.category);
                  const isDownloaded = downloadedIds[note.id];

                  return (
                    <motion.div
                      key={note.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="group flex flex-col justify-between rounded-3xl border border-border/70 bg-card p-6 md:p-8 transition-all duration-300 hover:border-bronze/50 hover:shadow-cinema"
                    >
                      <div>
                        {/* Card Top Metadata */}
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-mono-soft inline-flex items-center gap-1.5 rounded-md border border-bronze/30 bg-bronze/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-bronze">
                            <Tag className="h-3 w-3" />
                            {note.tag}
                          </span>
                          <span className="font-mono-soft text-xs text-muted-foreground">
                            {note.updatedDate}
                          </span>
                        </div>

                        {/* Title & Icon */}
                        <div className="mt-6 flex items-start gap-3">
                          <div className="rounded-2xl border border-border/80 bg-secondary/80 p-3 text-bronze shadow-sm">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-display text-2xl leading-snug tracking-tight text-foreground transition-colors group-hover:text-bronze">
                              {note.title}
                            </h3>
                            <div className="font-mono-soft mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                              <span>{note.pages} pages</span>
                              <span>•</span>
                              <span>{note.fileSize}</span>
                              <span>•</span>
                              <span>PDF</span>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                          {note.description}
                        </p>

                        {/* Highlights pills */}
                        <div className="mt-5 flex flex-wrap gap-1.5">
                          {note.highlights.map((item) => (
                            <span
                              key={item}
                              className="rounded-lg border border-border/60 bg-secondary/40 px-2.5 py-1 text-[11px] text-muted-foreground"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer / Download CTA */}
                      <div className="mt-8 border-t border-border/60 pt-5 flex items-center justify-between gap-4">
                        <span className="font-mono-soft text-xs text-muted-foreground flex items-center gap-1">
                          <BookOpen className="h-3.5 w-3.5 text-bronze/80" />
                          Ready for download
                        </span>

                        <button
                          onClick={() => handleDownload(note)}
                          className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium transition-all ${
                            isDownloaded
                              ? "bg-emerald-600 text-white"
                              : "bg-foreground text-background hover:opacity-90 active:scale-95"
                          }`}
                        >
                          {isDownloaded ? (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                              Downloaded
                            </>
                          ) : (
                            <>
                              <Download className="h-3.5 w-3.5" />
                              Download PDF
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
