// ========================================
// EXERCISE 1: Change the Article
// ========================================

const article = document.querySelector("article");

// Retrieve h1
const h1 = article.querySelector("h1");
console.log(h1);

// Remove last paragraph
article.lastElementChild.remove();

// Change h2 background to red on click
const h2 = article.querySelector("h2");

h2.addEventListener("click", function () {
    h2.style.backgroundColor = "red";
});

// Hide h3 on click
const h3 = article.querySelector("h3");

h3.addEventListener("click", function () {
    h3.style.display = "none";
});

// Make paragraphs bold
const boldButton = document.getElementById("boldButton");

boldButton.addEventListener("click", function () {
    const paragraphs = article.querySelectorAll("p");

    paragraphs.forEach(function (paragraph) {
        paragraph.style.fontWeight = "bold";
    });
});

// BONUS: Random h1 font size
h1.addEventListener("mouseover", function () {
    const randomSize = Math.floor(Math.random() * 101);
    h1.style.fontSize = randomSize + "px";
});

// BONUS: Fade out second paragraph
const secondParagraph = article.querySelectorAll("p")[1];

secondParagraph.addEventListener("mouseover", function () {
    secondParagraph.classList.add("fade-out");
});


// ========================================
// EXERCISE 2: Work with Forms
// ========================================

const userForm = document.getElementById("userForm");
console.log(userForm);

// Retrieve by ID
const firstName = document.getElementById("fname");
const lastName = document.getElementById("lname");

console.log(firstName);
console.log(lastName);

// Retrieve by name
console.log(document.querySelector('[name="firstname"]'));
console.log(document.querySelector('[name="lastname"]'));

userForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const fname = firstName.value.trim();
    const lname = lastName.value.trim();

    if (fname === "" || lname === "") {
        alert("Please fill in both fields.");
        return;
    }

    const answerList = document.querySelector(".usersAnswer");

    answerList.innerHTML = "";

    const firstLi = document.createElement("li");
    firstLi.textContent = fname;

    const lastLi = document.createElement("li");
    lastLi.textContent = lname;

    answerList.appendChild(firstLi);
    answerList.appendChild(lastLi);
});


// ========================================
// EXERCISE 3: Transform the Sentence
// ========================================

let allBoldItems;

function getBoldItems() {
    allBoldItems = document.querySelectorAll("#sentence strong");
}

function highlight() {
    allBoldItems.forEach(function (item) {
        item.style.color = "blue";
    });
}

function returnItemsToDefault() {
    allBoldItems.forEach(function (item) {
        item.style.color = "black";
    });
}

getBoldItems();

const sentence = document.getElementById("sentence");

sentence.addEventListener("mouseover", highlight);
sentence.addEventListener("mouseout", returnItemsToDefault);


// ========================================
// EXERCISE 4: Volume of a Sphere
// ========================================

const sphereForm = document.getElementById("MyForm");

sphereForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const radius = Number(document.getElementById("radius").value);

    if (!Number.isFinite(radius) || radius < 0) {
        alert("Please enter a valid radius.");
        return;
    }

    const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);

    document.getElementById("volume").value = volume.toFixed(2);
});