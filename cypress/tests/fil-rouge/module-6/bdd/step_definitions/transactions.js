/**
 * ============================================================
 * TP FIL ROUGE — MODULE 6 : Step Definitions — Transactions
 * ============================================================
 *
 * CONSIGNES :
 * Complète les step definitions pour le fichier transactions.feature
 * ============================================================
 */

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// ── WHEN ────────────────────────────────────────

When("je navigue vers {string}", (pageName) => {
  // TODO :
  // if (pageName === 'New Transaction') {
  //   cy.getBySel('nav-top-new-transaction').click()
  // }
});

When("je sélectionne le contact {string}", (contactName) => {
  // TODO :
  // cy.getBySelLike('user-list-item').contains(contactName).click()
});

When("je saisis le montant {string}", (amount) => {
  // TODO :
  // cy.get('#amount').type(amount)
});

When("je saisis la description {string}", (description) => {
  // TODO :
  // cy.get('#transaction-create-description-input').type(description)
});

When("je clique sur {string}", (buttonText) => {
  // TODO :
  // if (buttonText === 'Pay') {
  //   cy.getBySel('transaction-create-submit-payment').click()
  // } else if (buttonText === 'Request') {
  //   cy.getBySel('transaction-create-submit-request').click()
  // }
});

// ── THEN ────────────────────────────────────────

Then("je vois le message de succès {string}", (message) => {
  // TODO :
  // cy.get('[data-test="alert-bar-success"]')
  //   .should('be.visible')
  //   .and('contain', message)
});

Then("le bouton {string} est désactivé", (buttonText) => {
  // TODO :
  // if (buttonText === 'Pay') {
  //   cy.getBySel('transaction-create-submit-payment').should('be.disabled')
  // }
});
