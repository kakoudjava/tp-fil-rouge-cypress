/**
 * ============================================================
 * TP FIL ROUGE — MODULE 6 : Mock API avec cy.intercept()
 * ============================================================
 *
 * OBJECTIF :
 * Simuler des réponses API pour tester l'UI dans des conditions contrôlées.
 * Tu vas "mocker" (simuler) les réponses du serveur sans que l'API réelle
 * soit appelée.
 *
 * CONCEPTS PRATIQUES :
 * - cy.intercept('METHOD', 'url', response)  → intercepter et remplacer la réponse
 * - cy.intercept('METHOD', 'url', { statusCode: 500 })  → simuler une erreur
 * - cy.intercept('METHOD', 'url', (req) => { req.reply({ delay: 3000, ... }) })  → ajouter un délai
 *
 * ⚠️ ASTUCES IMPORTANTES :
 * - Utiliser le préfixe '**/' dans le pattern URL pour matcher toute URL contenant ce chemin
 *   Exemple : '**/transactions/public*' au lieu de '/transactions/public*'
 * - La page d'accueil charge /transactions/public (pas /transactions)
 * - cy.login() se connecte via l'UI (visite /signin et tape les identifiants)
 * - cy.loginByApi() se connecte via une requête HTTP (sans UI)
 * - Après cy.login() ou cy.loginByApi(), utiliser cy.visit('/') pour charger la page d'accueil
 * ============================================================
 */

describe("Mock API — Scénarios simulés", () => {
  beforeEach(() => {
    // Réinitialise la base de données avant chaque test
    // → Remet les données par défaut (utilisateurs, transactions, etc.)
    // ⚠️ Cette ligne est déjà fournie — ne pas la modifier
    cy.task("db:seed");
  });

  // ──────────────────────────────────────────────
  // SC100 — Mocker la liste de transactions avec des données custom
  // ──────────────────────────────────────────────
  it("SC100 - devrait afficher des transactions mockées", () => {
    // TODO :
    // 1. Intercepter les requêtes GET vers /transactions/public et retourner une réponse custom
    //    ⚠️ La réponse mockée doit contenir TOUS les champs attendus par l'UI :
    //    id, uuid, source, amount, description, receiverName, senderName,
    //    receiverId, senderId, balanceAtCompletion, status, createdAt,
    //    modifiedAt, likes (tableau), comments (tableau)
    //
    //    cy.intercept('GET', '**/transactions/public*', {
    //      body: {
    //        results: [
    //          {
    //            id: 'mock-1', uuid: 'mock-1', source: 'mock',
    //            amount: 5000, description: 'Transaction mockée 1',
    //            receiverName: 'Mock User', senderName: 'Mock Sender',
    //            receiverId: 'mock-r', senderId: 'mock-s',
    //            balanceAtCompletion: 10000, status: 'complete',
    //            requestStatus: '', requestResolvedAt: '',
    //            createdAt: new Date().toISOString(),
    //            modifiedAt: new Date().toISOString(),
    //            likes: [], comments: []
    //          }
    //        ],
    //        pageData: { page: 1, limit: 10, hasNextPages: false, totalPages: 1 }
    //      }
    //    }).as('mockTransactions')
    //
    // 2. Se connecter et charger la page d'accueil
    //    cy.login('Heath93', 's3cret')
    //    cy.visit('/')
    //
    // 3. Attendre l'interception
    //    cy.wait('@mockTransactions')
    //
    // 4. Vérifier que les transactions mockées s'affichent
    //    cy.contains('Transaction mockée 1').should('be.visible')
  });

  // ──────────────────────────────────────────────
  // SC101 — Simuler une erreur serveur 500
  // ──────────────────────────────────────────────
  it("SC101 - devrait gérer une erreur serveur 500 sur le chargement des transactions", () => {
    // TODO :
    // 1. Intercepter et retourner une erreur 500
    //    cy.intercept('GET', '**/transactions/public*', {
    //      statusCode: 500,
    //      body: { error: 'Internal Server Error' }
    //    }).as('serverError')
    //
    // 2. Se connecter et charger la page
    //    cy.login('Heath93', 's3cret')
    //    cy.visit('/')
    //
    // 3. Attendre l'erreur
    //    cy.wait('@serverError')
    //
    // 4. Vérifier que l'app ne crash pas
    //    cy.log('Erreur 500 simulée — L\'app gère l\'erreur')
  });

  // ──────────────────────────────────────────────
  // SC102 — Simuler un chargement lent
  // ──────────────────────────────────────────────
  it("SC102 - devrait afficher un loader pendant un chargement lent simulé", () => {
    // TODO :
    // 1. Intercepter avec un délai de 3 secondes
    //    cy.intercept('GET', '**/transactions/public*', (req) => {
    //      req.reply({
    //        delay: 3000,
    //        body: {
    //          results: [],
    //          pageData: { page: 1, limit: 10, hasNextPages: false, totalPages: 1 }
    //        }
    //      })
    //    }).as('slowResponse')
    //
    // 2. Se connecter et charger la page
    //    cy.login('Heath93', 's3cret')
    //    cy.visit('/')
    //
    // 3. Pendant le chargement, vérifier que le skeleton/loader s'affiche
    //    cy.getBySel('list-skeleton').should('exist')
    //
    // 4. Attendre la fin du chargement
    //    cy.wait('@slowResponse')
    //
    // 5. Vérifier que le loader a disparu
    //    cy.getBySel('list-skeleton').should('not.exist')
  });

  // ──────────────────────────────────────────────
  // SC103 — Intercepter un POST et vérifier le body envoyé
  // ──────────────────────────────────────────────
  it("SC103 - devrait intercepter et vérifier les données d'un paiement", () => {
    // TODO :
    // 1. Se connecter
    //    cy.login('Heath93', 's3cret')
    //
    // 2. Intercepter le POST de création (sans mocker la réponse, juste observer)
    //    cy.intercept('POST', '**/transactions').as('createTransaction')
    //
    // 3. Créer un paiement via l'UI
    //    cy.getBySel('nav-top-new-transaction').click()
    //    cy.getBySelLike('user-list-item').first().click()
    //    cy.get('#amount').type('42')
    //    cy.get('#transaction-create-description-input').type('Test intercept POST')
    //    cy.getBySel('transaction-create-submit-payment').click()
    //
    // 4. Attendre et vérifier le body de la requête
    //    cy.wait('@createTransaction').then((interception) => {
    //      // Ce que le navigateur a envoyé
    //      expect(interception.request.body).to.have.property('amount')
    //      expect(interception.request.body).to.have.property('description')
    //      expect(interception.request.body.description).to.eq('Test intercept POST')
    //      // Ce que le serveur a répondu
    //      expect(interception.response.statusCode).to.eq(200)
    //    })
  });

  // ──────────────────────────────────────────────
  // SC104 — Mocker les notifications (liste vide)
  // ──────────────────────────────────────────────
  it("SC104 - devrait mocker les notifications avec une liste vide", () => {
    // TODO :
    // 1. Intercepter GET /notifications et retourner une liste vide
    //    cy.intercept('GET', '**/notifications*', {
    //      body: { results: [] }
    //    }).as('emptyNotifications')
    //
    // 2. Se connecter via l'API (sans UI) et charger la page
    //    cy.loginByApi('Heath93')
    //    cy.visit('/')
    //
    // 3. Vérifier que l'intercept a été déclenché
    //    cy.wait('@emptyNotifications')
    //    cy.log('Notifications mockées avec une liste vide')
  });

  // ──────────────────────────────────────────────
  // SC105 — Combiner intercept + wait pour un scénario complet
  // ──────────────────────────────────────────────
  it("SC105 - devrait intercepter login + transactions + notifications en même temps", () => {
    // TODO :
    // 1. Mettre en place TOUS les intercepts avant de se connecter
    //    cy.intercept('POST', '**/login').as('loginRequest')
    //    cy.intercept('GET', '**/transactions/public*').as('getTransactions')
    //    cy.intercept('GET', '**/notifications*').as('getNotifications')
    //
    // 2. Se connecter via l'UI (pour déclencher POST /login)
    //    cy.visit('/signin')
    //    cy.getBySel('signin-username').type('Heath93')
    //    cy.getBySel('signin-password').type('s3cret')
    //    cy.getBySel('signin-submit').click()
    //
    // 3. Attendre TOUTES les requêtes et vérifier chacune
    //    cy.wait('@loginRequest').then((interception) => {
    //      cy.log('Login : ' + interception.response.statusCode)
    //      expect(interception.response.statusCode).to.eq(200)
    //    })
    //    cy.wait('@getTransactions').then((interception) => {
    //      cy.log('Transactions : ' + interception.response.statusCode)
    //    })
    //    cy.wait('@getNotifications').then((interception) => {
    //      cy.log('Notifications : ' + interception.response.statusCode)
    //    })
  });
});
