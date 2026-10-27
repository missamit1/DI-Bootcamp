# Express Router Exercises

Each directory is a separate project. Run `npm ci`, then `npm start` inside it.
All default to port 3000: run them separately or set `PORT=3001 npm start`.

- `simple-app`: GET `/` and `/about`.
- `todo-api`: GET/POST `/todos`, PUT/DELETE `/todos/:id`. POST and PUT accept `{"title":"Study","completed":false}`. Title is required; completed defaults to false. PUT replaces the item while preserving its ID.
- `book-api`: GET/POST `/books`, PUT/DELETE `/books/:id`. POST and PUT require `{"title":"The Hobbit","author":"J. R. R. Tolkien"}`.

Creates return 201, updates 200 and deletes 204. Invalid bodies return 400; missing items and routes return 404. In-memory data resets when the server restarts.
