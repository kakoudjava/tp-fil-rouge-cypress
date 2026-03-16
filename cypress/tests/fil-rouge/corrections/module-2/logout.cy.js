/**
 * ============================================================
 * CORRECTION — MODULE 2 : Déconnexion (Logout)
 * ============================================================
 */

describe("Déconnexion", () => {
  beforeEach(() => {
    cy.task("db:seed");

    // cy.login() est une commande personnalisée déjà créée dans le projet
    // Elle fait : visiter /signin → taper username → taper password → cliquer Sign In
    cy.login("Heath93", "s3cret");
  });

  // ──────────────────────────────────────────────
  // SC15 — Déconnexion via la sidebar
  // ──────────────────────────────────────────────
  it("SC15 - devrait se déconnecter via le bouton Logout dans la sidebar", () => {
    // On vérifie d'abord qu'on est bien connecté
    cy.getBySel("sidenav-user-full-name").should("be.visible");

    // On clique sur le bouton Logout dans le menu de gauche
    cy.getBySel("sidenav-signout").click();

    // On vérifie qu'on est renvoyé vers la page de connexion
    cy.url().should("include", "/signin");
  });

  // ──────────────────────────────────────────────
  // SC16 — Accès impossible après déconnexion
  // ──────────────────────────────────────────────
  it("SC16 - devrait ne plus accéder au dashboard après déconnexion", () => {
    // On se déconnecte
    cy.getBySel("sidenav-signout").click();

    // On essaie de visiter directement la page d'accueil (le dashboard)
    cy.visit("/");

    // L'app nous redirige vers /signin car on n'est plus connecté
    // C'est ce qu'on appelle la "protection de route"
    cy.url().should("include", "/signin");
  });

  // ──────────────────────────────────────────────
  // SC17 — Reconnexion après déconnexion
  // ──────────────────────────────────────────────
  it("SC17 - devrait pouvoir se reconnecter après une déconnexion", () => {
    // Étape 1 : se déconnecter
    cy.getBySel("sidenav-signout").click();
    cy.url().should("include", "/signin");

    // Étape 2 : se reconnecter avec un AUTRE utilisateur
    cy.login("Arvilla_Hegmann", "s3cret");

    // Étape 3 : vérifier qu'on est connecté avec le bon compte
    // .should('contain', 'texte') vérifie que l'élément contient ce texte
    cy.getBySel("sidenav-username").should("contain", "Arvilla_Hegmann");
  });
});
