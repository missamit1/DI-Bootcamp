const express = require("express");
const router = express.Router();
const books = [];
let nextId = 1;

function valid(body) {
  return body && typeof body.title === "string" && body.title.trim() && typeof body.author === "string" && body.author.trim();
}

router.get("/", (req, res) => res.json(books));

router.post("/", (req, res) => {
  if (!valid(req.body)) return res.status(400).json({ error: "Invalid or missing fields" });
  const item = { id: nextId++, title: req.body.title.trim(), author: req.body.author.trim() };
  books.push(item);
  res.status(201).json(item);
});

router.put("/:id", (req, res) => {
  const index = books.findIndex(item => item.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Item not found" });
  if (!valid(req.body)) return res.status(400).json({ error: "Invalid or missing fields" });
  books[index] = { id: books[index].id, title: req.body.title.trim(), author: req.body.author.trim() };
  res.json(books[index]);
});

router.delete("/:id", (req, res) => {
  const index = books.findIndex(item => item.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Item not found" });
  books.splice(index, 1);
  res.status(204).end();
});

module.exports = router;
