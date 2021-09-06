import {Component, OnInit} from '@angular/core';
import {faCog, faRedoAlt} from '@fortawesome/free-solid-svg-icons';
import {ModalService} from "../../modal/modal.service";
import {RecipeService} from "../../service/recipe.service";
import {WeekDay} from "../../model/week-day.model";
import {Recipe} from "../../model/recipe.model";

@Component({
  selector: 'app-root',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  weekMenu: any[];

  faCog = faCog;
  faRedoAlt = faRedoAlt;

  constructor(private modalService: ModalService,
              private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.weekMenu = [
      {day: "Ma"} as WeekDay,
      {day: "Di"} as WeekDay,
      {day: "Wo"} as WeekDay,
      {day: "Do"} as WeekDay,
      {day: "Vr"} as WeekDay,
      {day: "Za"} as WeekDay,
      {day: "Zo"} as WeekDay,
    ]

    this.generateWeekMenu();
  }

  public generateWeekMenu() {
    let weekMenuUnderDevelopment: Recipe[] = [];

    this.weekMenu = this.weekMenu.map(weekDay => {
      if (!weekDay.lock) {
        let recipe: Recipe;
        do {
          recipe = this.recipeService.getRandomRecipe()
        } while (this.isRecipeInUnderDevelopmentWeekMenu(weekMenuUnderDevelopment, recipe))
        weekMenuUnderDevelopment.push(recipe);

        return {...weekDay, ...{id: recipe.id, recipe: recipe.name, country: recipe.country + ''} as WeekDay}
      }
      return weekDay
    });
  }

  private isRecipeInUnderDevelopmentWeekMenu(weekMenuUnderDevelopment: Recipe[], newRecipe: Recipe): boolean {
    return weekMenuUnderDevelopment.filter((recipe: Recipe) => recipe.id === newRecipe.id).length != 0;
  }
}
