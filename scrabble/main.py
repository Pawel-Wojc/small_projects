
import itertools
import random

from view import View


class Main: 
    words = []
    def __init__(self, view: View):
        self.words = self.load_words_from_file("./slowa.txt")
        view.print_number_of_loaded_words(len(self.words))
        self.letters = self.load_letters_from_file("./litery.txt")
        view.print_number_of_loaded_letters(len(self.letters))
        self.new_word = self.generate_new_word(7)
        view.print_new_word(self.new_word)
        self.best_word, self.best_score = self.find_best_word(self.new_word)
        view.print_best_word(self.best_word, self.best_score)
        

    def generate_new_word(self, num_tiles):
        if self.letters and self.words:
            if len(self.letters) < num_tiles:
                raise ValueError("Nie można wylosować więcej elementów niż dostępnych w liście.")
        return random.sample(self.letters, num_tiles)

    def load_words_from_file(self, file_path):
        words = []
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                for line in file:
                    words.append(line.strip())
        except FileNotFoundError:
            print(f"Plik {file_path} nie istnieje.")
        except Exception as e:
            print(f"Wystąpił błąd: {e}")
        return words
    def load_letters_from_file(self, file_path):
        letters = []
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                for line in file:
                    line = line.strip()
                    if line: 
                        letter, value = line.split(',')
                        letters.append((letter, int(value)))
        except FileNotFoundError:
            print(f"Plik {file_path} nie istnieje.")
        except ValueError as e:
            print(f"Błąd w pliku: {e}")
        return letters

    def find_best_word(self, tiles):
    # Tworzymy zestaw liter i punktów
        letters = [letter for letter, _ in tiles]
        letter_scores = {letter: value for letter, value in tiles}

        # Zestaw wszystkich liter alfabetu
        alphabet = [chr(i) for i in range(ord('a'), ord('z') + 1)]

        best_word = ""
        best_score = 0

        # Generujemy kombinacje liter
        for length in range(1, len(letters) + 1):
            for combination in itertools.permutations(letters, length):
                candidate = "".join(letter if letter else '_' for letter in combination)  # Blank jako "_"
                
                # Jeśli blank, zastępujemy go każdą możliwą literą
                if '_' in candidate:
                    blank_positions = [i for i, letter in enumerate(candidate) if letter == '_']
                    for replacements in itertools.product(alphabet, repeat=len(blank_positions)):
                        temp_candidate = list(candidate)
                        for pos, replacement in zip(blank_positions, replacements):
                            temp_candidate[pos] = replacement
                        temp_candidate = "".join(temp_candidate)

                        # Sprawdź, czy zmieniona kombinacja jest w słowniku
                        if temp_candidate in self.words:
                            score = sum(letter_scores.get(letter, 0) for letter in temp_candidate if letter in letter_scores)
                            if score > best_score:
                                best_word = temp_candidate
                                best_score = score
                else:
                    if candidate in self.words:
                        score = sum(letter_scores.get(letter, 0) for letter in candidate)
                        if score > best_score:
                            best_word = candidate
                            best_score = score

        return best_word, best_score





if __name__ == "__main__":
    Main(View())
    