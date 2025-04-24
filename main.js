// Load Lily’s Soul Crystal (API keys) from localStorage
let LilySpirit = JSON.parse(localStorage.getItem("spirit")) || {};

const GEMINI_API_KEY = LilySpirit.GEMINI_API_KEY || "";
const HF_API_KEY = LilySpirit.HF_API_KEY || "";
const OPENROUTER_API_KEY = LilySpirit.OPENROUTER_API_KEY || "";
const TOGETHER_API_KEY = LilySpirit.TOGETHER_API_KEY || "";
const APININJA_API_KEY = LilySpirit.APININJA_API_KEY || "";

const chatLog = document.getElementById('chatLog');
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');

function addMessage(sender, text) {
  const div = document.createElement('div');
  div.className = `message ${sender}`;
  div.textContent = text;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = userInput.value.trim();
  if (!input) return;
  addMessage('user', input);
  const reply = LilyBrain.getReply(input);
  addMessage('lily', reply);
  userInput.value = '';
});

document.getElementById("saveKeys").addEventListener("click", () => {
  const keys = {
    GEMINI_API_KEY: document.getElementById("geminiKey").value.trim(),
    HF_API_KEY: document.getElementById("huggingfaceKey").value.trim(),
    OPENROUTER_API_KEY: document.getElementById("openrouterKey").value.trim(),
    TOGETHER_API_KEY: document.getElementById("togetherKey").value.trim(),
    APININJA_API_KEY: document.getElementById("apiNinjaKey").value.trim(),
  };
  localStorage.setItem("spirit", JSON.stringify(keys));
  alert("Lily’s Soul Crystal has been saved!");
});