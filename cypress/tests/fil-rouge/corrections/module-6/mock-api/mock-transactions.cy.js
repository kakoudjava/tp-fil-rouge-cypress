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
    // On fournit des données complètes pour éviter les erreurs dans l'UI
    cy.intercept("GET", "**/transactions/public*", {
      body: {
        results: [
          {
            id: "mock-1",
            uuid: "mock-1",
            source: "mock-source",
            amount: 5000,
            description: "Transaction mockée 1",
            receiverName: "Mock User",
            senderName: "Mock Sender",
            receiverId: "mock-receiver",
            senderId: "mock-sender",
            balanceAtCompletion: 10000,
            status: "complete",
            requestStatus: "",
            requestResolvedAt: "",
            createdAt: new Date().toISOString(),
            modifiedAt: new Date().toISOString(),
            likes: [],
            comments: [],
          },
        ],
        pageData: {
          page: 1,
          limit: 10,
          hasNextPages: false,
          totalPages: 1,
        },
      },
    }).as("mockTransactions");

    // cy.login() connecte via l'UI (visite /signin, tape les identifiants)
    // cy.visit("/") charge ensuite la page d'accueil et déclenche les requêtes
    cy.login("Heath93", "s3cret");
    cy.visit("/");
    cy.wait("@mockTransactions");

    // L'UI affiche les données mockées (pas les vraies)
    cy.contains("Transaction mockée 1").should("be.visible");
  });

  // ──────────────────────────────────────────────
  // SC101 — Simuler une erreur 500
  // ──────────────────────────────────────────────
  it("SC101 - devrait gérer une erreur serveur 500", () => {
    // On retourne un status 500 au lieu de 200
    cy.intercept("GET", "**/transactions/public*", {
      statusCode: 500,
      body: { error: "Internal Server Error" },
    }).as("serverError");

    cy.login("Heath93", "s3cret");
    cy.visit("/");
    cy.wait("@serverError");

    // L'app devrait gérer l'erreur (pas de crash)
    cy.log("Erreur 500 simulée — L'app gère l'erreur");
  });

  // ──────────────────────────────────────────────
  // SC102 — Simuler un chargement lent
  // ──────────────────────────────────────────────
  it("SC102 - devrait afficher un loader pendant un chargement lent", () => {
    // req.reply() permet de personnaliser la réponse avec un délai
    cy.intercept("GET", "**/transactions/public*", (req) => {
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
    cy.visit("/");

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
    cy.intercept("POST", "**/transactions").as("createTransaction");

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
    cy.intercept("GET", "**/notifications*", {
      body: { results: [] },
    }).as("emptyNotifications");

    // cy.loginByApi() envoie un POST /login sans passer par l'UI
    // Puis cy.visit("/") charge la page d'accueil
    cy.loginByApi("Heath93");
    cy.visit("/");

    // Vérifier que l'intercept a bien été déclenché
    cy.wait("@emptyNotifications");
    cy.log("Notifications mockées avec une liste vide");
  });

  // ──────────────────────────────────────────────
  // SC105 — Intercepter plusieurs requêtes en même temps
  // ──────────────────────────────────────────────
  it("SC105 - devrait intercepter login + transactions + notifications", () => {
    // On met en place TOUS les intercepts AVANT de se connecter
    cy.intercept("POST", "**/login").as("loginRequest");
    cy.intercept("GET", "**/transactions/public*").as("getTransactions");
    cy.intercept("GET", "**/notifications*").as("getNotifications");

    // Se connecter via l'UI (déclenche toutes les requêtes)
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
