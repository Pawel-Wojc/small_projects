import { Pizza } from "./Pizza";
import { PizzaSize } from "./PizzaSize";
import { PizzaType } from "./PizzaData";
import { defaultToppings } from "./Toppings";
import { IPizza } from "./PizzaInterface";

export class PizzaBuilder {
  private type: PizzaType | undefined;
  private size: PizzaSize | undefined;
  private packaging: boolean = false;
  private toppings: [string, number][] = [];

  setType(type: PizzaType) {
    //looking for specific pizza, then for array of toppings add this toppings and quantity of 1
    this.toppings = defaultToppings
      .find((o) => o.key === type)!
      .value.map((topping) => {
        return [topping, 1];
      });
    this.type = type;
    return this;
  }

  setSize(size: PizzaSize) {
    this.size = size;
    return this;
  }
  deleteToopings(toopingsToDelete: string[]) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.toppings = this.toppings.filter(([topping, _]) => !toopingsToDelete.includes(topping));
    return this;
  }

  getType(): PizzaType | undefined {
    return this.type;
  }

  getSize(): PizzaSize | undefined {
    return this.size;
  }

  getToppings(): [string, number][] {
    return this.toppings;
  }

  addToppings(ingredient: string, quantity: number) {
    this.toppings.push([ingredient, quantity]);
    return this;
  }
  addPackaging() {
    this.packaging = true;
  }

  build(): IPizza | undefined {
    if (this.type && this.size && this.toppings) {
      return new Pizza(this.size, this.type, this.toppings, this.packaging);
    }
    return undefined;
  }
}
