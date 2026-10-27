# Task Management API

## Run

```sh
npm ci
npm start
```

The API listens on port 3000 (override with `PORT`). `tasks.json` starts with `[]` and is resolved relative to the app directory.

## Routes

| Method | Path | Result |
| --- | --- | --- |
| GET | /tasks | All tasks |
| GET | /tasks/:id | One task |
| POST | /tasks | Create a task (201) |
| PUT | /tasks/:id | Update supplied task fields |
| DELETE | /tasks/:id | Delete a task (204) |

Task fields: generated UUID `id`, required nonblank `title` (up to 200 characters), optional `description` (up to 5000 characters, defaults to empty), and boolean `completed` (defaults to false). PUT requires at least one valid field and preserves omitted fields. IDs cannot be changed.

```sh
curl -X POST http://localhost:3000/tasks -H 'Content-Type: application/json' -d '{"title":"Learn Express","description":"Build a task API"}'
curl http://localhost:3000/tasks
```

Copy the returned ID into these requests:

```sh
curl http://localhost:3000/tasks/TASK_ID
curl -X PUT http://localhost:3000/tasks/TASK_ID -H 'Content-Type: application/json' -d '{"completed":true}'
curl -X DELETE http://localhost:3000/tasks/TASK_ID
```

Invalid input/IDs return 400, missing tasks/routes return 404, oversized requests return 413, and storage errors return 500. Missing or corrupt files are not silently overwritten. Writes use a temporary file and rename, and updates are queued to prevent lost changes within one server process. Run only one server process against a given file.

## Tests

`npm test` uses temporary files and HTTP requests to test CRUD, validation, persistence, concurrent writes, corrupt/missing files and write failures. The submitted `tasks.json` stays empty.
