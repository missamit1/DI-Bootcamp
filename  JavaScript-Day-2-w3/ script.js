// ========================================
// EXERCISE 1: Divisible by 23
// ========================================

function displayNumbersDivisible(divisor = 23) {
    let sum = 0;

    for (let i = 0; i <= 500; i++) {
        if (i % divisor === 0) {
            console.log(i);
            sum += i;
        }
    }

    console.log("Sum:", sum);
}

displayNumbersDivisible();


// ========================================
// EXERCISE 2: Shopping List
// ========================================

const stock = {
    banana: 6,
    apple: 0,
    pear: 12,
    orange: 32,
    blueberry: 1
};

const prices = {
    banana: 4,
    apple: 2,
    pear: 1,
    orange: 1.5,
    blueberry: 10
};

const shoppingList = ["banana", "orange", "apple"];

function myBill() {
    let total = 0;

    for (const item of shoppingList) {
        if (item in stock && stock[item] > 0) {
            total += prices[item];
            stock[item] -= 1;
        }
    }

    return total;
}

console.log("Shopping bill:", myBill());


// ========================================
// EXERCISE 3: What's in my wallet?
// ========================================

function changeEnough(itemPrice, amountOfChange) {
    const coinValues = [25, 10, 5, 1];

    let totalCents = 0;

    for (let i = 0; i < amountOfChange.length; i++) {
        totalCents += amountOfChange[i] * coinValues[i];
    }

    return totalCents >= Math.round(itemPrice * 100);
}

console.log(changeEnough(4.25, [25, 20, 5, 0]));
console.log(changeEnough(14.11, [2, 100, 0, 0]));
console.log(changeEnough(0.75, [0, 0, 20, 5]));


// ========================================
// EXERCISE 4: Vacation Costs
// ========================================

function askForNumber(message) {
    let answer;

    do {
        answer = prompt(message);
    } while (
        answer === null ||
        answer.trim() === "" ||
        !Number.isInteger(Number(answer)) ||
        Number(answer) < 0
    );

    return Number(answer);
}

function hotelCost() {
    const nights = askForNumber("How many hotel nights?");
    return nights * 140;
}

function planeRideCost() {
    let destination;

    do {
        destination = prompt("Where are you traveling?");
    } while (
        destination === null ||
        destination.trim() === ""
    );

    destination = destination.trim().toLowerCase();

    if (destination === "london") {
        return 183;
    }

    if (destination === "paris") {
        return 220;
    }

    return 300;
}

function rentalCarCost() {
    const days = askForNumber("How many rental days?");

    let total = days * 40;

    if (days > 10) {
        total *= 0.95;
    }

    return total;
}

function totalVacationCost() {
    const hotel = hotelCost();
    const plane = planeRideCost();
    const car = rentalCarCost();

    const total = hotel + plane + car;

    console.log(`Hotel: $${hotel}`);
    console.log(`Plane: $${plane}`);
    console.log(`Car: $${car}`);
    console.log(`Total: $${total}`);

    return total;
}

totalVacationCost();


// ========================================
// EXERCISE 5: Users
// ========================================

const container = document.getElementById("container");

console.log(container);

const userLists = document.querySelectorAll("ul.list");

// Change Pete to Richard
userLists[0].children[1].textContent = "Richard";

// Remove Sarah
userLists[1].children[1].remove();

// Change first user in each list
userLists.forEach(list => {
    list.firstElementChild.textContent = "Amit";
});

// Add classes
userLists.forEach(list => {
    list.classList.add("student_list");
});

userLists[0].classList.add("university", "attendance");

// Style container
container.style.backgroundColor = "lightblue";
container.style.padding = "20px";

// Hide Dan and style Richard
document.querySelectorAll("li").forEach(item => {
    if (item.textContent === "Dan") {
        item.style.display = "none";
    }

    if (item.textContent === "Richard") {
        item.style.border = "2px solid black";
    }
});

// Change body font size
document.body.style.fontSize = "20px";

// Bonus
if (container.style.backgroundColor === "lightblue") {
    const firstUser = userLists[0].firstElementChild.textContent;
    const secondUser = userLists[1].firstElementChild.textContent;

    alert(`Hello ${firstUser} and ${secondUser}`);
}


// ========================================
// EXERCISE 6: Change the Navbar
// ========================================

const navBar = document.getElementById("navBar");

navBar.setAttribute("id", "socialNetworkNavigation");

const navList = navBar.querySelector("ul");

const logoutItem = document.createElement("li");
const logoutText = document.createTextNode("Logout");

logoutItem.appendChild(logoutText);
navList.appendChild(logoutItem);

const firstNavItem = navList.firstElementChild;
const lastNavItem = navList.lastElementChild;

console.log(firstNavItem.textContent);
console.log(lastNavItem.textContent);


// ========================================
// EXERCISE 7: My Book List
// ========================================

const allBooks = [
    {
        title: "Harry Potter",
        author: "J.K. Rowling",
        image: "https://covers.openlibrary.org/b/isbn/9780439708180-M.jpg",
        alreadyRead: true
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        image: "https://covers.openlibrary.org/b/isbn/9780547928227-M.jpg",
        alreadyRead: false
    }
];

const booksSection = document.querySelector(".listBooks");

allBooks.forEach(book => {
    const bookDiv = document.createElement("div");

    const details = document.createElement("p");
    details.textContent = `${book.title} written by ${book.author}`;

    if (book.alreadyRead) {
        details.style.color = "red";
    }

    const image = document.createElement("img");
    image.src = book.image;
    image.width = 100;
    image.alt = book.title;

    bookDiv.appendChild(details);
    bookDiv.appendChild(image);

    booksSection.appendChild(bookDiv);
});