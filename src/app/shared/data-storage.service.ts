import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeServiceService } from '../recipes/recipe-service.service';
import { Recipe } from '../recipes/recipe-list/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { Ingredients } from './Ingredients';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipes: RecipeServiceService,
    private authService: AuthService
  ) {}

  storeData() {
    const recipes = this.recipes.getRecipe();

    return this.http
      .put(
        'https://recipe-book-ca170-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((recipes) => {
        console.log(recipes);
      });
  }

  // fetchData() {
  //   return this.http.get<Recipe[]>('https://recipe-book-ca170-default-rtdb.firebaseio.com/recipes.json').pipe(
  //     map(recipes => {
  //       return recipes.map(recipe => {
  //         return {
  //           ...recipe,
  //           ingredients: recipe.ingridients ? recipe.ingridients : []
  //         };
  //       });
  //     }),tap((recipes) => {
  //       this.recipes.setRecipes(recipes)
  //     })
  //   )}
  fetchData() {
    return this.http
      .get<Recipe[]>(
        'https://recipe-book-ca170-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingridients ? recipe.ingridients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipes.setRecipes(recipes);
        })
      );
  }
}
