import type { Metadata } from 'next';
import { alternates, t, type Locale } from '@/lib/i18n';
import type { Product } from '@/lib/products';

export function productMetadata(product: Product, locale: Locale = 'en'): Metadata {
  const path = `/${product.slug}/`;
  const links = alternates(locale, path);
  const url = links.canonical;
  const images = [{ url: `/og/${product.slug}.png?v=2`, width: 1200, height: 630, alt: `${product.name} — ${product.tagline}` }];

  return {
    title: { absolute: product.seoTitle },
    description: product.seoDescription,
    alternates: links,
    openGraph: { title: product.seoTitle, description: product.seoDescription, url, images, locale: t(locale).ogLocale },
    twitter: { card: 'summary_large_image', title: product.seoTitle, description: product.seoDescription, images: images.map(image => image.url) },
  };
}
