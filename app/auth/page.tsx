import AuthPage, { authMetadata } from '@/components/pages/AuthPage';

export const metadata = authMetadata('en');

export default function Page() {
  return <AuthPage locale="en" />;
}
