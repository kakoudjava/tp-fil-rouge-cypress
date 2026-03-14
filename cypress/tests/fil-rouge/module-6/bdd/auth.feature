# ============================================================
# TP FIL ROUGE — MODULE 6 : BDD avec Cucumber — Authentification
# ============================================================
#
# OBJECTIF :
# Écrire des scénarios de test en langage Gherkin (Given/When/Then).
# Ces fichiers .feature sont lisibles par n'importe qui (même non-technique).
#
# PRÉREQUIS :
# Installer le plugin Cucumber pour Cypress :
#   npm install @badeball/cypress-cucumber-preprocessor --save-dev
#   npm install @bahmutov/cypress-esbuild-preprocessor --save-dev
#
# Puis configurer dans cypress.config.js (voir la doc du plugin)
#
# CONSIGNES :
# 1. Écris les scénarios ci-dessous en Gherkin
# 2. Puis crée les step definitions dans step_definitions/auth.js
# ============================================================

Feature: Authentification utilisateur

  En tant qu'utilisateur de l'application RealWorld Bank
  Je veux pouvoir me connecter et me déconnecter
  Afin d'accéder à mon compte en toute sécurité

  Background:
    Given la base de données est réinitialisée

  # ── Scénario 1 : Connexion réussie ──

  Scenario: Connexion avec des identifiants valides
    Given je suis sur la page de connexion
    When je saisis le username "Heath93"
    And je saisis le mot de passe "s3cret"
    And je clique sur le bouton "Sign In"
    Then je suis redirigé vers le dashboard
    And je vois mon nom dans la sidebar

  # ── Scénario 2 : Connexion échouée ──

  Scenario: Connexion avec un mauvais mot de passe
    Given je suis sur la page de connexion
    When je saisis le username "Heath93"
    And je saisis le mot de passe "mauvais_mot_de_passe"
    And je clique sur le bouton "Sign In"
    Then je vois le message d'erreur "Username or password is invalid"

  # ── Scénario 3 : Déconnexion ──

  Scenario: Déconnexion depuis le dashboard
    Given je suis connecté avec "Heath93" et "s3cret"
    When je clique sur "Logout" dans la sidebar
    Then je suis redirigé vers la page de connexion

  # ── Scénario 4 : Inscription ──

  Scenario: Inscription d'un nouvel utilisateur
    Given je suis sur la page d'inscription
    When je remplis le formulaire avec les données suivantes :
      | firstName | lastName | username      | password  |
      | Jean      | Test     | JeanTest123   | Test1234! |
    And je clique sur le bouton "Sign Up"
    Then je suis redirigé vers la page de connexion
