import ProductMark from '@/components/ProductMark';
import { t, type Locale } from '@/lib/i18n';
import { findProduct, products } from '@/lib/products';

/** The proof card: cronota and the Clowk products it runs on. */
export default function Family({ locale }: { locale: Locale }) {
  const text = t(locale).home;
  const cronota = findProduct('cronota')!;
  const used = products.filter(product => product.usedBy);

  return (
    <figure id="family" className="scroll-mt-28 rounded-[20px] bg-[#140D1C] border border-white/[0.09] p-4 sm:p-5 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <ProductMark product={cronota} size="sm" />
        <span className="text-base font-bold text-white">{cronota.name}</span>
        <span className="text-sm text-[#A9A1B6]">{text.runsOn}</span>
      </div>

      <ul className="flex flex-col gap-2.5">
        {used.map(product => (
          <li key={product.slug} className="flex items-center gap-3 px-3.5 py-3 rounded-[14px] bg-[#0C0014] border border-white/[0.09]">
            <ProductMark product={product} size="sm" />
            <span className="text-base font-bold text-white">{product.name}</span>
            <span className="ml-auto text-sm font-bold text-[#FB7185]">{text.usedBy[product.usedBy!]}</span>
          </li>
        ))}
      </ul>

      <figcaption className="text-sm leading-relaxed text-[#A9A1B6]">{text.familyLead}</figcaption>
    </figure>
  );
}
