import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import { getMDXComponents } from '@/components/mdx';
import { localePath, t, type Locale } from '@/lib/i18n';
import { SITE_URL } from '@/lib/products';
import { source } from '@/lib/source';

type Params = Promise<{ slug?: string[] }>;

const DOCS_IMAGE = { url: '/og/auth.png?v=2', width: 1200, height: 630, alt: 'Clowk auth' };

export async function DocsArticle({ params, locale }: { params: Params; locale: Locale }) {
  const page = source.getPage((await params).slug, locale);

  if (!page) notFound();

  const MDX = page.data.body;
  const url = `${SITE_URL}${page.url}/`;
  const docsHome = `${SITE_URL}${localePath(locale, '/docs')}/`;

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        headline: page.data.title,
        description: page.data.description,
        url,
        inLanguage: t(locale).htmlLang,
        about: 'Clowk auth',
        publisher: { '@type': 'Organization', name: 'Clowk', url: SITE_URL },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Clowk', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Docs', item: docsHome },
          { '@type': 'ListItem', position: 3, name: page.data.title, item: url },
        ],
      },
    ],
  };

  return (
    <DocsPage toc={page.data.toc} full={page.data.full} tableOfContent={{ style: 'clerk' }} breadcrumb={{ enabled: false }}>
      <JsonLd data={data} />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>

      <DocsBody>
        <MDX components={getMDXComponents({ a: createRelativeLink(source, page) })} />
      </DocsBody>
    </DocsPage>
  );
}

export function docsParams(locale: Locale) {
  return source.getPages(locale).map(page => ({ slug: page.slugs }));
}

export async function docsMetadata(params: Params, locale: Locale): Promise<Metadata> {
  const page = source.getPage((await params).slug, locale);

  if (!page) notFound();

  const english = source.getPage(page.slugs, 'en');
  const path = `${english?.url ?? page.url}/`;
  const url = `${page.url}/`;
  const title = page.slugs.length ? `${page.data.title} · ${t(locale).docs.titleSuffix}` : t(locale).docs.titleSuffix;
  const description = page.data.description;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: { en: path, 'pt-BR': localePath('pt-br', path), 'x-default': path },
    },
    openGraph: { title, description, url, type: 'article', siteName: 'Clowk', locale: t(locale).ogLocale, images: [DOCS_IMAGE] },
    twitter: { card: 'summary_large_image', title, description, images: [DOCS_IMAGE.url] },
  };
}
