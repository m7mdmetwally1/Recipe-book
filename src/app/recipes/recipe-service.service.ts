import { Injectable } from '@angular/core';
import { Recipe } from './recipe-list/recipe.model';
import { Ingredients } from '../shared/Ingredients';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RecipeServiceService {

  recipesChanged = new Subject<Recipe[]>();


  constructor(private http: HttpClient) { }

  private recipes: Recipe[] = [];




  getRecipe() {

    return this.recipes.slice();

  }

  getRecipeByID(id: number) {
    return this.recipes[id];
  }


  updateRecipes(index: number, recipe: Recipe) {

    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice())

  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }


  deletion(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }


  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());

  }

  // storeData() {
  //   const recipes = this.getRecipe()
  //   this.http.put('https://recipe-book-ca170-default-rtdb.firebaseio.com', recipes).subscribe((recipes) => {
  //     console.log(recipes);
  //   })
  // }


}