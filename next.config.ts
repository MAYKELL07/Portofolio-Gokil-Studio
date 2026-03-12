import path from "node:path";
import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

const isVercel = process.env.VERCEL === "1";
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

function normalizePostHogProxyPath(path?: string) {
  const trimmed = path?.trim();

  if (!trimmed) {
    return null;
  }

  return `/${trimmed.replace(/^\/+|\/+$/g, "")}`;
}

function normalizeExternalHost(host?: string) {
  const trimmed = host?.trim();

  if (!trimmed) {
    return null;
  }

  return trimmed.replace(/\/+$/g, "");
}

const DEFAULT_POSTHOG_PROXY_PATH = "/ingest/pulse-telemetry";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim();
const posthogHost = normalizeExternalHost(process.env.NEXT_PUBLIC_POSTHOG_HOST);
const posthogProxyPath =
  normalizePostHogProxyPath(process.env.NEXT_PUBLIC_POSTHOG_PROXY_PATH) ??
  (posthogKey && posthogHost ? DEFAULT_POSTHOG_PROXY_PATH : null);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: isVercel ? undefined : "standalone",
  outputFileTracingRoot: projectRoot,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [58, 64, 68, 70, 72, 75],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async rewrites() {
    if (!posthogHost || !posthogProxyPath) {
      return [];
    }

    return [
      {
        source: `${posthogProxyPath}`,
        destination: `${posthogHost}`,
      },
      {
        source: `${posthogProxyPath}/:path*`,
        destination: `${posthogHost}/:path*`,
      },
    ];
  },
};

export default nextConfig;
