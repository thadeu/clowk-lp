import type { Metadata } from 'next';
import CodeExample from '@/components/CodeExample';
import FAQ from '@/components/FAQ';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import JsonLd from '@/components/JsonLd';
import Pricing from '@/components/Pricing';
import SDKSection from '@/components/SDKSection';
import { findProduct, SITE_URL } from '@/lib/products';

const auth = findProduct('auth')!;

export const metadata: Metadata = {
  title: { absolute: auth.seoTitle },
  description: auth.seoDescription,
  alternates: { canonical: '/auth/' },
  openGraph: { title: auth.seoTitle, description: auth.seoDescription, url: '/auth/' },
  twitter: { title: auth.seoTitle, description: auth.seoDescription },
};

export default function AuthPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: auth.name,
          description: auth.seoDescription,
          url: `${SITE_URL}/auth`,
          applicationCategory: auth.category,
          operatingSystem: 'Web',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          publisher: { '@type': 'Organization', name: 'Clowk', url: SITE_URL },
        }}
      />

      <Header />

      <main>
        <Hero />
        <Features />
        <CodeExample />
        <SDKSection />
        <Pricing />
        <FAQ />
      </main>

      <Footer />
    </>
  );
}
