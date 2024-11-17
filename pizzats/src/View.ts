import { checkbox, select, confirm, number } from "@inquirer/prompts";

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

  ShowOrder(price: number, tooppings: [string, number][], pizzaType: string) {
    console.log(`Pizza type: ${pizzaType}`);
    console.log(`Final cost: ${price}`);
    console.log(`Toppings: ${tooppings}`);
    tooppings.forEach((element) => {
      console.log(element);
    });
  }
}
