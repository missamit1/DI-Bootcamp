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
