import {interceptData} from "./playlist-intercept-data";
import {beforeEach, context, cy, expect, it} from "local-cypress";

context('home page tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://portal.organicfruitapps.com/programming-guides/v2/us_en-us/featured-playlists.json', {
      statusCode: 200,
      body: interceptData
    })
    cy.visit("http://localhost:4200")
  })
  it("When not filtered - should show correct playlists", () => {
    cy.get("app-playlist-card").should('have.length', 6);
  })

  it("When filtering - should show correct playlists", () => {
    const playListInput = cy.get("#playlist-name-filter")
    playListInput.type("today");
    cy.get("app-playlist-card").should('have.length', 1);
  })

  it("Successfully getting the playlists should show a snackbar", () => {
    cy.get('.mat-mdc-snack-bar-label').should('be.visible').should("contain.text", 'Successfully retrieved playlists')
  })

  it("Should show a spinner when loading playlists", () => {
    cy.get("#playlist-spinner").should('be.visible');
  })

  it("Autocomplete should be filtered after typing", () => {
    const playListInput = cy.get("#playlist-name-filter")
    playListInput.type("music");
    const amountOfOptions = cy.get("mat-option").its("length")
      .then((amount) => {
        expect(amount).to.eq(1);
      });
  })

  it("Autocomplete should have all entries if not typed into yet", () => {
    cy.get("#playlist-name-filter").focus()
    const amountOfOptions = cy.get("mat-option").its("length")
      .then((amount) => {
        expect(amount).to.eq(6);
      });
  })
})

context('home page texts when endpoint has failed', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://portal.organicfruitapps.com/programming-guides/v2/us_en-us/featured-playlists.json', {
      statusCode: 500,
      body: interceptData
    })
    cy.visit("http://localhost:4200")
  })

  it("Show throw a snackbar saying that it failed to get playlists", () => {
    cy.get('.mat-mdc-snack-bar-label').should('be.visible').should("contain.text", 'Failed to retrieve playlists')
  })

  it("Should show div with a oh no message if it has failed to get playlists", () => {
    cy.get('#error-retrieving-playlists')
      .should('be.visible')
      .should("contain.text", "Oh no! there seems to be a problem retrieving playlists")
  })

  it('Should hide spinner if request fails', () => {
    cy.get("#playlist-spinner").should('not.exist')
  })
})

