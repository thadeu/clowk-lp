import type { Metadata } from 'next';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import JsonLd from '@/components/JsonLd';
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
        <Ways locale={locale} />

        <FinalCta title={t(locale).home.endTitle} lead={t(locale).home.endLead}>
          <a href="https://app.clowk.in/sign-up" className="inline-flex items-center min-h-12 px-6 rounded-xl bg-[#F43F5E] hover:bg-[#E8385A] text-white font-bold transition-colors">
            {t(locale).home.startAuth} →
          </a>

          <a href="#products" className="inline-flex items-center min-h-12 px-6 rounded-xl border border-white/[0.18] hover:bg-white/5 text-white font-bold transition-colors">
            {t(locale).home.seeProducts}
          </a>
        </FinalCta>
      </main>

      <Footer locale={locale} />
    </>
  );
}
