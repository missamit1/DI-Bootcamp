const chalk = require("chalk");

function displayColorfulMessage() {
  console.log(chalk.cyan.bold("Learning Node.js modules is fun!"));
  console.log(chalk.green("Modules, npm packages, and files working together."));
}

module.exports = { displayColorfulMessage };
