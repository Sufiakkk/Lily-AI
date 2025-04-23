if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('SW registered:', reg.scope))
      .catch(err => console.error('SW registration failed:', err));
  });
}
// Grab elements
const chatContainer = document.getElementById('chatContainer');
const input = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const menuBtn = document.getElementById('menuBtn');
const menuList = document.getElementById('menuList');
const toggleTheme = document.getElementById('toggleTheme');
const logout = document.getElementById('logout');

// Theme toggle
menuBtn.addEventListener('click', () => menuList.classList.toggle('hidden'));
toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
  menuList.classList.add('hidden');
});
logout.addEventListener('click', () => location.href = 'index.html');

// Load saved theme
if (localStorage.getItem('theme') === 'light') document.body.classList.add('light');

// Utility: scroll
function scrollToBottom() {
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Render message
function renderMsg(text, sender='lily') {
  const div = document.createElement('div');
  div.classList.add('message', sender);
  div.textContent = text;
  chatContainer.appendChild(div);
  scrollToBottom();
}

// Send flow
sendBtn.addEventListener('click', handleSend);
input.addEventListener('keypress', e => e.key === 'Enter' && handleSend());

function handleSend() {
  const text = input.value.trim();
  if (!text) return;
  renderMsg(text, 'mine');
  input.value = '';

  // Lily Brain v10 invocation
  const reply = getLilyReply(text);
  setTimeout(() => renderMsg(reply, 'lily'), 300);
}

// On load, welcome message
document.addEventListener('DOMContentLoaded', () => {
  renderMsg('Hello! I'm Lily 🌸 How can I help you today?');
});
