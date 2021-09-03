import {Component, OnInit} from '@angular/core';
import {faCog, faLockOpen, faRedoAlt} from '@fortawesome/free-solid-svg-icons';
import {faLock} from "@fortawesome/free-solid-svg-icons/faLock";
import {ModalService} from "./modal/modal.service";
import {ConfigModalComponent} from "./config/config-modal.component";
import {RecipeService} from "./service/recipe.service";
import {WeekDay} from "./model/week-day.model";
import {Recipe} from "./model/recipe.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  weekMenu: any[];

  faLockOpen = faLockOpen;
  faLock = faLock;
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
// adding some comment
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

  public revertAllLocks() {
    const stateOfLocks = (this.areAllLocksClosed() || this.areAllLocksOpen()) ? this.areAllLocksOpen() : this.areThereMoreLocksClosed();

    this.weekMenu = this.weekMenu.map(menu => {
      return {...menu, ...{lock: stateOfLocks}}
    })
  }

  public areThereMoreLocksClosed() {
    return this.weekMenu.filter(menu => menu.lock).length >= this.weekMenu.filter(menu => !menu.lock).length;
  }

  public areAllLocksClosed(): boolean {
    return this.weekMenu
      .map(menu => menu.lock)
      .reduce((prev, current) => prev && current);
  }

  public areAllLocksOpen(): boolean {
    return this.weekMenu
      .map(menu => !menu.lock)
      .reduce((prev, current) => prev && current);
  }

  public openConfig() {
    this.modalService.open(ConfigModalComponent);
  }
}
