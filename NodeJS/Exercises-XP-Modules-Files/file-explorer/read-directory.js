const fs = require("node:fs");
const path = require("node:path");

const directory = process.argv[2] ? path.resolve(process.argv[2]) : __dirname;
for (const name of fs.readdirSync(directory)) {
  console.log(name);
}
