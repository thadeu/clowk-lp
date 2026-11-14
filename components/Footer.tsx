import Link from 'next/link';
import Logo from '@/components/Logo';
import { products } from '@/lib/products';

const company = [
  { label: 'GitHub', href: 'https://github.com/thadeu' },
  { label: 'Support', href: 'mailto:support@clowk.in' },
  { label: 'Terms', href: '/terms' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0C0014] border-t border-white/[0.08] text-[#C9C3D4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex flex-wrap gap-10">
        <div className="flex-[1_1_240px] flex flex-col gap-3">
          <Logo height={28} />
          <p className="text-sm text-[#A9A1B6]">Small tools you run on your own servers.</p>
        </div>

        <FooterColumn title="Products" links={products.map(product => ({ label: product.name, href: `/${product.slug}` }))} />
        <FooterColumn title="Docs" links={products.map(product => ({ label: product.docsLabel, href: product.docsUrl }))} />
        <FooterColumn title="Company" links={company} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-10 text-xs text-[#A9A1B6]">
        © {new Date().getFullYear()} Clowk. All rights reserved.
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="flex-[1_1_160px] flex flex-col gap-1 text-sm">
      <h2 className="text-[13px] font-bold text-white mb-1.5">{title}</h2>

      {links.map(link => (
        <Link key={link.label} href={link.href} className="min-h-8 inline-flex items-center hover:text-white transition-colors">
          {link.label}
        </Link>
      ))}
    </div>
  );
}
