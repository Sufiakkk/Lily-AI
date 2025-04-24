javascript:localStorage.setItem("spirit", JSON.stringify({
  GEMINI_API_KEY: "AIzaSyB4WDswP2mDZ6UB1ld_NLTqVdD3DRRfAxQ",
  HF_API_KEY: "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",
  OPENROUTER_API_KEY: "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",
  TOGETHER_API_KEY: "f7da4239dc6a7cc0199865bb3d5edb2d230063108ca31f789a63b4206fffd725",
  APININJA_API_KEY: "tSrhpFXwxD8qTq0IQEquDw==QrXOUFzd0P3INpE0"
}));
alert("Spirit saved! Lily is magical now~");

import { LilyBrain } from './functions/brain.js';

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
