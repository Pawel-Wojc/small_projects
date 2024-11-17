import { PizzaSize } from "./PizzaSize";
import { PizzaType } from "./PizzaData";
import { Choice } from "./Choice";

export const extraToppings = [
  { key: "ser", value: 3 },
  { key: "kielbasa", value: 4 },
  { key: "boczek", value: 5 },
  { key: "zgnily_ananas", value: 10 },
  { key: "dobry_ananas", value: 4 },
  { key: "bazylia", value: 0.5 },
  { key: "pomidorki_koktajlowe", value: 0.2 },
];

export const extraToppingsCostBySize = [
  { key: PizzaSize.Small, value: 0 },
  { key: PizzaSize.Medium, value: 1 },
  { key: PizzaSize.Large, value: 2 },
];

export const defaultToppings = [
  { key: PizzaType.MARGHERITA, value: ["ser"] },
  { key: PizzaType.STUDENTCKA, value: [""] },
  {
    key: PizzaType.GLODNY_STUDENT,
    value: ["bazylia"],
  },
  {
    key: PizzaType.HAWAJSKA_BEZ_ANANASA,
    value: ["ser", "kielbasa", "boczek", "pomidorki_koktajlowe"],
  },
];

export function getDefaultToppings(pizzaType: PizzaType): string[] | undefined {
  return defaultToppings.find((o) => o.key === pizzaType)?.value;
}

export function getToppingChoicesForPizza(pizzaType: PizzaType): Choice<string>[] {
  const pizza = defaultToppings.find((pizza) => pizza.key === pizzaType);

  // If no pizza type is found or there are no toppings, return an empty array
  if (!pizza || !pizza.value.length) {
    return [];
  }

  // Map the toppings to the Choice type
  return pizza.value.map((topping) => ({
    value: topping,
    name: topping,
  }));
}
export const getExtraToppingChoices: Choice<string>[] = extraToppings.map((topping) => {
  return { value: topping.key, name: topping.key };
});
