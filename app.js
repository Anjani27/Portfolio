// ============================================================
// App.js — Main portfolio interactions & animations
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // ---- Navbar scroll effect ----
  const navbar = document.getElementById("navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    lastScroll = currentScroll;
  });

  // ---- Mobile menu toggle ----
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navLinks.classList.toggle("open");
  });

  // Close menu on link click
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navLinks.classList.remove("open");
    });
  });

  // ---- Typing effect for hero tagline ----
  const typingEl = document.getElementById("typingText");
  const phrases = [
    "AI/ML Engineer building intelligent systems.",
    "Crafting RAG pipelines & LLM evaluations.",
    "Turning complex data into actionable insights.",
    "Passionate about Generative AI & MLOps.",
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 60;

  function typeWriter() {
    const current = phrases[phraseIdx];

    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 30;
    } else {
      typingEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 60;
    }

    if (!isDeleting && charIdx === current.length) {
      typeSpeed = 2000; // pause at end
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typeSpeed = 400; // pause before next phrase
    }

    setTimeout(typeWriter, typeSpeed);
  }

  typeWriter();

  // ---- Intersection Observer for section reveal ----
  const sections = document.querySelectorAll(".section-hidden");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  sections.forEach((section) => revealObserver.observe(section));

  // ---- Animated stat counters ----
  const statNumbers = document.querySelectorAll(".stat-number");
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;

    const heroSection = document.getElementById("hero");
    const rect = heroSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      statsAnimated = true;

      statNumbers.forEach((el) => {
        const target = parseFloat(el.dataset.count);
        const duration = 2000;
        const start = performance.now();

        function updateCount(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = target * eased;

          if (target >= 100) {
            el.textContent = Math.round(current) + "+";
          } else if (target % 1 !== 0) {
            el.textContent = current.toFixed(1) + "+";
          } else {
            el.textContent = Math.round(current) + "+";
          }

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          }
        }

        requestAnimationFrame(updateCount);
      });
    }
  }

  window.addEventListener("scroll", animateStats);
  animateStats(); // check on load

  // ---- Smooth scroll for nav links ----
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  // ---- Staggered animation for skill tags ----
  const skillTags = document.querySelectorAll(".skill-tag");
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const tags = entry.target.querySelectorAll(".skill-tag");
          tags.forEach((tag, i) => {
            tag.style.opacity = "0";
            tag.style.transform = "translateY(10px)";
            setTimeout(() => {
              tag.style.transition = "opacity 0.3s ease, transform 0.3s ease";
              tag.style.opacity = "1";
              tag.style.transform = "translateY(0)";
            }, i * 40);
          });
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".skill-category").forEach((cat) => {
    skillObserver.observe(cat);
  });

  // ---- Timeline stagger animation ----
  const timelineItems = document.querySelectorAll(".timeline-item");
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "0";
          entry.target.style.transform = "translateX(-20px)";
          setTimeout(() => {
            entry.target.style.transition =
              "opacity 0.6s ease, transform 0.6s ease";
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateX(0)";
          }, 100);
          timelineObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  timelineItems.forEach((item) => timelineObserver.observe(item));

  // ---- Chat tooltip auto-show ----
  const chatTooltip = document.getElementById("chatTooltip");
  setTimeout(() => {
    chatTooltip.classList.add("show");
    setTimeout(() => {
      chatTooltip.classList.remove("show");
    }, 5000);
  }, 3000);

  // ---- Fetch & render GitHub projects dynamically ----
  const BACKEND_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:8000"
    : "https://porfolio-backend-48yy.onrender.com"; // Change to your deployed backend URL

  async function fetchGitHubProjects() {
    const grid = document.getElementById("projectsGrid");
    if (!grid) return;

    // Featured projects we want to keep static (or avoid duplicating)
    const featuredTitles = ["promptcompiler", "interactive ai assistant", "linkedin_job_tracker"];

    // First try the local Python FastAPI backend
    let projects = [];
    try {
      const res = await fetch(`${BACKEND_URL}/api/projects`);
      if (res.ok) {
        const data = await res.json();
        projects = data.projects || [];
        console.log("Projects loaded from FastAPI backend:", projects);
      }
    } catch (err) {
      console.warn("FastAPI backend offline, falling back directly to public GitHub API...", err);
      try {
        const res = await fetch("https://api.github.com/users/Anjani27/repos?sort=updated&per_page=30");
        if (res.ok) {
          const repos = await res.json();
          projects = repos
            .filter(r => !r.fork && r.name !== "Anjani27")
            .map(r => ({
              title: r.name,
              description: r.description,
              language: r.language,
              stars: r.stargazers_count,
              url: r.html_url
            }));
          console.log("Projects loaded directly from GitHub API:", projects);
        }
      } catch (ghErr) {
        console.error("Failed to load projects from GitHub API:", ghErr);
        return;
      }
    }

    if (projects.length === 0) return;

    // Helper to extract tech tags from repo name and description
    function extractTechTags(title, description, primaryLanguage) {
      const textToScan = `${title} ${description || ""}`.toLowerCase();
      const tags = new Set();
      
      const techKeywords = {
        "langchain": "LangChain",
        "langgraph": "LangGraph",
        "huggingface": "Hugging Face",
        "streamlit": "Streamlit",
        "fastapi": "FastAPI",
        "mcp": "MCP",
        "typescript": "TypeScript",
        "python": "Python",
        "pytorch": "PyTorch",
        "tensorflow": "TensorFlow",
        "faiss": "FAISS",
        "deep learning": "Deep Learning",
        "rag": "RAG",
        "llm": "LLMs",
        "nlp": "NLP",
        "postgre": "PostgreSQL",
        "docker": "Docker",
        "supabase": "Supabase",
        "power bi": "Power BI",
        "selenium": "Selenium",
        "scrap": "Web Scraping",
        "engage": "Microsoft Engage",
        "cosine similarity": "Recommendation Engine",
        "recommend": "Recommendation Engine",
        "next.js": "Next.js",
        "react": "React",
        "node": "Node.js"
      };

      for (const [key, value] of Object.entries(techKeywords)) {
        if (textToScan.includes(key)) {
          tags.add(value);
        }
      }

      // Add primary language if it's not Jupyter Notebook
      if (primaryLanguage && primaryLanguage !== "Jupyter Notebook") {
        tags.add(primaryLanguage);
      } else if (primaryLanguage === "Jupyter Notebook") {
        tags.add("Python");
      }

      // Default fallback if no tags detected
      if (tags.size === 0) {
        tags.add("Python");
      }

      return Array.from(tags).slice(0, 4); // Limit to 4 tags
    }

    // Keep the first 2 static cards (PromptCompiler & RAG Assistant)
    // and remove any other placeholder cards if present
    const cards = Array.from(grid.querySelectorAll(".project-card"));
    if (cards.length > 2) {
      for (let i = 2; i < cards.length; i++) {
        cards[i].remove();
      }
    }

    // Append dynamic cards
    projects.forEach(p => {
      // Avoid duplicating featured ones
      if (featuredTitles.some(title => p.title.toLowerCase().includes(title))) return;

      const card = document.createElement("div");
      card.className = "project-card section-hidden section-visible"; // Mark visible immediately
      card.style.opacity = "1";
      card.style.transform = "none";
      card.style.cursor = "pointer";

      // Make the entire card clickable
      card.addEventListener("click", (e) => {
        // Don't trigger if user is selecting text or clicking a link directly
        if (e.target.closest("a") || window.getSelection().toString()) return;
        window.open(p.url, "_blank", "noopener,noreferrer");
      });

      const desc = p.description || "An open-source project created by Anjani Kushwaha. Check out the repository for details.";
      const starsTag = p.stars > 0 ? `<span class="tech-tag">⭐ ${p.stars}</span>` : "";

      // Extract tech tags
      const techTags = extractTechTags(p.title, p.description, p.language);
      const techTagsHTML = techTags.map(tag => `<span class="tech-tag">${tag}</span>`).join("\n");

      card.innerHTML = `
        <div class="project-card-header">
          <span class="project-icon">📂</span>
          <div class="project-links">
            <a href="${p.url}" target="_blank" rel="noopener noreferrer" title="View Source on GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
        <h3 class="project-title">
          <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="project-title-link">${p.title}</a>
        </h3>
        <div class="project-description">
          <p>${desc}</p>
        </div>
        <div class="project-tech">
          ${techTagsHTML}
          ${starsTag}
        </div>
      `;
      grid.appendChild(card);
    });
  }

  fetchGitHubProjects();
});
