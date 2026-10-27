const express = require("express");
const router = express.Router();
const todos = [];
let nextId = 1;

function valid(body) {
  return body && typeof body.title === "string" && body.title.trim() && (body.completed === undefined || typeof body.completed === "boolean");
}

router.get("/", (req, res) => res.json(todos));

router.post("/", (req, res) => {
  if (!valid(req.body)) return res.status(400).json({ error: "Invalid or missing fields" });
  const item = { id: nextId++, title: req.body.title.trim(), completed: req.body.completed ?? false };
  todos.push(item);
  res.status(201).json(item);
});

router.put("/:id", (req, res) => {
  const index = todos.findIndex(item => item.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Item not found" });
  if (!valid(req.body)) return res.status(400).json({ error: "Invalid or missing fields" });
  todos[index] = { id: todos[index].id, title: req.body.title.trim(), completed: req.body.completed ?? false };
  res.json(todos[index]);
});

router.delete("/:id", (req, res) => {
  const index = todos.findIndex(item => item.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Item not found" });
  todos.splice(index, 1);
  res.status(204).end();
});

module.exports = router;
