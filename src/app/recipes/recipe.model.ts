import { Ingredient } from './../shared/ingredient.model';
export class Recipe {
  public name: string;
  public description: string;
  public urlPath: string;
  public ingredient: Ingredient[];

  constructor(
    name: string,
    description: string,
    urlPath: string,
    ingredient: Ingredient[]
  ) {
    this.name = name;
    this.description = description;
    this.urlPath = urlPath;
    this.ingredient = ingredient;
  }
}
