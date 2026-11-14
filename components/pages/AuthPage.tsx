import CodeExample from '@/components/CodeExample';
import Pricing from '@/components/Pricing';
import ProductPage from '@/components/product/ProductPage';
import SDKSection from '@/components/SDKSection';
import type { Locale } from '@/lib/i18n';
import { productMetadata } from '@/lib/metadata';
import { findProduct } from '@/lib/localized';

export function authMetadata(locale: Locale) {
  return productMetadata(findProduct('auth', locale)!, locale);
}

export default function AuthPage({ locale }: { locale: Locale }) {
  return (
    <ProductPage product={findProduct('auth', locale)!} locale={locale}>
      <Pricing locale={locale} />
      <CodeExample locale={locale} />
      <SDKSection locale={locale} />
    </ProductPage>
  );
}
