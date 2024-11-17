import { getPackageCost, getPizzaCost, PizzaType } from "./PizzaData";
import { PizzaSize } from "./PizzaSize";
import { IPizza } from "./PizzaInterface";
export class Pizza implements IPizza {
  price: number;
  size: PizzaSize;
  type: PizzaType;
  toppings: [string, number][];
  packaging: boolean;

  constructor(size: PizzaSize, type: PizzaType, toppings: [string, number][], packaging: boolean) {
    this.price = this.calculatePrice();
    this.size = size;
    this.type = type;
    this.toppings = toppings;
    this.packaging = packaging;
  }
  calculatePrice(): number {
    let finalCost = 0;
    let cost = getPizzaCost(this.type, this.size);
    if (cost) {
      finalCost += cost;
    } else {
      finalCost = 0;
    }

    cost = getPackageCost(this.size);
    if (cost) {
      finalCost += cost;
    } else {
      finalCost = 0;
    }
    return finalCost;
  }
}
