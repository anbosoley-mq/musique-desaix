# Poker — compter les outs

Entraînement au comptage des outs au Texas Hold'em. Tout est calculé, rien n'est
approximé : les corrections viennent d'une énumération complète du paquet.

## Ce qu'il y a dans le dossier

| Fichier | À quoi ça sert |
|---|---|
| `index.html` | L'entraîneur interactif. Ouvre-le dans un navigateur, c'est tout. |
| `engine.js` | Le moteur : évaluateur de mains 7 cartes, calcul des outs et de l'équité, tirage des situations. |
| `exercices.md` | Une feuille de 30 exercices avec corrigés, à imprimer ou à lire sur téléphone. |
| `generer-exercices.js` | Régénère `exercices.md` avec une autre série de mains. |
| `test-engine.js` | Vérifie le moteur sur des situations de référence (tirage couleur = 9 outs, bilatérale = 8…). |

## Utiliser l'entraîneur

Ouvre `index.html` (double-clic, ou via le site une fois la branche fusionnée).
À chaque main, l'adversaire a retourné ses cartes et tu es derrière : compte les
cartes qui te font passer **devant** à la prochaine carte, puis tape ton nombre
au clavier ou au doigt. La correction donne les cartes une par une, regroupées
par famille, avec l'équité exacte à côté de la règle du 2 et du 4.

Quatre niveaux : **Découverte** (un ou deux tirages nets face à une main faite),
**Classique** (tout ce que le hasard donne), **Turn** (une seule carte à venir),
**Expert** (au moins deux familles d'outs à combiner).

L'onglet **Mémo** contient la méthode, le tableau des tirages classiques, la
règle du 2 et du 4 avec les pourcentages réels, les outs à décoter et les cotes
du pot.

## Régénérer la feuille d'exercices

```sh
node generer-exercices.js          # graine par défaut
node generer-exercices.js 12345    # autre série, reproductible
```

## Lancer les tests du moteur

```sh
node test-engine.js
```

## Définition retenue pour « out »

Une out est une carte qui fait passer le héros **devant la main adverse à la
prochaine carte** — pas une carte qui « améliore » simplement sa main, et pas une
carte qui égalise (celles-là sont comptées à part, comme cartes de partage).

Les pourcentages de l'entraîneur sont calculés sur **45 cartes inconnues au flop**
et 44 au turn, puisque les deux cartes adverses sont visibles. Dans un vrai coup,
à l'aveugle, ce serait 47 et 46 : moins d'un point d'écart.

L'équité affichée, elle, va **jusqu'à la rivière** : c'est pour ça qu'elle tombe
parfois sous la règle du 4. L'écart, c'est exactement la part des outs qui laisse
un retour à l'adversaire sur la dernière carte.
