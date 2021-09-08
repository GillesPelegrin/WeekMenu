import {Country} from "./country.enum";
import {Day} from "./day.model";
import {Recipe} from "./recipe.model";

export class WeekDayFilter {
  recipeId: string;
  country: Country;
  public readonly nonSelectedRecipeId = '999';


  constructor(public day: Day, recipeId = '999', country = Country.NONE) {
    this.recipeId = recipeId;
    this.country = country;
  }

  public setFilterOnCountry(country: Country): void {
    this.recipeId = this.nonSelectedRecipeId;
    this.country = country;
  }

  public setFilterOnRecipe(recipe: Recipe): void {
    this.recipeId = recipe.id;
    this.country = recipe.country;
  }

  public clearFilter() {
    this.recipeId = this.nonSelectedRecipeId;
    this.country = Country.NONE;
  }

  public isFilterActiveOnRecipe(){
    return this.recipeId != this.nonSelectedRecipeId;
  }

  public isFilterActiveOnCountry() {
    return this.recipeId == this.nonSelectedRecipeId && this.country != undefined && this.country != Country.NONE;
  }
}
