export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  tags: string[];
  ingredients: Ingredient[];
  steps: string[];
}

export interface Ingredient {
  item: string;
  amount: string;
  unit: string;
}
