import {HomePo} from "./po/home.po";

describe('Settings', () => {
  beforeEach(() => {
    cy.visit('localhost:4200')
  })

  it('should set a recipe and see if its disabled and does not change when generating new menu', () => {
    let originalRecipes = HomePo.getListOfAllGeneratedRecipes();

    new HomePo()
      .goToSettings()
      .then(settingsPo => settingsPo.selectFirstRecipe(0))
      .then(settingsPo => settingsPo.goToHome())
      .then(homePo => homePo.assertTableThatAllRecipesAreNotOriginalAndThatTheFirstRecipeIs(originalRecipes, 'Groen curry met kip'))
      .then(homePo => homePo.assertFirstMenuHasGrayBackground())
      .then(homePo => homePo.generateNewMenu())
      .then(homePo => homePo.assertTableThatAllRecipesAreNotOriginalAndThatTheFirstRecipeIs(originalRecipes, 'Groen curry met kip'))
      .then(homePo => homePo.goToSettings())


  });

  // it('should set a country and see if its not disabled and does generate menu from same country when generating new menu', () => {
  // });


});
