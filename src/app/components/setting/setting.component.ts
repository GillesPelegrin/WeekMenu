import {Component, OnInit} from "@angular/core";
import {faArrowLeft, faCog} from "@fortawesome/free-solid-svg-icons";
import {Country} from "../../model/country.enum";
import {RecipeService} from "../../service/recipe.service";
import {Recipe} from "../../model/recipe.model";
import {MenuFactory} from "../../service/menu.factory";
import {WeekDayFilter} from "../../model/week-day-filter.model";

@Component({
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  countries: String[] = Object.values(Country).filter(country => country !== Country.NONE);
  recipes: Recipe[]
  weekMenuSettings: WeekDayFilter[];

  country = Country;

  faCog = faCog;
  faArrowLeft = faArrowLeft;

  constructor(private recipeService: RecipeService,
              private menuFactory: MenuFactory) {
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getAllRecipes();
    this.weekMenuSettings = this.menuFactory.getSettings();
  }

  public updateRecipe(weekDayFilter: WeekDayFilter) {
    weekDayFilter.setFilterOnRecipe(this.recipeService.getRecipeById(weekDayFilter.recipeId));
    this.updateSetting();
  }

  public updateCountry(weekDayFilter: WeekDayFilter, country: Country) {
    weekDayFilter.setFilterOnCountry(country);
    this.updateSetting();
  }

  private updateSetting() {
    this.menuFactory.setSetting(this.weekMenuSettings);
  }
}
