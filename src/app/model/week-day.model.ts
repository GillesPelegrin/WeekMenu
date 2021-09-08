import {Country} from "./country.enum";
import {Recipe} from "./recipe.model";
import {Day} from "./day.model";

export interface WeekDay {
  lock: boolean;
  disabled: boolean;
  setBySetting: boolean;
  day: Day;
  recipe: Recipe;
}
