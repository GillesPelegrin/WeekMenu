import {Component} from "@angular/core";
import {RepositoryService} from "../../service/repository.service";
import {RecipeService} from "../../service/recipe.service";

@Component({
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  constructor(private repository: RepositoryService,
              private recipeService: RecipeService) {
  }

  deployDbToFirebase() {
    this.recipeService.getAllRecipes().forEach(recipe => {
      this.repository.save("recipes", recipe);
    })
  }

}
