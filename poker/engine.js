/* ===========================================================
   Moteur de calcul d'outs — Texas Hold'em
   Aucune dépendance. Utilisable dans le navigateur ou dans Node.
   Une carte = un entier 0..51 :  couleur = i / 13,  rang = 2 + i % 13
   =========================================================== */
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.PokerOuts = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const RANKS = ['2','3','4','5','6','7','8','9','10','V','D','R','A'];
  const SUITS = ['♠','♥','♦','♣'];            // pique, coeur, carreau, trefle
  const SUIT_NAMES = ['pique','cœur','carreau','trèfle'];
  const SUIT_LETTERS = ['p','c','k','t'];

  const rankOf = (c) => 2 + (c % 13);
  const suitOf = (c) => Math.floor(c / 13);
  const cardLabel = (c) => RANKS[c % 13] + SUITS[suitOf(c)];
  const cardText  = (c) => RANKS[c % 13] + SUIT_LETTERS[suitOf(c)];
  const fullDeck  = () => Array.from({ length: 52 }, (_, i) => i);

  /* ---------- Evaluation d'une main de 5 a 7 cartes ----------
     Retourne un tableau comparable lexicographiquement :
     [categorie, ...departages]  (8 = quinte flush ... 0 = hauteur) */
  const CATEGORIES = [
    'Hauteur', 'Paire', 'Double paire', 'Brelan', 'Quinte',
    'Couleur', 'Full', 'Carré', 'Quinte flush'
  ];

  function straightHigh(ranks) {
    const u = Array.from(new Set(ranks)).sort((a, b) => b - a);
    const list = u[0] === 14 ? u.concat([1]) : u;          // l'As joue aussi en bas (A-2-3-4-5)
    let run = 1;
    for (let i = 1; i < list.length; i++) {
      if (list[i] === list[i - 1] - 1) {
        if (++run >= 5) return list[i] + 4;
      } else if (list[i] !== list[i - 1]) run = 1;
    }
    return 0;
  }

  function evaluate(cards) {
    const count = new Array(15).fill(0);
    const bySuit = [[], [], [], []];
    for (const c of cards) { count[rankOf(c)]++; bySuit[suitOf(c)].push(rankOf(c)); }

    for (let s = 0; s < 4; s++) {
      if (bySuit[s].length >= 5) {
        const ranks = bySuit[s].sort((a, b) => b - a);
        const sf = straightHigh(ranks);
        if (sf) return [8, sf];
        return [5].concat(ranks.slice(0, 5));
      }
    }

    const distinct = [];
    for (let r = 14; r >= 2; r--) if (count[r]) distinct.push(r);
    const quads = [], trips = [], pairs = [];
    for (let r = 14; r >= 2; r--) {
      if (count[r] === 4) quads.push(r);
      else if (count[r] === 3) trips.push(r);
      else if (count[r] === 2) pairs.push(r);
    }

    if (quads.length) return [7, quads[0], distinct.filter(r => r !== quads[0])[0]];
    if (trips.length && (pairs.length || trips.length > 1)) {
      return [6, trips[0], Math.max(pairs[0] || 0, trips[1] || 0)];
    }
    const st = straightHigh(distinct);
    if (st) return [4, st];
    if (trips.length) return [3, trips[0]].concat(distinct.filter(r => r !== trips[0]).slice(0, 2));
    if (pairs.length >= 2) {
      const k = distinct.filter(r => r !== pairs[0] && r !== pairs[1])[0];
      return [2, pairs[0], pairs[1], k];
    }
    if (pairs.length === 1) return [1, pairs[0]].concat(distinct.filter(r => r !== pairs[0]).slice(0, 3));
    return [0].concat(distinct.slice(0, 5));
  }

  function compare(a, b) {
    const n = Math.max(a.length, b.length);
    for (let i = 0; i < n; i++) {
      const x = a[i] || 0, y = b[i] || 0;
      if (x !== y) return x < y ? -1 : 1;
    }
    return 0;
  }

  const handName = (score) => CATEGORIES[score[0]];

  /* Nom detaille, pour l'affichage du recapitulatif.
     lower = true met la premiere lettre en minuscule sans toucher aux rangs (A, R, D, V). */
  function handLabel(score, lower) {
    const n = (r) => RANKS[r - 2];
    let out;
    switch (score[0]) {
      case 8: out = 'Quinte flush hauteur ' + n(score[1]); break;
      case 7: out = 'Carr\u00e9 de ' + n(score[1]); break;
      case 6: out = 'Full aux ' + n(score[1]) + ' par les ' + n(score[2]); break;
      case 5: out = 'Couleur hauteur ' + n(score[1]); break;
      case 4: out = 'Quinte hauteur ' + n(score[1]); break;
      case 3: out = 'Brelan de ' + n(score[1]); break;
      case 2: out = 'Double paire ' + n(score[1]) + ' et ' + n(score[2]) +
                    (score[3] ? ', kicker ' + n(score[3]) : ''); break;
      case 1: out = 'Paire de ' + n(score[1]) +
                    (score[2] ? ', kicker ' + n(score[2]) : ''); break;
      default: out = 'Hauteur ' + n(score[1]) + (score[2] ? ' puis ' + n(score[2]) : '');
    }
    return lower ? out.charAt(0).toLowerCase() + out.slice(1) : out;
  }

  /* ---------- Analyse d'une situation ----------
     hero / villain : 2 cartes chacun, board : 3 cartes (flop) ou 4 (turn).
     Un OUT = une carte qui, sortie a la prochaine street, fait passer
     le heros devant. Les cartes qui egalisent sont comptees a part. */
  function analyse(hero, villain, board, opts) {
    const withEquity = !opts || opts.equity !== false;
    const known = hero.concat(villain, board);
    const rest = fullDeck().filter(c => known.indexOf(c) === -1);

    const heroNow = evaluate(hero.concat(board));
    const villainNow = evaluate(villain.concat(board));
    const ahead = compare(heroNow, villainNow);

    const outs = [], splits = [];
    const families = new Map();

    for (const c of rest) {
      const nb = board.concat([c]);
      const h = evaluate(hero.concat(nb));
      const v = evaluate(villain.concat(nb));
      const cmp = compare(h, v);
      if (cmp > 0) {
        outs.push(c);
        const key = handName(h);
        if (!families.has(key)) families.set(key, []);
        families.get(key).push(c);
      } else if (cmp === 0) splits.push(c);
    }

    /* Equite exacte jusqu'a la riviere (enumeration complete) */
    let win = 0, tie = 0, total = 0;
    if (!withEquity) { total = 1; }
    else if (board.length === 3) {
      for (let i = 0; i < rest.length; i++) {
        for (let j = i + 1; j < rest.length; j++) {
          const nb = board.concat([rest[i], rest[j]]);
          const cmp = compare(evaluate(hero.concat(nb)), evaluate(villain.concat(nb)));
          total++;
          if (cmp > 0) win++; else if (cmp === 0) tie++;
        }
      }
    } else {
      for (const c of rest) {
        const nb = board.concat([c]);
        const cmp = compare(evaluate(hero.concat(nb)), evaluate(villain.concat(nb)));
        total++;
        if (cmp > 0) win++; else if (cmp === 0) tie++;
      }
    }

    const famList = Array.from(families.entries())
      .map(([name, cards]) => ({ name, cards, count: cards.length }))
      .sort((a, b) => b.count - a.count);

    return {
      hero, villain, board,
      unseen: rest.length,
      heroNow, villainNow, ahead,
      outs, splits, families: famList,
      equity: (win + tie / 2) / total,
      winPct: win / total,
      tiePct: tie / total,
      cardsToCome: 5 - board.length
    };
  }

  /* Regle du 2 et du 4 */
  function ruleOfTwoFour(outs, cardsToCome) {
    return cardsToCome >= 2 ? Math.min(outs * 4, 100) : outs * 2;
  }

  /* ---------- Generation de situations ---------- */
  function shuffled(rng) {
    const d = fullDeck();
    for (let i = d.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      const t = d[i]; d[i] = d[j]; d[j] = t;
    }
    return d;
  }

  const LEVELS = {
    facile:  { street: 'flop', minOuts: 4, maxOuts: 15, maxFamilies: 2, minTopFamily: 3, villainMin: 1, realDraw: true },
    normal:  { street: 'flop', minOuts: 1, maxOuts: 21, maxFamilies: 9 },
    turn:    { street: 'turn', minOuts: 1, maxOuts: 21, maxFamilies: 9 },
    expert:  { street: 'mix',  minOuts: 1, maxOuts: 21, maxFamilies: 9, minFamilies: 2 }
  };

  function generate(levelName, rng) {
    rng = rng || Math.random;
    const cfg = LEVELS[levelName] || LEVELS.normal;
    for (let attempt = 0; attempt < 4000; attempt++) {
      const street = cfg.street === 'mix' ? (rng() < 0.5 ? 'flop' : 'turn') : cfg.street;
      const d = shuffled(rng);
      const hero = [d[0], d[1]];
      const villain = [d[2], d[3]];
      const board = street === 'flop' ? [d[4], d[5], d[6]] : [d[4], d[5], d[6], d[7]];
      const heroNow = evaluate(hero.concat(board));
      const villainNow = evaluate(villain.concat(board));
      if (compare(heroNow, villainNow) >= 0) continue;          // le heros doit etre derriere
      const probe = analyse(hero, villain, board, { equity: false });
      if (probe.outs.length < cfg.minOuts || probe.outs.length > cfg.maxOuts) continue;
      if (probe.families.length > cfg.maxFamilies) continue;
      if (cfg.minFamilies && probe.families.length < cfg.minFamilies) continue;
      if (cfg.minTopFamily && probe.families[0].count < cfg.minTopFamily) continue;
      if (cfg.villainMin && villainNow[0] < cfg.villainMin) continue;   // l'adversaire doit avoir une main faite
      if (cfg.realDraw) {                                                // tirage reconnaissable, pas une main poubelle
        const top = probe.families[0];
        const isDraw = (top.name === 'Couleur' || top.name === 'Quinte') && top.count >= 4;
        const maxBoard = Math.max.apply(null, board.map(rankOf));
        const overcards = rankOf(hero[0]) > maxBoard && rankOf(hero[1]) > maxBoard;
        if (!isDraw && !overcards) continue;
      }
      const a = analyse(hero, villain, board);                  // equite exacte sur la situation retenue
      a.level = levelName;
      a.street = street;
      return a;
    }
    return null;
  }

  /* Generateur deterministe (pour les feuilles d'exercices reproductibles) */
  function mulberry32(seed) {
    let t = seed >>> 0;
    return function () {
      t = (t + 0x6D2B79F5) >>> 0;
      let x = Math.imul(t ^ (t >>> 15), 1 | t);
      x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
  }

  return {
    RANKS, SUITS, SUIT_NAMES, SUIT_LETTERS, CATEGORIES,
    rankOf, suitOf, cardLabel, cardText, fullDeck,
    evaluate, compare, handName, handLabel,
    analyse, ruleOfTwoFour, generate, mulberry32, LEVELS
  };
});
