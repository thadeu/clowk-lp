export type Feature = { title: string; text: string };

export type Question = { q: string; a: string };

export type Product = {
  slug: string;
  name: string;
  mark: string;
  seoTitle: string;
  seoDescription: string;
  tagline: string;
  summary: string;
  bullets: string[];
  install: string;
  installNote?: string;
  docsUrl: string;
  docsLabel: string;
  githubUrl?: string;
  category: string;
  example?: { caption: string; code: string };
  features: Feature[];
  faq: Question[];
  usedBy?: string;
};

export const SITE_URL = 'https://clowk.in';

export const products: Product[] = [
  {
    slug: 'auth',
    name: 'auth',
    mark: '/brand/mark-on-light.svg',
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
    docsUrl: '/docs',
    docsLabel: 'clowk.in/docs',
    category: 'SecurityApplication',
    features: [],
    faq: [],
    usedBy: 'sign-in',
  },
  {
    slug: 'ndb',
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
    install: 'open https://cronota.clowk.in',
    docsUrl: 'https://cronota.clowk.in',
    docsLabel: 'cronota.clowk.in',
    category: 'BusinessApplication',
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
];

export function findProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
