# TP Fil Rouge — Tester l'app bancaire RealWorld avec Cypress

## Contexte

Tu es recruté(e) comme **QA Automation Engineer** chez "RealWorld Bank".
L'entreprise a développé une application de paiement entre particuliers (type Venmo / Lydia).
Ta mission : **automatiser les tests end-to-end de l'application** avec Cypress.

Tu vas construire ta suite de tests **progressivement**, module après module, en suivant les consignes ci-dessous.

---

## Important : tu travailles DANS le projet existant

Tu ne crées PAS un nouveau projet Cypress.
Le projet `cypress-realworld-app` contient déjà Cypress installé et configuré.
Tu vas ajouter tes fichiers de test dans le dossier :

```
cypress/tests/fil-rouge/
```

La configuration Cypress est déjà faite :
- `baseUrl` : `http://localhost:3000`
- `apiUrl` : `http://localhost:3001` (variable d'environnement)
- Commandes personnalisées déjà disponibles : `cy.getBySel()`, `cy.getBySelLike()`, `cy.login()`, `cy.loginByApi()`, `cy.database()`

### Commandes personnalisées — Détails importants

| Commande | Comportement |
|----------|-------------|
| `cy.login('Heath93', 's3cret')` | Se connecte **via l'UI** : visite `/signin`, tape les identifiants, clique sur "Sign In". Déclenche des requêtes HTTP. |
| `cy.loginByApi('Heath93')` | Se connecte **via une requête HTTP** `POST /login` (sans charger la page). Plus rapide, utilisé pour les tests API. |
| `cy.database('find', 'users', { username: 'Heath93' })` | Requête directe à la base de données SQLite. Retourne l'objet utilisateur complet (avec `id`). |

> ⚠️ **`cy.login()` charge la page de connexion.** Si tu as besoin de charger une autre page après, utilise `cy.visit('/')`.
>
> ⚠️ **`GET /users` exclut l'utilisateur connecté** de la liste. Pour récupérer ton propre `id`, utilise `cy.database('find', 'users', { username: '...' })`.

### `cy.intercept()` — Pièges courants

- Utilise le préfixe `**/` dans les patterns URL pour matcher toute URL contenant ce chemin :
  ```javascript
  // ✅ Bon — matche http://localhost:3001/transactions/public?page=1...
  cy.intercept('GET', '**/transactions/public*')

  // ❌ Risqué — peut ne pas matcher selon la configuration
  cy.intercept('GET', '/transactions/public*')
  ```
- La page d'accueil charge `/transactions/public` (pas `/transactions`)
- `cy.intercept()` doit être appelé **AVANT** que la requête ne parte

---

## Étape 1 — Récupérer le projet sur ton ordinateur

### C'est quoi Git et GitHub ?

- **Git** = un outil qui permet de sauvegarder et suivre les modifications de ton code (comme un historique)
- **GitHub** = un site web qui héberge du code. C'est là que se trouve le projet de ce TP
- **Cloner** = télécharger une copie du projet depuis GitHub vers ton ordinateur

> 💡 Tu n'as pas besoin de maîtriser Git pour ce TP. On te demande juste d'exécuter **2 commandes** pour récupérer le projet. C'est tout !

### Pré-requis

Avant de commencer, vérifie que tu as :

1. **Node.js** installé → Vérifie en tapant dans ton terminal :
   ```bash
   node --version
   ```
   Tu dois voir un numéro de version (ex: `v18.17.0`). Si ce n'est pas le cas, télécharge Node.js sur [nodejs.org](https://nodejs.org) (version LTS recommandée).

2. **Git** installé → Vérifie en tapant :
   ```bash
   git --version
   ```
   Tu dois voir un numéro de version (ex: `git version 2.39.0`). Si ce n'est pas le cas :
   - **Mac** : tape `xcode-select --install` dans le terminal
   - **Windows** : télécharge Git sur [git-scm.com](https://git-scm.com)
   - **Linux** : `sudo apt install git`

### Récupérer le projet

Ouvre ton **terminal** (ou "invite de commandes" sur Windows) et tape ces 2 commandes :

```bash
git clone https://github.com/Zotomatise/tp-fil-rouge-cypress.git
```

> ⬆️ Cette commande télécharge le projet dans un dossier `tp-fil-rouge-cypress` sur ton ordinateur.

```bash
cd tp-fil-rouge-cypress
```

> ⬆️ Cette commande te place à l'intérieur du dossier du projet.

**Tu es maintenant dans le projet.** Toutes les commandes suivantes doivent être exécutées depuis ce dossier.

> ⚠️ **Où exécuter ces commandes ?**
> - **Mac** : ouvre l'app "Terminal" (cherche "Terminal" dans Spotlight)
> - **Windows** : ouvre "Git Bash" (installé avec Git) ou "PowerShell"
> - **VS Code** : utilise le terminal intégré (menu `Terminal > Nouveau terminal` ou raccourci `` Ctrl+` ``)

---

## Étape 2 — Installer les dépendances

### Yarn, c'est quoi ?

Ce projet utilise **yarn** comme gestionnaire de paquets (à la place de npm).
Yarn et npm font la même chose : installer des dépendances Node.js.
La différence principale : yarn utilise un fichier `yarn.lock` (au lieu de `package-lock.json`).

**Pourquoi yarn ici ?** Le projet a été créé avec yarn par l'équipe Cypress.
Les scripts internes du projet (`npm run dev`, etc.) appellent yarn en arrière-plan.
C'est pour ça qu'il faut l'installer.

| npm | yarn | C'est la même chose |
|-----|------|---------------------|
| `npm install` | `yarn install` | Installer les dépendances |
| `npm run dev` | `yarn dev` | Lancer un script |
| `npm install cypress` | `yarn add cypress` | Ajouter un paquet |
| `package-lock.json` | `yarn.lock` | Fichier de verrouillage |

### Installation

Tape ces commandes **une par une** dans ton terminal :

```bash
# 1. Installer yarn (à faire une seule fois)
npm install -g yarn
```

> ⬆️ Installe yarn sur ton ordinateur. Tu ne le feras qu'une seule fois.

```bash
# 2. Installer les dépendances du projet
yarn install
```

> ⬆️ Télécharge toutes les librairies dont le projet a besoin (Cypress, React, etc.). Ça peut prendre 2-3 minutes.

**⚠️ En cas d'erreur "ERESOLVE" :**
Si `yarn install` affiche une erreur, pas de panique ! Tape cette commande à la place :
```bash
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm install --legacy-peer-deps
```
Le flag `--legacy-peer-deps` ignore les conflits de versions entre certaines dépendances. C'est sans risque pour notre usage.

> 💡 **Comment savoir si l'installation a réussi ?** Tu ne dois pas voir de message "ERROR" en rouge. Des "warnings" en jaune, c'est normal, on les ignore.

---

## Étape 3 — Lancer l'application

```bash
# Lancer l'app (frontend + API + base de données)
npm run dev
```

Cette commande lance :
- Le **frontend React** sur `http://localhost:3000`
- L'**API Express** sur `http://localhost:3001`
- La **base de données SQLite** (fichier local)

Ouvre `http://localhost:3000` dans ton navigateur pour vérifier que l'app tourne.

> ⚠️ **Le terminal reste "bloqué" après `npm run dev` : c'est normal !** L'app tourne en arrière-plan. Ne ferme pas ce terminal. Pour taper d'autres commandes, **ouvre un 2ème terminal** (ou un 2ème onglet dans VS Code).

---

## Étape 4 — Comptes utilisateurs disponibles

Connecte-toi avec un de ces comptes pour explorer l'application :

| Username            | Mot de passe |
|---------------------|-------------|
| `Heath93`           | `s3cret`    |
| `Arvilla_Hegmann`   | `s3cret`    |
| `Dina20`            | `s3cret`    |
| `Reyes.Osinski`     | `s3cret`    |
| `Judah_Dietrich50`  | `s3cret`    |

Le mot de passe est **`s3cret`** pour tous les comptes.

---

## Étape 5 — Lancer Cypress et les tests

> ⚠️ **Avant de lancer Cypress**, assure-toi que l'application tourne déjà (étape 3) dans un autre terminal.

### Mode interactif (RECOMMANDÉ pour travailler)

Ouvre un **2ème terminal** (l'app tourne déjà dans le 1er) et tape :

```bash
npx cypress open
```

Ensuite dans la fenêtre Cypress :
1. Clique sur **"E2E Testing"**
2. Choisis **"Chrome"** (ou un autre navigateur)
3. Clique sur **"Start E2E Testing in Chrome"**
4. Tu verras la liste des fichiers de test → navigue dans `tests/fil-rouge/` et clique sur le fichier du module en cours

### Mode headless (pour vérifier que tout passe)

```bash
# Lancer TOUS les tests du fil rouge
npx cypress run --spec "cypress/tests/fil-rouge/**/*.cy.js"

# Lancer un seul module (exemple : module 2)
npx cypress run --spec "cypress/tests/fil-rouge/module-2/**/*.cy.js"
```

> 💡 Le mode headless lance les tests sans ouvrir de navigateur visible. C'est plus rapide mais moins pratique pour débuguer.

---

## Sélecteurs disponibles dans l'application

L'application utilise des attributs `data-test` sur les éléments HTML pour faciliter les tests.
Tu dois utiliser les commandes suivantes pour cibler les éléments :

```javascript
// Sélecteur exact — cible l'élément avec data-test="signin-username"
cy.getBySel('signin-username')

// Sélecteur partiel — cible les éléments dont data-test CONTIENT "transaction-item"
cy.getBySelLike('transaction-item')

// Équivalent avec cy.get() classique :
cy.get('[data-test="signin-username"]')     // exact
cy.get('[data-test*="transaction-item"]')   // partiel (contient)
```

### Liste des sélecteurs principaux

**Authentification :**
- `signin-username`, `signin-password`, `signin-remember-me`, `signin-submit`, `signin-error`
- `signup-first-name`, `signup-last-name`, `signup-username`, `signup-password`, `signup-confirmPassword`, `signup-submit`

**Navigation (sidebar) :**
- `sidenav-home`, `sidenav-user-settings`, `sidenav-bankaccounts`, `sidenav-notifications`, `sidenav-signout`
- `sidenav-user-full-name`, `sidenav-username`, `sidenav-user-balance`

**Navigation (top bar) :**
- `nav-top-new-transaction`, `nav-top-notifications-count`

**Onglets transactions :**
- `nav-public-tab`, `nav-contacts-tab`, `nav-personal-tab`

**Transactions :**
- `transaction-list` — la liste complète
- `transaction-item` (partiel) — chaque transaction dans la liste
- `transaction-create-submit-payment` — bouton "Pay"
- `transaction-create-submit-request` — bouton "Request"
- `transaction-list-filter-date-range-button` — filtre par date
- `transaction-list-filter-amount-range-button` — filtre par montant
- `transaction-list-empty-create-transaction-button` — bouton quand liste vide
- `new-transaction-return-to-transactions` — retour après paiement
- `new-transaction-create-another-transaction` — créer un autre paiement

**Détail d'une transaction :**
- `transaction-detail-header` — en-tête du détail
- `transaction-description` (partiel) — description
- `transaction-amount` (partiel) — montant
- `sender` (partiel) — émetteur
- `receiver` (partiel) — destinataire
- `like-button` (partiel) — bouton Like
- `like-count` (partiel) — compteur de likes
- `comment-input` (partiel) — champ commentaire
- `comments-list` — liste des commentaires
- `transaction-accept-request` (partiel) — accepter une demande
- `transaction-reject-request` (partiel) — refuser une demande

**Notifications :**
- `notifications-list` — liste des notifications
- `notification-list-item` (partiel) — chaque notification
- `notification-mark-read` (partiel) — marquer comme lu

**Comptes bancaires :**
- `bankaccount-list` — liste des comptes
- `bankaccount-new` — bouton "Create"
- `bankaccount-submit` — bouton "Save"
- `bankaccount-delete` (partiel) — bouton "Delete"
- `bankaccount-list-item` (partiel) — chaque compte
- `bankName-input` (partiel) — champ nom de banque
- `routingNumber-input` (partiel) — champ routing number
- `accountNumber-input` (partiel) — champ account number
- ⚠️ Pour les champs de saisie du formulaire bancaire, le `data-test` est sur le **wrapper div**, pas sur l'input. Il faut ajouter `.find('input')` pour cibler le vrai champ. Exemple : `cy.getBySelLike('bankName-input').find('input').type('...')`

**Paramètres utilisateur :**
- `user-settings-form` — le formulaire
- `user-settings-submit` — bouton "Save"
- ⚠️ Les champs du formulaire (firstName, lastName, email, phoneNumber) n'ont **pas** d'attribut `data-test` sur l'input. Il faut utiliser `cy.get("input[name='firstName']")` pour les cibler.

**Onboarding (première connexion) :**
- `user-onboarding-dialog` — le dialog
- `user-onboarding-dialog-title` — titre du dialog
- `user-onboarding-next` — bouton "Next" / "Done"

**Formulaire de transaction :**
- `users-list` — liste des contacts pour payer/demander
- `user-list-item` (partiel) — chaque contact
- `#amount` — champ montant (sélecteur CSS classique)
- `#transaction-create-description-input` — champ description (sélecteur CSS classique)

---

## Structure des fichiers

```
cypress/tests/fil-rouge/
  ├── CONSIGNES.md                 ← CE FICHIER
  │
  ├── module-2/                     Mocha et premiers tests
  │   ├── signup.cy.js              (6 scénarios)
  │   ├── login.cy.js               (8 scénarios)
  │   └── logout.cy.js              (3 scénarios)
  │
  ├── module-3/                     Interaction avec le DOM
  │   ├── onboarding.cy.js          (4 scénarios)
  │   ├── navigation.cy.js          (10 scénarios)
  │   ├── transaction-list.cy.js    (7 scénarios)
  │   └── elements.cy.js            (6 scénarios)
  │
  ├── module-4/                     Debug, POM, fixtures, commandes custom
  │   ├── debug.cy.js               (5 scénarios)
  │   ├── fixtures/                 Données de test externalisées
  │   ├── pages/                    Page Objects à compléter
  │   └── commands/                 Commandes personnalisées
  │
  ├── module-5/                     Assertions avancées, waits, CRUD
  │   ├── create-payment.cy.js      (8 scénarios)
  │   ├── create-request.cy.js      (5 scénarios)
  │   ├── notifications.cy.js       (5 scénarios)
  │   ├── waits.cy.js               (6 scénarios)
  │   ├── account-settings.cy.js    (5 scénarios)
  │   ├── bank-accounts.cy.js       (4 scénarios)
  │   └── likes-comments.cy.js      (3 scénarios)
  │
  └── module-6/                     API, Mock, BDD, CI
      ├── api/                      Tests API REST (14 scénarios)
      ├── mock-api/                 Mock avec cy.intercept() (6 scénarios)
      ├── bdd/                      Scénarios Cucumber/Gherkin
      └── ci/                       Pipeline Jenkins
```

---

## Comment travailler

1. **Ouvre le fichier** du module en cours dans VS Code
2. **Lis les commentaires** en haut du fichier (objectif, concepts, sélecteurs)
3. **Complète les `// TODO`** dans chaque bloc `it()`
4. **Lance le test** avec `npx cypress open` pour vérifier
5. **Tous les tests doivent passer au vert** avant de passer au module suivant

---

## Progression

| Module | Objectif | Nb scénarios |
|--------|----------|-------------|
| 2 | Structurer des tests avec Mocha (describe, it, hooks) | 17 |
| 3 | Interagir avec le DOM (sélecteurs, find, parent, invoke) | 27 |
| 4 | Debug, POM, fixtures, commandes custom | 5 + refacto |
| 5 | Assertions avancées, timeouts, waits, CRUD | 36 |
| 6 | Tester les API, mocker, BDD Cucumber, CI Jenkins | 20 |
| **Total** | | **105+ scénarios** |
