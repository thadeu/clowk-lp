// Renders the brand PNG files and favicon.ico from brand/svg.
//
//   node brand/tools/render.mjs
//
// Needs Playwright with Chromium (npx playwright install chromium).

import { chromium } from 'playwright';
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const svgDir = join(root, 'svg');
const pngDir = join(root, 'png');

const jobs = [];

for (const size of [64, 128, 256, 512, 1024]) {
  jobs.push(['mark-on-light', size, `mark-on-light-${size}`]);
  jobs.push(['mark-on-dark', size, `mark-on-dark-${size}`]);
}

jobs.push(['mark-ink', 512, 'mark-ink-512'], ['mark-white', 512, 'mark-white-512']);

jobs.push(['app-icon', 1024, 'app-icon-1024'], ['app-icon', 512, 'app-icon-512']);
jobs.push(['mark-tile', 512, 'mark-tile-512'], ['mascot-on-light', 512, 'mascot-on-light-512'], ['mascot-on-dark', 512, 'mascot-on-dark-512']);

jobs.push(
  ['app-icon-square', 180, 'apple-touch-icon'],
  ['app-icon-square', 192, 'icon-192'],
  ['app-icon-square', 512, 'icon-512'],
  ['app-icon-square', 1024, 'icon-1024']
);

for (const size of [16, 32, 48]) {
  jobs.push(['favicon-tile', size, `favicon-${size}`]);
}

for (const name of ['lockup-on-dark', 'lockup-on-light', 'lockup-stacked-on-dark', 'lockup-stacked-on-light', 'wordmark-on-dark', 'wordmark-on-light']) {
  jobs.push([name, 1600, name]);
}

jobs.push(['social-preview', 1200, 'social-preview']);

function viewBox(svg) {
  const [, , width, height] = svg.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);

  return { width, height };
}

function ico(pngs) {
  const header = Buffer.alloc(6 + pngs.length * 16);
  let offset = header.length;

  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);

  pngs.forEach(({ size, data }, i) => {
    const entry = 6 + i * 16;

    header.writeUInt8(size >= 256 ? 0 : size, entry);
    header.writeUInt8(size >= 256 ? 0 : size, entry + 1);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);

    offset += data.length;
  });

  return Buffer.concat([header, ...pngs.map(({ data }) => data)]);
}

rmSync(pngDir, { recursive: true, force: true });
mkdirSync(pngDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();

for (const [source, width, out] of jobs) {
  const svg = readFileSync(join(svgDir, `${source}.svg`), 'utf8');
  const box = viewBox(svg);
  const height = Math.round((width * box.height) / box.width);

  await page.setViewportSize({ width, height });
  await page.setContent(`<style>html,body{margin:0;background:transparent}img{display:block;width:${width}px;height:${height}px}</style><img src="data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}">`);
  await page.locator('img').screenshot({ path: join(pngDir, `${out}.png`), omitBackground: true });
}

await browser.close();

const favicons = [16, 32, 48].map((size) => ({ size, data: readFileSync(join(pngDir, `favicon-${size}.png`)) }));

writeFileSync(join(root, 'favicon.ico'), ico(favicons));

console.log(`${readdirSync(pngDir).length} PNG files in ${pngDir}, and favicon.ico`);
