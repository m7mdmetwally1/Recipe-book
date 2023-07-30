import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesDetailsComponent } from './recipes/recipes-details/recipes-details.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { ResorverDataServiceService } from './recipes/resorver-data-service.service';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipesDetailsComponent, resolve: [ResorverDataServiceService] },
      { path: ':id/edit', component: RecipeEditComponent, resolve: [ResorverDataServiceService] },
    ],
  },
  {
    path: 'shoppingList',
    component: ShoppingListComponent,
  }, {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full',
  }

];
@NgModule({
  imports: [

    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
