import {HomePo} from "./home.po";

export class SettingPo {

  public selectFirstRecipe(row: number): Cypress.Chainable<SettingPo> {
    return cy.get('#select-recipe-Ma-' + row).select('1: T1')
      .then(() => new SettingPo());
  }

  public goToHome(): Cypress.Chainable<HomePo> {
    return cy.get('#back-to-menu-button').click()
      .then(() => new HomePo());
  }


}
