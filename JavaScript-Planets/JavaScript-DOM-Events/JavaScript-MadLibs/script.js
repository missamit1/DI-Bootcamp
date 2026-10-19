// Daily Challenge: Mad Libs

const form = document.getElementById("libform");
const storyElement = document.getElementById("story");
const shuffleButton = document.getElementById("shuffle-button");

let savedWords = null;
let currentStoryIndex = -1;

// Create different stories
function createStories(words) {
    const { noun, adjective, person, verb, place } = words;

    return [
        `One day, ${person} found a ${adjective} ${noun} in ${place} and decided to ${verb} with it!`,

        `${person} went to ${place} to ${verb}, but suddenly a ${adjective} ${noun} appeared!`,

        `In the middle of ${place}, ${person} saw a ${adjective} ${noun} trying to ${verb}!`,

        `Everyone in ${place} was surprised when ${person} started to ${verb} with a ${adjective} ${noun}!`,

        `${person} always dreamed of visiting ${place}, but never expected to find a ${adjective} ${noun} that could ${verb}!`
    ];
}

// Display a random story
function displayRandomStory() {
    if (!savedWords) {
        return;
    }

    const stories = createStories(savedWords);

    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * stories.length);
    } while (randomIndex === currentStoryIndex);

    currentStoryIndex = randomIndex;

    storyElement.textContent = stories[randomIndex];
}

// Handle form submission
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const noun = document.getElementById("noun").value.trim();
    const adjective = document.getElementById("adjective").value.trim();
    const person = document.getElementById("person").value.trim();
    const verb = document.getElementById("verb").value.trim();
    const place = document.getElementById("place").value.trim();

    // Check empty inputs
    if (!noun || !adjective || !person || !verb || !place) {
        alert("Please fill in all the fields.");
        return;
    }

    savedWords = {
        noun,
        adjective,
        person,
        verb,
        place
    };

    currentStoryIndex = -1;

    displayRandomStory();
});

// Bonus: Shuffle the story
shuffleButton.addEventListener("click", function() {
    if (!savedWords) {
        alert("Please generate a story first!");
        return;
    }

    displayRandomStory();
});