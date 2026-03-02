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

- `SITE_URL` is the canonical server-side base URL and should always be set in staging and production.
- `NEXT_PUBLIC_SITE_URL` should match `SITE_URL` for consistency across any client-exposed runtime needs.
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
- `deploy.sh`: Optional helper to `git pull`, rebuild, and restart the production stack

Build and run with Docker:

```bash
docker compose build
docker compose up -d
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
