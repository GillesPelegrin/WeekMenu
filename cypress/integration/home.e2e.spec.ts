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

  // it('should have all unique recipes in the list', () => {
  //   cy.get('#menu-table').find('[id^="recipe-name-"]')
  //     .should('have.length', 7)
      // .invoke('text').then((text) => expect(text.trim()).equal('DagReceptLand'))
  // });
})
