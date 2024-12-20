class Smieciarz: 
    trash = 0

    def __init__(self):
        self.wallet_balance = 10

    @property
    def wallet_balance(self):
        return self.__vallet_balance

    @wallet_balance.setter
    def wallet_balance(self, value):
        self.__vallet_balance = round(value, 2)
