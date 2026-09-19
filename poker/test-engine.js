const P = require('./engine.js');
const S = { p:0, c:1, k:2, t:3 };
const R = { '2':0,'3':1,'4':2,'5':3,'6':4,'7':5,'8':6,'9':7,'10':8,'V':9,'D':10,'R':11,'A':12 };
const card = (str) => { const m = str.match(/^(10|[2-9AVDR])([pckt])$/); return S[m[2]]*13 + R[m[1]]; };
const cards = (s) => s.split(/\s+/).map(card);
let fails = 0;
function eq(label, got, want){ const ok = JSON.stringify(got)===JSON.stringify(want); if(!ok){fails++;console.log('FAIL', label, 'got', got, 'want', want);} else console.log('ok  ', label, '=', JSON.stringify(got)); }

// Evaluateur
eq('quinte flush', P.handLabel(P.evaluate(cards('9p 8p 7p 6p 5p 2c Ak'))), 'Quinte flush hauteur 9');
eq('roue A-5',     P.handLabel(P.evaluate(cards('Ap 2c 3k 4t 5p Rc Dk'))), 'Quinte hauteur 5');
eq('carre',        P.handLabel(P.evaluate(cards('7p 7c 7k 7t 5p Rc Dk'))), 'Carré de 7');
eq('full',         P.handLabel(P.evaluate(cards('7p 7c 7k 5t 5p Rc Dk'))), 'Full aux 7 par les 5');
eq('double full',  P.handLabel(P.evaluate(cards('7p 7c 7k 5t 5p 5c Dk'))), 'Full aux 7 par les 5');
eq('couleur',      P.handLabel(P.evaluate(cards('Ap Dp 9p 6p 3p 5c 2k'))), 'Couleur hauteur A');
eq('quinte',       P.handLabel(P.evaluate(cards('9p 8c 7k 6t 5p Rc 2k'))), 'Quinte hauteur 9');
eq('2 paires',     P.handLabel(P.evaluate(cards('Ap Ac 9k 9t 5p Rc 2k'))), 'Double paire A et 9, kicker R');
eq('hauteur',      P.handLabel(P.evaluate(cards('Ap Dc 9k 7t 5p 3c 2k'))), 'Hauteur A puis D');
eq('minuscule',    P.handLabel(P.evaluate(cards('Ap Dc 9k 7t 5p 3c 2k')), true), 'hauteur A puis D');
eq('couleur > quinte', P.compare(P.evaluate(cards('Ap Dp 9p 6p 3p 5c 2k')), P.evaluate(cards('9p 8c 7k 6t 5p Rc 2k'))), 1);

// Outs de reference
const a1 = P.analyse(cards('Ap Rp'), cards('9c 9k'), cards('Dp 7p 2k'));
eq('tirage couleur max + 2 overcards = 15 outs', a1.outs.length, 15);
const a2 = P.analyse(cards('9p 8p'), cards('Ak At'), cards('7c 6k 2t'));
eq('bilateral = 8 outs', a2.outs.length, 8);
const a3 = P.analyse(cards('Vp Dp'), cards('Ak At'), cards('9c 8k 2t'));
eq('ventrale = 4 outs', a3.outs.length, 4);
const a4 = P.analyse(cards('5p 5c'), cards('Ak Rt'), cards('Ac 9k 2t'));
eq('petite paire -> brelan = 2 outs', a4.outs.length, 2);
const a5 = P.analyse(cards('Ap Rc'), cards('9k 9t'), cards('Dp 7c 2k'));
eq('2 overcards = 6 outs', a5.outs.length, 6);
const a6 = P.analyse(cards('Ap Rp'), cards('9c 9k'), cards('Dp 7p 2k 3t'));
eq('turn : memes outs, 1 carte a venir', a6.outs.length, 15);
eq('turn : 44 inconnues', a6.unseen, 44);
eq('flop : 45 inconnues', a1.unseen, 45);
console.log('equite exacte 15 outs au flop :', (a1.equity*100).toFixed(1)+'%', '| regle du 4 :', P.ruleOfTwoFour(15,2)+'%');
console.log('equite exacte 15 outs au turn :', (a6.equity*100).toFixed(1)+'%', '| regle du 2 :', P.ruleOfTwoFour(15,1)+'%');
console.log('familles a1 :', a1.families.map(f=>f.name+' x'+f.count).join(', '));

// Generation : 200 situations par niveau
for (const lvl of ['facile','normal','turn','expert']) {
  let t0 = Date.now(), min=99, max=0;
  for (let i=0;i<200;i++){ const s = P.generate(lvl); if(!s){fails++;console.log('FAIL generate',lvl);break;} min=Math.min(min,s.outs.length); max=Math.max(max,s.outs.length); }
  console.log('ok   generate', lvl, '200 situations en', Date.now()-t0, 'ms | outs', min+'-'+max);
}
console.log(fails ? '\n>>> '+fails+' ECHEC(S)' : '\n>>> tous les tests passent');
process.exit(fails?1:0);
