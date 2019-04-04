import { Ingredient } from './../shared/ingredient.model';
import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class ShopingListService implements OnInit {

  ingredintsChange = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [ new Ingredient('Apples', 5) ];
  constructor() { }

  ngOnInit(): void {
  }

  getIngredients() {
    return this.ingredients.slice();
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredintsChange.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredintsChange.emit(this.ingredients.slice());
  }
}
