import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe-list/recipe.model';
import { ToggleDirective } from 'src/app/shared/toggle.directive';
import { RecipeServiceService } from '../recipe-service.service';
import { ShoppingListServiceService } from 'src/app/shopping-list/shopping-list-service.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.css'],
})
export class RecipesDetailsComponent implements OnInit {
  recipeDetailed: Recipe;
  id: number;

  constructor(
    private recipeServiceService: RecipeServiceService,
    private shoppingListService: ShoppingListServiceService,
    private activatedRoute: ActivatedRoute, private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.recipeDetailed = this.recipeServiceService.getRecipeByID(this.id);
    });
  }

  ToShoppingListHandlingaddIngridient() {
    for (const ingredient of this.recipeDetailed.ingridients) {
      this.shoppingListService.addIngridient(
        ingredient.name,
        ingredient.amount
      );
    }
  }

  deleteRecipe() {
    this.recipeServiceService.deletion(this.id);
    this.router.navigate(['/recipes']);
  }



}
