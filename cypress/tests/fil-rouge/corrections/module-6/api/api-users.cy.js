/**
 * ============================================================
 * CORRECTION — MODULE 6 : Tests API — Utilisateurs
 * ============================================================
 */

describe("API — Utilisateurs", () => {
  const apiUrl = Cypress.env("apiUrl") || "http://localhost:3001";

  beforeEach(() => {
    cy.task("db:seed");
    cy.loginByApi("Heath93");
  });

  it("SC92 - GET /users - liste des utilisateurs", () => {
    cy.request("GET", `${apiUrl}/users`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.results).to.be.an("array");
      expect(response.body.results.length).to.be.greaterThan(0);
      cy.log(
        "Users : " + response.body.results.map((u) => u.username).join(", ")
      );
    });
  });

  it("SC93 - GET /users/search?q=Arvilla - rechercher un utilisateur", () => {
    cy.request("GET", `${apiUrl}/users/search?q=Arvilla`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.results.length).to.be.greaterThan(0);
      expect(response.body.results[0].username).to.contain("Arvilla");
    });
  });

  it("SC94 - GET /users/profile/:username - profil public", () => {
    cy.request("GET", `${apiUrl}/users/profile/Heath93`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.user).to.have.property("firstName");
      expect(response.body.user).to.have.property("lastName");
    });
  });

  it("SC95 - PATCH /users/:id - modifier le profil", () => {
    // GET /users ne retourne PAS l'utilisateur connecté
    // On utilise cy.database() pour récupérer notre propre ID
    cy.database("find", "users", { username: "Heath93" }).then((user) => {
      // Modifier le prénom
      cy.request("PATCH", `${apiUrl}/users/${user.id}`, {
        firstName: "Modifié",
        lastName: "ViaAPI",
      }).then((response) => {
        expect(response.status).to.eq(204);
      });
    });
  });

  it("SC96 - POST /users - créer un utilisateur", () => {
    cy.request("POST", `${apiUrl}/users`, {
      firstName: "API",
      lastName: "User",
      username: "ApiUser" + Date.now(),
      password: "Test1234!",
      confirmPassword: "Test1234!",
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.user).to.have.property("id");
    });
  });
});
