import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  MessageCircle,
  Sparkles,
  X,
  Settings2,
  ChevronDown,
  Cpu,
  Key,
  RotateCcw,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { getPortfolioData } from "@/lib/portfolio-store";

type Msg = { role: "user" | "assistant"; content: string };
type ProviderType = "gemini" | "groq" | "mistral";

interface ModelOption {
  id: ProviderType;
  name: string;
  badge: string;
  description: string;
}

const MODELS: ModelOption[] = [
  {
    id: "gemini",
    name: "Gemini 2.0 Flash",
    badge: "Google · Free",
    description: "Ultra-fast multimodal reasoning & code intelligence",
  },
  {
    id: "groq",
    name: "Llama 3.3 70B",
    badge: "Groq · LPUs",
    description: "Blazing fast open-weights Llama running on Groq",
  },
  {
    id: "mistral",
    name: "Mistral Small",
    badge: "Mistral · Free",
    description: "High-precision European open-weight LLM",
  },
];

const SUGGESTED_QUESTIONS = [
  "What is Tanush's background & experience?",
  "Explain the AVANA multi-agent architecture",
  "Where can I download SQL & Python notes?",
  "What tech stack does Tanush use?",
];

export function QaiChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState<ProviderType>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("qai_model_provider") as ProviderType) || "gemini";
    }
    return "gemini";
  });
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [customKey, setCustomKey] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("qai_custom_api_key") || "";
    }
    return "";
  });

  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "✦ Hi! I'm **QAI**, Tanush's portfolio AI assistant. I have full knowledge of his **resume, work at Sam Corporate, projects (like AVANA), and downloadable study notes**. What would you like to explore?",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("qai:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("qai:open", onOpen);
    };
  }, []);

  const handleSelectProvider = (p: ProviderType) => {
    setProvider(p);
    localStorage.setItem("qai_model_provider", p);
    setShowModelPicker(false);
  };

  const handleSaveKey = (val: string) => {
    setCustomKey(val);
    localStorage.setItem("qai_custom_api_key", val);
  };

  const send = async (overridePrompt?: string) => {
    const text = (overridePrompt ?? input).trim();
    if (!text || loading) return;
    setInput("");
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setLoading(true);

    try {
      const portfolioOverride = getPortfolioData();

      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          customApiKey: customKey || undefined,
          portfolioOverride,
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!resp.ok || !resp.body) {
        const err = await resp.json().catch(() => ({ error: "Network connection error" }));
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            role: "assistant",
            content: `⚠️ ${err.error ?? "Failed to get response"}`,
          };
          return copy;
        });
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let acc = "";
      let done = false;

      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buf += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, idx);
          buf = buf.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") {
            done = true;
            break;
          }
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (delta) {
              acc += delta;
              setMessages((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: "assistant", content: acc };
                return copy;
              });
            }
          } catch {
            buf = line + "\n" + buf;
          }
        }
      }
    } catch (err) {
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          content: "⚠️ Network error connecting to chat service.",
        };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "✦ Chat refreshed! Ask me anything about Tanush's background, AI projects, or engineering notes.",
      },
    ]);
  };

  const activeModel = MODELS.find((m) => m.id === provider) || MODELS[0];

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        aria-label="Open QAI chat"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-bronze/40 bg-foreground text-background shadow-cinema transition hover:shadow-glow"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <MessageCircle className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bronze opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-bronze" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="glass shadow-cinema fixed bottom-24 right-6 z-50 flex h-[600px] w-[min(94vw,430px)] flex-col overflow-hidden rounded-3xl border border-border/70 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="border-b border-border/50 px-4 py-3 bg-card/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <p className="font-display text-base font-semibold text-foreground">QAI</p>
                  <span className="rounded-full bg-bronze/10 border border-bronze/30 px-2 py-0.5 text-[10px] font-mono-soft text-bronze">
                    RAG Grounded
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={resetChat}
                    title="Reset Conversation"
                    className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setShowSettings((v) => !v)}
                    title="API Key Settings"
                    className={cn(
                      "rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition",
                      customKey && "text-bronze"
                    )}
                  >
                    <Settings2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Model Dropdown Selector Bar */}
              <div className="mt-2.5 relative">
                <button
                  type="button"
                  onClick={() => setShowModelPicker((v) => !v)}
                  className="w-full flex items-center justify-between rounded-xl border border-border/60 bg-secondary/60 px-3 py-1.5 text-xs text-foreground transition hover:border-bronze/50"
                >
                  <div className="flex items-center gap-2 truncate">
                    <Cpu className="h-3.5 w-3.5 text-bronze shrink-0" />
                    <span className="font-medium truncate">{activeModel.name}</span>
                    <span className="text-[10px] text-muted-foreground">({activeModel.badge})</span>
                  </div>
                  <ChevronDown
                    className={cn("h-3 w-3 text-muted-foreground transition-transform", showModelPicker && "rotate-180")}
                  />
                </button>

                {/* Dropdown Menu */}
                {showModelPicker && (
                  <div className="absolute top-full left-0 right-0 mt-1.5 z-50 rounded-2xl border border-border bg-card p-1.5 shadow-cinema backdrop-blur-xl">
                    {MODELS.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => handleSelectProvider(m.id)}
                        className={cn(
                          "w-full text-left rounded-xl px-3 py-2 text-xs transition flex items-center justify-between",
                          provider === m.id
                            ? "bg-bronze/10 text-bronze font-medium"
                            : "text-foreground/80 hover:bg-secondary"
                        )}
                      >
                        <div>
                          <div className="font-medium text-foreground">{m.name}</div>
                          <div className="text-[10px] text-muted-foreground line-clamp-1">{m.description}</div>
                        </div>
                        <span className="text-[10px] font-mono-soft opacity-70 ml-2">{m.badge}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Settings Drawer (Custom Key) */}
              {showSettings && (
                <div className="mt-2.5 rounded-xl border border-border/70 bg-card/90 p-3 text-xs">
                  <div className="flex items-center gap-1.5 text-foreground font-medium mb-1">
                    <Key className="h-3 w-3 text-bronze" />
                    Custom API Key (Optional)
                  </div>
                  <p className="text-[11px] text-muted-foreground mb-2">
                    Enter your own Gemini, Groq, or Mistral key if testing custom rate limits. Saved locally in browser.
                  </p>
                  <input
                    type="password"
                    value={customKey}
                    onChange={(e) => handleSaveKey(e.target.value)}
                    placeholder="Enter API Key (e.g. AIza... or gsk_...)"
                    className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-bronze"
                  />
                </div>
              )}
            </div>

            {/* Chat Body */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      m.role === "user"
                        ? "bg-foreground text-background"
                        : "border border-border/60 bg-card/90 text-foreground shadow-sm"
                    )}
                  >
                    {m.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none dark:prose-invert [&>*]:my-1 leading-relaxed">
                        <ReactMarkdown>{m.content || "Thinking…"}</ReactMarkdown>
                      </div>
                    ) : (
                      m.content
                    )}
                  </div>
                </div>
              ))}

              {/* Suggested Quick Questions if only 1 message */}
              {messages.length === 1 && (
                <div className="pt-2">
                  <p className="text-[11px] font-mono-soft uppercase text-muted-foreground px-1 mb-2">
                    Suggested Questions
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => send(q)}
                        className="text-left text-xs text-foreground/80 rounded-xl border border-border/60 bg-secondary/40 px-3 py-2 hover:border-bronze/50 hover:bg-secondary/70 transition"
                      >
                        ✦ {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 border-t border-border/50 bg-background/50 px-3 py-3"
            >
              <Sparkles className="ml-2 h-4 w-4 shrink-0 text-bronze" />
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={loading ? "QAI is thinking…" : "Ask about Tanush's work, projects, notes…"}
                disabled={loading}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="rounded-full bg-foreground p-2 text-background transition hover:opacity-90 disabled:opacity-30"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}