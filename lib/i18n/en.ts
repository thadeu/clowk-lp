export const en = {
  htmlLang: 'en',
  ogLocale: 'en_US',
  languageName: 'English',
  switchLabel: 'Português',
  switchAria: 'Ver em português',

  site: {
    title: 'Clowk — Small tools that each do one job well',
    description:
      'Clowk makes small tools: auth for sign-in, ndb for search on NDJSON, voodu for deploys, anway for background jobs, cronota for NFS-e and 1billion for email.',
  },

  nav: {
    products: 'Products',
    family: 'How they fit',
    docs: 'Docs',
    signIn: 'Sign in',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },

  footer: {
    tagline: 'Small tools that each do one job well.',
    products: 'Products',
    docs: 'Docs',
    company: 'Company',
    support: 'Support',
    terms: 'Terms',
    rights: 'All rights reserved.',
  },

  home: {
    pill: 'Six products · one family',
    title: 'Small tools that each do one job well.',
    lead: 'Sign-in for every stack, search on plain NDJSON, deploys from one HCL file, background jobs without Redis, NFS-e on a schedule and, soon, email. ndb, voodu and anway run on your own servers. auth, cronota and 1billion run on ours, so there is nothing to install.',
    seeProducts: 'See the products',
    startAuth: 'Start with auth',
    productsTitle: 'The products',
    productsLead: 'Each product has its own page here and its own docs.',
    notPublic: 'Runs inside the Clowk apps first. Opens to the public later.',
    about: (name: string) => `About ${name} →`,
    familyTitle: 'We build on our own tools.',
    familyLead: 'cronota is a real app, and it runs on four of the products. You can mix them the same way, or use only one.',
    runsOn: 'runs on',
    usedBy: { 'sign-in': 'sign-in', deploys: 'deploys', jobs: 'jobs', email: 'email' } as Record<string, string>,
    waysTitle: 'One way of working',
    ways: [
      { title: 'Your servers or ours', text: 'ndb, voodu and anway install with one command on a box you control. auth, cronota and 1billion are hosted by Clowk.' },
      { title: 'Small on purpose', text: 'One binary or one app, configured in one file. No cluster to babysit.' },
      { title: 'Docs for people and agents', text: 'Short pages in plain words, written for developers and for AI agents.' },
    ],
  },

  product: {
    breadcrumb: 'Products',
    by: 'by Clowk',
    github: 'View on GitHub',
    install: 'Install',
    features: 'What you get',
    more: 'More from Clowk',
    questions: 'Questions',
    openCronota: 'Open cronota ↗',
    readDocs: 'Read the docs',
  },

  code: {
    eyebrow: 'Integrate in minutes',
    title: 'From zero to auth in 5 lines',
    lead: 'Works with your existing stack. No new abstractions to learn.',
    more: 'Need more detail?',
    readDocs: 'Read the docs →',
  },

  sdk: {
    title: 'One broker, every runtime',
    leadBefore: 'All packages depend on',
    leadAfter: "for token verification. Framework packages are thin wrappers that adapt core to each framework's conventions.",
    packages: {
      '@clowk/core': 'Runtime-agnostic foundation. JWT verification, HTTP client, SDK resources. Works on Node.js, Bun, Deno, and Cloudflare Workers.',
      '@clowk/sdk': 'User-facing convenience package. Re-exports everything from @clowk/core under a clean import path.',
      '@clowk/react': 'ClowkProvider, SignInButton, SignUpButton, SignOutButton, useAuth hook. Redirect-based — no embedded UI.',
      '@clowk/nextjs': 'Server-side middleware for route protection, auth() helper for Server Components, plus React components re-exported.',
      '@clowk/express': 'Express middleware. Extracts and verifies JWT from query param, cookie, or Authorization header.',
      '@clowk/hono': "Hono middleware. Same behavior as Express, adapted for Hono's API. Works on Workers, Bun, Deno, and Node.js.",
    } as Record<string, string>,
  },

  pricing: {
    eyebrow: 'Pricing',
    title: 'Two plans. No per-user bill.',
    lead: 'Authentication priced by what you build, not by how many people sign in. Your user count never appears on the invoice.',
    mostTeams: 'Most teams',
    questions: 'Questions about the plans? Write to',
    plans: [
      {
        name: 'Free',
        tagline: 'Everything you need to ship authentication.',
        price: '$0',
        cadence: 'forever',
        cta: 'Start building',
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
        cta: 'Upgrade to Pro',
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
    ],
  },

  docs: {
    menu: 'Menu',
    openSidebar: 'Open sidebar',
    closeSidebar: 'Close sidebar',
    back: 'Back to Clowk',
  },

  notFound: {
    title: 'Page not found',
    text: "The page you're looking for doesn't exist or has been moved.",
    back: 'Back to home',
  },

  terms: {
    title: 'Terms of Service — Clowk',
    description: 'Clowk terms of service, acceptable use policy, and legal information.',
  },
};

export type Dictionary = typeof en;
