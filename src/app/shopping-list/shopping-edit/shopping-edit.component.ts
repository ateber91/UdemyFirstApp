import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from './../../shared/ingredient.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { ShoppingListService } from '../shoping-list.service';
import { Store, State } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingListReducer from '../store/shopping-list.reducer';
@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('slForm', { static: true }) slForm: NgForm;
    subscription: Subscription;
    editMode = false;
    editItemIndex: number;
    editItem: Ingredient;

    constructor(private store: Store<fromShoppingListReducer.AppState>) {}

    ngOnInit() {
        this.subscription = this.store
            .select('shoppingList')
            .subscribe(stateData => {
                if (stateData.editedIngredientIndex > -1) {
                    this.editMode = true;
                    this.editItemIndex = stateData.editedIngredientIndex;
                    this.editItem = stateData.editedIngredient;
                    this.slForm.setValue({
                        nameInput: this.editItem.name,
                        amountInput: this.editItem.amount
                    });
                } else {
                    this.editMode = false;
                }
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.store.dispatch(new ShoppingListActions.StopEdit());
    }

    onSubmit() {
        const newIngredient = new Ingredient(
            this.slForm.form.get('nameInput').value,
            this.slForm.form.get('amountInput').value
        );
        if (this.editMode) {
            console.log('editMode true onSumbit');
            console.log('index: ' + this.editItemIndex);
            console.log('ingredientAmount: ' + newIngredient.amount);
            this.store.dispatch(
                new ShoppingListActions.UpdateIngredient({
                    index: this.editItemIndex,
                    ingredient: newIngredient
                })
            );
        } else {
            this.store.dispatch(
                new ShoppingListActions.AddIngredient(newIngredient)
            );
        }
        this.editMode = false;
        this.slForm.reset();
    }

    onClear() {
        this.slForm.reset();
        this.editMode = false;
        this.store.dispatch(new ShoppingListActions.StopEdit());
    }

    onDelete() {
        this.store.dispatch(
            new ShoppingListActions.DeleteIngredient(this.editItemIndex)
        );
        this.onClear();
    }
}
