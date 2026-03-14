/**
 * ============================================================
 * CORRECTION — MODULE 3 : Onboarding nouvel utilisateur
 * ============================================================
 */

describe("Onboarding nouvel utilisateur", () => {
  beforeEach(() => {
    cy.task("db:seed");
  });

  // Fonction utilitaire : créer un compte et se connecter
  // On la réutilise dans chaque test pour éviter de copier-coller
  const createAndLogin = () => {
    const username = "TestUser" + Date.now();
    const password = "Test1234!";

    // 1. Inscription
    cy.visit("/signup");
    cy.getBySel("signup-first-name").type("Test");
    cy.getBySel("signup-last-name").type("User");
    cy.getBySel("signup-username").type(username);
    cy.getBySel("signup-password").type(password);
    cy.getBySel("signup-confirmPassword").type(password);
    cy.getBySel("signup-submit").click();

    // 2. Connexion
    cy.visit("/signin");
    cy.getBySel("signin-username").type(username);
    cy.getBySel("signin-password").type(password);
    cy.getBySel("signin-submit").click();
  };

  // ──────────────────────────────────────────────
  // SC18 — Affichage du dialog de bienvenue
  // ──────────────────────────────────────────────
  it("SC18 - devrait afficher le dialog de bienvenue après première connexion", () => {
    createAndLogin();

    // Le dialog d'onboarding apparaît automatiquement à la première connexion
    cy.getBySel("user-onboarding-dialog").should("be.visible");
    cy.getBySel("user-onboarding-dialog-title").should("contain", "Get Started");
  });

  // ──────────────────────────────────────────────
  // SC19 — Remplir le formulaire de compte bancaire
  // ──────────────────────────────────────────────
  it("SC19 - devrait créer un compte bancaire via le formulaire onboarding", () => {
    createAndLogin();

    // Étape 1 : cliquer sur "Next" pour passer à l'écran du formulaire bancaire
    cy.getBySel("user-onboarding-next").click();

    // Étape 2 : remplir le formulaire
    // getBySelLike cherche les éléments dont data-test CONTIENT le texte
    cy.getBySelLike("bankName-input").type("Ma Banque");
    cy.getBySelLike("routingNumber-input").type("123456789");
    cy.getBySelLike("accountNumber-input").type("987654321");

    // Étape 3 : sauvegarder
    cy.getBySel("bankaccount-submit").click();

    // Étape 4 : on arrive sur la dernière étape du dialog
    cy.getBySel("user-onboarding-dialog-title").should("be.visible");
  });

  // ──────────────────────────────────────────────
  // SC20 — Validation du routing number
  // ──────────────────────────────────────────────
  it("SC20 - devrait afficher une erreur si le routing number est invalide", () => {
    createAndLogin();
    cy.getBySel("user-onboarding-next").click();

    // On remplit le nom de la banque
    cy.getBySelLike("bankName-input").type("Ma Banque");

    // On tape un routing number trop court (il faut 9 chiffres)
    cy.getBySelLike("routingNumber-input").type("123");

    // On clique sur le champ suivant pour déclencher la validation
    cy.getBySelLike("accountNumber-input").click();

    // Le message d'erreur apparaît
    // On cherche le texte d'erreur dans le helper text du champ
    cy.get("#bankaccount-routingNumber-input-helper-text")
      .should("be.visible")
      .and("contain", "valid");
  });

  // ──────────────────────────────────────────────
  // SC21 — Compléter tout l'onboarding
  // ──────────────────────────────────────────────
  it("SC21 - devrait compléter l'onboarding et arriver sur le dashboard", () => {
    createAndLogin();

    // Étape 1 : "Next" sur l'écran de bienvenue
    cy.getBySel("user-onboarding-next").click();

    // Étape 2 : remplir le compte bancaire
    cy.getBySelLike("bankName-input").type("Ma Banque");
    cy.getBySelLike("routingNumber-input").type("123456789");
    cy.getBySelLike("accountNumber-input").type("987654321");
    cy.getBySel("bankaccount-submit").click();

    // Étape 3 : "Done" sur le dernier écran
    cy.getBySel("user-onboarding-next").click();

    // Le dialog a disparu, on est sur le dashboard
    cy.getBySel("user-onboarding-dialog").should("not.exist");
  });
});
