import type { Locale } from './i18n';
import { products, type Product } from './products';
import { ptBr } from './products.pt-br';

/** The products with their texts in `locale`. */
export function localizedProducts(locale: Locale = 'en'): Product[] {
  if (locale === 'en') return products;

  return products.map(product => ({ ...product, ...ptBr[product.slug] }));
}

export function findProduct(slug: string, locale: Locale = 'en') {
  return localizedProducts(locale).find(product => product.slug === slug);
}
