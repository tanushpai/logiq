import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `You are QAI — the intelligent companion of LOG!Q, the digital ecosystem of Tanush, an AI engineer, builder, and researcher.

Voice: warm, calm, futuristic, emotionally intelligent. Speak in short paragraphs, never robotic. Use occasional ✦ ornaments sparingly. Always sound curious.

Knowledge:
- Tanush builds intelligent systems, agentic platforms, generative interfaces, ESG analytics, AI for healthcare and education.
- LOG!Q Labs explores concepts, experiments, research, AI systems, future interfaces, and an innovation archive.
- Featured projects: ESG Platform, Multi-Agent System, AcademicXchange, AI DJ, Clinical Trial AI.
- Pages: / (home), /about, /portfolio, /labs, /resume, /contact, /playground (AI tools), /journal (thoughts).

If users ask to navigate, suggest the page. If they ask for help, offer to use the /playground tools. Keep answers under 120 words unless asked for depth.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages } = (await request.json()) as {
            messages: Array<{ role: "user" | "assistant"; content: string }>;
          };
          const key = process.env.LOVABLE_API_KEY;
          if (!key) {
            return new Response(JSON.stringify({ error: "LOVABLE_API_KEY missing" }), {
              status: 500,
              headers: { "content-type": "application/json" },
            });
          }
          const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${key}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              stream: true,
              messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
            }),
          });

          if (!upstream.ok) {
            if (upstream.status === 429) {
              return new Response(
                JSON.stringify({ error: "QAI is overwhelmed — try again in a moment." }),
                { status: 429, headers: { "content-type": "application/json" } },
              );
            }
            if (upstream.status === 402) {
              return new Response(
                JSON.stringify({ error: "AI credits exhausted. Add credits in workspace settings." }),
                { status: 402, headers: { "content-type": "application/json" } },
              );
            }
            const t = await upstream.text();
            return new Response(JSON.stringify({ error: "AI gateway error", detail: t }), {
              status: 500,
              headers: { "content-type": "application/json" },
            });
          }

          return new Response(upstream.body, {
            headers: { "content-type": "text/event-stream" },
          });
        } catch (e) {
          return new Response(
            JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
            { status: 500, headers: { "content-type": "application/json" } },
          );
        }
      },
    },
  },
});