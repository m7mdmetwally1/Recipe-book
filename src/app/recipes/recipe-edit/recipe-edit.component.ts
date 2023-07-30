import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { RecipeServiceService } from '../recipe-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  addRecipeForm: FormGroup;
  constructor(private route: ActivatedRoute, private recipeService: RecipeServiceService, private router: Router) {

  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      this.editMode = params['id'] != null;
      this.initialForm();
    });


  }

  onSubmit() {
    this.router.navigate(['../', { relativeTo: this.route }]);
  }

  initialForm() {

    let recipeName = '';
    let imagePath = '';
    let description = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeByID(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;

      if (recipe['ingridients']) {
        let ingredients = recipe.ingridients;

        for (let ingredient of ingredients) {

          let ingredientFormGroup = new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          });

          recipeIngredients.push(ingredientFormGroup);

        }
      }

    }







    this.addRecipeForm = new FormGroup({
      "name": new FormControl(recipeName, Validators.required),
      "imagePath": new FormControl(imagePath, Validators.required),
      "description": new FormControl(description, Validators.required),
      "ingredients": recipeIngredients

    })
  }

  get controls() {
    return (this.addRecipeForm.get('ingredients') as FormArray).controls;
  }

  onAddIngredients() {

    (<FormArray>this.addRecipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    }))

  }

  editRecipes() {

    if (this.editMode) {
      const newRecipe = this.addRecipeForm.value;
      this.recipeService.updateRecipes(this.id, newRecipe);

    } else {
      this.recipeService.addRecipe(this.addRecipeForm.value);

    }

  }


  onDeleteIngredients(index: number) {
    (this.addRecipeForm.get('ingredients') as FormArray).removeAt(index);
  }


}
