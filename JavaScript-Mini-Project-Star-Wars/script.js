function getElements() {
  return {
    character: document.getElementById("character"),
    button: document.getElementById("find-button"),
  };
}

const elements = getElements();
let people = [];

async function fetchJSON(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function getRandomCharacter() {
  if (people.length === 0) {
    let url = "https://www.swapi.tech/api/people?page=1&limit=100";
    const availablePeople = [];
    while (url) {
      const data = await fetchJSON(url);
      availablePeople.push(...data.results);
      url = data.next;
    }
    if (availablePeople.length === 0) {
      throw new Error("No characters found.");
    }
    people = availablePeople;
  }

  const randomPerson = people[Math.floor(Math.random() * people.length)];
  const data = await fetchJSON(randomPerson.url);
  const person = data.result.properties;
  const planet = await fetchJSON(person.homeworld);
  return { ...person, homeworld: planet.result.properties.name };
}

function displayCharacter(person) {
  elements.character.replaceChildren();
  const name = document.createElement("h2");
  name.textContent = person.name;
  elements.character.append(name);

  const details = [
    ["Height", person.height],
    ["Gender", person.gender],
    ["Birth Year", person.birth_year],
    ["Home World", person.homeworld],
  ];
  for (const [label, value] of details) {
    const paragraph = document.createElement("p");
    paragraph.textContent = `${label}: ${value}`;
    elements.character.append(paragraph);
  }
}

function displayLoading() {
  elements.character.innerHTML = '<div class="spinner" aria-hidden="true"></div><h2>Loading...</h2>';
}

function displayError() {
  elements.character.innerHTML = "<h2>Oh No! That person isn't available.</h2><p>Please try again.</p>";
}

async function findSomeone() {
  elements.button.disabled = true;
  elements.character.setAttribute("aria-busy", "true");
  displayLoading();
  try {
    const person = await getRandomCharacter();
    displayCharacter(person);
  } catch (error) {
    console.error(error);
    displayError();
  } finally {
    elements.button.disabled = false;
    elements.character.setAttribute("aria-busy", "false");
  }
}

elements.button.addEventListener("click", findSomeone);
