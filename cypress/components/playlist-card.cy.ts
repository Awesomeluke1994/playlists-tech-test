import {beforeEach, cy, describe, expect, it } from "local-cypress";
import {PlaylistCardComponent} from "../../src/app/components/playlist-card/playlist-card.component";
import {interceptData} from "../e2e/home-page/playlist-intercept-data";


const playlistForTesting = interceptData.featuredPlaylists.content[0]


describe('playlist-card.cy.ts', () => {
  beforeEach(() => {
    cy.mount(PlaylistCardComponent, {
      componentProperties: {
        playlistContent: playlistForTesting
      }
    })
  })

  it("Playlist with id of pl\\.2b0e6e332fdf4b7a91164da3162127b5 should exist", () => {
    cy.get('#pl\\.2b0e6e332fdf4b7a91164da3162127b5').should("exist")
  })

  it("Container should contain the playlist image", () => {
    cy.get('#playlist-image').invoke('attr', 'src').then((src) => {
      expect(src).to.include(playlistForTesting.artwork)
    })

    cy.get('#playlist-image').invoke('attr', 'alt').then((src) => {
      expect(src).to.include(playlistForTesting.name)
    })
  })

  it("Should be able to hover and show extra information", () => {
    const playlistCard = getPlaylistCard();
    playlistCard.trigger("mouseenter");
    cy.get('#playlist-name').invoke("text").should("eq", playlistForTesting.name);
    cy.get('#playlist-curator-name').invoke("text").should("eq", playlistForTesting.curator_name)
  })

  it("Should show a button", () => {
    const playlistCard = getPlaylistCard();
    playlistCard.trigger("mouseenter");
    cy.get('#open-playlist-button').invoke("text").should("eq", "Open Playlist");
  })

  it("Should not show playlist button on mouse leave", () => {
    const playlistCard = getPlaylistCard();
    playlistCard.trigger("mouseenter");
    playlistCard.trigger("mouseleave");
    cy.get('#open-playlist-button').should('not.exist')
  })

  it("Clicking button should open a new url to the playlist", () => {
    const playlistCard = getPlaylistCard();
    playlistCard.trigger("mouseenter");

    cy.window().then((win) => {
      cy.stub(win, 'open').as('openWindow');
    });

    cy.get('#open-playlist-button').click();
    cy.get('@openWindow').should('be.calledWith', playlistForTesting.url, '_blank');
  })
})

const getPlaylistCard = () => {
  return cy.get('#pl\\.2b0e6e332fdf4b7a91164da3162127b5');
}
