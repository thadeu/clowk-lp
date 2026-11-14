'use client';

import { Languages } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { LOCALE_COOKIE, localePath, stripLocale, t, type Locale } from '@/lib/i18n';

/** Links to the same page in the other language and remembers the choice in a cookie. */
type Props = { locale: Locale; compact?: boolean; className?: string };

export default function LanguageSwitch({ locale, compact = false, className = '' }: Props) {
  const pathname = usePathname();
  const target: Locale = locale === 'en' ? 'pt-br' : 'en';
  const href = localePath(target, stripLocale(pathname));
  const text = t(locale);

  function remember() {
    document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`;
  }

  return (
    <a
      href={href}
      hrefLang={t(target).htmlLang}
      onClick={remember}
      aria-label={text.switchAria}
      className={`inline-flex items-center gap-1.5 min-h-10 px-2.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors ${className}`}
    >
      <Languages size={16} aria-hidden="true" />
      {compact ? (target === 'en' ? 'EN' : 'PT') : text.switchLabel}
    </a>
  );
}
