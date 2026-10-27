const express = require("express");

function createApp() {
  const app = express();
  const data = [{ id: 1, title: "The Hobbit", author: "J. R. R. Tolkien", publishedYear: 1937 }, { id: 2, title: "Pride and Prejudice", author: "Jane Austen", publishedYear: 1813 }];
  let nextId = data.length + 1;
  app.use(express.json());

  function valid(body) {
    return body && typeof body.title === "string" && body.title.trim() && typeof body.author === "string" && body.author.trim() && Number.isInteger(body.publishedYear);
  }

  app.get("/api/books", (req, res) => res.json(data));
  app.get("/api/books/:bookId", (req, res) => {
    const item = data.find(item => item.id === Number(req.params.bookId));
    if (!item) return res.status(404).json({ error: "Book not found" });
    res.json(item);
  });
  app.post("/api/books", (req, res) => {
    if (!valid(req.body)) return res.status(400).json({ error: "Invalid or missing fields" });
    const item = { id: nextId++, title: req.body.title, author: req.body.author, publishedYear: req.body.publishedYear };
    data.push(item);
    res.status(201).json(item);
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
  const port = process.env.PORT || 5000;
  createApp().listen(port, () => console.log(`Server running on http://localhost:${port}`));
}
module.exports = { createApp };
