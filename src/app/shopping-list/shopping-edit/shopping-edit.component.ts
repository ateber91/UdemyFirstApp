import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from './../../shared/ingredient.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';
@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('slForm', { static: true }) slForm: NgForm;
    subscription: Subscription;
    editMode = false;
    editItem: Ingredient;

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.subscription = this.store
            .select('shoppingList')
            .subscribe(stateData => {
                if (stateData.editedIngredientIndex > -1) {
                    this.editMode = true;
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
            console.log('ingredientAmount: ' + newIngredient.amount);
            this.store.dispatch(
                new ShoppingListActions.UpdateIngredient(newIngredient)
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
        this.store.dispatch(new ShoppingListActions.DeleteIngredient());
        this.onClear();
    }
}
