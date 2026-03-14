/**
 * ============================================================
 * CORRECTION — MODULE 3 : Éléments spécifiques de la page
 * ============================================================
 */

describe("Éléments spécifiques de la page", () => {
  beforeEach(() => {
    cy.task("db:seed");
    cy.login("Heath93", "s3cret");
  });

  // ──────────────────────────────────────────────
  // SC39 — Vérifier les attributs des liens
  // ──────────────────────────────────────────────
  it("SC39 - devrait vérifier que chaque lien de la sidebar pointe vers la bonne URL", () => {
    // .invoke('attr', 'href') récupère la valeur de l'attribut href du lien
    // C'est comme faire element.getAttribute('href') en JavaScript
    cy.getBySel("sidenav-home").invoke("attr", "href").should("eq", "/");

    cy.getBySel("sidenav-user-settings")
      .invoke("attr", "href")
      .should("eq", "/user/settings");

    cy.getBySel("sidenav-bankaccounts")
      .invoke("attr", "href")
      .should("eq", "/bankaccounts");

    cy.getBySel("sidenav-notifications")
      .invoke("attr", "href")
      .should("eq", "/notifications");
  });

  // ──────────────────────────────────────────────
  // SC40 — Vérifier la classe CSS active
  // ──────────────────────────────────────────────
  it("SC40 - devrait mettre en surbrillance le lien actif dans la sidebar", () => {
    // .invoke('attr', 'class') récupère toutes les classes CSS de l'élément
    // On vérifie qu'elle contient "Mui-selected" (la classe active de Material UI)
    cy.getBySel("sidenav-home")
      .invoke("attr", "class")
      .should("contain", "Mui-selected");

    // On navigue vers My Account
    cy.getBySel("sidenav-user-settings").click();

    // Maintenant My Account a la classe active
    cy.getBySel("sidenav-user-settings")
      .invoke("attr", "class")
      .should("contain", "Mui-selected");

    // Et Home ne l'a plus
    cy.getBySel("sidenav-home")
      .invoke("attr", "class")
      .should("not.contain", "Mui-selected");
  });

  // ──────────────────────────────────────────────
  // SC41 — Lire et vérifier le solde
  // ──────────────────────────────────────────────
  it("SC41 - devrait extraire le solde et vérifier que c'est un nombre valide", () => {
    cy.getBySel("sidenav-user-balance")
      .invoke("text")
      .then((balanceText) => {
        // balanceText = "$1,234.56" par exemple
        cy.log("Solde brut : " + balanceText);

        // On nettoie le texte : on enlève $, virgules et espaces
        // .replace() avec une regex : /[$,\s]/g signifie "remplacer tous les $, virgules et espaces"
        const cleanBalance = balanceText.replace(/[$,\s]/g, "");
        // parseFloat transforme le texte en nombre décimal
        const amount = parseFloat(cleanBalance);

        // On vérifie que c'est bien un nombre (pas NaN = Not a Number)
        expect(amount).to.not.be.NaN;
        cy.log("Solde nettoyé : " + amount);
      });
  });

  // ──────────────────────────────────────────────
  // SC42 — Vérifier les valeurs des champs My Account
  // ──────────────────────────────────────────────
  it("SC42 - devrait pré-remplir les champs du formulaire My Account", () => {
    cy.getBySel("sidenav-user-settings").click();

    // .find('input') cherche le <input> DANS le composant
    // .invoke('val') récupère la valeur actuelle du champ (comme input.value en JS)
    cy.getBySelLike("firstName").find("input").invoke("val").should("not.be.empty");
    cy.getBySelLike("lastName").find("input").invoke("val").should("not.be.empty");
    cy.getBySelLike("email").find("input").invoke("val").should("not.be.empty");
    cy.getBySelLike("phoneNumber").find("input").invoke("val").should("not.be.empty");
  });

  // ──────────────────────────────────────────────
  // SC43 — Itérer sur les comptes bancaires
  // ──────────────────────────────────────────────
  it("SC43 - devrait vérifier que chaque compte bancaire a un nom et un bouton Delete", () => {
    cy.getBySel("sidenav-bankaccounts").click();

    // .each() boucle sur chaque compte bancaire de la liste
    cy.getBySelLike("bankaccount-list-item").each(($item) => {
      // Pour chaque compte, on vérifie qu'il n'est pas vide (= il a un nom)
      cy.wrap($item).should("not.be.empty");

      // Et qu'il contient un bouton Delete
      // [data-test*="delete"] = l'attribut data-test contient "delete"
      cy.wrap($item).find('[data-test*="delete"]').should("exist");
    });
  });

  // ──────────────────────────────────────────────
  // SC44 — Vérifier le compteur de notifications
  // ──────────────────────────────────────────────
  it("SC44 - devrait afficher le badge de notifications avec un nombre", () => {
    cy.getBySel("nav-top-notifications-count")
      .invoke("text")
      .then((countText) => {
        // parseInt transforme le texte en nombre entier
        const count = parseInt(countText);

        // On vérifie que c'est un nombre et qu'il est >= 0
        expect(count).to.be.a("number");
        expect(count).to.be.at.least(0);
        cy.log("Nombre de notifications : " + count);
      });
  });
});
