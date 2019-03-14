import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  @Input() currentRecipeSelected: Recipe;
  
  constructor() { }

  ngOnInit() {
   
  }

  clickedRecipe(item: Recipe): void {
    this.currentRecipeSelected = item;
  }



}
