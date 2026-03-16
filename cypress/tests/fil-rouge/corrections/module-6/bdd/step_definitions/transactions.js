/**
 * ============================================================
 * CORRECTION — MODULE 6 : Step Definitions — Transactions
 * ============================================================
 *
 * Chaque fonction When/Then correspond à une ligne
 * du fichier transactions.feature écrit en Gherkin.
 * ============================================================
 */

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// ── WHEN ────────────────────────────────────────

When("je navigue vers {string}", (pageName) => {
  if (pageName === "New Transaction") {
    // Le bouton "+" en haut à droite pour créer une transaction
    cy.getBySel("nav-top-new-transaction").click();
  }
});

When("je sélectionne le contact {string}", (contactName) => {
  // On cherche le nom du contact dans la liste des utilisateurs
  cy.getBySelLike("user-list-item").contains(contactName).click();
});

When("je saisis le montant {string}", (amount) => {
  cy.get("#amount").type(amount);
});

When("je saisis la description {string}", (description) => {
  cy.get("#transaction-create-description-input").type(description);
});

When("je clique sur {string}", (buttonText) => {
  // Selon le texte du bouton, on clique sur Pay ou Request
  if (buttonText === "Pay") {
    cy.getBySel("transaction-create-submit-payment").click();
  } else if (buttonText === "Request") {
    cy.getBySel("transaction-create-submit-request").click();
  }
});

// ── THEN ────────────────────────────────────────

Then("je vois le message de succès {string}", (message) => {
  // Après un paiement réussi, un message de succès s'affiche
  cy.get('[data-test="alert-bar-success"]')
    .should("be.visible")
    .and("contain", message);
});

Then("le bouton {string} est désactivé", (buttonText) => {
  // Sans montant saisi, le bouton Pay doit être désactivé
  if (buttonText === "Pay") {
    cy.getBySel("transaction-create-submit-payment").should("be.disabled");
  }
});
