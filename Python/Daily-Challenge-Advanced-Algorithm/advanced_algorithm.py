import random


def find_pairs(numbers, target):
    """Return each unique value pair, using two separate list entries."""
    seen = set()
    pairs = set()

    for number in numbers:
        complement = target - number
        if complement in seen:
            pair = (min(number, complement), max(number, complement))
            pairs.add(pair)
        seen.add(number)

    return sorted(pairs)


if __name__ == "__main__":
    list_of_numbers = [random.randint(0, 10000) for _ in range(20000)]
    target_number = 3728

    for first, second in find_pairs(list_of_numbers, target_number):
        print(f"{first} and {second} sums to the target_number {target_number}")
