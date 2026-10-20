// Daily Challenge: Giphy Random GIFs

const apiKey = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

const form = document.getElementById("gifForm");
const categoryInput = document.getElementById("category");
const gifContainer = document.getElementById("gifContainer");
const deleteAllButton = document.getElementById("deleteAll");

// Fetch one random GIF
async function getRandomGif(category) {
    try {
        const url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${encodeURIComponent(category)}&rating=g`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();

        const gifUrl = result.data.images?.original?.url;

        if (!gifUrl) {
            alert("No GIF found for this category.");
            return;
        }

        // Create container for this GIF
        const gifBox = document.createElement("div");

        // Create image
        const image = document.createElement("img");
        image.src = gifUrl;
        image.alt = category;
        image.width = 250;

        // Create DELETE button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "DELETE";

        deleteButton.addEventListener("click", function () {
            gifBox.remove();
        });

        // Add image and button
        gifBox.appendChild(image);
        gifBox.appendChild(deleteButton);

        // Display GIF on page
        gifContainer.appendChild(gifBox);

    } catch (error) {
        console.error("Error fetching GIF:", error);
        alert("Something went wrong while fetching the GIF.");
    }
}

// Form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const category = categoryInput.value.trim();

    if (category === "") {
        alert("Please enter a category.");
        return;
    }

    getRandomGif(category);
});

// DELETE ALL button
deleteAllButton.addEventListener("click", function () {
    gifContainer.innerHTML = "";
});