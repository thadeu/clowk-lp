import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import TermsEn from '@/components/terms/TermsEn';
import TermsPt from '@/components/terms/TermsPt';
import { alternates, t, type Locale } from '@/lib/i18n';

export function termsMetadata(locale: Locale): Metadata {
  const { title, description } = t(locale).terms;

  return { title: { absolute: title }, description, alternates: alternates(locale, '/terms/') };
}

export default function TermsPage({ locale }: { locale: Locale }) {
  return (
    <>
      <Header locale={locale} />
      {locale === 'en' ? <TermsEn /> : <TermsPt />}
      <Footer locale={locale} />
    </>
  );
}
