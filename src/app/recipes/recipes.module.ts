import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecipesRoutingModule } from './recipes-routing.module';
import { NotingToShowComponent } from '../noting-to-show/noting-to-show.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RecipeService } from './recipe.service';
import { AuthInterceptorService } from '../auth/auth-interceptor.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { SharedModule } from '../shared/shared.module';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeDetailsComponent,
    RecipeListComponent,
    RecipeEditComponent,
    RecipeItemComponent,
    NotingToShowComponent,
  ],
  imports: [
    ReactiveFormsModule,
    RecipesRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
  ],
})
export class RecipesModule {}
