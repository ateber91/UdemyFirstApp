import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeItemEmitter: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  recipes: Recipe[] = [ 
    new Recipe("Recipe for Chicken and Sausage", "This is test recipe", "https://www.gimmesomeoven.com/wp-content/uploads/2014/03/Cajun-Jambalaya-Recipe-with-Andouille-Sausage-Shrimp-and-Chicken-32.jpg"),
    new Recipe("Recipe for Burrito", "This is test recipe2", "https://www.dinneratthezoo.com/wp-content/uploads/2017/12/meal-prep-burrito-bowls.jpg")
  ];
  constructor() { }

  ngOnInit() {
  }

  onItemSelected (item: Recipe) {
    console.log("Deiba  " + item.name)
    this.recipeItemEmitter.emit(item)
  }
}