FROM node:20-alpine AS base

RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps

COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder

ARG SITE_URL=https://example.com
ENV SITE_URL=$SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$SITE_URL

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner

RUN apk add --no-cache libc6-compat
WORKDIR /app

ARG SITE_URL=https://example.com
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1
ENV SITE_URL=$SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$SITE_URL

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
