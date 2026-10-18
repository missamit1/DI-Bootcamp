# Challenge 1: Multiples of a Number

number = int(input("Enter a number: "))
length = int(input("Enter a length: "))

numbers = []

for i in range(1, length + 1):
    numbers.append(number * i)

print(numbers)

# Challenge 2: Remove Consecutive Duplicate Letters

word = input("Enter a word: ")

result = ""

for letter in word:
    if result == "" or letter != result[-1]:
        result += letter

print(result)