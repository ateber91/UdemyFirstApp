import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BetterHighlightDirective } from './basic-highlight/better-highlight.directive';
import { BasicHighlightDirective } from './basic-highlight/basic-highlight-directive';
import { RecipeService } from './recipes/recipe.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shoping-list.service';
import { StoreModule } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        BasicHighlightDirective,
        BetterHighlightDirective,
        NotFoundComponent
    ],
    exports: [AlertComponent],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        StoreModule.forRoot(fromApp.appReducer),
        SharedModule,
        AppRoutingModule
    ],
    providers: [
        ShoppingListService,
        RecipeService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    entryComponents: [AlertComponent]
})
export class AppModule {}
