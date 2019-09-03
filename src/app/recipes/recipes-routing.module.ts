import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth/auth.guard';
import { NotingToShowComponent } from '../noting-to-show/noting-to-show.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeResolverService } from './recipes-resolver.service';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

const routes: Routes = [
    {
        path: 'recipes',
        component: RecipesComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: NotingToShowComponent,
                data: { message: 'Please select recipe!' },
            },
            {
                path: 'new',
                component: RecipeEditComponent,
            },
            {
                path: ':id',
                component: RecipeDetailsComponent,
                resolve: [RecipeResolverService],
            },
            {
                path: ':id/edit',
                component: RecipeEditComponent,
                resolve: [RecipeResolverService],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RecipesRoutingModule {}
