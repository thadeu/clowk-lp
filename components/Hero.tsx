'use client';

import { useEffect, useState } from 'react';

const installCommands = [
  'npm install @clowk/sdk',
  'npm install @clowk/react',
  'npm install @clowk/nextjs',
  'npm install @clowk/hono',
  'npm install @clowk/express',
  'bundle add clowk',
  "gem 'clowk'",
];

export default function Hero() {
  const [cmdIndex, setCmdIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCmdIndex(prev => (prev + 1) % installCommands.length);
        setFade(true);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentCmd = installCommands[cmdIndex];
  const isGem = currentCmd.startsWith('gem') || currentCmd.startsWith('bundle');

  return (
    <section className="relative min-h-screen bg-[#0C0014] flex flex-col items-center justify-center px-6 pt-24 pb-20 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#F43F5E] opacity-[0.06] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-[#E8930C] opacity-[0.04] blur-[100px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-white/60 font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8930C] animate-pulse" />
          Free forever · Auth Broker · No per-MAU billing
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
          Broker, not provider.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F43F5E] to-[#E8930C]">
            Auth that stays out of your UI.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-10">
          Most auth solutions own your sign-in UI. Clowk brokers the authentication between your app and OAuth providers
          through a redirect flow — no embedded forms, no iframes, no frontend lock-in.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="https://app.clowk.in"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#F43F5E] text-white font-semibold text-base hover:bg-[#E8385A] transition-all shadow-lg shadow-[#F43F5E]/25"
          >
            Get started free
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-white font-medium text-base hover:bg-white/5 transition-all"
          >
            See how it works
          </a>
        </div>

        {/* Rotating install snippet */}
        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-left min-w-[340px]">
          <span className="text-[#E8930C] text-sm font-medium select-none">{isGem ? '#' : '$'}</span>
          <code
            className={`text-white/80 text-sm font-mono transition-opacity duration-300 ${
              fade ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {currentCmd}
          </code>
          <button
            className="ml-auto text-white/30 hover:text-white/60 transition-colors"
            onClick={() => navigator.clipboard?.writeText(currentCmd)}
            title="Copy"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
