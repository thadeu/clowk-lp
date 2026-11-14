import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ height = 32 }: { height?: number }) {
  return (
    <Link href="/" aria-label="Clowk home" className="inline-flex items-center min-h-11">
      <Image src="/brand/lockup-on-dark.svg" alt="Clowk" width={Math.round(height * 4.46)} height={height} priority />
    </Link>
  );
}
