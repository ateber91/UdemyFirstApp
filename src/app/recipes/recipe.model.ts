import { Ingredient } from './../shared/ingredient.model';
export class Recipe {
  public name: string;
  public description: string;
  public urlPath: string;
  public ingredients: Ingredient[];

  constructor(
    name: string,
    description: string,
    urlPath: string,
    ingredients: Ingredient[]
  ) {
    this.name = name;
    this.description = description;
    this.urlPath = urlPath;
    this.ingredients = ingredients;
  }
}
