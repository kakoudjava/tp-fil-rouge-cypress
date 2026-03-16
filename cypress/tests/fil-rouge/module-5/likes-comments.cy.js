/**
 * ============================================================
 * TP FIL ROUGE — MODULE 5 : Likes et Commentaires
 * ============================================================
 *
 * OBJECTIF :
 * Tester les fonctionnalités sociales : liker et commenter une transaction.
 *
 * RAPPEL DES SELECTEURS :
 * - cy.getBySelLike('like-button')    → bouton Like
 * - cy.getBySelLike('like-count')     → compteur de likes
 * - cy.getBySelLike('comment-input')  → champ de commentaire
 * - cy.getBySelLike('comment-count')  → compteur de commentaires
 * - cy.getBySel('comments-list')      → liste des commentaires
 * ============================================================
 */

describe("Likes et Commentaires sur les transactions", () => {
  beforeEach(() => {
    // Réinitialise la base de données avant chaque test
    // → Remet les données par défaut (utilisateurs, transactions, etc.)
    // ⚠️ Cette ligne est déjà fournie — ne pas la modifier
    cy.task("db:seed");
    cy.login("Heath93", "s3cret");
  });

  // ──────────────────────────────────────────────
  // SC83 — Liker une transaction
  // ──────────────────────────────────────────────
  it("SC83 - devrait liker une transaction et incrémenter le compteur", () => {
    // TODO :
    // 1. Cliquer sur la première transaction de la liste
    //    cy.getBySelLike('transaction-item').first().click()
    // 2. Récupérer le compteur de likes actuel
    //    let likesBefore
    //    cy.getBySelLike('like-count').invoke('text').then((text) => {
    //      likesBefore = parseInt(text)
    //    })
    // 3. Cliquer sur le bouton Like
    //    cy.getBySelLike('like-button').click()
    // 4. Vérifier que le compteur a augmenté de 1
    //    cy.getBySelLike('like-count').invoke('text').then((text) => {
    //      const likesAfter = parseInt(text)
    //      expect(likesAfter).to.eq(likesBefore + 1)
    //    })
  });

  // ──────────────────────────────────────────────
  // SC84 — Ajouter un commentaire
  // ──────────────────────────────────────────────
  it("SC84 - devrait ajouter un commentaire sur une transaction", () => {
    // TODO :
    // 1. Cliquer sur la première transaction
    //    cy.getBySelLike('transaction-item').first().click()
    // 2. Taper un commentaire dans le champ
    //    cy.getBySelLike('comment-input').type('Super transaction !{enter}')
    // 3. Vérifier que le commentaire apparaît dans la liste
    //    cy.getBySel('comments-list').should('contain', 'Super transaction !')
    // 4. Vérifier que le compteur de commentaires a augmenté
  });

  // ──────────────────────────────────────────────
  // SC85 — Ajouter plusieurs commentaires
  // ──────────────────────────────────────────────
  it("SC85 - devrait ajouter plusieurs commentaires et les voir tous", () => {
    // TODO :
    // 1. Cliquer sur la première transaction
    //    cy.getBySelLike('transaction-item').first().click()
    // 2. Ajouter le commentaire "Premier commentaire"
    //    cy.getBySelLike('comment-input').type('Premier commentaire{enter}')
    // 3. Ajouter le commentaire "Deuxième commentaire"
    //    cy.getBySelLike('comment-input').type('Deuxième commentaire{enter}')
    // 4. Vérifier que les deux commentaires sont visibles
    //    cy.getBySel('comments-list').should('contain', 'Premier commentaire')
    //    cy.getBySel('comments-list').should('contain', 'Deuxième commentaire')
  });
});
