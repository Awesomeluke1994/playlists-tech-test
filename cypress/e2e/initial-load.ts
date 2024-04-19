import {context, cy, it} from "local-cypress";


context('Initial load', () => {
  it('Should redirect to home', () => {
    cy.visit("http://localhost:4200/")
    cy.url().should('eq', 'http://localhost:4200/home')
  })
});
