import { PizzaBuilder } from "./PizzaBuilder";
import { pizzaSizeChoices } from "./PizzaSize";
import { View } from "./View";
import { PizzaDecorator } from "./PizzaDecorator";
import { pizzaTypeChoices } from "./PizzaData";
import { getExtraToppingChoices, getToppingChoicesForPizza } from "./Toppings";

//const menuOptions: string[] = ["Packaging", "Select size", "Add toppings", "Delete toppings", "Finish"];

export class PizzaManager {
  view = new View();
  builder = new PizzaBuilder();
  async run() {
    //await this.view.Select("Menu", ["Packaging", "Select size", "Add toppings", "Delete toppings", "Finish"])
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

    while (true) {
      const addAnother = await this.view.Confirm("Add any other toppings?");

      if (!addAnother) {
        break;
      }

      const topping = await this.view.Select("Select topping to add", getExtraToppingChoices);
      const quantity = await this.view.Number("Quantity");

      this.builder.addToppings(topping, quantity);
    }

    let pizza = this.builder.build();
    if (pizza) {
      pizza = new PizzaDecorator(pizza);
      this.view.ShowOrder(pizza.price, pizza.toppings, pizza.type);
    }
  }
}
