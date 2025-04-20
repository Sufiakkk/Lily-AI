// main.js

const menuBtn = document.getElementById("menu-button"); const menuPanel = document.getElementById("menu-panel"); const logoutBtn = document.getElementById("logout-button"); const chatContainer = document.getElementById("chat-container"); const chatInput = document.getElementById("chat-input"); const sendButton = document.getElementById("send-button");

// Toggle menu menuBtn.onclick = () => { menuPanel.style.display = menuPanel.style.display === "block" ? "none" : "block"; };

document.addEventListener("click", (e) => { if (!menuPanel.contains(e.target) && e.target !== menuBtn) { menuPanel.style.display = "none"; } });

// Logout handler logoutBtn.onclick = () => { window.location.href = "index.html"; };

// Send chat sendButton.onclick = sendMessage; chatInput.addEventListener("keypress", (e) => { if (e.key === "Enter") sendMessage(); });

function sendMessage() { const message = chatInput.value.trim(); if (message === "") return;

addMessage("user", message); chatInput.value = "";

setTimeout(() => { const response = getFakeResponse(message); addMessage("bot", response); }, 600); }

function addMessage(sender, text) { const messageDiv = document.createElement("div"); messageDiv.classList.add("chat-message", sender); messageDiv.textContent = text; chatContainer.appendChild(messageDiv); chatContainer.scrollTop = chatContainer.scrollHeight; }

function getFakeResponse(userInput) { const responses = [ "That's interesting!", "I'm still learning, but I’ll try to help.", "Can you tell me more?", "Let me look that up for you soon.", "I’m Lily, here to help however I can." ]; return responses[Math.floor(Math.random() * responses.length)]; }

