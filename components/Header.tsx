'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { label: 'Docs', href: '/docs' },
  { label: 'Pricing', href: '#' },
  { label: 'Blog', href: '#' },
];

export default function Header() {
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
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-[env(safe-area-inset-top)] ${
          scrolled ? 'bg-[#0C0014]/95 backdrop-blur-md' : 'bg-transparent'
        } ${hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/clowk-white.svg"
              alt="Clowk"
              width={30}
              height={40}
              priority
              className="object-contain"
            />
            <span className="text-lg font-bold tracking-tight text-white">
              Clowk
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(item => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium transition-colors text-white/70 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://app.clowk.in/sign-in"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all border border-white/30 text-white hover:bg-white/10"
            >
              Log in
            </a>
            <a
              href="https://app.clowk.in/sign-up"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold bg-[#F43F5E] text-white hover:bg-[#E8385A] transition-colors shadow-sm"
            >
              Sign up
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.75"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-5 h-0.5 bg-white transition-all duration-300 origin-center ${
                  menuOpen ? 'rotate-45 translate-y-2.25' : ''
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                  menuOpen ? 'opacity-0 scale-0' : ''
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-white transition-all duration-300 origin-center ${
                  menuOpen ? '-rotate-45 -translate-y-2.25' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-[#0C0014]/98 backdrop-blur-lg transition-all duration-300 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`flex flex-col items-center justify-center h-full gap-8 transition-all duration-300 ${
            menuOpen ? 'translate-y-0' : '-translate-y-8'
          }`}
        >
          {navLinks.map(item => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-semibold text-white/80 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}

          <div className="w-12 h-px bg-white/10" />

          <a
            href="https://app.clowk.in/sign-in"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-medium text-white/60 hover:text-white transition-colors"
          >
            Log in
          </a>
          <a
            href="https://app.clowk.in/sign-up"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center px-8 py-3 rounded-xl text-base font-semibold bg-[#F43F5E] text-white hover:bg-[#E8385A] transition-colors shadow-lg shadow-[#F43F5E]/25"
          >
            Sign up
          </a>
        </div>
      </div>
    </>
  );
}
