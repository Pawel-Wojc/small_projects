import { checkbox, select, confirm, number } from "@inquirer/prompts";
import { IPizza } from "./PizzaInterface";

type Choice<Value> = {
  value: Value;
  name?: string;
  description?: string;
  short?: string;
  disabled?: boolean | string;
};
export class View {
  constructor() {}
  async Select<T>(message: string, choices: readonly Choice<T>[]): Promise<T> {
    return await select({
      message: message,
      choices: choices,
    });
  }

  async CheckBox<T>(message: string, choices: readonly Choice<T>[]): Promise<T[]> {
    return await checkbox({
      message: message,
      choices: choices,
    });
  }

  async Confirm(message: string): Promise<boolean> {
    return await confirm({ message: message });
  }

  async Number(message: string): Promise<number> {
    const result = await number({ message: message, default: 1, min: 1, max: 10 });
    if (result) {
      return result;
    }
    return 1;
  }

  ShowOrder(order: IPizza[]) {
    let finalOrderCost = 0;
    order.forEach((item) => {
      console.log("----------------------------------------");
      finalOrderCost += item.price;
      console.log(`Pizza type: ${item.type}`);
      console.log(`Pizza size: ${item.size}`);
      console.log(`Final cost: ${item.price}`);
      console.log(`Toppings: `);
      item.toppings.forEach((element) => {
        console.log(element);
      });
    });
    console.log(`Final order cost: ${finalOrderCost}`);
  }
}
