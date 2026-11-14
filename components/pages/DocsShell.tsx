import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';
import { DocsSidebar } from '@/components/docs/docs-sidebar';
import type { Locale } from '@/lib/i18n';
import { docsTranslations } from '@/lib/i18n/docs';
import { source } from '@/lib/source';

export default function DocsShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <RootProvider
      theme={{ defaultTheme: 'dark', forcedTheme: 'dark' }}
      i18n={{ locale, translations: docsTranslations[locale] }}
    >
      <DocsSidebar locale={locale} />

      <DocsLayout
        tree={source.getPageTree(locale)}
        nav={{ enabled: false }}
        sidebar={{ enabled: false }}
        containerProps={{ className: 'docs-layout' }}
      >
        {children}
      </DocsLayout>
    </RootProvider>
  );
}
