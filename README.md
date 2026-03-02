# Maykell Interactive Portfolio MVP

Production-ready MVP website for a Roblox game studio portfolio, built from the attached spec as the implementation source of truth.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS v4 with CSS variables and design tokens
- Framer Motion for core motion and section reveals
- Sanity Studio with `next-sanity` for headless content management
- Zod for form validation

GSAP is intentionally not part of the active runtime stack. The current interaction layer is handled with Framer Motion and CSS transitions. Add GSAP only if a future interaction has a clear, specific need for it.

## Architecture

- `src/app`: App Router pages, metadata routes, and the contact API endpoint
- `src/components`: Reusable UI, layout, marketing, analytics, and motion components
- `src/lib`: Typed domain models, validation, analytics helpers, SEO helpers, and CMS fallback content
- `src/sanity`: Sanity Studio schemas, structure, client, and GROQ queries

The public pages consume typed data helpers from `src/lib/site-content.ts`. That file centralizes Sanity reads plus local fallback content, so page components stay focused on rendering and degrade gracefully while CMS content is incomplete.

## Product Assumptions

These implementation choices were made intentionally to maximize conversion clarity, performance, and maintainability for an MVP launch:

- The primary conversion goal is a qualified inbound inquiry, so contact CTAs stay visible across the site and the homepage is structured around offer → proof → trust → inquiry.
- Sanity is implemented as a standalone Studio instead of an embedded route, so content editing stays isolated from the public marketing shell and is easier to manage operationally.
- The site ships with structured fallback content in `src/lib/site-content.ts`, so the frontend remains launchable while CMS content is still being populated.
- Motion is lightweight and interruptible by default, using Framer Motion for reveals/transitions and CSS transitions for microinteractions, with reduced-motion fallbacks built in.
- Analytics is event-based and provider-agnostic, with GA4, Plausible, and PostHog supported through the same modular tracking helpers.
- Form notifications are webhook-based by default for MVP speed; if durable lead storage is required, extend `src/app/api/contact/route.ts` with a database or CRM integration.
- The default metadata base falls back to `https://example.com` until `NEXT_PUBLIC_SITE_URL` is set, so production deployment must override that environment variable before launch.

## What's Implemented

- Conversion-first pages: Home, Work, Project Detail, Services, About, Contact
- Legal pages plus `404` and route-level error boundaries
- Sanity-backed content layer with local fallbacks while the CMS is being populated
- Filterable portfolio grid and static case-study generation
- Qualification-first contact form with client and server validation
- Honeypot spam protection and in-memory rate limiting
- Optional Discord and Slack webhook notifications
- SEO metadata, sitemap, robots, manifest, and dynamic OG image
- Analytics hooks for route-level page views, CTA clicks, filter usage, project clicks, scroll depth, form start, form submit success/failure, and external contact clicks
- Security headers in `next.config.ts`

## Environment

Copy `.env.example` to `.env.local` and configure the values you need:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-02
SANITY_STUDIO_TITLE=Game Studio Portfolio CMS
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
DISCORD_WEBHOOK_URL=
SLACK_WEBHOOK_URL=
FORM_RATE_LIMIT_MAX=5
FORM_RATE_LIMIT_WINDOW_MS=600000
```

Notes:

- Analytics scripts only load when their matching `NEXT_PUBLIC_*` values are set.
- Form notifications only fire when a Discord or Slack webhook is configured.
- If the Sanity environment values are not set, the site falls back to the seeded local content in `src/lib/site-content.ts`.

## Analytics

Analytics is wired through `src/lib/analytics.ts` and the route tracker in `src/components/analytics/route-analytics-tracker.tsx`.

Implementation notes:

- GA4, Plausible, and PostHog are optional and only initialize when their env vars are set.
- Route-level page views are tracked on client-side navigation so the funnel stays visible across the App Router.
- Payloads are sanitized before dispatch: obvious PII keys are dropped and string values are trimmed.
- Form analytics track lifecycle state only. No form field contents are sent to analytics providers.

Core funnel events:

- `page_view`: Fired on first load and route changes. Props: `path`, `page_type`, `title`.
- `project_card_click`: Fired when a user enters a case study from the portfolio grid or featured work. Props: `slug`, `placement`.
- `project_page_cta_click`: Fired on project detail CTAs. Props: `slug` when available, `placement`, `label`.
- `contact_form_started`: Fired once when the contact form receives first focus. Props: `source`.
- `contact_form_submit_success`: Fired after a successful form submission. Props: `source`.
- `contact_form_submit_failed`: Fired after a failed submission. Props: `source`, `failure_type`, `error_count` when available.

Additional supporting events already in use:

- `cta_click`
- `nav_click`
- `nav_logo_click`
- `portfolio_filter_usage`
- `portfolio_filter_reset`
- `project_scroll_depth`
- `external_contact_click`

To extend tracking later, add a new constant in `ANALYTICS_EVENTS`, then use `trackEvent(...)` or `trackPageView(...)` in the relevant component.

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
npm run sanity:dev
npm run sanity:deploy
```

## Docker

Production containerization is included for the Next.js app.

Files:

- `Dockerfile`: Multi-stage production build using Next.js standalone output
- `docker-compose.yml`: Runs the app in production mode with restart policy enabled
- `.dockerignore`: Keeps the build context lean and avoids copying local artifacts

Build and run with Docker:

```bash
docker compose build
docker compose up -d
```

Notes:

- The compose service exposes only the internal app port `3000` via `expose`, so it is intended to sit behind a reverse proxy, ingress, or another internal network consumer.
- The container runs the compiled production server with `node server.js`; it does not use `next dev`.
- Add runtime environment variables in your deployment platform or by extending `docker-compose.yml` with an `env_file` or `environment` block for your deployment target.

## Running Locally

Start the frontend:

```bash
npm run dev
```

Open `http://localhost:3000`.

Start the CMS:

```bash
npm run sanity:dev
```

This opens the standalone Sanity Studio.

## CMS Setup

Sanity is configured as a standalone Studio instead of an embedded `/studio` route. That keeps the editor isolated from the public marketing shell and avoids coupling Studio UX to the production site layout.

Key files:

- `sanity.config.ts`
- `sanity.cli.ts`
- `src/sanity/schemaTypes/*`
- `src/sanity/structure.ts`
- `src/sanity/lib/*`

The Studio includes structured schemas for:

- Site settings
- Home page content sections
- Projects
- Services
- Team members
- Testimonials
- FAQ items

Projects include structured fields for:

- Media
- Tags
- Service tags
- Metrics
- Outcomes and goals
- CTA settings
- SEO metadata

Each schema uses validation rules, field descriptions, and sensible defaults where that improves the editing experience.

## Staging and Production

Recommended deployment flow:

1. Configure preview or staging environment variables first.
2. Point staging to a staging dataset in Sanity if you want test content separated from live content.
3. Run `npm run build` against that environment and verify preview behavior.
4. Promote the matching production variables, including the correct `NEXT_PUBLIC_SITE_URL`.

Deployment notes:

- Optimized for Vercel-style deployment out of the box
- `npm run build` passes and statically generates all content pages except the form endpoint
- Set `NEXT_PUBLIC_SITE_URL` in production so canonicals, sitemap, robots, and OG URLs resolve correctly
- Add the same Sanity environment variables to preview and production if both environments should read the CMS
- If you need durable form storage, wire the validated payload in `src/app/api/contact/route.ts` to your CRM or database

## Launch Checklist

Before launch:

- Set `NEXT_PUBLIC_SITE_URL` to the live domain so canonicals, Open Graph URLs, Twitter images, robots, and sitemap stop using the fallback `https://example.com`.
- Configure the Sanity environment variables for the intended dataset and confirm production content has replaced the seeded placeholders.
- Verify the primary contact email, social links, and CTA destinations in Site Settings.
- Configure at least one form notification channel (`DISCORD_WEBHOOK_URL` or `SLACK_WEBHOOK_URL`) or add durable storage in `src/app/api/contact/route.ts`.
- Set the analytics provider keys you actually want to use (`NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`).
- Confirm `robots.txt` and `sitemap.xml` resolve on the live domain after deployment.
- Check the generated share assets (`/opengraph-image`, `/twitter-image`, `/icon`, `/apple-icon`) on the deployed site.
- Replace placeholder project SEO titles, descriptions, metrics, client names, and testimonials before sending links to clients.
- Run a final manual browser pass on desktop and mobile against the deployed domain for layout, motion, and form UX.
