import { ShopingListService } from './shopping-list/shoping-list.service';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { NotFoundComponent } from './not-found/not-found.component';
import { BetterHighlightDirective } from './basic-highlight/better-highlight.directive';
import { BasicHighlightDirective } from './basic-highlight/basic-highlight-directive';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { RecipeService } from './recipes/recipe.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { RecepiesModule } from './recipes/recipes.module';

@NgModule({
    declarations: [
        AppComponent,
        ShoppingListComponent,
        HeaderComponent,
        ShoppingEditComponent,
        BasicHighlightDirective,
        BetterHighlightDirective,
        DropdownDirective,
        NotFoundComponent,
        AuthComponent,
        LoadingSpinnerComponent,
        AlertComponent,
        PlaceholderDirective,
    ],
    exports: [],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        RecepiesModule,
        AppRoutingModule,
    ],
    providers: [
        RecipeService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
    entryComponents: [AlertComponent],
})
export class AppModule {}
