const express = require("express");
const { randomUUID, randomInt } = require("node:crypto");
const path = require("node:path");
const emojis = [
  { emoji: "😀", name: "Smile" }, { emoji: "🐶", name: "Dog" },
  { emoji: "🌮", name: "Taco" }, { emoji: "🐱", name: "Cat" },
  { emoji: "🚀", name: "Rocket" }, { emoji: "🍎", name: "Apple" },
  { emoji: "🌈", name: "Rainbow" }, { emoji: "🎸", name: "Guitar" },
];
function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
function createApp() {
  const app = express();
  const players = new Map();
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "public")));
  app.post("/api/start", (req, res) => {
    const name = req.body?.name;
    if (typeof name !== "string" || !name.trim() || name.length > 30) return res.status(400).json({ error: "Enter a name of 1–30 characters." });
    const token = randomUUID();
    players.set(token, { name: name.trim(), score: 0, played: 0, question: null });
    res.status(201).json({ token });
  });
  app.get("/api/leaderboard", (req, res) => res.json([...players.values()]
    .filter(p => p.played > 0).sort((a, b) => b.score - a.score).slice(0, 10)
    .map(({ name, score, played }) => ({ name, score, played }))));
  app.use("/api", (req, res, next) => {
    req.player = players.get(req.get("Authorization"));
    if (!req.player) return res.status(401).json({ error: "Start a game first." });
    next();
  });
  app.get("/api/question", (req, res) => {
    const p = req.player;
    if (!p.question) {
      const correct = emojis[randomInt(emojis.length)];
      const options = shuffle([correct.name, ...shuffle(emojis.filter(e => e.name !== correct.name)).slice(0, 3).map(e => e.name)]);
      p.question = { id: randomUUID(), emoji: correct.emoji, answer: correct.name, options };
    }
    const { id, emoji, options } = p.question;
    res.json({ id, emoji, options, score: p.score, played: p.played });
  });
  app.post("/api/guess", (req, res) => {
    const p = req.player;
    const q = p.question;
    if (!q || req.body?.questionId !== q.id) return res.status(409).json({ error: "Question already answered or invalid." });
    if (!q.options.includes(req.body.guess)) return res.status(400).json({ error: "Choose a listed option." });
    const correct = q.answer === req.body.guess;
    p.played++;
    if (correct) p.score++;
    p.question = null;
    res.json({ correct, answer: q.answer, score: p.score, played: p.played });
  });
  app.use((req, res) => res.status(404).json({ error: "Route not found." }));
  app.use((error, req, res, next) => res.status(error.type === "entity.parse.failed" ? 400 : 500).json({ error: "Unable to process request." }));
  return app;
}
if (require.main === module) {
  const port = process.env.PORT || 3000;
  createApp().listen(port, () => console.log(`Emoji Game: http://localhost:${port}`));
}
module.exports = { createApp, emojis };
