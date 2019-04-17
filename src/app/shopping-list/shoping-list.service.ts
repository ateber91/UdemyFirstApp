import { Ingredient } from './../shared/ingredient.model';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopingListService implements OnInit {

  ingredintsChange = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [ new Ingredient('Apples', 5) ];
  constructor() { }

  ngOnInit(): void {
  }

  getIngredients() {
    return this.ingredients.slice();
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredintsChange.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredintsChange.next(this.ingredients.slice());
  }
}
