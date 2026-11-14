import TermsPage, { termsMetadata } from '@/components/pages/TermsPage';

export const metadata = termsMetadata('pt-br');

export default function Page() {
  return <TermsPage locale="pt-br" />;
}
