import { execFileSync } from 'node:child_process';
import type { MetadataRoute } from 'next';
import { localePath, locales } from '@/lib/i18n';
import { products, SITE_URL } from '@/lib/products';
import { source } from '@/lib/source';

export const dynamic = 'force-static';

type Entry = MetadataRoute.Sitemap[number];

/** The date of the last commit that touched these files, or now when git has no answer. */
function lastModified(...files: string[]) {
  try {
    const date = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...files], { encoding: 'utf8' }).trim();

    return date ? new Date(date) : new Date();
  } catch {
    return new Date();
  }
}

function entries(path: string, priority: number, changeFrequency: Entry['changeFrequency'], modified: Date): Entry[] {
  const languages = { en: `${SITE_URL}${path}`, 'pt-BR': `${SITE_URL}${localePath('pt-br', path)}` };

  return locales.map(locale => ({
    url: `${SITE_URL}${localePath(locale, path)}`,
    lastModified: modified,
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const site = lastModified('lib', 'components', 'app');

  const pages = products.flatMap(product => entries(`/${product.slug}/`, 0.9, 'weekly', site));

  const docs = source.getPages('en').flatMap(page => {
    const file = `content/docs/${page.path}`;
    const translated = file.replace(/\.mdx$/, '.pt-br.mdx');

    return entries(`${page.url}/`, 0.6, 'monthly', lastModified(file, translated));
  });

  return [...entries('/', 1, 'weekly', site), ...entries('/terms/', 0.3, 'yearly', lastModified('components/terms')), ...pages, ...docs];
}
