# Anjani Kushwaha's Resume Data - Source of Truth for Python AI Agent

RESUME_DATA = {
    "identity": {
        "name": "Anjani Kushwaha",
        "location": "Bangalore, India",
        "email": "anjkus27@gmail.com",
        "linkedin": "https://www.linkedin.com/in/anjani-kushwaha-245a42210",
        "github": "https://github.com/Anjani27",
        "summary": (
            "Backend and AI/ML Engineer with 1.5+ years building robust backend architectures (FastAPI, Spring Boot), "
            "Generative AI applications, and Retrieval-Augmented Generation (RAG) systems. Experienced in "
            "microservices development, REST API optimization, and agentic AI pipelines. "
            "Passionate about engineering reliable, scalable, and high-performance backend systems."
        )
    },
    "skills": {
        "programming": ["Python", "SQL", "C++", "Java"],
        "generative_ai_and_ml": [
            "LLMs", "Retrieval-Augmented Generation (RAG)", "Multi-Agent Systems",
            "LangGraph", "LangChain", "FAISS", "ChromaDB", "Transformers", "NLP", "RLHF",
            "Prompt Engineering", "Fine-tuning", "Deep Learning", "Embeddings",
            "PyTorch", "TensorFlow", "scikit-learn", "Evaluation Frameworks",
            "Model Interpretability", "Hugging Face"
        ],
        "mlops_and_systems": [
            "FastAPI", "REST APIs", "PostgreSQL", "Docker", "Vector Databases",
            "Model Deployment", "MLOps", "EDA", "Data Visualization", "Power BI",
            "Benchmarking", "Git", "GCP", "Supabase", "MCP (Model Context Protocol)",
            "TypeScript", "Streamlit", "Spring Boot"
        ]
    },
    "experience": [
        {
            "role": "Software Development Engineer I (Contract)",
            "company": "Amazon",
            "location": "Remote",
            "period": "Jun 2025 – Feb 2026",
            "bullets": [
                "Worked on LLM evaluation and benchmarking workflows, reviewing 500+ code samples across Java, Python, AWS, and Linux.",
                "Evaluated model-generated responses against structured rubrics covering correctness, instruction following, formatting, completeness, and code quality.",
                "Developed and maintained evaluation workflows and pipelines to identify recurring model failure patterns and generate actionable feedback for model improvement.",
                "Created challenging prompts and edge cases to test model behavior across coding and software-engineering scenarios.",
                "Provided structured feedback and task-level guidance supporting SFT/RLHF-style model improvement workflows.",
                "Collaborated with senior team members to analyze evaluation results and improve the consistency and reliability of model assessments.",
                "Focus: LLM Evaluation · Benchmarking · Python · Java · AWS · Linux · RLHF · Prompt Engineering"
            ]
        },
        {
            "role": "LLM Python Engineer (Contract)",
            "company": "Turing",
            "location": "Remote",
            "period": "Sep 2024 – Apr 2025",
            "bullets": [
                "Reviewed and evaluated 300+ Python/SQL/ML code implementations per week for correctness, robustness, and adherence to requirements.",
                "Analyzed LLM-generated and developer-submitted solutions across Python, SQL, algorithms, and machine-learning tasks.",
                "Identified edge cases, logical errors, inefficient implementations, and failures against task specifications.",
                "Provided structured technical feedback to improve solution quality and consistency across evaluation workflows.",
                "Worked with evaluation guidelines and quality criteria to assess code behavior across diverse technical problems.",
                "Focus: Python · SQL · Machine Learning · Code Evaluation · LLM Evaluation · Technical Review"
            ]
        },
        {
            "role": "Data Analyst Intern",
            "company": "Quation Solution Private Limited",
            "location": "Bangalore, India",
            "period": "Jun 2024 – Sep 2024",
            "bullets": [
                "Worked on data analysis and reporting tasks involving data cleaning, transformation, and validation.",
                "Used SQL and Python to analyze datasets and identify patterns, inconsistencies, and actionable insights.",
                "Supported data-driven reporting and analysis by preparing structured datasets and validating analytical outputs.",
                "Focus: Python · SQL · Data Analysis · Data Cleaning · Data Validation"
            ]
        },
        {
            "role": "Software Development Engineer Intern",
            "company": "Microsoft India",
            "location": "Hyderabad, India",
            "period": "Jul 2023 – Aug 2023",
            "bullets": [
                "Worked with the COGS Calculator project as part of the COGS Data & Analytics team.",
                "Contributed to software development and data-related workflows supporting cost-analysis functionality.",
                "Worked with engineering and data concepts to understand requirements, implement changes, and validate application behavior.",
                "Gained experience working in a large-scale engineering environment with structured development and review processes.",
                "Focus: Software Development · Data Analytics · Engineering Workflows · Microsoft"
            ]
        }
    ],
    "featured_projects": [
        {
            "title": "PromptCompiler – AI-Powered Prompt Engineering Platform",
            "period": "Jun 2026 – Present",
            "tech": ["LangGraph", "FastAPI", "Docker", "Groq (LLaMA)", "Supabase", "Next.js"],
            "liveDemo": "https://prompt-compiler-frontend.vercel.app/",
            "bullets": [
                "Built and deployed a SaaS platform using LangGraph and FastAPI that transforms user intent into structured, platform-optimized prompts through an 8-stage multi-agent AI pipeline.",
                "Engineered scalable backend with JWT authentication, usage tracking, and LLM integration via Groq-hosted LLaMA; containerized with Docker and deployed on Vercel + cloud backend."
            ]
        },
        {
            "title": "Interactive AI Assistant (RAG-based)",
            "period": "Dec 2025 – Feb 2026",
            "tech": ["LangChain", "FastAPI", "FAISS", "SSE Streaming", "Python", "LLM APIs"],
            "liveDemo": None,
            "bullets": [
                "Developed a production-grade RAG system using FastAPI, FAISS, and LLM APIs with real-time SSE streaming, achieving sub-500ms response latency for document Q&A.",
                "Built end-to-end document ingestion, chunking, embedding, and semantic retrieval pipeline; reduced hallucination rate by ~40% compared to direct LLM prompting on domain documents."
            ]
        },
        {
            "title": "AI-Powered Portfolio (Full-Stack)",
            "period": "Mar 2026 – Mar 2026",
            "tech": ["FastAPI", "Python", "LangChain", "Groq (LLaMA)", "HTML/CSS", "JavaScript"],
            "liveDemo": "https://anjani27.github.io/Porfolio/",
            "bullets": [
                "Built and deployed a full-stack professional portfolio featuring a glassmorphic HTML/CSS/JS frontend and an interactive RAG chatbot backend.",
                "Engineered the AI assistant using FastAPI and LangChain connected to Groq LLaMA 3.3, supporting real-time streaming answers via Server-Sent Events (SSE) and client-side offline fallback."
            ]
        }
    ],
    "achievements": [
        "Selected among top 6% (3K/50K) in Microsoft Engage Program'22; secured internship at Microsoft",
        "1500+ LeetCode rating",
        "5-Star Problem Solving on HackerRank",
        "Hacktoberfest contributor"
    ],
    "education": [
        {
            "degree": "B.Tech in Computer Science and Engineering",
            "institution": "Pranveer Singh Institute of Technology",
            "period": "2020 – 2024",
            "cgpa": "8.3/10"
        }
    ]
}
