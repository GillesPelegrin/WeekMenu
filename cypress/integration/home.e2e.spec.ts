import {HomePo} from "./po/home.po";

describe('Home', () => {
  beforeEach(() => {
    cy.visit('localhost:4200')
  })

  it('display a list of 8 rows', () => {
    const tableHeader = ['Dag', 'Recept', 'Land']

    cy.get('#menu-table').find('th')
      .should('have.length', 3)
      .each(($el, index) => cy.wrap($el).contains(tableHeader[index]))

    cy.get('#menu-table').find('tr')
      .should('have.length', 8)
  });

  it('display original recipes after pressing generate button', () => {
    let originalRecipes = HomePo.getListOfAllGeneratedRecipes();

    new HomePo().generateNewMenu()

    cy.get('#menu-table').find('[id^="recipe-name-"]')
      .should('have.length', 7)
      .each(($el, index) => cy.wrap($el.text()).should('not.contain', originalRecipes[index]))
  });

  it('when recipe is locked it should not change after generating a new menu', () => {
    let originalRecipes: string[] = HomePo.getListOfAllGeneratedRecipes();

    new HomePo()
      .clickFirstRow()
      .then(homePo => homePo.generateNewMenu())
      .then(homePo => homePo.assertTableThatAllRecipesAreNotOriginalAndThatTheFirstRecipeIsTheSame(originalRecipes))
      .then(homePo => homePo.assertFirstMenuHasGreenBackground());
  });
});
