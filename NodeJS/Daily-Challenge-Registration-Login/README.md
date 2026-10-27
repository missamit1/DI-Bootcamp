# Registration and login API

## Setup

1. Create a PostgreSQL database named `user_management`.
2. Run `npm ci` in this directory.
3. Copy `.env.example` to `.env` and set your database credentials.
4. Run `npm run migrate`, then `npm start` (port 3000).

`users` stores profile details; `hashpwd` stores bcrypt hashes. Registration writes both rows in one Knex transaction. A unique username foreign key keeps the tables linked and cascades username changes. Password hashes are never returned in API responses. The assignment's JSON-file reference is treated as a typo: credentials are read from the database.

## Requests

```sh
curl -X POST http://localhost:3000/register -H 'Content-Type: application/json' -d '{"username":"amit","password":"example-password","email":"amit@example.com","first_name":"Amit","last_name":"Ashkenazi"}'
curl -X POST http://localhost:3000/login -H 'Content-Type: application/json' -d '{"username":"amit","password":"example-password"}'
curl http://localhost:3000/users
curl http://localhost:3000/users/1
curl -X PUT http://localhost:3000/users/1 -H 'Content-Type: application/json' -d '{"first_name":"Amy"}'
```

Registration requires username and password; other profile fields are optional. PUT accepts any subset of username, password, email, first_name and last_name. Passwords are limited to 72 UTF-8 bytes to avoid bcrypt truncation. Username matching is case-sensitive.

Responses: registration 201; successful login/read/update 200; invalid input 400; wrong credentials 401; missing users/routes 404; duplicate username/email 409; unexpected errors 500.

This exercise checks credentials only: it does not issue a session or token, and user read/update endpoints are unprotected as specified. Use locally as a learning exercise.

## Tests

Run `npm test`. Tests use Express HTTP requests, real bcrypt, Knex and an isolated PGlite PostgreSQL engine, including transaction rollback. They do not require or modify your external PostgreSQL database.

References: [Knex transactions](https://knexjs.org/guide/transactions.html), [bcrypt](https://www.npmjs.com/package/bcrypt).
