
// ========================================
// EXERCISE 1: Scope
// ========================================

// #1
function funcOne() {
    let a = 5;

    if (a > 1) {
        a = 3;
    }

    alert(`inside the funcOne function ${a}`);
}

// Prediction: 3
// Explanation: a starts as 5 and changes to 3.
// With const a = 5, assigning a = 3 throws a TypeError.

funcOne();


// #2
// Using a separate name to avoid conflicts
let aTwo = 0;

function funcTwo() {
    aTwo = 5;
}

function funcThree() {
    alert(`inside the funcThree function ${aTwo}`);
}

// Prediction: 0, then 5
// Explanation: funcTwo changes the shared variable.
// With const, assigning a new value throws a TypeError.

funcThree();
funcTwo();
funcThree();


// #3
function funcFour() {
    window.exerciseThreeValue = "hello";
}

function funcFive() {
    alert(`inside the funcFive function ${window.exerciseThreeValue}`);
}

// Prediction: hello
// Explanation: window properties can be accessed globally
// in a browser environment.

funcFour();
funcFive();


// #4
let aFour = 1;

function funcSix() {
    let aFour = "test";
    alert(`inside the funcSix function ${aFour}`);
}

// Prediction: test
// Explanation: the local variable shadows the outer variable.
// Using const for either declaration gives the same output.

funcSix();


// #5
let aFive = 2;

if (true) {
    let aFive = 5;
    alert(`in the if block ${aFive}`);
}

alert(`outside of the if block ${aFive}`);

// Prediction: 5 inside, 2 outside.
// Explanation: let and const are block-scoped.
// Replacing both declarations with const gives the same output.


// ========================================
// EXERCISE 2: Ternary Operator
// ========================================

const winBattle = () => true;

const experiencePoints = winBattle() ? 10 : 1;

console.log(experiencePoints);


// ========================================
// EXERCISE 3: Is it a String?
// ========================================

const isString = value => typeof value === "string";

console.log(isString("hello"));
console.log(isString([1, 2, 4, 0]));


// ========================================
// EXERCISE 4: Find the Sum
// ========================================

const sum = (a, b) => a + b;

console.log(sum(5, 7));


// ========================================
// EXERCISE 5: Kg and Grams
// ========================================

// Function declaration
function kgToGrams(weight) {
    return weight * 1000;
}

console.log(kgToGrams(5));

// Function expression
const convertWeight = function(weight) {
    return weight * 1000;
};

console.log(convertWeight(3));

// A function declaration is hoisted and can be called before
// its declaration; a function expression assigned to const
// cannot be called before its initialization.

// Arrow function
const convertKg = weight => weight * 1000;

console.log(convertKg(2));


// ========================================
// EXERCISE 6: Fortune Teller
// ========================================

(function(children, partner, location, job) {
    const fortune = document.getElementById("fortune");

    fortune.textContent =
        `You will be a ${job} in ${location}, and married to ${partner} with ${children} kids.`;
})(2, "Alex", "Tokyo", "Developer");


// ========================================
// EXERCISE 7: Welcome
// ========================================

(function(username) {
    const navbar = document.getElementById("navbar");

    const profile = document.createElement("div");

    const name = document.createElement("span");
    name.textContent = username;

    const image = document.createElement("img");
    image.src = "https://placehold.co/60x60/png";
    image.alt = `${username}'s profile picture`;
    image.width = 60;
    image.height = 60;

    profile.appendChild(image);
    profile.appendChild(name);

    navbar.appendChild(profile);
})("John");


// ========================================
// EXERCISE 8: Juice Bar - Part I
// ========================================

function makeJuicePartOne(size) {

    function addIngredients(first, second, third) {
        const text = document.createElement("p");

        text.textContent =
            `The client wants a ${size} juice, containing ${first}, ${second}, ${third}.`;

        document.getElementById("juice").appendChild(text);
    }

    addIngredients("apple", "banana", "orange");
}

makeJuicePartOne("large");


// ========================================
// EXERCISE 8: Juice Bar - Part II
// ========================================

function makeJuice(size) {
    const ingredients = [];

    function addIngredients(first, second, third) {
        ingredients.push(first, second, third);
    }

    function displayJuice() {
        const text = document.createElement("p");

        text.textContent =
            `The client wants a ${size} juice, containing ${ingredients.join(", ")}.`;

        document.getElementById("juice").appendChild(text);
    }

    addIngredients("apple", "banana", "orange");
    addIngredients("mango", "strawberry", "pineapple");

    displayJuice();
}

makeJuice("medium");
