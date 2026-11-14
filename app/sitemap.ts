import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { products, SITE_URL } from '@/lib/products';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = products.map(product => ({
    url: `${SITE_URL}/${product.slug}/`,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const docs = source.getPages().map(page => ({
    url: `${SITE_URL}${page.url}/`,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [{ url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 }, ...pages, ...docs];
}
