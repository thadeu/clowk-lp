import Link from 'next/link';
import type { ReactNode } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import InstallLine from '@/components/InstallLine';
import JsonLd from '@/components/JsonLd';
import ProductMark from '@/components/ProductMark';
import StatusBadge from '@/components/StatusBadge';
import { products, SITE_URL, type Product } from '@/lib/products';

export default function ProductPage({ product, children }: { product: Product; children?: ReactNode }) {
  const others = products.filter(other => other.slug !== product.slug);

  return (
    <>
      <JsonLd data={structuredData(product)} />
      <Header />

      <main className="bg-[#0C0014] text-white">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 md:pt-32 pb-12 md:pb-14 flex flex-wrap gap-10 md:gap-12 items-center">
          <div className="flex-[999_1_520px] min-w-0 flex flex-col items-start gap-5">
            <nav aria-label="Breadcrumb" className="flex gap-2 text-sm text-[#A9A1B6]">
              <Link href="/#products" className="hover:text-white">Products</Link>
              <span aria-hidden="true">/</span>
              <span className="text-white" aria-current="page">{product.name}</span>
            </nav>

            <div className="flex items-center gap-4">
              <ProductMark product={product} size="lg" />

              <div className="flex flex-col gap-0.5">
                <h1 className="text-[clamp(40px,5vw,56px)] leading-none tracking-tight font-bold">{product.name}</h1>
                <span className="flex items-center gap-2 text-sm text-[#A9A1B6]">
                  by Clowk
                  {product.status && <StatusBadge status={product.status} />}
                </span>
              </div>
            </div>

            <p className="text-[clamp(22px,2.4vw,30px)] leading-tight font-bold tracking-tight">{product.tagline}</p>
            <p className="max-w-[620px] text-[17px] leading-relaxed text-[#C9C3D4]">{product.summary}</p>

            <div className="flex flex-wrap gap-3">
              {product.primaryCta && (
                <Link href={product.primaryCta.href} className="inline-flex items-center min-h-12 px-6 rounded-xl bg-[#F43F5E] hover:bg-[#E8385A] font-bold transition-colors">
                  {product.primaryCta.label} →
                </Link>
              )}

              <Link
                href={product.docsUrl}
                className={`inline-flex items-center min-h-12 px-6 rounded-xl font-bold transition-colors ${
                  product.primaryCta ? 'border border-white/[0.18] hover:bg-white/5' : 'bg-[#F43F5E] hover:bg-[#E8385A]'
                }`}
              >
                {docsCta(product)}
              </Link>

              {product.githubUrl && (
                <Link href={product.githubUrl} className="inline-flex items-center min-h-12 px-6 rounded-xl border border-white/[0.18] hover:bg-white/5 font-bold transition-colors">
                  View on GitHub
                </Link>
              )}
            </div>
          </div>

          {product.example && (
            <figure className="flex-[1_1_380px] min-w-0 rounded-[18px] bg-[#0A0610] border border-white/[0.09] overflow-hidden">
              <figcaption className="px-4 py-2.5 border-b border-white/[0.08] text-[13px] text-[#A9A1B6]">{product.example.caption}</figcaption>
              <pre className="p-4 font-mono text-[13px] leading-relaxed text-[#E4DFEA] overflow-x-auto">{product.example.code}</pre>
            </figure>
          )}
        </section>

        {product.install && (
          <section aria-labelledby="install-title" className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 md:pb-16">
            <div className="rounded-[18px] bg-[#140D1C] border border-white/[0.09] p-5 sm:px-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <h2 id="install-title" className="text-base font-bold">Install</h2>

              <div className="flex-[1_1_320px] min-w-0">
                <InstallLine command={product.install} />
              </div>

              {product.installNote && <span className="text-sm text-[#A9A1B6]">{product.installNote}</span>}
            </div>
          </section>
        )}

        <section aria-labelledby="features-title" className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 md:pb-20 flex flex-col gap-6">
          <h2 id="features-title" className="text-[clamp(28px,3.4vw,40px)] tracking-tight font-bold">What you get</h2>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-4">
            {product.features.map(feature => (
              <div key={feature.title} className="p-5.5 rounded-[18px] border border-white/[0.09] flex flex-col gap-2">
                <h3 className="text-lg font-bold">{feature.title}</h3>
                <p className="text-[15px] leading-relaxed text-[#C9C3D4]">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        {children}

        <section aria-labelledby="more-title" className="border-t border-white/[0.08] bg-[#110A18]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 flex flex-col gap-5">
            <h2 id="more-title" className="text-2xl font-bold">More from Clowk</h2>

            <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(170px,100%),1fr))] gap-3">
              {others.map(other => (
                <li key={other.slug}>
                  <Link href={`/${other.slug}`} className="flex items-center gap-3 px-4 py-3.5 rounded-[14px] bg-[#1A1222] border border-white/[0.09] hover:border-white/25 transition-colors">
                    <ProductMark product={other} size="sm" />

                    <span className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-base font-bold">{other.name}</span>
                      <span className="text-[13px] text-[#A9A1B6] truncate">{other.tagline}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="faq-title" className="max-w-[820px] mx-auto px-4 sm:px-6 py-14 md:py-18 flex flex-col gap-3">
          <h2 id="faq-title" className="text-[clamp(28px,3.4vw,40px)] tracking-tight font-bold mb-2">Questions</h2>

          {product.faq.map(item => (
            <details key={item.q} className="group rounded-[14px] border border-white/[0.09] px-5 py-4">
              <summary className="cursor-pointer text-[17px] font-bold min-h-7">{item.q}</summary>
              <p className="mt-2.5 text-[15px] leading-relaxed text-[#C9C3D4]">{item.a}</p>
            </details>
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}

function docsCta(product: Product) {
  if (product.slug === 'cronota') return 'Open cronota ↗';

  if (product.status) return `${product.docsLabel} ↗`;

  return product.docsUrl.startsWith('/') ? 'Read the docs →' : 'Read the docs ↗';
}

function structuredData(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: product.name,
        description: product.seoDescription,
        url: `${SITE_URL}/${product.slug}`,
        applicationCategory: product.category,
        operatingSystem: product.platform ?? 'Linux, macOS',
        publisher: { '@type': 'Organization', name: 'Clowk', url: SITE_URL },
      },
      {
        '@type': 'FAQPage',
        mainEntity: product.faq.map(item => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Clowk', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: product.name, item: `${SITE_URL}/${product.slug}` },
        ],
      },
    ],
  };
}
