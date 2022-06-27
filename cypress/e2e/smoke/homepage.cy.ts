/// <reference types="cypress" />
describe('HomePage', () => {
  it('should navigate to the home page', () => {
    cy.visit('/');
    cy.injectAxe();
    cy.get('h1').contains('Hello uwazi!');
    cy.checkA11y();
  });
});

export {};
