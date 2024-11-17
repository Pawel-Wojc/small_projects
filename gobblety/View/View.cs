public class View
{
    IInputValidator _inputValidator;

    public View(IInputValidator validator)
    {
        _inputValidator = validator;
    }

    // private static View? viewInstance = null;

    // public static View GetView(IInputValidator validator)
    // {
    //     _inputValidator = validator;
    //     if (viewInstance == null)
    //     {
    //         viewInstance = new View();
    //     }
    //     return viewInstance;
    // }

    public void printWelcomeMessage()
    {
        Console.WriteLine("Welcome in Gobblety");
        Console.WriteLine("Game rules: ");
        Console.WriteLine("To select goblet type -> SsMmLl");
        Console.WriteLine("To select field type dimensions -> 12, 21 (x,y)");
        Console.WriteLine("Starting with player - orange ");
        Console.WriteLine("Press Enter to start");
        Console.ReadLine();
    }

    public void drawBoard(Board board)
    {
        Console.WriteLine("Board");
        Console.WriteLine("| xy | 0  | 1  | 2  |");
        for (int x = 0; x < 3; x++)
        {
            Console.WriteLine("---------------------");
            for (int y = 0; y < 3; y++)
            {
                bool isFieldEmpty = true;
                int zOfFindedGobblet = 4;
                for (int z = 0; z < 3; z++)
                {
                    if (board.board[x, y, z] != null)
                    {
                        isFieldEmpty = false;
                        zOfFindedGobblet = z;
                        break;
                    }
                }
                if (y == 0)
                {
                    Console.Write("| " + x + "  ");
                }
                if (isFieldEmpty)
                {
                    Console.Write("|    ");
                }
                else
                {
                    char colorFirstLetter = board.board[x, y, zOfFindedGobblet].color.ToString()[0];
                    char sizeFirstLetter = board.board[x, y, zOfFindedGobblet].size.ToString()[0];

                    Console.Write("| " + colorFirstLetter + sizeFirstLetter + " ");
                }
            }
            Console.WriteLine("");
        }
    }

    public void drawPlayerGobblets(Player movingPlayer)
    {
        int smallGoblets = 0;
        int mediumGoblets = 0;
        int largeGoblets = 0;

        Console.WriteLine("Moving player - " + movingPlayer.color);
        Console.WriteLine("Your goblets");
        Console.WriteLine("Size    |  S  |  M  |  L  |");

        foreach (Gobblet goblet in movingPlayer.gobblets)
        {
            if (goblet.size == Size.small)
            {
                smallGoblets++;
            }
            if (goblet.size == Size.medium)
            {
                mediumGoblets++;
            }
            if (goblet.size == Size.large)
            {
                largeGoblets++;
            }
        }
        Console.WriteLine(
            "Quantity|  " + smallGoblets + "  |  " + mediumGoblets + "  |  " + largeGoblets + "  |"
        );
    }

    public Dimension selectDimensionToTake(List<Dimension> availableDimensions)
    {
        Console.WriteLine(
            "Select dimensions (x,y) to pick up goblet -> 00 for x:0 y:0, 21 for x:2 y:1, etc."
        );
        string? input = null;
        do
        {
            input = Console.ReadLine();
            if (TryParseToXY(input) == null)
            {
                Console.WriteLine(
                    "Invalid input! Please enter a two-character string with digits between 1 and 3."
                );
                break;
            }
            if (!CheckDimensionContains(TryParseToXY(input), availableDimensions))
            {
                Console.WriteLine("Invalid input! You can't take gobblet from this field.");
                Console.WriteLine("Choose another field");
                break;
            }
        } while (!CheckDimensionContains(TryParseToXY(input), availableDimensions));

        return (Dimension)TryParseToXY(input);
    }

    public Dimension SelectDimensionToPut(List<Dimension> availableDimensions)
    {
        string? input = null;
        Console.WriteLine(
            "Select dimensions (x,y) to put goblet -> 00 for x:0 y:0, 21 for x:2 y:1, etc."
        );

        do
        {
            input = Console.ReadLine();
            if (TryParseToXY(input) == null)
            {
                Console.WriteLine(
                    "Invalid input! Please enter a two-character string with digits between 1 and 3."
                );
                break;
            }
            if (!CheckDimensionContains(TryParseToXY(input), availableDimensions))
            {
                Console.WriteLine("Invalid input! You can't put gobblet on this field.");
                Console.WriteLine("Choose another field");
                break;
            }
        } while (!_inputValidator.CheckDimensionContains(TryParseToXY(input)));

        return (Dimension)TryParseToXY(input);
    }


    private Dimension? TryParseToXY(string? input)
    {
        if (input == null || input.Length < 2)
        {
            return null;
        }
        Dimension dimension = new Dimension { };
        switch (input[0])
        {
            case '0':
                dimension.x = 0;
                break;
            case '1':
                dimension.x = 1;
                break;
            case '2':
                dimension.x = 2;
                break;
            default:
                return null;
        }
        switch (input[1])
        {
            case '0':
                dimension.y = 0;
                break;
            case '1':
                dimension.y = 1;
                break;
            case '2':
                dimension.y = 2;
                break;
            default:
                return null;
        }
        return dimension;
    }

    public MoveType SelectMoveType()
    {
        while (true)
        {
            Console.WriteLine("Select: Add another gobler - 0, Move Goblet on board - 1");
            string input = Console.ReadLine();
            if (input == "0")
                return MoveType.addGoblet;
            else if (input == "1")
                return MoveType.moveGoblet;
            else
                Console.WriteLine("Inccorect ");
        }
    }

    public Size SelectSizeToPlay(List<Size> sizes)
    {
        Size? selectedSize = null;

        Console.WriteLine("Select a size to play -> s - small, m - medium, l - large");

        while (selectedSize == null)
        {
            string userInputSize = Console.ReadLine();
            switch (userInputSize)
            {
                case "s":
                    selectedSize = Size.small;
                    break;
                case "m":
                    selectedSize = Size.medium;
                    break;
                case "l":
                    selectedSize = Size.large;
                    break;
                case "S":
                    selectedSize = Size.small;
                    break;
                case "M":
                    selectedSize = Size.medium;
                    break;
                case "L":
                    selectedSize = Size.large;
                    break;
                default:
                    Console.WriteLine("Selection incorect!!! Correct => SsMmLl");
                    break;
            }
            if (selectedSize != null)
            {
                if (!sizes.Contains((Size)selectedSize))
                {
                    Console.WriteLine("Selected size is not available. Please select again.");
                    selectedSize = null;
                }
            }
        }
        return (Size)selectedSize;
    }

    internal void ShowWinnerMessage(Color? v)
    {
        Console.WriteLine("Game over! Winner is: " + v);
    }
}
