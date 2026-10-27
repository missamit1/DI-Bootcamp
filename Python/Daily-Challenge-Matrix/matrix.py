MATRIX_STR = """
7ir
Tsi
h%x
i ?
sM# 
$a 
#t%"""


def decode_matrix(matrix_string):
    matrix = [list(row) for row in matrix_string.strip("\n").splitlines()]
    if not matrix:
        return ""

    column_count = max(len(row) for row in matrix)
    column_text = ""
    for column in range(column_count):
        for row in matrix:
            if column < len(row):
                column_text += row[column]
            else:
                column_text += " "

    decoded_message = ""
    pending_space = False
    for character in column_text:
        if character.isalpha():
            if pending_space and decoded_message:
                decoded_message += " "
            decoded_message += character
            pending_space = False
        else:
            pending_space = True

    return decoded_message


if __name__ == "__main__":
    print(decode_matrix(MATRIX_STR))
