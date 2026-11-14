import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductPage from '@/components/product/ProductPage';
import type { Locale } from '@/lib/i18n';
import { productMetadata } from '@/lib/metadata';
import { products } from '@/lib/products';
import { findProduct } from '@/lib/localized';

type Params = Promise<{ product: string }>;

export function productParams() {
  return products.filter(product => product.slug !== 'auth').map(product => ({ product: product.slug }));
}

export async function otherProductMetadata(params: Params, locale: Locale): Promise<Metadata> {
  const product = findProduct((await params).product, locale);

  if (!product) return {};

  return productMetadata(product, locale);
}

export default async function OtherProductPage({ params, locale }: { params: Params; locale: Locale }) {
  const product = findProduct((await params).product, locale);

  if (!product) notFound();

  return <ProductPage product={product} locale={locale} />;
}
