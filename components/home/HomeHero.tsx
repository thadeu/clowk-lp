import Link from 'next/link';
import Family from '@/components/home/Family';
import { t, type Locale } from '@/lib/i18n';

export default function HomeHero({ locale }: { locale: Locale }) {
  const text = t(locale).home;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-12 md:pt-40 md:pb-16 flex flex-wrap items-center gap-10 md:gap-14">
      <div className="flex-[999_1_480px] min-w-0 flex flex-col items-start gap-5 md:gap-6">
        <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/[0.12] text-[13px] text-[#C9C3D4]">
          {text.pill}
        </span>

        <h1 className="text-[clamp(40px,5.6vw,68px)] leading-[1.02] tracking-[-0.035em] font-bold text-white">
          {text.title}
        </h1>

        <p className="max-w-[600px] text-[clamp(17px,1.6vw,20px)] leading-relaxed text-[#C9C3D4]">
          {text.lead}
        </p>

        <div className="flex flex-wrap gap-3">
          <a href="https://app.clowk.in/sign-up" className="inline-flex items-center min-h-12 px-6 rounded-xl bg-[#F43F5E] hover:bg-[#E8385A] text-white font-bold transition-colors">
            {text.startAuth} →
          </a>

          <Link href="#products" className="inline-flex items-center min-h-12 px-6 rounded-xl border border-white/[0.18] hover:bg-white/5 text-white font-bold transition-colors">
            {text.seeProducts}
          </Link>
        </div>
      </div>

      <div className="flex-[1_1_340px] min-w-0">
        <Family locale={locale} />
      </div>
    </section>
  );
}
