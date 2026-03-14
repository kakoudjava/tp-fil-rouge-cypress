/**
 * ============================================================
 * CORRECTION — MODULE 6 : Mock API avec cy.intercept()
 * ============================================================
 */

describe("Mock API — Scénarios simulés", () => {
  beforeEach(() => {
    cy.task("db:seed");
  });

  // ──────────────────────────────────────────────
  // SC100 — Mocker la liste de transactions
  // ──────────────────────────────────────────────
  it("SC100 - devrait afficher des transactions mockées", () => {
    // cy.intercept() remplace la vraie réponse du serveur par notre réponse fictive
    cy.intercept("GET", "/transactions*", {
      body: {
        results: [
          { id: "mock-1", amount: 5000, description: "Transaction mockée 1" },
          { id: "mock-2", amount: 3000, description: "Transaction mockée 2" },
        ],
        pageData: {
          page: 1,
          limit: 10,
          hasNextPages: false,
          totalPages: 1,
        },
      },
    }).as("mockTransactions");

    cy.login("Heath93", "s3cret");
    cy.wait("@mockTransactions");

    // L'UI affiche les données mockées (pas les vraies)
    cy.log("Transactions mockées chargées");
  });

  // ──────────────────────────────────────────────
  // SC101 — Simuler une erreur 500
  // ──────────────────────────────────────────────
  it("SC101 - devrait gérer une erreur serveur 500", () => {
    // On retourne un status 500 au lieu de 200
    cy.intercept("GET", "/transactions*", {
      statusCode: 500,
      body: { error: "Internal Server Error" },
    }).as("serverError");

    cy.login("Heath93", "s3cret");
    cy.wait("@serverError");

    // L'app devrait gérer l'erreur (pas de crash)
    cy.log("Erreur 500 simulée — L'app gère l'erreur");
  });

  // ──────────────────────────────────────────────
  // SC102 — Simuler un chargement lent
  // ──────────────────────────────────────────────
  it("SC102 - devrait afficher un loader pendant un chargement lent", () => {
    // req.reply() permet de personnaliser la réponse avec un délai
    cy.intercept("GET", "/transactions*", (req) => {
      req.reply({
        delay: 3000, // 3 secondes de délai
        body: {
          results: [],
          pageData: {
            page: 1,
            limit: 10,
            hasNextPages: false,
            totalPages: 1,
          },
        },
      });
    }).as("slowResponse");

    cy.login("Heath93", "s3cret");

    // Pendant le chargement, le skeleton loader est visible
    cy.getBySel("list-skeleton").should("exist");

    // Après le chargement (3 sec), le loader disparaît
    cy.wait("@slowResponse");
    cy.getBySel("list-skeleton").should("not.exist");
  });

  // ──────────────────────────────────────────────
  // SC103 — Intercepter un POST et vérifier le body
  // ──────────────────────────────────────────────
  it("SC103 - devrait intercepter et vérifier les données d'un paiement", () => {
    cy.login("Heath93", "s3cret");

    // On intercepte SANS modifier la réponse (juste observer)
    cy.intercept("POST", "/transactions").as("createTransaction");

    // On crée un paiement via l'UI
    cy.getBySel("nav-top-new-transaction").click();
    cy.getBySelLike("user-list-item").first().click();
    cy.get("#amount").type("42");
    cy.get("#transaction-create-description-input").type("Test intercept POST");
    cy.getBySel("transaction-create-submit-payment").click();

    // On vérifie les données envoyées et reçues
    cy.wait("@createTransaction").then((interception) => {
      // Ce que le navigateur a envoyé au serveur
      expect(interception.request.body).to.have.property("amount");
      expect(interception.request.body).to.have.property("description");
      expect(interception.request.body.description).to.eq(
        "Test intercept POST"
      );

      // Ce que le serveur a répondu
      expect(interception.response.statusCode).to.eq(200);
    });
  });

  // ──────────────────────────────────────────────
  // SC104 — Mocker les notifications (liste vide)
  // ──────────────────────────────────────────────
  it("SC104 - devrait mocker les notifications avec une liste vide", () => {
    cy.intercept("GET", "/notifications*", {
      body: { results: [] },
    }).as("emptyNotifications");

    cy.login("Heath93", "s3cret");

    // Le badge de notifications ne devrait pas afficher de nombre
    cy.log("Notifications mockées avec une liste vide");
  });

  // ──────────────────────────────────────────────
  // SC105 — Intercepter plusieurs requêtes en même temps
  // ──────────────────────────────────────────────
  it("SC105 - devrait intercepter login + transactions + notifications", () => {
    // On met en place TOUS les intercepts AVANT de se connecter
    cy.intercept("POST", "/login").as("loginRequest");
    cy.intercept("GET", "/transactions*").as("getTransactions");
    cy.intercept("GET", "/notifications*").as("getNotifications");

    // Se connecter (déclenche toutes les requêtes)
    cy.visit("/signin");
    cy.getBySel("signin-username").type("Heath93");
    cy.getBySel("signin-password").type("s3cret");
    cy.getBySel("signin-submit").click();

    // Vérifier chaque requête une par une
    cy.wait("@loginRequest").then((interception) => {
      cy.log("Login : " + interception.response.statusCode);
      expect(interception.response.statusCode).to.eq(200);
    });

    cy.wait("@getTransactions").then((interception) => {
      cy.log("Transactions : " + interception.response.statusCode);
    });

    cy.wait("@getNotifications").then((interception) => {
      cy.log("Notifications : " + interception.response.statusCode);
    });
  });
});
