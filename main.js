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
