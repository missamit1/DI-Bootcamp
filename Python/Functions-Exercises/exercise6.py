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
