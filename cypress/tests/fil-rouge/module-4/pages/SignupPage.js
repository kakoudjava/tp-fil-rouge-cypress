/**
 * ============================================================
 * TP FIL ROUGE — MODULE 5 : Page Object — SignupPage
 * ============================================================
 *
 * CONSIGNES :
 * Complète ce Page Object pour la page d'inscription,
 * puis utilise-le dans signup.cy.js pour remplacer les sélecteurs en dur.
 * ============================================================
 */

class SignupPage {
  // ── SÉLECTEURS ────────────────────────────────

  get firstNameInput() {
    return cy.getBySel("signup-first-name");
  }

  get lastNameInput() {
    // TODO : retourner le champ Last Name
  }

  get usernameInput() {
    // TODO : retourner le champ Username
  }

  get passwordInput() {
    // TODO : retourner le champ Password
  }

  get confirmPasswordInput() {
    // TODO : retourner le champ Confirm Password
  }

  get submitButton() {
    // TODO : retourner le bouton Sign Up
  }

  // ── ACTIONS ───────────────────────────────────

  visit() {
    cy.visit("/signup");
  }

  /**
   * Remplir tout le formulaire d'inscription
   * @param {Object} user - { firstName, lastName, username, password }
   */
  fillForm(user) {
    // TODO :
    // this.firstNameInput.type(user.firstName)
    // this.lastNameInput.type(user.lastName)
    // this.usernameInput.type(user.username)
    // this.passwordInput.type(user.password)
    // this.confirmPasswordInput.type(user.password)
  }

  submit() {
    // TODO : cliquer sur le bouton
  }

  /**
   * Action complète : visiter, remplir et soumettre
   */
  signup(user) {
    this.visit();
    this.fillForm(user);
    this.submit();
  }

  // ── ASSERTIONS ────────────────────────────────

  assertRedirectedToSignin() {
    // TODO : vérifier la redirection vers /signin
    // cy.url().should('include', '/signin')
  }

  assertSubmitDisabled() {
    // TODO
  }

  assertSubmitEnabled() {
    // TODO
  }
}

export default new SignupPage();
