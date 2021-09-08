import {Injectable} from "@angular/core";
import {RecipeService} from "./recipe.service";
import {WeekDay} from "../model/week-day.model";
import {Recipe} from "../model/recipe.model";
import {WeekDayFilter} from "../model/week-day-filter.model";
import {Day} from "../model/day.model";

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

  constructor(private recipeService: RecipeService) {
  }

  public createMenu(): WeekDay[] {
    let weekMenuUnderDevelopment: Recipe[] = [];

    this.updateWeekMenuBySettings()
    this.updateWeekMenuUnderDevelopmentWithSettingsMenu(weekMenuUnderDevelopment);

    this.weekMenu = this.weekMenu
      .map(weekDay => {
        if (!weekDay.lock && !weekDay.setBySetting) {
          const recipe = this.generateUniqueRecipe(weekMenuUnderDevelopment);
          weekMenuUnderDevelopment.push(recipe);
          return {...weekDay, ...{recipe: recipe} as WeekDay}
        }
        return weekDay
      });

    return this.weekMenu;
  }


  private generateUniqueRecipe(weekMenuUnderDevelopment: Recipe[]): Recipe {
    let recipe: Recipe;
    do {
      recipe = this.recipeService.getRandomRecipe()
    }
    while (this.isRecipeInUnderDevelopmentWeekMenu(weekMenuUnderDevelopment, recipe))

    return recipe
  }

  private isRecipeInUnderDevelopmentWeekMenu(weekMenuUnderDevelopment: Recipe[], newRecipe: Recipe): boolean {
    return weekMenuUnderDevelopment.filter((recipe: Recipe) => recipe.id === newRecipe.id).length != 0;
  }

  private updateWeekMenuBySettings() {
    const weekMenuSetting: WeekDayFilter[] = this.getSettings();

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

  public setSetting(weekdays: WeekDayFilter[]) {
    localStorage.clear();
    localStorage.setItem('weekMenu', JSON.stringify(weekdays));
  }

  public getSettings(): WeekDayFilter[] {
    const weekDayFilter = JSON.parse(localStorage.getItem('weekMenu')) as WeekDayFilter[]
    return weekDayFilter == undefined ? this.getEmptyWeekMenuFilter() :
      weekDayFilter.map(weekDayFilter => new WeekDayFilter(weekDayFilter.day, weekDayFilter.recipeId, weekDayFilter.country));
  }

  private getEmptyWeekMenuFilter(): WeekDayFilter[] {
    return [new WeekDayFilter(Day.MONDAY),
      new WeekDayFilter(Day.TUESDAY),
      new WeekDayFilter(Day.WEDNESDAY),
      new WeekDayFilter(Day.THURSDAY),
      new WeekDayFilter(Day.FRIDAY),
      new WeekDayFilter(Day.SATURDAY),
      new WeekDayFilter(Day.SUNDAY)]
  }

}
