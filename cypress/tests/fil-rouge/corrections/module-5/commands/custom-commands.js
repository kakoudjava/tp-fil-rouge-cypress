/**
 * ============================================================
 * CORRECTION — MODULE 5 : Commandes personnalisées
 * ============================================================
 */

// Commande 1 : Login via API (sans charger la page de login)
Cypress.Commands.add("loginViaApi", (username, password) => {
  cy.request("POST", `${Cypress.env("apiUrl")}/login`, {
    username,
    password,
  }).then((response) => {
    cy.log("Connecté via API en tant que " + username);
  });
});

// Commande 2 : Récupérer le solde
Cypress.Commands.add("getBalance", () => {
  return cy
    .getBySel("sidenav-user-balance")
    .invoke("text")
    .then((text) => {
      return parseFloat(text.replace(/[$,\s]/g, ""));
    });
});

// Commande 3 : Créer un paiement via l'UI
Cypress.Commands.add("makePayment", (contactName, amount, description) => {
  cy.getBySel("nav-top-new-transaction").click();
  cy.getBySelLike("user-list-item").contains(contactName).click();
  cy.get("#amount").type(amount);
  cy.get("#transaction-create-description-input").type(description);
  cy.getBySel("transaction-create-submit-payment").click();
});

// Commande 4 : Créer une demande de paiement via l'UI
Cypress.Commands.add("makeRequest", (contactName, amount, description) => {
  cy.getBySel("nav-top-new-transaction").click();
  cy.getBySelLike("user-list-item").contains(contactName).click();
  cy.get("#amount").type(amount);
  cy.get("#transaction-create-description-input").type(description);
  cy.getBySel("transaction-create-submit-request").click();
});

// Commande 5 : Vérifier qu'on est sur le dashboard
Cypress.Commands.add("assertOnDashboard", () => {
  cy.url().should("not.include", "/signin");
  cy.url().should("not.include", "/signup");
  cy.getBySel("sidenav-user-full-name").should("be.visible");
});
