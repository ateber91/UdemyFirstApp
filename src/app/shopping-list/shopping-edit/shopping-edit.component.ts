import { Ingredient } from './../../shared/ingredient.model';
import { ShopingListService } from './../shoping-list.service';
import { Component, OnInit, ViewChild, EventEmitter, ElementRef, Output, Input } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;
  @Output() newIngredientEmited = new EventEmitter<Ingredient>();

  constructor(private shopingListService: ShopingListService) { }

  ngOnInit() {
  }

  onAddItem() {
    this.shopingListService.addIngredient(new Ingredient(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value));
  }

}
