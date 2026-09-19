#!/usr/bin/env node
/* Genere la feuille d'exercices imprimable exercices.md.
   Usage : node generer-exercices.js [graine]   (par defaut 20260919)      */
'use strict';
const fs = require('fs');
const path = require('path');
const P = require('./engine.js');

const seed = parseInt(process.argv[2] || '20260919', 10);
const rng = P.mulberry32(seed);
const card = (c) => P.RANKS[c % 13] + P.SUITS[P.suitOf(c)];
const hand = (cs) => cs.map(card).join(' ');

const SERIES = [
  { titre: 'Série 1 — Tirages nets', niveau: 'facile', n: 10,
    intro: "Un ou deux tirages par main, au flop. Vise moins de dix secondes par exercice." },
  { titre: 'Série 2 — Mains ordinaires', niveau: 'normal', n: 8,
    intro: "Tout ce que la distribution donne, y compris les mains à deux ou trois outs." },
  { titre: 'Série 3 — Au turn, une seule carte', niveau: 'turn', n: 6,
    intro: "Une carte à venir : c'est la règle du 2 qui s'applique ensuite." },
  { titre: 'Série 4 — Outs combinées', niveau: 'expert', n: 6,
    intro: "Au moins deux familles d'outs à additionner — attention aux cartes comptées deux fois." }
];

let num = 0;
const enonces = [];
const corriges = [];

for (const s of SERIES) {
  enonces.push('\n## ' + s.titre + '\n\n_' + s.intro + '_\n');
  corriges.push('\n## ' + s.titre + '\n');
  for (let i = 0; i < s.n; i++) {
    const a = P.generate(s.niveau, rng);
    num++;
    const street = a.board.length === 3 ? 'Flop' : 'Turn';
    const next = a.board.length === 3 ? 'au turn' : 'à la rivière';

    enonces.push(
      '**' + num + '.** ' + street + ' : `' + hand(a.board) + '`  \n' +
      'Toi : `' + hand(a.hero) + '` — Lui : `' + hand(a.villain) + '`  \n' +
      'Combien d\'outs ' + next + ' ? ' + a.unseen + ' cartes inconnues. ' +
      '→ `____` outs, soit `____` %\n'
    );

    const fam = a.families.map(f => '- **' + f.count + '** → ' + f.name.toLowerCase() +
      ' : ' + f.cards.slice().sort((x, y) => (y % 13) - (x % 13)).map(card).join(' ')).join('\n');

    corriges.push(
      '**' + num + '. ' + a.outs.length + ' outs' +
      ' — règle du ' + (a.cardsToCome >= 2 ? '4' : '2') + ' : ' + P.ruleOfTwoFour(a.outs.length, a.cardsToCome) +
      ' %, équité réelle ' + Math.round(a.equity * 100) + ' %**  \n' +
      'Tu as ' + P.handLabel(a.heroNow, true) + ', il a ' + P.handLabel(a.villainNow, true) + '.\n\n' +
      (fam || '- aucune carte ne te fait passer devant') +
      (a.splits.length ? '\n- ' + a.splits.length + ' carte(s) de partage : ' + a.splits.map(card).join(' ') : '') +
      '\n'
    );
  }
}

const doc = `# Compter les outs — feuille d'exercices

> Situations tirées au hasard, corrigées par énumération complète du paquet.
> Graine ${seed} : \`node generer-exercices.js <graine>\` en produit une autre.

**Règle du jeu.** L'adversaire a retourné ses cartes ; tu es derrière à chaque fois.
Compte les cartes du paquet qui te font passer **devant** à la prochaine carte —
ni les cartes qui « améliorent » ta main, ni celles qui égalisent.
Puis convertis : × 4 au flop (deux cartes à venir), × 2 au turn.

Couleurs : ${P.SUITS[0]} pique · ${P.SUITS[1]} cœur · ${P.SUITS[2]} carreau · ${P.SUITS[3]} trèfle.
Rangs : V valet, D dame, R roi, A as.

---
${enonces.join('\n')}
---

# Corrigés
${corriges.join('\n')}
---

## Rappel

| Tirage | Outs |
|---|---|
| Couleur | 9 |
| Quinte bilatérale | 8 |
| Quinte par le ventre | 4 |
| Deux overcards | 6 |
| Paire → brelan | 2 |
| Brelan → full ou carré | 7 |
| Couleur + bilatérale | 15 |
| Couleur + ventrale | 12 |

L'équité réelle indiquée dans les corrigés tient compte des deux cartes à venir :
quand elle est nettement sous la règle du 4, c'est que l'adversaire garde un retour
sur la rivière après être passé derrière au turn.
`;

fs.writeFileSync(path.join(__dirname, 'exercices.md'), doc);
console.log(num + ' exercices écrits dans exercices.md (graine ' + seed + ')');
