def sort_words(words_string):
    words = words_string.split(",")
    words.sort()
    return ",".join(words)


def longest_word(sentence):
    words = sentence.split()
    longest = ""

    for word in words:
        if len(word) > len(longest):
            longest = word

    return longest


if __name__ == "__main__":
    words_string = input("Enter words separated by commas: ")
    print(sort_words(words_string))

    print(longest_word("Margaret's toy is a pretty doll."))
    print(longest_word("A thing of beauty is a joy forever."))
    print(longest_word("Forgetfulness is by all means powerless!"))
