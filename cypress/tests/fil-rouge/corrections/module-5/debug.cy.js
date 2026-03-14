/**
 * ============================================================
 * CORRECTION — MODULE 5 : Debug avec Cypress
 * ============================================================
 */

describe("Debug avec Cypress", () => {
  beforeEach(() => {
    cy.task("db:seed");
    cy.login("Heath93", "s3cret");
  });

  // ──────────────────────────────────────────────
  // SC81 — Utiliser cy.log() pour tracer un parcours
  // ──────────────────────────────────────────────
  it("SC81 - devrait tracer chaque étape d'un paiement avec cy.log()", () => {
    // cy.log() affiche un message dans le runner Cypress (panneau de gauche)
    // Très utile pour suivre le déroulement d'un test long

    cy.log("📍 ÉTAPE 1 : Navigation vers New Transaction");
    cy.getBySel("nav-top-new-transaction").click();

    cy.log("📍 ÉTAPE 2 : Sélection du contact");
    cy.getBySelLike("user-list-item").first().click();

    cy.log("📍 ÉTAPE 3 : Saisie du montant et description");
    cy.get("#amount").type("25");
    cy.get("#transaction-create-description-input").type("Test log");

    cy.log("📍 ÉTAPE 4 : Soumission du paiement");
    cy.getBySel("transaction-create-submit-payment").click();

    cy.log("✅ Paiement effectué avec succès");
  });

  // ──────────────────────────────────────────────
  // SC82 — Utiliser cy.screenshot() pour capturer des preuves
  // ──────────────────────────────────────────────
  it("SC82 - devrait prendre des screenshots à chaque étape", () => {
    // cy.screenshot() prend une capture d'écran
    // Le nom passé en paramètre crée un sous-dossier automatiquement
    // Les fichiers sont sauvegardés dans cypress/screenshots/

    // Screenshot du dashboard après login
    cy.screenshot("debug/01-dashboard-apres-login");

    // Naviguer vers New Transaction
    cy.getBySel("nav-top-new-transaction").click();
    cy.screenshot("debug/02-page-new-transaction");

    // Sélectionner un contact
    cy.getBySelLike("user-list-item").first().click();
    cy.screenshot("debug/03-contact-selectionne");

    // Remplir le formulaire
    cy.get("#amount").type("50");
    cy.get("#transaction-create-description-input").type("Test screenshot");
    cy.screenshot("debug/04-formulaire-rempli");

    // Soumettre et capturer le résultat
    cy.getBySel("transaction-create-submit-payment").click();
    cy.screenshot("debug/05-paiement-succes");

    // Après l'exécution, va vérifier les fichiers dans cypress/screenshots/
  });

  // ──────────────────────────────────────────────
  // SC83 — Utiliser cy.pause() pour explorer manuellement
  // ──────────────────────────────────────────────
  it("SC83 - devrait mettre en pause pour explorer le DOM manuellement", () => {
    // cy.pause() arrête le test et te laisse explorer le navigateur
    // Clique "Resume" dans le runner pour continuer

    // Naviguer vers la page de création de transaction
    cy.getBySel("nav-top-new-transaction").click();

    // PAUSE : ouvre les DevTools (F12) et explore le DOM
    cy.pause();
    // Quand le test est en pause :
    // - Ouvre les DevTools du navigateur (F12)
    // - Utilise l'inspecteur pour trouver les éléments
    // - Clique "Resume" dans le runner Cypress pour continuer

    // Sélectionner un contact et pause à nouveau
    cy.getBySelLike("user-list-item").first().click();
    cy.pause();
    // Explore le formulaire de transaction

    // Continuer le test
    cy.get("#amount").type("10");
  });

  // ──────────────────────────────────────────────
  // SC84 — Utiliser .debug() sur un élément
  // ──────────────────────────────────────────────
  it("SC84 - devrait utiliser .debug() pour inspecter un élément dans la console", () => {
    // .debug() affiche l'élément dans la console du navigateur
    // ⚠️ Il faut ouvrir les DevTools (F12) AVANT de lancer le test

    // Inspecter le solde dans la console
    cy.getBySel("sidenav-user-balance").debug();
    // → Regarde dans la console : tu verras l'élément DOM

    // Inspecter le premier élément de la liste de transactions
    cy.getBySelLike("transaction-item").first().debug();

    // Utiliser .then() + debugger pour inspecter une valeur
    cy.getBySel("sidenav-user-balance")
      .invoke("text")
      .then((text) => {
        // "debugger" arrête le navigateur ici si les DevTools sont ouvertes
        debugger;
        cy.log("Solde : " + text);
      });
  });

  // ──────────────────────────────────────────────
  // SC85 — Mode d'exécution headless
  // ──────────────────────────────────────────────
  it("SC85 - ce test est conçu pour le mode headless (cypress run)", () => {
    // Ce test n'utilise PAS cy.pause() ni .debug()
    // car en mode headless il n'y a pas d'interface graphique
    // Lance-le avec : npx cypress run --spec "cypress/tests/fil-rouge/module-5/debug.cy.js"

    // Vérifier la connexion
    cy.getBySel("sidenav-user-full-name").should("be.visible");

    // Vérifier qu'il y a des transactions
    cy.getBySelLike("transaction-item").should("have.length.greaterThan", 0);

    // Screenshot automatique — fonctionne aussi en mode headless
    cy.screenshot("headless/dashboard-verification");

    // Après l'exécution, vérifie :
    // - Les screenshots dans cypress/screenshots/
    // - La vidéo dans cypress/videos/ (si activé dans cypress.config)
  });
});
