# Advanced TypeScript Types — Exercises XP

All seven exercises are in `exercises.ts`.

Run `tsc -p .` to type-check and compile, then `node exercises.js` to run the examples.

A type assertion does not convert a value at runtime. Exercise 3 asserts a value that is already a string. Exercise 4 asserts the string branch and uses `String()` for a numeric first element, so it always returns an actual string. An empty array returns an empty string.

Exercise 6 uses type-predicate guards for Manager and Developer positions. Exercise 7 converts through `toString()` before the assertion and trims surrounding whitespace.
