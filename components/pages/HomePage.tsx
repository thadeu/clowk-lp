import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import JsonLd from '@/components/JsonLd';
import Family from '@/components/home/Family';
import HomeHero from '@/components/home/HomeHero';
import ProductGrid from '@/components/home/ProductGrid';
import Ways from '@/components/home/Ways';
import { alternates, localePath, t, type Locale } from '@/lib/i18n';
import { SITE_URL } from '@/lib/products';
import { localizedProducts } from '@/lib/localized';

export function homeMetadata(locale: Locale): Metadata {
  const { title, description } = t(locale).site;

  return {
    title: { absolute: title },
    description,
    alternates: alternates(locale, '/'),
    openGraph: { title, description, url: localePath(locale, '/'), locale: t(locale).ogLocale },
    twitter: { title, description },
  };
}

export default function HomePage({ locale }: { locale: Locale }) {
  const products = localizedProducts(locale);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Organization',
              name: 'Clowk',
              url: SITE_URL,
              logo: `${SITE_URL}/icons/icon-512.png`,
              sameAs: ['https://github.com/thadeu'],
            },
            {
              '@type': 'ItemList',
              name: 'Clowk products',
              inLanguage: t(locale).htmlLang,
              itemListElement: products.map((product, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: product.name,
                url: `${SITE_URL}${localePath(locale, `/${product.slug}`)}`,
              })),
            },
          ],
        }}
      />

      <Header locale={locale} />

      <main className="bg-[#0C0014]">
        <HomeHero locale={locale} />
        <ProductGrid locale={locale} />
        <Family locale={locale} />
        <Ways locale={locale} />
      </main>

      <Footer locale={locale} />
    </>
  );
}
