/**
 * ============================================================
 * CORRECTION — MODULE 5 : Timeouts et Temps d'attente
 * ============================================================
 */

describe("Gestion des temps d'attente", () => {
  beforeEach(() => {
    cy.task("db:seed");
  });

  // ──────────────────────────────────────────────
  // SC68 — Timeout personnalisé
  // ──────────────────────────────────────────────
  it("SC68 - devrait attendre le chargement de la liste avec un timeout personnalisé", () => {
    cy.login("Heath93", "s3cret");

    // Par défaut Cypress attend 4 secondes. Ici on étend à 10 secondes.
    // { timeout: 10000 } = 10000 millisecondes = 10 secondes
    cy.getBySel("transaction-list", { timeout: 10000 }).should("be.visible");

    cy.log("La liste a chargé dans les 10 secondes");
  });

  // ──────────────────────────────────────────────
  // SC69 — Intercepter un GET et vérifier la réponse
  // ──────────────────────────────────────────────
  it("SC69 - devrait intercepter le chargement des transactions", () => {
    // cy.intercept() "écoute" les requêtes réseau du navigateur
    // 'GET' = la méthode HTTP
    // '**/graphql' ou '**/transactions*' = l'URL à intercepter
    // .as('getTransactions') = on donne un nom (alias) à cette interception
    cy.intercept("GET", "/transactions/public*").as("getTransactions");

    // On se connecte via l'UI (pas cy.login) pour générer de vraies requêtes réseau
    cy.visit("/signin");
    cy.getBySel("signin-username").type("Heath93");
    cy.getBySel("signin-password").type("s3cret");
    cy.getBySel("signin-submit").click();

    // cy.wait('@alias') attend que la requête soit terminée
    // .then() nous donne accès aux détails de la requête et la réponse
    cy.wait("@getTransactions").then((interception) => {
      // interception.response = la réponse du serveur
      expect(interception.response.statusCode).to.eq(200);
      cy.log("Status : " + interception.response.statusCode);
    });

    cy.getBySel("transaction-list").should("be.visible");
  });

  // ──────────────────────────────────────────────
  // SC70 — Intercepter un POST
  // ──────────────────────────────────────────────
  it("SC70 - devrait intercepter la création d'une transaction et vérifier le body", () => {
    // On écoute les requêtes POST vers /transactions
    cy.intercept("POST", "/transactions").as("createTransaction");

    cy.login("Heath93", "s3cret");

    // On crée un paiement via l'UI
    cy.getBySel("nav-top-new-transaction").click();
    cy.getBySelLike("user-list-item").first().click();
    cy.get("#amount").type("35");
    cy.get("#transaction-create-description-input").type("Test intercept");
    cy.getBySel("transaction-create-submit-payment").click();

    // On vérifie ce que le navigateur a envoyé au serveur
    cy.wait("@createTransaction").then((interception) => {
      // interception.request.body = le body envoyé dans la requête POST
      expect(interception.request.body).to.have.property("amount");
      expect(interception.request.body).to.have.property("description");
      expect(interception.request.body.description).to.eq("Test intercept");

      // interception.response = la réponse du serveur
      expect(interception.response.statusCode).to.eq(200);
      cy.log("Transaction créée avec succès !");
    });
  });

  // ──────────────────────────────────────────────
  // SC71 — Intercepter le login
  // ──────────────────────────────────────────────
  it("SC71 - devrait intercepter le login et vérifier le user ID dans la réponse", () => {
    cy.intercept("POST", "/login").as("loginRequest");

    cy.visit("/signin");
    cy.getBySel("signin-username").type("Heath93");
    cy.getBySel("signin-password").type("s3cret");
    cy.getBySel("signin-submit").click();

    cy.wait("@loginRequest").then((interception) => {
      // On vérifie ce que le navigateur a envoyé
      expect(interception.request.body.username).to.eq("Heath93");

      // On vérifie ce que le serveur a répondu
      expect(interception.response.body.user).to.have.property("id");
      cy.log("User ID : " + interception.response.body.user.id);
    });
  });

  // ──────────────────────────────────────────────
  // SC72 — Intercepter les notifications
  // ──────────────────────────────────────────────
  it("SC72 - devrait intercepter le chargement des notifications", () => {
    cy.intercept("GET", "/notifications*").as("getNotifications");

    cy.login("Heath93", "s3cret");

    cy.wait("@getNotifications").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      cy.log("Notifications chargées");
    });
  });

  // ──────────────────────────────────────────────
  // SC73 — Skeleton loader
  // ──────────────────────────────────────────────
  it("SC73 - devrait vérifier que le skeleton loader disparaît après chargement", () => {
    cy.login("Heath93", "s3cret");

    // Le skeleton (animation de chargement) doit disparaître
    // .should('not.exist') attend que l'élément ne soit plus dans le DOM
    cy.getBySel("list-skeleton").should("not.exist");

    // Le contenu réel est maintenant visible
    cy.getBySelLike("transaction-item").should("have.length.greaterThan", 0);
  });
});
