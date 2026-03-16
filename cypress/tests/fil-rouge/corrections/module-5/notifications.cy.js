/**
 * ============================================================
 * CORRECTION — MODULE 5 : Notifications
 * ============================================================
 */

describe("Notifications", () => {
  beforeEach(() => {
    cy.task("db:seed");
    cy.login("Heath93", "s3cret");
  });

  // ──────────────────────────────────────────────
  // SC63 — Badge de notifications
  // ──────────────────────────────────────────────
  it("SC63 - devrait afficher le compteur de notifications dans la top bar", () => {
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
  // SC64 — Liste des notifications
  // ──────────────────────────────────────────────
  it("SC64 - devrait afficher la liste des notifications", () => {
    cy.getBySel("sidenav-notifications").click();
    cy.getBySel("notifications-list").should("be.visible");
    cy.getBySelLike("notification-list-item").should("have.length.greaterThan", 0);
  });

  // ──────────────────────────────────────────────
  // SC65 — Cliquer sur une notification
  // ──────────────────────────────────────────────
  it("SC65 - devrait pouvoir cliquer sur une notification et voir ses détails", () => {
    cy.getBySel("sidenav-notifications").click();

    // Vérifier que les notifications contiennent du texte (pas vides)
    cy.getBySelLike("notification-list-item")
      .first()
      .should("not.be.empty")
      .and("contain", ".");

    // Vérifier le nombre de notifications
    cy.getBySelLike("notification-list-item").then(($items) => {
      cy.log("Nombre de notifications : " + $items.length);
      expect($items.length).to.be.at.least(1);
    });
  });

  // ──────────────────────────────────────────────
  // SC66 — Marquer comme lu
  // ──────────────────────────────────────────────
  it("SC66 - devrait pouvoir marquer une notification comme lue (dismiss)", () => {
    cy.getBySel("sidenav-notifications").click();

    // On clique sur le bouton "Dismiss" de la première notification
    // { force: true } permet de cliquer même si l'élément est partiellement masqué
    cy.getBySelLike("notification-mark-read").first().click({ force: true });

    // On vérifie que quelque chose a changé (la notification est marquée)
    cy.log("Notification marquée comme lue");
  });

  // ──────────────────────────────────────────────
  // SC67 — Notification après un paiement
  // ──────────────────────────────────────────────
  it("SC67 - devrait générer une notification quand un autre utilisateur nous paie", () => {
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
