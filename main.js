// Chat logic
const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');

function logout() {
  window.location.href = 'index.html';
}

function sendMessage() {
  const txt = chatInput.value.trim();
  if (!txt) return;
  chatBox.innerHTML += `<div class="bubble user">${txt}</div>`;
  chatInput.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;

  let reply = "I'm still learning.";
  const m = txt.toLowerCase();
  if (/(hi|hello)/.test(m)) reply = "Hello there!";
  else if (m.includes("time")) reply = `Current time: ${new Date().toLocaleTimeString()}`;
  else if (m.includes("calculate")) return openCalculator();

  setTimeout(() => {
    chatBox.innerHTML += `<div class="bubble lily">${reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 500);
}

// Tools
function openCalculator() {
  const expr = prompt("Enter expression (e.g. 2+2):");
  try {
    const res = Function(`"use strict";return (${expr})`)();
    alert(`Result: ${res}`);
  } catch {
    alert("Invalid expression.");
  }
}

function openConverter() {
  const val = parseFloat(prompt("Value to convert:"));
  const from = prompt("From unit (kg):"), to = prompt("To unit (lb):");
  if (from==='kg'&&to==='lb') alert(`${val}kg = ${(val*2.20462).toFixed(2)}lb`);
  else alert("Conversion not supported yet.");
}

function startTimer() {
  const sec = parseInt(prompt("Seconds for timer:"),10);
  if (!sec) return alert("Invalid number.");
  alert(`Timer set for ${sec}s.`);
  setTimeout(()=> alert("⏰ Time's up!"), sec*1000);
}

async function webSearch() {
  const q = encodeURIComponent(prompt("Search query:"));
  if (!q) return;
  const res = await fetch(`https://api.duckduckgo.com/?q=${q}&format=json`);
  const data = await res.json();
  alert(data.AbstractText || "No instant answer.");
}

function defineTerm() {
  const t = encodeURIComponent(prompt("Term to define:"));
  if (!t) return;
  fetch(`https://api.duckduckgo.com/?q=${t}&format=json`)
    .then(r=>r.json()).then(d=>{
      alert(d.Abstract || "No definition found.");
    });
}

// Settings
function toggleSettings() {
  document.getElementById('settings-panel').hidden = false;
}
function closeSettings() {
  document.getElementById('settings-panel').hidden = true;
}

// Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

// Notifications
function requestNotification() {
  if (!("Notification" in window)) return alert("Notifications not supported.");
  Notification.requestPermission().then(p => {
    if (p === "granted") {
      new Notification("Lily says hi!");
    }
  });
}

// Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
