import Link from 'next/link';
import InstallLine from '@/components/InstallLine';
import ProductMark from '@/components/ProductMark';
import StatusBadge from '@/components/StatusBadge';
import { localePath, t, type Locale } from '@/lib/i18n';
import { localizedProducts } from '@/lib/localized';

export default function ProductGrid({ locale }: { locale: Locale }) {
  const text = t(locale).home;
  const products = localizedProducts(locale);

  return (
    <section id="products" aria-labelledby="products-title" className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-14 md:pt-8 md:pb-20 flex flex-col gap-6 md:gap-7">
      <div className="flex flex-col gap-2">
        <h2 id="products-title" className="text-[clamp(28px,3.4vw,40px)] tracking-tight font-bold text-white">
          {text.productsTitle}
        </h2>

        <p className="text-[17px] text-[#C9C3D4]">{text.productsLead}</p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(330px,100%),1fr))] gap-4">
        {products.map(product => (
          <article key={product.slug} className="min-w-0 rounded-[20px] bg-[#140D1C] border border-white/[0.09] p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3.5">
              <ProductMark product={product} />

              <div className="flex flex-col gap-0.5 min-w-0">
                <h3 className="flex items-center gap-2 text-[22px] font-bold tracking-tight text-white">
                  {product.name}
                  {product.status && <StatusBadge status={product.status} />}
                </h3>
                <span className="text-[13px] text-[#A9A1B6]">{text.hosting[product.hosting]}</span>
              </div>
            </div>

            <p className="text-lg leading-snug font-bold text-white">{product.tagline}</p>

            <ul className="flex flex-col gap-2">
              {product.bullets.map(bullet => (
                <li key={bullet} className="flex gap-2.5 text-sm leading-snug text-[#E4DFEA]">
                  <Check />
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              {product.install ? (
                <InstallLine command={product.install} />
              ) : (
                <p className="rounded-xl border border-dashed border-white/[0.14] px-3.5 py-3 text-[13px] text-[#C9C3D4]">
                  {product.status ? text.notPublic : product.docsLabel}
                </p>
              )}
            </div>

            <Link href={localePath(locale, `/${product.slug}`)} className="min-h-11 inline-flex items-center text-[15px] font-bold text-[#FB7185] hover:text-white">
              {text.about(product.name)}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="w-4 h-4 flex-none mt-0.5 fill-none stroke-[#FB7185] stroke-2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
    </svg>
  );
}
