/**
 * ============================================================
 * TP FIL ROUGE — MODULE 2 : Inscription (Sign Up)
 * ============================================================
 *
 * OBJECTIF :
 * Tester le formulaire d'inscription de l'application.
 * Tu vas utiliser describe, it, beforeEach, et les commandes
 * de base de Cypress (visit, get, type, click, should).
 *
 * CONSIGNES :
 * - Complète chaque bloc it() en suivant les commentaires
 * - Utilise cy.getBySel() pour cibler les éléments (voir CONSIGNES.md)
 * - Lance tes tests avec : yarn cypress:open
 *
 * RAPPEL DES SELECTEURS :
 * - cy.getBySel('signup-first-name')
 * - cy.getBySel('signup-last-name')
 * - cy.getBySel('signup-username')
 * - cy.getBySel('signup-password')
 * - cy.getBySel('signup-confirmPassword')
 * - cy.getBySel('signup-submit')
 * ============================================================
 */

describe("Inscription d'un nouvel utilisateur", () => {
  beforeEach(() => {
    // Avant chaque test, on visite la page d'inscription
    cy.visit("/signup");
  });

  // ──────────────────────────────────────────────
  // SC01 — Vérifier l'affichage du formulaire
  // ──────────────────────────────────────────────
  it("SC01 - devrait afficher le formulaire d'inscription avec tous les champs", () => {
    // TODO :
    // 1. Vérifier que le champ "First Name" est visible
    // 2. Vérifier que le champ "Last Name" est visible
    // 3. Vérifier que le champ "Username" est visible
    // 4. Vérifier que le champ "Password" est visible
    // 5. Vérifier que le champ "Confirm Password" est visible
    // 6. Vérifier que le bouton "Sign Up" est présent
  });

  // ──────────────────────────────────────────────
  // SC02 — Inscription réussie
  // ──────────────────────────────────────────────
  it("SC02 - devrait inscrire un nouvel utilisateur avec des données valides", () => {
    // TODO :
    // 1. Remplir le champ "First Name" avec "Jean"
    // 2. Remplir le champ "Last Name" avec "Dupont"
    // 3. Remplir le champ "Username" avec "JeanDupont" + un nombre aléatoire
    //    Astuce : const username = "JeanDupont" + Date.now()
    // 4. Remplir le champ "Password" avec "Test1234!"
    // 5. Remplir le champ "Confirm Password" avec "Test1234!"
    // 6. Cliquer sur le bouton "Sign Up"
    // 7. Vérifier qu'on est redirigé vers la page /signin
    //    Utiliser : cy.url().should('include', '/signin')
  });

  // ──────────────────────────────────────────────
  // SC03 — Mot de passe trop court
  // ──────────────────────────────────────────────
  it("SC03 - devrait afficher une erreur si le mot de passe est trop court", () => {
    // TODO :
    // 1. Remplir "First Name" et "Last Name"
    // 2. Remplir "Username"
    // 3. Remplir "Password" avec "abc" (moins de 4 caractères)
    // 4. Cliquer ailleurs pour déclencher la validation (cy.getBySel('signup-confirmPassword').click())
    // 5. Vérifier qu'un message d'erreur apparaît
    //    Utiliser : cy.get('#password-helper-text').should('be.visible').and('contain', 'least 4')
  });

  // ──────────────────────────────────────────────
  // SC04 — Mots de passe différents
  // ──────────────────────────────────────────────
  it("SC04 - devrait afficher une erreur si les mots de passe ne correspondent pas", () => {
    // TODO :
    // 1. Remplir tous les champs normalement
    // 2. Remplir "Password" avec "Test1234!"
    // 3. Remplir "Confirm Password" avec "Autre5678!"
    // 4. Cliquer ailleurs pour déclencher la validation
    // 5. Vérifier le message d'erreur "Password does not match"
    //    Utiliser : cy.get('#confirmPassword-helper-text').should('be.visible').and('contain', 'match')
  });

  // ──────────────────────────────────────────────
  // SC05 — Bouton désactivé si formulaire incomplet
  // ──────────────────────────────────────────────
  it("SC05 - devrait afficher des erreurs de validation quand les champs sont vides", () => {
    // TODO :
    // 1. Cliquer dans le champ "First Name" puis le quitter sans rien taper
    //    cy.getBySel('signup-first-name').find('input').click().blur()
    // 2. Vérifier que le message d'erreur "First Name is required" apparaît
    //    cy.get('#firstName-helper-text').should('be.visible').and('contain', 'First Name is required')
    // 3. Remplir TOUS les champs correctement
    // 4. Vérifier que le bouton n'est plus disabled
    //    cy.getBySel('signup-submit').should('not.be.disabled')
  });

  // ──────────────────────────────────────────────
  // SC06 — Lien vers la page de connexion
  // ──────────────────────────────────────────────
  it("SC06 - devrait rediriger vers la page de connexion via le lien", () => {
    // TODO :
    // 1. Trouver le lien "Have an account? Sign In" sur la page
    //    Utiliser : cy.contains('Have an account? Sign In')
    // 2. Cliquer dessus
    // 3. Vérifier que l'URL contient '/signin'
  });
});
