import { ShopingListService } from './shoping-list.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription, Subject } from 'rxjs';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private shopingListService: ShopingListService) { }

  ngOnInit() {
    this.ingredients = this.shopingListService.getIngredients();
    this.subscription = this.shopingListService.ingredientsChange.subscribe(
      (ingredients) => {
        this.ingredients = ingredients;
      }
    );
  }

  onIngredientEdit(index: number) {
    this.shopingListService.ingredientToEdit.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
