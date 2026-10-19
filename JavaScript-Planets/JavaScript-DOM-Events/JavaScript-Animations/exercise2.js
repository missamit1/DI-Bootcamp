// Exercise 2: Move the Box

let animationInterval;

function myMove() {
    const box = document.getElementById("animate");

    let position = 0;

    // Prevent multiple intervals
    clearInterval(animationInterval);

    box.style.left = "0px";

    animationInterval = setInterval(function () {

        if (position >= 350) {
            clearInterval(animationInterval);
        } else {
            position++;
            box.style.left = position + "px";
        }

    }, 1);
}