import {Injectable} from "@angular/core";
import {WeekDayFilter} from "../model/week-day-filter.model";
import {Day} from "../model/day.model";

@Injectable({
  providedIn: 'root'
})
export class SettingService {

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
