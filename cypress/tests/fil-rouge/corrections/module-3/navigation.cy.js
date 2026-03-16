/**
 * ============================================================
 * CORRECTION — MODULE 3 : Navigation et Sidebar
 * ============================================================
 */

describe("Navigation principale", () => {
  beforeEach(() => {
    cy.task("db:seed");
    cy.login("Heath93", "s3cret");
  });

  // ──────────────────────────────────────────────
  // SC22 — Infos utilisateur dans la sidebar
  // ──────────────────────────────────────────────
  it("SC22 - devrait afficher le nom complet de l'utilisateur dans la sidebar", () => {
    cy.getBySel("sidenav-user-full-name").should("be.visible");

    // .invoke('text') extrait le texte contenu dans l'élément HTML
    // .should('not.be.empty') vérifie que ce texte n'est pas vide
    cy.getBySel("sidenav-user-full-name")
      .invoke("text")
      .should("not.be.empty");
  });

  // ──────────────────────────────────────────────
  // SC23 — Username dans la sidebar
  // ──────────────────────────────────────────────
  it("SC23 - devrait afficher le username '@Heath93' dans la sidebar", () => {
    cy.getBySel("sidenav-username").should("contain", "Heath93");
  });

  // ──────────────────────────────────────────────
  // SC24 — Solde dans la sidebar
  // ──────────────────────────────────────────────
  it("SC24 - devrait afficher le solde de l'utilisateur avec le signe $", () => {
    cy.getBySel("sidenav-user-balance").should("be.visible");

    // On extrait le texte et on vérifie qu'il contient le signe $
    cy.getBySel("sidenav-user-balance")
      .invoke("text")
      .should("contain", "$");
  });

  // ──────────────────────────────────────────────
  // SC25 — Navigation vers Home
  // ──────────────────────────────────────────────
  it("SC25 - devrait naviguer vers la page Home via la sidebar", () => {
    // D'abord on va sur une autre page
    cy.getBySel("sidenav-user-settings").click();
    cy.url().should("contain", "/user/settings");

    // Puis on revient sur Home
    cy.getBySel("sidenav-home").click();
    cy.url().should("not.contain", "/user");
  });

  // ──────────────────────────────────────────────
  // SC26 — Navigation vers My Account
  // ──────────────────────────────────────────────
  it("SC26 - devrait naviguer vers My Account et afficher le formulaire", () => {
    cy.getBySel("sidenav-user-settings").click();
    cy.url().should("contain", "/user/settings");

    // On vérifie que le formulaire de paramètres s'affiche bien
    cy.getBySel("user-settings-form").should("be.visible");
  });

  // ──────────────────────────────────────────────
  // SC27 — Navigation vers Bank Accounts
  // ──────────────────────────────────────────────
  it("SC27 - devrait naviguer vers Bank Accounts", () => {
    cy.getBySel("sidenav-bankaccounts").click();
    cy.url().should("contain", "/bankaccounts");
    cy.getBySel("bankaccount-list").should("be.visible");
  });

  // ──────────────────────────────────────────────
  // SC28 — Navigation vers Notifications
  // ──────────────────────────────────────────────
  it("SC28 - devrait naviguer vers la page des notifications", () => {
    cy.getBySel("sidenav-notifications").click();
    cy.url().should("contain", "/notifications");
    cy.getBySel("notifications-list").should("be.visible");
  });

  // ──────────────────────────────────────────────
  // SC29 — Onglets de transactions
  // ──────────────────────────────────────────────
  it("SC29 - devrait afficher les 3 onglets de transactions", () => {
    cy.getBySel("nav-public-tab").should("be.visible");
    cy.getBySel("nav-contacts-tab").should("be.visible");
    cy.getBySel("nav-personal-tab").should("be.visible");
  });

  // ──────────────────────────────────────────────
  // SC30 — Clic sur chaque onglet
  // ──────────────────────────────────────────────
  it("SC30 - devrait changer le contenu en cliquant sur chaque onglet", () => {
    // Clic sur "Friends"
    cy.getBySel("nav-contacts-tab").click();
    cy.url().should("contain", "/contacts");

    // Clic sur "Mine"
    cy.getBySel("nav-personal-tab").click();
    cy.url().should("contain", "/personal");

    // Retour sur "Everyone"
    cy.getBySel("nav-public-tab").click();
  });

  // ──────────────────────────────────────────────
  // SC31 — Bouton "New Transaction"
  // ──────────────────────────────────────────────
  it("SC31 - devrait naviguer vers la création de transaction via le bouton +", () => {
    cy.getBySel("nav-top-new-transaction").click();
    cy.url().should("contain", "/transaction/new");

    // La liste de contacts s'affiche pour choisir à qui envoyer de l'argent
    cy.getBySel("users-list").should("be.visible");
  });
});
