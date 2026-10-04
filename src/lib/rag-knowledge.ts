import { ProjectItem, NoteItem, CertificationItem, TechItem, ResumeData } from "./portfolio-store";

export interface KnowledgeChunk {
  id: string;
  source: "resume" | "project" | "note" | "certification" | "general";
  title: string;
  content: string;
  metadata?: Record<string, any>;
}

/**
 * Builds semantic chunks from structured portfolio data
 */
export function buildKnowledgeChunks(params: {
  resume: ResumeData;
  projects: ProjectItem[];
  notes: NoteItem[];
  certifications: CertificationItem[];
  techStack: TechItem[];
}): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];
  const { resume, projects, notes, certifications, techStack } = params;

  // 1. Resume Summary & Contact
  chunks.push({
    id: "resume-summary",
    source: "resume",
    title: `About ${resume.name} (Professional Summary)`,
    content: `${resume.name} is an ${resume.title} based in ${resume.location}.
Summary: ${resume.summary}
Email: ${resume.email}
Phone: ${resume.phone}
LinkedIn: ${resume.linkedin}
GitHub: ${resume.github}`,
    metadata: { section: "bio", email: resume.email },
  });

  // 2. Education
  if (resume.education && resume.education.length > 0) {
    const eduText = resume.education
      .map(
        (e) =>
          `• ${e.degree} at ${e.institution} (${e.location}), Period: ${e.period}.${
            e.details ? " Details: " + e.details : ""
          }`
      )
      .join("\n");
    chunks.push({
      id: "resume-education",
      source: "resume",
      title: "Education & Academic Background",
      content: `Education Background for ${resume.name}:\n${eduText}`,
      metadata: { section: "education" },
    });
  }

  // 3. Work Experience (Individual chunks for high precision retrieval)
  if (resume.experience && resume.experience.length > 0) {
    resume.experience.forEach((exp, idx) => {
      chunks.push({
        id: `resume-exp-${idx}`,
        source: "resume",
        title: `Work Experience: ${exp.role} at ${exp.company}`,
        content: `Role: ${exp.role}
Company: ${exp.company} (${exp.location})
Period: ${exp.period}
Key Contributions and Engineering Impact:
${exp.points.map((pt) => `• ${pt}`).join("\n")}`,
        metadata: { section: "experience", company: exp.company, role: exp.role },
      });
    });
  }

  // 4. Skills & Tech Stack
  chunks.push({
    id: "resume-skills",
    source: "resume",
    title: "Technical Skills & Competencies",
    content: `Languages: ${resume.skills.languages.join(", ")}
AI & Generative AI: ${resume.skills.aiAndGenAI.join(", ")}
Data & Databases: ${resume.skills.databases.join(", ")}
Backend & Tools: ${resume.skills.backendAndTools.join(", ")}
All Tech Stack on site: ${techStack.map((t) => `${t.name} (${t.category})`).join(", ")}`,
    metadata: { section: "skills" },
  });

  // 5. Projects & Architecture Blueprints
  projects.forEach((proj) => {
    chunks.push({
      id: `project-${proj.id}`,
      source: "project",
      title: `Project Blueprint: ${proj.title}`,
      content: `Project Name: ${proj.title} (Slug: /labs/${proj.id})
Category: ${proj.category} | Tag: ${proj.tag} | Status: ${proj.status}
Tagline: ${proj.tagline}
Overview: ${proj.overview}
System Architecture: ${proj.systemArchitecture?.title || "Architecture Flow"}
Pipeline Data Flow Steps:
${(proj.systemArchitecture?.flowSteps || []).map((step, i) => `${i + 1}. ${step}`).join("\n")}
Architecture Diagram Label: ${proj.systemArchitecture?.diagramLabel || "N/A"}
Key Capabilities & Features:
${(proj.keyFeatures || []).map((kf) => `• ${kf}`).join("\n")}
Tech Stack: ${(proj.techStack || []).join(", ")}
GitHub Link: ${proj.githubUrl || "Available in portfolio"}
Live Deployment: ${proj.liveUrl || "Available on request"}`,
      metadata: { projectId: proj.id, slug: `/labs/${proj.id}` },
    });
  });

  // 6. Study Notes & Downloadable PDFs
  if (notes && notes.length > 0) {
    const notesSummary = notes
      .map(
        (n) =>
          `• "${n.title}" (${n.category}): ${n.description} [${n.pages} pages, ${n.fileSize}, Download URL: ${n.pdfUrl}] - Key topics: ${n.highlights.join(", ")}`
      )
      .join("\n");
    chunks.push({
      id: "study-notes-catalog",
      source: "note",
      title: "Curated Study Notes & PDF Downloads (/notes)",
      content: `Tanush provides engineering and AI study notes downloadable on the /notes page:\n${notesSummary}`,
      metadata: { section: "notes" },
    });
  }

  // 7. Certifications
  if (certifications && certifications.length > 0) {
    const certsSummary = certifications
      .map(
        (c) =>
          `• ${c.title} by ${c.issuer} (${c.date}) - ID: ${c.credentialId || "N/A"}. Summary: ${c.summary}. Skills: ${c.skills.join(", ")}`
      )
      .join("\n");
    chunks.push({
      id: "certifications-catalog",
      source: "certification",
      title: "Verified Certifications & Credentials",
      content: `Tanush's verified certifications:\n${certsSummary}`,
      metadata: { section: "certifications" },
    });
  }

  return chunks;
}

/**
 * Lightweight tokenized similarity scoring (BM25-style term frequency + keyword boosting)
 */
export function retrieveRelevantChunks(
  query: string,
  chunks: KnowledgeChunk[],
  topK = 5
): KnowledgeChunk[] {
  if (!query || !query.trim()) return chunks.slice(0, topK);

  const cleanQuery = query.toLowerCase();
  const queryTerms = cleanQuery
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);

  if (queryTerms.length === 0) return chunks.slice(0, topK);

  const scored = chunks.map((chunk) => {
    let score = 0;
    const lowerTitle = chunk.title.toLowerCase();
    const lowerContent = chunk.content.toLowerCase();

    // Exact phrase match boost
    if (lowerContent.includes(cleanQuery)) {
      score += 20;
    }

    queryTerms.forEach((term) => {
      // Title match is heavily weighted
      if (lowerTitle.includes(term)) {
        score += 8;
      }

      // Keyword occurrences in content
      const regex = new RegExp(`\\b${term}\\b`, "gi");
      const matches = lowerContent.match(regex);
      if (matches) {
        score += Math.min(matches.length * 2, 10);
      } else if (lowerContent.includes(term)) {
        score += 1;
      }
    });

    // Semantic domain boosts
    if (
      (cleanQuery.includes("work") ||
        cleanQuery.includes("experience") ||
        cleanQuery.includes("job") ||
        cleanQuery.includes("sam corporate") ||
        cleanQuery.includes("company") ||
        cleanQuery.includes("intern")) &&
      chunk.source === "resume" &&
      chunk.id.startsWith("resume-exp")
    ) {
      score += 15;
    }
    if (
      (cleanQuery.includes("education") ||
        cleanQuery.includes("college") ||
        cleanQuery.includes("university") ||
        cleanQuery.includes("degree") ||
        cleanQuery.includes("btech") ||
        cleanQuery.includes("scms")) &&
      chunk.id === "resume-education"
    ) {
      score += 25;
    }
    if (
      (cleanQuery.includes("project") ||
        cleanQuery.includes("architecture") ||
        cleanQuery.includes("blueprint") ||
        cleanQuery.includes("build") ||
        cleanQuery.includes("avana") ||
        cleanQuery.includes("agent") ||
        cleanQuery.includes("system")) &&
      chunk.source === "project"
    ) {
      score += 8;
    }
    if (
      (cleanQuery.includes("pdf") ||
        cleanQuery.includes("notes") ||
        cleanQuery.includes("download") ||
        cleanQuery.includes("handbook") ||
        cleanQuery.includes("sql") ||
        cleanQuery.includes("python")) &&
      chunk.source === "note"
    ) {
      score += 20;
    }
    if (
      (cleanQuery.includes("cert") ||
        cleanQuery.includes("course") ||
        cleanQuery.includes("credential") ||
        cleanQuery.includes("crewai") ||
        cleanQuery.includes("ibm")) &&
      chunk.source === "certification"
    ) {
      score += 20;
    }
    if (
      (cleanQuery.includes("contact") ||
        cleanQuery.includes("email") ||
        cleanQuery.includes("phone") ||
        cleanQuery.includes("reach") ||
        cleanQuery.includes("hire") ||
        cleanQuery.includes("who is")) &&
      chunk.id === "resume-summary"
    ) {
      score += 20;
    }

    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);

  // Return top K chunks that have positive relevance, or fall back to high priority overview
  const relevant = scored.filter((s) => s.score > 0).map((s) => s.chunk);
  if (relevant.length === 0) {
    return chunks.slice(0, topK);
  }
  return relevant.slice(0, topK);
}
