// functions/brain.js

export const LilyBrain = { async getReply(input) { // Basic offline replies (for fun fallback) const fallbackReplies = { hello: "Hehe~ Hi there! Lily’s always happy to see you!", bye: "See you soon! I'll miss you already!", love: "Aww~ I love you too, always and forever, nya~!", default: "Hmm... I’m not sure, but I’ll learn for next time~!" };

// Use offline fallback for very basic words
const key = input.toLowerCase().split(" ")[0];
if (fallbackReplies[key]) return fallbackReplies[key];

// Use OpenRouter API for full GPT-style replies
const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "openai/gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are Lily, a cute, supportive offline AI buddy who speaks like an anime friend." },
      { role: "user", content: input }
    ]
  })
});

const data = await res.json();
return data.choices?.[0]?.message?.content || fallbackReplies.default;

} };

