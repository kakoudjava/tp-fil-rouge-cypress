/**
 * ============================================================
 * TP FIL ROUGE — MODULE 3 : Liste des transactions
 * ============================================================
 *
 * OBJECTIF :
 * Tester l'affichage et l'interaction avec la liste de transactions.
 *
 * CONCEPTS PRATIQUES :
 * - .children()          → compter les enfants d'une liste
 * - .first() / .last()   → premier/dernier élément
 * - .each()              → itérer sur chaque élément
 * - .find()              → chercher dans un élément
 * - .invoke('text')      → extraire du texte
 * - .parent()            → remonter au parent
 *
 * RAPPEL DES SELECTEURS :
 * - cy.getBySelLike('transaction-item')    → chaque transaction dans la liste
 * - cy.getBySel('transaction-list')        → la liste complète
 * - cy.getBySelLike('transaction-amount')  → montant d'une transaction
 * ============================================================
 */

describe("Liste des transactions", () => {
  beforeEach(() => {
    // Réinitialise la base de données avant chaque test
    // → Remet les données par défaut (utilisateurs, transactions, etc.)
    // ⚠️ Cette ligne est déjà fournie — ne pas la modifier
    cy.task("db:seed");
    cy.login("Heath93", "s3cret");
  });

  // ──────────────────────────────────────────────
  // SC32 — Affichage de la liste
  // ──────────────────────────────────────────────
  it("SC32 - devrait afficher la liste des transactions sur le dashboard", () => {
    // TODO :
    // 1. Vérifier que la liste de transactions est visible
    //    cy.getBySel('transaction-list').should('be.visible')
    // 2. Vérifier qu'elle contient au moins 1 élément
    //    cy.getBySelLike('transaction-item').should('have.length.greaterThan', 0)
  });

  // ──────────────────────────────────────────────
  // SC33 — Compter les transactions
  // ──────────────────────────────────────────────
  it("SC33 - devrait afficher plusieurs transactions dans la liste", () => {
    // TODO :
    // 1. Récupérer tous les éléments de transaction
    //    cy.getBySelLike('transaction-item')
    // 2. Utiliser .its('length') pour obtenir le nombre
    // 3. Loguer le nombre avec cy.log()
    // 4. Vérifier qu'il y a plus de 1 transaction
    //
    // ASTUCE avec .then() :
    //    cy.getBySelLike('transaction-item').then(($items) => {
    //      cy.log(`Nombre de transactions : ${$items.length}`)
    //      expect($items.length).to.be.greaterThan(1)
    //    })
  });

  // ──────────────────────────────────────────────
  // SC34 — Vérifier le contenu de chaque transaction
  // ──────────────────────────────────────────────
  it("SC34 - devrait afficher un montant pour chaque transaction de la liste", () => {
    // TODO :
    // 1. Récupérer les 5 premières transactions
    //    cy.getBySelLike('transaction-item').should('have.length.greaterThan', 0)
    // 2. Pour chaque transaction, vérifier qu'il y a un montant
    //    Utiliser .each() :
    //    cy.getBySelLike('transaction-item').each(($item) => {
    //      // Chercher le montant dans l'item
    //      cy.wrap($item).should('contain', '$')
    //    })
  });

  // ──────────────────────────────────────────────
  // SC35 — Cliquer sur une transaction pour voir le détail
  // ──────────────────────────────────────────────
  it("SC35 - devrait afficher le détail d'une transaction au clic", () => {
    // TODO :
    // 1. Cliquer sur la première transaction de la liste
    //    cy.getBySelLike('transaction-item').first().click()
    // 2. Vérifier que l'URL a changé (contient un ID de transaction)
    //    cy.url().should('match', /\/transaction\//)
    // 3. Vérifier que le header du détail est visible
    //    cy.getBySel('transaction-detail-header').should('be.visible')
    // 4. Vérifier que la description est visible
    //    cy.getBySelLike('transaction-description').should('be.visible')
  });

  // ──────────────────────────────────────────────
  // SC36 — Naviguer entre les onglets Everyone / Friends / Mine
  // ──────────────────────────────────────────────
  it("SC36 - devrait charger des transactions différentes selon l'onglet", () => {
    // TODO :
    // 1. Sur l'onglet "Everyone" : compter le nombre de transactions
    //    let everyoneCount
    //    cy.getBySelLike('transaction-item').its('length').then((count) => {
    //      everyoneCount = count
    //    })
    // 2. Cliquer sur "Mine"
    //    cy.getBySel('nav-personal-tab').click()
    // 3. Vérifier que la liste se met à jour (le contenu change)
    //    - Soit le nombre de transactions est différent
    //    - Soit la liste est vide (avec le message "No Transactions")
  });

  // ──────────────────────────────────────────────
  // SC37 — Vérifier le bouton "Create Transaction" quand la liste est vide
  // ──────────────────────────────────────────────
  it("SC37 - devrait afficher un bouton de création quand il n'y a pas de transactions", () => {
    // TODO :
    // 1. Aller sur l'onglet "Friends" ou "Mine"
    //    (il est possible que la liste soit vide pour certains utilisateurs)
    //    cy.getBySel('nav-contacts-tab').click()
    // 2. S'il n'y a pas de transactions, vérifier le message
    //    cy.getBySel('empty-list-header').should('be.visible')
    //
    // NOTE : Ce test peut nécessiter un utilisateur spécifique sans transactions.
    // Si tu ne trouves pas de cas vide, utilise .skip() et note pourquoi.
  });

  // ──────────────────────────────────────────────
  // SC38 — Extraire et vérifier les infos d'une transaction
  // ──────────────────────────────────────────────
  it("SC38 - devrait afficher le sender et le receiver dans le détail d'une transaction", () => {
    // TODO :
    // 1. Cliquer sur la première transaction
    //    cy.getBySelLike('transaction-item').first().click()
    // 2. Vérifier que le sender est affiché
    //    cy.getBySelLike('sender').should('be.visible')
    // 3. Vérifier que le receiver est affiché
    //    cy.getBySelLike('receiver').should('be.visible')
    // 4. Extraire le texte du montant avec .invoke('text')
    //    cy.getBySelLike('transaction-amount')
    //      .invoke('text')
    //      .then((montant) => {
    //        cy.log('Montant de la transaction : ' + montant)
    //        expect(montant).to.contain('$')
    //      })
  });
});
