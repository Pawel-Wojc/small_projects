import { PizzaManager } from "../src/PizzaManager";
import { PizzaBuilder } from "../src/PizzaBuilder";
import { View } from "../src/View";
import { PizzaSize } from "../src/PizzaSize";
import { PizzaType } from "../src/PizzaData";

jest.mock("../src/View", () => {
  return {
    View: jest.fn().mockImplementation(() => ({
      Confirm: jest.fn(), // Mock Confirm as a function
      Select: jest.fn(),
      CheckBox: jest.fn(),
      Number: jest.fn(),
      ShowOrder: jest.fn(),
    })),
  };
});

describe("PizzaManager", () => {
  let pizzaManager: PizzaManager;
  let mockView: jest.Mocked<View>;

  beforeEach(() => {
    mockView = new View() as jest.Mocked<View>;
    pizzaManager = new PizzaManager();
    pizzaManager.view = mockView;
    pizzaManager.builder = new PizzaBuilder();
  });

  it("shoul handle the full pizza creation flow", async () => {
    mockView.Confirm.mockResolvedValue(true);
    mockView.Select.mockResolvedValueOnce(PizzaSize.Medium); //size
    mockView.Select.mockResolvedValueOnce(PizzaType.MARGHERITA); //type
    mockView.CheckBox.mockResolvedValueOnce([]); //delete toppings
    mockView.Confirm.mockResolvedValue(false);
    mockView.ShowOrder.mockImplementation(() => {});

    await pizzaManager.run();

    expect(pizzaManager.builder.getSize()).toBe(PizzaSize.Medium);
    expect(pizzaManager.builder.getType()).toBe(PizzaType.MARGHERITA);
    expect(pizzaManager.builder.getToppings()).toEqual([["ser", 1]]);

    // Verify ShowOrder was called
    expect(mockView.ShowOrder).toHaveBeenCalledWith(
      expect.any(Number), // Price
      expect.any(Array), // Toppings
      PizzaType.MARGHERITA // Pizza type
    );
  });
});
