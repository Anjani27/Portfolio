// ============================================================
// Chatbot.js — AI Agent for Anjani Kushwaha's Portfolio
// Client-side intent matching with guardrails
// ============================================================

(function () {
  "use strict";

  // ---- DOM elements ----
  const chatFab = document.getElementById("chatFab");
  const chatPanel = document.getElementById("chatPanel");
  const chatMessages = document.getElementById("chatMessages");
  const chatInput = document.getElementById("chatInput");
  const chatSendBtn = document.getElementById("chatSendBtn");
  const chatSuggestions = document.getElementById("chatSuggestions");
  const chatTooltip = document.getElementById("chatTooltip");

  let isOpen = false;
  let hasGreeted = false;

  // ---- Suggested questions ----
  const suggestions = [
    "What are Anjani's skills?",
    "Tell me about her experience",
    "What projects has she built?",
    "Where did she study?",
    "How to contact her?",
  ];

  // ---- Simple Markdown renderer (safe subset) ----
  function renderMarkdown(text) {
    let html = text;
    // Headers (### only in bot messages)
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Italic
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    // Links [text](url)
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Horizontal rule
    html = html.replace(/^---$/gm, '<hr/>');
    // Unordered list items
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    // Wrap consecutive <li> in <ul>
    html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');
    // Line breaks (double newline → paragraph break, single → <br>)
    html = html.replace(/\n\n/g, '<br/><br/>');
    html = html.replace(/\n/g, '<br/>');
    return html;
  }

  // ---- Append a message to chat ----
  function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `chat-message ${sender}`;

    const avatar = document.createElement("div");
    avatar.className = "msg-avatar";
    avatar.textContent = sender === "bot" ? "🤖" : "👤";

    const bubble = document.createElement("div");
    bubble.className = "msg-bubble";

    if (sender === "bot") {
      bubble.innerHTML = renderMarkdown(text);
    } else {
      bubble.textContent = text;
    }

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(bubble);
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // ---- Typing indicator ----
  function showTyping() {
    const typing = document.createElement("div");
    typing.className = "chat-message bot";
    typing.id = "typingMsg";

    const avatar = document.createElement("div");
    avatar.className = "msg-avatar";
    avatar.textContent = "🤖";

    const bubble = document.createElement("div");
    bubble.className = "msg-bubble";
    bubble.innerHTML =
      '<div class="typing-indicator"><span></span><span></span><span></span></div>';

    typing.appendChild(avatar);
    typing.appendChild(bubble);
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function hideTyping() {
    const el = document.getElementById("typingMsg");
    if (el) el.remove();
  }

  // ---- Render suggestion chips ----
  function renderSuggestions(items) {
    chatSuggestions.innerHTML = "";
    items.forEach((text) => {
      const chip = document.createElement("button");
      chip.className = "suggestion-chip";
      chip.textContent = text;
      chip.addEventListener("click", () => {
        handleUserMessage(text);
      });
      chatSuggestions.appendChild(chip);
    });
  }

  // ---- Intent matching engine ----
  function classifyIntent(query) {
    const normalized = query.toLowerCase().replace(/[?!.,;:'"]/g, "").trim();
    const words = normalized.split(/\s+/);

    let bestMatch = null;
    let bestScore = 0;

    for (const intent of INTENTS) {
      let score = 0;
      for (const keyword of intent.keywords) {
        // Check if keyword is a phrase or a single word
        if (keyword.includes(" ")) {
          if (normalized.includes(keyword)) {
            score += 3; // phrase match is stronger
          }
        } else {
          // Single word match
          if (words.includes(keyword)) {
            score += 2;
          } else if (normalized.includes(keyword)) {
            score += 1;
          }
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = intent;
      }
    }

    // Require a minimum confidence
    if (bestScore >= 1 && bestMatch) {
      return bestMatch;
    }

    return null;
  }

  // ---- Generate response ----
  function generateResponse(query) {
    const intent = classifyIntent(query);

    if (intent) {
      return intent.handler(query);
    }

    return FALLBACK_RESPONSE;
  }

  // ---- Message history tracking ----
  let messageHistory = [];

  // ---- Handle user message ----
  async function handleUserMessage(text) {
    if (!text.trim()) return;

    addMessage(text, "user");
    messageHistory.push({ role: "user", content: text });
    chatInput.value = "";
    chatSuggestions.innerHTML = "";

    // Show typing indicator
    showTyping();

    // Prepare history payload for API (max 10 recent messages to keep context window clean)
    const payloadHistory = messageHistory.slice(-10);

    const BACKEND_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
      ? "http://localhost:8000"
      : "https://porfolio-backend-48yy.onrender.com"; // Change to your deployed backend URL

    try {
      // Attempt connection to the local Python FastAPI agent
      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: payloadHistory
        })
      });

      if (!response.ok) {
        throw new Error("FastAPI backend error status: " + response.status);
      }

      // Hide typing indicator
      hideTyping();

      // Create an empty bot message bubble that we will stream into
      const messageDiv = document.createElement("div");
      messageDiv.className = "chat-message bot";

      const avatar = document.createElement("div");
      avatar.className = "msg-avatar";
      avatar.textContent = "🤖";

      const bubble = document.createElement("div");
      bubble.className = "msg-bubble";
      bubble.innerHTML = ""; // Starts empty

      messageDiv.appendChild(avatar);
      messageDiv.appendChild(bubble);
      chatMessages.appendChild(messageDiv);

      // Read readable stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop(); // Keep partial line in buffer

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith("data: ")) {
            const dataVal = trimmed.slice(6).trim();
            if (dataVal === "[DONE]") {
              break;
            }
            try {
              const parsed = JSON.parse(dataVal);
              if (parsed.text) {
                accumulatedText += parsed.text;
                // Render markdown dynamically
                bubble.innerHTML = renderMarkdown(accumulatedText);
                chatMessages.scrollTop = chatMessages.scrollHeight;
              }
            } catch (err) {
              // Ignore parsed failures
            }
          }
        }
      }

      // Record assistant message to history
      messageHistory.push({ role: "assistant", content: accumulatedText });

      // Render follow-up suggestions
      const followUp = getFollowUpSuggestions(text);
      renderSuggestions(followUp);

    } catch (err) {
      console.warn("Backend server offline. Falling back to offline client-side chatbot...", err);

      // Offline fallback: Use local keyword matching
      setTimeout(() => {
        hideTyping();
        const responseText = generateResponse(text);
        addMessage(responseText, "bot");
        messageHistory.push({ role: "assistant", content: responseText });

        const followUp = getFollowUpSuggestions(text);
        renderSuggestions(followUp);
      }, 500);
    }
  }

  // ---- Context-aware follow-up suggestions ----
  function getFollowUpSuggestions(lastQuery) {
    const q = lastQuery.toLowerCase();

    if (q.includes("skill") || q.includes("tech")) {
      return [
        "Tell me about her experience",
        "What projects has she built?",
        "How to contact her?",
      ];
    }
    if (q.includes("experience") || q.includes("work") || q.includes("company")) {
      return [
        "What are her skills?",
        "Tell me about her projects",
        "What are her achievements?",
      ];
    }
    if (q.includes("project") || q.includes("built")) {
      return [
        "What skills does she have?",
        "Where did she study?",
        "How to contact Anjani?",
      ];
    }
    if (q.includes("education") || q.includes("study") || q.includes("college")) {
      return [
        "What are her achievements?",
        "Tell me about her experience",
        "What are her skills?",
      ];
    }
    if (q.includes("achievement") || q.includes("award")) {
      return [
        "What projects has she built?",
        "What is her tech stack?",
        "How to reach her?",
      ];
    }

    return [
      "What are Anjani's skills?",
      "Tell me about her experience",
      "What projects has she built?",
    ];
  }

  // ---- Toggle chat panel ----
  function toggleChat() {
    isOpen = !isOpen;
    chatPanel.classList.toggle("open", isOpen);
    chatFab.classList.toggle("open", isOpen);
    chatTooltip.classList.remove("show");

    if (isOpen) {
      chatInput.focus();

      // Show welcome message on first open
      if (!hasGreeted) {
        hasGreeted = true;
        setTimeout(() => {
          addMessage(
            "Hey there! 👋 I'm **Anjani's AI assistant**. I know everything about her education, skills, experience, projects, and achievements.\n\nWhat would you like to know?",
            "bot"
          );
          renderSuggestions(suggestions);
        }, 300);
      }
    }
  }

  // ---- Event listeners ----
  chatFab.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleChat();
  });

  chatSendBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    handleUserMessage(chatInput.value);
  });

  chatPanel.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleUserMessage(chatInput.value);
    }
  });

  // Close chat when clicking outside (optional)
  document.addEventListener("click", () => {
    if (isOpen) {
      toggleChat();
    }
  });
})();
