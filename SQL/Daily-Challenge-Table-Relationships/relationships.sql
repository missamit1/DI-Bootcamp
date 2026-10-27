-- Run once in a new practice database, separate from dvdrental.

-- Part I: One-to-one relationship.
CREATE TABLE Customer (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL
);

CREATE TABLE Customer_Profile (
    id SERIAL PRIMARY KEY,
    isLoggedIn BOOLEAN NOT NULL DEFAULT FALSE,
    customer_id INTEGER NOT NULL UNIQUE REFERENCES Customer(id)
);
-- UNIQUE prevents multiple profiles for the same customer.
-- NOT NULL ensures each profile belongs to a customer.

INSERT INTO Customer (first_name, last_name) VALUES
    ('John', 'Doe'), ('Jerome', 'Lalu'), ('Lea', 'Rive');

INSERT INTO Customer_Profile (customer_id, isLoggedIn) VALUES
    ((SELECT id FROM Customer WHERE first_name = 'John' AND last_name = 'Doe'), TRUE);
INSERT INTO Customer_Profile (customer_id) VALUES
    ((SELECT id FROM Customer WHERE first_name = 'Jerome' AND last_name = 'Lalu'));

-- Logged-in customers: John.
SELECT c.first_name
FROM Customer AS c JOIN Customer_Profile AS p ON p.customer_id = c.id
WHERE p.isLoggedIn = TRUE;

-- All customers, including Lea whose profile fields are NULL.
SELECT c.first_name, p.isLoggedIn
FROM Customer AS c LEFT JOIN Customer_Profile AS p ON p.customer_id = c.id
ORDER BY c.id;

-- Not logged in: Jerome and Lea (2). No profile means not logged in.
SELECT COUNT(*) AS not_logged_in
FROM Customer AS c LEFT JOIN Customer_Profile AS p ON p.customer_id = c.id
WHERE p.isLoggedIn IS NOT TRUE;

-- Part II: Many-to-many relationship.
CREATE TABLE Book (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL
);
INSERT INTO Book (title, author) VALUES
    ('Alice In Wonderland', 'Lewis Carroll'),
    ('Harry Potter', 'J.K Rowling'),
    ('To kill a mockingbird', 'Harper Lee');

CREATE TABLE Student (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    age INTEGER CHECK (age <= 15)
);
INSERT INTO Student (name, age) VALUES
    ('John', 12), ('Lera', 11), ('Patrick', 10), ('Bob', 14);

-- Use student_fk_id consistently for the student foreign key.
CREATE TABLE Library (
    book_fk_id INTEGER REFERENCES Book(book_id) ON DELETE CASCADE ON UPDATE CASCADE,
    student_fk_id INTEGER REFERENCES Student(student_id) ON DELETE CASCADE ON UPDATE CASCADE,
    borrowed_date DATE NOT NULL,
    PRIMARY KEY (book_fk_id, student_fk_id)
);

INSERT INTO Library (book_fk_id, student_fk_id, borrowed_date) VALUES
    ((SELECT book_id FROM Book WHERE title = 'Alice In Wonderland'),
     (SELECT student_id FROM Student WHERE name = 'John'), DATE '2022-02-15'),
    ((SELECT book_id FROM Book WHERE title = 'To kill a mockingbird'),
     (SELECT student_id FROM Student WHERE name = 'Bob'), DATE '2021-03-03'),
    ((SELECT book_id FROM Book WHERE title = 'Alice In Wonderland'),
     (SELECT student_id FROM Student WHERE name = 'Lera'), DATE '2021-05-23'),
    ((SELECT book_id FROM Book WHERE title = 'Harry Potter'),
     (SELECT student_id FROM Student WHERE name = 'Bob'), DATE '2021-08-12');

SELECT * FROM Library ORDER BY student_fk_id, book_fk_id;

SELECT s.name, b.title
FROM Library AS l
JOIN Student AS s ON s.student_id = l.student_fk_id
JOIN Book AS b ON b.book_id = l.book_fk_id
ORDER BY s.name, b.title;

-- Average of John's and Lera's ages: 11.5.
SELECT AVG(s.age) AS average_age
FROM Library AS l
JOIN Student AS s ON s.student_id = l.student_fk_id
JOIN Book AS b ON b.book_id = l.book_fk_id
WHERE b.title = 'Alice In Wonderland';

-- Bob's two borrowing records are automatically removed; the books remain.
DELETE FROM Student WHERE name = 'Bob';
SELECT * FROM Library ORDER BY student_fk_id, book_fk_id;
