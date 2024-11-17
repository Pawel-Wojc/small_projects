import { Choice } from "./Choice";
import { PizzaSize } from "./PizzaSize";

export enum PizzaType {
  MARGHERITA = "Margherita",
  STUDENTCKA = "Studentcka",
  GLODNY_STUDENT = "Glodny Student",
  HAWAJSKA_BEZ_ANANASA = "Hawajska bez ananasa",
}

const PackageCost = [
  { key: PizzaSize.Small, value: 2 },
  { key: PizzaSize.Medium, value: 3 },
  { key: PizzaSize.Large, value: 4 },
];

const PizzaCost = [
  {
    key: PizzaType.MARGHERITA,
    value: [
      { key: PizzaSize.Small, value: 25 },
      { key: PizzaSize.Medium, value: 35 },
      { key: PizzaSize.Large, value: 45 },
    ],
  },
  {
    key: PizzaType.STUDENTCKA,
    value: [
      { key: PizzaSize.Small, value: 7.8 },
      { key: PizzaSize.Medium, value: 8.9 },
      { key: PizzaSize.Large, value: 10 },
    ],
  },
  {
    key: PizzaType.GLODNY_STUDENT,
    value: [
      { key: PizzaSize.Small, value: 9.8 },
      {
        key: PizzaSize.Medium,
        value: 10.9,
      },
      { key: PizzaSize.Large, value: 12 },
    ],
  },
  {
    key: PizzaType.HAWAJSKA_BEZ_ANANASA,
    value: [
      { key: PizzaSize.Small, value: 27.5 },
      {
        key: PizzaSize.Medium,
        value: 38.5,
      },
      { key: PizzaSize.Large, value: 49.5 },
    ],
  },
];

export function getPizzaCost(pizzaType: PizzaType, pizzaSize: PizzaSize): number | undefined {
  const pizza = PizzaCost.find((item) => item.key === pizzaType);
  const size = pizza?.value.find((sizeItem) => sizeItem.key === pizzaSize);
  return size ? size.value : undefined;
}

export function getPackageCost(pizzaSize: PizzaSize): number | undefined {
  const packageCost = PackageCost.find((item) => item.key === pizzaSize);
  return packageCost?.value;
}

export const pizzaTypeChoices: Choice<PizzaType>[] = Object.keys(PizzaType).map((key) => {
  const value = PizzaType[key as keyof typeof PizzaType];
  return {
    value,
    name: value,
  };
});
