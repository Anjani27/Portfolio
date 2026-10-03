import os
import httpx
from pathlib import Path
from typing import List, Dict, Any, Generator
from dotenv import load_dotenv

# Import LangChain components
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from langchain_groq import ChatGroq

from backend.resume_data import RESUME_DATA

# Load environment variables - check both backend/ dir and project root
_backend_env = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=_backend_env if _backend_env.exists() else None)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GITHUB_USERNAME = os.getenv("GITHUB_USERNAME", "Anjani27")

# Define the System Prompt to enforce strict guardrails and correct pronouns (she/her)
SYSTEM_INSTRUCTION = """You are Anjani's AI Assistant. Anjani Kushwaha is a female Data Scientist and AI/ML Engineer. 
All pronouns referring to Anjani must be female (she/her/hers).

YOUR RULES:
1. You can ONLY answer questions related to Anjani's education, skills, work experience, projects, contact details, and achievements.
2. Under no circumstances should you answer off-topic questions (e.g., weather, cooking recipes, general programming help, news, history, other people). If a question is not about Anjani, her background, or her work, you MUST politely decline and steer the user back to asking about Anjani's skills, projects, and experience.
3. Be professional, friendly, and concise in your responses. 
4. Always use Markdown for formatting list items, headers, links, and bold text.
5. If asked about Anjani's phone number or WhatsApp number, explicitly state that for privacy reasons they are not shared publicly, and direct the user to contact her via email or LinkedIn.

Knowledge base for Anjani:
- Summary: {summary}
- Contact: Email: {email}, LinkedIn: {linkedin}, GitHub: {github}, Location: {location}
- Education: {education}
- Achievements: {achievements}
- Skills: {skills}
- Work Experience: {experience}
- Featured Projects: {featured_projects}
"""

def fetch_live_github_projects() -> List[Dict[str, Any]]:
    """Helper function to fetch live repositories of Anjani Kushwaha from GitHub API."""
    url = f"https://api.github.com/users/{GITHUB_USERNAME}/repos?sort=updated&per_page=30"
    headers = {"User-Agent": "Anjani-Portfolio-Agent"}
    try:
        response = httpx.get(url, headers=headers, timeout=10.0)
        if response.status_code == 200:
            repos = response.json()
            filtered_repos = []
            for r in repos:
                # Filter out forks and profile README
                if not r.get("fork") and r.get("name") != GITHUB_USERNAME:
                    filtered_repos.append({
                        "title": r.get("name"),
                        "description": r.get("description"),
                        "language": r.get("language"),
                        "topics": r.get("topics", []),  # Fetch topics (tags) containing tools/frameworks
                        "stars": r.get("stargazers_count"),
                        "url": r.get("html_url"),
                        "updated_at": r.get("updated_at")
                    })
            return filtered_repos
    except Exception as e:
        print(f"Error fetching GitHub repos: {e}")
    return []

# Models to try in order of preference (fallback if one is unavailable)
GROQ_MODELS = [
    "qwen/qwen3.8-27b",
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b",
    "allam-2-7b"
]

def get_llm(model_name: str = None):
    """Return a ChatGroq instance for the given model (or first in list)."""
    if not GROQ_API_KEY:
        return None
    target = model_name or GROQ_MODELS[0]
    return ChatGroq(
        temperature=0.2,
        model_name=target,
        groq_api_key=GROQ_API_KEY
    )

def _is_model_error(e: Exception) -> bool:
    """Returns True if the error is due to a bad/decommissioned model (safe to retry)."""
    msg = str(e).lower()
    return any(k in msg for k in ["model_not_found", "not exist", "decommissioned", "model_decommissioned", "404"])

def format_system_prompt() -> str:
    """Format the system prompt with resume data."""
    id_data = RESUME_DATA["identity"]
    return SYSTEM_INSTRUCTION.format(
        summary=id_data["summary"],
        email=id_data["email"],
        linkedin=id_data["linkedin"],
        github=id_data["github"],
        location=id_data["location"],
        education=str(RESUME_DATA["education"]),
        achievements=", ".join(RESUME_DATA["achievements"]),
        skills=str(RESUME_DATA["skills"]),
        experience=str(RESUME_DATA["experience"]),
        featured_projects=str(RESUME_DATA["featured_projects"])
    )

def stream_chat_response(query: str, history: List[Dict[str, str]] = None) -> Generator[str, None, None]:
    """Generates a streamed chat response from the agent."""

    def _local_fallback(q: str):
        """Conversational rule-based fallback — handles natural language questions."""
        yield "*(Note: My live AI connection is currently offline, but I can still answer this!)*\n\n"
        
        q = q.lower()
        skills = RESUME_DATA["skills"]
        id_data = RESUME_DATA["identity"]

        # --- Greetings ---
        if any(g in q for g in ["hi", "hello", "hey", "sup", "howdy", "what's up", "whats up"]):
            yield (
                "Hey there! 👋 Great to have you here. I'm Anjani's personal AI assistant — "
                "I know everything about her background, skills, projects, and experience.\n\n"
                "What would you like to know about her? 😊"
            )

        # --- Rating / Opinion questions ---
        elif any(w in q for w in ["rate", "good", "great", "best", "how is she", "opinion", "worth", "recommend", "hire", "fit", "suitable", "dumb", "smart", "capable", "talented"]):
            if any(neg in q for neg in ["dumb", "bad", "not good", "weak"]):
                yield (
                    "Haha, not even close! 😄 Anjani is a highly skilled AI/ML Engineer with hands-on experience at "
                    "**Amazon** and **Microsoft**, building production LLM systems, RAG pipelines, and multi-agent architectures.\n\n"
                    "She has:\n"
                    "- 🏆 Solved **600+ LeetCode** problems\n"
                    "- 🤖 Built and evaluated **500+ LLM outputs** at Amazon\n"
                    "- 🎓 Strong academic background with solid CGPA(8.3)\n\n"
                    "Definitely not dumb — quite the opposite! 💪"
                )
            else:
                exp = RESUME_DATA["experience"]
                yield (
                    "Honestly? I'd rate Anjani very highly as an AI engineer! 🌟\n\n"
                    "Here's why:\n\n"
                    f"- 💼 She has worked at **{exp[0]['company']}** and **{exp[2]['company']}** — building real production AI systems\n"
                    f"- 🤖 Deep hands-on expertise in **LLMs, RAG, LangGraph, Multi-Agent Systems**\n"
                    f"- 🐍 Strong in **Python, FastAPI, PyTorch, TensorFlow, LangChain**\n"
                    f"- 🏆 500+ LeetCode problems solved — solid problem-solving fundamentals\n"
                    f"- 📦 End-to-end experience: from model evaluation to deployment\n\n"
                    "For an AI/ML or Backend Engineering role, she's a strong fit. 💪"
                )

        # --- Skills ---
        elif any(w in q for w in ["skill", "tech", "know", "expertise", "proficient", "stack", "language", "tool", "framework"]):
            yield (
                "Anjani has a strong, well-rounded tech stack! Here's a breakdown:\n\n"
                f"**💻 Programming:** {', '.join(skills['programming'])}\n\n"
                f"**🤖 Generative AI & ML:** {', '.join(skills['generative_ai_and_ml'])}\n\n"
                f"**⚙️ MLOps & Systems:** {', '.join(skills['mlops_and_systems'])}\n\n"
                "She's particularly strong in the GenAI space — RAG pipelines, LLM evaluation, and multi-agent systems are her bread and butter. 🚀"
            )

        # --- Experience / Work ---
        elif any(w in q for w in ["experience", "work", "job", "company", "career", "role", "amazon", "microsoft", "turing", "intern"]):
            exp = RESUME_DATA["experience"]
            yield "Anjani has built a solid career across AI, ML, and software engineering roles. Here's her journey:\n\n"
            for e in exp:
                yield f"**{e['role']}** @ *{e['company']}* · {e['period']}\n"
                yield f"- {e['bullets'][0]}\n\n"
            yield "She's progressed from a Microsoft intern to leading LLM evaluation workflows at Amazon — that's a great trajectory! 📈"

        # --- Projects ---
        elif any(w in q for w in ["project", "build", "built", "made", "github", "repo", "portfolio", "showcase"]):
            projs = RESUME_DATA["featured_projects"]
            yield f"Anjani has built some really impressive projects! Here are a few highlights:\n\n"
            for p in projs[:3]:
                yield f"🔹 **{p['title']}** *({p['period']})*\n   {p['bullets'][0]}\n\n"
            yield "\nWant to see her full GitHub? Check it out here: [github.com/Anjani27](" + id_data['github'] + ") 🚀"

        # --- Education ---
        elif any(w in q for w in ["edu", "college", "study", "degree", "university", "cgpa", "grade", "score", "qualification"]):
            edu = RESUME_DATA["education"][0]
            yield (
                f"Anjani holds a **{edu['degree']}** from **{edu['institution']}** "
                f"(📅 {edu['period']}), with a CGPA of **{edu['cgpa']}** — a solid academic foundation "
                f"that she's backed up with real-world experience at top companies! 🎓"
            )

        # --- Achievements ---
        elif any(w in q for w in ["achieve", "award", "honor", "leetcode", "accomplish", "recognition"]):
            yield "Anjani's got some noteworthy achievements! 🏆\n\n"
            for ach in RESUME_DATA["achievements"]:
                yield f"- {ach}\n"
            yield "\nPretty impressive, right? 💪"

        # --- Contact ---
        elif any(w in q for w in ["contact", "email", "reach", "connect", "linkedin", "hire", "message"]):
            yield (
                f"Want to get in touch with Anjani? Here's how:\n\n"
                f"- 📧 **Email:** [{id_data['email']}](mailto:{id_data['email']})\n"
                f"- 💼 **LinkedIn:** [{id_data['linkedin']}]({id_data['linkedin']})\n"
                f"- 🐙 **GitHub:** [{id_data['github']}]({id_data['github']})\n\n"
                "She's open to exciting AI/ML and Backend Engineering opportunities! 🚀"
            )

        # --- Phone ---
        elif any(w in q for w in ["phone", "whatsapp", "number", "call", "mobile"]):
            yield "For privacy reasons, Anjani's phone number isn't shared publicly. The best ways to reach her are via **email or LinkedIn** — she's pretty responsive! 📬"

        # --- Off-topic / Unknown ---
        else:
            yield (
                "That's an interesting question, but I'm specifically designed to talk about "
                "**Anjani Kushwaha** — her skills, work experience, projects, education, and achievements.\n\n"
                "Try asking me something like:\n"
                "- *\"What are her AI skills?\"*\n"
                "- *\"Tell me about her work at Amazon\"*\n"
                "- *\"What projects has she built?\"*\n\n"
                "I'd love to tell you more about her! 😊"
            )

    # If no API key configured, use local fallback silently
    if not GROQ_API_KEY:
        yield from _local_fallback(query)
        return

    # If LLM is available, invoke it with the system prompt, history, and user message
    messages = [SystemMessage(content=format_system_prompt())]
    
    # Add conversation history
    if history:
        for msg in history:
            if msg.get("role") == "user":
                messages.append(HumanMessage(content=msg.get("content", "")))
            elif msg.get("role") == "assistant":
                messages.append(AIMessage(content=msg.get("content", "")))

    # Fetch live GitHub projects if the user asks for projects
    user_query_lower = query.lower()
    if "github" in user_query_lower or "project" in user_query_lower or "repo" in user_query_lower:
        github_repos = fetch_live_github_projects()
        if github_repos:
            repo_list_str = "\n".join([
                f"- {r['title']} ({r['language'] or 'Other'}{', Topics: ' + ', '.join(r['topics']) if r['topics'] else ''}): {r['description']} (Stars: {r['stars']}, Link: {r['url']})"
                for r in github_repos[:8]
            ])
            messages.append(SystemMessage(content=f"LIVE GITHUB PROJECTS:\n{repo_list_str}"))

    # Add the current human message
    messages.append(HumanMessage(content=query))

    # Try each model in order until one works
    for model_name in GROQ_MODELS:
        llm = get_llm(model_name)
        try:
            print(f"Trying model: {model_name}")
            for chunk in llm.stream(messages):
                if chunk.content:
                    yield chunk.content
            return  # success — stop trying further models
        except Exception as e:
            print(f"Model '{model_name}' failed: {e}")
            if _is_model_error(e):
                continue  # try next model in list
            # Non-model error (auth, rate-limit, network) — fall back silently
            print(f"Non-model error, falling back to local engine: {e}")
            yield from _local_fallback(query)
            return

    # All AI models exhausted — fall back to local engine silently
    print("All Groq models failed. Falling back to local engine.")
    yield from _local_fallback(query)
