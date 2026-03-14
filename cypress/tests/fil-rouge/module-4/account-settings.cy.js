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
 * - cy.get("input[name='firstName']")     → champ prénom
 * - cy.get("input[name='lastName']")      → champ nom
 * - cy.get("input[name='email']")         → champ email
 * - cy.get("input[name='phoneNumber']")   → champ téléphone
 * - cy.getBySel('user-settings-submit')
 *
 * ASTUCE :
 * Sur cette page, les champs du formulaire n'ont pas d'attribut
 * data-test directement sur l'input. On utilise donc
 * cy.get("input[name='...']") pour les cibler.
 * .invoke('val') permet de récupérer la valeur actuelle d'un input.
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
  it("SC69 - devrait afficher le formulaire avec les champs pré-remplis", () => {
    // TODO :
    // 1. Vérifier que le formulaire est visible
    //    cy.getBySel('user-settings-form').should('be.visible')
    // 2. Vérifier que le champ "First Name" contient une valeur
    //    cy.get("input[name='firstName']")
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
    //    cy.get("input[name='firstName']").clear().type('TestPrenom')
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
    //    cy.get("input[name='email']").clear().type('nouveau@test.com')
    // 2. Sauvegarder
    //    cy.getBySel('user-settings-submit').click()
    // 3. Recharger la page et vérifier que l'email est persisté
    //    cy.reload()
    //    cy.get("input[name='email']")
    //      .invoke('val')
    //      .should('eq', 'nouveau@test.com')
  });

  // ──────────────────────────────────────────────
  // SC72 — Validation : email invalide
  // ──────────────────────────────────────────────
  it("SC72 - devrait afficher une erreur si l'email est invalide", () => {
    // TODO :
    // 1. Effacer l'email et taper "pas-un-email"
    //    cy.get("input[name='email']").clear().type('pas-un-email')
    // 2. Cliquer ailleurs pour déclencher la validation
    //    cy.get("input[name='firstName']").click()
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
    //    cy.get("input[name='phoneNumber']").clear().type('abc')
    // 2. Cliquer ailleurs
    //    cy.get("input[name='firstName']").click()
    // 3. Vérifier le message d'erreur
    //    cy.get('#user-settings-phoneNumber-input-helper-text')
    //      .should('be.visible')
    //      .and('contain', 'Phone number is not valid')
  });
});
