import type { MetadataRoute } from 'next';
import { localePath, locales } from '@/lib/i18n';
import { products, SITE_URL } from '@/lib/products';
import { source } from '@/lib/source';

export const dynamic = 'force-static';

type Entry = MetadataRoute.Sitemap[number];

function entries(path: string, priority: number, changeFrequency: Entry['changeFrequency']): Entry[] {
  const languages = { en: `${SITE_URL}${path}`, 'pt-BR': `${SITE_URL}${localePath('pt-br', path)}` };

  return locales.map(locale => ({
    url: `${SITE_URL}${localePath(locale, path)}`,
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = products.flatMap(product => entries(`/${product.slug}/`, 0.9, 'weekly'));
  const docs = source.getPages('en').flatMap(page => entries(`${page.url}/`, 0.5, 'monthly'));

  return [...entries('/', 1, 'weekly'), ...entries('/terms/', 0.3, 'yearly'), ...pages, ...docs];
}
