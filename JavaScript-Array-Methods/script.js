// ========================================
// EXERCISE 1: Colors
// ========================================

const colors = [
    "Blue", "Green", "Red", "Orange",
    "Violet", "Indigo", "Yellow"
];

colors.forEach((color, index) => {
    console.log(`${index + 1}# choice is ${color}.`);
});

const hasViolet = colors.some(color => color === "Violet");

console.log(hasViolet ? "Yeah" : "No...");


// ========================================
// EXERCISE 2: Colors #2
// ========================================

const ordinal = ["th", "st", "nd", "rd"];

colors.forEach((color, index) => {
    const position = index + 1;

    const suffix = position <= 3
        ? ordinal[position]
        : ordinal[0];

    console.log(`${position}${suffix} choice is ${color}.`);
});


// ========================================
// EXERCISE 3: Analyzing
// ========================================

// Part 1
const fruits = ["apple", "orange"];
const vegetables = ["carrot", "potato"];

const result = [
    "bread",
    ...vegetables,
    "chicken",
    ...fruits
];

console.log(result);

// Output:
// ["bread", "carrot", "potato", "chicken", "apple", "orange"]


// Part 2
const country = "USA";

console.log([...country]);

// Output:
// ["U", "S", "A"]


// Bonus
let newArray = [...[,,]];

console.log(newArray);

// Output:
// [undefined, undefined]


// ========================================
// EXERCISE 4: Employees
// ========================================

const users = [
    { firstName: "Bradley", lastName: "Bouley", role: "Full Stack Resident" },
    { firstName: "Chloe", lastName: "Alnaji", role: "Full Stack Resident" },
    { firstName: "Jonathan", lastName: "Baughn", role: "Enterprise Instructor" },
    { firstName: "Michael", lastName: "Herman", role: "Lead Instructor" },
    { firstName: "Robert", lastName: "Hajek", role: "Full Stack Resident" },
    { firstName: "Wes", lastName: "Reid", role: "Instructor" },
    { firstName: "Zach", lastName: "Klabunde", role: "Instructor" }
];

// Part 1: map
const welcomeStudents = users.map(user => {
    return `Hello ${user.firstName}`;
});

console.log(welcomeStudents);

// Part 2: filter
const fullStackResidents = users.filter(user => {
    return user.role === "Full Stack Resident";
});

console.log(fullStackResidents);

// Bonus: filter + map
const residentLastNames = users
    .filter(user => user.role === "Full Stack Resident")
    .map(user => user.lastName);

console.log(residentLastNames);


// ========================================
// EXERCISE 5: Star Wars
// ========================================

const epic = [
    "a", "long", "time", "ago",
    "in a", "galaxy", "far far", "away"
];

const sentence = epic.reduce((accumulator, word) => {
    return accumulator + " " + word;
});

console.log(sentence);

// Output:
// a long time ago in a galaxy far far away


// ========================================
// EXERCISE 6: Employees #2
// ========================================

const students = [
    { name: "Ray", course: "Computer Science", isPassed: true },
    { name: "Liam", course: "Computer Science", isPassed: false },
    { name: "Jenner", course: "Information Technology", isPassed: true },
    { name: "Marco", course: "Robotics", isPassed: true },
    { name: "Kimberly", course: "Artificial Intelligence", isPassed: false },
    { name: "Jamie", course: "Big Data", isPassed: false }
];

// Part 1: filter
const passedStudents = students.filter(student => student.isPassed);

console.log(passedStudents);

// Bonus: filter + forEach
students
    .filter(student => student.isPassed)
    .forEach(student => {
        console.log(
            `Good job ${student.name}, you passed the course in ${student.course}`
        );
    });