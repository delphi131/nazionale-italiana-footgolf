#!/usr/bin/env node
/**
 * Genera il piano di spesa della Tappa Zero a partire da `piano.body.html` e `voci.json`.
 * Ricalcato sul generatore della brochure sponsor AIFG (AIFGSITE/brochure-sponsor).
 *
 *   node piano-spesa-tappa-zero-2026/genera.mjs           # HTML statici + PDF
 *   node piano-spesa-tappa-zero-2026/genera.mjs --shot    # aggiunge gli screenshot di verifica
 *
 * Passaggi:
 *  1. incorpora font, logo e i dati di `voci.json` al posto dei segnaposto;
 *  2. apre la pagina in Chromium e lascia che lo script costruisca le sezioni dai DATI;
 *  3. serializza il DOM risultante, così gli output non dipendono più da JavaScript;
 *  4. stampa il PDF A4 e verifica che nessuna pagina sia in overflow.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";

/* Playwright può essere installato in locale o a livello globale: proviamo entrambi. */
const require = createRequire(import.meta.url);
const { chromium } = (() => {
  try {
    return require("playwright");
  } catch {
    try {
      const globale = execSync("npm root -g", { encoding: "utf8" }).trim();
      return require(join(globale, "playwright"));
    } catch {
      console.error("✗ Playwright non trovato. Installalo con: npm i -D playwright");
      process.exit(1);
    }
  }
})();

const DIR = dirname(fileURLToPath(import.meta.url));
const DIST = join(DIR, "dist");
const SRC = join(DIR, "piano.body.html");
const DATI = join(DIR, "voci.json");
const FONT = join(DIR, "assets", "archivo-latin.woff2");
const LOGO = join(DIR, "assets", "aifg-logo.png");

const NOME = "piano-spesa-tappa-zero-2026";
const shots = process.argv.includes("--shot");

/* ---------- 1 · sorgente + font + logo ---------- */

const sorgente = await readFile(SRC, "utf8");
const woff2 = await readFile(FONT);
const logoPng = await readFile(LOGO);

const fontCss = `@font-face {
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 400 900;
  font-stretch: 100%;
  font-display: block;
  src: url(data:font/woff2;base64,${woff2.toString("base64")}) format('woff2');
}`;

const logoDataUri = `data:image/png;base64,${logoPng.toString("base64")}`;

const conFont = sorgente
  .replace("/* __FONT__ */", fontCss)
  .replaceAll("__LOGO__", logoDataUri)
  .replace("/* __DATI__ */", JSON.stringify(JSON.parse(await readFile(DATI, "utf8"))));

const titolo = (conFont.match(/<title>([\s\S]*?)<\/title>/) || [, "Piano di spesa Tappa Zero"])[1].trim();
const stili = conFont.match(/<style>[\s\S]*?<\/style>/g) || [];
const corpo = conFont
  .replace(/<title>[\s\S]*?<\/title>/, "")
  .replace(/<style>[\s\S]*?<\/style>/g, "")
  .trim();

const skeleton = (head, body) => `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${titolo}</title>
${head}
</head>
<body>
${body}
</body>
</html>`;

await mkdir(DIST, { recursive: true });

const vivo = join(DIST, "_render.html");
await writeFile(vivo, skeleton(stili.join("\n"), corpo), "utf8");

/* ---------- 2 · render in Chromium ---------- */

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 1600 } });

const errori = [];
page.on("pageerror", (e) => errori.push(String(e)));
page.on("console", (m) => m.type() === "error" && errori.push(m.text()));

await page.goto(pathToFileURL(vivo).href, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);

if (errori.length) {
  console.error("✗ errori JavaScript durante il render:");
  errori.forEach((e) => console.error("   " + e));
  await browser.close();
  process.exit(1);
}

/* ---------- 3 · serializzazione senza JavaScript ---------- */

const statico = await page.evaluate(() => {
  document.querySelectorAll("script").forEach((s) => s.remove());
  return document.body.innerHTML.trim();
});

const htmlStandalone = skeleton(stili.join("\n"), statico);
const htmlArtifact = `<title>${titolo}</title>\n\n${stili.join("\n")}\n\n${statico}\n`;

await writeFile(join(DIST, `${NOME}.html`), htmlStandalone, "utf8");
await writeFile(join(DIST, "piano-artifact.html"), htmlArtifact, "utf8");

/* ---------- 4 · PDF dall'output statico ---------- */

const finale = join(DIST, `${NOME}.html`);
await page.goto(pathToFileURL(finale).href, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);

await page.pdf({
  path: join(DIST, `${NOME}.pdf`),
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true
});

/* ---------- 5 · verifiche ---------- */

/* Altezza di un A4 a 96dpi. Si misura la scatola impaginata (offsetHeight), non lo
   scrollHeight: quest'ultimo conteggerebbe anche i decori in posizione assoluta, che
   sono già clippati da `overflow:hidden` e non spingono nulla sulla pagina dopo. */
const A4_PX = Math.round((297 / 25.4) * 96);

const misure = await page.evaluate(() =>
  [...document.querySelectorAll(".page")].map((p, i) => ({ n: i + 1, alta: Math.round(p.offsetHeight) }))
);

console.log(`\n${misure.length} pagine generate — A4 = ${A4_PX}px\n`);
let guai = 0;
for (const m of misure) {
  const over = m.alta - A4_PX;
  const ok = over <= 1;
  if (!ok) guai++;
  console.log(`  ${ok ? "✓" : "✗"} pagina ${String(m.n).padStart(2)} — ${m.alta}px${ok ? "" : `  DEBORDA +${over}px`}`);
}

if (shots) {
  for (const w of [1440, 768, 360]) {
    await page.setViewportSize({ width: w, height: 1200 });
    await page.screenshot({ path: join(DIST, `_verifica-${w}.png`), fullPage: false });
  }
  console.log("\n  screenshot di verifica in dist/_verifica-*.png");
}

await browser.close();

console.log(`\n  → dist/${NOME}.pdf`);
console.log(`  → dist/${NOME}.html`);
console.log(`  → dist/piano-artifact.html\n`);

if (guai) {
  console.error(`✗ ${guai} pagina/e in overflow: alleggerire il contenuto o ridurre le dimensioni.\n`);
  process.exit(1);
}
