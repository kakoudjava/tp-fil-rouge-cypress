/**
 * ============================================================
 * CORRECTION — MODULE 2 : Inscription (Sign Up)
 * ============================================================
 */

describe("Inscription d'un nouvel utilisateur", () => {
  beforeEach(() => {
    // Avant chaque test, on visite la page d'inscription
    cy.visit("/signup");
  });

  // ──────────────────────────────────────────────
  // SC01 — Vérifier l'affichage du formulaire
  // ──────────────────────────────────────────────
  it("SC01 - devrait afficher le formulaire d'inscription avec tous les champs", () => {
    // On vérifie que chaque champ du formulaire est visible sur la page
    cy.getBySel("signup-first-name").should("be.visible");
    cy.getBySel("signup-last-name").should("be.visible");
    cy.getBySel("signup-username").should("be.visible");
    cy.getBySel("signup-password").should("be.visible");
    cy.getBySel("signup-confirmPassword").should("be.visible");
    cy.getBySel("signup-submit").should("be.visible");
  });

  // ──────────────────────────────────────────────
  // SC02 — Inscription réussie
  // ──────────────────────────────────────────────
  it("SC02 - devrait inscrire un nouvel utilisateur avec des données valides", () => {
    // On génère un username unique avec Date.now() pour éviter les doublons
    // Date.now() retourne un nombre unique (les millisecondes depuis 1970)
    const username = "JeanDupont" + Date.now();

    cy.getBySel("signup-first-name").type("Jean");
    cy.getBySel("signup-last-name").type("Dupont");
    cy.getBySel("signup-username").type(username);
    cy.getBySel("signup-password").type("Test1234!");
    cy.getBySel("signup-confirmPassword").type("Test1234!");
    cy.getBySel("signup-submit").click();

    // Après l'inscription, on est redirigé vers la page de connexion
    cy.url().should("include", "/signin");
  });

  // ──────────────────────────────────────────────
  // SC03 — Mot de passe trop court
  // ──────────────────────────────────────────────
  it("SC03 - devrait afficher une erreur si le mot de passe est trop court", () => {
    cy.getBySel("signup-first-name").type("Jean");
    cy.getBySel("signup-last-name").type("Dupont");
    cy.getBySel("signup-username").type("JeanTest");

    // On tape un mot de passe de 3 caractères seulement
    cy.getBySel("signup-password").type("abc");

    // On clique sur un autre champ pour déclencher la validation
    cy.getBySel("signup-confirmPassword").click();

    // Le message d'erreur apparaît sous le champ password
    cy.get("#password-helper-text")
      .should("be.visible")
      .and("contain", "least 4");
  });

  // ──────────────────────────────────────────────
  // SC04 — Mots de passe différents
  // ──────────────────────────────────────────────
  it("SC04 - devrait afficher une erreur si les mots de passe ne correspondent pas", () => {
    cy.getBySel("signup-first-name").type("Jean");
    cy.getBySel("signup-last-name").type("Dupont");
    cy.getBySel("signup-username").type("JeanTest");
    cy.getBySel("signup-password").type("Test1234!");

    // On tape un mot de passe DIFFÉRENT dans la confirmation
    cy.getBySel("signup-confirmPassword").type("Autre5678!");

    // On clique ailleurs pour déclencher la validation
    cy.getBySel("signup-first-name").click();

    // Le message d'erreur indique que les mots de passe ne matchent pas
    cy.get("#confirmPassword-helper-text")
      .should("be.visible")
      .and("contain", "match");
  });

  // ──────────────────────────────────────────────
  // SC05 — Bouton désactivé si formulaire incomplet
  // ──────────────────────────────────────────────
  it("SC05 - devrait désactiver le bouton Sign Up tant que le formulaire est incomplet", () => {
    // Sans rien remplir, le bouton est grisé (disabled)
    cy.getBySel("signup-submit").should("be.disabled");

    // On remplit seulement le prénom → toujours disabled
    cy.getBySel("signup-first-name").type("Jean");
    cy.getBySel("signup-submit").should("be.disabled");

    // On remplit tout le formulaire
    cy.getBySel("signup-last-name").type("Dupont");
    cy.getBySel("signup-username").type("JeanTest");
    cy.getBySel("signup-password").type("Test1234!");
    cy.getBySel("signup-confirmPassword").type("Test1234!");

    // Maintenant le bouton est cliquable
    cy.getBySel("signup-submit").should("not.be.disabled");
  });

  // ──────────────────────────────────────────────
  // SC06 — Lien vers la page de connexion
  // ──────────────────────────────────────────────
  it("SC06 - devrait rediriger vers la page de connexion via le lien", () => {
    // cy.contains() cherche un élément qui contient le texte donné
    cy.contains("Have an account? Sign In").click();

    // On vérifie qu'on est bien sur /signin
    cy.url().should("include", "/signin");
  });
});
