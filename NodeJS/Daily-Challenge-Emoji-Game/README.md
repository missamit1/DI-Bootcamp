# Emoji Guessing Game

Run `npm ci`, then `npm start`, and open http://localhost:3000.

Enter a name, choose an option and submit. Fetch sends the guess to the Express API. Correct guesses earn one point. Click Next emoji to continue. The leaderboard shows the top ten player sessions.

Scores and questions are stored in server memory and reset on restart. Random session tokens separate players; this is not persistent account authentication. The server checks answers and prevents repeated scoring of the same question.
