internal class Game : IInputValidator
{
    private Board _board = Board.GetBoard();
    private View _view;

    public Game()
    {
        _view = new View(this);
    }

    private Player _currentPlayer = new Player(Color.orange);

    public void StartGame()
    {
        Player orangePlayer = _currentPlayer;
        Player bluePlayer = new Player(Color.blue);
        int moveCounter = 0;
        bool winner = false;
        _view.printWelcomeMessage();
        while (!winner)
        {
            _view.drawBoard(_board);
            _view.drawPlayerGobblets(_currentPlayer);
            if (moveCounter < 2) //in first two steps you cant move goblets on board
            {
                PutNewGobletOnBoard();
            }
            else
            {
                MoveType moveType;
                if (Player.CheckPlayerHaveGoblets(_currentPlayer))
                {
                    moveType = _view.SelectMoveType();
                }
                else
                {
                    moveType = MoveType.moveGoblet;
                }
                if (moveType == MoveType.addGoblet)
                {
                    PutNewGobletOnBoard();
                }
                else if (moveType == MoveType.moveGoblet)
                {
                    MoveGobletOnBoard();
                }
            }
            if (_board.CheckWinnerColor() != null)
            {
                winner = true;
                _view.ShowWinnerMessage(_board.CheckWinnerColor());
            }
            _currentPlayer = (_currentPlayer.color == Color.orange) ? bluePlayer : orangePlayer;
            moveCounter++;
        }
    }

    void PutNewGobletOnBoard()
    {
        Size playerSelectedSize;
        Dimension dimensionToPut;
        bool gobletPlaced = false;
        do
        {
            do
            { //which size want to play
                playerSelectedSize = _view.SelectSizeToPlay(_currentPlayer.GetAvailableSizes());

                //pass to view available dimensions where player can put goblet
                dimensionToPut = _view.SelectDimensionToPut(
                    _board.GetAvailableDimensionsToPut(
                        new Gobblet(playerSelectedSize, _currentPlayer.color)
                    )
                );
            } while (!_currentPlayer.GetAvailableSizes().Contains(playerSelectedSize));

            gobletPlaced = _board.PlaceGobletOnBoard(
                new Gobblet(playerSelectedSize, _currentPlayer.color),
                dimensionToPut
            );
        } while (!gobletPlaced);
        if (gobletPlaced)
        {
            _currentPlayer.RemoveGoblet(playerSelectedSize);
        }
    }

    void MoveGobletOnBoard()
    {
        List<Dimension> dimensionsToTake;
        Dimension dimensionFrom;
        do
        {
            // get avavailable dimensions from which player can take goblet, can only move goblet in his color
            dimensionsToTake = _board.GetAvailableDimensionsToTake(_currentPlayer);
            //get user choice from available dimensions
            dimensionFrom = _view.selectDimensionToTake(dimensionsToTake);
        } while (dimensionsToTake.Contains(dimensionFrom));

        List<Dimension> dimensionsToPut;
        Dimension dimensionToPut;
        do
        {
            // get available dimensions where player can put goblet, can only put goblet on smaller one or in empty space
            dimensionsToPut = _board.GetAvailableDimensionsToPut(
                _board.GetTopGobletOnBoard(dimensionFrom.x, dimensionFrom.y)
            );
            // get user choice from available dimensions
            dimensionToPut = _view.SelectDimensionToPut(dimensionsToPut);
        } while (dimensionsToPut.Contains(dimensionToPut));

        //move goblet
        _board.MoveGoblet(dimensionFrom, dimensionToPut);
    }

    public bool CheckDimensionContains(Dimension? dimension)
    {
        if (dimension == null)
        {
            return false;
        }
        return _board.GetAvailableDimensionsToTake(_currentPlayer).Contains((Dimension)dimension);
    }
}
