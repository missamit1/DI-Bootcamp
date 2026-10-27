-- Predictions made before executing the queries:
-- Q1: 0. The subquery returns NULL. NOT IN (NULL) is UNKNOWN for every row.
-- Q2: 2. The subquery returns 5. Only IDs 6 and 7 satisfy NOT IN (5).
-- Q3: 0. The subquery returns 5 and NULL. ID 5 fails; all other IDs
-- produce UNKNOWN because of NULL, so no rows pass the WHERE clause.
-- Q4: 2. Removing NULL from the subquery leaves 5, so IDs 6 and 7 pass.
-- In Q2 and Q4, Avtaar's NULL ID produces UNKNOWN and is excluded.
-- WHERE keeps only TRUE conditions, not FALSE or UNKNOWN.

-- Run in a fresh query session. Temporary tables leave existing tables intact.
CREATE TEMP TABLE FirstTab (
    id INTEGER,
    name VARCHAR(10)
);

INSERT INTO FirstTab (id, name) VALUES
    (5, 'Pawan'),
    (6, 'Sharlee'),
    (7, 'Krish'),
    (NULL, 'Avtaar');

SELECT * FROM FirstTab;

CREATE TEMP TABLE SecondTab (
    id INTEGER
);

INSERT INTO SecondTab (id) VALUES (5), (NULL);

SELECT * FROM SecondTab;

-- Q1: expected COUNT(*) = 0.
SELECT COUNT(*)
FROM FirstTab AS ft
WHERE ft.id NOT IN (SELECT id FROM SecondTab WHERE id IS NULL);

-- Q2: expected COUNT(*) = 2.
SELECT COUNT(*)
FROM FirstTab AS ft
WHERE ft.id NOT IN (SELECT id FROM SecondTab WHERE id = 5);

-- Q3: expected COUNT(*) = 0.
SELECT COUNT(*)
FROM FirstTab AS ft
WHERE ft.id NOT IN (SELECT id FROM SecondTab);

-- Q4: expected COUNT(*) = 2.
SELECT COUNT(*)
FROM FirstTab AS ft
WHERE ft.id NOT IN (SELECT id FROM SecondTab WHERE id IS NOT NULL);
