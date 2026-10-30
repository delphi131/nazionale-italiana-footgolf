# Presentazione candidatura — 15th Italian FootGolf Open 2027, Rome (FIFG Major / FIFG 500)

Presentazione opzionale da allegare al modulo Excel della candidatura FIFG 2027: 17 slide 16:9
(1280×720) in inglese, sul template `presentazione-aifg-2027` del repository AIFGSITE (branch
`claude/brochure-nuovo-percorso`): stessi token, font Archivo, logo a medaglione, logo FIFG, più lo
scudo AIFG piccolo nella testata di ogni slide. I contenuti riprendono le risposte del modulo
`../FIFG_2027_FIFG500_Italy_Bid_Response_Form.xlsx` (versione del 30 ottobre: 1–4 luglio, 3 giri sui
percorsi White e Blue, 256 giocatori, quota € 250 / Women € 195 / Junior € 95, montepremi € 10.000).

```
node candidature/presentazione-fifg500-roma-2027/genera.mjs   # HTML + PDF in dist/
```

Slide: copertina · candidatura in sintesi · l'Italia nel circuito (tornei organizzati, licenze) · perché Roma (mappa, aeroporti, navetta) · la struttura · il campo (lago, fairway, green, clubhouse) · ospitalità
(ristorante, lobby bar, pacchetti) · camere e ristorazione (pacchetti per i giocatori, promozioni per le famiglie) · **tracciato White** · **tracciato Blue** · **i due percorsi insieme** · programma 1–4 luglio · quota e servizi · organizzazione e
sicurezza · media e broadcast · impegni · chiusura con contatti.

Le immagini stanno in `assets/` e sono elencate nella tabella `IMMAGINI` di `genera.mjs`
(segnaposto `__NOME__` → file). Le foto della struttura e del campo (`struttura-*.jpg`, `campo-*.jpg`, `hotel-*.jpg`) e la mappa satellitare
(`mappa-posizione.jpg`, © Google, citata nella didascalia) sono state fornite dalla federazione.

## Tracciati

I tracciati disegnati da AIFG sono nelle slide 09 (percorso White, `assets/percorso-white.jpg`),
10 (percorso Blue, `assets/percorso-blue.jpg`) e 11 (i due percorsi insieme,
`assets/percorsi-white-blue.jpg`). Per aggiornarli basta sostituire i file in `assets/` con lo
stesso nome e rigenerare. Par e lunghezze delle buche non sono ancora indicati.

## Da verificare prima dell'invio

Sono gli stessi punti del modulo Excel, scritti come proposta e non ancora confermati con il circolo:
par 72 indicativo, servizi della clubhouse (spogliatoi, Wi-Fi, punti
acqua, aree d'ombra), distanze e tempi da aeroporti e stazione, ospedale Sant'Eugenio a circa 5 km,
tempi di consegna dei video. Contatti in chiusura: info@footgolf.it e footgolf.it.
