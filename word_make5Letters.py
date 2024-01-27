import re

with open(r'C:\Users\Baptiste\VsCodeProjects\Wordle\create.txt', 'r', encoding='utf-8') as input_file:
    words = input_file.read().split()

five_letter_words = []
for word in words:
    if len(word) == 5 and re.findall(r'[a-zA-Z]{5}', word) and word.lower() not in five_letter_words:
        five_letter_words.append(word.lower())

print(len(five_letter_words))

with open(r'C:\Users\Baptiste\VsCodeProjects\Wordle\five_letter_words_V2.txt', 'w') as output_file:
    output_file.write(' '.join(five_letter_words))
