/**
 * ============================================================
 * TP FIL ROUGE — MODULE 4 : Créer un paiement (Payment)
 * ============================================================
 *
 * OBJECTIF :
 * Tester le parcours complet de création d'un paiement.
 * Pratiquer les assertions avancées (should, expect, and).
 *
 * CONCEPTS PRATIQUES :
 * - Assertions multiples : .should('be.visible').and('contain', 'texte')
 * - Assertions avec expect : .then((val) => { expect(val)... })
 * - .should('have.length.greaterThan', 0)
 * - .should('have.attr', 'attribut', 'valeur')
 *
 * RAPPEL DES SELECTEURS :
 * - cy.getBySel('nav-top-new-transaction')   → bouton "New"
 * - cy.getBySel('users-list')                → liste des contacts
 * - cy.getBySelLike('user-list-item')        → chaque contact
 * - cy.get('#amount')                        → champ montant
 * - cy.get('#transaction-create-description-input') → champ description
 * - cy.getBySel('transaction-create-submit-payment') → bouton "Pay"
 * - cy.getBySel('transaction-create-submit-request') → bouton "Request"
 * ============================================================
 */

describe("Créer un paiement", () => {
  beforeEach(() => {
    // Réinitialise la base de données avant chaque test
    // → Remet les données par défaut (utilisateurs, transactions, etc.)
    // ⚠️ Cette ligne est déjà fournie — ne pas la modifier
    cy.task("db:seed");
    cy.login("Heath93", "s3cret");
    // Naviguer vers la page de nouvelle transaction
    cy.getBySel("nav-top-new-transaction").click();
  });

  // ──────────────────────────────────────────────
  // SC45 — Affichage de la liste des contacts
  // ──────────────────────────────────────────────
  it("SC45 - devrait afficher la liste des contacts disponibles", () => {
    // TODO :
    // 1. Vérifier que la liste de contacts est visible
    //    cy.getBySel('users-list').should('be.visible')
    // 2. Vérifier qu'il y a au moins 1 contact
    //    cy.getBySelLike('user-list-item')
    //      .should('have.length.greaterThan', 0)
    // 3. Loguer le nombre de contacts
    //    cy.getBySelLike('user-list-item').then(($items) => {
    //      cy.log(`Nombre de contacts : ${$items.length}`)
    //    })
  });

  // ──────────────────────────────────────────────
  // SC46 — Rechercher un contact
  // ──────────────────────────────────────────────
  it("SC46 - devrait filtrer les contacts en tapant dans le champ de recherche", () => {
    // TODO :
    // 1. Taper "Arvilla" dans le champ de recherche
    //    cy.get('[data-test="user-list-search-input"]').type('Arvilla')
    //    (ou cy.get('input[placeholder*="Search"]').type('Arvilla'))
    // 2. Vérifier que la liste filtrée contient le bon contact
    //    cy.getBySelLike('user-list-item')
    //      .should('have.length', 1)
    //      .and('contain', 'Arvilla')
  });

  // ──────────────────────────────────────────────
  // SC47 — Paiement valide complet
  // ──────────────────────────────────────────────
  it("SC47 - devrait effectuer un paiement de 50$ à Arvilla_Hegmann", () => {
    // TODO :
    // 1. Sélectionner le contact "Arvilla"
    //    cy.getBySelLike('user-list-item').contains('Arvilla').click()
    // 2. Remplir le montant : 50
    //    cy.get('#amount').type('50')
    // 3. Remplir la description : "Remboursement restaurant"
    //    cy.get('#transaction-create-description-input').type('Remboursement restaurant')
    // 4. Cliquer sur le bouton "Pay"
    //    cy.getBySel('transaction-create-submit-payment').click()
    // 5. Vérifier le message de succès avec des assertions MULTIPLES
    //    cy.get('[data-test="alert-bar-success"]')
    //      .should('be.visible')
    //      .and('contain', 'Paid')
  });

  // ──────────────────────────────────────────────
  // SC48 — Vérifier que le solde diminue après un paiement
  // ──────────────────────────────────────────────
  it("SC48 - devrait diminuer le solde après un paiement", () => {
    // TODO :
    // C'est un scénario AVANCÉ qui utilise .then() pour capturer des valeurs
    //
    // 1. Capturer le solde AVANT le paiement
    //    let soldeAvant
    //    cy.getBySel('sidenav-user-balance')
    //      .invoke('text')
    //      .then((text) => {
    //        soldeAvant = parseFloat(text.replace(/[$,]/g, ''))
    //        cy.log('Solde AVANT : ' + soldeAvant)
    //      })
    //
    // 2. Effectuer un paiement de 10$
    //    cy.getBySelLike('user-list-item').first().click()
    //    cy.get('#amount').type('10')
    //    cy.get('#transaction-create-description-input').type('Test solde')
    //    cy.getBySel('transaction-create-submit-payment').click()
    //
    // 3. Revenir au dashboard
    //    cy.getBySel('new-transaction-return-to-transactions').click()
    //
    // 4. Capturer le solde APRÈS et comparer
    //    cy.getBySel('sidenav-user-balance')
    //      .invoke('text')
    //      .then((text) => {
    //        const soldeApres = parseFloat(text.replace(/[$,]/g, ''))
    //        cy.log('Solde APRÈS : ' + soldeApres)
    //        expect(soldeApres).to.be.lessThan(soldeAvant)
    //      })
  });

  // ──────────────────────────────────────────────
  // SC49 — Erreur si montant est 0 ou vide
  // ──────────────────────────────────────────────
  it("SC49 - devrait désactiver le bouton Pay si le montant est vide", () => {
    // TODO :
    // 1. Sélectionner un contact
    //    cy.getBySelLike('user-list-item').first().click()
    // 2. Ne pas remplir le montant
    // 3. Vérifier que le bouton Pay est disabled
    //    cy.getBySel('transaction-create-submit-payment').should('be.disabled')
    // 4. Taper un montant
    //    cy.get('#amount').type('25')
    // 5. Taper une description
    //    cy.get('#transaction-create-description-input').type('Test')
    // 6. Vérifier que le bouton n'est plus disabled
    //    cy.getBySel('transaction-create-submit-payment').should('not.be.disabled')
  });

  // ──────────────────────────────────────────────
  // SC50 — Erreur si description vide
  // ──────────────────────────────────────────────
  it("SC50 - devrait afficher une erreur si la description est vide", () => {
    // TODO :
    // 1. Sélectionner un contact
    // 2. Remplir le montant
    // 3. Cliquer sur la description puis cliquer ailleurs (sans rien taper)
    //    cy.get('#transaction-create-description-input').click().blur()
    // 4. Vérifier le message d'erreur
    //    cy.get('#transaction-create-description-input-helper-text')
    //      .should('be.visible')
    //      .and('contain', 'Please enter a note')
    // 5. Vérifier que le bouton Pay est disabled
  });

  // ──────────────────────────────────────────────
  // SC51 — Effectuer un autre paiement après le premier
  // ──────────────────────────────────────────────
  it("SC51 - devrait pouvoir créer un autre paiement via le lien 'Create Another Transaction'", () => {
    // TODO :
    // 1. Effectuer un premier paiement complet (contact + montant + description + Pay)
    // 2. Après le succès, cliquer sur "Create Another Transaction"
    //    cy.getBySel('new-transaction-create-another-transaction').click()
    // 3. Vérifier qu'on revient sur la liste de contacts
    //    cy.getBySel('users-list').should('be.visible')
    // 4. Effectuer un second paiement
    // 5. Vérifier le succès
  });

  // ──────────────────────────────────────────────
  // SC52 — Retour aux transactions
  // ──────────────────────────────────────────────
  it("SC52 - devrait retourner à la liste des transactions après un paiement", () => {
    // TODO :
    // 1. Effectuer un paiement
    // 2. Cliquer sur "Return To Transactions"
    //    cy.getBySel('new-transaction-return-to-transactions').click()
    // 3. Vérifier qu'on est de retour sur le dashboard
    //    cy.getBySel('transaction-list').should('be.visible')
  });
});
