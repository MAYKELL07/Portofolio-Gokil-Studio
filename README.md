# Maykell Interactive

Client-facing Roblox outsourcing and co-development website built with Next.js and Sanity.

## Stack

- Next.js 16
- TypeScript
- Tailwind CSS v4
- Sanity
- Zod

## Project Structure

- `src/app` - routes, metadata, API handlers
- `src/components` - layout, marketing, UI, analytics, media
- `src/lib` - content models, validation, SEO, analytics helpers
- `src/sanity` - Sanity schemas, client, queries, Studio config

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy the env template:

```bash
cp .env.example .env.local
```

3. Start the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Main Environment Variables

Set these in `.env.local`:

```bash
SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com

NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-03

SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_TITLE=Game Studio Portfolio CMS
```

Optional:

- `SANITY_API_READ_TOKEN`
- `SANITY_REVALIDATE_SECRET`
- `SANITY_STUDIO_HOSTNAME`
- `SANITY_STUDIO_APP_ID`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`
- `NEXT_PUBLIC_POSTHOG_PROXY_PATH`
- `DISCORD_WEBHOOK_URL`
- `SLACK_WEBHOOK_URL`
- `FORM_RATE_LIMIT_MAX`
- `FORM_RATE_LIMIT_WINDOW_MS`

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run sanity:dev
npm run sanity:deploy
```

## Content

- Public pages read from `src/lib/site-content.ts`
- Sanity content is fetched live on Vercel when configured
- Local fallback content is used when CMS content is missing

## Notes

- The contact form posts to `src/app/api/contact/route.ts`
- Set the Sanity env vars in Vercel for Production, Preview, and Development
- Configure a Sanity webhook to `https://your-domain.com/api/revalidate`
- Use the same `SANITY_REVALIDATE_SECRET` value in both Sanity and Vercel
- Analytics only run when matching env vars are set
- The site is designed to stay usable even when some CMS data is missing
