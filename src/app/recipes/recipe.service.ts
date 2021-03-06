import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { ShoppingListService } from '../shopping-list/shoping-list.service';

@Injectable()
export class RecipeService implements OnDestroy, OnInit {
    private recipes: Recipe[] = [];

    public recipeListChanged = new Subject<Recipe[]>();

    constructor(private slService: ShoppingListService) {}

    ngOnInit(): void {}

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

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
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

    addIngredientsToshoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    ngOnDestroy(): void {
        this.recipeListChanged.unsubscribe();
    }
}
