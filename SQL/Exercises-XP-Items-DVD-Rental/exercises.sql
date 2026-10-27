-- Exercise 1: Run this section in the database containing items and customers.
-- Assumed lesson schema: items(item_id, item_name, item_price),
-- customers(customer_id, first_name, last_name).

-- 1. All items, cheapest first.
SELECT * FROM items ORDER BY item_price ASC;

-- 2. Items costing at least 80, most expensive first.
SELECT * FROM items WHERE item_price >= 80 ORDER BY item_price DESC;

-- 3. First three customers alphabetically, without the primary key.
SELECT first_name, last_name FROM customers
ORDER BY first_name ASC, last_name ASC LIMIT 3;

-- 4. Only last names, in reverse alphabetical order.
SELECT last_name FROM customers ORDER BY last_name DESC;

-- Exercise 2: Switch the pgAdmin connection to dvdrental before running below.

-- 1. All customer details.
SELECT * FROM customer;

-- 2. Full names.
SELECT first_name || ' ' || last_name AS full_name FROM customer;

-- 3. Unique account creation dates.
SELECT DISTINCT create_date FROM customer;

-- 4. Customers in descending first-name order.
SELECT * FROM customer ORDER BY first_name DESC;

-- 5. Films ordered by rental rate.
SELECT film_id, title, description, release_year, rental_rate
FROM film ORDER BY rental_rate ASC, film_id ASC;

-- 6. Addresses and phone numbers in Texas.
SELECT address, phone FROM address WHERE district = 'Texas';

-- 7. Films 15 and 150.
SELECT * FROM film WHERE film_id IN (15, 150);

-- 8. Example favorite movie: replace The Matrix with your chosen title.
SELECT film_id, title, description, length, rental_rate
FROM film WHERE LOWER(title) = LOWER('The Matrix');

-- 9. Titles beginning with the first two letters of that movie.
SELECT film_id, title, description, length, rental_rate
FROM film WHERE title ILIKE LEFT('The Matrix', 2) || '%';

-- 10. The ten cheapest films; film_id breaks ties consistently.
SELECT * FROM film ORDER BY rental_rate ASC, film_id ASC LIMIT 10;

-- 11. The next ten cheapest films, without LIMIT (bonus).
SELECT * FROM film ORDER BY rental_rate ASC, film_id ASC
OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY;

-- 12. Every payment with its customer's name.
SELECT c.first_name, c.last_name, p.amount, p.payment_date
FROM customer AS c JOIN payment AS p ON p.customer_id = c.customer_id
ORDER BY c.customer_id ASC, p.payment_id ASC;

-- 13. Films with no inventory copies.
SELECT f.* FROM film AS f
WHERE NOT EXISTS (SELECT 1 FROM inventory AS i WHERE i.film_id = f.film_id);

-- 14. Cities and their countries.
SELECT ci.city, co.country
FROM city AS ci JOIN country AS co ON co.country_id = ci.country_id;

-- 15. Customer payments ordered by the staff member (bonus).
SELECT c.customer_id, c.first_name, c.last_name, p.amount, p.payment_date
FROM customer AS c JOIN payment AS p ON p.customer_id = c.customer_id
ORDER BY p.staff_id ASC, c.customer_id ASC, p.payment_id ASC;
