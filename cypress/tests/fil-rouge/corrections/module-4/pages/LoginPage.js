/**
 * ============================================================
 * CORRECTION — MODULE 5 : Page Object — LoginPage
 * ============================================================
 */

class LoginPage {
  // ── SÉLECTEURS ────────────────────────────────

  get usernameInput() {
    return cy.getBySel("signin-username");
  }

  get passwordInput() {
    return cy.getBySel("signin-password");
  }

  get submitButton() {
    return cy.getBySel("signin-submit");
  }

  get errorMessage() {
    return cy.getBySel("signin-error");
  }

  get rememberMeCheckbox() {
    return cy.getBySel("signin-remember-me").find("input");
  }

  get signupLink() {
    return cy.contains("Don't have an account? Sign Up");
  }

  // ── ACTIONS ───────────────────────────────────

  visit() {
    cy.visit("/signin");
  }

  fillUsername(username) {
    this.usernameInput.type(username);
  }

  fillPassword(password) {
    this.passwordInput.type(password);
  }

  submit() {
    this.submitButton.click();
  }

  login(username, password) {
    this.visit();
    this.fillUsername(username);
    this.fillPassword(password);
    this.submit();
  }

  // ── ASSERTIONS ────────────────────────────────

  assertErrorVisible(message) {
    this.errorMessage.should("be.visible").and("contain", message);
  }

  assertRedirectedToDashboard() {
    cy.url().should("not.include", "/signin");
  }

  assertSubmitDisabled() {
    this.submitButton.should("be.disabled");
  }

  assertSubmitEnabled() {
    this.submitButton.should("not.be.disabled");
  }
}

export default new LoginPage();
