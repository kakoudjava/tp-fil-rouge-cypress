/**
 * ============================================================
 * CORRECTION — MODULE 5 : Page Object — SignupPage
 * ============================================================
 */

class SignupPage {
  get firstNameInput() {
    return cy.getBySel("signup-first-name");
  }

  get lastNameInput() {
    return cy.getBySel("signup-last-name");
  }

  get usernameInput() {
    return cy.getBySel("signup-username");
  }

  get passwordInput() {
    return cy.getBySel("signup-password");
  }

  get confirmPasswordInput() {
    return cy.getBySel("signup-confirmPassword");
  }

  get submitButton() {
    return cy.getBySel("signup-submit");
  }

  visit() {
    cy.visit("/signup");
  }

  fillForm(user) {
    this.firstNameInput.type(user.firstName);
    this.lastNameInput.type(user.lastName);
    this.usernameInput.type(user.username);
    this.passwordInput.type(user.password);
    this.confirmPasswordInput.type(user.password);
  }

  submit() {
    this.submitButton.click();
  }

  signup(user) {
    this.visit();
    this.fillForm(user);
    this.submit();
  }

  assertRedirectedToSignin() {
    cy.url().should("include", "/signin");
  }

  assertSubmitDisabled() {
    this.submitButton.should("be.disabled");
  }

  assertSubmitEnabled() {
    this.submitButton.should("not.be.disabled");
  }
}

export default new SignupPage();
