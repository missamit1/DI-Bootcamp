def make_shirt(size="large", text="I love Python"):
    print(f"The size of the shirt is {size} and the text is {text}.")


if __name__ == "__main__":
    make_shirt()
    make_shirt("medium")
    make_shirt(size="small", text="Custom message")
