import {Component, OnInit} from "@angular/core";
import {faArrowLeft, faCog} from "@fortawesome/free-solid-svg-icons";
import {Country} from "../../model/country.enum";
import {RecipeService} from "../../service/recipe.service";
import {Recipe} from "../../model/recipe.model";
import {WeekDay} from "../../model/week-day.model";

@Component({
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  countries: String[] = Object.values(Country);
  recipes: Recipe[]
  weekMenuSettings;

  faCog = faCog;
  faArrowLeft = faArrowLeft;

  constructor(private recipeService: RecipeService) {

  }


  ngOnInit(): void {
    this.recipes = this.recipeService.getAllRecipes();

      this.weekMenuSettings = [
        {day: "Ma"} as WeekDay,
        {day: "Di"} as WeekDay,
        {day: "Wo"} as WeekDay,
        {day: "Do"} as WeekDay,
        {day: "Vr"} as WeekDay,
        {day: "Za"} as WeekDay,
        {day: "Zo"} as WeekDay,
      ]

  }


}
