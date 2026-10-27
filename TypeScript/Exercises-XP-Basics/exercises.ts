// Exercise 1
console.log("Hello, World!");

// Exercise 2
{
  const age: number = 25;
  const name: string = "Alice";
  console.log(age, name);
}

// Exercise 3
let id: string | number = 123;
console.log(id);
id = "user-123";
console.log(id);

// Exercise 4
function checkNumber(value: number): string {
  if (value > 0) {
    return "positive";
  } else if (value < 0) {
    return "negative";
  } else {
    return "zero";
  }
}
console.log(checkNumber(5), checkNumber(-5), checkNumber(0));

// Exercise 5
function getDetails(name: string, age: number): [string, number, string] {
  return [name, age, `Hello, ${name}! You are ${age} years old.`];
}
const details = getDetails("Alice", 25);
console.log(details);

// Exercise 6
type Person = {
  name: string;
  age: number;
};

function createPerson(name: string, age: number): Person {
  return { name, age };
}
console.log(createPerson("Alice", 25));

// Exercise 7
if (typeof document !== "undefined") {
  const input = document.getElementById("name-input") as HTMLInputElement | null;
  if (input) {
    input.value = "Hello, TypeScript!";
    console.log(input.value);
  }
}

// Exercise 8
function getAction(role: string): string {
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

// Exercise 9
function greet(): string;
function greet(name: string): string;
function greet(name: string = "World"): string {
  return `Hello, ${name}!`;
}
console.log(greet());
console.log(greet("Alice"));
