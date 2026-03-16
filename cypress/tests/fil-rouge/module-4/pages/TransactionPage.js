/**
 * ============================================================
 * TP FIL ROUGE — MODULE 5 : Page Object — TransactionPage
 * ============================================================
 *
 * CONSIGNES :
 * Complète ce Page Object pour les transactions,
 * puis utilise-le dans create-payment.cy.js et create-request.cy.js
 * ============================================================
 */

class TransactionPage {
  // ── SÉLECTEURS ────────────────────────────────

  get newTransactionButton() {
    return cy.getBySel("nav-top-new-transaction");
  }

  get usersList() {
    // TODO : retourner la liste des contacts
    // return cy.getBySel('users-list')
  }

  get amountInput() {
    // TODO : retourner le champ montant
    // return cy.get('#amount')
  }

  get descriptionInput() {
    // TODO : retourner le champ description
    // return cy.get('#transaction-create-description-input')
  }

  get payButton() {
    // TODO : retourner le bouton Pay
    // return cy.getBySel('transaction-create-submit-payment')
  }

  get requestButton() {
    // TODO : retourner le bouton Request
    // return cy.getBySel('transaction-create-submit-request')
  }

  get transactionList() {
    // TODO
    // return cy.getBySel('transaction-list')
  }

  get transactionItems() {
    // TODO
    // return cy.getBySelLike('transaction-item')
  }

  get createAnotherButton() {
    // TODO
    // return cy.getBySel('new-transaction-create-another-transaction')
  }

  get returnToTransactionsButton() {
    // TODO
    // return cy.getBySel('new-transaction-return-to-transactions')
  }

  get successAlert() {
    // TODO
    // return cy.get('[data-test="alert-bar-success"]')
  }

  // ── ACTIONS ───────────────────────────────────

  goToNewTransaction() {
    this.newTransactionButton.click();
  }

  selectContact(contactName) {
    // TODO : sélectionner un contact par son nom
    // cy.getBySelLike('user-list-item').contains(contactName).click()
  }

  fillAmount(amount) {
    // TODO
    // this.amountInput.type(amount)
  }

  fillDescription(description) {
    // TODO
    // this.descriptionInput.type(description)
  }

  /**
   * Créer un paiement complet
   * @param {string} contactName
   * @param {string} amount
   * @param {string} description
   */
  createPayment(contactName, amount, description) {
    // TODO :
    // this.goToNewTransaction()
    // this.selectContact(contactName)
    // this.fillAmount(amount)
    // this.fillDescription(description)
    // this.payButton.click()
  }

  /**
   * Créer une demande de paiement
   */
  createRequest(contactName, amount, description) {
    // TODO :
    // this.goToNewTransaction()
    // this.selectContact(contactName)
    // this.fillAmount(amount)
    // this.fillDescription(description)
    // this.requestButton.click()
  }

  // ── ASSERTIONS ────────────────────────────────

  assertPaymentSuccess() {
    // TODO :
    // this.successAlert.should('be.visible').and('contain', 'Paid')
  }

  assertRequestSuccess() {
    // TODO :
    // this.successAlert.should('be.visible').and('contain', 'Requested')
  }

  assertTransactionListVisible() {
    // TODO :
    // this.transactionList.should('be.visible')
  }
}

export default new TransactionPage();
