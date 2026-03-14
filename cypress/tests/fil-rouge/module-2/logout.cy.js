/**
 * ============================================================
 * TP FIL ROUGE — MODULE 2 : Déconnexion (Logout)
 * ============================================================
 *
 * OBJECTIF :
 * Tester les scénarios de déconnexion.
 * Tu vas utiliser le hook before() pour te connecter avant les tests.
 *
 * CONSIGNES :
 * - Complète chaque bloc it()
 * - Utilise le hook before() ou beforeEach() pour préparer l'état
 *
 * RAPPEL DES SELECTEURS :
 * - cy.getBySel('sidenav-signout')
 * ============================================================
 */

describe("Déconnexion", () => {
  beforeEach(() => {
    // Avant chaque test :
    // 1. Réinitialiser la BDD
    cy.task("db:seed");
    // 2. Se connecter via l'UI
    //    (on utilise la commande cy.login() déjà disponible dans le projet)
    cy.login("Heath93", "s3cret");
  });

  // ──────────────────────────────────────────────
  // SC15 — Déconnexion via la sidebar
  // ──────────────────────────────────────────────
  it("SC15 - devrait se déconnecter via le bouton Logout dans la sidebar", () => {
    // TODO :
    // 1. Vérifier qu'on est bien connecté (le nom apparaît dans la sidebar)
    //    cy.getBySel('sidenav-user-full-name').should('be.visible')
    // 2. Cliquer sur le bouton "Logout" dans la sidebar
    //    cy.getBySel('sidenav-signout').click()
    // 3. Vérifier qu'on est redirigé vers /signin
    //    cy.url().should('include', '/signin')
  });

  // ──────────────────────────────────────────────
  // SC16 — Accès impossible après déconnexion
  // ──────────────────────────────────────────────
  it("SC16 - devrait ne plus accéder au dashboard après déconnexion", () => {
    // TODO :
    // 1. Se déconnecter
    //    cy.getBySel('sidenav-signout').click()
    // 2. Tenter de visiter la page d'accueil
    //    cy.visit('/')
    // 3. Vérifier qu'on est redirigé vers /signin (protection de la route)
    //    cy.url().should('include', '/signin')
  });

  // ──────────────────────────────────────────────
  // SC17 — Reconnexion après déconnexion
  // ──────────────────────────────────────────────
  it("SC17 - devrait pouvoir se reconnecter après une déconnexion", () => {
    // TODO :
    // 1. Se déconnecter
    // 2. Vérifier qu'on est sur /signin
    // 3. Se reconnecter avec "Arvilla_Hegmann" / "s3cret"
    // 4. Vérifier qu'on est bien connecté avec le bon utilisateur
    //    cy.getBySel('sidenav-username').should('contain', 'Arvilla_Hegmann')
  });
});
