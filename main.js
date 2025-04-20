const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const chatbox = document.getElementById("chatbox");

const menuBtn = document.getElementById("menu-btn");
const dropdown = document.getElementById("menu-dropdown");
const logoutBtn = document.getElementById("logout-btn");

// Toggle dropdown menu
menuBtn.addEventListener("click", () => {
  dropdown.classList.toggle("hidden");
});

// Handle logout
logoutBtn.addEventListener("click", () => {
  // TODO: implement real logout logic
  alert("Logging out...");
  // e.g., clear tokens and redirect:
  // localStorage.clear();
  // window.location.href = "index.html";
});

// Append a chat message
function appendMsg(sender, text) {
  const bubble = document.createElement("div");
  bubble.classList.add("chat-bubble", sender === "Lily" ? "bubble-lily" : "bubble-myne");
  bubble.textContent = text;
  chatbox.appendChild(bubble);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Handle form submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const msg = input.value.trim();
  if (!msg) return;

  appendMsg("Myne", msg);
  input.value = "";
  // Placeholder reply
  appendMsg("Lily", "Let me think...");
  // TODO: integrate local LLM + fallback here
});
