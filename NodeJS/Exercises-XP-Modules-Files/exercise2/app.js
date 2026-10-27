import { people } from "./data.js";

export function averageAge(persons) {
  if (persons.length === 0) return 0;
  return persons.reduce((total, person) => total + person.age, 0) / persons.length;
}

console.log(`Average age: ${averageAge(people)}`);
