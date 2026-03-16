/**
 * ============================================================
 * CORRECTION — MODULE 5 : Paramètres du compte (My Account)
 * ============================================================
 */

describe("Paramètres du compte utilisateur", () => {
  beforeEach(() => {
    cy.task("db:seed");
    cy.login("Heath93", "s3cret");
    cy.getBySel("sidenav-user-settings").click();
  });

  // ──────────────────────────────────────────────
  // SC74 — Affichage du formulaire
  // ──────────────────────────────────────────────
  it("SC74 - devrait afficher le formulaire avec les champs pré-remplis", () => {
    cy.getBySel("user-settings-form").should("be.visible");

    // On utilise input[name='...'] pour cibler les champs du formulaire
    // .invoke('val') récupère la valeur actuelle (comme input.value en JS)
    cy.get("input[name='firstName']").invoke("val").should("not.be.empty");
    cy.get("input[name='lastName']").invoke("val").should("not.be.empty");
    cy.get("input[name='email']").invoke("val").should("not.be.empty");
    cy.get("input[name='phoneNumber']").invoke("val").should("not.be.empty");
  });

  // ──────────────────────────────────────────────
  // SC75 — Modifier le prénom
  // ──────────────────────────────────────────────
  it("SC75 - devrait modifier le prénom et sauvegarder", () => {
    // .clear() efface le contenu actuel du champ
    cy.get("input[name='firstName']").clear().type("TestPrenom");
    cy.getBySel("user-settings-submit").click();

    // Le nouveau prénom apparaît dans la sidebar
    cy.getBySel("sidenav-user-full-name").should("contain", "TestPrenom");
  });

  // ──────────────────────────────────────────────
  // SC76 — Modifier l'email
  // ──────────────────────────────────────────────
  it("SC76 - devrait modifier l'email et sauvegarder", () => {
    cy.get("input[name='email']").clear().type("nouveau@test.com");
    cy.getBySel("user-settings-submit").click();

    // On recharge la page pour vérifier que c'est sauvegardé en base
    cy.reload();

    // Le champ email contient la nouvelle valeur
    cy.get("input[name='email']").invoke("val").should("eq", "nouveau@test.com");
  });

  // ──────────────────────────────────────────────
  // SC77 — Email invalide
  // ──────────────────────────────────────────────
  it("SC77 - devrait afficher une erreur si l'email est invalide", () => {
    cy.get("input[name='email']").clear().type("pas-un-email");

    // On clique ailleurs pour déclencher la validation
    cy.get("input[name='firstName']").click();

    cy.get("#user-settings-email-input-helper-text")
      .should("be.visible")
      .and("contain", "Must contain a valid email address");

    // Le bouton Save est disabled tant que le formulaire est invalide
    cy.getBySel("user-settings-submit").should("be.disabled");
  });

  // ──────────────────────────────────────────────
  // SC78 — Téléphone invalide
  // ──────────────────────────────────────────────
  it("SC78 - devrait afficher une erreur si le numéro de téléphone est invalide", () => {
    cy.get("input[name='phoneNumber']").clear().type("abc");
    cy.get("input[name='firstName']").click();

    cy.get("#user-settings-phoneNumber-input-helper-text")
      .should("be.visible")
      .and("contain", "Phone number is not valid");
  });
});
