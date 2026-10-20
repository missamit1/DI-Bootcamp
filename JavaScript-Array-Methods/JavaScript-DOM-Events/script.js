
// ========================================
// EXERCISE 1: Change the Article
// ========================================

const article = document.querySelector("article");

// Retrieve h1 and log it
const h1 = article.querySelector("h1");
console.log(h1);

// Remove the last paragraph
const paragraphs = article.querySelectorAll("p");
paragraphs[paragraphs.length - 1].remove();

// Change h2 background color on click
const h2 = article.querySelector("h2");

h2.addEventListener("click", () => {
    h2.style.backgroundColor = "red";
});

// Hide h3 on click
const h3 = article.querySelector("h3");

h3.addEventListener("click", () => {
    h3.style.display = "none";
});

// Make all article paragraphs bold
const boldButton = document.getElementById("boldButton");

boldButton.addEventListener("click", () => {
    article.querySelectorAll("p").forEach(paragraph => {
        paragraph.style.fontWeight = "bold";
    });
});

// BONUS: Random font size on hover
h1.addEventListener("mouseover", () => {
    const randomSize = Math.floor(Math.random() * 101);
    h1.style.fontSize = `${randomSize}px`;
});

// BONUS: Fade out the second paragraph
const secondParagraph = article.querySelectorAll("p")[1];

secondParagraph.addEventListener("mouseover", () => {
    secondParagraph.classList.add("fade-out");
});


// ========================================
// EXERCISE 2: Work with Forms
// ========================================

const userForm = document.getElementById("userForm");
console.log(userForm);

// Retrieve inputs by ID
const firstNameInput = document.getElementById("fname");
const lastNameInput = document.getElementById("lname");

console.log(firstNameInput);
console.log(lastNameInput);

// Retrieve inputs by name
const firstNameByName = document.querySelector(
    '[name="firstname"]'
);

const lastNameByName = document.querySelector(
    '[name="lastname"]'
);

console.log(firstNameByName);
console.log(lastNameByName);

// Handle form submission
userForm.addEventListener("submit", event => {
    event.preventDefault();

    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();

    if (!firstName || !lastName) {
        alert("Please fill in both fields.");
        return;
    }

    const usersAnswer = document.querySelector(".usersAnswer");

    usersAnswer.innerHTML = "";

    const firstLi = document.createElement("li");
    firstLi.textContent = firstName;

    const lastLi = document.createElement("li");
    lastLi.textContent = lastName;

    usersAnswer.appendChild(firstLi);
    usersAnswer.appendChild(lastLi);
});


// ========================================
// EXERCISE 3: Transform the Sentence
// ========================================

let allBoldItems;

function getBoldItems() {
    allBoldItems = document.querySelectorAll(
        "#sentence strong"
    );
}

function highlight() {
    allBoldItems.forEach(item => {
        item.style.color = "blue";
    });
}

function returnItemsToDefault() {
    allBoldItems.forEach(item => {
        item.style.color = "black";
    });
}

getBoldItems();

const sentence = document.getElementById("sentence");

sentence.addEventListener("mouseover", highlight);

sentence.addEventListener(
    "mouseout",
    returnItemsToDefault
);


// ========================================
// EXERCISE 4: Volume of a Sphere
// ========================================

const sphereForm = document.getElementById("MyForm");

sphereForm.addEventListener("submit", event => {
    event.preventDefault();

    const radiusInput = document.getElementById("radius");
    const volumeInput = document.getElementById("volume");

    const radius = Number(radiusInput.value);

    if (
        radiusInput.value.trim() === "" ||
        !Number.isFinite(radius) ||
        radius < 0
    ) {
        alert("Please enter a valid radius.");
        return;
    }

    // Formula: V = 4/3 * PI * r^3
    const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);

    volumeInput.value = volume.toFixed(2);
});
