import { DocsArticle, docsMetadata, docsParams } from '@/components/pages/DocsArticle';

type Props = { params: Promise<{ slug?: string[] }> };

export default function Page({ params }: Props) {
  return <DocsArticle params={params} locale="en" />;
}

export function generateStaticParams() {
  return docsParams('en');
}

export function generateMetadata({ params }: Props) {
  return docsMetadata(params, 'en');
}
