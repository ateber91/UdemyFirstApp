import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [ShoppingListComponent, ShoppingEditComponent],
    imports: [
        ReactiveFormsModule,
        ShoppingListRoutingModule,
        FormsModule,
        HttpClientModule,
        SharedModule
    ]
})
export class ShoppingListModule {}
