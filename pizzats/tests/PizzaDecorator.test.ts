import { Pizza } from "../src/Pizza"; // Adjust import paths
import { PizzaType } from "../src/PizzaData";
import { PizzaDecorator } from "../src/PizzaDecorator";
import { PizzaSize } from "../src/PizzaSize";

describe("PizzaDecorator", () => {
  it("should calculate the correct final price with the decorator", () => {
    const basePizza = new Pizza(PizzaSize.Small, PizzaType.HAWAJSKA_BEZ_ANANASA, [["kielbasa", 3]], true);
    const decoratedPizza = new PizzaDecorator(basePizza);
    const finalPrice = decoratedPizza.price;
    expect(finalPrice).toBe(37.5);
  });

  it("should calculate the correct final price with pizza with ananas", () => {
    const basePizza = new Pizza(
      PizzaSize.Medium,
      PizzaType.HAWAJSKA_BEZ_ANANASA,
      [
        ["kielbasa", 3],
        ["bazylia", 4],
        ["dobry_ananas", 3],
      ],
      true
    );
    const decoratedPizza = new PizzaDecorator(basePizza);
    expect(decoratedPizza.price).toBe(225.5);
  });

  it("should calculate the correct final price with pizza price above 50, (discount 10 percent)", () => {
    const basePizza = new Pizza(
      PizzaSize.Large,
      PizzaType.HAWAJSKA_BEZ_ANANASA,
      [
        ["ser", 2],
        ["pomidorki_koktajlowe", 4],
        ["kielbasa", 3],
        ["bazylia", 4],
      ],
      true
    );
    const decoratedPizza = new PizzaDecorator(basePizza);
    expect(decoratedPizza.price).toBe(65.65);
  });

  it("should calculate the correct final price with pizza price above 50, and calculating discount without package cost", () => {
    const basePizza = new Pizza(PizzaSize.Large, PizzaType.HAWAJSKA_BEZ_ANANASA, [], true);
    const decoratedPizza = new PizzaDecorator(basePizza);
    expect(decoratedPizza.price).toBe(53.5);
  });
});
