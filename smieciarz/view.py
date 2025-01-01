class View:
   
    def print_welcome(self):
        print("Welcome to the Trash Tycoon! Try to build your trash empire!")
        
    def print_menu(self, account_value = None, trash = None):
        if (account_value):
            print("Account balance:", account_value, "Trash amount:", trash)
        print("1. Buy trash")
        print("2. Sell trash (2 USD per trash)")
        print("3. Exit")
        
    def get_input(self):
        return input()
    
    def print_number_of_trash_to_buy(self):
        print("How much trash would you like to buy?")

    def print_wrong_input_error(self):
        print("Enter valid options")

    def cant_buy_this_amount_of_trash(self, trash_price, trash_amount, transaction_value):
        print("You can't buy this amount of trash")
        print("Transaction details:", trash_amount, "trash at a price of", trash_price, "for", round(transaction_value, 2))


    def print_successfully_buy(self, trash_price , trash_amount , transaction_value):
        print("You bought!")
        print("Transaction details:", trash_amount, "trash at a price of", trash_price, "for", round(transaction_value, 2))


    def print_sell_trash(self):
        print("Selling trash")

    def print_win(self, account_value):
        print("You win, your account balance:", account_value)

    def print_game_over(self):
        print("You lost, your account balance is too low to continue the game")