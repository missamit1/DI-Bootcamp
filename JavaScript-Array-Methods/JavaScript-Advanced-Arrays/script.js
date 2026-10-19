// Daily Challenge: Advanced Array Methods

const gameInfo = [
    {
        username: "john",
        team: "red",
        score: 5,
        items: ["ball", "book", "pen"]
    },
    {
        username: "becky",
        team: "blue",
        score: 10,
        items: ["tape", "backpack", "pen"]
    },
    {
        username: "susy",
        team: "red",
        score: 55,
        items: ["ball", "eraser", "pen"]
    },
    {
        username: "tyson",
        team: "green",
        score: 1,
        items: ["book", "pen"]
    }
];

// ========================================
// EXERCISE 1: Usernames
// ========================================

const usernames = [];

gameInfo.forEach(player => {
    usernames.push(player.username + "!");
});

console.log(usernames);


// ========================================
// EXERCISE 2: Winners
// ========================================

const winners = [];

gameInfo.forEach(player => {
    if (player.score > 5) {
        winners.push(player.username);
    }
});

console.log(winners);


// ========================================
// EXERCISE 3: Total Score
// ========================================

let totalScore = 0;

gameInfo.forEach(player => {
    totalScore += player.score;
});

console.log("Total score:", totalScore);