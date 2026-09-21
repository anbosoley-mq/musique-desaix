# Activité Musique — Desaix

Application de gestion de la section musique du CSAMM : inscriptions,
cotisations, chèques, créneaux. Utilisée par le bureau de la section.

## Ce qu'est le dépôt

Quatre fichiers, pas de build, pas de dépendances installées :

- `index.html` — **toute** l'application (HTML, CSS et JavaScript en ligne,
  ~400 Ko). Firebase (auth + Firestore) et SheetJS sont chargés par CDN.
- `manifest.json`, `icon-192.png`, `icon-512.png` — l'installation en PWA.

`main` est publié par GitHub Pages : **ce qui est sur `main` est ce que voient
les collègues**, après rafraîchissement.

## La règle de travail

Les modifications se font **dans une session Claude, à partir de la version
de `main`** — jamais en téléversant un fichier repris d'un poste.

Deux fois (les 15 et 20-21 sept. 2026), un « Add files via upload » fait
depuis une copie locale plus ancienne a effacé du travail déjà publié. Le
fichier étant unique et monolithique, un upload remplace tout.

Si une modification doit malgré tout partir d'un poste, récupérer d'abord
<https://github.com/anbosoley-mq/musique-desaix/raw/main/index.html>.

## À faire à chaque modification publiée

Changer `APP_VERSION` (vers la ligne 3050) pour la date du jour. C'est ce
que la section lit en bas du menu et sur l'écran de connexion pour vérifier
qu'elle a bien la dernière version.

## Vérifier une modification

Il n'y a pas de suite de tests. Ce qui marche bien :

1. **Syntaxe** — extraire les blocs `<script>` sans `src` et les passer à
   `new vm.Script(...)` sous Node.
2. **Navigateur** — servir le dossier (`npx http-server -p 8899 -s .`) et le
   piloter avec Playwright (Chromium est déjà là : `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`,
   module global `/opt/node22/lib/node_modules/playwright`).
   - Bloquer le réseau externe (`page.route(/^https?:\/\/(?!127\.0\.0\.1)/, r => r.abort())`) :
     sans Firebase, l'appli masque l'écran de connexion et passe en mode local.
   - `SEED` est vide et la saison courante démarre à zéro : amorcer les
     données en écrivant `musique_saison_<label>_adherents` dans
     `localStorage`, puis recharger.
   - Ouvrir le fichier en `file://` ne suffit pas : `localStorage` y est
     inutilisable, la liste reste vide.

## Ce qu'il faut savoir du modèle de données

- `adherents` est un tableau ; **son ordre est l'ordre d'affichage** de la
  liste, et il est repris par l'export Excel, les mails et les paiements.
- `paiementStatus[n]` — `{adh,t1,t2,t3}` booléens : ce qui a été encaissé.
  À ne pas confondre avec `a.paie` (`OUI` / `PARTIEL` / `NON`), qui est
  l'état porté par la fiche et sur lequel s'appuient les filtres.
- Une saison = une clé `musique_saison_<label>_*` dans `localStorage`, plus
  le même contenu dans Firestore ; `saveData()` écrit les deux.
- Une fiche ouverte depuis une autre page mémorise son retour dans
  `ficheRetour` (voir `RETOURS`).

## Prudence

Les suppressions de fiches ont déjà coûté des données à la section. Les
garde-fous en place (nom dans la confirmation, seconde confirmation quand
des chèques sont en jeu, « Annuler » qui restaure la fiche) sont
intentionnels : ne pas les alléger.
