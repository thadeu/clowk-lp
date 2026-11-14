import type { ReactNode } from 'react';
import DocsShell from '@/components/pages/DocsShell';

export default function Layout({ children }: { children: ReactNode }) {
  return <DocsShell locale="pt-br">{children}</DocsShell>;
}
