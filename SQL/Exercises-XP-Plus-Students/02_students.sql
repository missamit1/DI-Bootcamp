-- Run in the bootcamp database. Dates below use YYYY-MM-DD.
CREATE TABLE students (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    last_name VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL
);

INSERT INTO students (first_name, last_name, birth_date)
VALUES
    ('Marc', 'Benichou', DATE '1998-11-02'),
    ('Yoan', 'Cohen', DATE '2010-12-03'),
    ('Lea', 'Benichou', DATE '1987-07-27'),
    ('Amelia', 'Dux', DATE '1996-04-07'),
    ('David', 'Grez', DATE '2003-06-14'),
    ('Omer', 'Simpson', DATE '1980-10-03');

INSERT INTO students (last_name, first_name, birth_date)
VALUES ('Ashkenazi', 'Amit', DATE '2001-10-20')
RETURNING id;

-- Select 1: all data.
SELECT * FROM students;

-- Select 2: first and last names.
SELECT first_name, last_name FROM students;

-- Select 3.1
SELECT first_name, last_name FROM students WHERE id = 2;

-- Select 3.2
SELECT first_name, last_name FROM students
WHERE last_name = 'Benichou' AND first_name = 'Marc';

-- Select 3.3
SELECT first_name, last_name FROM students
WHERE last_name = 'Benichou' OR first_name = 'Marc';

-- Select 3.4: contains a, ignoring case.
SELECT first_name, last_name FROM students WHERE first_name ILIKE '%a%';

-- Select 3.5: starts with a, ignoring case.
SELECT first_name, last_name FROM students WHERE first_name ILIKE 'a%';

-- Select 3.6: ends with a, ignoring case.
SELECT first_name, last_name FROM students WHERE first_name ILIKE '%a';

-- Select 3.7: second-to-last letter is a.
SELECT first_name, last_name FROM students WHERE first_name ILIKE '%a_';

-- Select 3.8: a single ID cannot equal both 1 and 3; this returns no rows.
SELECT first_name, last_name FROM students WHERE id = 1 AND id = 3;

-- To retrieve both students (IDs 1 and 3), use IN instead.
SELECT first_name, last_name FROM students WHERE id IN (1, 3);

-- Select 4: born on or after January 1, 2000.
SELECT * FROM students WHERE birth_date >= DATE '2000-01-01';
