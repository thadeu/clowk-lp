import type { Metadata } from 'next';
import CodeExample from '@/components/CodeExample';
import Pricing from '@/components/Pricing';
import ProductPage from '@/components/product/ProductPage';
import SDKSection from '@/components/SDKSection';
import { productMetadata } from '@/lib/metadata';
import { findProduct } from '@/lib/products';

const auth = findProduct('auth')!;

export const metadata: Metadata = productMetadata(auth);

export default function AuthPage() {
  return (
    <ProductPage product={auth}>
      <CodeExample />
      <SDKSection />
      <Pricing />
    </ProductPage>
  );
}
