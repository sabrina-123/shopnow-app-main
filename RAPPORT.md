# Rapport TP Selenium - ShopNow

## 1. Présentation

Ce projet contient une application e-commerce ShopNow développée avec Node.js et Express, ainsi qu'une suite de tests End-to-End Selenium écrits avec Mocha et Chai.

## 2. Technologies utilisées

- Selenium WebDriver
- Mocha
- Chai
- Node.js
- Express
- ChromeDriver et Google Chrome

## 3. Organisation du projet

```text
tests/
├── e2e/
│   ├── home.test.js
│   ├── products.test.js
│   ├── login.test.js
│   ├── login-success.test.js
│   ├── login-failure.test.js
│   ├── register.test.js
│   ├── cart-add.test.js
│   ├── cart-quantity.test.js
│   ├── cart-total.test.js
│   ├── cart-remove.test.js
│   ├── cart-clear.test.js
│   ├── logout.test.js
│   ├── explicit-wait.test.js
│   └── multiple-products.test.js
└── pages/
    ├── LoginPage.js
    ├── ProductsPage.js
    └── CartPage.js
```

## 4. Scénarios couverts

1. Vérification de la page d'accueil.
2. Accès à la page Produits.
3. Connexion réussie.
4. Connexion refusée avec un mauvais mot de passe.
5. Création d'un compte avec une adresse email unique.
6. Ajout d'un produit au panier.
7. Modification de la quantité d'un produit.
8. Calcul fonctionnel du total.
9. Suppression d'un produit.
10. Vidage complet du panier.
11. Déconnexion d'un utilisateur.
12. Utilisation d'attentes explicites Selenium.
13. Ajout et vérification de plusieurs produits.
14. Refactorisation d'un test avec le Page Object `LoginPage`.

Les tests utilisent des sélecteurs `data-testid`, réalisent des actions utilisateur et contiennent des assertions Chai.

## 5. Attentes explicites

Les tests utilisent notamment :

- `until.elementLocated(...)` pour attendre la présence d'un élément ;
- `until.elementIsVisible(...)` pour attendre qu'un élément soit disponible avant une action ;
- `until.alertIsPresent()` pour attendre les alertes d'ajout au panier ;
- `until.urlIs(...)` pour attendre une redirection.

Aucun délai fixe de type `sleep` n'est utilisé dans les scénarios.

## 6. Page Objects

Les Page Objects centralisent les sélecteurs et les actions principales :

- `LoginPage` : ouverture, attente du formulaire et connexion ;
- `ProductsPage` : ouverture, consultation d'un produit et ajout au panier ;
- `CartPage` : ouverture, modification de quantité, suppression et vidage du panier.

Cette organisation sépare le scénario de test des détails Selenium et facilite la maintenance.

## 7. Exécution

Installer les dépendances :

```powershell
npm install
```

Lancer toute la suite :

```powershell
npm test
```

Le script npm est défini ainsi :

```json
"test": "mocha \"tests/e2e/**/*.test.js\""
```

La découverte Mocha a confirmé 14 tests dans `tests/e2e`.

## 8. Versionnement

Le projet est versionné avec Git et synchronisé avec le dépôt GitHub :

```text
https://github.com/sabrina-123/shopnow-app-main
```

Commandes utilisées pour publier une nouvelle version :

```powershell
git status
git add .
git commit -m "Décrit les modifications"
git push
```

## 9. Conclusion

La suite couvre les principaux parcours fonctionnels de ShopNow : navigation, authentification, inscription, gestion du panier et calcul du total. L'utilisation des Page Objects et des attentes explicites rend les tests plus lisibles, réutilisables et robustes face aux temps de chargement.
