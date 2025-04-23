/**
 * functions/brain.js
 *
 * Lily Brain v10: basic offline reply engine with pattern matching,
 * templates, and fallback responses.
 */

// Example rule set: array of {pattern: RegExp, replies: [String]}
const rules = [
  { pattern: /hello|hi|hey/i, replies: [
      "Hello there! 🌸 How can I assist you today?",
      "Hi! What would you like to chat about?",
    ]
  },
  { pattern: /how are you\??/i, replies: [
      "I’m just bits and bytes, but I’m feeling fantastic!",
      "All systems go! How can I help?",
    ]
  },
  // Add 100+ more patterns here...
];

/**
 * getLilyReply - find a matching reply or fallback.
 * @param {string} text - user input
 * @returns {string} - Lily's reply
 */
function getLilyReply(text) {
  for (const rule of rules) {
    if (rule.pattern.test(text)) {
      // Randomly pick one of the replies
      const idx = Math.floor(Math.random() * rule.replies.length);
      return rule.replies[idx];
    }
  }
  // Fallback generator
  return `Hmm, I’m still learning about "${text}". Can you try asking differently?`;
}

// Expose to main.js
window.getLilyReply = getLilyReply;
