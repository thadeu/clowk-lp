import Link from 'next/link';
import ProductMark from '@/components/ProductMark';
import { localePath, t, type Locale } from '@/lib/i18n';
import { localizedProducts } from '@/lib/localized';

export default function HomeHero({ locale }: { locale: Locale }) {
  const text = t(locale).home;
  const products = localizedProducts(locale);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-10 md:pt-40 md:pb-14 flex flex-col items-start gap-5 md:gap-6">
      <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/[0.12] text-[13px] text-[#C9C3D4]">
        {text.pill}
      </span>

      <h1 className="max-w-[880px] text-[clamp(40px,6.4vw,76px)] leading-[1.02] tracking-[-0.035em] font-bold text-white">
        {text.title}
      </h1>

      <p className="max-w-[660px] text-[clamp(17px,1.6vw,20px)] leading-relaxed text-[#C9C3D4]">
        {text.lead}
      </p>

      <div className="flex flex-wrap gap-3">
        <Link href="#products" className="inline-flex items-center min-h-12 px-6 rounded-xl bg-[#F43F5E] hover:bg-[#E8385A] text-white font-bold transition-colors">
          {text.seeProducts}
        </Link>

        <Link href={localePath(locale, '/auth')} className="inline-flex items-center min-h-12 px-6 rounded-xl border border-white/[0.18] hover:bg-white/5 text-white font-bold transition-colors">
          {text.startAuth}
        </Link>
      </div>

      <ul className="flex flex-wrap gap-2.5 mt-2 md:mt-4" aria-label={t(locale).nav.products}>
        {products.map(product => (
          <li key={product.slug}>
            <Link
              href={localePath(locale, `/${product.slug}`)}
              className="inline-flex items-center gap-2.5 min-h-11 pl-1.5 pr-3.5 rounded-full bg-white/5 border border-white/10 hover:border-white/25 text-[15px] font-medium text-white transition-colors"
            >
              <ProductMark product={product} size="sm" />
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
