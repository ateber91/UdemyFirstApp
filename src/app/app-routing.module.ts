import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { NotFoundComponent } from './not-found/not-found.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NotingToShowComponent } from './noting-to-show/noting-to-show.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { AuthComponent } from './auth/auth.component';
import { RecipeResolverService } from './recipes/recipes-resolver.service';

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
                path: '',
                component: NotingToShowComponent,
                resolve: [RecipeResolverService],
                data: { message: 'Please select recipe!' }
            },
            {
                path: 'new',
                component: RecipeEditComponent
            },
            {
                path: ':id',
                component: RecipeDetailsComponent,
                resolve: [RecipeResolverService]
            },
            {
                path: ':id/edit',
                component: RecipeEditComponent,
                resolve: [RecipeResolverService]
            }
        ]
    },
    {
        path: 'shoping-list',
        component: ShoppingListComponent
    },
    {
        path: 'auth',
        component: AuthComponent
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
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
