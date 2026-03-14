/**
 * ============================================================
 * TP FIL ROUGE — MODULE 6 : Tests API — Utilisateurs
 * ============================================================
 *
 * OBJECTIF :
 * Tester les endpoints API liés aux utilisateurs.
 * ============================================================
 */

describe("API — Utilisateurs", () => {
  const apiUrl = Cypress.env("apiUrl") || "http://localhost:3001";

  beforeEach(() => {
    cy.task("db:seed");
    cy.loginByApi("Heath93");
  });

  // ──────────────────────────────────────────────
  // SC92 — GET : Liste des utilisateurs
  // ──────────────────────────────────────────────
  it("SC92 - GET /users - devrait retourner la liste de tous les utilisateurs", () => {
    // TODO :
    // cy.request('GET', `${apiUrl}/users`)
    //   .then((response) => {
    //     expect(response.status).to.eq(200)
    //     expect(response.body.results).to.be.an('array')
    //     expect(response.body.results.length).to.eq(5)
    //     cy.log('Utilisateurs : ' + response.body.results.map(u => u.username).join(', '))
    //   })
  });

  // ──────────────────────────────────────────────
  // SC93 — GET : Rechercher un utilisateur
  // ──────────────────────────────────────────────
  it("SC93 - GET /users/search?q=Arvilla - devrait trouver l'utilisateur", () => {
    // TODO :
    // cy.request('GET', `${apiUrl}/users/search?q=Arvilla`)
    //   .then((response) => {
    //     expect(response.status).to.eq(200)
    //     expect(response.body.results).to.be.an('array')
    //     expect(response.body.results.length).to.be.greaterThan(0)
    //     expect(response.body.results[0].username).to.contain('Arvilla')
    //   })
  });

  // ──────────────────────────────────────────────
  // SC94 — GET : Profil d'un utilisateur
  // ──────────────────────────────────────────────
  it("SC94 - GET /users/profile/:username - devrait retourner le profil public", () => {
    // TODO :
    // cy.request('GET', `${apiUrl}/users/profile/Heath93`)
    //   .then((response) => {
    //     expect(response.status).to.eq(200)
    //     expect(response.body.user).to.have.property('firstName')
    //     expect(response.body.user).to.have.property('lastName')
    //     expect(response.body.user).to.have.property('avatar')
    //     cy.log('Profil : ' + response.body.user.firstName + ' ' + response.body.user.lastName)
    //   })
  });

  // ──────────────────────────────────────────────
  // SC95 — PATCH : Modifier le profil
  // ──────────────────────────────────────────────
  it("SC95 - PATCH /users/:id - devrait modifier les infos de l'utilisateur", () => {
    // TODO :
    // 1. D'abord, récupérer l'ID de l'utilisateur
    // cy.request('GET', `${apiUrl}/users`)
    //   .then((response) => {
    //     const user = response.body.results.find(u => u.username === 'Heath93')
    //
    //     // 2. Modifier le prénom
    //     return cy.request('PATCH', `${apiUrl}/users/${user.id}`, {
    //       firstName: 'Modifié',
    //       lastName: 'ViaAPI',
    //     })
    //   })
    //   .then((response) => {
    //     expect(response.status).to.eq(204)
    //   })
    //
    // 3. Vérifier que la modification est persistée
    // cy.request('GET', `${apiUrl}/users/profile/Heath93`)
    //   .then((response) => {
    //     expect(response.body.user.firstName).to.eq('Modifié')
    //   })
  });

  // ──────────────────────────────────────────────
  // SC96 — POST : Créer un nouvel utilisateur (signup)
  // ──────────────────────────────────────────────
  it("SC96 - POST /users - devrait créer un nouvel utilisateur", () => {
    // TODO :
    // cy.request('POST', `${apiUrl}/users`, {
    //   firstName: 'API',
    //   lastName: 'User',
    //   username: 'ApiUser' + Date.now(),
    //   password: 'Test1234!',
    //   confirmPassword: 'Test1234!',
    // })
    // .then((response) => {
    //   expect(response.status).to.eq(201)
    //   expect(response.body.user).to.have.property('id')
    //   expect(response.body.user.username).to.contain('ApiUser')
    //   cy.log('Utilisateur créé : ' + response.body.user.id)
    // })
  });
});
