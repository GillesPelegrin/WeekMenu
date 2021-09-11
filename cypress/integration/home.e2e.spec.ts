describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('localhost:4200')
  })

  it.only('display a list of 8 rows', () => {
    const tableHeader = ['Dag', 'Recept', 'Land']

    cy.get('#menu-table').find('th')
      .should('have.length', 3)
      .each(($el, index) =>  cy.wrap($el).contains(tableHeader[index]))

    cy.get('#menu-table').find('tr')
      .should('have.length', 8)
  });

})
