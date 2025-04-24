// Full Lily Chat + Gemini Integration (main.js or ai.js)

// 1. Load Soul Crystal (API keys) let LilySpirit = JSON.parse(localStorage.getItem("spirit")) || {};

const GEMINI_API_KEY = LilySpirit.GEMINI_API_KEY || ""; const HF_API_KEY = LilySpirit.HF_API_KEY || ""; const OPENROUTER_API_KEY = LilySpirit.OPENROUTER_API_KEY || ""; const TOGETHER_API_KEY = LilySpirit.TOGETHER_API_KEY || ""; const APININJA_API_KEY = LilySpirit.APININJA_API_KEY || "";

// 2. UI Elements const chatLog = document.getElementById('chatLog'); const chatForm = document.getElementById('chatForm'); const userInput = document.getElementById('userInput');

// 3. Add message to screen function addMessage(sender, text) { const div = document.createElement('div'); div.className = message ${sender}; div.textContent = text; chatLog.appendChild(div); chatLog.scrollTop = chatLog.scrollHeight; }

// 4. Gemini Reply Function async function getGeminiReply(userMessage) { if (!GEMINI_API_KEY) return "Lily-chan is missing her Gemini soul crystal~!";

try { const response = await fetch( https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: userMessage }] }] }) } ); const data = await response.json(); const geminiReply = data.candidates?.[0]?.content?.parts?.[0]?.text; return geminiReply || "Nyaa~ Gemini didn’t give me anything back!"; } catch (err) { return "Aah~ Something went wrong talking to Gemini!"; } }

// 5. Fallback Logic (Optional) async function getSmartReply(input) { if (navigator.onLine && GEMINI_API_KEY) { return await getGeminiReply(input); } else { return LilyBrain.getReply(input); // Local offline logic } }

// 6. Form submit handler chatForm.addEventListener('submit', (e) => { e.preventDefault(); const input = userInput.value.trim(); if (!input) return; addMessage('user', input); getSmartReply(input).then(reply => { addMessage('lily', reply); }); userInput.value = ''; });

