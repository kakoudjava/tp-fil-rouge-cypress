/**
 * ============================================================
 * CORRECTION — MODULE 6 : Step Definitions — Authentification
 * ============================================================
 *
 * Chaque fonction Given/When/Then correspond à une ligne
 * du fichier auth.feature écrit en Gherkin.
 * ============================================================
 */

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// ── GIVEN ───────────────────────────────────────
// Les "Given" décrivent l'état initial (pré-conditions)

Given("la base de données est réinitialisée", () => {
  cy.task("db:seed");
});

Given("je suis sur la page de connexion", () => {
  cy.visit("/signin");
});

Given("je suis sur la page d'inscription", () => {
  cy.visit("/signup");
});

Given("je suis connecté avec {string} et {string}", (username, password) => {
  // {string} capture le texte entre guillemets dans le .feature
  cy.login(username, password);
});

// ── WHEN ────────────────────────────────────────
// Les "When" décrivent les actions de l'utilisateur

When("je saisis le username {string}", (username) => {
  cy.getBySel("signin-username").type(username);
});

When("je saisis le mot de passe {string}", (password) => {
  cy.getBySel("signin-password").type(password);
});

When("je clique sur le bouton {string}", (buttonText) => {
  // On utilise le sélecteur data-test selon le bouton
  if (buttonText === "Sign In") {
    cy.getBySel("signin-submit").click();
  } else if (buttonText === "Sign Up") {
    cy.getBySel("signup-submit").click();
  } else {
    // Fallback : chercher par le texte du bouton
    cy.contains("button", buttonText).click();
  }
});

When("je clique sur {string} dans la sidebar", (linkText) => {
  // Le bouton "Logout" a le sélecteur data-test="sidenav-signout"
  if (linkText === "Logout") {
    cy.getBySel("sidenav-signout").click();
  }
});

When(
  "je remplis le formulaire avec les données suivantes :",
  (dataTable) => {
    // dataTable.hashes() transforme le tableau Gherkin en tableau d'objets JS
    // Exemple : [{ firstName: "Jean", lastName: "Dupont", ... }]
    const data = dataTable.hashes()[0];

    cy.getBySel("signup-first-name").type(data.firstName);
    cy.getBySel("signup-last-name").type(data.lastName);
    // On ajoute Date.now() pour avoir un username unique à chaque exécution
    cy.getBySel("signup-username").type(data.username + Date.now());
    cy.getBySel("signup-password").type(data.password);
    cy.getBySel("signup-confirmPassword").type(data.password);
  }
);

// ── THEN ────────────────────────────────────────
// Les "Then" décrivent le résultat attendu (vérifications)

Then("je suis redirigé vers le dashboard", () => {
  // Si on n'est plus sur /signin, c'est qu'on est sur le dashboard
  cy.url().should("not.include", "/signin");
});

Then("je vois mon nom dans la sidebar", () => {
  cy.getBySel("sidenav-user-full-name").should("be.visible");
});

Then("je vois le message d'erreur {string}", (message) => {
  cy.getBySel("signin-error")
    .should("be.visible")
    .and("contain", message);
});

Then("je suis redirigé vers la page de connexion", () => {
  cy.url().should("include", "/signin");
});
