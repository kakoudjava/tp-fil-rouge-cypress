/**
 * ============================================================
 * TP FIL ROUGE — MODULE 3 : Éléments spécifiques de la page
 * ============================================================
 *
 * OBJECTIF :
 * Pratiquer les commandes DOM avancées : invoke, attr, each, wrap.
 *
 * CONCEPTS PRATIQUES :
 * - .invoke('attr', 'href')  → lire un attribut HTML
 * - .invoke('attr', 'class') → lire les classes CSS
 * - .invoke('text')          → lire le contenu texte
 * - .invoke('val')           → lire la valeur d'un input
 * - .each()                  → itérer sur plusieurs éléments
 * - cy.wrap()                → wrapper un élément jQuery pour utiliser les commandes Cypress
 * ============================================================
 */

describe("Éléments spécifiques de la page", () => {
  beforeEach(() => {
    // Réinitialise la base de données avant chaque test
    // → Remet les données par défaut (utilisateurs, transactions, etc.)
    // ⚠️ Cette ligne est déjà fournie — ne pas la modifier
    cy.task("db:seed");
    cy.login("Heath93", "s3cret");
  });

  // ──────────────────────────────────────────────
  // SC39 — Vérifier les attributs des liens de navigation
  // ──────────────────────────────────────────────
  it("SC39 - devrait vérifier que chaque lien de la sidebar pointe vers la bonne URL", () => {
    // TODO :
    // 1. Vérifier le lien "Home"
    //    cy.getBySel('sidenav-home')
    //      .invoke('attr', 'href')
    //      .should('eq', '/')
    // 2. Vérifier le lien "My Account"
    //    cy.getBySel('sidenav-user-settings')
    //      .invoke('attr', 'href')
    //      .should('eq', '/user/settings')
    // 3. Vérifier le lien "Bank Accounts"
    //    cy.getBySel('sidenav-bankaccounts')
    //      .invoke('attr', 'href')
    //      .should('eq', '/bankaccounts')
    // 4. Vérifier le lien "Notifications"
    //    cy.getBySel('sidenav-notifications')
    //      .invoke('attr', 'href')
    //      .should('eq', '/notifications')
  });

  // ──────────────────────────────────────────────
  // SC40 — Vérifier la classe CSS active
  // ──────────────────────────────────────────────
  it("SC40 - devrait mettre en surbrillance le lien actif dans la sidebar", () => {
    // TODO :
    // 1. Sur la page d'accueil, vérifier que le lien "Home" a une classe "active" ou "Mui-selected"
    //    cy.getBySel('sidenav-home')
    //      .invoke('attr', 'class')
    //      .should('contain', 'Mui-selected')
    //
    // 2. Naviguer vers "My Account"
    //    cy.getBySel('sidenav-user-settings').click()
    //
    // 3. Vérifier que "My Account" a maintenant la classe active
    //    cy.getBySel('sidenav-user-settings')
    //      .invoke('attr', 'class')
    //      .should('contain', 'Mui-selected')
    //
    // 4. Vérifier que "Home" n'a PLUS la classe active
    //    cy.getBySel('sidenav-home')
    //      .invoke('attr', 'class')
    //      .should('not.contain', 'Mui-selected')
  });

  // ──────────────────────────────────────────────
  // SC41 — Lire et vérifier le solde (invoke + text)
  // ──────────────────────────────────────────────
  it("SC41 - devrait extraire le solde et vérifier que c'est un nombre valide", () => {
    // TODO :
    // 1. Extraire le texte du solde
    //    cy.getBySel('sidenav-user-balance')
    //      .invoke('text')
    //      .then((balanceText) => {
    //        // 2. Loguer le solde brut
    //        cy.log('Solde brut : ' + balanceText)
    //
    //        // 3. Nettoyer le texte (enlever $, virgules, espaces)
    //        const cleanBalance = balanceText.replace(/[$,\s]/g, '')
    //        const amount = parseFloat(cleanBalance)
    //
    //        // 4. Vérifier que c'est un nombre (pas NaN)
    //        expect(amount).to.not.be.NaN
    //
    //        // 5. Loguer le montant nettoyé
    //        cy.log('Solde nettoyé : ' + amount)
    //      })
  });

  // ──────────────────────────────────────────────
  // SC42 — Vérifier les valeurs des champs dans My Account
  // ──────────────────────────────────────────────
  it("SC42 - devrait pré-remplir les champs du formulaire My Account", () => {
    // TODO :
    // 1. Naviguer vers My Account
    //    cy.getBySel('sidenav-user-settings').click()
    // 2. Vérifier que le champ "First Name" est pré-rempli (pas vide)
    //    cy.getBySelLike('firstName')
    //      .find('input')
    //      .invoke('val')
    //      .should('not.be.empty')
    // 3. Vérifier que le champ "Last Name" est pré-rempli
    //    cy.getBySelLike('lastName')
    //      .find('input')
    //      .invoke('val')
    //      .should('not.be.empty')
    // 4. Vérifier le champ "Email"
    // 5. Vérifier le champ "Phone Number"
  });

  // ──────────────────────────────────────────────
  // SC43 — Itérer sur les comptes bancaires avec each()
  // ──────────────────────────────────────────────
  it("SC43 - devrait vérifier que chaque compte bancaire a un nom et un bouton Delete", () => {
    // TODO :
    // 1. Naviguer vers Bank Accounts
    //    cy.getBySel('sidenav-bankaccounts').click()
    // 2. Itérer sur chaque compte bancaire
    //    cy.getBySelLike('bankaccount-list-item').each(($item) => {
    //      // 3. Pour chaque item, vérifier qu'il contient du texte (le nom de la banque)
    //      cy.wrap($item).should('not.be.empty')
    //
    //      // 4. Pour chaque item, vérifier qu'il contient un bouton "Delete"
    //      cy.wrap($item).find('[data-test*="delete"]').should('exist')
    //    })
  });

  // ──────────────────────────────────────────────
  // SC44 — Vérifier le compteur de notifications
  // ──────────────────────────────────────────────
  it("SC44 - devrait afficher le badge de notifications avec un nombre", () => {
    // TODO :
    // 1. Récupérer le compteur de notifications dans la top bar
    //    cy.getBySel('nav-top-notifications-count')
    // 2. Extraire le texte
    //    .invoke('text')
    // 3. Vérifier que c'est un nombre (pas vide)
    //    .then((countText) => {
    //      const count = parseInt(countText)
    //      expect(count).to.be.a('number')
    //      expect(count).to.be.at.least(0)
    //      cy.log('Nombre de notifications : ' + count)
    //    })
  });
});
