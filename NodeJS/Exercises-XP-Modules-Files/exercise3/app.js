const path = require("node:path");
const { readFile, writeFile } = require("./fileManager");

console.log(readFile(path.join(__dirname, "Hello World.txt")));
writeFile(path.join(__dirname, "Bye World.txt"), "Writing to the file");
console.log(readFile(path.join(__dirname, "Bye World.txt")));
