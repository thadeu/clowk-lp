# Clowk Landing Page

Landing page for [Clowk](https://clowk.in) — authentication broker for every stack.

## Stack

- Next.js 16 (static export)
- React 19
- Tailwind CSS 4
- HLS.js (video player)
- react-icons / react-syntax-highlighter
- Cloudflare Pages

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm build
```

Static output goes to `out/`.

## Deploy

Deployed to Cloudflare Pages:

```bash
pnpm build
npx wrangler pages deploy out --project-name clowk-lp
```

Live at **https://clowk-lp.pages.dev**

## Video (HLS)

Generate HLS segments from a source video:

```bash
chmod +x scripts/hls
scripts/hls --name demo --path ~/Downloads/walkthrough.mov
```

Output goes to `public/videos/` (`.m3u8`, `.ts` segments, `.mp4` fallback, poster).