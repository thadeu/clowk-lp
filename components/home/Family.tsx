import ProductMark from '@/components/ProductMark';
import { findProduct, products, type Product } from '@/lib/products';

export default function Family() {
  const cronota = findProduct('cronota')!;
  const used = products.filter(product => product.usedBy);

  return (
    <section id="family" aria-labelledby="family-title" className="scroll-mt-24 border-y border-white/[0.08] bg-[#110A18]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-18 flex flex-wrap gap-10 items-center">
        <div className="flex-[1_1_340px] flex flex-col gap-3.5">
          <h2 id="family-title" className="text-[clamp(28px,3.4vw,40px)] tracking-tight font-bold text-white">
            We build on our own tools.
          </h2>

          <p className="text-[17px] leading-relaxed text-[#C9C3D4]">
            Cronota is a real app, and it runs on three of the products. You can mix them the same way, or use only one.
          </p>
        </div>

        <ul className="flex-[999_1_560px] min-w-0 flex flex-col gap-3">
          {used.map(product => (
            <li key={product.slug} className="flex flex-wrap items-center gap-3.5">
              <Tile product={product} />
              <span className="text-sm font-bold text-[#FB7185] whitespace-nowrap">{product.usedBy} →</span>
              <Tile product={cronota} highlight />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Tile({ product, highlight = false }: { product: Product; highlight?: boolean }) {
  return (
    <div className={`flex-[1_1_200px] flex items-center gap-3 px-4 py-3.5 rounded-[14px] bg-[#1A1222] border ${highlight ? 'border-[#F43F5E]/45' : 'border-white/[0.09]'}`}>
      <ProductMark product={product} size="sm" />
      <span className="text-base font-bold text-white">{product.name}</span>
    </div>
  );
}
