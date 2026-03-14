/**
 * ============================================================
 * TP FIL ROUGE — MODULE 5 : Debug avec Cypress
 * ============================================================
 *
 * OBJECTIF :
 * Pratiquer les outils de debug de Cypress :
 * - cy.log()          → afficher un message dans le runner
 * - cy.screenshot()   → prendre une capture d'écran
 * - cy.pause()        → mettre en pause l'exécution
 * - .debug()          → ouvrir le debugger du navigateur
 *
 * CONSIGNES :
 * - Lance ces tests en mode INTERACTIF (cypress open, pas cypress run)
 * - Observe le comportement de chaque commande de debug dans le runner
 * ============================================================
 */

describe("Debug avec Cypress", () => {
  beforeEach(() => {
    // Réinitialise la base de données avant chaque test
    // → Remet les données par défaut (utilisateurs, transactions, etc.)
    // ⚠️ Cette ligne est déjà fournie — ne pas la modifier
    cy.task("db:seed");
    cy.login("Heath93", "s3cret");
  });

  // ──────────────────────────────────────────────
  // SC81 — Utiliser cy.log() pour tracer un parcours
  // ──────────────────────────────────────────────
  it("SC81 - devrait tracer chaque étape d'un paiement avec cy.log()", () => {
    // TODO :
    // 1. Loguer l'étape 1
    //    cy.log('📍 ÉTAPE 1 : Navigation vers New Transaction')
    //    cy.getBySel('nav-top-new-transaction').click()
    //
    // 2. Loguer l'étape 2
    //    cy.log('📍 ÉTAPE 2 : Sélection du contact')
    //    cy.getBySelLike('user-list-item').first().click()
    //
    // 3. Loguer l'étape 3
    //    cy.log('📍 ÉTAPE 3 : Saisie du montant et description')
    //    cy.get('#amount').type('25')
    //    cy.get('#transaction-create-description-input').type('Test log')
    //
    // 4. Loguer l'étape 4
    //    cy.log('📍 ÉTAPE 4 : Soumission du paiement')
    //    cy.getBySel('transaction-create-submit-payment').click()
    //
    // 5. Loguer le résultat
    //    cy.log('✅ Paiement effectué avec succès')
  });

  // ──────────────────────────────────────────────
  // SC82 — Utiliser cy.screenshot() pour capturer des preuves
  // ──────────────────────────────────────────────
  it("SC82 - devrait prendre des screenshots à chaque étape", () => {
    // TODO :
    // 1. Screenshot du dashboard après login
    //    cy.screenshot('debug/01-dashboard-apres-login')
    //
    // 2. Naviguer vers New Transaction
    //    cy.getBySel('nav-top-new-transaction').click()
    //    cy.screenshot('debug/02-page-new-transaction')
    //
    // 3. Sélectionner un contact
    //    cy.getBySelLike('user-list-item').first().click()
    //    cy.screenshot('debug/03-contact-selectionne')
    //
    // 4. Remplir le formulaire
    //    cy.get('#amount').type('50')
    //    cy.get('#transaction-create-description-input').type('Test screenshot')
    //    cy.screenshot('debug/04-formulaire-rempli')
    //
    // 5. Soumettre et capturer le résultat
    //    cy.getBySel('transaction-create-submit-payment').click()
    //    cy.screenshot('debug/05-paiement-succes')
    //
    // Les screenshots sont sauvegardés dans cypress/screenshots/
    // Va les vérifier après l'exécution du test !
  });

  // ──────────────────────────────────────────────
  // SC83 — Utiliser cy.pause() pour explorer manuellement
  // ──────────────────────────────────────────────
  it("SC83 - devrait mettre en pause pour explorer le DOM manuellement", () => {
    // TODO :
    // 1. Naviguer vers la page de création de transaction
    //    cy.getBySel('nav-top-new-transaction').click()
    //
    // 2. PAUSE : utilise la pause pour explorer le DOM avec l'inspecteur
    //    cy.pause()
    //    // Quand le test est en pause :
    //    // - Ouvre les DevTools du navigateur (F12)
    //    // - Utilise l'inspecteur pour trouver les éléments
    //    // - Clique "Resume" dans le runner Cypress pour continuer
    //
    // 3. Sélectionner un contact et pause à nouveau
    //    cy.getBySelLike('user-list-item').first().click()
    //    cy.pause()
    //    // Explore le formulaire de transaction
    //
    // 4. Continuer le test
    //    cy.get('#amount').type('10')
  });

  // ──────────────────────────────────────────────
  // SC84 — Utiliser .debug() sur un élément
  // ──────────────────────────────────────────────
  it("SC84 - devrait utiliser .debug() pour inspecter un élément dans la console", () => {
    // TODO :
    // 1. Ouvrir les DevTools (F12) avant de lancer ce test
    // 2. Utiliser .debug() sur le solde pour l'inspecter dans la console
    //    cy.getBySel('sidenav-user-balance').debug()
    //    // → Regarde dans la console : tu verras l'élément DOM
    //
    // 3. Utiliser .debug() sur la liste de transactions
    //    cy.getBySelLike('transaction-item').first().debug()
    //
    // 4. Utiliser .debug() avec .then() pour inspecter une valeur
    //    cy.getBySel('sidenav-user-balance')
    //      .invoke('text')
    //      .then((text) => {
    //        debugger  // Le navigateur s'arrête ici si les DevTools sont ouvertes
    //        cy.log('Solde : ' + text)
    //      })
  });

  // ──────────────────────────────────────────────
  // SC85 — Mode d'exécution headless
  // ──────────────────────────────────────────────
  it("SC85 - ce test est conçu pour le mode headless (cypress run)", () => {
    // TODO :
    // Ce test utilise uniquement des assertions (pas de pause/debug)
    // Lance-le avec : npx cypress run --spec "cypress/tests/fil-rouge/module-5/debug.cy.js"
    //
    // 1. Vérifier la connexion
    //    cy.getBySel('sidenav-user-full-name').should('be.visible')
    // 2. Vérifier la liste
    //    cy.getBySelLike('transaction-item').should('have.length.greaterThan', 0)
    // 3. Screenshot automatique en mode headless
    //    cy.screenshot('headless/dashboard-verification')
    //
    // Après l'exécution, vérifie :
    // - Les screenshots dans cypress/screenshots/
    // - La vidéo dans cypress/videos/ (si activé)
  });
});
