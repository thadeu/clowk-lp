import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import { localePath, t, type Locale } from '@/lib/i18n';
import { source } from '@/lib/source';

type Params = Promise<{ slug?: string[] }>;

export async function DocsArticle({ params, locale }: { params: Params; locale: Locale }) {
  const page = source.getPage((await params).slug, locale);

  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full} tableOfContent={{ style: 'clerk' }} breadcrumb={{ enabled: false }}>
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
  const title = `${page.data.title} | Clowk`;
  const description = page.data.description;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: { en: path, 'pt-BR': localePath('pt-br', path), 'x-default': path },
    },
    openGraph: { title, description, url, type: 'article', siteName: 'Clowk', locale: t(locale).ogLocale },
    twitter: { card: 'summary_large_image', title, description },
  };
}
