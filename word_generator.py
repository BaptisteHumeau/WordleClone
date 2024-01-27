import nltk
import random

words = nltk.corpus.words.words()
words = [word for word in words if len(word) == 5]

loops = 0
while loops < 10000:
    word = random.choice(words)

    with open('word_generated.txt', 'a') as f:
        f.write(word + ' ')
        loops += 1
