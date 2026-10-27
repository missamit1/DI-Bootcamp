# Library System

Run `tsc -p .` to compile and `node library.js` to run the examples.

`Book` includes an optional genre and a readonly ISBN. `Library` stores books privately and supports adding books and looking them up by ISBN. A missing ISBN returns `undefined`.

`DigitalLibrary` inherits these methods, adds a readonly website and returns book titles through `listBooks()`. A protected method provides copies of books to the subclass while keeping the original array private.

The examples add two books, one with a genre and one without, then print their details and titles.
