import {Injectable} from "@angular/core";
import {RecipeService} from "./recipe.service";
import {WeekDay} from "../model/week-day.model";
import {Recipe} from "../model/recipe.model";
import {WeekDayFilter} from "../model/week-day-filter.model";
import {Day} from "../model/day.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {SettingService} from "./setting.service";

@Injectable({
  providedIn: 'root'
})
export class MenuFactory {

  public weekMenu = [
    {day: Day.MONDAY} as WeekDay,
    {day: Day.TUESDAY} as WeekDay,
    {day: Day.WEDNESDAY} as WeekDay,
    {day: Day.THURSDAY} as WeekDay,
    {day: Day.FRIDAY} as WeekDay,
    {day: Day.SATURDAY} as WeekDay,
    {day: Day.SUNDAY} as WeekDay,
  ]

  constructor(private recipeService: RecipeService,
              private settingRecipe: SettingService) {
  }

  public createMenu(): Observable<WeekDay[]> {

    return this.recipeService.getAllRecipes()
      .pipe(map((recipes: Recipe[]) => {
      this.recipeService.setRecipes(recipes);
      let weekMenuUnderDevelopment: Recipe[] = [];

      this.updateWeekMenuBySettings()
      this.updateWeekMenuUnderDevelopmentWithSettingsMenu(weekMenuUnderDevelopment);

      this.weekMenu = this.weekMenu
        .map(weekDay => {
          if (!weekDay.lock && !weekDay.setBySetting) {
            const recipe = this.recipeService.getRandomRecipeExcept(weekMenuUnderDevelopment);
            weekMenuUnderDevelopment.push(recipe);
            return {...weekDay, ...{recipe: recipe} as WeekDay}
          }
          return weekDay
        });

      return this.weekMenu;
    }))

  }

  private updateWeekMenuBySettings(): void {
    const weekMenuSetting: WeekDayFilter[] = this.settingRecipe.getSettings();

    weekMenuSetting.forEach(weekMenuSetting => {
      const weekMenuDayIndex = this.weekMenu.findIndex(weekDay => weekMenuSetting.day == weekDay.day)
      const weekDay = this.weekMenu[weekMenuDayIndex];

      if (weekMenuSetting.isFilterActiveOnRecipe()) {
        const recipe = this.recipeService.getRecipeById(weekMenuSetting.recipeId);
        weekDay.recipe = recipe
        weekDay.disabled = true;
        weekDay.setBySetting = true;
        return;
      }

      if (weekMenuSetting.isFilterActiveOnCountry() && !weekDay.lock) {
        weekDay.recipe = this.recipeService.getRandomRecipeOfCountry(weekMenuSetting.country);
        weekDay.setBySetting = true;
        weekDay.disabled = false;
        return;
      }

      weekDay.disabled = false;
      weekDay.setBySetting = false;
    })
  }

  private isWeekDayLocked(index: number): boolean {
    return this.weekMenu[index].lock;
  }

  private updateWeekMenuUnderDevelopmentWithSettingsMenu(weekMenuUnderDevelopment: Recipe[]) {
    this.weekMenu
      .filter(weekDay => weekDay.recipe != undefined)
      .forEach(weekDay => weekMenuUnderDevelopment.push(weekDay.recipe));
  }



}
