# Tappa Zero, 14–15 Novembre 2026 — Piano operativo e preventivo

Il punto su tutto il lavoro verso la Tappa Zero a **Il Pelagone Hotel & Golf Resort**, Gavorrano
(GR): attività istituzionali, preparazione della presentazione, responsabili, struttura della
community e preventivo di spesa voce per voce. Stile della brochure sponsor AIFG (repository
`AIFGSITE`, `brochure-sponsor/`): token del sito, font Archivo, logo ufficiale.

| File | Cos'è |
| --- | --- |
| `dist/piano-tappa-zero-2026.pdf` | **Il documento da condividere.** Copertina, sintesi con scadenze e spesa per area, attività (istituzionali e Tappa Zero), chi fa cosa, community, una scheda per voce di spesa con foto, tempi e link, riepilogo con firme. |
| `dist/piano-tappa-zero-2026.xlsx` | **Il foglio di lavoro.** Fogli *Attività* (priorità, tempi, responsabili, scadenza, stato), *Preventivo* (29 voci con quantità, prezzi, tempi, link, foto), *Riepilogo per area* con grafico, *Community*. |
| `dist/piano-tappa-zero-2026.html` | Versione web autonoma del PDF. |
| `dati.json` | **Unica fonte dei dati**, letta da entrambi i generatori. |
| `piano.body.html` / `genera.mjs` | Sorgente e generatore del PDF. |
| `genera-excel.py` | Generatore dell'Excel. |

## Rigenerare dopo una modifica a `dati.json`

```bash
python3 piano-tappa-zero-2026/genera-excel.py
node piano-tappa-zero-2026/genera.mjs
```

Le pagine del PDF dopo la sintesi si impaginano da sole: attività, schede e righe del riepilogo
passano alla pagina successiva quando una è piena, quindi si possono aggiungere voci senza
ritoccare l'impaginato. Il generatore verifica comunque che ogni pagina stia in un A4.

## Preventivo

Sei aree, come nel recap: **A** materiale marketing · **B** punto ristoro e briefing ·
**C** percorso e partenze · **D** immagine e media · **E** accoglienza · **F** staff e ospitalità.

| Stato | Significato | Nel totale base |
| --- | --- | --- |
| Confermato | già prenotato o acquistato | sì |
| Preventivo | prezzo dato dal fornitore | sì |
| Stima | importo ipotizzato, da confermare | sì |
| Da definire | prezzo ancora da richiedere | sì (vale 0 finché manca) |
| Opzionale | voce eventuale | no |
| Alternativa | in alternativa a un'altra voce | no |

**Totale base € 4.588,40** · opzionali € 3.000 (mini vele € 2.250, cubi € 150, drone € 600) ·
totale con opzionali € 7.588,40 · 7 voci ancora da quotare.

## Ipotesi da confermare

- **Alternative**: pieghevole A3 Pixartprinting (€ 126) al posto della brochure Emmetre (€ 180);
  pannelli buca Pixartprinting senza supporto (€ 654) al posto di quelli Emmetre (€ 972).
- **Partenze Donne e Junior**: 13 × € 4 = € 52; il preventivo indica € 54 di totale.
- **Fotografo**: 2 giornate a € 150, il massimo della base € 80–150 a giornata.
- **Drone**: € 600, il massimo di € 400–600; domenica si prova quello di Alberto.
- **Cubi buca 1 e 18**: € 150 dal preventivo precedente (polionda 30 × 30).
- **Bandierine**: fornitore scritto come `golfflags.eu` nel recap e `golflags.eu` in precedenza.
- Le voci IVA esclusa sono marcate; per le altre l'IVA va verificata.
