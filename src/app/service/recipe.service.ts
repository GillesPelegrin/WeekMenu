import {Injectable} from "@angular/core";
import {Recipe} from "../model/recipe.model";
import  *  as  db  from '../db/db';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  public getRandomRecipe(): Recipe {
    return db.recipes[Math.floor(Math.random() * db.recipes.length)] as Recipe;
  }

  public getAllRecipes(): Recipe[] {
    return db.recipes as Recipe[];
  }
}
