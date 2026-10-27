const { greet } = require("./greeting");
const { displayColorfulMessage } = require("./colorful-message");
const { displayFileContent } = require("./read-file");

const userName = process.argv[2] || "Alice";
console.log(greet(userName));
displayColorfulMessage();
displayFileContent();
