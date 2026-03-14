/**
 * ============================================================
 * TP FIL ROUGE — MODULE 3 : Onboarding nouvel utilisateur
 * ============================================================
 *
 * OBJECTIF :
 * Quand un utilisateur se connecte pour la première fois,
 * l'app affiche un assistant (dialog) pour créer un compte bancaire.
 * Tu vas tester ce parcours en interagissant avec le DOM.
 *
 * CONCEPTS PRATIQUES :
 * - cy.get().find()     → chercher un élément DANS un autre
 * - cy.get().parent()   → remonter au parent
 * - cy.get().should()   → assertions sur les éléments
 *
 * RAPPEL DES SELECTEURS :
 * - cy.getBySel('user-onboarding-dialog')
 * - cy.getBySel('user-onboarding-dialog-title')
 * - cy.getBySel('user-onboarding-next')
 * - cy.getBySel('bankaccount-submit')
 * - cy.getBySelLike('bankName-input')
 * - cy.getBySelLike('routingNumber-input')
 * - cy.getBySelLike('accountNumber-input')
 * ============================================================
 */

describe("Onboarding nouvel utilisateur", () => {
  beforeEach(() => {
    cy.task("db:seed");
  });

  // ──────────────────────────────────────────────
  // SC18 — Affichage du dialog de bienvenue
  // ──────────────────────────────────────────────
  it("SC18 - devrait afficher le dialog de bienvenue après inscription et première connexion", () => {
    // TODO :
    // 1. Créer un nouvel utilisateur via l'inscription
    //    - Visiter /signup
    //    - Remplir le formulaire (utiliser un username unique avec Date.now())
    //    - Cliquer sur Sign Up
    // 2. Se connecter avec le compte fraîchement créé
    //    - Visiter /signin
    //    - Taper username et password
    //    - Cliquer sur Sign In
    // 3. Vérifier que le dialog d'onboarding apparaît
    //    cy.getBySel('user-onboarding-dialog').should('be.visible')
    // 4. Vérifier le titre du dialog
    //    cy.getBySel('user-onboarding-dialog-title').should('contain', 'Get Started')
  });

  // ──────────────────────────────────────────────
  // SC19 — Remplir le formulaire de compte bancaire
  // ──────────────────────────────────────────────
  it("SC19 - devrait créer un compte bancaire via le formulaire onboarding", () => {
    // TODO :
    // 1. Créer un compte + se connecter (même étapes que SC18)
    // 2. Dans le dialog d'onboarding, cliquer sur "Next"
    //    cy.getBySel('user-onboarding-next').click()
    // 3. Remplir le formulaire de compte bancaire :
    //    - Bank Name : cy.getBySelLike('bankName-input').type('Ma Banque')
    //    - Routing Number : cy.getBySelLike('routingNumber-input').type('123456789')
    //    - Account Number : cy.getBySelLike('accountNumber-input').type('987654321')
    // 4. Cliquer sur "Save"
    //    cy.getBySel('bankaccount-submit').click()
    // 5. Vérifier qu'on passe à l'étape suivante du dialog
  });

  // ──────────────────────────────────────────────
  // SC20 — Validation du routing number
  // ──────────────────────────────────────────────
  it("SC20 - devrait afficher une erreur si le routing number est invalide", () => {
    // TODO :
    // 1. Créer un compte + se connecter
    // 2. Cliquer sur "Next" dans le dialog
    // 3. Remplir "Bank Name" correctement
    // 4. Taper un routing number trop court : "123"
    // 5. Cliquer sur le champ suivant (pour déclencher la validation)
    // 6. Vérifier le message d'erreur
    //    Astuce : utilise .find() pour chercher le message d'erreur DANS le parent du champ
    //    cy.getBySelLike('routingNumber-input')
    //      .find('p')
    //      .should('be.visible')
    //      .and('contain', 'Must contain a valid routing number')
  });

  // ──────────────────────────────────────────────
  // SC21 — Compléter tout l'onboarding
  // ──────────────────────────────────────────────
  it("SC21 - devrait compléter l'onboarding et arriver sur le dashboard", () => {
    // TODO :
    // 1. Créer un compte + se connecter
    // 2. Cliquer "Next" sur la première étape
    // 3. Remplir le compte bancaire + "Save"
    // 4. Cliquer "Done" sur la dernière étape
    //    cy.getBySel('user-onboarding-next').click()
    // 5. Vérifier que le dialog a disparu
    //    cy.getBySel('user-onboarding-dialog').should('not.exist')
    // 6. Vérifier qu'on est sur le dashboard (la liste de transactions est visible)
    //    cy.getBySel('transaction-list').should('be.visible')
    //    OU cy.getBySel('empty-list-header').should('be.visible')
  });
});
