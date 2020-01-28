import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Observable } from 'rxjs';
import { ShoppingListService } from './shoping-list.service';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as ShoppingListAction from './store/shopping-list.actions';
@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredients: Observable<{ ingredients: Ingredient[] }>;

    constructor(
        private shoppingListService: ShoppingListService,
        private store: Store<fromApp.AppState>
    ) {}

    ngOnInit() {
        this.ingredients = this.store.select('shoppingList');
    }

    onIngredientEdit(index: number) {
        console.log('onIngredientEdit');
        this.store.dispatch(new ShoppingListAction.StartEdit(index));
        // this.shoppingListService.ingredientToEdit.next(index);
    }

    ngOnDestroy() {}
}
