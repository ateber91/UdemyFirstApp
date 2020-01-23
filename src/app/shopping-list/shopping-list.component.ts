import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Observable } from 'rxjs';
import { ShoppingListService } from './shoping-list.service';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredients: Observable<{ ingredients: Ingredient[] }>;

    constructor(
        private shoppingListService: ShoppingListService,
        private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
    ) {}

    ngOnInit() {
        this.ingredients = this.store.select('shoppingList');
    }

    onIngredientEdit(index: number) {
        this.shoppingListService.ingredientToEdit.next(index);
    }

    ngOnDestroy() {}
}
