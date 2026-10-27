# Express APIs — Exercises XP

In each project folder, run `npm ci`, then `npm start`.

- **blog-api**: port 3000. GET/POST `/posts`; GET/PUT/DELETE `/posts/:id`. POST and PUT require string `title` and `content` fields.
- **book-api**: port 5000. GET/POST `/api/books`; GET `/api/books/:bookId`. POST requires string `title`, string `author` and integer `publishedYear`.
- **crud-api**: port 5000. GET `/posts` retrieves JSONPlaceholder posts through the Axios data module.

Run the two port-5000 projects separately or set a different port, for example `PORT=5001 npm start`. Blog and book data is stored in memory and resets on restart. Exercise 2 implements the three endpoints specified in its instructions. Exercise 3 implements the required external-data endpoint.

Example creation request:

```sh
curl -X POST http://localhost:3000/posts -H 'Content-Type: application/json' -d '{"title":"Hello","content":"My first post"}'
```
