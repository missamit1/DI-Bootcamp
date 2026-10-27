def display_message():
    print("I am learning about functions in Python.")


if __name__ == "__main__":
    display_message()

def favorite_book(title):
    print(f"One of my favorite books is {title}.")


if __name__ == "__main__":
    favorite_book("Alice in Wonderland")

def describe_city(city, country="Unknown"):
    print(f"{city} is in {country}.")


if __name__ == "__main__":
    describe_city("Reykjavik", "Iceland")
    describe_city("Paris")

import random


def compare_numbers(number):
    if not 1 <= number <= 100:
        raise ValueError("The number must be between 1 and 100.")

    random_number = random.randint(1, 100)
    if number == random_number:
        print("Success!")
    else:
        print(f"Fail! Your number: {number}, Random number: {random_number}")


if __name__ == "__main__":
    compare_numbers(50)

def make_shirt(size="large", text="I love Python"):
    print(f"The size of the shirt is {size} and the text is {text}.")


if __name__ == "__main__":
    make_shirt()
    make_shirt("medium")
    make_shirt(size="small", text="Custom message")

magician_names = ["Harry Houdini", "David Blaine", "Criss Angel"]


def show_magicians(magician_names):
    for name in magician_names:
        print(name)


def make_great(magician_names):
    for index in range(len(magician_names)):
        magician_names[index] = f"{magician_names[index]} the Great"


if __name__ == "__main__":
    make_great(magician_names)
    show_magicians(magician_names)

import random


def get_random_temp():
    return random.randint(-10, 40)


def main():
    temperature = get_random_temp()
    print(f"The temperature right now is {temperature} degrees Celsius.")

    if temperature < 0:
        print("Brrr, that's freezing! Wear some extra layers today.")
    elif temperature < 16:
        print("Quite chilly! Don't forget your coat.")
    elif temperature < 24:
        print("Nice weather.")
    elif temperature < 32:
        print("A bit warm, stay hydrated.")
    else:
        print("It's really hot! Stay cool.")


if __name__ == "__main__":
    main()
