// === main.js ===
import { LilyBrain } from "./functions/brain.js";

// GitHub Secrets (these will be replaced during GitHub Actions deployment)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const HF_API_KEY = import.meta.env.VITE_HF_API_KEY;
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const TOGETHER_API_KEY = import.meta.env.VITE_TOGETHER_API_KEY;
const APININJA_API_KEY = import.meta.env.VITE_APININJA_API_KEY;

const chatLog = document.getElementById("chatLog");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");

function addMessage(sender, text) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.textContent = text;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = userInput.value.trim();
  if (!input) return;
  addMessage("user", input);
  userInput.value = "";

  try {
    const reply = await LilyBrain.getReply(input, {
      GEMINI_API_KEY,
      HF_API_KEY,
      OPENROUTER_API_KEY,
      TOGETHER_API_KEY,
      APININJA_API_KEY,
    });
    addMessage("lily", reply);
  } catch (err) {
    addMessage("lily", "Oops! Lily couldn't reach the stars right now. Try again later~");
    console.error("LilyBrain error:", err);
  }
});
