const express = require("express");
const quizRouter = require("./routes/quiz");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", (req, res) => res.redirect("/quiz"));
app.use("/quiz", quizRouter);
app.use((req, res) => res.status(404).send("Page not found"));
app.use((error, req, res, next) => res.status(error.type === "entity.parse.failed" ? 400 : 500).send("Unable to process request."));
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Trivia Quiz: http://localhost:${port}/quiz`));
}
module.exports = app;
