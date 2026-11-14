import OtherProductPage, { otherProductMetadata, productParams } from '@/components/pages/OtherProductPage';

type Props = { params: Promise<{ product: string }> };

export const dynamicParams = false;

export const generateStaticParams = productParams;

export function generateMetadata({ params }: Props) {
  return otherProductMetadata(params, 'pt-br');
}

export default function Page({ params }: Props) {
  return <OtherProductPage params={params} locale="pt-br" />;
}
