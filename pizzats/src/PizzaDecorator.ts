import { PizzaType } from "./PizzaData";
import { IPizza } from "./PizzaInterface";
import { PizzaSize } from "./PizzaSize";

export class PizzaDecorator implements IPizza {
  price: number;
  size: PizzaSize;
  type: PizzaType;
  toppings: [string, number][];

  constructor(pizza: IPizza) {
    this.price = this.addDiscount(pizza.price);
    this.size = pizza.size;
    this.type = pizza.type;
    this.toppings = this.clearTopings(pizza.toppings);
  }

  private clearTopings(toppings: [string, number][]): [string, number][] {
    const newTopings: [string, number][] = toppings
      .map(([topping, quantity]) => {
        toppings.map(([sTopping, sQauntity], sIndex) => {
          if (sTopping === topping && sQauntity != 0) {
            toppings[sIndex][1] = 0;
            return [topping, quantity + sQauntity];
          }
        });
        return [topping, quantity];
      })
      .filter(Boolean) as [string, number][];
    return newTopings;
  }
  private addDiscount(price: number): number {
    return price + 10 * 0.9; // 10% discount
  }
}
