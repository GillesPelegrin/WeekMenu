import {Injectable} from "@angular/core";
import {Recipe} from "../model/recipe.model";
import *  as  db from '../db/db';
import {Country} from "../model/country.enum";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  public getRandomRecipe(): Recipe {
    return db.recipes[Math.floor(Math.random() * db.recipes.length)] as Recipe;
  }

  public getRecipeById(id: string): Recipe {
    return this.getAllRecipes().filter(recipe => recipe.id === id)[0];
  }

  public getAllRecipes(): Recipe[] {
    return db.recipes as Recipe[];
  }

  public getRandomRecipeOfCountry(country: Country) {
    let recipe: Recipe;
    let recipeErrorCounter = 0;
    do {
      recipe = this.getRandomRecipe();
      recipeErrorCounter += 1;
    } while (recipe.country !== country && recipeErrorCounter < 1000)
    return recipe;
  }
}
