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
 * - cy.intercept('METHOD', 'url', { fixture: 'file.json' })  → utiliser un fichier fixture
 * - cy.intercept('METHOD', 'url', { statusCode: 500 })  → simuler une erreur
 * - cy.intercept('METHOD', 'url', (req) => { req.reply({ delay: 3000, ... }) })  → ajouter un délai
 * ============================================================
 */

describe("Mock API — Scénarios simulés", () => {
  beforeEach(() => {
    cy.task("db:seed");
  });

  // ──────────────────────────────────────────────
  // SC100 — Mocker la liste de transactions avec des données custom
  // ──────────────────────────────────────────────
  it("SC100 - devrait afficher des transactions mockées", () => {
    // TODO :
    // 1. Intercepter les requêtes GET vers /transactions et retourner une réponse custom
    //    cy.intercept('GET', '/transactions*', {
    //      body: {
    //        results: [
    //          { id: 'mock-1', amount: 5000, description: 'Transaction mockée 1', status: 'complete' },
    //          { id: 'mock-2', amount: 3000, description: 'Transaction mockée 2', status: 'complete' },
    //        ],
    //        pageData: { page: 1, limit: 10, hasNextPages: false, totalPages: 1 }
    //      }
    //    }).as('mockTransactions')
    //
    // 2. Se connecter
    //    cy.login('Heath93', 's3cret')
    //
    // 3. Attendre l'interception
    //    cy.wait('@mockTransactions')
    //
    // 4. Vérifier que les transactions mockées s'affichent
    //    (Le nombre exact d'éléments dépend de la structure de la réponse)
  });

  // ──────────────────────────────────────────────
  // SC101 — Simuler une erreur serveur 500
  // ──────────────────────────────────────────────
  it("SC101 - devrait gérer une erreur serveur 500 sur le chargement des transactions", () => {
    // TODO :
    // 1. Intercepter et retourner une erreur 500
    //    cy.intercept('GET', '/transactions*', {
    //      statusCode: 500,
    //      body: { error: 'Internal Server Error' }
    //    }).as('serverError')
    //
    // 2. Se connecter
    //    cy.login('Heath93', 's3cret')
    //
    // 3. Attendre l'erreur
    //    cy.wait('@serverError')
    //
    // 4. Vérifier le comportement de l'UI
    //    (L'app devrait afficher un message d'erreur ou une liste vide)
  });

  // ──────────────────────────────────────────────
  // SC102 — Simuler un chargement lent
  // ──────────────────────────────────────────────
  it("SC102 - devrait afficher un loader pendant un chargement lent simulé", () => {
    // TODO :
    // 1. Intercepter avec un délai de 3 secondes
    //    cy.intercept('GET', '/transactions*', (req) => {
    //      req.reply({
    //        delay: 3000,
    //        body: {
    //          results: [],
    //          pageData: { page: 1, limit: 10, hasNextPages: false, totalPages: 1 }
    //        }
    //      })
    //    }).as('slowResponse')
    //
    // 2. Se connecter
    //    cy.login('Heath93', 's3cret')
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
  it("SC103 - devrait intercepter la création d'une transaction et vérifier les données envoyées", () => {
    // TODO :
    // 1. Se connecter
    //    cy.login('Heath93', 's3cret')
    //
    // 2. Intercepter le POST de création (sans mocker la réponse, juste observer)
    //    cy.intercept('POST', '/transactions').as('createTransaction')
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
    //      cy.log('Request body : ' + JSON.stringify(interception.request.body))
    //      cy.log('Response status : ' + interception.response.statusCode)
    //
    //      // Vérifications sur la requête envoyée
    //      expect(interception.request.body).to.have.property('amount')
    //      expect(interception.request.body).to.have.property('description', 'Test intercept POST')
    //      expect(interception.request.body).to.have.property('senderId')
    //      expect(interception.request.body).to.have.property('receiverId')
    //
    //      // Vérifications sur la réponse reçue
    //      expect(interception.response.statusCode).to.eq(200)
    //      expect(interception.response.body.transaction).to.have.property('id')
    //    })
  });

  // ──────────────────────────────────────────────
  // SC104 — Modifier la réponse API à la volée
  // ──────────────────────────────────────────────
  it("SC104 - devrait modifier le nombre de notifications retournées par l'API", () => {
    // TODO :
    // 1. Intercepter GET /notifications et retourner une liste vide
    //    cy.intercept('GET', '/notifications*', {
    //      body: { results: [] }
    //    }).as('emptyNotifications')
    //
    // 2. Se connecter
    //    cy.login('Heath93', 's3cret')
    //
    // 3. Vérifier que le compteur de notifications affiche 0
    //    cy.getBySel('nav-top-notifications-count')
    //      .should('not.exist')
    //    // OU si le badge existe mais est vide/0
  });

  // ──────────────────────────────────────────────
  // SC105 — Combiner intercept + wait pour un scénario complet
  // ──────────────────────────────────────────────
  it("SC105 - devrait intercepter login + transactions + notifications en même temps", () => {
    // TODO :
    // 1. Mettre en place TOUS les intercepts avant de se connecter
    //    cy.intercept('POST', '/login').as('loginRequest')
    //    cy.intercept('GET', '/transactions*').as('getTransactions')
    //    cy.intercept('GET', '/notifications*').as('getNotifications')
    //    cy.intercept('GET', '/bankAccounts*').as('getBankAccounts')
    //
    // 2. Se connecter via l'UI
    //    cy.visit('/signin')
    //    cy.getBySel('signin-username').type('Heath93')
    //    cy.getBySel('signin-password').type('s3cret')
    //    cy.getBySel('signin-submit').click()
    //
    // 3. Attendre TOUTES les requêtes
    //    cy.wait('@loginRequest').then((interception) => {
    //      cy.log('Login : ' + interception.response.statusCode)
    //    })
    //    cy.wait('@getTransactions').then((interception) => {
    //      cy.log('Transactions : ' + interception.response.statusCode)
    //    })
    //    cy.wait('@getNotifications').then((interception) => {
    //      cy.log('Notifications : ' + interception.response.statusCode)
    //    })
    //
    // 4. Maintenant l'UI est chargée, vérifier
    //    cy.getBySel('transaction-list').should('be.visible')
  });
});
