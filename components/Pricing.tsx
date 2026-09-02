import Link from 'next/link';

// Numbers here come from the product, not from copywriting:
//
//   Free   subscriptions table defaults — max_apps 1, max_prod_instances 1,
//          max_webhook_endpoints 1, allowed_providers ["google"]
//   Pro    Subscription::PRO_LIMITS — all three limits -1 (unlimited),
//          providers google/github/twitter/apple
//
// The Pro PRICE is deliberately absent. Subscription::Stripe.pro_price reads it
// from Stripe at runtime and caches it for an hour, so a number typed here
// would be a second source of truth that drifts the first time the price
// changes in the dashboard — on the one page where being wrong costs a sale.
// The card sends people to the app, which asks Stripe.

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
      className={`w-5 h-5 shrink-0 mt-0.5 ${muted ? 'text-[#A1A1AA]' : 'text-[#F43F5E]'}`}
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
    <section id="pricing" className="py-24 px-6 bg-[#FAFAFA] scroll-mt-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-[#F43F5E] tracking-widest uppercase mb-3">Pricing</p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#18181B] leading-tight">Two plans. No per-user bill.</h2>
          <p className="mt-4 text-lg text-[#52525B] max-w-2xl mx-auto">
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
                  ? 'border-[#FBCCD3] bg-white shadow-sm ring-1 ring-[#FBCCD3]'
                  : 'border-[#E4E4E7] bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-[#18181B]">{plan.name}</h3>
                {plan.featured && (
                  <span className="rounded-full bg-[#FEF2F4] px-2.5 py-0.5 text-xs font-semibold text-[#F43F5E]">
                    Most teams
                  </span>
                )}
              </div>

              <p className="mt-2 text-[#52525B]">{plan.tagline}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-[#18181B]">{plan.price}</span>
                <span className="text-sm text-[#71717A]">{plan.cadence}</span>
              </div>

              <a
                href={plan.cta.href}
                className={`mt-6 inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold transition-colors ${
                  plan.featured
                    ? 'bg-[#F43F5E] text-white hover:bg-[#E11D48]'
                    : 'border border-[#E4E4E7] text-[#18181B] hover:border-[#FBCCD3] hover:bg-[#FEF2F4]'
                }`}
              >
                {plan.cta.label}
              </a>

              <ul className="mt-8 space-y-3 text-[#3F3F46]">
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

        <p className="mt-10 text-center text-sm text-[#71717A]">
          Self-hosting Clowk is another thing entirely — it is open source, and running it yourself costs nothing.{' '}
          <Link href="/docs" className="font-medium text-[#F43F5E] hover:underline">
            Read the docs
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
