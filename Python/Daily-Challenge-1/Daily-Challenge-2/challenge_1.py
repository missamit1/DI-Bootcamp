# Challenge 1: Letter Index Dictionary

word = input("Enter a word: ")

letters = {}

for index, letter in enumerate(word):
    if letter in letters:
        letters[letter].append(index)
    else:
        letters[letter] = [index]

print(letters)

# Challenge 2: Affordable Items

items_purchase = {
    "Water": "$1",
    "Bread": "$3",
    "TV": "$1,000",
    "Fertilizer": "$20"
}

wallet = "$300"

wallet = int(wallet.replace("$", "").replace(",", ""))

basket = []

for item, price in items_purchase.items():
    price = int(price.replace("$", "").replace(",", ""))

    if price <= wallet:
        basket.append(item)
        wallet -= price

if basket:
    print(sorted(basket))
else:
    print("Nothing")