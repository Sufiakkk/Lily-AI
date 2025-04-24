// === functions/brain.js ===

export const LilyBrain = {
  async getReply(input, keys) {
    const { OPENROUTER_API_KEY } = keys;

    const body = {
      model: "mistral:instruct", // Or use gpt-3.5-turbo, mixtral, etc.
      messages: [
        { role: "system", content: "You're Lily, a cute and loving offline-first assistant." },
        { role: "user", content: input }
      ],
    };

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://github.com/Sufiakkk/Lily-AI", // Optional
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(`OpenRouter error: ${res.status}`);
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content;
      return reply || "Lily is thinking really hard... try again?";
    } catch (err) {
      console.error("OpenRouter API error:", err);
      return "Nyaa~ Something went wrong while talking to the stars. Try again later!";
    }
  }
};
