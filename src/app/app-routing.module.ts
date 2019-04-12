import { Recipe } from './recipes/recipe.model';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotingToShowComponent } from './noting-to-show/noting-to-show.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      {
        path: ':id',
        component: RecipeItemComponent
      },
      {
        path: '',
        component: NotingToShowComponent,
        data: { message: 'Please select recipe!' },
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'shoping-list',
    component: ShoppingListComponent
  },
  {
    path: 'no-recipe',
    component: NotingToShowComponent,
    data: { message: 'Please select recipe!' }
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
