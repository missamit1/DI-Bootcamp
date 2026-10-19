// Exercise 1: Timer

const container = document.getElementById("container");
const clearButton = document.getElementById("clear");

// Part I - Alert after 2 seconds
setTimeout(function () {
    alert("Hello World");
}, 2000);

// Function to add a paragraph
function addParagraph() {
    const paragraph = document.createElement("p");

    paragraph.textContent = "Hello World";

    container.appendChild(paragraph);
}

// Part II - Add a paragraph after 2 seconds
setTimeout(addParagraph, 2000);

// Part III - Add a paragraph every 2 seconds
const interval = setInterval(function () {
    addParagraph();

    // Stop when there are 5 paragraphs
    if (container.querySelectorAll("p").length >= 5) {
        clearInterval(interval);
    }
}, 2000);

// Stop when button is clicked
clearButton.addEventListener("click", function () {
    clearInterval(interval);
});