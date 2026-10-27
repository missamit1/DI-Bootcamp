"use strict";
const personWithAddress = {
    name: "Alice",
    age: 30,
    street: "10 Main Street",
    city: "London",
};
console.log(personWithAddress);
// Exercise 2
function describeValue(value) {
    if (typeof value === "number") {
        return "This is a number";
    }
    return "This is a string";
}
console.log(describeValue(42));
console.log(describeValue("hello"));
// Exercise 3
const someValue = "Hello, TypeScript!";
const stringValue = someValue;
console.log(stringValue.toUpperCase());
// Exercise 4
function getFirstElement(values) {
    if (values.length === 0) {
        return "";
    }
    const first = values[0];
    if (typeof first === "string") {
        return first;
    }
    return String(first);
}
console.log(getFirstElement(["hello", 42]));
console.log(getFirstElement([42, "hello"]));
// Exercise 5
function logLength(value) {
    console.log(value.length);
}
logLength("hello");
logLength([1, 2, 3]);
function isManager(employee) {
    return employee.position === "Manager";
}
function isDeveloper(employee) {
    return employee.position === "Developer";
}
function describeEmployee(employee) {
    if (isManager(employee)) {
        return `${employee.name} manages the ${employee.department} department.`;
    }
    if (isDeveloper(employee)) {
        return `${employee.name} develops software in the ${employee.department} department.`;
    }
    return `${employee.name} works as a ${employee.position} in the ${employee.department} department.`;
}
console.log(describeEmployee({ name: "Alice", age: 30, position: "Manager", department: "Sales" }));
console.log(describeEmployee({ name: "Bob", age: 25, position: "Developer", department: "Engineering" }));
// Exercise 7
function formatInput(value) {
    const text = value.toString();
    return text.trim();
}
console.log(formatInput("  hello  "));
console.log(formatInput(123));
console.log(formatInput(true));
