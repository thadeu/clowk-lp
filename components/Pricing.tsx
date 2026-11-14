const plans = [
  {
    name: 'Free',
    tagline: 'Everything you need to ship authentication.',
    price: '$0',
    cadence: 'forever',
    cta: { label: 'Start building', href: 'https://app.clowk.in' },
    featured: false,
    features: [
      '1 app',
      '1 production instance',
      'Google sign-in',
      'Email and password',
      'Unlimited users — no per-MAU billing',
      'Every SDK: React, Next.js, Express, Hono, Rails',
      '1 webhook endpoint',
    ],
  },
  {
    name: 'Pro',
    tagline: 'For teams running more than one thing.',
    price: 'See in app',
    cadence: 'per organization, per month',
    cta: { label: 'Upgrade to Pro', href: 'https://app.clowk.in' },
    featured: true,
    features: [
      'Unlimited apps',
      'Unlimited production instances',
      'Google, GitHub, X and Apple sign-in',
      'Email and password',
      'Unlimited users — no per-MAU billing',
      'Every SDK: React, Next.js, Express, Hono, Rails',
      'Unlimited webhook endpoints',
    ],
  },
];

function Check({ muted }: { muted?: boolean }) {
  return (
    <svg
      className={`w-5 h-5 shrink-0 mt-0.5 ${muted ? 'text-[#7E7690]' : 'text-[#F43F5E]'}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="py-14 md:py-20 border-t border-white/[0.08] scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <p className="text-sm font-semibold text-[#F43F5E] tracking-widest uppercase mb-3">Pricing</p>
          <h2 id="pricing-title" className="text-[clamp(28px,3.4vw,40px)] tracking-tight font-bold text-white leading-tight">Two plans. No per-user bill.</h2>
          <p className="mt-4 text-lg text-[#C9C3D4] max-w-2xl">
            Authentication priced by what you build, not by how many people sign in. Your user count never appears on
            the invoice.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          {plans.map(plan => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-8 h-full flex flex-col ${
                plan.featured
                  ? 'border-[#F43F5E]/45 bg-[#140D1C]'
                  : 'border-white/[0.09] bg-[#140D1C]'
              }`}
            >
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                {plan.featured && (
                  <span className="rounded-full bg-[#F43F5E]/15 px-2.5 py-0.5 text-xs font-semibold text-[#F43F5E]">
                    Most teams
                  </span>
                )}
              </div>

              <p className="mt-2 text-[#C9C3D4]">{plan.tagline}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-sm text-[#A9A1B6]">{plan.cadence}</span>
              </div>

              <a
                href={plan.cta.href}
                className={`mt-6 inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold transition-colors ${
                  plan.featured
                    ? 'bg-[#F43F5E] text-white hover:bg-[#E11D48]'
                    : 'border border-white/[0.09] text-white hover:border-white/25 hover:bg-white/5'
                }`}
              >
                {plan.cta.label}
              </a>

              <ul className="mt-8 space-y-3 text-[#E4DFEA]">
                {plan.features.map(feature => (
                  <li key={feature} className="flex gap-3">
                    <Check muted={!plan.featured} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-[#A9A1B6]">
          Questions about the plans? Write to{' '}
          <a href="mailto:support@clowk.in" className="font-medium text-[#FB7185] hover:underline">
            support@clowk.in
          </a>
          .
        </p>
      </div>
    </section>
  );
}
