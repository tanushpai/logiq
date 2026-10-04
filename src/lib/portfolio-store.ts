export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: "Agentic AI" | "Full-Stack & Cloud" | "Applied ML" | "Data & Systems";
  tag: string;
  status: "Live Production" | "Active Development" | "Research Prototype";
  gradient: string;
  iconName?: string;
  featured?: boolean;
  githubUrl?: string;
  liveUrl?: string;
  overview: string;
  systemArchitecture: {
    title: string;
    flowSteps: string[];
    diagramLabel: string;
  };
  keyFeatures: string[];
  techStack: string[];
}

export interface NoteItem {
  id: string;
  title: string;
  category: "Python" | "SQL" | "System Design" | "AI & ML" | "DSA";
  description: string;
  highlights: string[];
  fileSize: string;
  pages: number;
  pdfUrl: string;
  tag: string;
  updatedDate: string;
  downloadCount: number;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  skills: string[];
  verifyUrl: string;
  badgeTone: string;
  summary: string;
}

export interface TechItem {
  name: string;
  category: "Languages" | "AI & ML" | "Backend & DB" | "Cloud & DevOps" | "Frontend";
  iconUrl: string;
  tag: string;
}

export interface ResumeExperience {
  role: string;
  company: string;
  location: string;
  period: string;
  points: string[];
}

export interface ResumeEducation {
  degree: string;
  institution: string;
  location: string;
  period: string;
  details?: string;
}

export interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skills: {
    languages: string[];
    aiAndGenAI: string[];
    databases: string[];
    backendAndTools: string[];
  };
}

export interface PortfolioData {
  projects: ProjectItem[];
  notes: NoteItem[];
  certifications: CertificationItem[];
  techStack: TechItem[];
  resume: ResumeData;
}

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  projects: [
    {
      id: "ai-job-agent",
      title: "AI Job Application & Discovery Agent",
      tagline: "Autonomous end-to-end job intelligence, resume tailoring, and matching engine.",
      category: "Agentic AI",
      tag: "Autonomous Agent · LLM",
      status: "Active Development",
      gradient: "linear-gradient(135deg, oklch(0.78 0.13 70 / 0.9), oklch(0.62 0.09 55 / 0.85))",
      iconName: "Sparkles",
      featured: true,
      githubUrl: "https://github.com/",
      liveUrl: "http://localhost:5173",
      overview:
        "A proactive multi-step agentic system that monitors career opportunities, parses requirements semantically, aligns candidate profile vectors, and automatically generates customized application packages.",
      systemArchitecture: {
        title: "Agentic Orchestration & Verification Pipeline",
        flowSteps: [
          "Ingestion: Scrapes & normalizes postings through scheduled background workers.",
          "Semantic Parsing: Extracts required competencies, seniority, and tech stack using LLM entity extraction.",
          "Vector Matching: Embeds user experience into pgvector index to calculate exact match confidence.",
          "Drafting & Synthesis: Constructs targeted cover letters and resume summaries with verifiable citations.",
          "Telemetry & Review: Interactive user control deck with feedback loop before dispatching.",
        ],
        diagramLabel: "Input Feed ➔ Entity Extractor ➔ Embedding Matcher ➔ Multi-Agent Draft Loop ➔ Telemetry Deck",
      },
      keyFeatures: [
        "Vector similarity scoring across skill ontologies",
        "Dynamic markdown resume builder with ATS verification",
        "Automated status tracking across multi-channel application pipelines",
        "Resilient background worker queue with failure backoff",
      ],
      techStack: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "LangChain", "OpenAI / Claude API"],
    },
    {
      id: "logiq-companion",
      title: "QAI — Intelligent Companion System",
      tagline: "High-empathy conversational companion with hierarchical memory layers.",
      category: "Agentic AI",
      tag: "Cognitive Memory · AI",
      status: "Live Production",
      gradient: "linear-gradient(135deg, oklch(0.65 0.18 295 / 0.85), oklch(0.5 0.15 265 / 0.85))",
      iconName: "Brain",
      featured: true,
      githubUrl: "https://github.com/",
      overview:
        "A personal AI agent integrated into web ecosystems with persistent cognitive memory, multi-turn context compression, and editorial UI rendering capabilities.",
      systemArchitecture: {
        title: "Hierarchical Episodic & Semantic Memory",
        flowSteps: [
          "Ephemeral Buffer: Caches recent turn history in client session state.",
          "Episodic Memory: Consolidates key user preferences and project topics into structured facts.",
          "Semantic Retrieval: Queries local embeddings for zero-shot grounding during conversations.",
          "Streaming Response Engine: Generates markdown-aware tokens with responsive animated state.",
        ],
        diagramLabel: "Client Socket ➔ Context Compactor ➔ Semantic Memory Store ➔ Streaming LLM Engine",
      },
      keyFeatures: [
        "Real-time streaming token response with pause/resume",
        "Dynamic widget embedding directly within conversation bubbles",
        "Persistent dark/light theme awareness and editorial typography",
      ],
      techStack: ["TypeScript", "React", "Framer Motion", "TailwindCSS", "Vector DB", "Node.js"],
    },
    {
      id: "esg-intelligence",
      title: "ESG Intelligence & Compliance Analytics",
      tagline: "Automated sustainability reporting and regulatory telemetry for enterprises.",
      category: "Data & Systems",
      tag: "Enterprise Data · AI",
      status: "Live Production",
      gradient: "linear-gradient(135deg, oklch(0.72 0.12 145 / 0.85), oklch(0.55 0.1 160 / 0.8))",
      iconName: "Atom",
      featured: true,
      githubUrl: "https://github.com/",
      overview:
        "Transforms unstructured corporate sustainability disclosures, carbon audit PDFs, and energy logs into structured metrics aligned with GRI and CSRD standards.",
      systemArchitecture: {
        title: "Docling Extraction & Audit Proof Pipeline",
        flowSteps: [
          "Document Ingestion: Parses multi-page annual reports, tables, and carbon metrics.",
          "Entity Normalization: Maps divergent GHG Protocol scopes 1, 2, and 3 into standard units.",
          "Verification Layer: Generates traceable bounding-box citations for every extracted claim.",
          "Interactive Dashboard: Real-time time series charts and gap analysis.",
        ],
        diagramLabel: "Audit Raw Docs ➔ Table OCR Engine ➔ Entity Normalizer ➔ Compliance Validator ➔ Analytics BI",
      },
      keyFeatures: [
        "Automated Scope 1, 2, and 3 carbon breakdown",
        "Audit trail linking summary metrics back to original PDF source lines",
        "CSV and PDF executive summary export engine",
      ],
      techStack: ["Python", "PostgreSQL", "Pandas", "FastAPI", "React", "Chart.js", "Docker"],
    },
    {
      id: "academic-xchange",
      title: "AcademicXchange Collaboration Engine",
      tagline: "AI-native scholarship workspace for cross-disciplinary research and peer review.",
      category: "Full-Stack & Cloud",
      tag: "Scholarship · EdTech",
      status: "Research Prototype",
      gradient: "linear-gradient(135deg, oklch(0.7 0.13 50 / 0.85), oklch(0.55 0.12 30 / 0.85))",
      iconName: "GraduationCap",
      featured: true,
      githubUrl: "https://github.com/",
      overview:
        "A platform engineered to dissolve academic silos. Connects researchers across biology, computer science, and economics through shared hypothesis graphing and preprint synthesis.",
      systemArchitecture: {
        title: "Knowledge Graph & Synthesis Architecture",
        flowSteps: [
          "Paper Corpus Sync: Pulls arXiv and CrossRef metadata on defined domain topics.",
          "Knowledge Graph Generation: Extracts citation graphs and semantic dependency trees.",
          "Synthesis Agent: Identifies contested findings and unaddressed research gaps.",
          "Collaborative Workspace: Real-time collaborative canvas with Markdown & LaTeX support.",
        ],
        diagramLabel: "ArXiv Feed ➔ Knowledge Graph Extractor ➔ Cross-Discipline Matcher ➔ Collaborative Canvas",
      },
      keyFeatures: [
        "Interactive citation network visualizer",
        "LaTeX math rendering with KaTeX and export to Overleaf",
        "Automated paper abstract summarization and related-work matrix",
      ],
      techStack: ["Next.js", "TypeScript", "Neo4j / Graph DB", "Python", "TailwindCSS", "PostgreSQL"],
    },
    {
      id: "clinical-trial-ai",
      title: "Clinical Trial Matching Engine",
      tagline: "Semantic matching between patient electronic health criteria and protocol eligibility.",
      category: "Applied ML",
      tag: "Healthcare · NLP",
      status: "Research Prototype",
      gradient: "linear-gradient(135deg, oklch(0.72 0.13 200 / 0.85), oklch(0.55 0.11 220 / 0.85))",
      iconName: "Stethoscope",
      githubUrl: "https://github.com/",
      overview:
        "A privacy-first clinical trial screening system that parses medical notes and matches complex inclusion/exclusion criteria against ClinicalTrials.gov registries.",
      systemArchitecture: {
        title: "Biomedical Entity Extraction & Eligibility Scoring",
        flowSteps: [
          "De-identification: Strips PHI from raw input clinical notes.",
          "BioBERT Parsing: Extracts biomarker conditions, lab thresholds, and prior treatments.",
          "Constraint Evaluation: Executes logic queries over trial protocol criteria trees.",
          "Physician Report: Produces rank-ordered trial candidates with qualification rationales.",
        ],
        diagramLabel: "Medical Records ➔ PHI Scrubber ➔ BioBERT NER ➔ Eligibility Tree Evaluator ➔ Physician UI",
      },
      keyFeatures: [
        "Strict inclusion/exclusion logic verification",
        "Integration with FHIR/HL7 standard data models",
        "Comprehensive explainability summaries for healthcare practitioners",
      ],
      techStack: ["Python", "PyTorch", "Hugging Face", "FastAPI", "Docker", "PostgreSQL"],
    },
    {
      id: "neural-audio-stream",
      title: "AI Real-Time Audio Curator",
      tagline: "Context-aware acoustic generation and dynamic playlist curation engine.",
      category: "Applied ML",
      tag: "Audio ML · Streaming",
      status: "Active Development",
      gradient: "linear-gradient(135deg, oklch(0.68 0.16 340 / 0.85), oklch(0.55 0.14 320 / 0.85))",
      iconName: "Music",
      githubUrl: "https://github.com/",
      overview:
        "An intelligent audio platform that adapts tempo, timbre, and ambient harmonic structures according to the listener's focus state, activity, and time of day.",
      systemArchitecture: {
        title: "Acoustic Feature Extraction & Transition Engine",
        flowSteps: [
          "Audio Feature Extraction: Analyzes BPM, harmonic key, spectral flatness, and energy.",
          "Smooth Transition Synthesis: Generates cross-fade beat-matched transitions.",
          "Adaptive Recommendation: Multi-armed bandit model that tunes selections based on skip telemetry.",
        ],
        diagramLabel: "Audio Stream ➔ Librosa DSP ➔ Harmonic Matcher ➔ Adaptive Recommendation Loop",
      },
      keyFeatures: [
        "Zero-latency harmonic key matching",
        "Interactive spectrogram visualizer using Web Audio API",
        "Lightweight model footprint runnable in-browser or edge servers",
      ],
      techStack: ["Python", "Librosa", "Web Audio API", "React", "TypeScript", "FastAPI"],
    },
  ],
  notes: [
    {
      id: "python-deep-dive",
      title: "Python 3 Core & Advanced Architecture",
      category: "Python",
      description:
        "Comprehensive reference covering Python memory management, GIL, async/await event loops, metaprogramming, generators, and clean OOP design patterns.",
      highlights: ["AsyncIO & Concurrency", "Memory Internals & GC", "Decorators & Metaclasses", "Type Hinting Best Practices"],
      fileSize: "3.4 MB",
      pages: 42,
      pdfUrl: "/notes/python_handbook.pdf",
      tag: "Handbook · Core",
      updatedDate: "Updated Q3 2026",
      downloadCount: 384,
    },
    {
      id: "sql-mastery",
      title: "Modern SQL & Query Optimization",
      category: "SQL",
      description:
        "Detailed handbook on relational database design, indexing strategies (B-Trees, GIN, GiST), CTEs, window functions, and query explain-plan tuning.",
      highlights: ["Window Functions & Partitions", "Index Tuning & EXPLAIN ANALYZE", "Complex CTE Aggregations", "Transactions & ACID Isolation"],
      fileSize: "2.8 MB",
      pages: 36,
      pdfUrl: "/notes/sql_handbook.pdf",
      tag: "Database · Cheatsheet",
      updatedDate: "Updated Q3 2026",
      downloadCount: 512,
    },
    {
      id: "system-design-roadmap",
      title: "Distributed Systems & Scalable Architecture",
      category: "System Design",
      description:
        "Field guide for architecting high-throughput systems: caching layers (Redis), event-driven streaming (Kafka), sharding, CAP theorem, and fault tolerance.",
      highlights: ["Microservices vs Modular Monolith", "Cache Invalidation & Write Policies", "Rate Limiting & Load Balancing", "Consensus & Data Replication"],
      fileSize: "4.1 MB",
      pages: 58,
      pdfUrl: "/notes/system_design.pdf",
      tag: "Architecture · Roadmap",
      updatedDate: "Updated Q2 2026",
      downloadCount: 620,
    },
    {
      id: "ai-llm-foundations",
      title: "Machine Learning & Applied LLM Systems",
      category: "AI & ML",
      description:
        "Key formulas, transformer architecture breakdowns, multi-agent orchestrations, vector embedding indexes, and RAG evaluation frameworks.",
      highlights: ["Attention Mechanisms & Transformers", "RAG Pipeline Architectures", "Multi-Agent Coordination", "Quantization & Model Evaluation"],
      fileSize: "5.2 MB",
      pages: 64,
      pdfUrl: "/notes/machine_learning.pdf",
      tag: "AI Systems · Notes",
      updatedDate: "Updated Q3 2026",
      downloadCount: 740,
    },
  ],
  certifications: [
    {
      id: "aws-solutions-architect",
      title: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services (AWS)",
      date: "2025",
      credentialId: "AWS-SAA-839210",
      skills: ["Cloud Architecture", "VPC & Networking", "IAM Security", "S3 / ECS / RDS", "High Availability"],
      verifyUrl: "https://aws.amazon.com/verification",
      badgeTone: "from-amber-500/20 via-orange-500/10 to-transparent",
      summary:
        "Demonstrated end-to-end expertise in designing resilient, cost-optimized, secure, and decoupled distributed cloud architectures on AWS.",
    },
    {
      id: "deeplearning-ai-rag",
      title: "Building & Evaluating Advanced RAG Systems",
      issuer: "DeepLearning.AI",
      date: "2025",
      credentialId: "DLAI-RAG-49102",
      skills: ["Vector DBs", "Reranking", "LangChain / LlamaIndex", "TruLens", "Context Precision"],
      verifyUrl: "https://deeplearning.ai",
      badgeTone: "from-blue-500/20 via-indigo-500/10 to-transparent",
      summary:
        "Comprehensive certification on advanced chunking, sentence-window retrieval, agentic routing, and automated evaluation metrics (faithfulness & context recall).",
    },
    {
      id: "meta-db-engineer",
      title: "PostgreSQL & Database Engineering Professional",
      issuer: "Meta (Coursera)",
      date: "2024",
      credentialId: "META-DBE-19827",
      skills: ["PostgreSQL", "Database Normalization", "Query Tuning", "ACID Transactions", "Triggers & Stored Procedures"],
      verifyUrl: "https://coursera.org/verify",
      badgeTone: "from-emerald-500/20 via-teal-500/10 to-transparent",
      summary:
        "Advanced mastery of relational database schema modeling, indexing strategies (B-Tree, GIN), concurrency isolation levels, and performance profiling.",
    },
    {
      id: "python-specialization",
      title: "Python 3: Deep Dive & Systems Programming",
      issuer: "Python Software Foundation & Coursera",
      date: "2024",
      credentialId: "PY-ADV-90214",
      skills: ["AsyncIO", "Metaprogramming", "Memory Optimization", "Generators & Itertools", "C-Extensions"],
      verifyUrl: "https://coursera.org/verify",
      badgeTone: "from-yellow-500/20 via-amber-500/10 to-transparent",
      summary:
        "In-depth investigation of CPython internals, garbage collection mechanisms, custom descriptors, asynchronous event loops, and multi-threading models.",
    },
  ],
  techStack: [
    {
      name: "Python",
      category: "Languages",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      tag: "Core Language",
    },
    {
      name: "TypeScript",
      category: "Languages",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      tag: "Type Safe",
    },
    {
      name: "JavaScript",
      category: "Languages",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      tag: "ESNext",
    },
    {
      name: "SQL",
      category: "Languages",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      tag: "Relational Queries",
    },
    {
      name: "C++",
      category: "Languages",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
      tag: "Systems / DSA",
    },
    {
      name: "PyTorch",
      category: "AI & ML",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
      tag: "Deep Learning",
    },
    {
      name: "FastAPI",
      category: "Backend & DB",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
      tag: "High-perf APIs",
    },
    {
      name: "PostgreSQL",
      category: "Backend & DB",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      tag: "Primary Relational DB",
    },
    {
      name: "Redis",
      category: "Backend & DB",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
      tag: "In-memory Caching",
    },
    {
      name: "Node.js",
      category: "Backend & DB",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      tag: "Runtime",
    },
    {
      name: "React",
      category: "Frontend",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      tag: "UI Library",
    },
    {
      name: "Next.js",
      category: "Frontend",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      tag: "Full-Stack Web",
    },
    {
      name: "Tailwind CSS",
      category: "Frontend",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      tag: "Styling & Tokens",
    },
    {
      name: "Docker",
      category: "Cloud & DevOps",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      tag: "Containerization",
    },
    {
      name: "Amazon AWS",
      category: "Cloud & DevOps",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      tag: "Cloud Infrastructure",
    },
    {
      name: "Git & GitHub",
      category: "Cloud & DevOps",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      tag: "Version Control",
    },
    {
      name: "Linux",
      category: "Cloud & DevOps",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
      tag: "OS & Shell",
    },
  ],
  resume: {
    name: "M. R. Tanush Pai",
    title: "AI/ML Engineer · Generative AI & LLM Systems · Agentic AI · Python Backend",
    email: "tanushpai06@gmail.com",
    phone: "+91-9567805222",
    location: "Kerala, India",
    linkedin: "https://linkedin.com/in/tanushpai",
    github: "https://github.com/tanushpai",
    summary:
      "AI Engineer with professional experience building Generative AI, LLM, and agentic systems for enterprise applications. Experienced in developing end-to-end AI solutions involving LLM orchestration, RAG, natural-language data querying, document intelligence, and AI-powered analytics, with strong Python, database, and backend engineering skills.",
    experience: [
      {
        role: "Jr. AI Engineer",
        company: "Sam Corporate",
        location: "Kochi, India",
        period: "Aug 2026 – Present",
        points: [
          "Integrated Apache Superset into the ESG Reporting application as an embedded BI solution, replacing Power BI for dashboarding and reducing significant licensing costs; implemented dynamic RLS based on user IDs with workspace-level data isolation.",
          "Designed and implemented a scalable batch document-processing microservice using Gemini on Google Cloud Vertex AI to semantically extract and normalize information from bills, mapping varying field labels to standardized schema fields and returning structured JSON while concurrently processing 100+ PDFs.",
        ],
      },
      {
        role: "AI/ML Engineer Intern",
        company: "Sam Corporate",
        location: "Kochi, India",
        period: "Feb 2026 – July 2026",
        points: [
          "Architected an agentic AI analytics chatbot with an LLM-based planner that dynamically generates MongoDB aggregation pipelines across 25+ collections, enabling non-technical users to query data using natural language with GDPR-aligned privacy controls.",
          "Built an AI-powered QMS document generation platform adopted by 12+ employees, automating content generation across 10+ templates using LLMs and reducing document turnaround from hours to minutes.",
          "Extended an ESG analytics platform with 8+ modules, including AI-driven report generation, NL2SQL, peer benchmarking, and interactive data visualization, using PostgreSQL, OpenAI API, and Perplexity API.",
          "Improved production LLM reliability by optimizing prompt engineering and API workflows, eliminating HTTP 429 rate-limit errors and stabilizing application performance.",
          "Developed an automated MongoDB data validation tool that cross-checks records across multiple databases and generates Excel reports, replacing manual validation workflows with a single-click process.",
        ],
      },
      {
        role: "Data Analytics Trainee",
        company: "Navodita Infotech",
        location: "Remote",
        period: "Aug 2025 – Sep 2025",
        points: [
          "Built a collaborative filtering recommendation system processing 10K+ user-movie ratings using Python, Pandas, cosine similarity, and NumPy, generating Top-10 personalized recommendations per user.",
        ],
      },
      {
        role: "Data Science Trainee",
        company: "Keltron REC",
        location: "Kochi, India",
        period: "Jun 2025",
        points: [
          "Preprocessed 5+ real-world datasets, built Power BI dashboards, and applied ML fundamentals using Excel and SQL.",
        ],
      },
    ],
    education: [
      {
        degree: "B.Tech in Computer Science (Data Science)",
        institution: "SCMS School of Engineering and Technology",
        location: "Kerala, India",
        period: "Oct 2022 – Apr 2026",
        details: "Affiliated to APJ Abdul Kalam Technological University",
      },
    ],
    skills: {
      languages: ["Python", "TypeScript", "SQL", "R"],
      aiAndGenAI: [
        "LLMs",
        "RAG",
        "Agentic AI",
        "LangChain",
        "LangGraph",
        "Prompt Engineering",
        "Hugging Face",
        "Ollama",
        "OpenAI SDK",
      ],
      databases: ["PostgreSQL", "MongoDB", "Redis", "Pandas", "NumPy"],
      backendAndTools: ["FastAPI", "Prisma", "Vercel", "Git", "GitHub", "Bitbucket", "Jira"],
    },
  },
};

const STORAGE_KEY = "logiq_portfolio_data_v1";

export function getPortfolioData(): PortfolioData {
  if (typeof window === "undefined") {
    return INITIAL_PORTFOLIO_DATA;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PORTFOLIO_DATA));
      return INITIAL_PORTFOLIO_DATA;
    }
    const parsed = JSON.parse(raw);
    return {
      projects: parsed.projects || INITIAL_PORTFOLIO_DATA.projects,
      notes: parsed.notes || INITIAL_PORTFOLIO_DATA.notes,
      certifications: parsed.certifications || INITIAL_PORTFOLIO_DATA.certifications,
      techStack: parsed.techStack || INITIAL_PORTFOLIO_DATA.techStack,
      resume: parsed.resume || INITIAL_PORTFOLIO_DATA.resume,
    };
  } catch (err) {
    console.error("Error loading portfolio data from localStorage", err);
    return INITIAL_PORTFOLIO_DATA;
  }
}

export function savePortfolioData(data: PortfolioData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("portfolio-data-changed", { detail: data }));
  } catch (err) {
    console.error("Error saving portfolio data to localStorage", err);
  }
}

export function resetPortfolioData(): PortfolioData {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PORTFOLIO_DATA));
    window.dispatchEvent(new CustomEvent("portfolio-data-changed", { detail: INITIAL_PORTFOLIO_DATA }));
  }
  return INITIAL_PORTFOLIO_DATA;
}
