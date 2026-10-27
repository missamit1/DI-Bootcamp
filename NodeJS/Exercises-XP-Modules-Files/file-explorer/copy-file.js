const fs = require("node:fs");
const path = require("node:path");

const content = fs.readFileSync(path.join(__dirname, "source.txt"), "utf8");
fs.writeFileSync(path.join(__dirname, "destination.txt"), content, "utf8");
console.log("Copied source.txt to destination.txt");
