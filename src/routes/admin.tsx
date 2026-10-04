import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Unlock,
  KeyRound,
  Shield,
  Workflow,
  FolderDown,
  Award,
  Layers,
  Plus,
  Trash2,
  Edit3,
  Save,
  RotateCcw,
  CheckCircle2,
  Download,
  Upload,
  ArrowLeft,
  ExternalLink,
  Cpu,
  Sparkles,
  Eye,
  FileText,
} from "lucide-react";
import {
  getPortfolioData,
  savePortfolioData,
  resetPortfolioData,
  PortfolioData,
  ProjectItem,
  NoteItem,
  CertificationItem,
  TechItem,
} from "@/lib/portfolio-store";
import { usePortfolioData } from "@/hooks/use-portfolio-data";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Portfolio Admin Console — LOG!Q" },
      { name: "description", content: "Manage projects, study notes, certifications, and technical stack dynamically." },
    ],
  }),
  component: AdminPage,
});

// Master PIN for local admin access (Default: 2026 or 1234 or admin)
const ACCEPTED_PINS = ["2026", "admin", "1234"];
const AUTH_STORAGE_KEY = "logiq_admin_auth_token";

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === "true";
  });
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

  const data = usePortfolioData();
  const [activeTab, setActiveTab] = useState<"projects" | "notes" | "certs" | "tech" | "resume">("projects");
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Modal edit states
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [editingNote, setEditingNote] = useState<NoteItem | null>(null);
  const [editingCert, setEditingCert] = useState<CertificationItem | null>(null);
  const [editingTech, setEditingTech] = useState<TechItem | null>(null);

  const showNotification = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (ACCEPTED_PINS.includes(pinInput.trim())) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
      setIsAuthenticated(true);
      setPinError("");
      showNotification("Unlocked Admin Portal successfully");
    } else {
      setPinError("Invalid Passcode. Enter 2026 or 1234.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
  };

  const handleResetData = () => {
    if (window.confirm("Are you sure you want to reset all portfolio data back to defaults?")) {
      resetPortfolioData();
      showNotification("Reset to initial portfolio state.");
    }
  };

  const handleExportBackup = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification("Downloaded portfolio JSON backup.");
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.projects && parsed.notes) {
          savePortfolioData(parsed);
          showNotification("Imported data successfully!");
        } else {
          alert("Invalid backup JSON format.");
        }
      } catch (err) {
        alert("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
  };

  // --- Project Handlers ---
  const saveProject = (proj: ProjectItem) => {
    const existingIndex = data.projects.findIndex((p) => p.id === proj.id);
    let updatedProjects: ProjectItem[];
    if (existingIndex >= 0) {
      updatedProjects = [...data.projects];
      updatedProjects[existingIndex] = proj;
    } else {
      updatedProjects = [proj, ...data.projects];
    }
    savePortfolioData({ ...data, projects: updatedProjects });
    setEditingProject(null);
    showNotification(`Saved project "${proj.title}"`);
  };

  const deleteProject = (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const updated = data.projects.filter((p) => p.id !== id);
      savePortfolioData({ ...data, projects: updated });
      showNotification("Project removed.");
    }
  };

  // --- Note Handlers ---
  const saveNote = (note: NoteItem) => {
    const existingIndex = data.notes.findIndex((n) => n.id === note.id);
    let updatedNotes: NoteItem[];
    if (existingIndex >= 0) {
      updatedNotes = [...data.notes];
      updatedNotes[existingIndex] = note;
    } else {
      updatedNotes = [note, ...data.notes];
    }
    savePortfolioData({ ...data, notes: updatedNotes });
    setEditingNote(null);
    showNotification(`Saved note "${note.title}"`);
  };

  const deleteNote = (id: string) => {
    if (window.confirm("Delete this study note?")) {
      const updated = data.notes.filter((n) => n.id !== id);
      savePortfolioData({ ...data, notes: updated });
      showNotification("Note removed.");
    }
  };

  // --- Certification Handlers ---
  const saveCert = (cert: CertificationItem) => {
    const existingIndex = data.certifications.findIndex((c) => c.id === cert.id);
    let updatedCerts: CertificationItem[];
    if (existingIndex >= 0) {
      updatedCerts = [...data.certifications];
      updatedCerts[existingIndex] = cert;
    } else {
      updatedCerts = [cert, ...data.certifications];
    }
    savePortfolioData({ ...data, certifications: updatedCerts });
    setEditingCert(null);
    showNotification(`Saved certification "${cert.title}"`);
  };

  const deleteCert = (id: string) => {
    if (window.confirm("Delete this certification?")) {
      const updated = data.certifications.filter((c) => c.id !== id);
      savePortfolioData({ ...data, certifications: updated });
      showNotification("Certification removed.");
    }
  };

  // --- Tech Stack Handlers ---
  const saveTech = (tech: TechItem) => {
    const existingIndex = data.techStack.findIndex((t) => t.name.toLowerCase() === tech.name.toLowerCase());
    let updatedTech: TechItem[];
    if (existingIndex >= 0) {
      updatedTech = [...data.techStack];
      updatedTech[existingIndex] = tech;
    } else {
      updatedTech = [...data.techStack, tech];
    }
    savePortfolioData({ ...data, techStack: updatedTech });
    setEditingTech(null);
    showNotification(`Saved tool "${tech.name}"`);
  };

  const deleteTech = (name: string) => {
    const updated = data.techStack.filter((t) => t.name !== name);
    savePortfolioData({ ...data, techStack: updated });
    showNotification(`Removed tool ${name}`);
  };

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen flex items-center justify-center px-4 py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(50% 40% at 50% 50%, oklch(0.82 0.14 75 / 0.15), transparent 70%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="glass shadow-cinema w-full max-w-md rounded-3xl border border-border/80 bg-card/90 p-8 text-center"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-bronze/30 bg-bronze/10 text-bronze">
            <Shield className="h-7 w-7" />
          </div>

          <h2 className="font-display mt-5 text-3xl tracking-tight text-foreground">
            Portfolio Admin Console
          </h2>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            Enter your master passcode to manage projects, study notes, certifications, and technical stack.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <div className="flex items-center gap-2 rounded-2xl border border-border bg-secondary/60 px-4 py-3 focus-within:border-bronze">
                <KeyRound className="h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter passcode (default: 2026)"
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                  autoFocus
                />
              </div>
              {pinError && <p className="font-mono-soft mt-1.5 text-xs text-rose-500">{pinError}</p>}
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-foreground py-3 text-xs font-medium text-background transition hover:opacity-90 active:scale-95"
            >
              Authenticate & Access
            </button>

            <div className="pt-2">
              <Link to="/" className="font-mono-soft text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                <ArrowLeft className="h-3 w-3" /> Back to Public Site
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="relative min-h-screen px-4 py-28 md:px-8">
      {/* Top Notification Toast */}
      <AnimatePresence>
        {feedbackMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-5 py-3 text-xs font-medium text-emerald-600 dark:text-emerald-400 backdrop-blur-md shadow-lg flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            {feedbackMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-6xl">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono-soft inline-flex items-center gap-1 rounded-full border border-bronze/40 bg-bronze/10 px-2.5 py-0.5 text-[11px] font-medium text-bronze">
                <Unlock className="h-3 w-3" /> Admin Mode
              </span>
              <span className="font-mono-soft text-xs text-muted-foreground">
                All changes sync live to the visitor frontend
              </span>
            </div>
            <h1 className="font-display mt-2 text-3xl md:text-4xl tracking-tight text-foreground">
              LOG!Q Control Deck
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportBackup}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-foreground hover:border-bronze/50 transition"
              title="Download JSON backup"
            >
              <Download className="h-3.5 w-3.5" />
              Backup JSON
            </button>

            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-foreground hover:border-bronze/50 transition">
              <Upload className="h-3.5 w-3.5" />
              Import
              <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
            </label>

            <button
              onClick={handleResetData}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-medium text-rose-500 hover:border-rose-400 transition"
              title="Reset data back to factory defaults"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Defaults
            </button>

            <button
              onClick={handleLogout}
              className="rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition hover:opacity-90"
            >
              Exit Admin
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-border/40 pb-4">
          {[
            { id: "projects", label: `Projects (${data.projects.length})`, icon: Workflow },
            { id: "resume", label: "Resume & RAG Knowledge", icon: FileText },
            { id: "notes", label: `Study Notes (${data.notes.length})`, icon: FolderDown },
            { id: "certs", label: `Certifications (${data.certifications.length})`, icon: Award },
            { id: "tech", label: `Tech Stack (${data.techStack.length})`, icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-medium transition-all ${
                  active
                    ? "border-foreground bg-foreground text-background shadow-sm"
                    : "border-border/70 bg-card text-muted-foreground hover:border-bronze/50 hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PROJECTS */}
        {activeTab === "projects" && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-2xl tracking-tight text-foreground">Projects Showcase</h3>
                <p className="text-xs text-muted-foreground">
                  Manage engineering case studies, architectures, tech tags, and source links.
                </p>
              </div>
              <button
                onClick={() =>
                  setEditingProject({
                    id: `proj-${Date.now()}`,
                    title: "New Project",
                    tagline: "High-impact tagline for this system",
                    category: "Agentic AI",
                    tag: "Autonomous Agent · LLM",
                    status: "Active Development",
                    gradient: "linear-gradient(135deg, oklch(0.78 0.13 70 / 0.9), oklch(0.62 0.09 55 / 0.85))",
                    iconName: "Sparkles",
                    overview: "Provide an in-depth breakdown of what this project solves.",
                    systemArchitecture: {
                      title: "System Pipeline",
                      flowSteps: [
                        "Ingestion: Receives incoming data from clients.",
                        "Processing: Extracts entities and embeddings.",
                        "Execution: Generates output synthesis.",
                      ],
                      diagramLabel: "Input Feed ➔ Pipeline ➔ Synthesizer",
                    },
                    keyFeatures: ["Feature 1", "Feature 2"],
                    techStack: ["Python", "React", "PostgreSQL"],
                  })
                }
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background hover:opacity-90"
              >
                <Plus className="h-3.5 w-3.5" />
                Add New Project
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {data.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 transition hover:border-bronze/50"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-mono-soft text-[10px] uppercase tracking-wider text-bronze">
                        {proj.tag}
                      </span>
                      <span className="font-mono-soft rounded bg-secondary px-2 py-0.5 text-[10px]">
                        {proj.status}
                      </span>
                    </div>
                    <h4 className="font-display mt-2 text-xl tracking-tight text-foreground">{proj.title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{proj.tagline}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {proj.techStack.map((t) => (
                        <span key={t} className="rounded bg-secondary/70 px-2 py-0.5 text-[10px] text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                    <span className="font-mono-soft text-[11px] text-muted-foreground">
                      {proj.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingProject(proj)}
                        className="rounded-lg border border-border p-1.5 text-muted-foreground hover:text-foreground hover:border-bronze"
                        title="Edit project"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => deleteProject(proj.id)}
                        className="rounded-lg border border-border p-1.5 text-muted-foreground hover:text-rose-500"
                        title="Delete project"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: STUDY NOTES */}
        {activeTab === "notes" && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-2xl tracking-tight text-foreground">Study Notes & PDFs</h3>
                <p className="text-xs text-muted-foreground">
                  Manage downloadable guides, page counts, topic tags, and PDF links.
                </p>
              </div>
              <button
                onClick={() =>
                  setEditingNote({
                    id: `note-${Date.now()}`,
                    title: "New Study Guide",
                    category: "Python",
                    description: "Key concepts and architectural takeaways.",
                    highlights: ["Core Principles", "Optimization"],
                    fileSize: "2.5 MB",
                    pages: 30,
                    pdfUrl: "/notes/python_handbook.pdf",
                    tag: "Handbook · Guide",
                    updatedDate: "Updated Q3 2026",
                    downloadCount: 0,
                  })
                }
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background hover:opacity-90"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Study Note
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {data.notes.map((note) => (
                <div
                  key={note.id}
                  className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 transition hover:border-bronze/50"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono-soft text-[10px] uppercase text-bronze">{note.tag}</span>
                      <span className="font-mono-soft text-xs text-muted-foreground">{note.fileSize} · {note.pages} pages</span>
                    </div>
                    <h4 className="font-display mt-2 text-xl tracking-tight text-foreground">{note.title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{note.description}</p>
                    <p className="font-mono-soft mt-3 text-[11px] text-muted-foreground">
                      Target PDF: <code className="text-bronze">{note.pdfUrl}</code>
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                    <span className="font-mono-soft text-xs text-bronze">{note.category}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingNote(note)}
                        className="rounded-lg border border-border p-1.5 text-muted-foreground hover:text-foreground"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="rounded-lg border border-border p-1.5 text-muted-foreground hover:text-rose-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CERTIFICATIONS */}
        {activeTab === "certs" && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-2xl tracking-tight text-foreground">Certifications & Credentials</h3>
                <p className="text-xs text-muted-foreground">
                  Update verified licenses, IDs, issuer portals, and competency tags.
                </p>
              </div>
              <button
                onClick={() =>
                  setEditingCert({
                    id: `cert-${Date.now()}`,
                    title: "New Certification Title",
                    issuer: "Issuing Organization",
                    date: "2026",
                    credentialId: "ID-12345",
                    skills: ["Architecture", "System Engineering"],
                    verifyUrl: "https://example.com/verify",
                    badgeTone: "from-blue-500/20 via-indigo-500/10 to-transparent",
                    summary: "Demonstrated competencies in system design and architecture.",
                  })
                }
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background hover:opacity-90"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Certification
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {data.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 transition hover:border-bronze/50"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono-soft text-xs text-bronze">{cert.date}</span>
                      <span className="font-mono-soft text-[10px] text-muted-foreground">{cert.credentialId}</span>
                    </div>
                    <h4 className="font-display mt-2 text-xl tracking-tight text-foreground">{cert.title}</h4>
                    <p className="font-mono-soft text-xs text-muted-foreground">{cert.issuer}</p>
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{cert.summary}</p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono-soft text-xs text-bronze hover:underline inline-flex items-center gap-1"
                    >
                      Verify Link <ExternalLink className="h-3 w-3" />
                    </a>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingCert(cert)}
                        className="rounded-lg border border-border p-1.5 text-muted-foreground hover:text-foreground"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => deleteCert(cert.id)}
                        className="rounded-lg border border-border p-1.5 text-muted-foreground hover:text-rose-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TECH STACK */}
        {activeTab === "tech" && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-2xl tracking-tight text-foreground">Tech Stack Logos</h3>
                <p className="text-xs text-muted-foreground">
                  Add tools, vector SVG logos, and categorized skill badges.
                </p>
              </div>
              <button
                onClick={() =>
                  setEditingTech({
                    name: "New Tool",
                    category: "Languages",
                    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
                    tag: "Primary Tool",
                  })
                }
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background hover:opacity-90"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Technology
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {data.techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="flex flex-col items-center justify-between rounded-xl border border-border bg-card p-4 text-center"
                >
                  <img src={tech.iconUrl} alt={tech.name} className="h-8 w-8 object-contain" />
                  <div className="mt-2">
                    <p className="font-display text-sm text-foreground">{tech.name}</p>
                    <span className="font-mono-soft text-[10px] text-muted-foreground">{tech.category}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => setEditingTech(tech)}
                      className="rounded border border-border p-1 text-muted-foreground hover:text-foreground"
                    >
                      <Edit3 className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => deleteTech(tech.name)}
                      className="rounded border border-border p-1 text-muted-foreground hover:text-rose-500"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: RESUME & RAG KNOWLEDGE */}
        {activeTab === "resume" && (
          <div className="mt-8 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-2xl tracking-tight text-foreground">
                  Resume & QAI Ground Truth
                </h3>
                <p className="text-xs text-muted-foreground">
                  Edit your experience, education, bio, and technical skills. Updates sync instantly to QAI's RAG retriever.
                </p>
              </div>
              <button
                onClick={() => {
                  savePortfolioData({ ...data });
                  showNotification("All resume knowledge saved and synced to QAI!");
                }}
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-xs font-medium text-background hover:opacity-90"
              >
                <Save className="h-3.5 w-3.5" />
                Save Resume Knowledge
              </button>
            </div>

            {/* Profile Overview */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <h4 className="font-display text-lg text-foreground flex items-center gap-2">
                <Shield className="h-4 w-4 text-bronze" /> Personal & Contact Info
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Full Name</label>
                  <input
                    type="text"
                    value={data.resume?.name || ""}
                    onChange={(e) => {
                      const updated = { ...data.resume, name: e.target.value };
                      savePortfolioData({ ...data, resume: updated });
                    }}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-bronze"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Title / Headline</label>
                  <input
                    type="text"
                    value={data.resume?.title || ""}
                    onChange={(e) => {
                      const updated = { ...data.resume, title: e.target.value };
                      savePortfolioData({ ...data, resume: updated });
                    }}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-bronze"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Email</label>
                  <input
                    type="text"
                    value={data.resume?.email || ""}
                    onChange={(e) => {
                      const updated = { ...data.resume, email: e.target.value };
                      savePortfolioData({ ...data, resume: updated });
                    }}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-bronze"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Location</label>
                  <input
                    type="text"
                    value={data.resume?.location || ""}
                    onChange={(e) => {
                      const updated = { ...data.resume, location: e.target.value };
                      savePortfolioData({ ...data, resume: updated });
                    }}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-bronze"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">LinkedIn URL</label>
                  <input
                    type="text"
                    value={data.resume?.linkedin || ""}
                    onChange={(e) => {
                      const updated = { ...data.resume, linkedin: e.target.value };
                      savePortfolioData({ ...data, resume: updated });
                    }}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-bronze"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">GitHub URL</label>
                  <input
                    type="text"
                    value={data.resume?.github || ""}
                    onChange={(e) => {
                      const updated = { ...data.resume, github: e.target.value };
                      savePortfolioData({ ...data, resume: updated });
                    }}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-bronze"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Professional Summary / Bio</label>
                <textarea
                  rows={3}
                  value={data.resume?.summary || ""}
                  onChange={(e) => {
                    const updated = { ...data.resume, summary: e.target.value };
                    savePortfolioData({ ...data, resume: updated });
                  }}
                  className="mt-1 w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground outline-none focus:border-bronze"
                />
              </div>
            </div>

            {/* Work Experience */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-display text-lg text-foreground flex items-center gap-2">
                  <Workflow className="h-4 w-4 text-bronze" /> Professional Experience
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    const newExp = {
                      role: "New Role",
                      company: "Company Name",
                      location: "Location",
                      period: "2026 – Present",
                      points: ["Key engineering achievement..."],
                    };
                    const updated = {
                      ...data.resume,
                      experience: [newExp, ...(data.resume?.experience || [])],
                    };
                    savePortfolioData({ ...data, resume: updated });
                    showNotification("Added new work experience role");
                  }}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-foreground hover:border-bronze/50"
                >
                  <Plus className="h-3 w-3" /> Add Position
                </button>
              </div>

              <div className="space-y-4">
                {(data.resume?.experience || []).map((exp, idx) => (
                  <div key={idx} className="rounded-xl border border-border/70 bg-background/60 p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => {
                            const copy = [...data.resume.experience];
                            copy[idx] = { ...copy[idx], role: e.target.value };
                            savePortfolioData({ ...data, resume: { ...data.resume, experience: copy } });
                          }}
                          placeholder="Role"
                          className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-semibold text-foreground"
                        />
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const copy = [...data.resume.experience];
                            copy[idx] = { ...copy[idx], company: e.target.value };
                            savePortfolioData({ ...data, resume: { ...data.resume, experience: copy } });
                          }}
                          placeholder="Company"
                          className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs text-foreground"
                        />
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) => {
                            const copy = [...data.resume.experience];
                            copy[idx] = { ...copy[idx], period: e.target.value };
                            savePortfolioData({ ...data, resume: { ...data.resume, experience: copy } });
                          }}
                          placeholder="Dates / Period"
                          className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs text-bronze"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const copy = data.resume.experience.filter((_, i) => i !== idx);
                          savePortfolioData({ ...data, resume: { ...data.resume, experience: copy } });
                          showNotification("Removed experience entry");
                        }}
                        className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-rose-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div>
                      <label className="text-[11px] text-muted-foreground font-mono-soft">
                        Bullet Points (one per line)
                      </label>
                      <textarea
                        rows={3}
                        value={(exp.points || []).join("\n")}
                        onChange={(e) => {
                          const copy = [...data.resume.experience];
                          copy[idx] = {
                            ...copy[idx],
                            points: e.target.value.split("\n").filter((p) => p.trim().length > 0),
                          };
                          savePortfolioData({ ...data, resume: { ...data.resume, experience: copy } });
                        }}
                        className="mt-1 w-full rounded-lg border border-border bg-card p-2 text-xs text-foreground leading-relaxed outline-none focus:border-bronze"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <h4 className="font-display text-lg text-foreground flex items-center gap-2">
                <Award className="h-4 w-4 text-bronze" /> Education & Academic Background
              </h4>
              {(data.resume?.education || []).map((edu, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-xl border border-border/70 p-4">
                  <div>
                    <label className="text-xs text-muted-foreground">Degree / Major</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => {
                        const copy = [...data.resume.education];
                        copy[idx] = { ...copy[idx], degree: e.target.value };
                        savePortfolioData({ ...data, resume: { ...data.resume, education: copy } });
                      }}
                      className="mt-1 w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Institution / University</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => {
                        const copy = [...data.resume.education];
                        copy[idx] = { ...copy[idx], institution: e.target.value };
                        savePortfolioData({ ...data, resume: { ...data.resume, education: copy } });
                      }}
                      className="mt-1 w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Graduation / Period</label>
                    <input
                      type="text"
                      value={edu.period}
                      onChange={(e) => {
                        const copy = [...data.resume.education];
                        copy[idx] = { ...copy[idx], period: e.target.value };
                        savePortfolioData({ ...data, resume: { ...data.resume, education: copy } });
                      }}
                      className="mt-1 w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Affiliation / Honors</label>
                    <input
                      type="text"
                      value={edu.details || ""}
                      onChange={(e) => {
                        const copy = [...data.resume.education];
                        copy[idx] = { ...copy[idx], details: e.target.value };
                        savePortfolioData({ ...data, resume: { ...data.resume, education: copy } });
                      }}
                      className="mt-1 w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* PROJECT EDIT MODAL */}
      <AnimatePresence>
        {editingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setEditingProject(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-2xl rounded-3xl border border-border bg-card p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4"
            >
              <h3 className="font-display text-2xl text-foreground">Edit Project</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground font-mono-soft">Title</label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full mt-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-mono-soft">Tagline</label>
                  <input
                    type="text"
                    value={editingProject.tagline}
                    onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                    className="w-full mt-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground font-mono-soft">Category</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                    className="w-full mt-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-xs text-foreground outline-none"
                  >
                    <option value="Agentic AI">Agentic AI</option>
                    <option value="Full-Stack & Cloud">Full-Stack & Cloud</option>
                    <option value="Applied ML">Applied ML</option>
                    <option value="Data & Systems">Data & Systems</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-mono-soft">Status</label>
                  <select
                    value={editingProject.status}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as any })}
                    className="w-full mt-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-xs text-foreground outline-none"
                  >
                    <option value="Live Production">Live Production</option>
                    <option value="Active Development">Active Development</option>
                    <option value="Research Prototype">Research Prototype</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-mono-soft">Tag Badge</label>
                  <input
                    type="text"
                    value={editingProject.tag}
                    onChange={(e) => setEditingProject({ ...editingProject, tag: e.target.value })}
                    className="w-full mt-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground font-mono-soft">GitHub Repo URL</label>
                  <input
                    type="text"
                    value={editingProject.githubUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full mt-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-mono-soft">Live Deployment URL</label>
                  <input
                    type="text"
                    value={editingProject.liveUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full mt-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground font-mono-soft">Overview Description</label>
                <textarea
                  rows={3}
                  value={editingProject.overview}
                  onChange={(e) => setEditingProject({ ...editingProject, overview: e.target.value })}
                  className="w-full mt-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground font-mono-soft">System Architecture Steps (one per line)</label>
                <textarea
                  rows={4}
                  value={editingProject.systemArchitecture.flowSteps.join("\n")}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      systemArchitecture: {
                        ...editingProject.systemArchitecture,
                        flowSteps: e.target.value.split("\n").filter(Boolean),
                      },
                    })
                  }
                  className="w-full mt-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-xs font-mono-soft text-foreground outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground font-mono-soft">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={editingProject.techStack.join(", ")}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      techStack: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full mt-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => saveProject(editingProject)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2 text-xs font-medium text-background"
                >
                  <Save className="h-3.5 w-3.5" />
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* NOTE EDIT MODAL */}
      <AnimatePresence>
        {editingNote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setEditingNote(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-xl rounded-3xl border border-border bg-card p-6 md:p-8 shadow-2xl space-y-4"
            >
              <h3 className="font-display text-2xl text-foreground">Edit Study Note</h3>

              <div>
                <label className="text-xs text-muted-foreground font-mono-soft">Title</label>
                <input
                  type="text"
                  value={editingNote.title}
                  onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                  className="w-full mt-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground font-mono-soft">Category</label>
                  <select
                    value={editingNote.category}
                    onChange={(e) => setEditingNote({ ...editingNote, category: e.target.value as any })}
                    className="w-full mt-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-xs text-foreground outline-none"
                  >
                    <option value="Python">Python</option>
                    <option value="SQL">SQL</option>
                    <option value="System Design">System Design</option>
                    <option value="AI & ML">AI & ML</option>
                    <option value="DSA">DSA</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-mono-soft">Tag Badge</label>
                  <input
                    type="text"
                    value={editingNote.tag}
                    onChange={(e) => setEditingNote({ ...editingNote, tag: e.target.value })}
                    className="w-full mt-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground font-mono-soft">Estimated Pages</label>
                  <input
                    type="number"
                    value={editingNote.pages}
                    onChange={(e) => setEditingNote({ ...editingNote, pages: Number(e.target.value) })}
                    className="w-full mt-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-mono-soft">File Size (e.g. '3.2 MB')</label>
                  <input
                    type="text"
                    value={editingNote.fileSize}
                    onChange={(e) => setEditingNote({ ...editingNote, fileSize: e.target.value })}
                    className="w-full mt-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground font-mono-soft">PDF URL or Public Path (e.g. /notes/python_handbook.pdf)</label>
                <input
                  type="text"
                  value={editingNote.pdfUrl}
                  onChange={(e) => setEditingNote({ ...editingNote, pdfUrl: e.target.value })}
                  className="w-full mt-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground font-mono-soft">Description</label>
                <textarea
                  rows={3}
                  value={editingNote.description}
                  onChange={(e) => setEditingNote({ ...editingNote, description: e.target.value })}
                  className="w-full mt-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setEditingNote(null)}
                  className="rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => saveNote(editingNote)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2 text-xs font-medium text-background"
                >
                  <Save className="h-3.5 w-3.5" />
                  Save Note
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CERTIFICATION EDIT MODAL */}
      <AnimatePresence>
        {editingCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setEditingCert(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-xl rounded-3xl border border-border bg-card p-6 md:p-8 shadow-2xl space-y-4"
            >
              <h3 className="font-display text-2xl text-foreground">Edit Certification</h3>

              <div>
                <label className="text-xs text-muted-foreground font-mono-soft">Title</label>
                <input
                  type="text"
                  value={editingCert.title}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  className="w-full mt-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground font-mono-soft">Issuer</label>
                  <input
                    type="text"
                    value={editingCert.issuer}
                    onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                    className="w-full mt-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-mono-soft">Year</label>
                  <input
                    type="text"
                    value={editingCert.date}
                    onChange={(e) => setEditingCert({ ...editingCert, date: e.target.value })}
                    className="w-full mt-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground font-mono-soft">Credential ID</label>
                  <input
                    type="text"
                    value={editingCert.credentialId}
                    onChange={(e) => setEditingCert({ ...editingCert, credentialId: e.target.value })}
                    className="w-full mt-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-mono-soft">Verify URL</label>
                  <input
                    type="text"
                    value={editingCert.verifyUrl}
                    onChange={(e) => setEditingCert({ ...editingCert, verifyUrl: e.target.value })}
                    className="w-full mt-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground font-mono-soft">Summary</label>
                <textarea
                  rows={3}
                  value={editingCert.summary}
                  onChange={(e) => setEditingCert({ ...editingCert, summary: e.target.value })}
                  className="w-full mt-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground font-mono-soft">Skills (comma separated)</label>
                <input
                  type="text"
                  value={editingCert.skills.join(", ")}
                  onChange={(e) =>
                    setEditingCert({
                      ...editingCert,
                      skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full mt-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setEditingCert(null)}
                  className="rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => saveCert(editingCert)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2 text-xs font-medium text-background"
                >
                  <Save className="h-3.5 w-3.5" />
                  Save Certification
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TECH STACK EDIT MODAL */}
      <AnimatePresence>
        {editingTech && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setEditingTech(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-md rounded-3xl border border-border bg-card p-6 md:p-8 shadow-2xl space-y-4"
            >
              <h3 className="font-display text-2xl text-foreground">Edit Technology</h3>

              <div>
                <label className="text-xs text-muted-foreground font-mono-soft">Name</label>
                <input
                  type="text"
                  value={editingTech.name}
                  onChange={(e) => setEditingTech({ ...editingTech, name: e.target.value })}
                  className="w-full mt-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground font-mono-soft">Category</label>
                <select
                  value={editingTech.category}
                  onChange={(e) => setEditingTech({ ...editingTech, category: e.target.value as any })}
                  className="w-full mt-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-xs text-foreground outline-none"
                >
                  <option value="Languages">Languages</option>
                  <option value="AI & ML">AI & ML</option>
                  <option value="Backend & DB">Backend & DB</option>
                  <option value="Cloud & DevOps">Cloud & DevOps</option>
                  <option value="Frontend">Frontend</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-muted-foreground font-mono-soft">Tag / Role</label>
                <input
                  type="text"
                  value={editingTech.tag}
                  onChange={(e) => setEditingTech({ ...editingTech, tag: e.target.value })}
                  className="w-full mt-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground font-mono-soft">Vector Icon SVG URL</label>
                <input
                  type="text"
                  value={editingTech.iconUrl}
                  onChange={(e) => setEditingTech({ ...editingTech, iconUrl: e.target.value })}
                  className="w-full mt-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setEditingTech(null)}
                  className="rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => saveTech(editingTech)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2 text-xs font-medium text-background"
                >
                  <Save className="h-3.5 w-3.5" />
                  Save
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
