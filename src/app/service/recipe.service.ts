import {Injectable} from "@angular/core";
import {Recipe} from "../model/recipe.model";
import {Country} from "../model/country.enum";
import {RepositoryService} from "./repository.service";
import {Observable} from "rxjs";
import {take} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  // private recipes$ = new BehaviorSubject<Recipe[]>([]);
  private recipes: Recipe[] = []

  constructor(private repository: RepositoryService) {
  }

  public setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
  }

  public getRandomRecipe(): Recipe {
    return this.recipes[Math.floor(Math.random() * this.recipes.length)] as Recipe;
  }

  public getRecipeById(id: string): Recipe {
    return this.recipes.filter(recipe => recipe.id === id)[0];
  }

  public getAllRecipes(): Observable<Recipe[]> {
    return this.repository.getAll('recipes')
      .pipe(take(1))  // todo this needs to be adapted if you add new recipes - new recipes will not added locally
  }

  public getRandomRecipeExcept(blackListRecipes: Recipe[]): Recipe {
    const blackListIds: string[] = blackListRecipes.map(recipe => recipe.id);
    const remainingRecipes: Recipe[] = this.recipes.filter((recipe: Recipe) => !blackListIds.includes(recipe.id))
    return remainingRecipes[Math.floor(Math.random() * remainingRecipes.length)] as Recipe;
  }

  public getRandomRecipeOfCountry(country: Country): Recipe {
    /*
    filter list by country and then take a random recipe out this list -> better performance and the while loop is gone
     */
    let recipe: Recipe;
    let recipeErrorCounter = 0;
    do {
      recipe = this.recipes[Math.floor(Math.random() * this.recipes.length)] as Recipe;
      recipeErrorCounter += 1;
    } while (recipe.country !== country && recipeErrorCounter < 1000)
    return recipe;
  }
}
