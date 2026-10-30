#!/usr/bin/env node
/**
 * Genera la presentazione della candidatura FIFG 500 «Italian FootGolf Open 2027 – Rome»
 * a partire da `presentazione.body.html`.
 *
 *   node candidature/presentazione-fifg500-roma-2027/genera.mjs           # HTML statici + PDF
 *   node candidature/presentazione-fifg500-roma-2027/genera.mjs --shot    # più screenshot di verifica
 *
 * Stesso script della presentazione AIFG 2027 (repository AIFGSITE), con una foto in più:
 * il controllo di impaginato verifica che ogni slide resti 1280×720.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";

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
const SRC = join(DIR, "presentazione.body.html");
const FONT = join(DIR, "assets", "archivo-latin.woff2");

// Segnaposto del sorgente → immagine in assets/, incorporata come data URI così PDF e HTML
// restano autonomi. Per aggiungere un tracciato basta una riga qui e il segnaposto nel sorgente.
const IMMAGINI = {
  __LOGO__: "aifg-logo.png",
  __SCUDO__: "aifg-scudo.png",
  __FIFG__: "fifg-logo.png",
  __BUCA__: "foto-buca.jpg",
  __HOTEL__: "struttura-hotel.jpg",
  __PISCINA__: "struttura-piscina-campo.jpg",
  __HALL__: "struttura-hall.jpg",
  __RISTORANTE__: "struttura-ristorante.jpg",
  __MAPPA__: "mappa-posizione.jpg",
  __WHITE__: "percorso-white.jpg",
  __BLUE__: "percorso-blue.jpg",
  __WHITEBLUE__: "percorsi-white-blue.jpg",
  __LAGO__: "campo-lago.jpg",
  __FAIRWAY__: "campo-fairway.jpg",
  __GREEN__: "campo-green-hotel.jpg",
  __CLUBHOUSE__: "campo-clubhouse.jpg",
  __CAMERA__: "hotel-camera-vista-golf.jpg",
  __SUITE__: "hotel-suite.jpg",
  __SALA__: "hotel-ristorante.jpg",
  __GIARDINO__: "hotel-terrazza-giardino.jpg",
  __SERA__: "hotel-terrazza-sera.jpg",
  __CONGRESSI__: "hotel-sala-congressi.jpg",
  __FITNESS__: "hotel-fitness.jpg"
};

const NOME = "presentazione-fifg500-roma-2027";
const shots = process.argv.includes("--shot");

const sorgente = await readFile(SRC, "utf8");
const woff2 = await readFile(FONT);

const fontCss = `@font-face {
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 400 900;
  font-stretch: 100%;
  font-display: block;
  src: url(data:font/woff2;base64,${woff2.toString("base64")}) format('woff2');
}`;

let conFont = sorgente.replace("/* __FONT__ */", fontCss);
for (const [segnaposto, file] of Object.entries(IMMAGINI)) {
  const dati = await readFile(join(DIR, "assets", file));
  const tipo = file.endsWith(".png") ? "image/png" : "image/jpeg";
  conFont = conFont.replaceAll(segnaposto, `data:${tipo};base64,${dati.toString("base64")}`);
}

const titolo = (conFont.match(/<title>([\s\S]*?)<\/title>/) || [, "Italian FootGolf Open 2027"])[1].trim();
const stili = conFont.match(/<style>[\s\S]*?<\/style>/g) || [];
const corpo = conFont
  .replace(/<title>[\s\S]*?<\/title>/, "")
  .replace(/<style>[\s\S]*?<\/style>/g, "")
  .trim();

const skeleton = (head, body) => `<!doctype html>
<html lang="en">
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

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

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

const statico = await page.evaluate(() => {
  document.querySelectorAll("script").forEach((s) => s.remove());
  return document.body.innerHTML.trim();
});

const htmlStandalone = skeleton(stili.join("\n"), statico);
const htmlArtifact = `<title>${titolo}</title>\n\n${stili.join("\n")}\n\n${statico}\n`;

await writeFile(join(DIST, `${NOME}.html`), htmlStandalone, "utf8");
await writeFile(join(DIST, "brochure-artifact.html"), htmlArtifact, "utf8");

const finale = join(DIST, `${NOME}.html`);
await page.goto(pathToFileURL(finale).href, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);

await page.pdf({
  path: join(DIST, `${NOME}.pdf`),
  width: "1280px",
  height: "720px",
  printBackground: true,
  preferCSSPageSize: true
});

const SLIDE_PX = 720; // 16:9 a 1280×720, invece dell'altezza A4 delle altre brochure

const misure = await page.evaluate(() =>
  [...document.querySelectorAll(".slide")].map((p, i) => ({ n: i + 1, alta: Math.round(p.offsetHeight) }))
);

console.log(`\n${misure.length} slide generate — formato = 1280×${SLIDE_PX}px\n`);
let guai = 0;
for (const m of misure) {
  const over = m.alta - SLIDE_PX;
  const ok = over <= 1;
  if (!ok) guai++;
  console.log(`  ${ok ? "✓" : "✗"} slide ${String(m.n).padStart(2)} — ${m.alta}px${ok ? "" : `  DEBORDA +${over}px`}`);
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
console.log(`  → dist/brochure-artifact.html\n`);

if (guai) {
  console.error(`✗ ${guai} slide in overflow: alleggerire il contenuto o ridurre le dimensioni.\n`);
  process.exit(1);
}
