import { PizzaBuilder } from "./PizzaBuilder";
import { pizzaSizeChoices } from "./PizzaSize";
import { View } from "./View";
import { PizzaDecorator } from "./PizzaDecorator";
import { pizzaTypeChoices } from "./PizzaData";
import { getExtraToppingChoices, getToppingChoicesForPizza } from "./Toppings";
import { IPizza } from "./PizzaInterface";

export class PizzaManager {
  view = new View();
  builder = new PizzaBuilder();
  async run() {
    let anotherPizza = true;
    const order: IPizza[] = [];
    while (anotherPizza) {
      await this.view.Confirm("Package?").then((res) => {
        if (res) {
          this.builder.addPackaging();
        }
      });
      await this.view.Select("Size?", pizzaSizeChoices).then((res) => {
        if (res !== null) {
          this.builder.setSize(res!);
        }
      });

      await this.view.Select("Select pizza?", pizzaTypeChoices).then((res) => {
        this.builder.setType(res);
      });

      const toppings = getToppingChoicesForPizza(this.builder.getType()!);
      if (toppings.length > 0) {
        //if pizza has any toppings
        await this.view.CheckBox("Delete toppings?", toppings).then((res) => {
          this.builder.deleteToopings(res);
        });
      }

      while (await this.view.Confirm("Add any other toppings?")) {
        const topping = await this.view.Select("Select topping to add", getExtraToppingChoices);
        const quantity = await this.view.Number("Quantity");
        this.builder.addToppings(topping, quantity);
      }

      let pizza = this.builder.build();
      if (pizza) {
        pizza = new PizzaDecorator(pizza);
        order.push(pizza);
      }

      await this.view.Confirm("Add another pizza to your order?").then((res) => {
        if (!res) {
          anotherPizza = false;
          this.view.ShowOrder(order);
        }
      });
    }
  }
}
