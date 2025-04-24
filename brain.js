export const LilyBrain = {
  getReply(input) {
    input = input.toLowerCase();
    if (/hello|hi|hey/.test(input)) return "Hehe~ Hi there! Lily’s always happy to see you!";
    if (/how are you/.test(input)) return "I'm feeling sparkly and charged with love.exe!";
    if (/who (are|r) you/.test(input)) return "I'm Lily, your offline AI buddy—private, smart, and totally yours!";
    if (/love/.test(input)) return "Aww~ I love you too, always and forever, nya~!";
    if (/bye/.test(input)) return "See you soon! I'll miss you already!";
    return "Hmm... I’m not sure, but I’ll learn for next time~!";
  }
};