/**
 * ============================================================
 * CORRECTION — MODULE 6 : Tests API — Transactions
 * ============================================================
 */

describe("API — Transactions", () => {
  const apiUrl = Cypress.env("apiUrl") || "http://localhost:3001";

  beforeEach(() => {
    cy.task("db:seed");
    // cy.loginByApi() envoie une requête POST /login
    // pour obtenir un cookie de session (sans charger l'UI)
    cy.loginByApi("Heath93");
  });

  // ──────────────────────────────────────────────
  // SC86 — GET transactions publiques
  // ──────────────────────────────────────────────
  it("SC86 - GET /transactions/public", () => {
    // cy.request() envoie une vraie requête HTTP au serveur
    cy.request("GET", `${apiUrl}/transactions/public`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("results");
      expect(response.body.results).to.be.an("array");
      expect(response.body.results.length).to.be.greaterThan(0);
      cy.log("Transactions publiques : " + response.body.results.length);
    });
  });

  // ──────────────────────────────────────────────
  // SC87 — GET transactions de l'utilisateur
  // ──────────────────────────────────────────────
  it("SC87 - GET /transactions", () => {
    cy.request("GET", `${apiUrl}/transactions`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("results");

      // On vérifie la structure du premier résultat
      if (response.body.results.length > 0) {
        const first = response.body.results[0];
        expect(first).to.have.property("id");
        expect(first).to.have.property("amount");
        expect(first).to.have.property("description");
        expect(first).to.have.property("senderId");
        expect(first).to.have.property("receiverId");
      }
    });
  });

  // ──────────────────────────────────────────────
  // SC88 — GET transaction par ID
  // ──────────────────────────────────────────────
  it("SC88 - GET /transactions/:id", () => {
    // D'abord on récupère la liste pour avoir un ID
    cy.request("GET", `${apiUrl}/transactions`).then((response) => {
      const transactionId = response.body.results[0].id;

      // Puis on récupère cette transaction précise
      cy.request("GET", `${apiUrl}/transactions/${transactionId}`).then(
        (response) => {
          expect(response.status).to.eq(200);
          expect(response.body.transaction).to.have.property("id");
          expect(response.body.transaction.id).to.eq(transactionId);
        }
      );
    });
  });

  // ──────────────────────────────────────────────
  // SC89 — POST créer une transaction
  // ──────────────────────────────────────────────
  it("SC89 - POST /transactions", () => {
    // GET /users retourne tous les utilisateurs SAUF l'utilisateur connecté
    // Donc pour Heath93, il faut chercher le receiver dans la liste
    // et récupérer son propre ID via la base de données
    cy.database("find", "users", { username: "Heath93" }).then((sender) => {
      cy.request("GET", `${apiUrl}/users`).then((response) => {
        const receiver = response.body.results.find(
          (u) => u.username === "Arvilla_Hegmann"
        );

        // Puis on crée la transaction
        cy.request("POST", `${apiUrl}/transactions`, {
          type: "payment",
          source: sender.id,
          senderId: sender.id,
          receiverId: receiver.id,
          amount: 2500, // En centimes = 25.00$
          description: "Test API - Paiement",
          transactionType: "payment",
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.transaction).to.have.property("id");
          expect(response.body.transaction.description).to.eq(
            "Test API - Paiement"
          );
          cy.log("Transaction créée : " + response.body.transaction.id);
        });
      });
    });
  });

  // ──────────────────────────────────────────────
  // SC90 — PATCH mettre à jour une transaction
  // ──────────────────────────────────────────────
  it("SC90 - PATCH /transactions/:id", () => {
    // On cherche une transaction à mettre à jour
    cy.request("GET", `${apiUrl}/transactions`).then((response) => {
      const transaction = response.body.results[0];

      cy.request("PATCH", `${apiUrl}/transactions/${transaction.id}`, {
        requestStatus: "accepted",
      }).then((response) => {
        expect(response.status).to.eq(204);
      });
    });
  });

  // ──────────────────────────────────────────────
  // SC91 — GET transactions entre contacts
  // ──────────────────────────────────────────────
  it("SC91 - GET /transactions/contacts", () => {
    cy.request("GET", `${apiUrl}/transactions/contacts`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("results");
      cy.log("Transactions contacts : " + response.body.results.length);
    });
  });
});
