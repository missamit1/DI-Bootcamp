const _ = require("lodash");
const { add, multiply } = require("./math");

console.log("Addition:", add(5, 3));
console.log("Multiplication:", multiply(5, 3));
console.log("Sum:", _.sum([1, 2, 3, 4]));
console.log("Unique numbers:", _.uniq([1, 2, 2, 3]));
