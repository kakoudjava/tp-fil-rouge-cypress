/**
 * ============================================================
 * TP FIL ROUGE — MODULE 2 : Connexion (Login)
 * ============================================================
 *
 * OBJECTIF :
 * Tester tous les scénarios de connexion à l'application.
 *
 * CONSIGNES :
 * - Complète chaque bloc it() en suivant les commentaires
 * - Utilise cy.getBySel() pour cibler les éléments
 *
 * RAPPEL DES SELECTEURS :
 * - cy.getBySel('signin-username')
 * - cy.getBySel('signin-password')
 * - cy.getBySel('signin-submit')
 * - cy.getBySel('signin-error')
 * - cy.getBySel('signin-remember-me')
 * ============================================================
 */

describe("Connexion utilisateur", () => {
  beforeEach(() => {
    // Avant chaque test :
    // 1. Réinitialiser la base de données pour avoir des données propres
    cy.task("db:seed");
    // 2. Visiter la page de connexion
    cy.visit("/signin");
  });

  // ──────────────────────────────────────────────
  // SC07 — Affichage de la page de connexion
  // ──────────────────────────────────────────────
  it("SC07 - devrait afficher la page de connexion avec les champs requis", () => {
    // TODO :
    // 1. Vérifier que le titre "Sign In" est visible
     cy.contains('h1', 'Sign in').should('be.visible')
    // 2. Vérifier que le champ username est visible
    cy.getBySel('signin-username').should('be.visible')
    // 3. Vérifier que le champ password est visible
    cy.getBySel('signin-password').should('be.visible')
    // 4. Vérifier que le bouton "Sign In" est visible
    cy.getBySel('signin-submit').should('be.visible')
    // 5. Vérifier que la checkbox "Remember me" est visible
    cy.getBySel('signin-remember-me').should('be.visible')
  });

  // ──────────────────────────────────────────────
  // SC08 — Connexion réussie
  // ──────────────────────────────────────────────
  it("SC08 - devrait se connecter avec un utilisateur valide (Heath93)", () => {
    // TODO :
    // 1. Taper "Heath93" dans le champ username
      cy.getBySel('signin-username').type('Heath93')
    // 2. Taper "s3cret" dans le champ password
      cy.getBySel('signin-password').type('s3cret')
    // 3. Cliquer sur le bouton "Sign In"
      cy.getBySel('signin-submit').click()
    // 4. Vérifier que l'URL ne contient plus '/signin'
        cy.url().should('not.include', '/signin')
    // 5. Vérifier que le nom de l'utilisateur apparaît dans la sidebar
        cy.getBySel('sidenav-user-full-name').should('be.visible')
  });

  // ──────────────────────────────────────────────
  // SC09 — Mauvais mot de passe
  // ──────────────────────────────────────────────
  it("SC09 - devrait afficher une erreur avec un mauvais mot de passe", () => {
    // TODO :
    // 1. Taper "Heath93" dans le champ username
      cy.getBySel('signin-username').type('Heath93')  
    // 2. Taper "mauvaismdp" dans le champ password
      cy.getBySel('signin-password').type('mauvaismdp')
    // 3. Cliquer sur "Sign In"
      cy.getBySel('signin-submit').click()
    // 4. Vérifier que le message d'erreur est visible
        cy.getBySel('signin-error').should('be.visible')
    // 5. Vérifier que le message contient "Username or password is invalid"
       .and('contain', 'Username or password is invalid')
  });

  // ──────────────────────────────────────────────
  // SC10 — Username inexistant
  // ──────────────────────────────────────────────
  it("SC10 - devrait afficher une erreur avec un username inexistant", () => {
    // TODO :
    // 1. Taper "utilisateur_bidon_999" dans username
    cy.getBySel('signin-username').type('utilisateur_bidon_999')
    // 2. Taper "s3cret" dans password
    cy.getBySel('signin-password').type('s3cret')
    // 3. Cliquer sur "Sign In"
    cy.getBySel('signin-submit').click()
    // 4. Vérifier le message d'erreur
    cy.getBySel('signin-error').should('be.visible')
    .and('contain', 'Username or password is invalid')
  });

  // ──────────────────────────────────────────────
  // SC11 — Champs vides
  // ──────────────────────────────────────────────
  it("SC11 - devrait désactiver le bouton si les champs sont vides", () => {
    // TODO :
    // 1. Sans rien taper, vérifier que le bouton "Sign In" est disabled
    cy.getBySel('signin-submit').should('be.visible')
    // 2. Taper seulement le username
    cy.getBySel('signin-username').type('Heath93')
    // 3. Vérifier que le bouton est toujours disabled
    cy.getBySel('signin-submit').should('be.disabled')
    // 4. Taper aussi le password
    cy.getBySel('signin-password').type('s3cret')
    // 5. Vérifier que le bouton est maintenant enabled
    cy.getBySel('signin-submit').should('not.be.disabled')
  });

  // ──────────────────────────────────────────────
  // SC12 — Validation du champ username
  // ──────────────────────────────────────────────
  it("SC12 - devrait afficher une erreur si le username est effacé après saisie", () => {
    // TODO :
    // 1. Taper "test" dans le champ username
    cy.getBySel('signin-username').find('input').type('test')
    // 2. Effacer le contenu avec .clear()
    cy.getBySel('signin-username').find('input').clear()
    // 3. Cliquer ailleurs (sur le champ password par exemple)
    cy.getBySel('signin-password').find('input').click()
    // 4. Vérifier le message d'erreur de validation
    cy.get('#username-helper-text').should('be.visible')
  });

  // ──────────────────────────────────────────────
  // SC13 — Checkbox "Remember me"
  // ──────────────────────────────────────────────
  it("SC13 - devrait pouvoir cocher et décocher 'Remember me'", () => {
    // TODO :
    // 1. Récupérer la checkbox dans le composant "Remember me"
        cy.getBySel('signin-remember-me').find('input')
    // 2. Vérifier qu'elle n'est pas cochée par défaut
        cy.getBySel('signin-remember-me').find('input').should('not.be.checked')
    // 3. Cocher la checkbox avec .check()
        cy.getBySel('signin-remember-me').find('input').check()
    // 4. Vérifier qu'elle est maintenant cochée
        cy.getBySel('signin-remember-me').find('input').should('be.checked')
    // 5. Décocher avec .uncheck()
        cy.getBySel('signin-remember-me').find('input').uncheck()
    // 6. Vérifier qu'elle n'est plus cochée
        cy.getBySel('signin-remember-me').find('input').should('not.be.checked')
  });

  // ──────────────────────────────────────────────
  // SC14 — Lien vers l'inscription
  // ──────────────────────────────────────────────
  it("SC14 - devrait rediriger vers la page d'inscription via le lien", () => {
    // TODO :
    // 1. Trouver le lien "Don't have an account? Sign Up"
        cy.contains("Don't have an account? Sign Up")
    // 2. Cliquer dessus
        .click()
    // 3. Vérifier que l'URL contient '/signup'
        cy.url().should('include', '/signup')  
  });
});
