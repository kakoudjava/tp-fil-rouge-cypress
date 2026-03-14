# ============================================================
# TP FIL ROUGE — MODULE 6 : BDD avec Cucumber — Transactions
# ============================================================

Feature: Transactions bancaires

  En tant qu'utilisateur de l'application RealWorld Bank
  Je veux pouvoir envoyer et demander de l'argent
  Afin de gérer mes paiements entre amis

  Background:
    Given la base de données est réinitialisée
    And je suis connecté avec "Heath93" et "s3cret"

  # ── Scénario 1 : Paiement simple ──

  Scenario: Effectuer un paiement à un contact
    When je navigue vers "New Transaction"
    And je sélectionne le contact "Arvilla"
    And je saisis le montant "50"
    And je saisis la description "Remboursement restaurant"
    And je clique sur "Pay"
    Then je vois le message de succès "Paid"

  # ── Scénario 2 : Demande de paiement ──

  Scenario: Demander un paiement à un contact
    When je navigue vers "New Transaction"
    And je sélectionne le contact "Dina"
    And je saisis le montant "30"
    And je saisis la description "Part du cinéma"
    And je clique sur "Request"
    Then je vois le message de succès "Requested"

  # ── Scénario 3 : Paiements multiples (Scenario Outline) ──

  Scenario Outline: Effectuer plusieurs paiements
    When je navigue vers "New Transaction"
    And je sélectionne le contact "<contact>"
    And je saisis le montant "<montant>"
    And je saisis la description "<description>"
    And je clique sur "Pay"
    Then je vois le message de succès "Paid"

    Examples:
      | contact  | montant | description          |
      | Arvilla  | 25      | Pizza du vendredi    |
      | Dina     | 100     | Part du loyer        |
      | Reyes    | 10      | Café du matin        |

  # ── Scénario 4 : Paiement avec montant invalide ──

  Scenario: Ne pas pouvoir payer avec un montant vide
    When je navigue vers "New Transaction"
    And je sélectionne le contact "Arvilla"
    Then le bouton "Pay" est désactivé
