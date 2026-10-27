# Registration and Login with JSON Storage

Run `npm ci`, then `npm start`. Open http://localhost:3000/register.html or http://localhost:3000/login.html. Override the port with `PORT`.

The register form has five required fields; the login form has two. Buttons stay disabled until required fields contain valid values and while a request is in progress. Messages appear on the page.

## API

- POST /register: requires username and password; accepts first_name, last_name, email.
- POST /login: username and password.
- GET /users: safe user list, without hashes.
- GET /users/:id: safe user details.
- PUT /users/:id: update any supported fields, including password (rehashed).

IDs are UUIDs. Passwords have a 72-byte UTF-8 limit. Per the exercise, registration rejects either a duplicate username or a password matching another user's bcrypt hash. Updates enforce the same rule. This password-uniqueness behavior is for this assignment, not a recommended production policy. User listing and updates have no authentication, as requested; login verifies credentials without creating a session.

Responses: 201 registration, 200 successful requests, 400 invalid input, 401 incorrect credentials, 404 missing user/route, 409 duplicate, 500 file errors.

`users.json` begins as `[]`. Passwords are hashed with bcrypt. Writes are queued within one process and use a temporary file followed by rename. Corrupt or missing files are not silently replaced. Run one server process per data file. Only public assets are served; users.json is not publicly accessible.

## Example

```sh
curl -X POST http://localhost:3000/register -H 'Content-Type: application/json' -d '{"username":"amit","password":"example-password","first_name":"Amit","last_name":"Ashkenazi","email":"amit@example.com"}'
curl -X POST http://localhost:3000/login -H 'Content-Type: application/json' -d '{"username":"amit","password":"example-password"}'
curl http://localhost:3000/users
```

Run `npm test` for API/storage tests and form behavior tests. Tests use temporary data and leave users.json empty.
