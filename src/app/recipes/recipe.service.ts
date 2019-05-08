import { ShopingListService } from './../shopping-list/shoping-list.service';
import { Injectable, OnDestroy } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService implements OnDestroy {

  private recipes: Recipe[] = [
    new Recipe(
      'Recipe for Chicken and Sausage',
      'This is test recipe',
      'https://www.gimmesomeoven.com/wp-content/uploads/2014/03/Cajun-Jambalaya-Recipe-with-Andouille-Sausage-Shrimp-and-Chicken-32.jpg',
      [new Ingredient('Chicken breast', 1)]
    ),
    new Recipe(
      'Recipe for Burrito',
      'This is test recipe2',
      'https://www.dinneratthezoo.com/wp-content/uploads/2017/12/meal-prep-burrito-bowls.jpg',
      [new Ingredient('Pita bread', 1), new Ingredient('Chicken meat', 2)]
    )
  ];

  public recipeListChanged = new Subject<Recipe[]>();

  constructor(private slService: ShopingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.slice()[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeListChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipeListChanged.next(this.recipes.slice());
  }

  updateRecipe(id: number, newRecipe: Recipe) {
    this.recipes[id] = newRecipe;
    this.recipeListChanged.next(this.recipes.slice());
  }

  addIngredientsToshopingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  ngOnDestroy(): void {
    this.recipeListChanged.unsubscribe();
  }
}
