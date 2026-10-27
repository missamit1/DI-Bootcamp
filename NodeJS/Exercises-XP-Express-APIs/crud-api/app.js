const express = require("express");
const dataService = require("./data/dataService");

function createApp(fetchPosts = dataService.fetchPosts) {
  const app = express();
  app.get("/posts", async (req, res) => {
    try {
      const posts = await fetchPosts();
      res.json(posts);
      console.log("Posts successfully retrieved and sent.");
    } catch {
      res.status(502).json({ error: "Unable to retrieve posts. Please try again." });
    }
  });
  app.use((req, res) => res.status(404).json({ error: "Route not found" }));
  return app;
}

if (require.main === module) {
  const port = process.env.PORT || 5000;
  createApp().listen(port, () => console.log(`Server running on http://localhost:${port}`));
}
module.exports = { createApp };
