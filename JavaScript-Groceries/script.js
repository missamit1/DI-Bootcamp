// Daily Challenge: Groceries

let client = "John";

const groceries = {
    fruits: ["pear", "apple", "banana"],
    vegetables: ["tomatoes", "cucumber", "salad"],
    totalPrice: "20$",
    other: {
        paid: true,
        meansOfPayment: ["cash", "creditCard"]
    }
};

// Exercise 1 - Display Groceries

const displayGroceries = () => {
    groceries.fruits.forEach(fruit => {
        console.log(fruit);
    });
};

displayGroceries();


// Exercise 2 - Clone Groceries

const cloneGroceries = () => {

    // Pass By Value
    let user = client;

    client = "Betty";

    console.log("Client:", client);
    console.log("User:", user);

    // Pass By Reference
    let shopping = groceries;

    groceries.totalPrice = "35$";

    console.log("Groceries price:", groceries.totalPrice);
    console.log("Shopping price:", shopping.totalPrice);

    groceries.other.paid = false;

    console.log("Groceries paid:", groceries.other.paid);
    console.log("Shopping paid:", shopping.other.paid);
};

cloneGroceries();