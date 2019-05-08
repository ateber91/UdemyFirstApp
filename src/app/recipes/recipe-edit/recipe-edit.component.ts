import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  allowEdit = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
        (params: Params) => {
          if (params['id'] == null) {
            this.allowEdit = false;
          } else {
            this.allowEdit = true;
            this.id = params['id'];
          }
          this.initForm();
        }
      );
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.allowEdit) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.urlPath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (const i of recipe.ingredients) {
            recipeIngredients.push(new FormGroup({
              'name': new FormControl(i.name),
              'amount': new FormControl(i.amount)
            })
          );
        }
      } else {
        recipeIngredients.push(new FormGroup({
          'name': new FormControl(''),
          'amount': new FormControl('')
          })
        );
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'urlPath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, [Validators.required, Validators.minLength(3)]),
      'ingredients': recipeIngredients
    });
  }

  onSubmit() {
    // console.log(this.recipeForm);

    if (this.allowEdit) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9][0-9]{0,3}$/)])
      })
    );
  }
}
