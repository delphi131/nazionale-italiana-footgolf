const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.emulateMedia({ colorScheme: 'light' });
  await p.goto('file://' + process.argv[2], { waitUntil: 'networkidle' });
  await p.pdf({ path: process.argv[3], format: 'A4', printBackground: true,
    margin: { top: '13mm', bottom: '15mm', left: '11mm', right: '11mm' },
    displayHeaderFooter: true, headerTemplate: '<div></div>',
    footerTemplate: '<div style="width:100%;font-family:Arial,sans-serif;font-size:7.5pt;color:#5A6A75;padding:0 11mm;display:flex;justify-content:space-between;"><span>Nazionale Italiana Footgolf &middot; Quaderno Tecnico Azzurro</span><span class="pageNumber"></span></div>' });
  await b.close();
})();
