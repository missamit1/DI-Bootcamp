const express = require("express");

function createApp() {
  const app = express();
  const data = [{ id: 1, title: "First post", content: "Welcome to the blog." }];
  let nextId = data.length + 1;
  app.use(express.json());

  function valid(body) {
    return body && typeof body.title === "string" && body.title.trim() && typeof body.content === "string" && body.content.trim();
  }

  app.get("/posts", (req, res) => res.json(data));
  app.get("/posts/:id", (req, res) => {
    const item = data.find(item => item.id === Number(req.params.id));
    if (!item) return res.status(404).json({ error: "Post not found" });
    res.json(item);
  });
  app.post("/posts", (req, res) => {
    if (!valid(req.body)) return res.status(400).json({ error: "Invalid or missing fields" });
    const item = { id: nextId++, title: req.body.title, content: req.body.content };
    data.push(item);
    res.status(201).json(item);
  });
  app.put("/posts/:id", (req, res) => {
    const index = data.findIndex(item => item.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Post not found" });
    if (!valid(req.body)) return res.status(400).json({ error: "Invalid or missing fields" });
    data[index] = { id: data[index].id, title: req.body.title, content: req.body.content };
    res.json(data[index]);
  });
  app.delete("/posts/:id", (req, res) => {
    const index = data.findIndex(item => item.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Post not found" });
    data.splice(index, 1);
    res.status(204).end();
  });
  app.use((req, res) => res.status(404).json({ error: "Route not found" }));
  app.use((error, req, res, next) => {
    if (error.type === "entity.parse.failed") return res.status(400).json({ error: "Invalid JSON" });
    if (error.type === "entity.too.large") return res.status(413).json({ error: "Request body too large" });
    res.status(500).json({ error: "Internal server error" });
  });
  return app;
}

if (require.main === module) {
  const port = process.env.PORT || 3000;
  createApp().listen(port, () => console.log(`Server running on http://localhost:${port}`));
}
module.exports = { createApp };
