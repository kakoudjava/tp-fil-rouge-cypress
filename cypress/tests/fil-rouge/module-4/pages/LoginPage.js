/**
 * ============================================================
 * TP FIL ROUGE — MODULE 5 : Page Object — LoginPage
 * ============================================================
 *
 * OBJECTIF :
 * Créer un Page Object pour la page de connexion.
 * Un Page Object centralise tous les sélecteurs et actions d'une page.
 * Quand un sélecteur change, tu ne le modifies qu'à UN seul endroit.
 *
 * CONSIGNES :
 * 1. Complète les getters (sélecteurs) et les méthodes (actions)
 * 2. Puis utilise ce Page Object dans tes tests du module 2
 *    (login.cy.js) pour remplacer les sélecteurs en dur
 * ============================================================
 */

class LoginPage {
  // ── SÉLECTEURS (getters) ──────────────────────

  get usernameInput() {
    return cy.getBySel("signin-username");
  }

  get passwordInput() {
    // TODO : retourner l'élément du champ password
    // return cy.getBySel('signin-password')
  }

  get submitButton() {
    // TODO : retourner le bouton de soumission
    // return cy.getBySel('signin-submit')
  }

  get errorMessage() {
    // TODO : retourner l'élément du message d'erreur
    // return cy.getBySel('signin-error')
  }

  get rememberMeCheckbox() {
    // TODO : retourner la checkbox "Remember me"
    // return cy.getBySel('signin-remember-me').find('input')
  }

  get signupLink() {
    // TODO : retourner le lien vers la page d'inscription
    // return cy.contains("Don't have an account? Sign Up")
  }

  // ── ACTIONS (méthodes) ────────────────────────

  visit() {
    cy.visit("/signin");
  }

  fillUsername(username) {
    this.usernameInput.type(username);
  }

  fillPassword(password) {
    // TODO : taper le mot de passe
    // this.passwordInput.type(password)
  }

  submit() {
    // TODO : cliquer sur le bouton submit
    // this.submitButton.click()
  }

  /**
   * Action complète : remplir et soumettre le formulaire
   * @param {string} username
   * @param {string} password
   */
  login(username, password) {
    this.visit();
    this.fillUsername(username);
    this.fillPassword(password);
    this.submit();
  }

  // ── ASSERTIONS (vérifications) ────────────────

  assertErrorVisible(message) {
    // TODO : vérifier que le message d'erreur est visible et contient le texte
    // this.errorMessage
    //   .should('be.visible')
    //   .and('contain', message)
  }

  assertRedirectedToDashboard() {
    // TODO : vérifier qu'on n'est plus sur /signin
    // cy.url().should('not.include', '/signin')
  }

  assertSubmitDisabled() {
    // TODO : vérifier que le bouton est disabled
    // this.submitButton.should('be.disabled')
  }

  assertSubmitEnabled() {
    // TODO : vérifier que le bouton est enabled
    // this.submitButton.should('not.be.disabled')
  }
}

export default new LoginPage();
