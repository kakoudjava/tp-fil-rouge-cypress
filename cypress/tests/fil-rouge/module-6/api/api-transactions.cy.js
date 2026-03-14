/**
 * ============================================================
 * TP FIL ROUGE — MODULE 6 : Tests API — Transactions
 * ============================================================
 *
 * OBJECTIF :
 * Tester les endpoints API de l'application directement avec cy.request()
 * Sans passer par l'interface utilisateur.
 *
 * CONCEPTS PRATIQUES :
 * - cy.request('GET', url)           → requête GET
 * - cy.request('POST', url, body)    → requête POST
 * - cy.request('PATCH', url, body)   → requête PATCH
 * - .then((response) => { ... })     → accéder à la réponse
 * - expect(response.status).to.eq(200)
 * - expect(response.body).to.have.property('key')
 *
 * API URL : http://localhost:3001
 * (accessible via Cypress.env('apiUrl'))
 * ============================================================
 */

describe("API — Transactions", () => {
  const apiUrl = Cypress.env("apiUrl") || "http://localhost:3001";

  beforeEach(() => {
    // Réinitialise la base de données avant chaque test
    // → Remet les données par défaut (utilisateurs, transactions, etc.)
    // ⚠️ Cette ligne est déjà fournie — ne pas la modifier
    cy.task("db:seed");
    // Se connecter via API pour obtenir un cookie de session
    cy.loginByApi("Heath93");
  });

  // ──────────────────────────────────────────────
  // SC86 — GET : Récupérer les transactions publiques
  // ──────────────────────────────────────────────
  it("SC86 - GET /transactions/public - devrait retourner les transactions publiques", () => {
    // TODO :
    // cy.request('GET', `${apiUrl}/transactions/public`)
    //   .then((response) => {
    //     // Vérifier le status code
    //     expect(response.status).to.eq(200)
    //     // Vérifier que le body contient un tableau de résultats
    //     expect(response.body).to.have.property('results')
    //     expect(response.body.results).to.be.an('array')
    //     // Vérifier qu'il y a des transactions
    //     expect(response.body.results.length).to.be.greaterThan(0)
    //     // Loguer le nombre
    //     cy.log(`Nombre de transactions publiques : ${response.body.results.length}`)
    //   })
  });

  // ──────────────────────────────────────────────
  // SC87 — GET : Récupérer les transactions de l'utilisateur
  // ──────────────────────────────────────────────
  it("SC87 - GET /transactions - devrait retourner les transactions de l'utilisateur connecté", () => {
    // TODO :
    // cy.request('GET', `${apiUrl}/transactions`)
    //   .then((response) => {
    //     expect(response.status).to.eq(200)
    //     expect(response.body).to.have.property('results')
    //     // Vérifier que chaque transaction a les bonnes propriétés
    //     if (response.body.results.length > 0) {
    //       const firstTransaction = response.body.results[0]
    //       expect(firstTransaction).to.have.property('id')
    //       expect(firstTransaction).to.have.property('amount')
    //       expect(firstTransaction).to.have.property('description')
    //       expect(firstTransaction).to.have.property('senderId')
    //       expect(firstTransaction).to.have.property('receiverId')
    //       cy.log('Première transaction : ' + JSON.stringify(firstTransaction))
    //     }
    //   })
  });

  // ──────────────────────────────────────────────
  // SC88 — GET : Récupérer une transaction par ID
  // ──────────────────────────────────────────────
  it("SC88 - GET /transactions/:id - devrait retourner une transaction spécifique", () => {
    // TODO :
    // 1. D'abord, récupérer la liste pour obtenir un ID
    // cy.request('GET', `${apiUrl}/transactions`)
    //   .then((response) => {
    //     const transactionId = response.body.results[0].id
    //     cy.log('Transaction ID : ' + transactionId)
    //
    //     // 2. Puis récupérer cette transaction spécifique
    //     return cy.request('GET', `${apiUrl}/transactions/${transactionId}`)
    //   })
    //   .then((response) => {
    //     expect(response.status).to.eq(200)
    //     expect(response.body.transaction).to.have.property('id')
    //     expect(response.body.transaction).to.have.property('amount')
    //   })
  });

  // ──────────────────────────────────────────────
  // SC89 — POST : Créer une nouvelle transaction
  // ──────────────────────────────────────────────
  it("SC89 - POST /transactions - devrait créer une nouvelle transaction", () => {
    // TODO :
    // 1. D'abord, récupérer les utilisateurs pour avoir les IDs
    // cy.request('GET', `${apiUrl}/users`)
    //   .then((response) => {
    //     const sender = response.body.results.find(u => u.username === 'Heath93')
    //     const receiver = response.body.results.find(u => u.username === 'Arvilla_Hegmann')
    //
    //     // 2. Créer la transaction
    //     return cy.request('POST', `${apiUrl}/transactions`, {
    //       type: 'payment',
    //       source: sender.id,
    //       senderId: sender.id,
    //       receiverId: receiver.id,
    //       amount: 2500,  // en centimes = 25.00$
    //       description: 'Test API - Paiement automatisé',
    //       transactionType: 'payment',
    //     })
    //   })
    //   .then((response) => {
    //     expect(response.status).to.eq(200)
    //     expect(response.body.transaction).to.have.property('id')
    //     expect(response.body.transaction.description).to.eq('Test API - Paiement automatisé')
    //     cy.log('Transaction créée : ' + response.body.transaction.id)
    //   })
  });

  // ──────────────────────────────────────────────
  // SC90 — PATCH : Mettre à jour une transaction
  // ──────────────────────────────────────────────
  it("SC90 - PATCH /transactions/:id - devrait mettre à jour le statut d'une transaction", () => {
    // TODO :
    // 1. Récupérer une transaction existante avec le statut "pending"
    // 2. Mettre à jour son statut
    // cy.request('PATCH', `${apiUrl}/transactions/${transactionId}`, {
    //   requestStatus: 'accepted'
    // })
    // 3. Vérifier la réponse
  });

  // ──────────────────────────────────────────────
  // SC91 — GET : Récupérer les transactions entre contacts
  // ──────────────────────────────────────────────
  it("SC91 - GET /transactions/contacts - devrait retourner les transactions entre contacts", () => {
    // TODO :
    // cy.request('GET', `${apiUrl}/transactions/contacts`)
    //   .then((response) => {
    //     expect(response.status).to.eq(200)
    //     expect(response.body).to.have.property('results')
    //     cy.log(`Transactions entre contacts : ${response.body.results.length}`)
    //   })
  });
});
