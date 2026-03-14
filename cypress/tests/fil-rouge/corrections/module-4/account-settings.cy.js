/**
 * ============================================================
 * CORRECTION — MODULE 4 : Paramètres du compte (My Account)
 * ============================================================
 */

describe("Paramètres du compte utilisateur", () => {
  beforeEach(() => {
    cy.task("db:seed");
    cy.login("Heath93", "s3cret");
    cy.getBySel("sidenav-user-settings").click();
  });

  // ──────────────────────────────────────────────
  // SC69 — Affichage du formulaire
  // ──────────────────────────────────────────────
  it("SC69 - devrait afficher le formulaire avec les champs pré-remplis", () => {
    cy.getBySel("user-settings-form").should("be.visible");

    // .invoke('val') récupère la valeur du champ input
    cy.getBySelLike("firstName").find("input").invoke("val").should("not.be.empty");
    cy.getBySelLike("lastName").find("input").invoke("val").should("not.be.empty");
    cy.getBySelLike("email").find("input").invoke("val").should("not.be.empty");
    cy.getBySelLike("phoneNumber").find("input").invoke("val").should("not.be.empty");
  });

  // ──────────────────────────────────────────────
  // SC70 — Modifier le prénom
  // ──────────────────────────────────────────────
  it("SC70 - devrait modifier le prénom et sauvegarder", () => {
    // .clear() efface le contenu actuel du champ
    cy.getBySelLike("firstName").find("input").clear().type("TestPrenom");
    cy.getBySel("user-settings-submit").click();

    // Le nouveau prénom apparaît dans la sidebar
    cy.getBySel("sidenav-user-full-name").should("contain", "TestPrenom");
  });

  // ──────────────────────────────────────────────
  // SC71 — Modifier l'email
  // ──────────────────────────────────────────────
  it("SC71 - devrait modifier l'email et sauvegarder", () => {
    cy.getBySelLike("email").find("input").clear().type("nouveau@test.com");
    cy.getBySel("user-settings-submit").click();

    // On recharge la page pour vérifier que c'est sauvegardé en base
    cy.reload();

    // Le champ email contient la nouvelle valeur
    cy.getBySelLike("email")
      .find("input")
      .invoke("val")
      .should("eq", "nouveau@test.com");
  });

  // ──────────────────────────────────────────────
  // SC72 — Email invalide
  // ──────────────────────────────────────────────
  it("SC72 - devrait afficher une erreur si l'email est invalide", () => {
    cy.getBySelLike("email").find("input").clear().type("pas-un-email");

    // On clique ailleurs pour déclencher la validation
    cy.getBySelLike("firstName").find("input").click();

    cy.get("#user-settings-email-input-helper-text")
      .should("be.visible")
      .and("contain", "Must contain a valid email address");

    // Le bouton Save est disabled tant que le formulaire est invalide
    cy.getBySel("user-settings-submit").should("be.disabled");
  });

  // ──────────────────────────────────────────────
  // SC73 — Téléphone invalide
  // ──────────────────────────────────────────────
  it("SC73 - devrait afficher une erreur si le numéro de téléphone est invalide", () => {
    cy.getBySelLike("phoneNumber").find("input").clear().type("abc");
    cy.getBySelLike("firstName").find("input").click();

    cy.get("#user-settings-phoneNumber-input-helper-text")
      .should("be.visible")
      .and("contain", "Must contain a valid phone number");
  });
});
