import {Country} from "./country.enum";
import {Day} from "./day.model";
import {Recipe} from "./recipe.model";

export class WeekDayFilter {
  recipeId: string;
  country: Country;

  constructor(public day: Day, recipeId = undefined, country = Country.NONE) {
    this.recipeId = recipeId;
    this.country = country;
  }

  public setFilterOnCountry(country: Country): void {
    this.recipeId = undefined;
    this.country = country;
  }

  public setFilterOnRecipe(recipe: Recipe): void {
    this.recipeId = recipe.id;
    this.country = recipe.country;
  }

  public isFilterActiveOnRecipe(){
    return this.recipeId != undefined;
  }

  public isFilterActiveOnCountry() {
    return this.recipeId == undefined && this.country != undefined && this.country != Country.NONE;
  }
}
