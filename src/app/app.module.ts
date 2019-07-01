import { ShopingListService } from './shopping-list/shoping-list.service';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotingToShowComponent } from './noting-to-show/noting-to-show.component';
import { BetterHighlightDirective } from './basic-highlight/better-highlight.directive';
import { BasicHighlightDirective } from './basic-highlight/basic-highlight-directive';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
    declarations: [
        AppComponent,
        ShoppingListComponent,
        HeaderComponent,
        ShoppingEditComponent,
        RecipesComponent,
        RecipeDetailsComponent,
        RecipeListComponent,
        RecipeItemComponent,
        BasicHighlightDirective,
        BetterHighlightDirective,
        DropdownDirective,
        NotFoundComponent,
        NotingToShowComponent,
        RecipeEditComponent,
        AuthComponent
    ],
    imports: [ BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule, HttpModule ],
    providers: [ ShopingListService ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
