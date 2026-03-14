/**
 * ============================================================
 * CORRECTION — MODULE 2 : Connexion (Login)
 * ============================================================
 */

describe("Connexion utilisateur", () => {
  beforeEach(() => {
    // On réinitialise la base de données avant chaque test
    // Comme ça, chaque test part d'un état propre (mêmes utilisateurs, mêmes données)
    cy.task("db:seed");

    // On visite la page de connexion
    cy.visit("/signin");
  });

  // ──────────────────────────────────────────────
  // SC07 — Affichage de la page de connexion
  // ──────────────────────────────────────────────
  it("SC07 - devrait afficher la page de connexion avec les champs requis", () => {
    // cy.contains('h1', 'Sign In') → cherche un <h1> qui contient "Sign In"
    cy.contains("h1", "Sign In").should("be.visible");
    cy.getBySel("signin-username").should("be.visible");
    cy.getBySel("signin-password").should("be.visible");
    cy.getBySel("signin-submit").should("be.visible");
    cy.getBySel("signin-remember-me").should("be.visible");
  });

  // ──────────────────────────────────────────────
  // SC08 — Connexion réussie
  // ──────────────────────────────────────────────
  it("SC08 - devrait se connecter avec un utilisateur valide (Heath93)", () => {
    cy.getBySel("signin-username").type("Heath93");
    cy.getBySel("signin-password").type("s3cret");
    cy.getBySel("signin-submit").click();

    // Après connexion, on n'est plus sur /signin
    cy.url().should("not.include", "/signin");

    // Le nom de l'utilisateur apparaît dans la sidebar (= on est connecté)
    cy.getBySel("sidenav-user-full-name").should("be.visible");
  });

  // ──────────────────────────────────────────────
  // SC09 — Mauvais mot de passe
  // ──────────────────────────────────────────────
  it("SC09 - devrait afficher une erreur avec un mauvais mot de passe", () => {
    cy.getBySel("signin-username").type("Heath93");
    cy.getBySel("signin-password").type("mauvaismdp");
    cy.getBySel("signin-submit").click();

    // Le message d'erreur est visible ET contient le bon texte
    // .and() permet d'enchaîner plusieurs vérifications sur le même élément
    cy.getBySel("signin-error")
      .should("be.visible")
      .and("contain", "Username or password is invalid");
  });

  // ──────────────────────────────────────────────
  // SC10 — Username inexistant
  // ──────────────────────────────────────────────
  it("SC10 - devrait afficher une erreur avec un username inexistant", () => {
    cy.getBySel("signin-username").type("utilisateur_bidon_999");
    cy.getBySel("signin-password").type("s3cret");
    cy.getBySel("signin-submit").click();

    cy.getBySel("signin-error")
      .should("be.visible")
      .and("contain", "Username or password is invalid");
  });

  // ──────────────────────────────────────────────
  // SC11 — Champs vides
  // ──────────────────────────────────────────────
  it("SC11 - devrait désactiver le bouton si les champs sont vides", () => {
    // Sans rien remplir → bouton disabled
    cy.getBySel("signin-submit").should("be.disabled");

    // On tape seulement le username → toujours disabled
    cy.getBySel("signin-username").type("Heath93");
    cy.getBySel("signin-submit").should("be.disabled");

    // On tape aussi le password → maintenant le bouton est actif
    cy.getBySel("signin-password").type("s3cret");
    cy.getBySel("signin-submit").should("not.be.disabled");
  });

  // ──────────────────────────────────────────────
  // SC12 — Validation du champ username
  // ──────────────────────────────────────────────
  it("SC12 - devrait afficher une erreur si le username est effacé après saisie", () => {
    // On tape puis on efface → ça déclenche la validation "champ requis"
    cy.getBySel("signin-username").type("test").clear();

    // On clique ailleurs pour que le champ perde le focus
    cy.getBySel("signin-password").click();

    // Le message d'erreur de validation apparaît sous le champ
    cy.get("#username-helper-text").should("be.visible");
  });

  // ──────────────────────────────────────────────
  // SC13 — Checkbox "Remember me"
  // ──────────────────────────────────────────────
  it("SC13 - devrait pouvoir cocher et décocher 'Remember me'", () => {
    // .find('input') → cherche le <input> DANS le composant Remember Me
    // Car le composant Material UI enveloppe l'input dans des <div>
    cy.getBySel("signin-remember-me").find("input").should("not.be.checked");

    // .check() coche la checkbox
    cy.getBySel("signin-remember-me").find("input").check();
    cy.getBySel("signin-remember-me").find("input").should("be.checked");

    // .uncheck() décoche la checkbox
    cy.getBySel("signin-remember-me").find("input").uncheck();
    cy.getBySel("signin-remember-me").find("input").should("not.be.checked");
  });

  // ──────────────────────────────────────────────
  // SC14 — Lien vers l'inscription
  // ──────────────────────────────────────────────
  it("SC14 - devrait rediriger vers la page d'inscription via le lien", () => {
    cy.contains("Don't have an account? Sign Up").click();
    cy.url().should("include", "/signup");
  });
});
