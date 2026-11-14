// Writes public/llms.txt from lib/products.ts, so the file never drifts from the site.
//
//   node --experimental-strip-types scripts/llms.mjs

import { writeFileSync } from 'node:fs';
import { products, SITE_URL } from '../lib/products.ts';

const lines = [
  '# Clowk',
  '',
  '> Clowk makes small, self-hosted tools: sign-in, search on NDJSON, deploys, background jobs, NFS-e and email. Each product does one job, and they work well together.',
  '',
  'Product names are lowercase: auth, ndb, voodu, anway, cronota, 1billion.',
  '',
  '## Products',
  '',
  ...products.map(p => `- [${p.name}](${SITE_URL}/${p.slug}/): ${p.tagline}${p.status ? ` (${p.status.toLowerCase()})` : ''} ${p.summary}`),
  '',
  '## Docs',
  '',
  ...products
    .filter(p => !p.status)
    .map(p => `- [${p.name} ${p.slug === 'cronota' ? 'app' : 'docs'}](${p.docsUrl.startsWith('/') ? SITE_URL + p.docsUrl + '/' : p.docsUrl})`),
  `- [auth in depth for agents](${SITE_URL}/llm.txt)`,
  '',
];

writeFileSync(new URL('../public/llms.txt', import.meta.url), lines.join('\n'));

console.log('public/llms.txt', lines.length, 'lines');
