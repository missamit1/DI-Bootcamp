const express = require("express");
const { randomUUID } = require("node:crypto");
const questions = require("../models/questions");
const router = express.Router();
const games = new Map();

function page(content) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Trivia Quiz</title><style>body{font-family:Arial,sans-serif;background:#eef1fa;color:#202c4b;margin:0;padding:30px 16px}main{max-width:560px;margin:auto;background:white;padding:30px;border-radius:16px}input,button{font:inherit;padding:12px;border-radius:8px}input{box-sizing:border-box;width:100%;margin:14px 0;border:1px solid #aaa}button{background:#3751a3;color:white;border:0;cursor:pointer}p{line-height:1.6}a{color:#3751a3}</style></head><body><main><h1>Trivia Quiz</h1>${content}</main></body></html>`;
}
router.use((req, res, next) => {
  const cookies = (req.headers.cookie || "").split(";").map(part => part.trim());
  const token = cookies.find(part => part.startsWith("quiz="))?.slice(5);
  req.game = games.get(token);
  res.set("Cache-Control", "no-store");
  next();
});
router.get("/", (req, res) => {
  if (!req.game) {
    const token = randomUUID();
    req.game = { index: 0, score: 0, feedback: "" };
    games.set(token, req.game);
    res.cookie("quiz", token, { httpOnly: true, sameSite: "lax", path: "/quiz" });
  }
  const game = req.game;
  if (game.index >= questions.length) return res.redirect("/quiz/score");
  res.send(page(`<p role="status">${game.feedback}</p><p>Question ${game.index + 1} of ${questions.length} · Score: ${game.score}</p><form method="post" action="/quiz"><label for="answer">${questions[game.index].question}</label><input id="answer" name="answer" required autocomplete="off"><input type="hidden" name="questionIndex" value="${game.index}"><button>Submit answer</button></form>`));
});
router.post("/", (req, res) => {
  const game = req.game;
  if (!game) return res.redirect(303, "/quiz");
  if (game.index >= questions.length) return res.redirect(303, "/quiz/score");
  if (String(req.body?.questionIndex) !== String(game.index)) return res.status(409).send(page('<p>This question has already been answered or is invalid.</p><a href="/quiz">Continue quiz</a>'));
  const answer = req.body?.answer;
  if (typeof answer !== "string" || !answer.trim()) return res.status(400).send(page('<p>Please enter an answer.</p><a href="/quiz">Back to question</a>'));
  const expected = questions[game.index].answer;
  const normalize = value => value.trim().replace(/\s+/g, " ").toLowerCase();
  if (normalize(answer) === normalize(expected)) {
    game.score++;
    game.feedback = "Correct! Well done.";
  } else {
    game.feedback = `Incorrect. The correct answer was ${expected}.`;
  }
  game.index++;
  res.redirect(303, game.index === questions.length ? "/quiz/score" : "/quiz");
});
router.get("/score", (req, res) => {
  const game = req.game;
  if (!game || game.index < questions.length) return res.redirect("/quiz");
  res.send(page(`<p role="status">${game.feedback}</p><h2>Quiz complete!</h2><p>Your final score: ${game.score} / ${questions.length}</p><form method="post" action="/quiz/restart"><button>Play again</button></form>`));
});
router.post("/restart", (req, res) => {
  if (req.game) Object.assign(req.game, { index: 0, score: 0, feedback: "" });
  res.redirect(303, "/quiz");
});
module.exports = router;
