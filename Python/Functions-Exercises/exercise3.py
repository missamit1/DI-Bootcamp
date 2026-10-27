def describe_city(city, country="Unknown"):
    print(f"{city} is in {country}.")


if __name__ == "__main__":
    describe_city("Reykjavik", "Iceland")
    describe_city("Paris")
