import { getPizzaCost, PizzaType } from "./PizzaData";
import { PizzaSize } from "./PizzaSize";
import { IPizza } from "./PizzaInterface";
export class Pizza implements IPizza {
  price: number;
  size: PizzaSize;
  type: PizzaType;
  toppings: [string, number][];
  packaging: boolean;

  constructor(size: PizzaSize, type: PizzaType, toppings: [string, number][], packaging: boolean) {
    this.size = size;
    this.type = type;
    this.price = getPizzaCost(type, size); //size and type, without packaging, and with basics toppings
    this.toppings = toppings;
    this.packaging = packaging;
  }
}
