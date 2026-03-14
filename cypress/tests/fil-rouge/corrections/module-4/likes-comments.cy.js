/**
 * ============================================================
 * CORRECTION — MODULE 4 : Likes et Commentaires
 * ============================================================
 */

describe("Likes et Commentaires sur les transactions", () => {
  beforeEach(() => {
    cy.task("db:seed");
    cy.login("Heath93", "s3cret");
  });

  // ──────────────────────────────────────────────
  // SC78 — Liker une transaction
  // ──────────────────────────────────────────────
  it("SC78 - devrait liker une transaction et incrémenter le compteur", () => {
    cy.getBySelLike("transaction-item").first().click();

    // On récupère le compteur de likes AVANT le clic
    let likesBefore;
    cy.getBySelLike("like-count")
      .invoke("text")
      .then((text) => {
        likesBefore = parseInt(text);
      });

    // On clique sur le bouton Like
    cy.getBySelLike("like-button").click();

    // On vérifie que le compteur a augmenté de 1
    cy.getBySelLike("like-count")
      .invoke("text")
      .then((text) => {
        const likesAfter = parseInt(text);
        expect(likesAfter).to.eq(likesBefore + 1);
      });
  });

  // ──────────────────────────────────────────────
  // SC79 — Ajouter un commentaire
  // ──────────────────────────────────────────────
  it("SC79 - devrait ajouter un commentaire sur une transaction", () => {
    cy.getBySelLike("transaction-item").first().click();

    // {enter} = appuyer sur la touche Entrée pour valider le commentaire
    cy.getBySelLike("comment-input").type("Super transaction !{enter}");

    // Le commentaire apparaît dans la liste
    cy.getBySel("comments-list").should("contain", "Super transaction !");
  });

  // ──────────────────────────────────────────────
  // SC80 — Ajouter plusieurs commentaires
  // ──────────────────────────────────────────────
  it("SC80 - devrait ajouter plusieurs commentaires et les voir tous", () => {
    cy.getBySelLike("transaction-item").first().click();

    cy.getBySelLike("comment-input").type("Premier commentaire{enter}");
    cy.getBySelLike("comment-input").type("Deuxième commentaire{enter}");

    cy.getBySel("comments-list").should("contain", "Premier commentaire");
    cy.getBySel("comments-list").should("contain", "Deuxième commentaire");
  });
});
