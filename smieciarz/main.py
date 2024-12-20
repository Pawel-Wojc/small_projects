# main.py
from view import View
from smieciarz import Smieciarz
import random

class Main:
    win_wallet_balance = 25
    transaction_fee = 0.1
    min_trash_price = 1.5
    max_trash_price = 2.5
    min_wallet_balance = min_trash_price + transaction_fee

    def __init__(self, view: View, smieciarz: Smieciarz):
        self.view = view
        self.smieciarz = smieciarz
        self.view.print_welcome()
        self.main_loop()

    def main_loop(self):
        while True:
            if self.smieciarz.wallet_balance >= self.win_wallet_balance:
                self.view.print_win(self.smieciarz.wallet_balance)
                return
            
            if self.smieciarz.wallet_balance < self.min_wallet_balance and self.smieciarz.trash == 0:
                self.view.print_game_over()
                return
            
            self.view.print_menu(self.smieciarz.wallet_balance, self.smieciarz.trash)
            option = self.view.get_input()
            if option == "1":
                self.buy_trash()
            elif option == "2":
                self.sell_trash()
            elif option == "3":
                return
            else:
                self.view.print_wrong_input_error()  

    def buy_trash(self):
        self.view.print_number_of_trash_to_buy()
        trash_to_buy = 0
        try:
            user_input= int(self.view.get_input())
            if user_input <= 0:
                raise ValueError
            trash_to_buy = user_input
        except ValueError:
            self.view.print_wrong_input_error()
            return
        
        trash_price = self.get_trash_price()
        transaction_value = trash_to_buy * trash_price + self.transaction_fee

        if transaction_value > self.smieciarz.wallet_balance:    
            self.smieciarz.wallet_balance  -= self.transaction_fee
            self.view.cant_buy_this_amount_of_trash(trash_price, trash_to_buy, transaction_value)
            return
        else : 
            self.smieciarz.trash += trash_to_buy
            self.smieciarz.wallet_balance -= transaction_value
            self.view.print_successfully_buy(trash_price, trash_to_buy, transaction_value )
            
        

    def sell_trash(self):
        self.view.print_sell_trash()
        if self.smieciarz.trash == 0:
            self.view.print_wrong_input_error()
            return
        else :
            self.smieciarz.wallet_balance += self.smieciarz.trash * 2
            self.smieciarz.trash = 0  

    def get_trash_price(self):
        return round(random.uniform(self.min_trash_price, self.max_trash_price), 2)

if __name__ == "__main__":
    # Create an instance of Main with a View object
    Main(View(), Smieciarz())
