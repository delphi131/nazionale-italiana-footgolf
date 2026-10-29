# Presentazione candidatura — Italian FootGolf Open 2027, Rome (FIFG 500)

Presentazione opzionale da allegare al modulo Excel della candidatura FIFG 2027: 12 slide 16:9
(1280×720) in inglese, sul template `presentazione-aifg-2027` del repository AIFGSITE (branch
`claude/brochure-nuovo-percorso`): stessi token, font Archivo, logo a medaglione, logo FIFG.
I contenuti riprendono le risposte del modulo `../FIFG_2027_FIFG500_Italy_Bid_Response_Form.xlsx`.

```
node candidature/presentazione-fifg500-roma-2027/genera.mjs   # HTML + PDF in dist/
```

Slide: copertina · candidatura in sintesi · perché Roma (aeroporti, navetta, hotel nella struttura) ·
la struttura (3 percorsi golf, Sheraton, clubhouse) · **il percorso buca per buca** · **mappa del
percorso** · format e programma 2–4 luglio · quota e servizi inclusi · organizzazione e sicurezza ·
media e broadcast · impegni · chiusura con contatti.

## Integrare i tracciati

Le slide 05 e 06 hanno segnaposto pronti, marcati con commenti in `presentazione.body.html`:

- **Slide 05, 18 schede buca** (`<div class="hole" data-buca="N">`): sostituire l'`<svg>` dentro
  `hole__map` con `<img src="__BUCA_N__" alt="Hole N">` (o un SVG inline) e scrivere par e metri al
  posto di `Par —` e `— m`. L'immagine si adatta da sola al riquadro (`object-fit: contain`).
- **Slide 06, mappa generale e percorso di prova** (commenti `MAPPA GENERALE` e `PERCORSO DI PROVA`):
  inserire un `<img>` nel riquadro, che copre il segnaposto.

Per le immagini: metterle in `assets/` e aggiungerle a `genera.mjs` come data URI, come
`foto-buca.jpg` (`__BUCA__`), così PDF e HTML restano autonomi.

## Da verificare prima dell'invio

Sono gli stessi punti del modulo Excel, scritti come proposta e non ancora confermati con il circolo:
capienza di 144 giocatori, par 72 indicativo, servizi della clubhouse (spogliatoi, Wi-Fi, punti
acqua, aree d'ombra), distanze e tempi da aeroporti e stazione, ospedale Sant'Eugenio a circa 5 km,
tempi di consegna dei video. Contatti in chiusura: info@footgolf.it e footgolf.it.
