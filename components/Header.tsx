'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import LanguageSwitch from '@/components/LanguageSwitch';
import { localePath, t, type Locale } from '@/lib/i18n';
import { localizedProducts } from '@/lib/localized';

export default function Header({ locale = 'en' }: { locale?: Locale }) {
  const text = t(locale).nav;
  const products = localizedProducts(locale);

  const navLinks = [
    { label: text.products, href: localePath(locale, '/#products') },
    { label: text.family, href: localePath(locale, '/#family') },
    { label: text.docs, href: localePath(locale, '/docs') },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  const onScroll = useCallback(() => {
    const y = window.scrollY;

    setScrolled(y > 10);
    setHidden(y > 64 && y > lastScrollY.current);

    lastScrollY.current = y;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-[env(safe-area-inset-top)] ${
          scrolled ? 'bg-[#0C0014]/95 backdrop-blur-md border-b border-white/[0.08]' : 'bg-transparent'
        } ${hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
          <Logo height={30} href={localePath(locale, '/')} />

          <nav aria-label="Main" className="hidden md:flex items-center gap-7">
            {navLinks.map(item => (
              <Link key={item.label} href={item.href} className="text-[15px] font-medium text-white/70 hover:text-white transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitch locale={locale} />

            <a
              href="https://app.clowk.in/sign-in"
              className="hidden sm:inline-flex items-center min-h-10 px-4 rounded-lg text-sm font-semibold bg-[#F43F5E] text-white hover:bg-[#E8385A] transition-colors"
            >
              {text.signIn}
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden relative w-11 h-11 flex flex-col items-center justify-center gap-1.75"
              aria-label={menuOpen ? text.closeMenu : text.openMenu}
              aria-expanded={menuOpen}
            >
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2.25' : ''}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0 scale-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2.25' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-[#0C0014]/98 backdrop-blur-lg transition-all duration-300 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav aria-label="Mobile" className="flex flex-col h-full px-6 pt-24 pb-10 gap-1 overflow-y-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">{text.products}</span>

          {products.map(product => (
            <Link
              key={product.slug}
              href={localePath(locale, `/${product.slug}`)}
              onClick={() => setMenuOpen(false)}
              className="min-h-12 flex items-center text-xl font-semibold text-white/85 hover:text-white"
            >
              {product.name}
            </Link>
          ))}

          <div className="w-12 h-px bg-white/10 my-4" />

          {navLinks.slice(2).map(item => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="min-h-12 flex items-center text-lg font-medium text-white/70 hover:text-white"
            >
              {item.label}
            </Link>
          ))}

          <a
            href="https://app.clowk.in/sign-in"
            onClick={() => setMenuOpen(false)}
            className="mt-6 inline-flex items-center justify-center min-h-12 rounded-xl text-base font-semibold bg-[#F43F5E] text-white"
          >
            {text.signIn}
          </a>
        </nav>
      </div>
    </>
  );
}
