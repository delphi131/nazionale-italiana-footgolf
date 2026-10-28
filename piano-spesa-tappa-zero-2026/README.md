# Piano di spesa — Tappa Zero, 14–15 Novembre 2026

Materiale da stampare e allestire per il weekend AIFG a **Il Pelagone Hotel & Golf Resort**,
Gavorrano (GR). Stesso stile della brochure sponsor AIFG (repository `AIFGSITE`,
`brochure-sponsor/`): token del sito, font Archivo, logo ufficiale.

| File | Cos'è |
| --- | --- |
| `dist/piano-spesa-tappa-zero-2026.xlsx` | **Il foglio di lavoro.** 23 voci in 5 aree: descrizione, quantità, prezzo, totale, stato, link e cella per la foto. Totali e riepilogo per area sono formule. |
| `dist/piano-spesa-tappa-zero-2026.pdf` | **Il documento da condividere.** 8 pagine A4: copertina, sintesi con la ripartizione per area, una scheda per voce con spazio foto e link, riepilogo con firme. |
| `dist/piano-spesa-tappa-zero-2026.html` | Versione web autonoma del PDF. |
| `voci.json` | **Unica fonte dei dati**, letta da entrambi i generatori. |
| `piano.body.html` / `genera.mjs` | Sorgente e generatore del PDF (ricalcati sulla brochure sponsor). |
| `genera-excel.py` | Generatore dell'Excel. |

## Rigenerare dopo una modifica a `voci.json`

```bash
python3 piano-spesa-tappa-zero-2026/genera-excel.py
node piano-spesa-tappa-zero-2026/genera.mjs
```

Il generatore del PDF fa una pagina per area e verifica che ognuna stia in un A4 (esce con codice 1
se una deborda): un'area regge fino a 5 voci con nomi brevi.
L'Excel si può anche aggiornare a mano: i totali si ricalcolano da soli.

## Le voci

| Stato | Significato | Nel totale base |
| --- | --- | --- |
| Preventivo | prezzo dato dal fornitore | sì |
| Stima | importo ipotizzato, da confermare | sì |
| Da definire | prezzo ancora da richiedere | sì (vale 0 finché manca) |
| Opzionale | voce eventuale | no |
| Alternativa | in alternativa a un'altra voce | no |

**Totale base € 3.057,00** · opzionali € 2.850 (mini vele, cubi, drone; roll up segreteria ancora
senza prezzo) · totale con opzionali € 5.907,00 · 5 voci da quotare (flyer, tovaglia presentazione, tovaglie
ristoro, radioline, abbigliamento staff); delle partenze sono quotate solo le Donne.

## Ipotesi da confermare

- **Brochure (100 pz, € 180) e pieghevole A3 sono alternativi**: nel totale c'è la brochure.
  Nell'Excel si passa all'A3 invertendo «Nel totale» sulle due righe.
- **Tavoli ristoro**: quantità 4 ipotizzata (€ 37 l'uno). Le tovaglie seguono la stessa quantità.
- **Telo proiettore** (€ 80–100) e **drone DJI Mini 4 Pro / Mini 5 Pro** per riprese e diretta
  live (€ 400–700): per entrambi è messo il massimo per prudenza.
- **Bandiere golflags.eu** e **mini vele** sono messe come fornitura unica (€ 390 e € 2.000):
  il numero di pezzi compreso va verificato.
- **Cubi in polionda** (€ 150, opzionali) sono messi come fornitura unica: il numero di cubi va verificato.
- Pannelli buca, partenze Donne e wall sono **IVA esclusa**, il pieghevole A3 IVA inclusa; per le
  altre voci l'IVA va verificata. I totali sommano gli importi così come sono nei preventivi.
