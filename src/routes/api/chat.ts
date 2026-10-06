import { createFileRoute } from "@tanstack/react-router";
import { INITIAL_PORTFOLIO_DATA, PortfolioData } from "@/lib/portfolio-store";
import { buildKnowledgeChunks, retrieveRelevantChunks } from "@/lib/rag-knowledge";

interface ChatRequestPayload {
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  provider?: "gemini" | "groq" | "mistral" | "openrouter";
  customApiKey?: string;
  portfolioOverride?: PortfolioData;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as ChatRequestPayload;
          const { messages, provider = "gemini", customApiKey, portfolioOverride } = body;

          if (!messages || messages.length === 0) {
            return new Response(JSON.stringify({ error: "Messages array required" }), {
              status: 400,
              headers: { "content-type": "application/json" },
            });
          }

          const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")?.content || "";

          // 1. Build & Retrieve RAG Knowledge Chunks
          const activeData = portfolioOverride || INITIAL_PORTFOLIO_DATA;
          const allChunks = buildKnowledgeChunks({
            resume: activeData.resume || INITIAL_PORTFOLIO_DATA.resume,
            projects: activeData.projects || INITIAL_PORTFOLIO_DATA.projects,
            notes: activeData.notes || INITIAL_PORTFOLIO_DATA.notes,
            certifications: activeData.certifications || INITIAL_PORTFOLIO_DATA.certifications,
            techStack: activeData.techStack || INITIAL_PORTFOLIO_DATA.techStack,
          });

          const relevantChunks = retrieveRelevantChunks(lastUserMessage, allChunks, 5);
          const contextText = relevantChunks
            .map((c, i) => `[Source ${i + 1}: ${c.title}]\n${c.content}`)
            .join("\n\n---\n\n");

          const SYSTEM_PROMPT = `You are QAI — the intelligent, warm, and highly capable AI companion of LOG!Q, the digital portfolio and ecosystem of M. R. Tanush Pai.

Identity & Persona:
• Voice: warm, confident, technically articulate, engaging, and clear. Never sound robotic or generic.
• Use occasional ✦ ornaments sparingly.
• Keep responses concise (under 130 words unless the user explicitly requests an in-depth breakdown or technical system flow).
• When discussing projects, recommend viewing the deep-dive architecture page using its link (e.g. /labs/ai-job-agent or /labs).
• When discussing contact/hiring, provide Tanush's email (tanushpai06@gmail.com), WhatsApp (+91 9567805222), and LinkedIn.

GROUND TRUTH KNOWLEDGE BASE (Retrieved from Tanush's verified resume and live projects):
${contextText}

Instructions:
1. Answer strictly and accurately using the knowledge base provided above.
2. If asked about Tanush's education, work experience at Sam Corporate, projects (like AVANA or AI Job Agent), or specific skills, cite exact details from the retrieved context.
3. If the user asks something completely outside Tanush's professional background, answer politely and gently bring the conversation back to Tanush's work and AI capabilities.`;

          // 2. Dispatch to Selected Provider
          const geminiKey = customApiKey || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
          const groqKey = customApiKey || process.env.GROQ_API_KEY;
          const mistralKey = customApiKey || process.env.MISTRAL_API_KEY;
          const lovableKey = process.env.LOVABLE_API_KEY;

          // --- Provider: Groq (Llama 3.3 70B) ---
          if (provider === "groq" && groqKey) {
            const upstream = await fetch("https://api.groq.com/openai/v1/chat/completions", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${groqKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                stream: true,
                messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
              }),
            });

            if (!upstream.ok) {
              const err = await upstream.text();
              return new Response(JSON.stringify({ error: `Groq error: ${err}` }), {
                status: upstream.status,
                headers: { "content-type": "application/json" },
              });
            }

            return new Response(upstream.body, {
              headers: { "content-type": "text/event-stream" },
            });
          }

          // --- Provider: Mistral ---
          if (provider === "mistral" && mistralKey) {
            const upstream = await fetch("https://api.mistral.ai/v1/chat/completions", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${mistralKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: "mistral-small-latest",
                stream: true,
                messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
              }),
            });

            if (!upstream.ok) {
              const err = await upstream.text();
              return new Response(JSON.stringify({ error: `Mistral error: ${err}` }), {
                status: upstream.status,
                headers: { "content-type": "application/json" },
              });
            }

            return new Response(upstream.body, {
              headers: { "content-type": "text/event-stream" },
            });
          }

          // --- Provider: Google Gemini Direct (Google AI Studio Free API) ---
          if (geminiKey) {
            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key=${geminiKey}`;

            const contents = messages.map((m) => ({
              role: m.role === "assistant" ? "model" : "user",
              parts: [{ text: m.content }],
            }));

            const upstream = await fetch(geminiUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
                contents,
              }),
            });

            if (!upstream.ok) {
              const err = await upstream.text();
              return new Response(JSON.stringify({ error: `Gemini API error: ${err}` }), {
                status: upstream.status,
                headers: { "content-type": "application/json" },
              });
            }

            // Transform Gemini SSE format to OpenAI-compatible SSE so frontend parses seamlessly
            const transformStream = new TransformStream({
              transform(chunk, controller) {
                const text = new TextDecoder().decode(chunk);
                const lines = text.split("\n");
                for (const line of lines) {
                  if (line.startsWith("data: ")) {
                    try {
                      const json = JSON.parse(line.slice(6));
                      const candidateText =
                        json.candidates?.[0]?.content?.parts?.[0]?.text || "";
                      if (candidateText) {
                        const openAiChunk = {
                          choices: [{ delta: { content: candidateText } }],
                        };
                        controller.enqueue(
                          new TextEncoder().encode(`data: ${JSON.stringify(openAiChunk)}\n\n`)
                        );
                      }
                    } catch {
                      // ignore parse errors on malformed lines
                    }
                  }
                }
              },
              flush(controller) {
                controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
              },
            });

            return new Response(upstream.body?.pipeThrough(transformStream), {
              headers: { "content-type": "text/event-stream" },
            });
          }

          // --- Fallback: Lovable Gateway (if configured) ---
          if (lovableKey) {
            const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${lovableKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: "google/gemini-2.5-flash",
                stream: true,
                messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
              }),
            });

            if (upstream.ok) {
              return new Response(upstream.body, {
                headers: { "content-type": "text/event-stream" },
              });
            }
          }

          // If no key is set yet, return helpful instructions in chat format so the user is never stuck
          const mockResponse = `✦ **QAI Knowledge Grounding Active**

I found relevant context about Tanush:
${relevantChunks.map((c) => `• **${c.title}**`).join("\n")}

*Note: To enable live LLM generation across all providers, add a free API key in your \`.env\` (e.g. \`GEMINI_API_KEY\` or \`GROQ_API_KEY\`) or click the ⚙️ icon in the chat header to enter your key directly!*`;

          return new Response(
            `data: ${JSON.stringify({ choices: [{ delta: { content: mockResponse } }] })}\n\ndata: [DONE]\n\n`,
            { headers: { "content-type": "text/event-stream" } }
          );
        } catch (e) {
          return new Response(
            JSON.stringify({ error: e instanceof Error ? e.message : "Unknown server error" }),
            { status: 500, headers: { "content-type": "application/json" } }
          );
        }
      },
    },
  },
});