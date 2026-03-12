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
- PostHog uses the official `posthog-js` SDK and React provider pattern instead of an inline snippet, so initialization stays isolated from page components.
- PostHog proxying through the app domain is optional. If enabled, Next.js rewrites a non-obvious local path to the configured regional PostHog ingestion host.
- Form notifications are webhook-based by default for MVP speed; if durable lead storage is required, extend `src/app/api/contact/route.ts` with a database or CRM integration.
- The default metadata base falls back to `https://example.com` until `SITE_URL` or `NEXT_PUBLIC_SITE_URL` is set, so production deployment must override that before launch.

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
SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-03
SANITY_API_READ_TOKEN=
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_TITLE=Game Studio Portfolio CMS
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
NEXT_PUBLIC_POSTHOG_PROXY_PATH=
DISCORD_WEBHOOK_URL=
SLACK_WEBHOOK_URL=
FORM_RATE_LIMIT_MAX=5
FORM_RATE_LIMIT_WINDOW_MS=600000
```

Recommended local setup flow:

1. Copy the template:
   `cp .env.example .env.local`
2. Set the public site origin for local or deployed environments:
   `SITE_URL=https://your-domain.com`
   `NEXT_PUBLIC_SITE_URL=https://your-domain.com`
3. Set both Sanity frontend and Studio values to the same project and dataset:
   `NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id`
   `NEXT_PUBLIC_SANITY_DATASET=production`
   `SANITY_STUDIO_PROJECT_ID=your-project-id`
   `SANITY_STUDIO_DATASET=production`
4. Set the shared Sanity API version:
   `NEXT_PUBLIC_SANITY_API_VERSION=2026-03-03`
5. Set `SANITY_STUDIO_TITLE` to the editor-facing label you want for the Studio.
6. Add `SANITY_API_READ_TOKEN` only if you need authenticated server-side reads.
7. Add analytics keys only for providers you actually want enabled.
8. Restart the Next.js app and Sanity Studio after changing env values.

Notes:

- `SITE_URL` is the canonical server-side base URL and should always be set in staging and production.
- `NEXT_PUBLIC_SITE_URL` should match `SITE_URL` for consistency across any client-exposed runtime needs.
- Sanity env resolution is shared across the app, Studio, and CLI via `src/sanity/env.ts`.
- Sanity project and dataset resolve from `SANITY_STUDIO_*` first, then `NEXT_PUBLIC_SANITY_*` as a fallback. Keep both pairs aligned if you define both.
- `NEXT_PUBLIC_SANITY_API_VERSION` is the shared API version used by the frontend, Studio, and CLI helpers.
- `SANITY_API_READ_TOKEN` is optional and server-only. Use it only when you need authenticated reads outside the public CDN path.
- The app falls back to seeded local content when Sanity env values are missing, but the Studio and CLI now fail fast with an explicit error instead of silently using placeholder IDs.
- Analytics scripts only load when their matching `NEXT_PUBLIC_*` values are set.
- PostHog only initializes when both `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` are set.
- `NEXT_PUBLIC_POSTHOG_HOST` should match your PostHog project region. Use `https://us.i.posthog.com` for US projects or `https://eu.i.posthog.com` for EU projects unless you are self-hosting.
- `NEXT_PUBLIC_POSTHOG_PROXY_PATH` is optional. If you leave it empty, the app now defaults to `/ingest/pulse-telemetry` so PostHog traffic stays on the same origin. Set it explicitly if you want a different non-obvious path.
- Form notifications only fire when a Discord or Slack webhook is configured.
- If the Sanity environment values are not set, the site falls back to the seeded local content in `src/lib/site-content.ts`.

## Analytics

Analytics is wired through `src/lib/analytics.ts` and the route tracker in `src/components/analytics/route-analytics-tracker.tsx`.

Implementation notes:

- GA4 and Plausible are optional and only initialize when their env vars are set.
- PostHog uses the official `posthog-js` SDK and only initializes when both `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` are present.
- The PostHog SDK uses a same-origin proxy path as `api_host`, and Next.js rewrites it to the configured regional PostHog host. By default that path is `/ingest/pulse-telemetry`, or you can override it with `NEXT_PUBLIC_POSTHOG_PROXY_PATH`.
- Route-level page views are tracked on client-side navigation so the funnel stays visible across the App Router.
- Payloads are sanitized before dispatch: obvious PII keys are dropped and string values are trimmed.
- Form analytics track lifecycle state only. No form field contents are sent to analytics providers.
- Event capture stays isolated in `src/lib/analytics.ts`, while provider bootstrapping lives in `src/components/analytics/analytics-provider.tsx` and `src/components/analytics/posthog-analytics-provider.tsx`.

Optional PostHog proxy example:

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_your_project_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
NEXT_PUBLIC_POSTHOG_PROXY_PATH=/ingest/pulse-telemetry
```

With that configuration, the browser sends PostHog requests to `https://your-domain.com/ingest/pulse-telemetry/...`, and Next.js forwards them to the regional PostHog ingestion host. If you leave `NEXT_PUBLIC_POSTHOG_PROXY_PATH` empty, the app still uses `/ingest/pulse-telemetry` by default.

PostHog setup steps:

1. In PostHog, copy the project API key and confirm whether your project is in the US or EU region.
2. Add the env vars:
   `NEXT_PUBLIC_POSTHOG_KEY=phc_your_project_key`
   `NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com` or `https://eu.i.posthog.com`
3. Optionally add `NEXT_PUBLIC_POSTHOG_PROXY_PATH=/ingest/pulse-telemetry` if you want to override the default path with a specific same-origin proxy route.
4. Restart the Next.js app after changing env values.
5. Open the site locally, navigate across a few pages, click a hero CTA, open a project, and start the contact form.
6. In PostHog, verify incoming events in the Live Events or Activity feed using the documented event names below.
7. If no events appear, confirm the env vars are present in the running process, verify the region host is correct, and check the browser network panel for blocked requests.

Core funnel and engagement events:

- `page_view`: Fired on first load and route changes. Props: `page`, `page_type`, `title`.
- `hero_cta_click`: Fired from the homepage hero CTAs. Props: `page`, `section`, `cta_label`, `destination`.
- `project_card_click`: Fired when a user enters a case study from a project card. Props: `section`, `slug`, `interaction_target`, optional `cta_label`.
- `project_page_cta_click`: Fired on project detail CTAs. Props: `page`, `section`, `slug`, `cta_label`.
- `contact_form_started`: Fired once when the contact form receives first focus. Props: `page`, `section`.
- `contact_form_submit_success`: Fired after a successful form submission. Props: `page`, `section`.
- `contact_form_submit_failed`: Fired after a failed submission. Props: `page`, `section`, `failure_type`, optional `error_count`.
- `work_filter_used`: Optional Work-page engagement event. Props: `page`, `section`, `filter_name`, `filter_value`.
- `outbound_link_click`: Optional outbound contact/social event. Props: `page`, `section`, `link_label`, `link_type`.

Additional supporting events already in use:

- `cta_click`
- `nav_click`
- `nav_logo_click`
- `work_filter_reset`
- `project_scroll_depth`

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

## Vercel Deployment

This app is now configured to deploy cleanly on Vercel as a standard Next.js project.

Files and behavior:

- `vercel.json` pins the framework and the install/build/dev commands.
- `next.config.ts` keeps `output: "standalone"` for Docker and VPS builds, but disables it automatically on Vercel so the platform can use its normal Next.js build pipeline.
- `next.config.ts` pins `outputFileTracingRoot` to this app directory so Next.js does not trace from a higher-level workspace lockfile.
- `package.json` uses webpack for the default `dev` and `build` scripts because this repo layout triggers a Turbopack workspace-root resolution failure when another lockfile exists higher in the directory tree.

Recommended Vercel setup:

1. Import the repository into Vercel.
2. If this app lives inside a larger repository, set the Vercel Root Directory to this project folder.
3. Add the required environment variables from `.env.example`.
4. Set `SITE_URL` and `NEXT_PUBLIC_SITE_URL` to your final Vercel domain or custom domain.
5. Deploy.

Minimum production env vars:

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

Optional env vars stay the same as local setup:

- `SANITY_API_READ_TOKEN`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`
- `NEXT_PUBLIC_POSTHOG_PROXY_PATH`
- `DISCORD_WEBHOOK_URL`
- `SLACK_WEBHOOK_URL`
- `FORM_RATE_LIMIT_MAX`
- `FORM_RATE_LIMIT_WINDOW_MS`

Notes for Vercel:

- If Sanity env vars are missing, the public site falls back to seeded local content, but the Studio and CLI still require valid Sanity project settings.
- The contact route uses in-memory rate limiting. That is acceptable for a basic Vercel deployment, but it is per-instance and not durable across serverless invocations. If you need stricter global rate limiting, move that state to a shared store such as Upstash Redis.
- Re-add the same environment variables to Preview and Production environments if you want both to behave consistently.

## Docker

Production containerization is included for the Next.js app.

Files:

- `Dockerfile`: Multi-stage production build using Next.js standalone output
- `docker-compose.yml`: Runs the app in production mode with restart policy enabled
- `.dockerignore`: Keeps the build context lean and avoids copying local artifacts
- `deploy.sh`: Optional helper to `git pull`, rebuild, and restart the production stack

Build and run with Docker:

```bash
docker compose build
docker compose up -d
```

Rebuild after environment changes:

1. Update `.env` or the environment values you inject into the container.
2. Rebuild so build-time values such as `SITE_URL` and public analytics config are baked into the Next.js output:
   `docker compose up -d --build`
3. If you want to force a clean container restart as well:
   `docker compose down`
   `docker compose up -d --build`
4. Verify the new container is running:
   `docker compose ps`

For Sanity Studio env changes specifically, use a hard rebuild if the Studio still points at an old project or dataset:

```bash
docker compose down -v
docker compose build --no-cache
docker compose up
```

If the issue persists, clear cached Studio/Vite artifacts before rebuilding:

```bash
rm -rf .sanity node_modules/.sanity node_modules/.vite dist
```

Notes:

- The compose file passes `SITE_URL` into both the build stage and runtime environment so prerendered metadata and runtime URL helpers use the same canonical domain.
- The compose service binds the app to `127.0.0.1:3000` only, so it is reachable by the host but not exposed directly to the public internet.
- The container runs the compiled production server with `node server.js`; it does not use `next dev`.
- Add runtime environment variables in your deployment platform or by extending `docker-compose.yml` with an `env_file` or `environment` block for your deployment target.

## Nginx Reverse Proxy (Ubuntu VPS)

An example Nginx virtual host is included at `deploy/nginx/portfolio.conf`.

Key proxy requirements:

- Terminate HTTPS at Nginx and proxy traffic to the app on `127.0.0.1:3000`.
- Pass `Host`, `X-Forwarded-Proto`, `X-Forwarded-Host`, `X-Forwarded-Port`, and `X-Forwarded-For`.
- Redirect HTTP to HTTPS at the Nginx layer.
- Keep the app unpublished publicly; only Nginx should listen on public ports `80/443`.
- Keep `SITE_URL` set to the final public origin (for example `https://your-domain.com`) when building and running the container.

Built-in reverse-proxy protections in the sample config:

- Security headers at the Nginx layer (`Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`)
- `client_max_body_size 2m` to cap request size
- Optional `limit_req` rate limiting for `POST /api/contact`

Typical VPS flow:

1. Update `deploy/nginx/portfolio.conf` with your real domain and certificate paths.
2. Place it in `/etc/nginx/sites-available/` and symlink it into `/etc/nginx/sites-enabled/`.
3. Build and run the app with `SITE_URL=https://your-domain.com docker compose up -d --build`.
4. Reload Nginx with `sudo nginx -t && sudo systemctl reload nginx`.

Example `/etc/nginx/sites-available/your-domain.com`:

```nginx
map $http_upgrade $connection_upgrade {
  default upgrade;
  '' close;
}

limit_req_zone $binary_remote_addr zone=contact_rate:10m rate=10r/m;

upstream next_app {
  server 127.0.0.1:3000;
  keepalive 32;
}

server {
  listen 80;
  listen [::]:80;
  server_name your-domain.com www.your-domain.com;

  return 301 https://your-domain.com$request_uri;
}

server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name your-domain.com www.your-domain.com;

  ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
  ssl_session_timeout 1d;
  ssl_session_cache shared:TLSCache:10m;
  ssl_session_tickets off;
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_prefer_server_ciphers off;

  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
  add_header X-Frame-Options "SAMEORIGIN" always;
  add_header X-Content-Type-Options "nosniff" always;
  add_header Referrer-Policy "strict-origin-when-cross-origin" always;
  add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

  client_max_body_size 2m;

  location = /api/contact {
    limit_req zone=contact_rate burst=10 nodelay;
    proxy_pass http://next_app;
    proxy_http_version 1.1;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Forwarded-Port $server_port;

    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;

    proxy_read_timeout 60s;
    proxy_send_timeout 60s;
    proxy_connect_timeout 60s;
  }

  location / {
    proxy_pass http://next_app;
    proxy_http_version 1.1;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Forwarded-Port $server_port;

    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;

    proxy_read_timeout 60s;
    proxy_send_timeout 60s;
    proxy_connect_timeout 60s;
  }
}
```

### UFW + Certbot

Typical Ubuntu host hardening flow:

1. Install packages:
   `sudo apt update && sudo apt install -y nginx ufw certbot python3-certbot-nginx`
2. Allow only SSH and public web traffic:
   `sudo ufw allow OpenSSH`
   `sudo ufw allow 'Nginx Full'`
3. Do not open port `3000` in UFW. The app binds to `127.0.0.1:3000` only.
4. Enable the firewall:
   `sudo ufw enable`
5. After the Nginx site config is in place, request certificates:
   `sudo certbot --nginx -d your-domain.com -d www.your-domain.com`
6. Verify renewal:
   `sudo certbot renew --dry-run`

## Production Deployment (Ubuntu VPS)

Exact example commands for a clean Ubuntu VPS setup:

1. Install Docker, Compose plugin, Nginx, UFW, and Certbot:

```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg nginx ufw certbot python3-certbot-nginx
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo \"$VERSION_CODENAME\") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker
sudo systemctl enable --now nginx
```

2. Allow only SSH and public web traffic through UFW:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

3. Clone the project and prepare environment variables:

```bash
git clone <your-repo-url> portfolio
cd portfolio
cp .env.example .env
```

4. Edit `.env` and set at minimum:

```bash
SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

5. Build and start the app bound to localhost only:

```bash
SITE_URL=https://your-domain.com docker compose up -d --build
docker compose ps
```

6. Install the Nginx site:

```bash
sudo cp deploy/nginx/portfolio.conf /etc/nginx/sites-available/your-domain.com
sudo nano /etc/nginx/sites-available/your-domain.com
sudo ln -s /etc/nginx/sites-available/your-domain.com /etc/nginx/sites-enabled/your-domain.com
sudo nginx -t
sudo systemctl reload nginx
```

7. Request and install Let’s Encrypt certificates:

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

8. Verify automatic renewal:

```bash
sudo systemctl status certbot.timer
sudo certbot renew --dry-run
```

9. Optional redeploy helper for future updates:

```bash
chmod +x deploy.sh
./deploy.sh
```

Cookie note:

- The current app does not rely on auth cookies.
- If you add cookies later, mark them `Secure` in production and keep forwarding `X-Forwarded-Proto https` from Nginx so HTTPS-aware cookie logic behaves correctly behind TLS termination.

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

### Create a Sanity Project and Dataset

1. Create a Sanity account at `https://www.sanity.io/` if you do not already have one.
2. From the Sanity dashboard, create a new project and copy the project ID.
3. Create or confirm the dataset you want to use, typically `production` for live content and optionally a separate staging dataset later.
4. Use that same project ID and dataset in both the frontend and Studio env variables:
   `NEXT_PUBLIC_SANITY_PROJECT_ID`
   `NEXT_PUBLIC_SANITY_DATASET`
   `SANITY_STUDIO_PROJECT_ID`
   `SANITY_STUDIO_DATASET`

### Configure Next.js and Sanity Studio Env Vars

Set these values in `.env.local` for local development:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-03
SANITY_API_READ_TOKEN=
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_TITLE=Game Studio Portfolio CMS
```

Keep `NEXT_PUBLIC_SANITY_*` and `SANITY_STUDIO_*` aligned so the app, Studio, and CLI all point at the same content source.

### Run Sanity Studio Locally

1. Install dependencies:
   `npm install`
2. Confirm the Sanity env values above are present in `.env.local`.
3. Start the Studio:
   `npm run sanity:dev`
4. Open the local Studio URL shown in the terminal and sign in to Sanity.

### Connect the Next.js App to Sanity

1. Start the frontend:
   `npm run dev`
2. Confirm the Sanity env vars are present in the same environment where the Next.js app is running.
3. Open `http://localhost:3000` and publish or update content in Sanity Studio.
4. Refresh the frontend and verify the updated content appears.
5. If Sanity env vars are missing, the site will fall back to the local seeded content in `src/lib/site-content.ts`.

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

Sanity implementation details:

- The app uses the official `next-sanity` toolkit for client creation and GROQ queries.
- Shared client utility: `src/sanity/lib/client.ts`
- Shared image URL builder utility: `src/sanity/lib/image.ts`
- Shared GROQ queries: `src/sanity/lib/queries.ts`
- Shared environment resolver: `src/sanity/env.ts`

The project and dataset are not hardcoded. The app can fall back to local seeded content when Sanity is not configured, but the Studio and CLI intentionally throw a clear configuration error until the required environment variables are set.

## Image Content Guidelines

Use high-quality source assets so the image pipeline can preserve a premium look without shipping oversized files.

Recommended dimensions by slot:

- Hero background / hero cover: `2400x1350` or larger (`16:9`)
- Project cover thumbnail: `1600x900` to `2400x1350` (`16:9`)
- Service image: `1200x900` (`4:3`) or `1600x900` (`16:9`)
- Project gallery images: `1600` to `2400` px on the long edge
- Portraits (team / testimonial): `1200x1500` or `1080x1350`
- Social share image: `1200x630`

Format and size guidance:

- Prefer `JPG` or `WEBP` for photos, renders, and screenshots.
- Use `PNG` only when transparency is required.
- Use `SVG` for logos, icons, and lightweight decorative vector assets.
- Keep most uploaded raster assets under `500 KB` to `900 KB` when possible.
- Keep hero images under roughly `1.2 MB` unless there is a strong visual reason to exceed it.

Art-direction guidance:

- Use landscape images for hero, project cover, UI walkthroughs, and environment scenes.
- Use portrait images only when the subject is vertically composed, such as a person, character, or vertical product crop.
- Use proof images when the asset demonstrates real work: gameplay, interface, branded scenes, systems, or results.
- Use decorative images only for atmosphere or section texture. They should never carry critical information.
- Set the Sanity hotspot on the part of the image that must survive responsive crops, such as a face, UI panel, or key branded focal point.

Optimization expectations:

- The frontend renders Sanity-hosted images through the Sanity image pipeline plus Next.js `<Image>`.
- Images are transformed to layout-appropriate widths before delivery and further optimized by Next.js.
- Above-the-fold hero media is prioritized only when a real hero asset is present.
- Non-critical media is lazy-loaded by default.
- Avoid uploading tiny source assets for large slots; `fit=max` is used to avoid upscaling, so undersized images will stay soft.

## Staging and Production

Recommended deployment flow:

1. Configure preview or staging environment variables first.
2. Point staging to a staging dataset in Sanity if you want test content separated from live content.
3. Run `npm run build` against that environment and verify preview behavior.
4. Promote the matching production variables, including the correct `SITE_URL` and `NEXT_PUBLIC_SITE_URL`.

Deployment notes:

- Optimized for Vercel-style deployment out of the box
- `npm run build` passes and statically generates all content pages except the form endpoint
- Set `SITE_URL` in production before building so canonicals, sitemap, robots, and OG URLs resolve correctly
- Keep `NEXT_PUBLIC_SITE_URL` aligned with `SITE_URL` for consistency in public runtime configuration
- Add the same Sanity environment variables to preview and production if both environments should read the CMS
- If you need durable form storage, wire the validated payload in `src/app/api/contact/route.ts` to your CRM or database

## Launch Checklist

Before launch:

- Set `SITE_URL` to the live domain before building the production image so prerendered metadata, canonicals, and share URLs use the correct origin.
- Set `NEXT_PUBLIC_SITE_URL` to the live domain so canonicals, Open Graph URLs, Twitter images, robots, and sitemap stop using the fallback `https://example.com`.
- Configure the Sanity environment variables for the intended dataset and confirm production content has replaced the seeded placeholders.
- Verify the primary contact email, social links, and CTA destinations in Site Settings.
- Configure at least one form notification channel (`DISCORD_WEBHOOK_URL` or `SLACK_WEBHOOK_URL`) or add durable storage in `src/app/api/contact/route.ts`.
- Set the analytics provider keys you actually want to use (`NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`).
- Confirm `robots.txt` and `sitemap.xml` resolve on the live domain after deployment.
- Check the generated share assets (`/opengraph-image`, `/twitter-image`, `/icon`, `/apple-icon`) on the deployed site.
- Replace placeholder project SEO titles, descriptions, metrics, client names, and testimonials before sending links to clients.
- Run a final manual browser pass on desktop and mobile against the deployed domain for layout, motion, and form UX.
