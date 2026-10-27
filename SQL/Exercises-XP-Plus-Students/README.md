# Students — Exercises XP Plus

PostgreSQL / pgAdmin:

1. Run `01_create_database.sql` once while connected to `postgres`, with auto-commit enabled. `CREATE DATABASE` cannot run inside a transaction.
2. Open a Query Tool connected to `bootcamp` and run `02_students.sql` once.

The scripts do not drop or overwrite existing databases or tables. Use a fresh exercise database. The identity column generates IDs 1–6 for the sample students and 7 for the personal row.

The supplied dates are interpreted as day/month/year and written as ISO dates. Letter searches use case-insensitive `ILIKE`, so Amelia matches the starts-with-a condition.

For the ambiguous ID condition, both the literal `id = 1 AND id = 3` (no rows) and `id IN (1, 3)` (both students) are included.
