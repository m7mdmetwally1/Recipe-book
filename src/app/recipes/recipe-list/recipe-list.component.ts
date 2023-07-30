import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeServiceService } from '../recipe-service.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipeService: RecipeServiceService) { }
  ngOnInit() {
    this.recipeService.recipesChanged.subscribe(recipes => {

      this.recipes = recipes;

    })
    this.recipes = this.recipeService.getRecipe();
  }
}
