import { Component, OnInit, ViewChild, EventEmitter, ElementRef, Output } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;

  @Output() ingredientEmitter = new EventEmitter<{name: string, amount: number}>();
  constructor() { }

  ngOnInit() {
  }

  onAddRecipeEmit(){
    this.ingredientEmitter.emit(
      {
        name: this.nameInput.nativeElement.value,
        amount: this.amountInput.nativeElement.value
      });
  }

}
