// Renders one social preview per product into public/og/<slug>.png.
//
//   node --experimental-strip-types scripts/og.mjs
//
// Needs Playwright with Chromium. Run it when a product name, tagline or mark
// changes, and commit the PNG files.

import { chromium } from 'playwright';
import { mkdirSync, readFileSync } from 'node:fs';
import { products } from '../lib/products.ts';

const root = new URL('..', import.meta.url).pathname;
const out = `${root}public/og`;

const dataUri = path => `data:image/svg+xml;base64,${readFileSync(`${root}public${path}`).toString('base64')}`;

const clowk = dataUri('/brand/lockup-on-dark.svg');

function html(product) {
  return `<!doctype html>
<html>
<head>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,500;9..40,700&family=Nunito:wght@900&display=swap" rel="stylesheet">
<style>
  body { margin: 0; width: 1200px; height: 630px; background: #0C0014; color: #fff; font-family: 'DM Sans', sans-serif; }
  .page { box-sizing: border-box; height: 100%; padding: 88px 96px 72px; display: flex; flex-direction: column; }
  .head { display: flex; align-items: center; gap: 32px; }
  .tile { width: 148px; height: 148px; border-radius: 36px; background: #fff; display: grid; place-items: center; }
  .tile img { width: 112px; height: 112px; }
  .tile.fill { background: none; overflow: hidden; }
  .tile.fill img { width: 100%; height: 100%; }
  h1 { margin: 0; font-family: Nunito, sans-serif; font-weight: 900; font-size: 132px; letter-spacing: -0.03em; line-height: 1; }
  .status { margin-left: 8px; padding: 6px 16px; border: 2px solid rgba(232, 147, 12, 0.6); border-radius: 999px; color: #F2C06C; font-size: 26px; font-weight: 700; }
  p { margin: 48px 0 0; font-size: 50px; line-height: 1.15; font-weight: 700; letter-spacing: -0.015em; max-width: 1000px; }
  .foot { margin-top: auto; display: flex; align-items: center; justify-content: space-between; color: #C9C3D4; font-size: 28px; font-weight: 500; }
  .foot img { height: 52px; }
</style>
</head>
<body>
  <div class="page">
    <div class="head">
      <div class="tile${product.markFill ? ' fill' : ''}"><img src="${dataUri(product.mark)}"></div>
      <h1>${product.name}</h1>
      ${product.status ? `<span class="status">${product.status}</span>` : ''}
    </div>
    <p>${product.tagline}</p>
    <div class="foot">
      <span>clowk.in/${product.slug}</span>
      <img src="${clowk}">
    </div>
  </div>
</body>
</html>`;
}

mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

for (const product of products) {
  await page.setContent(html(product), { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${out}/${product.slug}.png` });
}

await browser.close();

console.log(`${products.length} images in public/og`);
