/**
 * ============================================================
 * CORRECTION — MODULE 4 : Créer un paiement (Payment)
 * ============================================================
 */

describe("Créer un paiement", () => {
  beforeEach(() => {
    cy.task("db:seed");
    cy.login("Heath93", "s3cret");
    cy.getBySel("nav-top-new-transaction").click();
  });

  // ──────────────────────────────────────────────
  // SC45 — Affichage de la liste des contacts
  // ──────────────────────────────────────────────
  it("SC45 - devrait afficher la liste des contacts disponibles", () => {
    cy.getBySel("users-list").should("be.visible");
    cy.getBySelLike("user-list-item").should("have.length.greaterThan", 0);

    cy.getBySelLike("user-list-item").then(($items) => {
      cy.log("Nombre de contacts : " + $items.length);
    });
  });

  // ──────────────────────────────────────────────
  // SC46 — Rechercher un contact
  // ──────────────────────────────────────────────
  it("SC46 - devrait filtrer les contacts en tapant dans le champ de recherche", () => {
    // On tape dans le champ de recherche
    cy.get('[data-test="user-list-search-input"]').type("Arvilla");

    // La liste filtrée ne contient qu'un seul résultat
    cy.getBySelLike("user-list-item")
      .should("have.length", 1)
      .and("contain", "Arvilla");
  });

  // ──────────────────────────────────────────────
  // SC47 — Paiement valide complet
  // ──────────────────────────────────────────────
  it("SC47 - devrait effectuer un paiement de 50$ à Arvilla_Hegmann", () => {
    // 1. Sélectionner le contact
    cy.getBySelLike("user-list-item").contains("Arvilla").click();

    // 2. Remplir le formulaire
    cy.get("#amount").type("50");
    cy.get("#transaction-create-description-input").type("Remboursement restaurant");

    // 3. Cliquer sur "Pay"
    cy.getBySel("transaction-create-submit-payment").click();

    // 4. Vérifier le succès avec des assertions MULTIPLES
    // .should() + .and() = on vérifie 2 choses sur le même élément
    cy.get('[data-test="alert-bar-success"]')
      .should("be.visible")
      .and("contain", "Paid");
  });

  // ──────────────────────────────────────────────
  // SC48 — Vérifier que le solde diminue
  // ──────────────────────────────────────────────
  it("SC48 - devrait diminuer le solde après un paiement", () => {
    // Variable pour stocker le solde avant le paiement
    let soldeAvant;

    // 1. On capture le solde AVANT
    cy.getBySel("sidenav-user-balance")
      .invoke("text")
      .then((text) => {
        // On convertit "$1,234.56" en nombre 1234.56
        soldeAvant = parseFloat(text.replace(/[$,]/g, ""));
        cy.log("Solde AVANT : " + soldeAvant);
      });

    // 2. On fait un paiement de 10$
    cy.getBySelLike("user-list-item").first().click();
    cy.get("#amount").type("10");
    cy.get("#transaction-create-description-input").type("Test solde");
    cy.getBySel("transaction-create-submit-payment").click();

    // 3. On revient au dashboard
    cy.getBySel("new-transaction-return-to-transactions").click();

    // 4. On capture le solde APRÈS et on compare
    cy.getBySel("sidenav-user-balance")
      .invoke("text")
      .then((text) => {
        const soldeApres = parseFloat(text.replace(/[$,]/g, ""));
        cy.log("Solde APRÈS : " + soldeApres);

        // Le solde doit avoir diminué
        expect(soldeApres).to.be.lessThan(soldeAvant);
      });
  });

  // ──────────────────────────────────────────────
  // SC49 — Bouton Pay disabled si montant vide
  // ──────────────────────────────────────────────
  it("SC49 - devrait désactiver le bouton Pay si le montant est vide", () => {
    cy.getBySelLike("user-list-item").first().click();

    // Sans montant ni description → bouton disabled
    cy.getBySel("transaction-create-submit-payment").should("be.disabled");

    // On remplit les deux champs → bouton actif
    cy.get("#amount").type("25");
    cy.get("#transaction-create-description-input").type("Test");
    cy.getBySel("transaction-create-submit-payment").should("not.be.disabled");
  });

  // ──────────────────────────────────────────────
  // SC50 — Erreur si description vide
  // ──────────────────────────────────────────────
  it("SC50 - devrait afficher une erreur si la description est vide", () => {
    cy.getBySelLike("user-list-item").first().click();
    cy.get("#amount").type("25");

    // On clique sur la description puis on quitte le champ sans rien taper
    // .click() puis .blur() = focus puis perte de focus (déclenche la validation)
    cy.get("#transaction-create-description-input").click().blur();

    // Le message d'erreur apparaît
    cy.get("#transaction-create-description-input-helper-text")
      .should("be.visible")
      .and("contain", "Please enter a note");
  });

  // ──────────────────────────────────────────────
  // SC51 — Créer un autre paiement
  // ──────────────────────────────────────────────
  it("SC51 - devrait pouvoir créer un autre paiement via 'Create Another Transaction'", () => {
    // Premier paiement
    cy.getBySelLike("user-list-item").first().click();
    cy.get("#amount").type("10");
    cy.get("#transaction-create-description-input").type("Premier paiement");
    cy.getBySel("transaction-create-submit-payment").click();

    // Cliquer sur "Create Another Transaction"
    cy.getBySel("new-transaction-create-another-transaction").click();

    // On revient sur la liste de contacts
    cy.getBySel("users-list").should("be.visible");

    // Deuxième paiement
    cy.getBySelLike("user-list-item").first().click();
    cy.get("#amount").type("20");
    cy.get("#transaction-create-description-input").type("Deuxième paiement");
    cy.getBySel("transaction-create-submit-payment").click();

    // Vérifier le succès
    cy.get('[data-test="alert-bar-success"]').should("be.visible");
  });

  // ──────────────────────────────────────────────
  // SC52 — Retour aux transactions
  // ──────────────────────────────────────────────
  it("SC52 - devrait retourner à la liste des transactions après un paiement", () => {
    cy.getBySelLike("user-list-item").first().click();
    cy.get("#amount").type("5");
    cy.get("#transaction-create-description-input").type("Petit test");
    cy.getBySel("transaction-create-submit-payment").click();

    // Cliquer sur "Return To Transactions"
    cy.getBySel("new-transaction-return-to-transactions").click();

    // On est de retour sur le dashboard
    cy.getBySelLike("transaction-item").should("have.length.greaterThan", 0);
  });
});
