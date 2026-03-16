/**
 * ============================================================
 * TP FIL ROUGE — MODULE 5 : Comptes bancaires (Bank Accounts)
 * ============================================================
 *
 * OBJECTIF :
 * Tester le CRUD (Create, Read, Delete) des comptes bancaires.
 *
 * RAPPEL DES SELECTEURS :
 * - cy.getBySel('bankaccount-list')              → liste des comptes
 * - cy.getBySel('bankaccount-new')               → bouton "Create"
 * - cy.getBySelLike('bankaccount-list-item')     → chaque compte
 * - cy.getBySelLike('bankName-input')            → champ nom banque
 * - cy.getBySelLike('routingNumber-input')       → champ routing number
 * - cy.getBySelLike('accountNumber-input')       → champ account number
 * - cy.getBySel('bankaccount-submit')            → bouton Save
 * - cy.getBySelLike('bankaccount-delete')        → bouton Delete
 * ============================================================
 */

describe("Gestion des comptes bancaires", () => {
  beforeEach(() => {
    // Réinitialise la base de données avant chaque test
    // → Remet les données par défaut (utilisateurs, transactions, etc.)
    // ⚠️ Cette ligne est déjà fournie — ne pas la modifier
    cy.task("db:seed");
    cy.login("Heath93", "s3cret");
    cy.getBySel("sidenav-bankaccounts").click();
  });

  // ──────────────────────────────────────────────
  // SC79 — Affichage de la liste des comptes
  // ──────────────────────────────────────────────
  it("SC79 - devrait afficher la liste des comptes bancaires", () => {
    // TODO :
    // 1. Vérifier que la liste est visible
    //    cy.getBySel('bankaccount-list').should('be.visible')
    // 2. Vérifier qu'il y a au moins 1 compte
    //    cy.getBySelLike('bankaccount-list-item')
    //      .should('have.length.greaterThan', 0)
  });

  // ──────────────────────────────────────────────
  // SC80 — Créer un nouveau compte bancaire
  // ──────────────────────────────────────────────
  it("SC80 - devrait créer un nouveau compte bancaire", () => {
    // TODO :
    // 1. Cliquer sur "Create"
    //    cy.getBySel('bankaccount-new').click()
    // 2. Vérifier que l'URL contient /bankaccounts/new
    //    cy.url().should('contain', '/bankaccounts/new')
    // 3. Remplir les champs :
    //    - Bank Name : "Banque de Test"
    //    cy.getBySelLike('bankName-input').type('Banque de Test')
    //    - Routing Number : "123456789"
    //    cy.getBySelLike('routingNumber-input').type('123456789')
    //    - Account Number : "987654321"
    //    cy.getBySelLike('accountNumber-input').type('987654321')
    // 4. Cliquer sur "Save"
    //    cy.getBySel('bankaccount-submit').click()
    // 5. Vérifier qu'on revient sur la liste
    //    cy.url().should('contain', '/bankaccounts')
    // 6. Vérifier que le nouveau compte apparaît dans la liste
    //    cy.getBySel('bankaccount-list').should('contain', 'Banque de Test')
  });

  // ──────────────────────────────────────────────
  // SC81 — Supprimer un compte bancaire
  // ──────────────────────────────────────────────
  it("SC81 - devrait supprimer un compte bancaire", () => {
    // TODO :
    // 1. Compter les comptes bancaires actuels
    //    let countBefore
    //    cy.getBySelLike('bankaccount-list-item').then(($items) => {
    //      countBefore = $items.length
    //    })
    // 2. Cliquer sur "Delete" du premier compte
    //    cy.getBySelLike('bankaccount-delete').first().click()
    // 3. Vérifier que le compte est marqué comme supprimé
    //    (L'app affiche "(Deleted)" à côté du nom)
    //    cy.getBySelLike('bankaccount-list-item').first().should('contain', 'Deleted')
  });

  // ──────────────────────────────────────────────
  // SC82 — Validation du formulaire de création
  // ──────────────────────────────────────────────
  it("SC82 - devrait afficher des erreurs de validation sur le formulaire bancaire", () => {
    // TODO :
    // 1. Cliquer sur "Create"
    //    cy.getBySel('bankaccount-new').click()
    // 2. Cliquer sur le champ Bank Name puis le quitter sans rien taper
    //    ⚠️ Les champs ont le data-test sur le wrapper div, pas sur l'input.
    //    Il faut utiliser .find('input') pour cibler le vrai input.
    //    cy.getBySelLike('bankName-input').find('input').type('a').clear().blur()
    // 3. Vérifier le message d'erreur
    //    cy.get('#bankaccount-bankName-input-helper-text')
    //      .should('be.visible')
    // 4. Faire pareil pour Routing Number
    //    cy.getBySelLike('routingNumber-input').find('input').type('1').clear().blur()
    // 5. Faire pareil pour Account Number
    //    cy.getBySelLike('accountNumber-input').find('input').type('1').clear().blur()
    // 6. Vérifier que le bouton Save est disabled
    //    cy.getBySel('bankaccount-submit').should('be.disabled')
  });
});
