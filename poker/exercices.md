# Compter les outs — feuille d'exercices

> Situations tirées au hasard, corrigées par énumération complète du paquet.
> Graine 20260919 : `node generer-exercices.js <graine>` en produit une autre.

**Règle du jeu.** L'adversaire a retourné ses cartes ; tu es derrière à chaque fois.
Compte les cartes du paquet qui te font passer **devant** à la prochaine carte —
ni les cartes qui « améliorent » ta main, ni celles qui égalisent.
Puis convertis : × 4 au flop (deux cartes à venir), × 2 au turn.

Couleurs : ♠ pique · ♥ cœur · ♦ carreau · ♣ trèfle.
Rangs : V valet, D dame, R roi, A as.

---

## Série 1 — Tirages nets

_Un ou deux tirages par main, au flop. Vise moins de dix secondes par exercice._

**1.** Flop : `9♥ 2♦ 9♠`  
Toi : `V♠ D♥` — Lui : `R♥ 2♣`  
Combien d'outs au turn ? 45 cartes inconnues. → `____` outs, soit `____` %

**2.** Flop : `10♣ 5♥ D♥`  
Toi : `R♦ A♥` — Lui : `D♦ 7♠`  
Combien d'outs au turn ? 45 cartes inconnues. → `____` outs, soit `____` %

**3.** Flop : `3♦ V♦ 6♥`  
Toi : `D♥ R♣` — Lui : `2♥ 6♦`  
Combien d'outs au turn ? 45 cartes inconnues. → `____` outs, soit `____` %

**4.** Flop : `3♠ 5♥ 2♦`  
Toi : `9♠ 4♣` — Lui : `7♣ 3♣`  
Combien d'outs au turn ? 45 cartes inconnues. → `____` outs, soit `____` %

**5.** Flop : `9♠ 3♦ 3♠`  
Toi : `8♠ 4♠` — Lui : `7♣ A♦`  
Combien d'outs au turn ? 45 cartes inconnues. → `____` outs, soit `____` %

**6.** Flop : `7♠ 5♦ 10♣`  
Toi : `6♦ 9♣` — Lui : `4♦ 10♥`  
Combien d'outs au turn ? 45 cartes inconnues. → `____` outs, soit `____` %

**7.** Flop : `V♥ 9♦ R♥`  
Toi : `10♦ 3♥` — Lui : `9♣ 8♦`  
Combien d'outs au turn ? 45 cartes inconnues. → `____` outs, soit `____` %

**8.** Flop : `R♣ 10♠ V♣`  
Toi : `D♦ 7♥` — Lui : `8♣ 8♠`  
Combien d'outs au turn ? 45 cartes inconnues. → `____` outs, soit `____` %

**9.** Flop : `7♦ R♠ 9♣`  
Toi : `6♥ 10♣` — Lui : `7♥ 2♠`  
Combien d'outs au turn ? 45 cartes inconnues. → `____` outs, soit `____` %

**10.** Flop : `4♥ 8♠ 9♠`  
Toi : `5♠ 6♦` — Lui : `8♥ 4♣`  
Combien d'outs au turn ? 45 cartes inconnues. → `____` outs, soit `____` %


## Série 2 — Mains ordinaires

_Tout ce que la distribution donne, y compris les mains à deux ou trois outs._

**11.** Flop : `8♠ V♦ 9♦`  
Toi : `D♣ A♣` — Lui : `V♣ R♠`  
Combien d'outs au turn ? 45 cartes inconnues. → `____` outs, soit `____` %

**12.** Flop : `8♠ 7♣ A♦`  
Toi : `9♣ 3♠` — Lui : `10♠ 6♣`  
Combien d'outs au turn ? 45 cartes inconnues. → `____` outs, soit `____` %

**13.** Flop : `D♠ V♦ D♦`  
Toi : `5♠ 2♥` — Lui : `8♥ A♣`  
Combien d'outs au turn ? 45 cartes inconnues. → `____` outs, soit `____` %

**14.** Flop : `R♣ V♠ 9♣`  
Toi : `5♥ 3♦` — Lui : `2♦ 10♦`  
Combien d'outs au turn ? 45 cartes inconnues. → `____` outs, soit `____` %

**15.** Flop : `10♠ 8♠ 3♣`  
Toi : `4♣ 7♦` — Lui : `D♥ 9♣`  
Combien d'outs au turn ? 45 cartes inconnues. → `____` outs, soit `____` %

**16.** Flop : `3♦ 5♦ 5♠`  
Toi : `4♠ 2♣` — Lui : `6♦ 4♣`  
Combien d'outs au turn ? 45 cartes inconnues. → `____` outs, soit `____` %

**17.** Flop : `4♠ V♠ R♥`  
Toi : `9♦ 2♥` — Lui : `A♥ 6♣`  
Combien d'outs au turn ? 45 cartes inconnues. → `____` outs, soit `____` %

**18.** Flop : `D♠ 3♥ 5♠`  
Toi : `6♥ D♣` — Lui : `R♥ R♣`  
Combien d'outs au turn ? 45 cartes inconnues. → `____` outs, soit `____` %


## Série 3 — Au turn, une seule carte

_Une carte à venir : c'est la règle du 2 qui s'applique ensuite._

**19.** Turn : `3♦ R♦ 6♠ 2♥`  
Toi : `D♦ 5♠` — Lui : `6♣ 9♥`  
Combien d'outs à la rivière ? 44 cartes inconnues. → `____` outs, soit `____` %

**20.** Turn : `8♠ V♦ R♥ A♣`  
Toi : `10♠ 9♠` — Lui : `A♦ D♣`  
Combien d'outs à la rivière ? 44 cartes inconnues. → `____` outs, soit `____` %

**21.** Turn : `8♦ 6♥ 9♠ 4♣`  
Toi : `10♥ A♥` — Lui : `A♣ V♦`  
Combien d'outs à la rivière ? 44 cartes inconnues. → `____` outs, soit `____` %

**22.** Turn : `5♥ 5♠ 7♣ 9♠`  
Toi : `V♠ 6♣` — Lui : `8♦ D♦`  
Combien d'outs à la rivière ? 44 cartes inconnues. → `____` outs, soit `____` %

**23.** Turn : `3♣ 5♦ R♣ 5♠`  
Toi : `3♦ V♣` — Lui : `R♠ 9♦`  
Combien d'outs à la rivière ? 44 cartes inconnues. → `____` outs, soit `____` %

**24.** Turn : `4♦ A♥ R♥ R♣`  
Toi : `6♣ 3♥` — Lui : `10♣ D♠`  
Combien d'outs à la rivière ? 44 cartes inconnues. → `____` outs, soit `____` %


## Série 4 — Outs combinées

_Au moins deux familles d'outs à additionner — attention aux cartes comptées deux fois._

**25.** Turn : `4♣ 6♠ 2♦ 10♥`  
Toi : `D♣ 3♦` — Lui : `4♠ A♦`  
Combien d'outs à la rivière ? 44 cartes inconnues. → `____` outs, soit `____` %

**26.** Turn : `A♦ 10♥ 4♥ 8♦`  
Toi : `7♥ 9♦` — Lui : `5♦ D♣`  
Combien d'outs à la rivière ? 44 cartes inconnues. → `____` outs, soit `____` %

**27.** Turn : `4♦ 5♥ 4♥ 6♠`  
Toi : `5♣ 8♣` — Lui : `3♠ 2♠`  
Combien d'outs à la rivière ? 44 cartes inconnues. → `____` outs, soit `____` %

**28.** Turn : `8♦ V♥ 8♣ 9♦`  
Toi : `5♦ D♥` — Lui : `5♣ R♦`  
Combien d'outs à la rivière ? 44 cartes inconnues. → `____` outs, soit `____` %

**29.** Flop : `D♥ 9♦ 8♥`  
Toi : `6♠ 7♠` — Lui : `R♥ 5♥`  
Combien d'outs au turn ? 45 cartes inconnues. → `____` outs, soit `____` %

**30.** Flop : `5♥ 10♦ 7♥`  
Toi : `6♣ 8♥` — Lui : `2♣ 5♦`  
Combien d'outs au turn ? 45 cartes inconnues. → `____` outs, soit `____` %

---

# Corrigés

## Série 1 — Tirages nets

**1. 6 outs — règle du 4 : 24 %, équité réelle 25 %**  
Tu as paire de 9, kicker D, il a double paire 9 et 2, kicker R.

- **6** → double paire : D♠ D♦ D♣ V♥ V♦ V♣

**2. 10 outs — règle du 4 : 40 %, équité réelle 40 %**  
Tu as hauteur A puis R, il a paire de D, kicker 10.

- **6** → paire : A♠ A♦ A♣ R♠ R♥ R♣
- **4** → quinte : V♠ V♥ V♦ V♣

**3. 6 outs — règle du 4 : 24 %, équité réelle 24 %**  
Tu as hauteur R puis D, il a paire de 6, kicker V.

- **6** → paire : R♠ R♥ R♦ D♠ D♦ D♣

**4. 14 outs — règle du 4 : 56 %, équité réelle 48 %**  
Tu as hauteur 9 puis 5, il a paire de 3, kicker 7.

- **8** → quinte : A♠ A♥ A♦ A♣ 6♠ 6♥ 6♦ 6♣
- **6** → paire : 9♥ 9♦ 9♣ 4♠ 4♥ 4♦

**5. 15 outs — règle du 4 : 60 %, équité réelle 54 %**  
Tu as paire de 3, kicker 9, il a paire de 3, kicker A.

- **9** → couleur : A♠ R♠ D♠ V♠ 10♠ 7♠ 6♠ 5♠ 2♠
- **6** → double paire : 8♥ 8♦ 8♣ 4♥ 4♦ 4♣

**6. 4 outs — règle du 4 : 16 %, équité réelle 20 %**  
Tu as hauteur 10 puis 9, il a paire de 10, kicker 7.

- **4** → quinte : 8♠ 8♥ 8♦ 8♣

**7. 7 outs — règle du 4 : 28 %, équité réelle 31 %**  
Tu as hauteur R puis V, il a paire de 9, kicker R.

- **4** → quinte : D♠ D♥ D♦ D♣
- **3** → paire : 10♠ 10♥ 10♣

**8. 11 outs — règle du 4 : 44 %, équité réelle 42 %**  
Tu as hauteur R puis D, il a paire de 8, kicker R.

- **8** → quinte : A♠ A♥ A♦ A♣ 9♠ 9♥ 9♦ 9♣
- **3** → paire : D♠ D♥ D♣

**9. 7 outs — règle du 4 : 28 %, équité réelle 30 %**  
Tu as hauteur R puis 10, il a paire de 7, kicker R.

- **4** → quinte : 8♠ 8♥ 8♦ 8♣
- **3** → paire : 10♠ 10♥ 10♦

**10. 4 outs — règle du 4 : 16 %, équité réelle 21 %**  
Tu as hauteur 9 puis 8, il a double paire 8 et 4, kicker 9.

- **4** → quinte : 7♠ 7♥ 7♦ 7♣


## Série 2 — Mains ordinaires

**11. 10 outs — règle du 4 : 40 %, équité réelle 36 %**  
Tu as hauteur A puis D, il a paire de V, kicker R.

- **6** → paire : A♠ A♥ A♦ D♠ D♥ D♦
- **4** → quinte : 10♠ 10♥ 10♦ 10♣

**12. 3 outs — règle du 4 : 12 %, équité réelle 14 %**  
Tu as hauteur A puis 9, il a hauteur A puis 10.

- **3** → paire : 3♥ 3♦ 3♣

**13. 6 outs — règle du 4 : 24 %, équité réelle 20 %**  
Tu as paire de D, kicker V, il a paire de D, kicker A.

- **6** → double paire : 5♥ 5♦ 5♣ 2♠ 2♦ 2♣

**14. 6 outs — règle du 4 : 24 %, équité réelle 23 %**  
Tu as hauteur R puis V, il a hauteur R puis V.

- **6** → paire : 5♠ 5♦ 5♣ 3♠ 3♥ 3♣

**15. 6 outs — règle du 4 : 24 %, équité réelle 21 %**  
Tu as hauteur 10 puis 8, il a hauteur D puis 10.

- **6** → paire : 7♠ 7♥ 7♣ 4♠ 4♥ 4♦

**16. 7 outs — règle du 4 : 28 %, équité réelle 31 %**  
Tu as paire de 5, kicker 4, il a paire de 5, kicker 6.

- **7** → quinte : A♠ A♥ A♦ A♣ 6♠ 6♥ 6♣

**17. 6 outs — règle du 4 : 24 %, équité réelle 22 %**  
Tu as hauteur R puis V, il a hauteur A puis R.

- **6** → paire : 9♠ 9♥ 9♣ 2♠ 2♦ 2♣

**18. 5 outs — règle du 4 : 20 %, équité réelle 22 %**  
Tu as paire de D, kicker 6, il a paire de R, kicker D.

- **3** → double paire : 6♠ 6♦ 6♣
- **2** → brelan : D♥ D♦


## Série 3 — Au turn, une seule carte

**19. 7 outs — règle du 2 : 14 %, équité réelle 16 %**  
Tu as hauteur R puis D, il a paire de 6, kicker R.

- **4** → quinte : 4♠ 4♥ 4♦ 4♣
- **3** → paire : D♠ D♥ D♣

**20. 7 outs — règle du 2 : 14 %, équité réelle 16 %**  
Tu as hauteur A puis R, il a paire de A, kicker R.

- **7** → quinte : D♠ D♥ D♦ 7♠ 7♥ 7♦ 7♣

**21. 7 outs — règle du 2 : 14 %, équité réelle 16 %**  
Tu as hauteur A puis 10, il a hauteur A puis V.

- **4** → quinte : 7♠ 7♥ 7♦ 7♣
- **3** → paire : 10♠ 10♦ 10♣

**22. 6 outs — règle du 2 : 12 %, équité réelle 14 %**  
Tu as paire de 5, kicker V, il a paire de 5, kicker D.

- **3** → quinte : 8♠ 8♥ 8♣
- **3** → double paire : V♥ V♦ V♣

**23. 2 outs — règle du 2 : 4 %, équité réelle 5 %**  
Tu as double paire 5 et 3, kicker R, il a double paire R et 5, kicker 9.

- **2** → full : 3♠ 3♥

**24. 6 outs — règle du 2 : 12 %, équité réelle 17 %**  
Tu as paire de R, kicker A, il a paire de R, kicker A.

- **6** → double paire : 6♠ 6♥ 6♦ 3♠ 3♦ 3♣
- 3 carte(s) de partage : 4♠ 4♥ 4♣


## Série 4 — Outs combinées

**25. 7 outs — règle du 2 : 14 %, équité réelle 16 %**  
Tu as hauteur D puis 10, il a paire de 4, kicker A.

- **4** → quinte : 5♠ 5♥ 5♦ 5♣
- **3** → paire : D♠ D♥ D♦

**26. 14 outs — règle du 2 : 28 %, équité réelle 32 %**  
Tu as hauteur A puis 10, il a hauteur A puis D.

- **8** → quinte : V♠ V♥ V♦ V♣ 6♠ 6♥ 6♦ 6♣
- **6** → paire : 9♠ 9♥ 9♣ 7♠ 7♦ 7♣

**27. 8 outs — règle du 2 : 16 %, équité réelle 18 %**  
Tu as double paire 5 et 4, kicker 8, il a quinte hauteur 6.

- **4** → full : 5♠ 5♦ 4♠ 4♣
- **4** → quinte : 7♠ 7♥ 7♦ 7♣

**28. 7 outs — règle du 2 : 14 %, équité réelle 16 %**  
Tu as paire de 8, kicker D, il a paire de 8, kicker R.

- **4** → quinte : 10♠ 10♥ 10♦ 10♣
- **3** → double paire : D♠ D♦ D♣

**29. 10 outs — règle du 4 : 40 %, équité réelle 28 %**  
Tu as hauteur D puis 9, il a hauteur R puis D.

- **6** → quinte : 10♠ 10♦ 10♣ 5♠ 5♦ 5♣
- **4** → paire : 7♦ 7♣ 6♦ 6♣

**30. 14 outs — règle du 4 : 56 %, équité réelle 53 %**  
Tu as hauteur 10 puis 8, il a paire de 5, kicker 10.

- **8** → quinte : 9♠ 9♥ 9♦ 9♣ 4♠ 4♥ 4♦ 4♣
- **6** → paire : 8♠ 8♦ 8♣ 6♠ 6♥ 6♦

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
