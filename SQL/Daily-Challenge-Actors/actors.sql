-- Use the existing actors table from the lesson.

-- 1. Count all actors.
SELECT COUNT(*) AS actor_count FROM actors;

-- 2. Attempt to add an actor with all fields omitted.
-- Run this test in a fresh transaction, separately from other work.
BEGIN;
INSERT INTO actors DEFAULT VALUES;
ROLLBACK;

-- Omitted fields receive their default value, or NULL without a default.
-- Automatically generated IDs can receive a value as usual.
-- If a field has NOT NULL and no default, PostgreSQL rejects the row.
-- Otherwise, the insert may succeed if all constraints are satisfied.
-- ROLLBACK removes the test row if it was accepted.
-- If pgAdmin stops at the INSERT error, run ROLLBACK; separately.
-- Identity/sequence values may still be consumed despite the rollback.

-- A blank text value ('') is not the same as NULL.
-- NOT NULL alone permits an empty string; a CHECK constraint may reject it.
-- Empty strings are not valid integer or date values.
-- The exact result depends on the actors table definition from the lesson.
