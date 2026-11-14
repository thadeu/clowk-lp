import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import JsonLd from '@/components/JsonLd';
import Family from '@/components/home/Family';
import HomeHero from '@/components/home/HomeHero';
import ProductGrid from '@/components/home/ProductGrid';
import Ways from '@/components/home/Ways';
import { products, SITE_URL } from '@/lib/products';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
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
              itemListElement: products.map((product, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: product.name,
                url: `${SITE_URL}/${product.slug}`,
              })),
            },
          ],
        }}
      />

      <Header />

      <main className="bg-[#0C0014]">
        <HomeHero />
        <ProductGrid />
        <Family />
        <Ways />
      </main>

      <Footer />
    </>
  );
}
