const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const Parser = require("rss-parser");
const path = require("node:path");

const parser = new Parser();
const FEED_URL = "https://thefactfile.org/feed/";

async function loadFeed() {
  const response = await axios.get(FEED_URL, {
    timeout: 15000,
    responseType: "text",
    headers: { "User-Agent": "RSSFactsReader/1.0", Accept: "application/rss+xml, application/xml, text/xml" },
  });
  return parser.parseString(response.data);
}

function safeLink(link) {
  try {
    const url = new URL(link);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "#";
  } catch {
    return "#";
  }
}

function createApp(fetchFeed = loadFeed) {
  const app = express();
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "public"));
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false, limit: "10kb" }));

  async function renderFeed(req, res, page, mode) {
    const title = typeof req.body?.title === "string" ? req.body.title.trim() : "";
    const category = typeof req.body?.category === "string" ? req.body.category.trim() : "";
    const model = { posts: [], categories: [], title, category, searched: mode !== "initial", error: "", safeLink };
    try {
      const feed = await fetchFeed();
      const items = feed.items || [];
      model.categories = [...new Set(items.flatMap(item => item.categories || []))].sort();
      if (mode === "all") model.posts = items;
      if (mode === "title") {
        if (!title) {
          model.error = "Enter a title to search.";
          return res.status(400).render(page, model);
        }
        model.posts = items.filter(item => (item.title || "").toLowerCase().includes(title.toLowerCase()));
      }
      if (mode === "category") {
        if (!category) {
          model.error = "Choose a category.";
          return res.status(400).render(page, model);
        }
        model.posts = items.filter(item => (item.categories || []).includes(category));
      }
      res.render(page, model);
    } catch {
      model.error = "The facts feed is temporarily unavailable. Please try again.";
      res.status(502).render(page, model);
    }
  }

  app.get("/", (req, res) => renderFeed(req, res, "pages/index", "all"));
  app.get("/search", (req, res) => renderFeed(req, res, "pages/search", "initial"));
  app.post("/search/title", (req, res) => renderFeed(req, res, "pages/search", "title"));
  app.post("/search/category", (req, res) => renderFeed(req, res, "pages/search", "category"));
  return app;
}

if (require.main === module) {
  const port = process.env.PORT || 3000;
  createApp().listen(port, () => console.log(`RSS Facts Feed: http://localhost:${port}`));
}

module.exports = { createApp, loadFeed };
