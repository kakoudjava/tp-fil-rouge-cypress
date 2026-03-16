/**
 * ============================================================
 * TP FIL ROUGE — MODULE 5 : Timeouts et Temps d'attente
 * ============================================================
 *
 * OBJECTIF :
 * Comprendre et utiliser les mécanismes d'attente dans Cypress :
 * - Timeout par défaut vs timeout personnalisé
 * - cy.wait() avec des alias d'intercept
 * - cy.intercept() pour observer les requêtes réseau
 *
 * CONCEPTS PRATIQUES :
 * - cy.intercept('GET', '/url*').as('alias')  → intercepter une requête
 * - cy.wait('@alias')                         → attendre que la requête soit faite
 * - { timeout: 10000 }                        → timeout personnalisé sur un get
 * ============================================================
 */

describe("Gestion des temps d'attente", () => {
  beforeEach(() => {
    // Réinitialise la base de données avant chaque test
    // → Remet les données par défaut (utilisateurs, transactions, etc.)
    // ⚠️ Cette ligne est déjà fournie — ne pas la modifier
    cy.task("db:seed");
  });

  // ──────────────────────────────────────────────
  // SC68 — Timeout personnalisé sur un élément
  // ──────────────────────────────────────────────
  it("SC68 - devrait attendre le chargement de la liste avec un timeout personnalisé", () => {
    // TODO :
    // 1. Se connecter
    cy.login("Heath93", "s3cret");
    // 2. Attendre que la liste de transactions soit visible avec un timeout de 10 secondes
    //    Par défaut, Cypress attend 4 secondes. Ici on étend à 10 secondes.
    //    cy.getBySel('transaction-list', { timeout: 10000 })
    //      .should('be.visible')
    // 3. Loguer un message de succès
    //    cy.log('La liste a chargé dans les 10 secondes')
  });

  // ──────────────────────────────────────────────
  // SC69 — Intercepter une requête GET et attendre sa réponse
  // ──────────────────────────────────────────────
  it("SC69 - devrait intercepter le chargement des transactions et vérifier la réponse", () => {
    // TODO :
    // ⚠️ cy.intercept() doit être appelé AVANT que la requête ne parte.
    // ⚠️ Utiliser le pattern '**/' devant l'URL pour matcher toute URL contenant ce chemin.
    // ⚠️ La page d'accueil charge /transactions/public (pas /transactions)
    //
    // 1. Intercepter la requête GET vers /transactions/public
    //    cy.intercept('GET', '**/transactions/public*').as('getTransactions')
    // 2. Se connecter via l'UI (visite la page signin, tape les identifiants)
    //    cy.visit('/signin')
    //    cy.getBySel('signin-username').type('Heath93')
    //    cy.getBySel('signin-password').type('s3cret')
    //    cy.getBySel('signin-submit').click()
    // 3. Attendre que la requête soit terminée et vérifier la réponse
    //    cy.wait('@getTransactions').then((interception) => {
    //      expect(interception.response.statusCode).to.eq(200)
    //      cy.log('Transactions reçues : ' + interception.response.body.results.length)
    //    })
    // 4. Vérifier que la liste s'affiche après le chargement
    //    cy.getBySel('transaction-list').should('be.visible')
  });

  // ──────────────────────────────────────────────
  // SC70 — Intercepter une requête POST (création de transaction)
  // ──────────────────────────────────────────────
  it("SC70 - devrait intercepter la création d'une transaction et vérifier le body envoyé", () => {
    // TODO :
    // 1. Intercepter la requête POST vers /transactions
    //    cy.intercept('POST', '/transactions').as('createTransaction')
    // 2. Se connecter
    //    cy.login('Heath93', 's3cret')
    // 3. Créer un paiement via l'UI
    //    cy.getBySel('nav-top-new-transaction').click()
    //    cy.getBySelLike('user-list-item').first().click()
    //    cy.get('#amount').type('35')
    //    cy.get('#transaction-create-description-input').type('Test intercept')
    //    cy.getBySel('transaction-create-submit-payment').click()
    // 4. Attendre l'interception et vérifier le body de la requête
    //    cy.wait('@createTransaction').then((interception) => {
    //      expect(interception.request.body).to.have.property('amount')
    //      expect(interception.request.body).to.have.property('description')
    //      expect(interception.request.body.description).to.eq('Test intercept')
    //      expect(interception.response.statusCode).to.eq(200)
    //      cy.log('Transaction créée avec succès !')
    //    })
  });

  // ──────────────────────────────────────────────
  // SC71 — Intercepter la requête de login
  // ──────────────────────────────────────────────
  it("SC71 - devrait intercepter le login et vérifier la réponse avec le user ID", () => {
    // TODO :
    // 1. Intercepter la requête POST /login
    //    cy.intercept('POST', '/login').as('loginRequest')
    // 2. Visiter /signin et remplir le formulaire
    //    cy.visit('/signin')
    //    cy.getBySel('signin-username').type('Heath93')
    //    cy.getBySel('signin-password').type('s3cret')
    //    cy.getBySel('signin-submit').click()
    // 3. Attendre et vérifier la réponse
    //    cy.wait('@loginRequest').then((interception) => {
    //      // Vérifier que la requête a envoyé le bon username
    //      expect(interception.request.body.username).to.eq('Heath93')
    //      // Vérifier que la réponse contient un user
    //      expect(interception.response.body.user).to.have.property('id')
    //      cy.log('User ID : ' + interception.response.body.user.id)
    //    })
  });

  // ──────────────────────────────────────────────
  // SC72 — Intercepter les notifications
  // ──────────────────────────────────────────────
  it("SC72 - devrait intercepter le chargement des notifications", () => {
    // TODO :
    // 1. Intercepter GET /notifications
    //    cy.intercept('GET', '/notifications*').as('getNotifications')
    // 2. Se connecter
    //    cy.login('Heath93', 's3cret')
    // 3. Attendre le chargement des notifications
    //    cy.wait('@getNotifications')
    // 4. Vérifier le status
    //    cy.wait('@getNotifications').then((interception) => {
    //      expect(interception.response.statusCode).to.eq(200)
    //    })
  });

  // ──────────────────────────────────────────────
  // SC73 — Attendre le skeleton loader
  // ──────────────────────────────────────────────
  it("SC73 - devrait vérifier que le skeleton loader disparaît après chargement", () => {
    // TODO :
    // 1. Se connecter
    cy.login("Heath93", "s3cret");
    // 2. Vérifier que le skeleton (loader) disparaît
    //    Le skeleton est affiché pendant le chargement puis disparaît
    //    cy.getBySel('list-skeleton').should('not.exist')
    // 3. Vérifier que le contenu est maintenant visible
    //    cy.getBySelLike('transaction-item').should('have.length.greaterThan', 0)
  });
});
