/**
 * ============================================================
 * TP FIL ROUGE — MODULE 5 : Commandes personnalisées
 * ============================================================
 *
 * OBJECTIF :
 * Créer des commandes Cypress réutilisables.
 * NOTE : Le projet a déjà des commandes (cy.login, cy.getBySel, etc.)
 * Ici tu vas créer des commandes SUPPLÉMENTAIRES spécifiques au fil rouge.
 *
 * CONSIGNES :
 * 1. Complète les commandes ci-dessous
 * 2. Pour les utiliser, importe ce fichier dans cypress/support/e2e.js :
 *    import '../../tests/fil-rouge/module-5/commands/custom-commands'
 * ============================================================
 */

// ──────────────────────────────────────────────
// Commande 1 : Login rapide via l'API (sans passer par l'UI)
// ──────────────────────────────────────────────
// Cette commande est plus rapide que cy.login() car elle ne charge pas la page
// Elle fait un appel API direct pour obtenir le cookie de session
//
// Usage : cy.loginViaApi('Heath93', 's3cret')
//
Cypress.Commands.add("loginViaApi", (username, password) => {
  // TODO :
  // cy.request('POST', `${Cypress.env('apiUrl')}/login`, {
  //   username,
  //   password,
  // }).then((response) => {
  //   // Stocker le cookie/token de session
  //   cy.log(`Connecté via API en tant que ${username}`)
  // })
});

// ──────────────────────────────────────────────
// Commande 2 : Récupérer le solde de l'utilisateur
// ──────────────────────────────────────────────
// Usage : cy.getBalance().then((balance) => { expect(balance).to.be.greaterThan(0) })
//
Cypress.Commands.add("getBalance", () => {
  // TODO :
  // return cy.getBySel('sidenav-user-balance')
  //   .invoke('text')
  //   .then((text) => {
  //     return parseFloat(text.replace(/[$,\s]/g, ''))
  //   })
});

// ──────────────────────────────────────────────
// Commande 3 : Créer un paiement via l'UI
// ──────────────────────────────────────────────
// Usage : cy.makePayment('Arvilla', '50', 'Resto')
//
Cypress.Commands.add("makePayment", (contactName, amount, description) => {
  // TODO :
  // cy.getBySel('nav-top-new-transaction').click()
  // cy.getBySelLike('user-list-item').contains(contactName).click()
  // cy.get('#amount').type(amount)
  // cy.get('#transaction-create-description-input').type(description)
  // cy.getBySel('transaction-create-submit-payment').click()
});

// ──────────────────────────────────────────────
// Commande 4 : Créer une demande de paiement via l'UI
// ──────────────────────────────────────────────
// Usage : cy.makeRequest('Dina', '30', 'Cinéma')
//
Cypress.Commands.add("makeRequest", (contactName, amount, description) => {
  // TODO :
  // cy.getBySel('nav-top-new-transaction').click()
  // cy.getBySelLike('user-list-item').contains(contactName).click()
  // cy.get('#amount').type(amount)
  // cy.get('#transaction-create-description-input').type(description)
  // cy.getBySel('transaction-create-submit-request').click()
});

// ──────────────────────────────────────────────
// Commande 5 : Vérifier qu'on est sur le dashboard
// ──────────────────────────────────────────────
// Usage : cy.assertOnDashboard()
//
Cypress.Commands.add("assertOnDashboard", () => {
  // TODO :
  // cy.url().should('not.include', '/signin')
  // cy.url().should('not.include', '/signup')
  // cy.getBySel('sidenav-user-full-name').should('be.visible')
});
