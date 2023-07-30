import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe-list/recipe.model';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeServiceService } from './recipe-service.service';

@Injectable({
  providedIn: 'root'
})
export class ResorverDataServiceService implements Resolve<Recipe[]> {

  constructor(private dataStorage: DataStorageService, private recipes: RecipeServiceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const recipes = this.recipes.getRecipe();
    if (recipes.length === 0) {
      return this.dataStorage.fetchData();

    } else {
      return recipes;
    }
  }
}
