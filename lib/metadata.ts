import type { Metadata } from 'next';
import type { Product } from '@/lib/products';

export function productMetadata(product: Product): Metadata {
  const url = `/${product.slug}/`;
  const images = [{ url: `/og/${product.slug}.png`, width: 1200, height: 630, alt: `${product.name} — ${product.tagline}` }];

  return {
    title: { absolute: product.seoTitle },
    description: product.seoDescription,
    alternates: { canonical: url },
    openGraph: { title: product.seoTitle, description: product.seoDescription, url, images },
    twitter: { card: 'summary_large_image', title: product.seoTitle, description: product.seoDescription, images: images.map(image => image.url) },
  };
}
