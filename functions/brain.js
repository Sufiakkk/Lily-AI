// Netlify Function: brain.js
// Handles Lily AI requests using OpenRouter securely

const fetch = require("node-fetch");

exports.handler = async function(event) {
  try {
    const body = JSON.parse(event.body);
    const message = body.message || "Hello";

    const OPENROUTER_KEY = process.env.OPENROUTER_KEY_2;
    const endpoint = "https://openrouter.ai/api/v1/chat/completions";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://your-site-name.netlify.app" // Optional: change to your domain
      },
      body: JSON.stringify({
        model: "openrouter/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are Lily, a calm, kind, and creative AI assistant for a student named Abdullah. Always be helpful, sweet, and clever."
          },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I'm not sure how to answer that right now.";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Lily brain failed to reply", details: err.message })
    };
  }
};
