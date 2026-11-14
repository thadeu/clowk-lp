import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductPage from '@/components/product/ProductPage';
import { productMetadata } from '@/lib/metadata';
import { findProduct, products } from '@/lib/products';

export const dynamicParams = false;

export function generateStaticParams() {
  return products.filter(product => product.slug !== 'auth').map(product => ({ product: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ product: string }> }): Promise<Metadata> {
  const product = findProduct((await params).product);

  if (!product) return {};

  return productMetadata(product);
}

export default async function Page({ params }: { params: Promise<{ product: string }> }) {
  const product = findProduct((await params).product);

  if (!product) notFound();

  return <ProductPage product={product} />;
}
