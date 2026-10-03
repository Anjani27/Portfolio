// ============================================================
// Knowledge Base — Anjani Kushwaha's Resume Data
// All chatbot responses are sourced exclusively from this file.
// ============================================================

const KNOWLEDGE_BASE = {

  /* -------- identity -------- */
  identity: {
    name: "Anjani Kushwaha",
    location: "Bangalore, India",
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
      company: "Amazon",
      location: "Remote",
      period: "Jun 2025 – Feb 2026",
      bullets: [
        "Worked on LLM evaluation and benchmarking workflows, reviewing 500+ code samples across Java, Python, AWS, and Linux.",
        "Evaluated model-generated responses against structured rubrics covering correctness, instruction following, formatting, completeness, and code quality.",
        "Developed and maintained evaluation workflows and pipelines to identify recurring model failure patterns and generate actionable feedback for model improvement.",
        "Created challenging prompts and edge cases to test model behavior across coding and software-engineering scenarios.",
        "Provided structured feedback and task-level guidance supporting SFT/RLHF-style model improvement workflows.",
        "Collaborated with senior team members to analyze evaluation results and improve the consistency and reliability of model assessments.",
        "Focus: LLM Evaluation · Benchmarking · Python · Java · AWS · Linux · RLHF · Prompt Engineering",
      ],
    },
    {
      role: "LLM Python Engineer (Contract)",
      company: "Turing",
      location: "Remote",
      period: "Sep 2024 – Apr 2025",
      bullets: [
        "Reviewed and evaluated 300+ Python/SQL/ML code implementations per week for correctness, robustness, and adherence to requirements.",
        "Analyzed LLM-generated and developer-submitted solutions across Python, SQL, algorithms, and machine-learning tasks.",
        "Identified edge cases, logical errors, inefficient implementations, and failures against task specifications.",
        "Provided structured technical feedback to improve solution quality and consistency across evaluation workflows.",
        "Worked with evaluation guidelines and quality criteria to assess code behavior across diverse technical problems.",
        "Focus: Python · SQL · Machine Learning · Code Evaluation · LLM Evaluation · Technical Review",
      ],
    },
    {
      role: "Data Analyst Intern",
      company: "Quation Solutions",
      location: "Bangalore, India",
      period: "Jun 2024 – Sep 2024",
      bullets: [
        "Worked on data analysis and reporting tasks involving data cleaning, transformation, and validation.",
        "Used SQL and Python to analyze datasets and identify patterns, inconsistencies, and actionable insights.",
        "Supported data-driven reporting and analysis by preparing structured datasets and validating analytical outputs.",
        "Focus: Python · SQL · Data Analysis · Data Cleaning · Data Validation",
      ],
    },
    {
      role: "Software Development Engineer Intern",
      company: "Microsoft India",
      location: "Hyderabad, India",
      period: "Jul 2023 – Aug 2023",
      bullets: [
        "Worked with the COGS Calculator project as part of the COGS Data & Analytics team.",
        "Contributed to software development and data-related workflows supporting cost-analysis functionality.",
        "Worked with engineering and data concepts to understand requirements, implement changes, and validate application behavior.",
        "Gained experience working in a large-scale engineering environment with structured development and review processes.",
        "Focus: Software Development · Data Analytics · Engineering Workflows · Microsoft",
      ],
    },
  ],

  /* -------- projects -------- */
  projects: [
    {
      title: "PromptCompiler – AI-Powered Prompt Engineering Platform",
      period: "Jun 2026 – Sep 2026",
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
  {
    name: "opinion",
    keywords: ["rate", "good", "great", "best", "how is she", "opinion", "worth", "recommend", "hire", "fit", "suitable", "dumb", "smart", "capable", "talented", "bad", "weak"],
    handler: (query) => {
      const q = query.toLowerCase();
      if (q.includes("dumb") || q.includes("bad") || q.includes("not good") || q.includes("weak")) {
        return `Haha, not even close! 😄 Anjani is a highly skilled AI/ML Engineer with hands-on experience at **Amazon** and **Microsoft**, building production LLM systems, RAG pipelines, and multi-agent architectures.\n\nShe has solved **600+ LeetCode** problems and evaluated **500+ LLM outputs** at Amazon. Definitely not dumb — quite the opposite! 💪`;
      }
      return `Honestly? I'd rate Anjani very highly as an AI engineer! 🌟\n\nWith deep hands-on expertise in **LLMs, RAG, LangGraph, Multi-Agent Systems** and experience at top companies like **Amazon** and **Microsoft**, she's a very strong fit for AI/ML or Backend Engineering roles. 💪`;
    },
  },
];

// Fallback responses for off-topic questions
const FALLBACK_RESPONSES = [
  "I appreciate the curiosity! 😊 However, I'm designed to answer questions **only about Anjani Kushwaha** — her skills, experience, projects, education, and achievements.\n\nTry asking something like:\n- *\"What are Anjani's skills?\"*\n- *\"Tell me about her work at Amazon\"*\n- *\"What projects has she built?\"*",
  "That's an interesting question, but my knowledge is focused specifically on Anjani's professional background.\n\nWould you like to know about her **experience**, **education**, or **projects**?",
  "I'm afraid I can't answer that. 😅 I'm an AI assistant programmed exclusively to share details about Anjani Kushwaha's career and skills.\n\nFeel free to ask me about her **tech stack** or where she has worked!"
];
