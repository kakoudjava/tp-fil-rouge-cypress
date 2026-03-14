/**
 * ============================================================
 * TP FIL ROUGE — MODULE 4 : Demander un paiement (Request)
 * ============================================================
 *
 * OBJECTIF :
 * Tester la fonctionnalité de demande de paiement (Request).
 * C'est l'inverse d'un paiement : tu demandes de l'argent à un contact.
 *
 * RAPPEL DES SELECTEURS :
 * - cy.getBySel('transaction-create-submit-request') → bouton "Request"
 * - cy.getBySel('nav-personal-tab')                  → onglet "Mine"
 * - cy.getBySelLike('transaction-accept-request')    → bouton "Accept"
 * - cy.getBySelLike('transaction-reject-request')    → bouton "Reject"
 * ============================================================
 */

describe("Demander un paiement (Request)", () => {
  beforeEach(() => {
    // Réinitialise la base de données avant chaque test
    // → Remet les données par défaut (utilisateurs, transactions, etc.)
    // ⚠️ Cette ligne est déjà fournie — ne pas la modifier
    cy.task("db:seed");
  });

  // ──────────────────────────────────────────────
  // SC53 — Envoyer une demande de paiement
  // ──────────────────────────────────────────────
  it("SC53 - devrait envoyer une demande de paiement (Request)", () => {
    // TODO :
    // 1. Se connecter avec Heath93
    cy.login("Heath93", "s3cret");
    // 2. Cliquer sur "New Transaction"
    //    cy.getBySel('nav-top-new-transaction').click()
    // 3. Sélectionner un contact (Arvilla)
    //    cy.getBySelLike('user-list-item').contains('Arvilla').click()
    // 4. Remplir montant (30) et description ("Remboursement cinéma")
    // 5. Cliquer sur "Request" (PAS "Pay")
    //    cy.getBySel('transaction-create-submit-request').click()
    // 6. Vérifier que le message de confirmation contient "Requested"
    //    cy.contains('Requested').should('be.visible')
  });

  // ──────────────────────────────────────────────
  // SC54 — Voir la demande dans l'onglet "Mine"
  // ──────────────────────────────────────────────
  it("SC54 - devrait voir la demande dans l'onglet 'Mine' de l'émetteur", () => {
    // TODO :
    // 1. Se connecter avec Heath93
    // 2. Créer une Request vers Arvilla pour 30$
    // 3. Retourner aux transactions
    //    cy.getBySel('new-transaction-return-to-transactions').click()
    // 4. Cliquer sur l'onglet "Mine"
    //    cy.getBySel('nav-personal-tab').click()
    // 5. Vérifier que la transaction apparaît dans la liste
    //    cy.getBySelLike('transaction-item')
    //      .should('have.length.greaterThan', 0)
  });

  // ──────────────────────────────────────────────
  // SC55 — Accepter une demande de paiement
  // ──────────────────────────────────────────────
  it("SC55 - devrait accepter une demande de paiement reçue (scénario multi-utilisateur)", () => {
    // TODO :
    // ÉTAPE 1 : Heath93 envoie une Request à Arvilla
    // 1. Se connecter avec Heath93
    cy.login("Heath93", "s3cret");
    // 2. Créer une Request de 25$ vers Arvilla
    //    (même étapes que SC53)
    // 3. Se déconnecter
    //    cy.getBySel('sidenav-signout').click()
    //
    // ÉTAPE 2 : Arvilla accepte la Request
    // 4. Se connecter avec Arvilla_Hegmann
    //    cy.login('Arvilla_Hegmann', 's3cret')
    // 5. Aller sur l'onglet "Mine"
    //    cy.getBySel('nav-personal-tab').click()
    // 6. Cliquer sur la transaction Request
    //    cy.getBySelLike('transaction-item').first().click()
    // 7. Cliquer sur "Accept"
    //    cy.getBySelLike('transaction-accept-request').click()
    // 8. Vérifier que le statut change
  });

  // ──────────────────────────────────────────────
  // SC56 — Rejeter une demande de paiement
  // ──────────────────────────────────────────────
  it("SC56 - devrait rejeter une demande de paiement reçue", () => {
    // TODO :
    // Même logique que SC55, mais à l'étape 7 :
    // - Cliquer sur "Reject" au lieu de "Accept"
    //   cy.getBySelLike('transaction-reject-request').click()
    // - Vérifier que le statut change en "rejected"
  });

  // ──────────────────────────────────────────────
  // SC57 — Vérifier les détails d'une Request dans le détail
  // ──────────────────────────────────────────────
  it("SC57 - devrait afficher les détails corrects d'une Request", () => {
    // TODO :
    // 1. Se connecter et créer une Request de 75$ avec description "Loyer"
    // 2. Retourner aux transactions > onglet "Mine"
    // 3. Cliquer sur la transaction
    // 4. Vérifier :
    //    - Le montant contient "75"
    //    - La description contient "Loyer"
    //    - Le sender est visible
    //    - Le receiver est visible
  });
});
