# Express and Knex database APIs

Two independent projects, each using PostgreSQL through Knex and separate config, models, controllers and routes.

## Run either project

1. Start PostgreSQL and use a practice `postgres` database.
2. Open `blog-api` or `book-api` in a terminal.
3. Run `npm ci`.
4. Copy `.env.example` to `.env` and set your own PostgreSQL credentials.
5. Run `npm run migrate` to create the project table.
6. Run `npm start`.

The blog runs on port 3000; the books API runs on port 5000. Both may share the same database because they use different tables. Never commit `.env`.

## Routes

Blog: GET /posts, GET /posts/:id, POST /posts, PUT /posts/:id, DELETE /posts/:id.
POST and PUT require JSON containing nonempty `title` and `content` strings.

Books: GET /api/books, GET /api/books/:bookId, POST /api/books.
POST requires JSON with nonempty `title` and `author` strings and a nonnegative integer `publishedYear`.

Creates return 201, deletes return 204, missing records/routes return 404, invalid input returns 400 and unexpected server errors return 500.

## Tests

Run `npm test` in each project. Tests exercise the real Express routes, Knex models and migrations using pg-mem, a PostgreSQL emulator. They verify reads, writes, validation and errors; blog tests also verify updates and deletes. A separate PostgreSQL server is required to run the apps normally. Tests do not certify behavior against a live PostgreSQL server.

Knex migration reference: https://knexjs.org/guide/migrations
