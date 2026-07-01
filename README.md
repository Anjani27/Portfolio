# Anjani Kushwaha — Professional Portfolio & AI Agent

Welcome to my portfolio! This repository contains a modern, interactive, and responsive portfolio website designed to showcase my skills, projects, and work experience. It features a built-in **AI Chatbot Assistant** that interacts with visitors in real-time, answering questions about my professional background.

🔗 **Live Link:** [Porfolio](https://porfolio-afqk.onrender.com)

---

## 🚀 Key Features

*   **Modern Responsive Design:** A sleek dark-themed UI featuring glassmorphism, smooth animations, interactive skill cards, and responsive layout optimizations.
*   **Dual-Mode AI Chatbot:**
    *   **Online Streaming Mode:** Streams real-time responses using Server-Sent Events (SSE) from a Python/FastAPI backend powered by LangChain and Groq (using LLaMA 3.3 70B).
    *   **Offline Fallback Mode:** Automatically switches to a client-side keyword matching engine if the backend is offline, ensuring the bot remains interactive.
*   **Live GitHub Sync:** Dynamically fetches and displays my top repositories directly from the GitHub API.
*   **Structured Knowledge Base:** Configured with a system-prompt guardrail to keep responses professional and strictly focused on my career, skills, and background.

---

## 🛠️ Tech Stack

### Frontend
*   **Languages:** HTML5, CSS3 (Vanilla CSS with CSS variables for modular styling), JavaScript (ES6)
*   **Icons & Fonts:** FontAwesome / SVGs, Google Fonts (Inter, Space Grotesk)

### Backend
*   **Framework:** FastAPI (Python)
*   **Server:** Uvicorn
*   **AI/LLM Integration:** LangChain, LangChain-Groq, Groq Cloud API
*   **Other Packages:** python-dotenv (config management), HTTPX (async requests), SSE-Starlette (streaming responses)

---

## 📁 Repository Structure

```text
├── backend/
│   ├── agent.py            # LangChain Groq LLM setup and query processing logic
│   ├── main.py             # FastAPI entry point, endpoints, and CORS config
│   ├── requirements.txt    # Python dependencies
│   └── resume_data.py      # Source of truth career data for the online chatbot prompt
├── .gitignore
├── .python-version         # Pins Python version to 3.11.9 for deployments
├── app.js                  # Main portfolio UI interactions & dynamic projects fetch
├── chatbot.js              # Frontend chatbot bubble logic, messaging, and API handling
├── index.html              # Main HTML markup structure
├── knowledge-base.js       # Client-side fallback knowledge base for the offline chatbot
└── styles.css              # Custom styling sheet (layouts, gradients, glassmorphism)
```

---

## 💻 Local Setup

### 1. Backend (FastAPI Server)
Ensure you have Python `3.10+` (preferably `3.11.9`) installed.

1.  Navigate to the `backend` folder:
    ```bash
    cd backend
    ```
2.  Create and activate a virtual environment:
    ```bash
    python -m venv venv
    # On Windows (PowerShell):
    .\venv\Scripts\Activate.ps1
    # On macOS/Linux:
    source venv/bin/activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Create a `.env` file in the `backend` directory and add your Groq API key:
    ```env
    GROQ_API_KEY=your_actual_groq_api_key_here
    GITHUB_USERNAME=Anjani27
    ```
5.  Start the development server:
    ```bash
    python main.py
    ```
    The server will start on `http://localhost:8000`.

### 2. Frontend
Since the frontend uses pure HTML/CSS/JS, you don't need any installation steps!
*   Simply open `index.html` in your browser.
*   *Recommended:* Use the VS Code extension **Live Server** to run it locally on `http://127.0.0.1:5500`. It will automatically connect to your local backend on `http://localhost:8000`.


---

## 👤 Author
*   **Anjani Kushwaha**
*   **LinkedIn:** [Anjani Kushwaha](https://www.linkedin.com/in/anjani-kushwaha-245a42210)
*   **GitHub:** [@Anjani27](https://github.com/Anjani27)
