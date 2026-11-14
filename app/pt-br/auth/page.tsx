import AuthPage, { authMetadata } from '@/components/pages/AuthPage';

export const metadata = authMetadata('pt-br');

export default function Page() {
  return <AuthPage locale="pt-br" />;
}
