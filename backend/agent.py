import os
import httpx
from typing import List, Dict, Any, Generator
from dotenv import load_dotenv

# Import LangChain components
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from langchain_groq import ChatGroq

from backend.resume_data import RESUME_DATA

# Load environment variables
load_dotenv()

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

# Initialize LLM
def get_llm():
    if not GROQ_API_KEY:
        # Fallback to None if no key is provided. Main server will handle mock responses.
        return None
    try:
        # Using LLaMA 3.3 70B via Groq for high quality and speed
        return ChatGroq(
            temperature=0.2,
            model_name="llama-3.3-70b-versatile",
            groq_api_key=GROQ_API_KEY
        )
    except Exception as e:
        print(f"Failed to initialize ChatGroq: {e}")
        return None

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
    llm = get_llm()
    
    # If no LLM API key, fallback to a local rule-based matching engine
    if not llm:
        yield "⚠️ Note: Running in Offline Mode (no GROQ_API_KEY configured).\n\n"
        # Run local fallback query matching
        from backend.resume_data import RESUME_DATA
        q = query.lower()
        if "skill" in q or "tech" in q:
            skills = RESUME_DATA["skills"]
            yield f"### Anjani's Skills:\n\n**Programming**: {', '.join(skills['programming'])}\n\n**GenAI & ML**: {', '.join(skills['generative_ai_and_ml'])}\n\n**MLOps**: {', '.join(skills['mlops_and_systems'])}"
        elif "experience" in q or "work" in q:
            yield "### Anjani's Experience:\n\n"
            for exp in RESUME_DATA["experience"]:
                yield f"**{exp['role']}** at *{exp['company']}* ({exp['period']})\n"
                for b in exp['bullets']:
                    yield f"- {b}\n"
                yield "\n"
        elif "project" in q:
            # Also get Github projects
            yield "### Featured Projects:\n\n"
            for proj in RESUME_DATA["featured_projects"]:
                yield f"**{proj['title']}** ({proj['period']})\n"
                for b in proj['bullets']:
                    yield f"- {b}\n"
                yield "\n"
            
            yield "---\n\n### Live GitHub Projects:\n\n"
            gh_repos = fetch_live_github_projects()
            if gh_repos:
                for repo in gh_repos[:5]:
                    desc = repo['description'] or "No description provided."
                    yield f"- **[{repo['title']}]({repo['url']})** ({repo['language'] or 'Mixed'}) - ⭐ {repo['stars']}\n  *{desc}*\n"
            else:
                yield "Could not fetch GitHub repositories or none found."
        elif "edu" in q or "college" in q or "study" in q:
            edu = RESUME_DATA["education"][0]
            yield f"🎓 **{edu['degree']}**\n**{edu['institution']}**\n📅 {edu['period']}  •  CGPA: **{edu['cgpa']}**"
        elif "phone" in q or "whatsapp" in q or "number" in q or "call" in q:
            yield "For privacy reasons, Anjani's phone and WhatsApp numbers are not shared publicly. Please reach out to her via email or LinkedIn! 📬"
        elif "contact" in q or "email" in q or "reach" in q:
            id_data = RESUME_DATA["identity"]
            yield f"📬 **Get in Touch**:\n\n- Email: [{id_data['email']}](mailto:{id_data['email']})\n- LinkedIn: [{id_data['linkedin']}]({id_data['linkedin']})\n- GitHub: [{id_data['github']}]({id_data['github']})"
        elif "achieve" in q or "leetcode" in q:
            yield "🏆 **Achievements**:\n\n"
            for ach in RESUME_DATA["achievements"]:
                yield f"- {ach}\n"
        elif any(g in q for g in ["hi", "hello", "hey", "sup", "howdy"]):
            yield "Hello! 👋 I am Anjani's AI Assistant. Ask me about her education, skills, experience, or projects!"
        else:
            yield "I appreciate the curiosity! 😊 However, I'm designed to answer questions **only about Anjani Kushwaha** — her skills, experience, projects, education, and achievements.\n\nTry asking about:\n- her skills\n- her projects on GitHub\n- her work experience at Amazon or Microsoft"
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

    try:
        # Stream response
        for chunk in llm.stream(messages):
            if chunk.content:
                yield chunk.content
    except Exception as e:
        print(f"Error invoking Groq API: {e}")
        yield f"⚠️ Sorry, I encountered an error communicating with the AI model: {e}. Let me know if I can help you with anything else!"
