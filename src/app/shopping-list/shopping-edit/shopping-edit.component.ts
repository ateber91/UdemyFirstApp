import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from './../../shared/ingredient.model';
import { ShopingListService } from './../shoping-list.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('slForm') slForm: NgForm;
  ingredient: Ingredient;
  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editItem: Ingredient;

  constructor(private shopingListService: ShopingListService) { }

  ngOnInit() {
    this.subscription = this.shopingListService.ingredientToEdit.subscribe(
      (id: number) => {
        this.editMode = true;
        this.editItemIndex = id;
        this.editItem = this.shopingListService.getIngredient(id);
        this.slForm.setValue({
          nameInput: this.editItem.name,
          amountInput: this.editItem.amount
        });
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onSubmit() {
    this.ingredient = new Ingredient(this.slForm.form.get('nameInput').value, this.slForm.form.get('amountInput').value);
    if (this.editMode) {
      this.shopingListService.updateIngredient(this.editItemIndex, this.ingredient);
    } else {
      this.shopingListService.addIngredient(this.ingredient);
    }
    this.editMode = false;
    this.slForm.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shopingListService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }

}
