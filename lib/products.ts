export type Feature = { title: string; text: string };

export type Question = { q: string; a: string };

export type Product = {
  slug: string;
  name: string;
  mark: string;
  markFill?: boolean;
  seoTitle: string;
  seoDescription: string;
  tagline: string;
  summary: string;
  bullets: string[];
  install?: string;
  installNote?: string;
  status?: string;
  hosting: 'self' | 'hosted';
  primaryCta?: { label: string; href: string };
  docsUrl: string;
  docsLabel: string;
  githubUrl?: string;
  category: string;
  platform?: string;
  example?: { caption: string; code: string };
  features: Feature[];
  faq: Question[];
  usedBy?: string;
};

export const SITE_URL = 'https://clowk.in';

export const products: Product[] = [
  {
    slug: 'auth',
    hosting: 'hosted',
    name: 'auth',
    mark: '/brand/mark-tile.svg',
    markFill: true,
    seoTitle: 'auth by Clowk — authentication broker for every stack',
    seoDescription:
      'Clowk runs the OAuth dance with Google, GitHub, X and Apple and returns a signed JWT. No embedded UI, no per-MAU billing. SDKs for React, Next.js, Express, Hono and Rails.',
    tagline: 'Broker, not provider. Sign-in that stays out of your UI.',
    summary:
      'Clowk runs the OAuth dance with Google, GitHub, X and Apple, and hands your app a signed JWT. Your app keeps its own screens.',
    bullets: [
      'Social sign-in, email and password, magic links and TOTP',
      'Signed JWT that your app checks with JWKS',
      'No per-MAU billing',
    ],
    install: 'bundle add clowk',
    installNote: 'JavaScript SDKs: npm install @clowk/sdk',
    primaryCta: { label: 'Get started free', href: 'https://app.clowk.in/sign-up' },
    docsUrl: '/docs',
    docsLabel: 'clowk.in/docs',
    githubUrl: 'https://github.com/thadeu/clowk-ruby',
    category: 'SecurityApplication',
    platform: 'Web',
    example: {
      caption: 'Protect a Rails controller',
      code: `class DashboardController < ApplicationController
  before_action :authenticate_clowk!

  def index
    @user = current_clowk
  end
end`,
    },
    features: [
      {
        title: 'No embedded UI',
        text: 'Clowk runs the whole sign-in flow on its own domain. Your app redirects and gets a JWT back: no forms or iframes in your pages.',
      },
      {
        title: 'Every stack',
        text: 'SDKs for React, Next.js, Express, Hono and Rails. @clowk/core runs on Node.js, Bun, Deno and Workers.',
      },
      {
        title: 'Many providers',
        text: 'Google, GitHub, X and Apple, plus email and password, magic links and TOTP.',
      },
      {
        title: 'Security by isolation',
        text: 'Credentials and OAuth tokens never touch your pages. The flow runs on the Clowk domain and returns a signed JWT.',
      },
      {
        title: 'Many apps',
        text: 'One Clowk account, many apps. Each app has its own keys, redirect URIs and users.',
      },
      {
        title: 'No per-MAU billing',
        text: 'The Free plan has what you need to ship sign-in. Your user count never shows on the invoice.',
      },
    ],
    faq: [
      {
        q: 'How is Clowk different from Clerk or Auth0?',
        a: 'Clerk and Auth0 render the sign-in forms inside your app. Clowk brokers the sign-in through a redirect: your app sends the user to Clowk, the user signs in, and your app gets a signed JWT back. There is no embedded UI to keep up to date.',
      },
      {
        q: 'What does broker mean?',
        a: 'Your app → Clowk (runs OAuth) → your app (gets a signed JWT). OAuth redirects the user anyway, so an embedded UI only adds a step. Clowk removes it.',
      },
      {
        q: 'Which providers are supported?',
        a: 'Google, GitHub, X and Apple, plus email and password, magic links and TOTP.',
      },
      {
        q: 'Does Clowk work outside Rails?',
        a: 'Yes. @clowk/react, @clowk/nextjs, @clowk/express and @clowk/hono cover most JavaScript stacks, and @clowk/core runs on Node.js, Bun, Deno and Cloudflare Workers.',
      },
      {
        q: 'Is Clowk free?',
        a: 'The Free plan has what you need to ship sign-in. Pro adds more apps, instances, providers and webhook endpoints. There is no per-MAU billing.',
      },
    ],
    usedBy: 'sign-in',
  },
  {
    slug: 'ndb',
    hosting: 'self',
    name: 'ndb',
    mark: '/products/ndb.svg',
    seoTitle: 'ndb — the Elasticsearch API and MongoDB filters on plain NDJSON',
    seoDescription:
      'ndb runs Elasticsearch routes and MongoDB filters on plain NDJSON. One Go binary, no JVM, no cluster, no schema. SDKs for Go, Ruby, Rails and TypeScript.',
    tagline: 'The API of Elasticsearch. The filters of MongoDB. One Go binary.',
    summary:
      'ndb runs the routes you know from Elasticsearch and the query language you know from MongoDB on plain NDJSON. One daemon, one data directory. No JVM, no cluster, no schema.',
    bullets: [
      '_search, _count, _bulk and index patterns',
      'MongoDB filters, updates and aggregate pipeline',
      'SDKs for Go, Ruby, Rails and TypeScript',
    ],
    install: 'curl -fsSL https://ndb.clowk.in/install.sh | bash',
    installNote: 'Linux and macOS, amd64 and arm64',
    docsUrl: 'https://ndb.clowk.in',
    docsLabel: 'ndb.clowk.in',
    githubUrl: 'https://github.com/thadeu/ndb',
    category: 'DeveloperApplication',
    example: {
      caption: 'Search the missed and busy calls of the last day',
      code: `curl --unix-socket /run/ndb/ndb.sock \\
  http://ndb/calls/_search -d '{
  "query": {
    "status": { "$in": ["missed", "busy"] },
    "ts": { "$gte": "now-1d/d" }
  },
  "sort": { "ts": -1 },
  "limit": 50
}'`,
    },
    features: [
      {
        title: 'Elasticsearch routes',
        text: '_search, _count, _bulk, _aggregate, _update_by_query and _delete_by_query, with index patterns like logs-2026-* and date math like now-7d/d.',
      },
      {
        title: 'MongoDB filters',
        text: '$in, $gte, $regex, $elemMatch, $and and $or, updates with $set, $inc and $push, and an aggregate pipeline.',
      },
      {
        title: 'Outbox and streams',
        text: 'A change feed with consumer positions, and Redis-style streams with groups, retries and a dead letter.',
      },
      {
        title: 'Two write modes',
        text: 'SDKs write through a write-ahead log, or your app appends to its own NDJSON files and ndb follows them.',
      },
      {
        title: 'NDJSON is the truth',
        text: 'Indexes and columnar segments come from your data. Delete them and ndb builds them again.',
      },
      {
        title: 'Same answer everywhere',
        text: 'Go, Ruby, Rails and TypeScript SDKs run the same shared test cases as the daemon.',
      },
    ],
    faq: [
      { q: 'Is ndb a cluster?', a: 'No. ndb is one node with one data directory. There is no replication and no sharding.' },
      { q: 'Do I need a JVM or a schema?', a: 'No. ndb is one Go binary, and it reads plain NDJSON.' },
      { q: 'Will the HTTP API change?', a: 'The HTTP API is stable in 1.x. Routes and keys change only in a major release.' },
    ],
  },
  {
    slug: 'voodu',
    hosting: 'self',
    name: 'voodu',
    mark: '/products/voodu.svg',
    seoTitle: 'voodu — self-hosted PaaS with one HCL file and one voodu apply',
    seoDescription:
      'voodu is a self-hosted, Heroku-shaped PaaS. One HCL file describes apps, ingress with TLS and stateful services. voodu apply builds, ships, routes and swaps over SSH.',
    tagline: 'Self-hosted PaaS. One HCL file. One voodu apply.',
    summary:
      'Heroku-shaped deploys on your own boxes. The CLI streams the build over SSH: no commit, no push, no bare repo.',
    bullets: [
      'Apps, ingress with TLS, stateful services with backup',
      'Plugins for Postgres, Redis and more',
      'Server on Linux, client on macOS',
    ],
    install: 'curl -fsSL voodu.clowk.in/install | bash',
    installNote: 'Server mode on Linux, client mode on macOS',
    docsUrl: 'https://voodu.clowk.in/docs',
    docsLabel: 'voodu.clowk.in',
    githubUrl: 'https://github.com/thadeu/clowk-voodu',
    category: 'DeveloperApplication',
    features: [
      {
        title: 'One HCL file',
        text: 'Manifests describe the running system: apps, ingress with TLS, and stateful services with backup.',
      },
      {
        title: 'Commitless deploys',
        text: 'voodu apply streams the build context to the server over SSH. No commit, no push, no bare repo.',
      },
      {
        title: 'Builds, ships, routes, swaps',
        text: 'One command builds the image, starts the new release, moves the traffic and stops the old one.',
      },
      {
        title: 'Plugins',
        text: 'Stateful services such as Postgres and Redis come as plugins, installed with the server.',
      },
      {
        title: 'Your own boxes',
        text: 'The installer sets up the CLI, the controller, Docker and a systemd unit on a Linux server.',
      },
      {
        title: 'Deploy on a tag',
        text: 'A Git tag can start a deploy, so the tag is the record of what is live.',
      },
    ],
    faq: [
      { q: 'Do I need Kubernetes?', a: 'No. voodu runs on a plain Linux server with Docker.' },
      { q: 'Do I have to commit before a deploy?', a: 'No. The CLI streams the build context straight to the server.' },
      { q: 'Which machines does it install on?', a: 'The server runs on Linux. On macOS the installer sets up the client only.' },
    ],
    usedBy: 'deploys',
  },
  {
    slug: 'anway',
    hosting: 'self',
    name: 'anway',
    mark: '/products/anway.svg',
    seoTitle: 'anway — background jobs for any language, one binary, no Redis',
    seoDescription:
      'anway is a language-agnostic background job server. One binary with embedded disk storage, no Redis. Push a job from Rails and run it in Go.',
    tagline: 'Background jobs for any language. One binary, no Redis.',
    summary: 'A Rails app pushes email.send, and a Go worker runs it. Storage is on disk, inside the binary.',
    bullets: [
      'Priority queues, retries with backoff and a dead set',
      'Cron, unique jobs and batches with callbacks',
      'SDKs for Ruby, Go and JavaScript',
    ],
    install: 'docker run -p 7419:7419 -e SERVER_PASSWORD=change-me ghcr.io/thadeu/anway',
    installNote: 'Binaries for Linux and macOS on each release',
    docsUrl: 'https://anway.clowk.in',
    docsLabel: 'anway.clowk.in',
    githubUrl: 'https://github.com/thadeu/anway',
    category: 'DeveloperApplication',
    features: [
      { title: 'Any language', text: 'Push a job from one language and run it in another, for example Rails pushes and Go runs.' },
      { title: 'No Redis', text: 'One binary with embedded disk storage. Nothing else to run.' },
      { title: 'Queues', text: 'Priority order, pause and resume, and queue throttling.' },
      { title: 'Retries and the dead set', text: 'Scheduled jobs, retries with backoff, a dead set, and MUTATE to change them.' },
      { title: 'Cron and unique jobs', text: 'Cron, unique jobs and expiring jobs, built in.' },
      { title: 'Batches', text: 'Batches with callbacks and child batches, job tracking, and a death hook.' },
    ],
    faq: [
      { q: 'Do I need Redis?', a: 'No. anway stores jobs on disk, inside the server.' },
      { q: 'Which languages can push and run jobs?', a: 'There are SDKs for Ruby, Go and JavaScript. A job pushed in one language can run in another.' },
      { q: 'How do I run it?', a: 'Use the Docker image, or download a binary for Linux or macOS from the releases.' },
    ],
    usedBy: 'jobs',
  },
  {
    slug: 'cronota',
    hosting: 'hosted',
    name: 'cronota',
    mark: '/products/cronota.svg',
    seoTitle: 'cronota — emit NFS-e on a schedule through the Emissor Nacional',
    seoDescription:
      'cronota emits NFS-e through the Emissor Nacional: one-off notes, templates and recurring schedules with approval. A1 certificate encrypted and audited.',
    tagline: 'NFS-e on a schedule, through the Emissor Nacional.',
    summary:
      'For companies in Brazil: one-off notes, templates and recurring schedules, with approval before each note if you want it.',
    bullets: [
      'Templates, drafts and clones of any note',
      'Recurring notes with optional approval',
      'A1 certificate encrypted, every opening audited',
    ],
    primaryCta: { label: 'Open cronota', href: 'https://cronota.clowk.in' },
    docsUrl: 'https://cronota.clowk.in',
    docsLabel: 'cronota.clowk.in',
    category: 'BusinessApplication',
    platform: 'Web',
    features: [
      { title: 'Notes', text: 'The same form as the Emissor Nacional. Start from a template, clone any note, or save a draft.' },
      { title: 'Schedules', text: 'Recurring notes, with an optional approval before each one is emitted.' },
      { title: 'Live and Sandbox', text: 'Production and produção restrita, switched in the tenant menu.' },
      { title: 'A1 certificate', text: 'The PFX is encrypted, and every opening is audited.' },
      { title: 'ADN sync', text: 'Notes emitted outside cronota show up in the app.' },
      { title: 'API and webhooks', text: 'API v1, webhooks, XML import, reports and team members.' },
    ],
    faq: [
      { q: 'Who is cronota for?', a: 'Companies in Brazil that emit NFS-e through the Emissor Nacional.' },
      { q: 'Can I check a note before it goes out?', a: 'Yes. A schedule can ask for approval before each note.' },
      { q: 'Can I test without emitting real notes?', a: 'Yes. Switch to Sandbox to use produção restrita.' },
    ],
  },
  {
    slug: '1billion',
    hosting: 'hosted',
    name: '1billion',
    mark: '/products/1billion.svg',
    seoTitle: '1billion — transactional email with our own mail server',
    seoDescription:
      '1billion is transactional email from Clowk, with its own mail server, DKIM and an HTTP API. In development: it runs inside the Clowk apps first and opens to the public later.',
    tagline: 'Transactional email with our own mail server.',
    summary:
      'Send email from your app with one HTTP call. 1billion queues it, signs it with DKIM and delivers it over SMTP from its own server.',
    bullets: [
      'One HTTP call per email, with API keys',
      'Queue workers with retries, DKIM signing and SMTP',
      'Paid with credits, with no monthly fee',
    ],
    status: 'In development',
    primaryCta: { label: 'Tell me when it opens', href: 'mailto:support@clowk.in?subject=1billion' },
    docsUrl: 'https://1billion.clowk.in',
    docsLabel: '1billion.clowk.in',
    category: 'CommunicationApplication',
    platform: 'Web',
    example: {
      caption: 'Send one email',
      code: `curl -X POST $BILLION_URL/send \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "from": "Acme <hi@acme.dev>",
  "to": ["you@example.com"],
  "subject": "Hello",
  "body": { "text": "Hello" }
}'`,
    },
    features: [
      { title: 'Our own mail server', text: 'A Go mail server with an HTTP API, queue workers, SMTP and DKIM. No third-party email provider.' },
      { title: 'One HTTP call', text: 'POST /send with an API key. The console checks the request and answers at once; the email goes out in the background.' },
      { title: 'Retries', text: 'Every email goes through a queue with retries before the mail server sends it.' },
      { title: 'Private by design', text: 'The mail server has no public address. Only the console talks to it, over the private network.' },
      { title: 'Credits, no monthly fee', text: 'You buy a pack of credits once and use it until it ends.' },
      { title: 'Used by our apps first', text: 'cronota is built to send its email through 1billion. The public opens later.' },
    ],
    faq: [
      { q: 'Can I use 1billion now?', a: 'Not yet. 1billion runs inside the Clowk apps first, and it opens to the public later.' },
      { q: 'How is it paid?', a: 'With credits that you buy once, with no monthly fee. The prices are not final yet.' },
      { q: 'Does it use another email provider?', a: 'No. 1billion has its own mail server, with its own SMTP and DKIM.' },
    ],
    usedBy: 'email',
  },
];

export function findProduct(slug: string) {
  return products.find(product => product.slug === slug);
}
