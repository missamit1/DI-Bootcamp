"use strict";
// Exercise 1
console.log("Hello, World!");
// Exercise 2
{
    const age = 25;
    const name = "Alice";
    console.log(age, name);
}
// Exercise 3
let id = 123;
console.log(id);
id = "user-123";
console.log(id);
// Exercise 4
function checkNumber(value) {
    if (value > 0) {
        return "positive";
    }
    else if (value < 0) {
        return "negative";
    }
    else {
        return "zero";
    }
}
console.log(checkNumber(5), checkNumber(-5), checkNumber(0));
// Exercise 5
function getDetails(name, age) {
    return [name, age, `Hello, ${name}! You are ${age} years old.`];
}
const details = getDetails("Alice", 25);
console.log(details);
function createPerson(name, age) {
    return { name, age };
}
console.log(createPerson("Alice", 25));
// Exercise 7
if (typeof document !== "undefined") {
    const input = document.getElementById("name-input");
    if (input) {
        input.value = "Hello, TypeScript!";
        console.log(input.value);
    }
}
// Exercise 8
function getAction(role) {
    switch (true) {
        case role === "admin":
            return "Manage users and settings";
        case role === "editor":
            return "Edit content";
        case role === "viewer":
            return "View content";
        case role === "guest":
            return "Limited access";
        default:
            return "Invalid role";
    }
}
for (const role of ["admin", "editor", "viewer", "guest", "unknown"]) {
    console.log(getAction(role));
}
function greet(name = "World") {
    return `Hello, ${name}!`;
}
console.log(greet());
console.log(greet("Alice"));
