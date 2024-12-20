from unittest.mock import Mock
from main import Main
from smieciarz import Smieciarz
from view import View

class TestMain:

    def setUp(self):
        self.view = Mock(spec=View)
        self.smieciarz = Mock(spec=Smieciarz)
        self.main = Main(self.view, self.smieciarz)
def test_sell_trash_no_change_in_wallet_when_trash_is_zero(self):
    self.smieciarz.trash = 0
    initial_wallet_balance = self.smieciarz.wallet_balance

    self.main.sell_trash()

    self.view.print_sell_trash.assert_called_once()
    self.view.print_wrong_input_error.assert_called_once()
    self.assertEqual(self.smieciarz.wallet_balance, initial_wallet_balance)