# Activité Musique — Desaix

Application de gestion de la section musique du CSAMM : inscriptions,
cotisations, chèques, créneaux. Utilisée par le bureau de la section.

## Ce qu'est le dépôt

Quatre fichiers, pas de build, pas de dépendances installées :

- `index.html` — **toute** l'application (HTML, CSS et JavaScript en ligne,
  ~400 Ko). Firebase (auth + Firestore) et SheetJS sont chargés par CDN.
- `manifest.json`, `icon-192.png`, `icon-512.png` — l'installation en PWA.
- `version.json` — la version publiée, que l'appli interroge pour signaler
  d'elle-même qu'un navigateur tourne sur une version périmée.

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

Mettre la date du jour aux **trois** endroits, ensemble :

1. `APP_VERSION` — ce qui s'affiche en bas du menu et sur l'écran de
   connexion (« Version du 23 sept. 2026 »).
2. `APP_VERSION_ISO` — la même date en `AAAA-MM-JJThh:mm` (UTC), c'est
   elle qui se compare. L'heure compte : deux publications le même jour
   doivent rester distinguables, sinon la seconde passe inaperçue.
3. `version.json` — les deux champs, `version` et `iso`.

L'appli lit `version.json` au démarrage et à chaque retour au premier plan
(au plus une fois toutes les cinq minutes), sans cache. Si la date publiée
est **postérieure** à `APP_VERSION_ISO`, elle affiche un bandeau proposant
de recharger ; le rechargement ajoute `?maj=<horodatage>` pour contourner
le cache du navigateur, qui est ce qui retient l'ancienne version.

Oublier `version.json` ne déclenche pas de fausse alerte — la comparaison
est stricte — mais prive les collègues de l'avertissement. Oublier
`APP_VERSION_ISO` le déclencherait indéfiniment : ces deux-là vont ensemble.

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
- `dismissedAlerts` (bandeaux d'encaissement écartés, par date affichée) et
  `mailHistorique` (mails envoyés ou mis en brouillon) sont **partagés** :
  ils partent dans la saison Firestore et reviennent par le `onSnapshot`.
  Écarté ou notifié une fois = pour toute la section, sur tous les appareils.
  Trois règles à ne pas défaire, chacune a sa raison :
  - la réception **additionne**, elle ne remplace pas (`fusionHistorique`,
    union des mises à l'écart) — un appareil en retard ne doit pas effacer ce
    que les autres savent, et « envoyé » l'emporte sur « brouillon » ;
  - `cloudSave()` n'envoie ces deux champs que si `cloudReady` — avant la
    première réception, l'appareil en sait moins que le cloud ;
  - ce que l'appareil est seul à connaître est republié juste après la
    réception, sinon l'historique d'avant le partage resterait invisible.
  Le stockage local n'en est plus que le cache hors-ligne.

## Prudence

Les suppressions de fiches ont déjà coûté des données à la section. Les
garde-fous en place (nom dans la confirmation, seconde confirmation quand
des chèques sont en jeu, « Annuler » qui restaure la fiche) sont
intentionnels : ne pas les alléger.
