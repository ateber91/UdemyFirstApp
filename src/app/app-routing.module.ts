import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { NotFoundComponent } from './not-found/not-found.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NotingToShowComponent } from './noting-to-show/noting-to-show.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/recipes',
        pathMatch: 'full',
    },
    {
        path: 'shoping-list',
        component: ShoppingListComponent,
    },
    {
        path: 'auth',
        component: AuthComponent,
    },
    {
        path: 'no-recipe',
        component: NotingToShowComponent,
        data: { message: 'Please select recipe!' },
    },
    {
        path: 'not-found',
        component: NotFoundComponent,
    },
    {
        path: '**',
        redirectTo: '/not-found',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
