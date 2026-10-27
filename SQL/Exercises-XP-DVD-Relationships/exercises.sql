-- Run once in a practice copy of dvdrental, in the order shown.
-- This exercise creates/deletes sample records, updates films and drops a table.

-- Exercise 1
-- 1. All languages.
SELECT * FROM language;

-- 2. Films and their languages.
SELECT f.title, f.description, l.name AS language_name
FROM film AS f JOIN language AS l ON l.language_id = f.language_id;

-- 3. Include languages that have no films.
SELECT f.title, f.description, l.name AS language_name
FROM language AS l LEFT JOIN film AS f ON f.language_id = l.language_id;

-- 4. New films.
CREATE TABLE new_film (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
INSERT INTO new_film (name) VALUES ('The Matrix'), ('Finding Nemo');

-- 5. Reviews: deleting a film deletes its reviews automatically.
CREATE TABLE customer_review (
    review_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    film_id INTEGER NOT NULL REFERENCES new_film(id) ON DELETE CASCADE,
    language_id INTEGER NOT NULL REFERENCES language(language_id),
    title VARCHAR(255) NOT NULL,
    score INTEGER NOT NULL CHECK (score BETWEEN 1 AND 10),
    review_text TEXT,
    last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 6. Use existing film and language IDs rather than guessing them.
INSERT INTO customer_review (film_id, language_id, title, score, review_text)
SELECT f.id, l.language_id, 'A memorable adventure', 9,
       'Creative storytelling and memorable characters.'
FROM new_film AS f CROSS JOIN language AS l
WHERE f.name = 'The Matrix' AND TRIM(l.name) = 'English';

INSERT INTO customer_review (film_id, language_id, title, score, review_text)
SELECT f.id, l.language_id, 'A wonderful ocean story', 8,
       'A warm story with beautiful animation.'
FROM new_film AS f CROSS JOIN language AS l
WHERE f.name = 'Finding Nemo' AND TRIM(l.name) = 'English';

SELECT * FROM customer_review;

-- 7. The Matrix review is deleted by ON DELETE CASCADE.
-- Finding Nemo and its review remain.
DELETE FROM new_film WHERE name = 'The Matrix';
SELECT * FROM customer_review;

-- Exercise 2
-- 1. Change two films to an existing language.
UPDATE film SET language_id = (
    SELECT language_id FROM language WHERE TRIM(name) = 'French'
)
WHERE film_id IN (1, 2)
  AND EXISTS (SELECT 1 FROM language WHERE TRIM(name) = 'French');

-- 2. Inspect the actual foreign keys in the supplied database.
SELECT conname AS constraint_name, pg_get_constraintdef(oid) AS definition
FROM pg_constraint
WHERE conrelid = 'public.customer'::regclass AND contype = 'f';
-- In the supplied DVD Rental dump, customer.address_id references
-- address.address_id. An inserted address_id must already exist in address.
-- store_id exists but has no declared foreign key in this particular dump.
-- Other database versions may differ; the query above shows their constraints.
-- Required columns and unique/primary-key constraints must also be respected.

-- 3. Dropping the referencing table is straightforward: its own foreign keys
-- disappear with it. The referenced language and new_film tables remain.
-- Check for dependent views or other referencing tables first: PostgreSQL's
-- default RESTRICT refuses the drop if such dependencies exist. Do not use CASCADE.
DROP TABLE customer_review;

-- 4. Outstanding rentals.
SELECT COUNT(*) AS outstanding_rentals FROM rental WHERE return_date IS NULL;

-- 5. Thirty most expensive distinct films with outstanding rentals.
-- Interpret "expensive" as DVD replacement_cost, not rental_rate.
SELECT f.film_id, f.title, f.replacement_cost
FROM film AS f
WHERE EXISTS (
    SELECT 1 FROM inventory AS i JOIN rental AS r ON r.inventory_id = i.inventory_id
    WHERE i.film_id = f.film_id AND r.return_date IS NULL
)
ORDER BY f.replacement_cost DESC, f.film_id ASC LIMIT 30;

-- 6.1. Sumo wrestler film featuring Penelope Monroe.
SELECT f.film_id, f.title, f.description
FROM film AS f
JOIN film_actor AS fa ON fa.film_id = f.film_id
JOIN actor AS a ON a.actor_id = fa.actor_id
WHERE f.description ILIKE '%sumo%'
  AND a.first_name ILIKE 'Penelope' AND a.last_name ILIKE 'Monroe';

-- 6.2. Short R-rated documentary, using the description as the clue.
SELECT film_id, title, description, length, rating
FROM film
WHERE description ILIKE '%documentary%' AND length < 60 AND rating = 'R';

-- 6.3. Matthew Mahan paid over $4 and returned it July 28–August 1 inclusive.
SELECT DISTINCT f.film_id, f.title
FROM film AS f
JOIN inventory AS i ON i.film_id = f.film_id
JOIN rental AS r ON r.inventory_id = i.inventory_id
JOIN customer AS c ON c.customer_id = r.customer_id
JOIN payment AS p ON p.rental_id = r.rental_id AND p.customer_id = c.customer_id
WHERE c.first_name ILIKE 'Matthew' AND c.last_name ILIKE 'Mahan'
  AND p.amount > 4.00
  AND r.return_date >= TIMESTAMP '2005-07-28 00:00:00'
  AND r.return_date < TIMESTAMP '2005-08-02 00:00:00';

-- 6.4. Boat-related films Matthew rented, most expensive to replace first.
-- No price threshold was supplied, so list candidates by replacement cost.
SELECT DISTINCT f.film_id, f.title, f.description, f.replacement_cost
FROM film AS f
JOIN inventory AS i ON i.film_id = f.film_id
JOIN rental AS r ON r.inventory_id = i.inventory_id
JOIN customer AS c ON c.customer_id = r.customer_id
WHERE c.first_name ILIKE 'Matthew' AND c.last_name ILIKE 'Mahan'
  AND (f.title ILIKE '%boat%' OR f.description ILIKE '%boat%')
ORDER BY f.replacement_cost DESC, f.film_id ASC;
