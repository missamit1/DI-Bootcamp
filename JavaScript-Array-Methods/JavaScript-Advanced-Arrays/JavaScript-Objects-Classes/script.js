// ========================================
// EXERCISE 1: Location
// ========================================

const person = {
    name: 'John Doe',
    age: 25,
    location: {
        country: 'Canada',
        city: 'Vancouver',
        coordinates: [49.2827, -123.1207]
    }
};

const {
    name,
    location: {
        country,
        city,
        coordinates: [lat, lng]
    }
} = person;

console.log(
    `I am ${name} from ${city}, ${country}. Latitude(${lat}), Longitude(${lng})`
);

// Output:
// I am John Doe from Vancouver, Canada.
// Latitude(49.2827), Longitude(-123.1207)


// ========================================
// EXERCISE 2: Display Student Info
// ========================================

function displayStudentInfo(objUser) {
    const { first, last } = objUser;

    return `Your full name is ${first} ${last}`;
}

console.log(
    displayStudentInfo({
        first: 'Elie',
        last: 'Schoppik'
    })
);

// Output:
// Your full name is Elie Schoppik


// ========================================
// EXERCISE 3: User & ID
// ========================================

const users = {
    user1: 18273,
    user2: 92833,
    user3: 90315
};

// Part 1: Convert object to array

const usersArray = Object.entries(users);

console.log(usersArray);

// Output:
// [
//   ['user1', 18273],
//   ['user2', 92833],
//   ['user3', 90315]
// ]


// Part 2: Multiply each ID by 2

const doubledUsers = usersArray.map(([username, id]) => {
    return [username, id * 2];
});

console.log(doubledUsers);

// Output:
// [
//   ['user1', 36546],
//   ['user2', 185666],
//   ['user3', 180630]
// ]


// ========================================
// EXERCISE 4: Person Class
// ========================================

class Person {
    constructor(name) {
        this.name = name;
    }
}

const member = new Person('John');

console.log(typeof member);

// Output:
// object


// ========================================
// EXERCISE 5: Dog Class
// ========================================

class Dog {
    constructor(name) {
        this.name = name;
    }
}

// Correct answer: Option 2

class Labrador extends Dog {
    constructor(name, size) {
        super(name);
        this.size = size;
    }
}

const myDog = new Labrador("Ray", "Medium");

console.log(myDog);

// Output:
// Labrador { name: 'Ray', size: 'Medium' }


// ========================================
// EXERCISE 6: Challenges
// ========================================

// Part 1: Compare arrays and objects

console.log([2] === [2]);
// Output: false

console.log({} === {});
// Output: false


// Part 2: Object references

const object1 = { number: 5 };
const object2 = object1;
const object3 = object2;
const object4 = { number: 5 };

object1.number = 4;

console.log(object2.number);
// Output: 4

console.log(object3.number);
// Output: 4

console.log(object4.number);
// Output: 5


// Part 3: Animal Class

class Animal {
    constructor(name, type, color) {
        this.name = name;
        this.type = type;
        this.color = color;
    }
}


// Part 4: Mammal Class

class Mammal extends Animal {
    constructor(name, type, color) {
        super(name, type, color);
    }

    sound(animalSound) {
        return `${animalSound} I'm a ${this.type}, named ${this.name} and I'm ${this.color}`;
    }
}


// Part 5: Farmer Cow

const farmerCow = new Mammal(
    "Lily",
    "cow",
    "brown and white"
);

console.log(farmerCow.sound("Moooo"));

// Output:
// Moooo I'm a cow, named Lily and I'm brown and white