/**
 * ============================================================
 * TP FIL ROUGE — MODULE 4 : Paramètres du compte (My Account)
 * ============================================================
 *
 * OBJECTIF :
 * Tester la modification des informations du profil utilisateur.
 *
 * RAPPEL DES SELECTEURS :
 * - cy.getBySel('user-settings-form')
 * - cy.getBySelLike('firstName').find('input')
 * - cy.getBySelLike('lastName').find('input')
 * - cy.getBySelLike('email').find('input')
 * - cy.getBySelLike('phoneNumber').find('input')
 * - cy.getBySel('user-settings-submit')
 * ============================================================
 */

describe("Paramètres du compte utilisateur", () => {
  beforeEach(() => {
    // Réinitialise la base de données avant chaque test
    // → Remet les données par défaut (utilisateurs, transactions, etc.)
    // ⚠️ Cette ligne est déjà fournie — ne pas la modifier
    cy.task("db:seed");
    cy.login("Heath93", "s3cret");
    cy.getBySel("sidenav-user-settings").click();
  });

  // ──────────────────────────────────────────────
  // SC69 — Affichage du formulaire
  // ──────────────────────────────────────────────
  it("SC69 - devrait afficher le formulaire de paramètres avec les champs pré-remplis", () => {
    // TODO :
    // 1. Vérifier que le formulaire est visible
    //    cy.getBySel('user-settings-form').should('be.visible')
    // 2. Vérifier que le champ "First Name" contient une valeur
    //    cy.getBySelLike('firstName').find('input')
    //      .invoke('val')
    //      .should('not.be.empty')
    // 3. Vérifier "Last Name"
    // 4. Vérifier "Email"
    // 5. Vérifier "Phone Number"
  });

  // ──────────────────────────────────────────────
  // SC70 — Modifier le prénom
  // ──────────────────────────────────────────────
  it("SC70 - devrait modifier le prénom et sauvegarder", () => {
    // TODO :
    // 1. Effacer le champ "First Name" et taper un nouveau prénom
    //    cy.getBySelLike('firstName').find('input').clear().type('TestPrenom')
    // 2. Cliquer sur "Save"
    //    cy.getBySel('user-settings-submit').click()
    // 3. Vérifier que le nom dans la sidebar a changé
    //    cy.getBySel('sidenav-user-full-name').should('contain', 'TestPrenom')
  });

  // ──────────────────────────────────────────────
  // SC71 — Modifier l'email
  // ──────────────────────────────────────────────
  it("SC71 - devrait modifier l'email et sauvegarder", () => {
    // TODO :
    // 1. Effacer le champ email et taper un nouveau
    //    cy.getBySelLike('email').find('input').clear().type('nouveau@test.com')
    // 2. Sauvegarder
    //    cy.getBySel('user-settings-submit').click()
    // 3. Recharger la page et vérifier que l'email est persisté
    //    cy.reload()
    //    cy.getBySelLike('email').find('input')
    //      .invoke('val')
    //      .should('eq', 'nouveau@test.com')
  });

  // ──────────────────────────────────────────────
  // SC72 — Validation : email invalide
  // ──────────────────────────────────────────────
  it("SC72 - devrait afficher une erreur si l'email est invalide", () => {
    // TODO :
    // 1. Effacer l'email et taper "pas-un-email"
    //    cy.getBySelLike('email').find('input').clear().type('pas-un-email')
    // 2. Cliquer ailleurs
    //    cy.getBySelLike('firstName').find('input').click()
    // 3. Vérifier le message d'erreur
    //    cy.get('#user-settings-email-input-helper-text')
    //      .should('be.visible')
    //      .and('contain', 'Must contain a valid email address')
    // 4. Vérifier que le bouton Save est disabled
    //    cy.getBySel('user-settings-submit').should('be.disabled')
  });

  // ──────────────────────────────────────────────
  // SC73 — Validation : numéro de téléphone invalide
  // ──────────────────────────────────────────────
  it("SC73 - devrait afficher une erreur si le numéro de téléphone est invalide", () => {
    // TODO :
    // 1. Effacer le téléphone et taper "abc"
    //    cy.getBySelLike('phoneNumber').find('input').clear().type('abc')
    // 2. Cliquer ailleurs
    // 3. Vérifier le message d'erreur
    //    cy.get('#user-settings-phoneNumber-input-helper-text')
    //      .should('be.visible')
    //      .and('contain', 'Must contain a valid phone number')
  });
});
