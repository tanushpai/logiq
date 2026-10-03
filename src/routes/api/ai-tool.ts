import { createFileRoute } from "@tanstack/react-router";

const PRESETS: Record<string, string> = {
  ideas:
    "You are an AI innovation strategist. Given a domain, generate 5 bold, futuristic product ideas that fuse AI with the domain. Each idea: a striking name, one-sentence concept, and a 'why now' line. Format as markdown list.",
  namer:
    "You are a futuristic brand naming engine. Given a description, return 6 short (1-2 word) product names with a poetic tagline each. Markdown list.",
  tagline:
    "You are a poetic copywriter for an AI lab called LOG!Q. Given a topic, write 5 cinematic, emotionally resonant taglines. Markdown list. Each under 10 words.",
};

export const Route = createFileRoute("/api/ai-tool")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { tool, prompt } = (await request.json()) as { tool: string; prompt: string };
          const system = PRESETS[tool];
          if (!system) {
            return new Response(JSON.stringify({ error: "Unknown tool" }), {
              status: 400,
              headers: { "content-type": "application/json" },
            });
          }
          if (!prompt || prompt.length > 500) {
            return new Response(JSON.stringify({ error: "Invalid prompt" }), {
              status: 400,
              headers: { "content-type": "application/json" },
            });
          }
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
              messages: [
                { role: "system", content: system },
                { role: "user", content: prompt },
              ],
            }),
          });
          if (!upstream.ok) {
            if (upstream.status === 429) {
              return new Response(JSON.stringify({ error: "Rate limited. Try again shortly." }), {
                status: 429,
                headers: { "content-type": "application/json" },
              });
            }
            if (upstream.status === 402) {
              return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
                status: 402,
                headers: { "content-type": "application/json" },
              });
            }
            const t = await upstream.text();
            return new Response(JSON.stringify({ error: "AI error", detail: t }), {
              status: 500,
              headers: { "content-type": "application/json" },
            });
          }
          const data = (await upstream.json()) as {
            choices?: Array<{ message?: { content?: string } }>;
          };
          const content = data.choices?.[0]?.message?.content ?? "";
          return new Response(JSON.stringify({ content }), {
            headers: { "content-type": "application/json" },
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