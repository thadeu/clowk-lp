import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0C0014] flex flex-col items-center justify-center px-6 text-center">
      <Link href="/" className="flex items-center gap-2 mb-12">
        <Image
          src="/clowk-white.svg"
          alt="Clowk"
          width={36}
          height={48}
          className="object-contain"
        />
        <span className="text-xl font-bold tracking-tight text-white">
          Clowk
        </span>
      </Link>

      <p className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F43F5E] to-[#E8930C] mb-4">
        404
      </p>

      <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
        Page not found
      </h1>

      <p className="text-white/40 text-base max-w-md mb-10">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F43F5E] text-white font-semibold text-base hover:bg-[#E8385A] transition-all shadow-lg shadow-[#F43F5E]/25"
      >
        Back to home
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>
    </main>
  );
}
