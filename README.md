# Nazionale Italiana Footgolf — Area Tecnica

Documenti di lavoro dello staff tecnico (Selezionatori, Coach, Match Analyst, Preparatore, Team Manager).

## Documenti

- `docs/programma-staff-nazionale.html` — **Quaderno Tecnico Azzurro**: agenda di riunione, le cinque
  squadre (Men, Senior, Senior Plus, Women, Junior) sotto un'unica Nazionale, codice azzurro e divisa
  unica, standard dei campi di fascia alta, modello di prestazione, mansionario per ogni figura, schede
  di osservazione e rilevamento sul campo, schede di supervisione, scheda di osservazione del gruppo,
  allenamenti a punteggio, propedeutica al match play e all'individuale, roadmap.

Il file è anche il **template brochure** di riferimento: palette, tipografia e componenti (copertina,
schede ruolo, tabelle-scheda, callout, KPI) si riusano per i documenti successivi. È ottimizzato per la
stampa A4: aprirlo nel browser e usare Stampa → Salva come PDF.

- `docs/manifesto-azzurro.html` — **Manifesto Azzurro**: il documento di presentazione, solo parte
  narrativa e di identità (visione, le cinque squadre, il gruppo e la divisa unica, i campi, i ruoli
  dello staff raccontati, la strada verso la convocazione, l'impegno reciproco). Nessuna scheda,
  nessuna soglia, nessuna procedura: è il testo da leggere e da consegnare in apertura.

## PDF

`docs/Quaderno-Tecnico-Azzurro.pdf` (24 pagine) e `docs/Manifesto-Azzurro.pdf` (5 pagine) —
versioni stampabili A4 con font incorporati e numerazione in basso. Per rigenerarle dopo una
modifica all'HTML:

```
node tools/genera-pdf.js <file-html-completo> docs/Quaderno-Tecnico-Azzurro.pdf
```

Nota: l'HTML in `docs/` è pensato per essere pubblicato come artifact e non contiene i tag
`<html>/<head>/<body>`; lo script va alimentato con una copia incapsulata e con i font Barlow
incorporati come data URI (Google Fonts non è raggiungibile dal browser in fase di render).

## Candidature

- `candidature/FIFG_2027_FIFG500_Italy_Bid_Response_Form.xlsx` — modulo di risposta al bando FIFG 2027
  (Masters, Major 1000, FIFG 500) compilato per il 15th Italian FootGolf Open 2027 (**FIFG Major / FIFG 500**) al Golf
  Club Parco de' Medici (Roma), 1–4 luglio 2027. Scadenza invio: 30 ottobre 2026 a info@fifg.org e
  board@fifg.org. Le celle lasciate vuote (referente, licenze, esperienza, dichiarazioni di
  conformità) risultano "Missing" nel foglio *Read Me & Status* e vanno completate prima dell'invio.
- `candidature/presentazione-fifg500-roma-2027/` — **presentazione opzionale** della candidatura, 18 slide
  16:9 in inglese nella grafica delle brochure AIFG, con i segnaposto per i tracciati delle 18 buche.
  PDF in `dist/`; dettagli e istruzioni per i tracciati nel README della cartella.
