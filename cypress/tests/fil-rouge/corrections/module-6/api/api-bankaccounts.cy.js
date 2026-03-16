/**
 * ============================================================
 * CORRECTION — MODULE 6 : Tests API — Bank Accounts
 * ============================================================
 */

describe("API — Bank Accounts", () => {
  const apiUrl = Cypress.env("apiUrl") || "http://localhost:3001";

  beforeEach(() => {
    cy.task("db:seed");
    cy.loginByApi("Heath93");
  });

  it("SC97 - GET /bankAccounts - liste des comptes", () => {
    cy.request("GET", `${apiUrl}/bankAccounts`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.results).to.be.an("array");
      const account = response.body.results[0];
      expect(account).to.have.property("bankName");
      expect(account).to.have.property("accountNumber");
      expect(account).to.have.property("routingNumber");
    });
  });

  it("SC98 - POST /bankAccounts - créer un compte", () => {
    cy.request("POST", `${apiUrl}/bankAccounts`, {
      bankName: "Banque API Test",
      accountNumber: "111222333444",
      routingNumber: "555666777",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.account).to.have.property("id");
      expect(response.body.account.bankName).to.eq("Banque API Test");
    });
  });

  it("SC99 - DELETE /bankAccounts/:id - supprimer un compte", () => {
    // D'abord récupérer un ID
    cy.request("GET", `${apiUrl}/bankAccounts`).then((response) => {
      const accountId = response.body.results[0].id;

      cy.request("DELETE", `${apiUrl}/bankAccounts/${accountId}`).then(
        (response) => {
          expect(response.status).to.eq(200);
        }
      );
    });
  });
});
