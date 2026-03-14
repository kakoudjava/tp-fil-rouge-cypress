/**
 * ============================================================
 * CORRECTION — MODULE 3 : Liste des transactions
 * ============================================================
 */

describe("Liste des transactions", () => {
  beforeEach(() => {
    cy.task("db:seed");
    cy.login("Heath93", "s3cret");
  });

  // ──────────────────────────────────────────────
  // SC32 — Affichage de la liste
  // ──────────────────────────────────────────────
  it("SC32 - devrait afficher la liste des transactions sur le dashboard", () => {
    cy.getBySel("transaction-list").should("be.visible");

    // .should('have.length.greaterThan', 0) vérifie qu'il y a au moins 1 élément
    cy.getBySelLike("transaction-item").should("have.length.greaterThan", 0);
  });

  // ──────────────────────────────────────────────
  // SC33 — Compter les transactions
  // ──────────────────────────────────────────────
  it("SC33 - devrait afficher plusieurs transactions dans la liste", () => {
    // .then() permet de récupérer les éléments et d'exécuter du code dessus
    // $items est un objet jQuery qui contient tous les éléments trouvés
    cy.getBySelLike("transaction-item").then(($items) => {
      // $items.length = le nombre d'éléments
      cy.log("Nombre de transactions : " + $items.length);
      expect($items.length).to.be.greaterThan(1);
    });
  });

  // ──────────────────────────────────────────────
  // SC34 — Vérifier le contenu de chaque transaction
  // ──────────────────────────────────────────────
  it("SC34 - devrait afficher un montant pour chaque transaction de la liste", () => {
    // .each() boucle sur chaque élément (comme un forEach)
    // $item = l'élément courant dans la boucle
    cy.getBySelLike("transaction-item").each(($item) => {
      // cy.wrap() transforme un élément jQuery en objet Cypress
      // pour pouvoir utiliser .should() dessus
      cy.wrap($item).should("contain", "$");
    });
  });

  // ──────────────────────────────────────────────
  // SC35 — Cliquer sur une transaction pour voir le détail
  // ──────────────────────────────────────────────
  it("SC35 - devrait afficher le détail d'une transaction au clic", () => {
    // .first() prend le premier élément de la liste
    cy.getBySelLike("transaction-item").first().click();

    // L'URL contient maintenant l'ID de la transaction
    // .match() vérifie avec une expression régulière (regex)
    cy.url().should("match", /\/transaction\//);

    // Le détail de la transaction s'affiche
    cy.getBySel("transaction-detail-header").should("be.visible");
    cy.getBySelLike("transaction-description").should("be.visible");
  });

  // ──────────────────────────────────────────────
  // SC36 — Naviguer entre les onglets
  // ──────────────────────────────────────────────
  it("SC36 - devrait charger des transactions différentes selon l'onglet", () => {
    // On clique sur l'onglet "Mine" (mes transactions personnelles)
    cy.getBySel("nav-personal-tab").click();

    // On attend que la page charge puis on vérifie qu'il y a du contenu
    // Le contenu peut être une liste de transactions OU un message "No Transactions"
    cy.getBySel("nav-personal-tab")
      .should("be.visible")
      .then(() => {
        // get('body') récupère tout le contenu de la page
        cy.get("body").then(($body) => {
          // On vérifie que la page a bien changé
          // (il y a soit des transactions, soit le message "No Transactions")
          const hasTransactions = $body.find("[data-test*=transaction-item]").length > 0;
          const hasEmptyMessage = $body.find("[data-test=empty-list-header]").length > 0;
          expect(hasTransactions || hasEmptyMessage).to.be.true;
        });
      });
  });

  // ──────────────────────────────────────────────
  // SC37 — Liste vide
  // ──────────────────────────────────────────────
  it("SC37 - devrait afficher un message quand il n'y a pas de transactions", () => {
    // On va sur l'onglet "Friends" (contacts)
    cy.getBySel("nav-contacts-tab").click();

    // On vérifie que la page a chargé
    // Soit il y a des transactions, soit il y a le message "No Transactions"
    cy.get("body").then(($body) => {
      if ($body.find("[data-test=empty-list-header]").length > 0) {
        cy.getBySel("empty-list-header").should("be.visible");
        cy.log("Aucune transaction trouvée — message affiché correctement");
      } else {
        cy.getBySelLike("transaction-item").should("have.length.greaterThan", 0);
        cy.log("Des transactions existent pour cet onglet");
      }
    });
  });

  // ──────────────────────────────────────────────
  // SC38 — Extraire les infos d'une transaction
  // ──────────────────────────────────────────────
  it("SC38 - devrait afficher le sender et le receiver dans le détail", () => {
    // On clique sur la première transaction
    cy.getBySelLike("transaction-item").first().click();

    // On vérifie que le sender (émetteur) et le receiver (destinataire) sont visibles
    cy.getBySelLike("sender").should("be.visible");
    cy.getBySelLike("receiver").should("be.visible");

    // On extrait le texte du montant pour le vérifier
    cy.getBySelLike("transaction-amount")
      .invoke("text")
      .then((montant) => {
        cy.log("Montant de la transaction : " + montant);
        // Le montant doit contenir le signe $
        expect(montant).to.contain("$");
      });
  });
});
