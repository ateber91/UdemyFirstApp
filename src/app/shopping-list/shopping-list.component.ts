import { ShopingListService } from './shoping-list.service';
import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  constructor(private shopingListService: ShopingListService) { }

  ngOnInit() {
    this.ingredients = this.shopingListService.getIngredients();
    this.shopingListService.ingredintsChange.subscribe(
      (ingredients) => {
        this.ingredients = ingredients;
      }
     );
  }

}
