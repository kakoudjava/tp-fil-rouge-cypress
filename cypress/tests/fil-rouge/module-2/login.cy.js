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
    // 1. Vérifier que le titre "Sign in" est visible (attention au "i" minuscule !)
    //    cy.contains('h1', 'Sign in').should('be.visible')
    // 2. Vérifier que le champ username est visible
    // 3. Vérifier que le champ password est visible
    // 4. Vérifier que le bouton "Sign In" est visible
    // 5. Vérifier que la checkbox "Remember me" est visible
  });

  // ──────────────────────────────────────────────
  // SC08 — Connexion réussie
  // ──────────────────────────────────────────────
  it("SC08 - devrait se connecter avec un utilisateur valide (Heath93)", () => {
    // TODO :
    // 1. Taper "Heath93" dans le champ username
    // 2. Taper "s3cret" dans le champ password
    // 3. Cliquer sur le bouton "Sign In"
    // 4. Vérifier que l'URL ne contient plus '/signin'
    //    cy.url().should('not.include', '/signin')
    // 5. Vérifier que le nom de l'utilisateur apparaît dans la sidebar
    //    cy.getBySel('sidenav-user-full-name').should('be.visible')
  });

  // ──────────────────────────────────────────────
  // SC09 — Mauvais mot de passe
  // ──────────────────────────────────────────────
  it("SC09 - devrait afficher une erreur avec un mauvais mot de passe", () => {
    // TODO :
    // 1. Taper "Heath93" dans le champ username
    // 2. Taper "mauvaismdp" dans le champ password
    // 3. Cliquer sur "Sign In"
    // 4. Vérifier que le message d'erreur est visible
    //    cy.getBySel('signin-error').should('be.visible')
    // 5. Vérifier que le message contient "Username or password is invalid"
    //    .and('contain', 'Username or password is invalid')
  });

  // ──────────────────────────────────────────────
  // SC10 — Username inexistant
  // ──────────────────────────────────────────────
  it("SC10 - devrait afficher une erreur avec un username inexistant", () => {
    // TODO :
    // 1. Taper "utilisateur_bidon_999" dans username
    // 2. Taper "s3cret" dans password
    // 3. Cliquer sur "Sign In"
    // 4. Vérifier le message d'erreur
  });

  // ──────────────────────────────────────────────
  // SC11 — Champs vides
  // ──────────────────────────────────────────────
  it("SC11 - devrait afficher une erreur et désactiver le bouton si les champs sont vides", () => {
    // TODO :
    // 1. Cliquer sur le bouton "Sign In" sans rien remplir
    //    cy.getBySel('signin-submit').click()
    // 2. Vérifier que le message "Username is required" apparaît
    //    cy.get('#username-helper-text').should('be.visible').and('contain', 'Username is required')
    // 3. Vérifier que le bouton est maintenant disabled (grisé)
    //    cy.getBySel('signin-submit').should('be.disabled')
    // 4. Taper le username → bouton toujours disabled
    // 5. Taper aussi le password → bouton enabled
    //    cy.getBySel('signin-submit').should('not.be.disabled')
  });

  // ──────────────────────────────────────────────
  // SC12 — Validation du champ username
  // ──────────────────────────────────────────────
  it("SC12 - devrait afficher une erreur si le username est effacé après saisie", () => {
    // TODO :
    // 1. Cibler le vrai champ <input> dans le composant username
    //    cy.getBySel('signin-username').find('input')
    // 2. Taper "test" puis effacer avec .clear()
    // 3. Cliquer ailleurs (sur le champ password par exemple)
    //    cy.getBySel('signin-password').find('input').click()
    // 4. Vérifier le message d'erreur de validation
    //    cy.get('#username-helper-text').should('be.visible')
  });

  // ──────────────────────────────────────────────
  // SC13 — Checkbox "Remember me"
  // ──────────────────────────────────────────────
  it("SC13 - devrait pouvoir cocher et décocher 'Remember me'", () => {
    // TODO :
    // 1. Récupérer la checkbox dans le composant "Remember me"
    //    cy.getBySel('signin-remember-me').find('input')
    // 2. Vérifier qu'elle n'est pas cochée par défaut
    //    .should('not.be.checked')
    // 3. Cocher la checkbox avec .check()
    // 4. Vérifier qu'elle est maintenant cochée
    //    .should('be.checked')
    // 5. Décocher avec .uncheck()
    // 6. Vérifier qu'elle n'est plus cochée
  });

  // ──────────────────────────────────────────────
  // SC14 — Lien vers l'inscription
  // ──────────────────────────────────────────────
  it("SC14 - devrait rediriger vers la page d'inscription via le lien", () => {
    // TODO :
    // 1. Trouver le lien "Don't have an account? Sign Up"
    //    cy.contains("Don't have an account? Sign Up")
    // 2. Cliquer dessus
    // 3. Vérifier que l'URL contient '/signup'
  });
});
