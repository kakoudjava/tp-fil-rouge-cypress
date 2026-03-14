/**
 * ============================================================
 * TP FIL ROUGE — MODULE 6 : Tests API — Bank Accounts
 * ============================================================
 *
 * OBJECTIF :
 * Tester le CRUD des comptes bancaires via l'API.
 * ============================================================
 */

describe("API — Bank Accounts", () => {
  const apiUrl = Cypress.env("apiUrl") || "http://localhost:3001";

  beforeEach(() => {
    // Réinitialise la base de données avant chaque test
    // → Remet les données par défaut (utilisateurs, transactions, etc.)
    // ⚠️ Cette ligne est déjà fournie — ne pas la modifier
    cy.task("db:seed");
    cy.loginByApi("Heath93");
  });

  // ──────────────────────────────────────────────
  // SC97 — GET : Liste des comptes bancaires
  // ──────────────────────────────────────────────
  it("SC97 - GET /bankAccounts - devrait retourner les comptes bancaires", () => {
    // TODO :
    // cy.request('GET', `${apiUrl}/bankAccounts`)
    //   .then((response) => {
    //     expect(response.status).to.eq(200)
    //     expect(response.body.results).to.be.an('array')
    //     expect(response.body.results.length).to.be.greaterThan(0)
    //     // Vérifier la structure d'un compte
    //     const account = response.body.results[0]
    //     expect(account).to.have.property('bankName')
    //     expect(account).to.have.property('accountNumber')
    //     expect(account).to.have.property('routingNumber')
    //     cy.log('Premier compte : ' + account.bankName)
    //   })
  });

  // ──────────────────────────────────────────────
  // SC98 — POST : Créer un compte bancaire
  // ──────────────────────────────────────────────
  it("SC98 - POST /bankAccounts - devrait créer un nouveau compte bancaire", () => {
    // TODO :
    // cy.request('POST', `${apiUrl}/bankAccounts`, {
    //   bankName: 'Banque API Test',
    //   accountNumber: '111222333444',
    //   routingNumber: '555666777',
    // })
    // .then((response) => {
    //   expect(response.status).to.eq(200)
    //   expect(response.body.account).to.have.property('id')
    //   expect(response.body.account.bankName).to.eq('Banque API Test')
    //   cy.log('Compte créé : ' + response.body.account.id)
    // })
  });

  // ──────────────────────────────────────────────
  // SC99 — DELETE : Supprimer un compte bancaire
  // ──────────────────────────────────────────────
  it("SC99 - DELETE /bankAccounts/:id - devrait supprimer un compte bancaire", () => {
    // TODO :
    // 1. D'abord, récupérer la liste pour obtenir un ID
    // cy.request('GET', `${apiUrl}/bankAccounts`)
    //   .then((response) => {
    //     const accountId = response.body.results[0].id
    //
    //     // 2. Supprimer le compte
    //     return cy.request('DELETE', `${apiUrl}/bankAccounts/${accountId}`)
    //   })
    //   .then((response) => {
    //     expect(response.status).to.eq(200)
    //   })
  });
});
