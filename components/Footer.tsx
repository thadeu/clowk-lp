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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-[2fr_1fr_1fr_1fr] gap-x-6 gap-y-8">
        <div className="col-span-2 sm:col-span-3 md:col-span-1 flex flex-col gap-2">
          <Logo height={28} />
          <p className="text-sm text-[#A9A1B6]">Small tools you run on your own servers.</p>
        </div>

        <FooterColumn title="Products" links={products.map(product => ({ label: product.name, href: `/${product.slug}` }))} />
        <FooterColumn title="Docs" links={products.map(product => ({ label: product.docsLabel, href: product.docsUrl }))} />
        <FooterColumn title="Company" links={company} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-8 text-xs text-[#A9A1B6]">
        © {new Date().getFullYear()} Clowk. All rights reserved.
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="flex flex-col text-sm min-w-0">
      <h2 className="text-[13px] font-bold text-white mb-1">{title}</h2>

      {links.map(link => (
        <Link key={link.label} href={link.href} className="min-h-8 inline-flex items-center truncate hover:text-white transition-colors">
          {link.label}
        </Link>
      ))}
    </div>
  );
}
