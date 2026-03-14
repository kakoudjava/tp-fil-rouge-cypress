/**
 * ============================================================
 * TP FIL ROUGE — MODULE 4 : Notifications
 * ============================================================
 *
 * OBJECTIF :
 * Tester le système de notifications de l'application.
 *
 * RAPPEL DES SELECTEURS :
 * - cy.getBySel('nav-top-notifications-count')       → badge compteur
 * - cy.getBySel('sidenav-notifications')              → lien sidebar
 * - cy.getBySel('notifications-list')                 → liste
 * - cy.getBySelLike('notification-list-item')         → chaque notification
 * - cy.getBySelLike('notification-mark-read')         → bouton marquer comme lu
 * ============================================================
 */

describe("Notifications", () => {
  beforeEach(() => {
    cy.task("db:seed");
    cy.login("Heath93", "s3cret");
  });

  // ──────────────────────────────────────────────
  // SC58 — Affichage du badge de notifications
  // ──────────────────────────────────────────────
  it("SC58 - devrait afficher le compteur de notifications dans la top bar", () => {
    // TODO :
    // 1. Vérifier que le badge de notifications est visible
    //    cy.getBySel('nav-top-notifications-count').should('be.visible')
    // 2. Extraire le nombre et vérifier que c'est un entier >= 0
    //    cy.getBySel('nav-top-notifications-count')
    //      .invoke('text')
    //      .then((text) => {
    //        const count = parseInt(text.trim())
    //        expect(count).to.be.a('number')
    //        expect(count).to.be.at.least(0)
    //      })
  });

  // ──────────────────────────────────────────────
  // SC59 — Affichage de la liste des notifications
  // ──────────────────────────────────────────────
  it("SC59 - devrait afficher la liste des notifications", () => {
    // TODO :
    // 1. Naviguer vers les notifications via la sidebar
    //    cy.getBySel('sidenav-notifications').click()
    // 2. Vérifier que la liste est visible
    //    cy.getBySel('notifications-list').should('be.visible')
    // 3. Vérifier qu'il y a au moins une notification
    //    cy.getBySelLike('notification-list-item')
    //      .should('have.length.greaterThan', 0)
  });

  // ──────────────────────────────────────────────
  // SC60 — Cliquer sur une notification
  // ──────────────────────────────────────────────
  it("SC60 - devrait naviguer vers la transaction en cliquant sur une notification", () => {
    // TODO :
    // 1. Aller sur les notifications
    //    cy.getBySel('sidenav-notifications').click()
    // 2. Cliquer sur la première notification
    //    cy.getBySelLike('notification-list-item').first().click()
    // 3. Vérifier qu'on est redirigé vers le détail d'une transaction
    //    cy.url().should('match', /\/transaction\//)
  });

  // ──────────────────────────────────────────────
  // SC61 — Marquer une notification comme lue
  // ──────────────────────────────────────────────
  it("SC61 - devrait pouvoir marquer une notification comme lue", () => {
    // TODO :
    // 1. Aller sur les notifications
    //    cy.getBySel('sidenav-notifications').click()
    // 2. Compter le nombre initial de notifications
    //    let countBefore
    //    cy.getBySelLike('notification-list-item').then(($items) => {
    //      countBefore = $items.length
    //    })
    // 3. Cliquer sur le bouton "Dismiss" de la première notification
    //    cy.getBySelLike('notification-mark-read').first().click()
    // 4. Vérifier que le compteur a diminué ou que la notification a disparu
  });

  // ──────────────────────────────────────────────
  // SC62 — Notification générée après un paiement
  // ──────────────────────────────────────────────
  it("SC62 - devrait générer une notification quand un autre utilisateur nous paie", () => {
    // TODO :
    // ÉTAPE 1 : Arvilla paie Heath93
    // 1. Se déconnecter
    //    cy.getBySel('sidenav-signout').click()
    // 2. Se connecter avec Arvilla_Hegmann
    //    cy.login('Arvilla_Hegmann', 's3cret')
    // 3. Créer un paiement de 15$ vers Heath93
    //    cy.getBySel('nav-top-new-transaction').click()
    //    cy.getBySelLike('user-list-item').contains('Heath').click()
    //    cy.get('#amount').type('15')
    //    cy.get('#transaction-create-description-input').type('Café')
    //    cy.getBySel('transaction-create-submit-payment').click()
    //
    // ÉTAPE 2 : Heath93 vérifie ses notifications
    // 4. Se déconnecter et se reconnecter avec Heath93
    //    cy.getBySel('sidenav-signout').click()
    //    cy.login('Heath93', 's3cret')
    // 5. Aller sur les notifications
    //    cy.getBySel('sidenav-notifications').click()
    // 6. Vérifier qu'il y a une notification récente
    //    cy.getBySelLike('notification-list-item')
    //      .should('have.length.greaterThan', 0)
  });
});
