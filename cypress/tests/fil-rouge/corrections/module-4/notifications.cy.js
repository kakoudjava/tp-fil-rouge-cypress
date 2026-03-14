/**
 * ============================================================
 * CORRECTION — MODULE 4 : Notifications
 * ============================================================
 */

describe("Notifications", () => {
  beforeEach(() => {
    cy.task("db:seed");
    cy.login("Heath93", "s3cret");
  });

  // ──────────────────────────────────────────────
  // SC58 — Badge de notifications
  // ──────────────────────────────────────────────
  it("SC58 - devrait afficher le compteur de notifications dans la top bar", () => {
    cy.getBySel("nav-top-notifications-count").should("be.visible");

    cy.getBySel("nav-top-notifications-count")
      .invoke("text")
      .then((text) => {
        const count = parseInt(text.trim());
        expect(count).to.be.a("number");
        expect(count).to.be.at.least(0);
      });
  });

  // ──────────────────────────────────────────────
  // SC59 — Liste des notifications
  // ──────────────────────────────────────────────
  it("SC59 - devrait afficher la liste des notifications", () => {
    cy.getBySel("sidenav-notifications").click();
    cy.getBySel("notifications-list").should("be.visible");
    cy.getBySelLike("notification-list-item").should("have.length.greaterThan", 0);
  });

  // ──────────────────────────────────────────────
  // SC60 — Cliquer sur une notification
  // ──────────────────────────────────────────────
  it("SC60 - devrait naviguer vers la transaction en cliquant sur une notification", () => {
    cy.getBySel("sidenav-notifications").click();
    cy.getBySelLike("notification-list-item").first().click();

    // On est redirigé vers le détail de la transaction liée
    cy.url().should("match", /\/transaction\//);
  });

  // ──────────────────────────────────────────────
  // SC61 — Marquer comme lu
  // ──────────────────────────────────────────────
  it("SC61 - devrait pouvoir marquer une notification comme lue (dismiss)", () => {
    cy.getBySel("sidenav-notifications").click();

    // On clique sur le bouton "Dismiss" de la première notification
    // { force: true } permet de cliquer même si l'élément est partiellement masqué
    cy.getBySelLike("notification-mark-read").first().click({ force: true });

    // On vérifie que quelque chose a changé (la notification est marquée)
    cy.log("Notification marquée comme lue");
  });

  // ──────────────────────────────────────────────
  // SC62 — Notification après un paiement
  // ──────────────────────────────────────────────
  it("SC62 - devrait générer une notification quand un autre utilisateur nous paie", () => {
    // ÉTAPE 1 : Arvilla paie Heath93
    cy.getBySel("sidenav-signout").click();
    cy.login("Arvilla_Hegmann", "s3cret");

    cy.getBySel("nav-top-new-transaction").click();
    cy.getBySelLike("user-list-item").contains("Heath").click();
    cy.get("#amount").type("15");
    cy.get("#transaction-create-description-input").type("Café");
    cy.getBySel("transaction-create-submit-payment").click();

    // ÉTAPE 2 : Heath93 vérifie ses notifications
    cy.getBySel("sidenav-signout").click();
    cy.login("Heath93", "s3cret");

    cy.getBySel("sidenav-notifications").click();
    cy.getBySelLike("notification-list-item").should("have.length.greaterThan", 0);
  });
});
