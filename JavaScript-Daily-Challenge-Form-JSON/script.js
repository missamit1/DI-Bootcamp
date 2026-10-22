const form = document.getElementById("name-form");
const output = document.getElementById("output");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const person = {
    name: document.getElementById("name").value,
    lastname: document.getElementById("lastname").value,
  };

  output.textContent = JSON.stringify(person);
});
