// ============================================================
// Knowledge Base — Anjani Kushwaha's Resume Data
// All chatbot responses are sourced exclusively from this file.
// ============================================================

const KNOWLEDGE_BASE = {

  /* -------- identity -------- */
  identity: {
    name: "Anjani Kushwaha",
    location: "Lucknow, India",
    email: "anjkus27@gmail.com",
    linkedin: "https://www.linkedin.com/in/anjani-kushwaha-245a42210",
    github: "https://github.com/Anjani27",
    summary:
      "Backend and AI/ML Engineer with 1.5+ years building robust backend architectures (FastAPI, Spring Boot), Generative AI applications, and Retrieval-Augmented Generation (RAG) systems. Experienced in microservices development, REST API design, and agentic AI pipelines. Passionate about engineering reliable, scalable, and high-performance backend systems.",
  },

  /* -------- skills -------- */
  skills: {
    programming: ["Python", "SQL", "C++", "Java"],
    generativeAI: [
      "LLMs",
      "Retrieval-Augmented Generation (RAG)",
      "Multi-Agent Systems",
      "LangGraph",
      "LangChain",
      "FAISS",
      "Transformers",
      "NLP",
      "RLHF",
      "Prompt Engineering",
      "Fine-tuning",
      "Deep Learning",
      "Embeddings",
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "Evaluation Frameworks",
      "Model Interpretability",
      "Hugging Face",
    ],
    mlops: [
      "FastAPI",
      "REST APIs",
      "PostgreSQL",
      "Docker",
      "Vector Databases",
      "Model Deployment",
      "MLOps",
      "EDA",
      "Data Visualization",
      "Power BI",
      "Benchmarking",
      "Git",
      "GCP",
      "Supabase",
      "MCP",
      "TypeScript",
      "Streamlit",
      "Spring Boot",
    ],
  },

  /* -------- experience -------- */
  experience: [
    {
      role: "Software Development Engineer I (Contract)",
      company: "Amazon via Aditi Consulting",
      location: "Remote",
      period: "Jun 2025 – Feb 2026",
      bullets: [
        "Designed and executed RLHF-based model evaluation workflows across 500+ LLM outputs, applying structured performance metrics to identify reasoning failures and improve model accuracy, robustness, and instruction adherence.",
        "Designed benchmarking and evaluation frameworks to assess response quality, instruction adherence, and hallucination patterns; findings fed directly into model training cycles.",
      ],
    },
    {
      role: "LLM Python Engineer (Contract)",
      company: "Turing",
      location: "Remote",
      period: "Sep 2024 – Apr 2025",
      bullets: [
        "Executed large-scale LLM evaluation and validation workflows across Python, SQL, and ML tasks; evaluated 300+ model responses per week to improve output quality and instruction adherence.",
        "Contributed to prompt optimization workflows through systematic error analysis, improving model consistency across multi-step reasoning tasks.",
      ],
    },
    {
      role: "Data Analyst Intern",
      company: "Quation Solutions Pvt. Ltd",
      location: "Lucknow, India",
      period: "Jun 2024 – Aug 2024",
      bullets: [
        "Conducted exploratory data analysis (EDA), demand forecasting, and CPG analysis using Python and SQL across 3+ product categories; surfaced actionable insights for business stakeholders.",
        "Built Power BI dashboards adopted by the analytics team to support weekly data-driven decision-making.",
      ],
    },
    {
      role: "Software Engineer Intern",
      company: "Microsoft India (R&D) Pvt. Ltd",
      location: "Hyderabad, India",
      period: "Jul 2023 – Aug 2023",
      bullets: [
        "Designed and developed a COGS Calculator to forecast cost impact of new features over a 3-year horizon; used by the team to evaluate 10+ feature proposals.",
        "Implemented automated monitoring and alerting workflows to track cost deviations post-deployment, reducing manual review effort by ~30%.",
      ],
    },
  ],

  /* -------- projects -------- */
  projects: [
    {
      title: "PromptCompiler – AI-Powered Prompt Engineering Platform",
      period: "Jun 2026 – Present",
      tech: ["LangGraph", "FastAPI", "Docker", "Groq (LLaMA)", "Supabase", "Next.js"],
      liveDemo: "https://prompt-compiler-frontend.vercel.app/",
      github: null,
      bullets: [
        "Built and deployed a SaaS platform using LangGraph and FastAPI that transforms user intent into structured, platform-optimized prompts through an 8-stage multi-agent AI pipeline.",
        "Engineered scalable backend with JWT authentication, usage tracking, and LLM integration via Groq-hosted LLaMA; containerized with Docker and deployed on Vercel + cloud backend.",
      ],
    },
    {
      title: "Interactive AI Assistant (RAG-based)",
      period: "Dec 2025 – Feb 2026",
      tech: ["LangChain", "FastAPI", "FAISS", "SSE Streaming", "Python", "LLM APIs"],
      liveDemo: null,
      github: null,
      bullets: [
        "Developed a production-grade RAG system using FastAPI, FAISS, and LLM APIs with real-time SSE streaming, achieving sub-500ms response latency for document Q&A.",
        "Built end-to-end document ingestion, chunking, embedding, and semantic retrieval pipeline; reduced hallucination rate by ~40% compared to direct LLM prompting on domain documents.",
      ],
    },
    {
      title: "LinkedIn Job Scraper MCP Server",
      period: "Jun 2026",
      tech: ["TypeScript", "MCP", "Web Scraping", "LinkedIn API"],
      liveDemo: null,
      github: "https://github.com/Anjani27/Linkedin-Job-Scraper-MCP-Server",
      bullets: [
        "Built an MCP (Model Context Protocol) server that scrapes LinkedIn job listings, enabling AI agents to search and retrieve job data programmatically.",
        "Implemented structured data extraction and tool integration for seamless use with LLM-based agent workflows.",
      ],
    },
    {
      title: "Remote MCP Server – Expense Tracking",
      period: "Oct 2025",
      tech: ["Python", "MCP", "FastAPI", "Remote Deployment"],
      liveDemo: null,
      github: "https://github.com/Anjani27/Remote-mcp-server",
      bullets: [
        "Developed a remote MCP server for expense tracking, enabling AI agents to manage and query financial data through the Model Context Protocol.",
        "Deployed as a remote-accessible server with structured tool definitions for seamless AI integration.",
      ],
    },
    {
      title: "YouTube Chatbot – LangChain & HuggingFace",
      period: "May 2025",
      tech: ["Python", "LangChain", "HuggingFace", "Streamlit", "NLP"],
      liveDemo: null,
      github: "https://github.com/Anjani27/YoutubeChatbot-LangChain-HuggingFace-Streamlit",
      bullets: [
        "Built an interactive chatbot that answers questions about YouTube video content using LangChain and HuggingFace embeddings.",
        "Implemented a Streamlit UI for real-time video transcript Q&A with semantic search capabilities.",
      ],
    },
    {
      title: "AI-Powered Portfolio (Full-Stack)",
      period: "Jun 2026 – Present",
      tech: ["FastAPI", "Python", "LangChain", "Groq (LLaMA)", "HTML/CSS", "JavaScript"],
      liveDemo: "https://anjani27.github.io/Porfolio/",
      github: "https://github.com/Anjani27/Porfolio",
      bullets: [
        "Built and deployed a full-stack professional portfolio featuring a glassmorphic HTML/CSS/JS frontend and an interactive RAG chatbot backend.",
        "Engineered the AI assistant using FastAPI and LangChain connected to Groq LLaMA 3.3, supporting real-time streaming answers via Server-Sent Events (SSE) and client-side offline fallback.",
      ],
    },
  ],

  /* -------- education -------- */
  education: [
    {
      degree: "B.Tech in Computer Science and Engineering",
      institution: "Pranveer Singh Institute of Technology",
      period: "2020 – 2024",
      cgpa: "8.3/10",
    },
  ],

  /* -------- achievements -------- */
  achievements: [
    "Selected among top 6% (3K/50K) in Microsoft Engage Program'22; secured internship at Microsoft.",
    "1500+ LeetCode rating.",
    "5-Star Problem Solving on HackerRank.",
    "Hacktoberfest contributor.",
  ],
};

// ============================================================
// Intent definitions — keywords that map a user query to a topic
// ============================================================

const INTENTS = [
  {
    name: "greeting",
    keywords: ["hi", "hello", "hey", "howdy", "greetings", "sup", "yo", "hola", "namaste"],
    handler: () =>
      `Hey there! 👋 I'm Anjani's AI assistant. I can tell you about her **skills**, **experience**, **projects**, **education**, and **achievements**. What would you like to know?`,
  },
  {
    name: "identity",
    keywords: ["who", "about", "introduce", "tell me about", "yourself", "anjani", "him", "background", "summary", "describe"],
    handler: () => {
      const d = KNOWLEDGE_BASE.identity;
      return `**${d.name}** is based in ${d.location}.\n\n${d.summary}\n\n📧 ${d.email}  •  [LinkedIn](${d.linkedin})  •  [GitHub](${d.github})`;
    },
  },
  {
    name: "skills",
    keywords: ["skill", "skills", "technologies", "tech stack", "tools", "programming", "language", "languages", "know", "proficient", "expertise", "python", "sql", "c++", "pytorch", "tensorflow", "langchain", "langgraph", "faiss", "docker", "fastapi", "gcp", "nlp", "deep learning", "machine learning", "ml", "ai", "generative", "rag", "llm", "llms"],
    handler: (query) => {
      const s = KNOWLEDGE_BASE.skills;
      // Check if asking about a specific skill
      const allSkills = [...s.programming, ...s.generativeAI, ...s.mlops];
      const q = query.toLowerCase();
      const matched = allSkills.filter((sk) => q.includes(sk.toLowerCase()));
      if (matched.length > 0) {
        return `Yes! Anjani is skilled in **${matched.join(", ")}**. 🎯\n\nWant to know more about her full skill set or a specific area?`;
      }
      return `### 💻 Programming\n${s.programming.join("  •  ")}\n\n### 🤖 Generative AI & ML\n${s.generativeAI.join("  •  ")}\n\n### ⚙️ MLOps & Systems\n${s.mlops.join("  •  ")}`;
    },
  },
  {
    name: "experience",
    keywords: ["experience", "work", "job", "career", "company", "companies", "worked", "role", "position", "amazon", "turing", "microsoft", "quation", "intern", "internship", "sde", "engineer", "contract"],
    handler: (query) => {
      const exps = KNOWLEDGE_BASE.experience;
      const q = query.toLowerCase();
      // Check for specific company
      const companyMatch = exps.find(
        (e) =>
          q.includes(e.company.toLowerCase().split(" ")[0].toLowerCase()) ||
          q.includes(e.company.toLowerCase())
      );
      if (companyMatch) {
        return `### ${companyMatch.role}\n**${companyMatch.company}** · ${companyMatch.location} · ${companyMatch.period}\n\n${companyMatch.bullets.map((b) => `- ${b}`).join("\n")}`;
      }
      return exps
        .map(
          (e) =>
            `### ${e.role}\n**${e.company}** · ${e.location} · ${e.period}\n${e.bullets.map((b) => `- ${b}`).join("\n")}`
        )
        .join("\n\n---\n\n");
    },
  },
  {
    name: "projects",
    keywords: ["project", "projects", "built", "build", "developed", "portfolio", "promptcompiler", "prompt compiler", "rag", "assistant", "saas", "platform", "demo", "mcp", "youtube", "chatbot", "expense", "scraper", "linkedin job"],
    handler: (query) => {
      const projs = KNOWLEDGE_BASE.projects;
      const q = query.toLowerCase();
      const projMatch = projs.find((p) => {
        const titleWords = p.title.toLowerCase().split(/[\s–-]+/);
        return titleWords.some((w) => w.length > 3 && q.includes(w));
      });
      if (projMatch) {
        const demoLink = projMatch.liveDemo ? `\n\n🔗 [Live Demo](${projMatch.liveDemo})` : "";
        return `### ${projMatch.title}\n📅 ${projMatch.period}  •  🛠️ ${projMatch.tech.join(", ")}\n\n${projMatch.bullets.map((b) => `- ${b}`).join("\n")}${demoLink}`;
      }
      return projs
        .map((p) => {
          const demoLink = p.liveDemo ? `  •  [Live Demo](${p.liveDemo})` : "";
          return `### ${p.title}\n📅 ${p.period}  •  🛠️ ${p.tech.join(", ")}${demoLink}\n${p.bullets.map((b) => `- ${b}`).join("\n")}`;
        })
        .join("\n\n---\n\n");
    },
  },
  {
    name: "education",
    keywords: ["education", "college", "university", "degree", "btech", "b.tech", "cgpa", "gpa", "study", "studied", "school", "institute", "pranveer", "qualification", "academic"],
    handler: () => {
      const edu = KNOWLEDGE_BASE.education[0];
      return `### 🎓 ${edu.degree}\n**${edu.institution}**\n📅 ${edu.period}  •  CGPA: **${edu.cgpa}**`;
    },
  },
  {
    name: "achievements",
    keywords: ["achievement", "achievements", "accomplishment", "award", "leetcode", "hackerrank", "hacktoberfest", "microsoft engage", "rating", "competitive", "coding"],
    handler: () => {
      return `### 🏆 Achievements\n\n${KNOWLEDGE_BASE.achievements.map((a) => `- ${a}`).join("\n")}`;
    },
  },
  {
    name: "contact",
    keywords: ["contact", "email", "reach", "connect", "linkedin", "github", "hire", "mail"],
    handler: () => {
      const d = KNOWLEDGE_BASE.identity;
      return `### 📬 Get in Touch\n\n- 📧 Email: [${d.email}](mailto:${d.email})\n- 💼 [LinkedIn](${d.linkedin})\n- 🐙 [GitHub](${d.github})`;
    },
  },
  {
    name: "phone",
    keywords: ["phone", "whatsapp", "call", "mobile", "number", "wa.me", "cell", "contact number"],
    handler: () => {
      return `For privacy reasons, Anjani's phone and WhatsApp numbers are not shared publicly. Please reach out to her via email or LinkedIn! 📬`;
    },
  },
  {
    name: "resume",
    keywords: ["resume", "cv", "download"],
    handler: () => {
      return `You can view all of Anjani's professional details right here! Just ask me about her **skills**, **experience**, **projects**, **education**, or **achievements**. 📄`;
    },
  },
];

// Fallback response for off-topic questions
const FALLBACK_RESPONSE =
  "I appreciate the curiosity! 😊 However, I'm designed to answer questions **only about Anjani Kushwaha** — her skills, experience, projects, education, and achievements.\n\nTry asking something like:\n- *\"What are Anjani's skills?\"*\n- *\"Tell me about her work at Amazon\"*\n- *\"What projects has she built?\"*";
