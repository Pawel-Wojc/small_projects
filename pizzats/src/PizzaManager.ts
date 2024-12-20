import { PizzaBuilder } from "./PizzaBuilder";
import { pizzaSizeChoices } from "./PizzaSize";
import { View } from "./View";
import { PizzaDecorator } from "./PizzaDecorator";
import { pizzaTypeChoices } from "./PizzaData";
import { getExtraToppingChoices, getToppingChoicesForPizza } from "./Toppings";
import { IPizza } from "./PizzaInterface";
import { Choice } from "./Choice";

export class PizzaManager {
  menu: Choice<number>[] = [
    { value: 1, name: "Package?", description: "asd" },
    { value: 2, name: "Add another pizza" },
    { value: 3, name: "Show Order" },
    { value: 4, name: "Package?" },

    { value: 5, name: "Create another order (clean current)" },
    { value: 4, name: "Exit" },
  ];
  view = new View();
  builder = new PizzaBuilder();
  async run() {
    let anotherPizza = true;
    const order: IPizza[] = [];
    console.log("Welcome in pizza manager!");
    while (anotherPizza) {
      if (order.length == 0) {
        await this.view.Select("Menu", [{ value: 1, name: "Add Pizza" }]).then((res) => {
          if (res) {
            console.log();
            
          }
        });
      }

      await this.view.Select("Menu", this.menu).then((res) => {
        console.log("menu selected" + res);
      });

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

  private async addPackage() {
    await this.view.Confirm("Package?").then((res) => {
      if (res) {
        this.builder.addPackaging();
      }
    });
  }

  private async chooseSize() {
    await this.view.Select("Size?", pizzaSizeChoices).then((res) => {
      this.builder.setSize(res);
    });
  }

  private async chooseType() {
    await this.view.Select("Select pizza?", pizzaTypeChoices).then((res) => {
      this.builder.setType(res);
    });
  }

  private async deleteToppings() {
    const toppings = getToppingChoicesForPizza(this.builder.getType()!);
    if (toppings.length > 0) {
      //if pizza has any toppings
      await this.view.CheckBox("Delete toppings?", toppings).then((res) => {
        this.builder.deleteToopings(res);
      });
    }
  }

  private async addAnotherToppings() {
    while (await this.view.Confirm("Add any other toppings?")) {
      const topping = await this.view.Select("Select topping to add", getExtraToppingChoices);
      const quantity = await this.view.Number("Quantity");
      this.builder.addToppings(topping, quantity);
    }
  }
}
