/**
 * ============================================================
 * CORRECTION — MODULE 5 : Page Object — TransactionPage
 * ============================================================
 */

class TransactionPage {
  get newTransactionButton() {
    return cy.getBySel("nav-top-new-transaction");
  }

  get usersList() {
    return cy.getBySel("users-list");
  }

  get amountInput() {
    return cy.get("#amount");
  }

  get descriptionInput() {
    return cy.get("#transaction-create-description-input");
  }

  get payButton() {
    return cy.getBySel("transaction-create-submit-payment");
  }

  get requestButton() {
    return cy.getBySel("transaction-create-submit-request");
  }

  get transactionList() {
    return cy.getBySel("transaction-list");
  }

  get transactionItems() {
    return cy.getBySelLike("transaction-item");
  }

  get createAnotherButton() {
    return cy.getBySel("new-transaction-create-another-transaction");
  }

  get returnToTransactionsButton() {
    return cy.getBySel("new-transaction-return-to-transactions");
  }

  get successAlert() {
    return cy.get('[data-test="alert-bar-success"]');
  }

  goToNewTransaction() {
    this.newTransactionButton.click();
  }

  selectContact(contactName) {
    cy.getBySelLike("user-list-item").contains(contactName).click();
  }

  fillAmount(amount) {
    this.amountInput.type(amount);
  }

  fillDescription(description) {
    this.descriptionInput.type(description);
  }

  createPayment(contactName, amount, description) {
    this.goToNewTransaction();
    this.selectContact(contactName);
    this.fillAmount(amount);
    this.fillDescription(description);
    this.payButton.click();
  }

  createRequest(contactName, amount, description) {
    this.goToNewTransaction();
    this.selectContact(contactName);
    this.fillAmount(amount);
    this.fillDescription(description);
    this.requestButton.click();
  }

  assertPaymentSuccess() {
    this.successAlert.should("be.visible").and("contain", "Paid");
  }

  assertRequestSuccess() {
    this.successAlert.should("be.visible").and("contain", "Requested");
  }

  assertTransactionListVisible() {
    this.transactionList.should("be.visible");
  }
}

export default new TransactionPage();
