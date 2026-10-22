function isAnagram(firstString, secondString) {
  const normalize = (text) =>
    text.toLowerCase().replace(/\s/g, "").split("").sort().join("");

  return normalize(firstString) === normalize(secondString);
}

console.log(isAnagram("Astronomer", "Moon starer"));
console.log(isAnagram("School master", "The classroom"));
console.log(isAnagram("The Morse Code", "Here come dots"));
console.log(isAnagram("hello", "world"));
