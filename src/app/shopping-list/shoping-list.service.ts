import { Ingredient } from './../shared/ingredient.model';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';


@Injectable({
  providedIn: 'root'
})
export class ShopingListService implements OnInit {

  ingredientsChange = new Subject<Ingredient[]>();
  ingredientToEdit = new Subject<number>();
  private ingredients: Ingredient[] = [ new Ingredient('Apples', 5) ];
  constructor() { }

  ngOnInit(): void {
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(id: number): Ingredient {
    return this.ingredients.slice()[id];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChange.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChange.next(this.ingredients.slice());
  }

  public updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.ingredientsChange.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChange.next(this.ingredients.slice());
  }
}
