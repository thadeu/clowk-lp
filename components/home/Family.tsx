import ProductMark from '@/components/ProductMark';
import { findProduct, products } from '@/lib/products';

export default function Family() {
  const cronota = findProduct('cronota')!;
  const used = products.filter(product => product.usedBy);

  return (
    <section id="family" aria-labelledby="family-title" className="scroll-mt-24 border-y border-white/[0.08] bg-[#110A18]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-18 flex flex-wrap gap-8 md:gap-10 items-center">
        <div className="flex-[1_1_340px] flex flex-col gap-3">
          <h2 id="family-title" className="text-[clamp(28px,3.4vw,40px)] tracking-tight font-bold text-white">
            We build on our own tools.
          </h2>

          <p className="text-[17px] leading-relaxed text-[#C9C3D4]">
            cronota is a real app, and it runs on four of the products. You can mix them the same way, or use only one.
          </p>
        </div>

        <div className="flex-[999_1_560px] min-w-0 rounded-[20px] bg-[#1A1222] border border-[#F43F5E]/45 p-4 sm:p-5 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <ProductMark product={cronota} size="sm" />
            <span className="text-base font-bold text-white">{cronota.name}</span>
            <span className="text-sm text-[#A9A1B6]">runs on</span>
          </div>

          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(180px,100%),1fr))] gap-2.5">
            {used.map(product => (
              <li key={product.slug} className="flex items-center gap-3 px-3.5 py-3 rounded-[14px] bg-[#140D1C] border border-white/[0.09]">
                <ProductMark product={product} size="sm" />
                <span className="text-base font-bold text-white">{product.name}</span>
                <span className="ml-auto text-sm font-bold text-[#FB7185]">{product.usedBy}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
