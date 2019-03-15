import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from '../recipes/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
 @Input() ingredients: Ingredient[] = [ new Ingredient("Apples", 5) ];
  constructor() { }

  ngOnInit() {
  }

  pushIngredients(data: Ingredient){
    this.ingredients.push(new Ingredient(data.name,data.amount))
  }

}