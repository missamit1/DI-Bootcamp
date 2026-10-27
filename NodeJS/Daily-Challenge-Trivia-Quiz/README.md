# Trivia Quiz Game

Run `npm ci`, then `npm start`, and open http://localhost:3000/quiz.

GET `/quiz` starts or resumes a quiz. POST `/quiz` accepts the form fields `answer` and `questionIndex`, checks the answer and redirects to the next question. GET `/quiz/score` displays the final score after all questions. POST `/quiz/restart` resets the current game.

Questions are stored in `models/questions.js`; routes use `express.Router` in `routes/quiz.js`. Each browser receives a random session cookie with an independent score. Sessions live in memory and reset when the server restarts. Answers ignore case and extra whitespace. The question index prevents duplicate submissions from advancing or scoring twice.
