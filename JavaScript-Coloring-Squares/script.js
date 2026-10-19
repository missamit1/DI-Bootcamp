// Coloring Squares Mini Project

const palette = document.getElementById("palette");
const board = document.getElementById("board");
const clearButton = document.getElementById("clear");

const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "pink",
    "brown",
    "black",
    "white",
    "gray",
    "cyan"
];

let selectedColor = "red";
let isDrawing = false;

// Create color palette
colors.forEach(color => {
    const colorBox = document.createElement("div");

    colorBox.classList.add("color");
    colorBox.style.backgroundColor = color;

    if (color === selectedColor) {
        colorBox.classList.add("selected");
    }

    colorBox.addEventListener("click", () => {
        selectedColor = color;

        document.querySelectorAll(".color").forEach(box => {
            box.classList.remove("selected");
        });

        colorBox.classList.add("selected");
    });

    palette.appendChild(colorBox);
});

// Create drawing grid
for (let i = 0; i < 1200; i++) {
    const square = document.createElement("div");

    square.classList.add("square");

    square.addEventListener("pointerdown", event => {
        isDrawing = true;
        square.style.backgroundColor = selectedColor;
        event.preventDefault();
    });

    square.addEventListener("pointerover", () => {
        if (isDrawing) {
            square.style.backgroundColor = selectedColor;
        }
    });

    board.appendChild(square);
}

// Stop drawing when pointer is released
document.addEventListener("pointerup", () => {
    isDrawing = false;
});

document.addEventListener("pointercancel", () => {
    isDrawing = false;
});

// Clear the board
clearButton.addEventListener("click", () => {
    document.querySelectorAll(".square").forEach(square => {
        square.style.backgroundColor = "white";
    });
});