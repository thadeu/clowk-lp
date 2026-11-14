import { en, type Dictionary } from './en';
import { ptBr } from './pt-br';

export const locales = ['en', 'pt-br'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const LOCALE_COOKIE = 'lang';

const PREFIX = '/pt-br';

const dictionaries: Record<Locale, Dictionary> = { en, 'pt-br': ptBr };

/** The UI texts of a locale. */
export function t(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Turns an English path into the same path in `locale`. External links and mailto stay as they are. */
export function localePath(locale: Locale, path: string): string {
  if (locale === defaultLocale || !path.startsWith('/')) return path;

  if (path === '/') return `${PREFIX}/`;

  if (path.startsWith('/#')) return `${PREFIX}/${path.slice(1)}`;

  return `${PREFIX}${path}`;
}

/** The locale of a pathname: `/pt-br/...` is Portuguese, the rest is English. */
export function localeFromPath(pathname: string): Locale {
  return pathname === PREFIX || pathname.startsWith(`${PREFIX}/`) ? 'pt-br' : 'en';
}

/** The English pathname of any pathname. */
export function stripLocale(pathname: string): string {
  if (localeFromPath(pathname) === defaultLocale) return pathname;

  return pathname.slice(PREFIX.length) || '/';
}

/** The `alternates` block for page metadata: canonical plus hreflang links. */
export function alternates(locale: Locale, path: string) {
  return {
    canonical: localePath(locale, path),
    languages: {
      en: path,
      'pt-BR': localePath('pt-br', path),
      'x-default': path,
    },
  };
}
