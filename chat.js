// === CHATBOT FRONTEND MIT OPENAI API ===

// ⚠️ Trage hier deinen eigenen API-Schlüssel ein:
const API_KEY = "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";

// OpenAI Endpoint
const API_URL = "https://api.openai.com/v1/chat/completions";

// HTML-Elemente abrufen
const messagesDiv = document.getElementById("messages");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Beim Klick Nachricht senden
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const userText = input.value.trim();
  if (!userText) return;

  addMessage("🧑‍💬 Du", userText);
  input.value = "";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // gutes, günstiges Modell
        messages: [
          { role: "system", content: "Du bist Dr KI, ein freundlicher medizinischer Praxisassistent, der Fragen einfach und verständlich erklärt." },
          { role: "user", content: userText }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Entschuldigung, keine Antwort erhalten.";
    addMessage("🤖 Dr KI", reply);

  } catch (error) {
    addMessage("❌ Fehler", "Verbindung zur OpenAI-API fehlgeschlagen.");
    console.error(error);
  }
}

function addMessage(sender, text) {
  const msg = document.createElement("p");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  messagesDiv.appendChild(msg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}