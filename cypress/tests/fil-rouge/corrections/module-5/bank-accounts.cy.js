/**
 * ============================================================
 * CORRECTION — MODULE 5 : Comptes bancaires (Bank Accounts)
 * ============================================================
 */

describe("Gestion des comptes bancaires", () => {
  beforeEach(() => {
    cy.task("db:seed");
    cy.login("Heath93", "s3cret");
    cy.getBySel("sidenav-bankaccounts").click();
  });

  // ──────────────────────────────────────────────
  // SC79 — Liste des comptes
  // ──────────────────────────────────────────────
  it("SC79 - devrait afficher la liste des comptes bancaires", () => {
    cy.getBySel("bankaccount-list").should("be.visible");
    cy.getBySelLike("bankaccount-list-item").should("have.length.greaterThan", 0);
  });

  // ──────────────────────────────────────────────
  // SC80 — Créer un compte
  // ──────────────────────────────────────────────
  it("SC80 - devrait créer un nouveau compte bancaire", () => {
    cy.getBySel("bankaccount-new").click();
    cy.url().should("contain", "/bankaccounts/new");

    cy.getBySelLike("bankName-input").type("Banque de Test");
    cy.getBySelLike("routingNumber-input").type("123456789");
    cy.getBySelLike("accountNumber-input").type("987654321");
    cy.getBySel("bankaccount-submit").click();

    // On revient sur la liste et le nouveau compte apparaît
    cy.url().should("contain", "/bankaccounts");
    cy.getBySel("bankaccount-list").should("contain", "Banque de Test");
  });

  // ──────────────────────────────────────────────
  // SC81 — Supprimer un compte
  // ──────────────────────────────────────────────
  it("SC81 - devrait supprimer un compte bancaire", () => {
    // Cliquer sur "Delete" du premier compte
    cy.getBySelLike("bankaccount-delete").first().click();

    // Le compte est marqué "(Deleted)" mais reste visible dans la liste
    cy.getBySelLike("bankaccount-list-item").first().should("contain", "Deleted");
  });

  // ──────────────────────────────────────────────
  // SC82 — Validation du formulaire
  // ──────────────────────────────────────────────
  it("SC82 - devrait afficher des erreurs de validation", () => {
    cy.getBySel("bankaccount-new").click();

    // On tape puis on efface pour déclencher les erreurs de validation
    // .find('input') cible le vrai champ <input> dans le composant Material UI
    cy.getBySelLike("bankName-input").find("input").type("a").clear().blur();
    cy.get("#bankaccount-bankName-input-helper-text").should("be.visible");

    cy.getBySelLike("routingNumber-input").find("input").type("1").clear().blur();
    cy.get("#bankaccount-routingNumber-input-helper-text").should("be.visible");

    cy.getBySelLike("accountNumber-input").find("input").type("1").clear().blur();
    cy.get("#bankaccount-accountNumber-input-helper-text").should("be.visible");

    // Le bouton est disabled car le formulaire est invalide
    cy.getBySel("bankaccount-submit").should("be.disabled");
  });
});
