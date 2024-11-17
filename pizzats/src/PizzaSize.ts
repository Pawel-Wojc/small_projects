import { Choice } from "./Choice";

export enum PizzaSize {
  Small = "Medium",
  Medium = "Large",
  Large = "Extra Large",
}
export function parse(input: string): PizzaSize | null {
  if (Object.values(PizzaSize).includes(input as PizzaSize)) {
    return input as PizzaSize;
  }
  return null;
}
export function allSizes(): string[] {
  return Object.values(PizzaSize) as string[];
}

export const pizzaSizeChoices: Choice<PizzaSize>[] = Object.keys(PizzaSize).map((key) => {
  const value = PizzaSize[key as keyof typeof PizzaSize];
  return {
    value,
    name: value,
  };
});
