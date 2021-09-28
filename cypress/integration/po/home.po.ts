import {SettingPo} from "./setting.po";

export class HomePo {

  public static getListOfAllGeneratedRecipes(): string[] {
    let originalRecipes: string[] = []

    cy.get('#menu-table').find('[id^="recipe-name-"]')
      .should('have.length', 7)
      .each(($el, index) => originalRecipes.push($el.text()));

    return originalRecipes;
  }

  public clickFirstRow(): Cypress.Chainable<HomePo> {
    return cy.get('#menu-table').find('[id^="recipe-name-"]').first().click()
      .then(() => this);
  }

  public goToSettings(): Cypress.Chainable<SettingPo> {
    return cy.get('#setting-button').click()
      .then(() => new SettingPo());
  }

  public assertTableThatAllRecipesAreNotOriginalAndThatTheFirstRecipeIsTheSame(originalRecipes: string[]): Cypress.Chainable<HomePo> {
    return cy.get('#menu-table').find('[id^="recipe-name-"]')
      .should('have.length', 7)
      .each(($el, index) => {
        if (index == 0) {
          cy.wrap($el.text()).should('contain', originalRecipes[0])
        } else {
          cy.wrap($el.text()).should('not.contain', originalRecipes[index])
        }
      }).then(() => this);
  }

  public assertTableThatAllRecipesAreNotOriginalAndThatTheFirstRecipeIs(originalRecipes: string[], recipeName: string): Cypress.Chainable<HomePo> {
    return cy.get('#menu-table').find('[id^="recipe-name-"]')
      .should('have.length', 7)
      .each(($el, index) => {
        if (index == 0) {
          cy.wrap($el.text()).should('contain', recipeName)
        } else {
          cy.wrap($el.text()).should('not.contain', originalRecipes[index])
        }
      }).then(() => this);
  }

  public assertFirstMenuHasGreenBackground(): Cypress.Chainable<HomePo> {
    return cy.get('#menu-table').find('tr').eq(1).should('have.class', 'green-background')
      .then(() => this)
  }

  public assertFirstMenuHasGrayBackground(): Cypress.Chainable<HomePo> {
    return cy.get('#menu-table').find('tr').eq(1).should('have.class', 'gray-background')
      .then(() => this)
  }

  public generateNewMenu(): Cypress.Chainable<HomePo> {
     cy.get('#generate-recipes').click()
    return cy.wait(2000).then(() => this);
  }
}
