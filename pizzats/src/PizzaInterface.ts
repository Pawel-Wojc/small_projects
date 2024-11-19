import { PizzaType } from "./PizzaData";
import { PizzaSize } from "./PizzaSize";

export interface IPizza {
  price: number;
  size: PizzaSize;
  type: PizzaType;
  toppings: [string, number][];
  packaging: boolean;
}
