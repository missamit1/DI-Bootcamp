// Daily Challenge: Solar System

const planets = [
    { name: "Mercury", color: "gray", moons: 0 },
    { name: "Venus", color: "goldenrod", moons: 0 },
    { name: "Earth", color: "royalblue", moons: 1 },
    { name: "Mars", color: "orangered", moons: 2 },
    { name: "Jupiter", color: "peru", moons: 4 },
    { name: "Saturn", color: "tan", moons: 5 },
    { name: "Uranus", color: "lightblue", moons: 5 },
    { name: "Neptune", color: "darkblue", moons: 2 }
];

const section = document.querySelector(".listPlanets");

planets.forEach(planet => {

    // Create planet
    const planetDiv = document.createElement("div");

    planetDiv.classList.add("planet");

    planetDiv.style.backgroundColor = planet.color;

    planetDiv.textContent = planet.name;

    // Create moons
    for (let i = 0; i < planet.moons; i++) {

        const moon = document.createElement("div");

        moon.classList.add("moon");

        moon.style.left = `${i * 25}px`;
        moon.style.top = "80px";

        planetDiv.appendChild(moon);
    }

    // Add planet to solar system
    section.appendChild(planetDiv);
});