const products = require("./products");

function findProduct(name) {
  return products.find(product => product.name.toLowerCase() === name.toLowerCase());
}

for (const name of ["Laptop", "Book", "Phone"]) {
  console.log(findProduct(name) || `Product not found: ${name}`);
}
module.exports = { findProduct };
