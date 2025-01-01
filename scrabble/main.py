
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

if __name__ == "__main__":
    Main(View())
    