import Link from 'next/link';
import ProductMark from '@/components/ProductMark';
import { products } from '@/lib/products';

export default function HomeHero() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-36 pb-14 md:pt-44 flex flex-col items-start gap-6">
      <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/[0.12] text-[13px] text-[#C9C3D4]">
        Five products · one family · self-hosted
      </span>

      <h1 className="max-w-[880px] text-[clamp(40px,6.4vw,76px)] leading-[1.02] tracking-[-0.035em] font-bold text-white">
        Small tools you run on your own servers.
      </h1>

      <p className="max-w-[660px] text-[clamp(17px,1.6vw,20px)] leading-relaxed text-[#C9C3D4]">
        Sign-in for every stack, search on plain NDJSON, deploys from one HCL file, background jobs without Redis, and
        NFS-e on a schedule. Each one does one job, and they work well together.
      </p>

      <div className="flex flex-wrap gap-3">
        <Link href="#products" className="inline-flex items-center min-h-12 px-6 rounded-xl bg-[#F43F5E] hover:bg-[#E8385A] text-white font-bold transition-colors">
          See the products
        </Link>

        <Link href="/auth" className="inline-flex items-center min-h-12 px-6 rounded-xl border border-white/[0.18] hover:bg-white/5 text-white font-bold transition-colors">
          Start with Clowk Auth
        </Link>
      </div>

      <ul className="flex flex-wrap gap-2.5 mt-4" aria-label="Products">
        {products.map(product => (
          <li key={product.slug}>
            <Link
              href={`/${product.slug}`}
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
