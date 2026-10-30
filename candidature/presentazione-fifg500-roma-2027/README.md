# Presentazione candidatura — 15th Italian FootGolf Open 2027, Rome (FIFG Major / FIFG 500)

Presentazione opzionale da allegare al modulo Excel della candidatura FIFG 2027: 16 slide 16:9
(1280×720) in inglese, sul template `presentazione-aifg-2027` del repository AIFGSITE (branch
`claude/brochure-nuovo-percorso`): stessi token, font Archivo, logo a medaglione, logo FIFG, più lo
scudo AIFG piccolo nella testata di ogni slide. I contenuti riprendono le risposte del modulo
`../FIFG_2027_FIFG500_Italy_Bid_Response_Form.xlsx` (versione del 30 ottobre: 1–4 luglio, 3 giri sui
percorsi White e Blue, 256 giocatori, quota € 250 / Women € 195 / Junior € 95, montepremi € 10.000).

```
node candidature/presentazione-fifg500-roma-2027/genera.mjs   # HTML + PDF in dist/
```

Slide: copertina · candidatura in sintesi · l'Italia nel circuito (tornei organizzati, licenze) ·
un movimento che riparte · perché Roma (mappa, aeroporti, navetta) · la struttura · ospitalità
(ristorante, lobby bar, pacchetti) · **percorso White buca per buca** · **percorso Blue buca per
buca** · **mappe dei percorsi** · programma 1–4 luglio · quota e servizi · organizzazione e
sicurezza · media e broadcast · impegni · chiusura con contatti.

Le immagini stanno in `assets/` e sono elencate nella tabella `IMMAGINI` di `genera.mjs`
(segnaposto `__NOME__` → file). Le foto della struttura (`struttura-*.jpg`) e la mappa satellitare
(`mappa-posizione.jpg`, © Google, citata nella didascalia) sono state fornite dalla federazione.

## Integrare i tracciati

Le slide 05 e 06 hanno segnaposto pronti, marcati con commenti in `presentazione.body.html`:

- **Slide 08 (White) e 09 (Blue), 18 schede buca ciascuna** (`<div class="hole" data-buca="N">`
  dentro `data-percorso="white"` o `"blue"`): sostituire l'`<svg>` dentro
  `hole__map` con `<img src="__BUCA_N__" alt="Hole N">` (o un SVG inline) e scrivere par e metri al
  posto di `Par —` e `— m`. L'immagine si adatta da sola al riquadro (`object-fit: contain`).
- **Slide 10, mappe dei due percorsi** (commenti `MAPPA WHITE` e `MAPPA BLUE`): inserire un `<img>`
  nel riquadro, che copre il segnaposto.

Per le immagini: metterle in `assets/` e aggiungere una riga alla tabella `IMMAGINI` di
`genera.mjs`, così PDF e HTML restano autonomi.

## Da verificare prima dell'invio

Sono gli stessi punti del modulo Excel, scritti come proposta e non ancora confermati con il circolo:
par 72 indicativo, servizi della clubhouse (spogliatoi, Wi-Fi, punti
acqua, aree d'ombra), distanze e tempi da aeroporti e stazione, ospedale Sant'Eugenio a circa 5 km,
tempi di consegna dei video. Contatti in chiusura: info@footgolf.it e footgolf.it.
