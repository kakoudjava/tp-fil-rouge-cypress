/**
 * ============================================================
 * TP FIL ROUGE — MODULE 6 : Step Definitions — Authentification
 * ============================================================
 *
 * OBJECTIF :
 * Écrire le code Cypress qui correspond à chaque étape Gherkin
 * du fichier auth.feature
 *
 * CONSIGNES :
 * - Chaque Given/When/Then du .feature doit avoir une step definition ici
 * - Complète les TODO dans chaque step
 * ============================================================
 */

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// ── GIVEN ───────────────────────────────────────

Given("la base de données est réinitialisée", () => {
  cy.task("db:seed");
});

Given("je suis sur la page de connexion", () => {
  // TODO :
  // cy.visit('/signin')
});

Given("je suis sur la page d'inscription", () => {
  // TODO :
  // cy.visit('/signup')
});

Given("je suis connecté avec {string} et {string}", (username, password) => {
  // TODO :
  // cy.login(username, password)
});

// ── WHEN ────────────────────────────────────────

When("je saisis le username {string}", (username) => {
  // TODO :
  // cy.getBySel('signin-username').type(username)
});

When("je saisis le mot de passe {string}", (password) => {
  // TODO :
  // cy.getBySel('signin-password').type(password)
});

When("je clique sur le bouton {string}", (buttonText) => {
  // TODO :
  // cy.contains('button', buttonText).click()
  // OU utiliser les sélecteurs data-test selon le bouton
});

When("je clique sur {string} dans la sidebar", (linkText) => {
  // TODO :
  // cy.getBySel('sidenav-signout').click()
});

When(
  "je remplis le formulaire avec les données suivantes :",
  (dataTable) => {
    // TODO :
    // dataTable.hashes() retourne un tableau d'objets
    // const data = dataTable.hashes()[0]
    // cy.getBySel('signup-first-name').type(data.firstName)
    // cy.getBySel('signup-last-name').type(data.lastName)
    // cy.getBySel('signup-username').type(data.username + Date.now())
    // cy.getBySel('signup-password').type(data.password)
    // cy.getBySel('signup-confirmPassword').type(data.password)
  }
);

// ── THEN ────────────────────────────────────────

Then("je suis redirigé vers le dashboard", () => {
  // TODO :
  // cy.url().should('not.include', '/signin')
});

Then("je vois mon nom dans la sidebar", () => {
  // TODO :
  // cy.getBySel('sidenav-user-full-name').should('be.visible')
});

Then("je vois le message d'erreur {string}", (message) => {
  // TODO :
  // cy.getBySel('signin-error')
  //   .should('be.visible')
  //   .and('contain', message)
});

Then("je suis redirigé vers la page de connexion", () => {
  // TODO :
  // cy.url().should('include', '/signin')
});
