# Clowk Landing Page

Site of [Clowk](https://clowk.in): the home page, one page per product (Auth, ndb, Voodu, Anway, Cronota) and the Clowk Auth docs. The brand files live in [`brand/`](brand/README.md).

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

## Release

A `vX.Y.Z` tag publishes the site to Cloudflare Pages (`.github/workflows/release.yml`). Pushing to `main` alone does not deploy.

A commit on `main` whose subject starts with `tag(...)` makes the tag for you:

```
tag(patch): fix a typo on the ndb page
tag(minor): add a page for a new product
tag(major): new site
tag(0.3.0): an exact version
```

`.github/workflows/tag.yml` reads every commit subject since the last tag (merged commits count, the most recent prefix wins), runs `script/tag`, publishes a GitHub release with the commits since the previous tag, and then runs the deploy for that tag.

From a clean, up-to-date `main` on a machine, `make tag patch|minor|major` does the same. Tags are lightweight; do not create annotated tags.

Live at **https://clowk-lp.pages.dev**

## Video (HLS)

Generate HLS segments from a source video:

```bash
chmod +x scripts/hls
scripts/hls --name demo --path ~/Downloads/walkthrough.mov
```

Output goes to `public/videos/` (`.m3u8`, `.ts` segments, `.mp4` fallback, poster).