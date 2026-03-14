/**
 * ============================================================
 * CORRECTION — MODULE 4 : Demander un paiement (Request)
 * ============================================================
 */

describe("Demander un paiement (Request)", () => {
  beforeEach(() => {
    cy.task("db:seed");
  });

  // ──────────────────────────────────────────────
  // SC53 — Envoyer une demande de paiement
  // ──────────────────────────────────────────────
  it("SC53 - devrait envoyer une demande de paiement (Request)", () => {
    cy.login("Heath93", "s3cret");
    cy.getBySel("nav-top-new-transaction").click();
    cy.getBySelLike("user-list-item").contains("Arvilla").click();
    cy.get("#amount").type("30");
    cy.get("#transaction-create-description-input").type("Remboursement cinéma");

    // On clique sur "Request" (pas "Pay")
    cy.getBySel("transaction-create-submit-request").click();

    // Le message dit "Requested" (pas "Paid")
    cy.get('[data-test="alert-bar-success"]')
      .should("be.visible")
      .and("contain", "Requested");
  });

  // ──────────────────────────────────────────────
  // SC54 — Voir la demande dans l'onglet "Mine"
  // ──────────────────────────────────────────────
  it("SC54 - devrait voir la demande dans l'onglet Mine", () => {
    cy.login("Heath93", "s3cret");

    // Créer la request
    cy.getBySel("nav-top-new-transaction").click();
    cy.getBySelLike("user-list-item").contains("Arvilla").click();
    cy.get("#amount").type("30");
    cy.get("#transaction-create-description-input").type("Test Mine");
    cy.getBySel("transaction-create-submit-request").click();

    // Retourner aux transactions
    cy.getBySel("new-transaction-return-to-transactions").click();

    // Aller sur l'onglet "Mine"
    cy.getBySel("nav-personal-tab").click();

    // Vérifier qu'il y a des transactions
    cy.getBySelLike("transaction-item").should("have.length.greaterThan", 0);
  });

  // ──────────────────────────────────────────────
  // SC55 — Accepter une demande de paiement (multi-utilisateur)
  // ──────────────────────────────────────────────
  it("SC55 - devrait accepter une demande de paiement reçue", () => {
    // ÉTAPE 1 : Heath93 envoie une Request à Arvilla
    cy.login("Heath93", "s3cret");
    cy.getBySel("nav-top-new-transaction").click();
    cy.getBySelLike("user-list-item").contains("Arvilla").click();
    cy.get("#amount").type("25");
    cy.get("#transaction-create-description-input").type("Accepte stp");
    cy.getBySel("transaction-create-submit-request").click();

    // Se déconnecter
    cy.getBySel("sidenav-signout").click();

    // ÉTAPE 2 : Arvilla se connecte et accepte
    cy.login("Arvilla_Hegmann", "s3cret");

    // Aller sur l'onglet "Mine" pour voir les transactions personnelles
    cy.getBySel("nav-personal-tab").click();

    // Cliquer sur la première transaction
    cy.getBySelLike("transaction-item").first().click();

    // Cliquer sur "Accept" pour accepter la demande
    cy.getBySelLike("transaction-accept-request").click();

    // Vérifier visuellement que la page se met à jour
    cy.getBySelLike("transaction-accept-request").should("not.exist");
  });

  // ──────────────────────────────────────────────
  // SC56 — Rejeter une demande de paiement
  // ──────────────────────────────────────────────
  it("SC56 - devrait rejeter une demande de paiement reçue", () => {
    // ÉTAPE 1 : Heath93 envoie une Request à Dina
    cy.login("Heath93", "s3cret");
    cy.getBySel("nav-top-new-transaction").click();
    cy.getBySelLike("user-list-item").contains("Dina").click();
    cy.get("#amount").type("50");
    cy.get("#transaction-create-description-input").type("Rejette stp");
    cy.getBySel("transaction-create-submit-request").click();
    cy.getBySel("sidenav-signout").click();

    // ÉTAPE 2 : Dina se connecte et rejette
    cy.login("Dina20", "s3cret");
    cy.getBySel("nav-personal-tab").click();
    cy.getBySelLike("transaction-item").first().click();

    // Cliquer sur "Reject" au lieu de "Accept"
    cy.getBySelLike("transaction-reject-request").click();

    // Le bouton Reject disparaît après le clic
    cy.getBySelLike("transaction-reject-request").should("not.exist");
  });

  // ──────────────────────────────────────────────
  // SC57 — Détails d'une Request
  // ──────────────────────────────────────────────
  it("SC57 - devrait afficher les détails corrects d'une Request", () => {
    cy.login("Heath93", "s3cret");

    // Créer une request
    cy.getBySel("nav-top-new-transaction").click();
    cy.getBySelLike("user-list-item").contains("Arvilla").click();
    cy.get("#amount").type("75");
    cy.get("#transaction-create-description-input").type("Loyer");
    cy.getBySel("transaction-create-submit-request").click();

    // Retour et vérification
    cy.getBySel("new-transaction-return-to-transactions").click();
    cy.getBySel("nav-personal-tab").click();
    cy.getBySelLike("transaction-item").first().click();

    // Vérifier les détails
    cy.getBySelLike("sender").should("be.visible");
    cy.getBySelLike("receiver").should("be.visible");
    cy.getBySelLike("transaction-amount").should("contain", "$75");
    cy.getBySelLike("transaction-description").should("contain", "Loyer");
  });
});
