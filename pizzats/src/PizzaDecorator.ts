import { getPackageCost, PizzaType } from "./PizzaData";
import { IPizza } from "./PizzaInterface";
import { PizzaSize } from "./PizzaSize";
import { getDefaultToppings, getExtraToppingPrice } from "./Toppings";

export class PizzaDecorator implements IPizza {
  price: number;
  size: PizzaSize;
  type: PizzaType;
  toppings: [string, number][];
  packaging: boolean;

  constructor(pizza: IPizza) {
    this.packaging = pizza.packaging;
    this.size = pizza.size;
    this.type = pizza.type;
    this.toppings = this.clearToppings(pizza.toppings);
    this.price = this.addExtraToppingsCost(pizza.price);
    this.price = this.addDiscount(this.price);

    this.addPackagingCost();
  }

  addExtraToppingsCost(price: number): number {
    //delete price of basics toppings first
    const toppings = this.getToppingsWithoutBasicsToppings();
    let toppingsCost = 0;

    toppings.forEach((toppings) => {
      const oneToppingCost = getExtraToppingPrice(toppings[0]);
      if (oneToppingCost) {
        toppingsCost += oneToppingCost * toppings[1];
      }
    });
    return price + toppingsCost;
  }

  private clearToppings(toppings: [string, number][]): [string, number][] {
    const toppingMap = new Map<string, number>();

    toppings.forEach(([topping, quantity]) => {
      toppingMap.set(topping, (toppingMap.get(topping) || 0) + quantity);
    });

    // Convert the map back to an array
    return Array.from(toppingMap.entries());
  }

  private addDiscount(price: number): number {
    //Promka ananas każdy jeden + 50 ziko

    const ananas = this.toppings.find((topping) => topping[0] == "dobry_ananas" || topping[0] == "zgnily_ananas");
    if (ananas) {
      return (price += 50 * ananas[1]);
    }

    //Promka 3xser + 10 ziko
    const ser = this.toppings.find((topping) => topping[0] == "ser");
    if (ser && ser[1] > 2) {
      return price + 10;
    }

    //Promka -10% powyżej 50 zł
    if (price > 50) {
      return price * 0.9;
    }

    return price;
  }

  private addPackagingCost() {
    const packageCost = getPackageCost(this.size);
    if (this.packaging && packageCost) {
      this.price += packageCost;
    }
  }

  private getToppingsWithoutBasicsToppings() {
    //'deleting' basics toppings to not include them in price calculations
    const defaultToppings = getDefaultToppings(this.type);
    const newToppings = structuredClone(this.toppings);

    if (defaultToppings) {
      newToppings.forEach((topping) => {
        if (defaultToppings.includes(topping[0])) {
          topping[1] = Math.max(0, topping[1] - 1); // Prevent negative quantities
        }
      });
      return newToppings;
    }
    return this.toppings;
  }
}
