/**
 * ============================================================
 * TP FIL ROUGE — MODULE 3 : Navigation et Sidebar
 * ============================================================
 *
 * OBJECTIF :
 * Tester la navigation dans l'application : sidebar, liens, onglets.
 *
 * CONCEPTS PRATIQUES :
 * - .find()           → chercher un enfant dans un parent
 * - .parent()         → remonter à l'élément parent
 * - .invoke('text')   → extraire le texte d'un élément
 * - .invoke('attr')   → extraire un attribut d'un élément
 * - .children()       → récupérer les enfants d'un élément
 *
 * RAPPEL DES SELECTEURS SIDEBAR :
 * - cy.getBySel('sidenav-home')
 * - cy.getBySel('sidenav-user-settings')
 * - cy.getBySel('sidenav-bankaccounts')
 * - cy.getBySel('sidenav-notifications')
 * - cy.getBySel('sidenav-signout')
 * - cy.getBySel('sidenav-user-full-name')
 * - cy.getBySel('sidenav-username')
 * - cy.getBySel('sidenav-user-balance')
 *
 * RAPPEL DES SELECTEURS ONGLETS :
 * - cy.getBySel('nav-public-tab')
 * - cy.getBySel('nav-contacts-tab')
 * - cy.getBySel('nav-personal-tab')
 * ============================================================
 */

describe("Navigation principale", () => {
  beforeEach(() => {
    // Réinitialise la base de données avant chaque test
    // → Remet les données par défaut (utilisateurs, transactions, etc.)
    // ⚠️ Cette ligne est déjà fournie — ne pas la modifier
    cy.task("db:seed");
    cy.login("Heath93", "s3cret");
  });

  // ──────────────────────────────────────────────
  // SC22 — Infos utilisateur dans la sidebar
  // ──────────────────────────────────────────────
  it("SC22 - devrait afficher le nom complet de l'utilisateur dans la sidebar", () => {
    // TODO :
    // 1. Vérifier que le nom complet est visible
        cy.getBySel('sidenav-user-full-name').should('be.visible')
    // 2. Extraire le texte et vérifier qu'il n'est pas vide
        cy.getBySel('sidenav-user-full-name')
          .invoke('text')
          .should('not.be.empty')
  });

  // ──────────────────────────────────────────────
  // SC23 — Username dans la sidebar
  // ──────────────────────────────────────────────
  it("SC23 - devrait afficher le username '@Heath93' dans la sidebar", () => {
    // TODO :
    // 1. Vérifier que le username contient "Heath93"
        cy.getBySel('sidenav-username').should('contain', 'Heath93')
  });

  // ──────────────────────────────────────────────
  // SC24 — Solde dans la sidebar
  // ──────────────────────────────────────────────
  it("SC24 - devrait afficher le solde de l'utilisateur avec le signe $", () => {
    // TODO :
    // 1. Vérifier que le solde est visible
        cy.getBySel('sidenav-user-balance').should('be.visible')
    // 2. Extraire le texte du solde
        cy.getBySel('sidenav-user-balance')
          .invoke('text')
    // 3. Vérifier qu'il contient le signe "$"
        .should('contain', '$')
  });

  // ──────────────────────────────────────────────
  // SC25 — Navigation vers Home
  // ──────────────────────────────────────────────
  it("SC25 - devrait naviguer vers la page Home via la sidebar", () => {
    // TODO :
    // 1. D'abord, naviguer vers une autre page (ex: My Account)
        cy.getBySel('sidenav-user-settings').click()
    // 2. Vérifier qu'on est sur /user/settings
        cy.url().should('contain', '/user/settings')
    // 3. Cliquer sur "Home" dans la sidebar
        cy.getBySel('sidenav-home').click()
    // 4. Vérifier que l'URL est "/" ou ne contient pas "/user"
        cy.url().should('eq', Cypress.config().baseUrl + '/')
  });

  // ──────────────────────────────────────────────
  // SC26 — Navigation vers My Account
  // ──────────────────────────────────────────────
  it("SC26 - devrait naviguer vers My Account et afficher le formulaire", () => {
    // TODO :
    // 1. Cliquer sur "My Account" dans la sidebar
        cy.getBySel('sidenav-user-settings').click()
    // 2. Vérifier que l'URL contient '/user/settings'
        cy.url().should('contain', '/user/settings')
    // 3. Vérifier que le formulaire de paramètres est visible
        cy.getBySel('user-settings-form').should('be.visible')
  });

  // ──────────────────────────────────────────────
  // SC27 — Navigation vers Bank Accounts
  // ──────────────────────────────────────────────
  it("SC27 - devrait naviguer vers Bank Accounts", () => {
    // TODO :
    // 1. Cliquer sur "Bank Accounts" dans la sidebar
        cy.getBySel('sidenav-bankaccounts').click()
    // 2. Vérifier que l'URL contient '/bankaccounts'
        cy.url().should('contain', '/bankaccounts')
    // 3. Vérifier que la liste de comptes bancaires est visible
        cy.getBySel('bankaccount-list').should('be.visible')
  });

  // ──────────────────────────────────────────────
  // SC28 — Navigation vers Notifications
  // ──────────────────────────────────────────────
  it("SC28 - devrait naviguer vers la page des notifications", () => {
    // TODO :
    // 1. Cliquer sur "Notifications" dans la sidebar
        cy.getBySel('sidenav-notifications').click()
    // 2. Vérifier que l'URL contient '/notifications'
        cy.url().should('contain', '/notifications')
    // 3. Vérifier que la liste des notifications est visible
        cy.getBySel('notifications-list').should('be.visible')
  });

  // ──────────────────────────────────────────────
  // SC29 — Onglets de transactions (Everyone, Friends, Mine)
  // ──────────────────────────────────────────────
  it("SC29 - devrait afficher les 3 onglets de transactions", () => {
    // TODO :
    // 1. Vérifier que l'onglet "Everyone" est visible
        cy.getBySel('nav-public-tab').should('be.visible')
    // 2. Vérifier que l'onglet "Friends" est visible
        cy.getBySel('nav-contacts-tab').should('be.visible')
    // 3. Vérifier que l'onglet "Mine" est visible
        cy.getBySel('nav-personal-tab').should('be.visible')
  });

  // ──────────────────────────────────────────────
  // SC30 — Clic sur chaque onglet
  // ──────────────────────────────────────────────
  it("SC30 - devrait changer le contenu en cliquant sur chaque onglet", () => {
    // TODO :
    // 1. Cliquer sur l'onglet "Friends"
        cy.getBySel('nav-contacts-tab').click()
    // 2. Vérifier que l'URL a changé (contient '/contacts')
        cy.url().should('contain', '/contacts')
    // 3. Cliquer sur l'onglet "Mine"
        cy.getBySel('nav-personal-tab').click()
    // 4. Vérifier que l'URL contient '/personal'
        cy.url().should('contain', '/personal')
    // 5. Revenir sur "Everyone"
        cy.getBySel('nav-public-tab').click()
    // 6. Vérifier que l'URL revient à la racine
        cy.url().should('contain', '/')
  });

  // ──────────────────────────────────────────────
  // SC31 — Bouton "New Transaction"
  // ──────────────────────────────────────────────
  it("SC31 - devrait naviguer vers la création de transaction via le bouton +", () => {
    // TODO :
    // 1. Cliquer sur le bouton "New" dans la barre de navigation du haut
        cy.getBySel('nav-top-new-transaction').click()
    // 2. Vérifier que l'URL contient '/transaction/new'
        cy.url().should('contain', '/transaction/new')
    // 3. Vérifier que la liste de contacts est visible
        cy.getBySel('users-list').should('be.visible')
  });
});
