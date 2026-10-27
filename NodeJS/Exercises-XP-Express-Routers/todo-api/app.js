const express = require("express");
const router = require("./routes/todos");

const app = express();
app.use(express.json());
app.use("/todos", router);
app.use((req, res) => res.status(404).json({ error: "Route not found" }));
app.use((error, req, res, next) => {
  const status = error.type === "entity.parse.failed" ? 400 : 500;
  res.status(status).json({ error: status === 400 ? "Invalid JSON" : "Internal server error" });
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
}
module.exports = app;
