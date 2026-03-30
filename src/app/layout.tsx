import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Mono, Manrope, Sora } from "next/font/google";

import "./globals.css";

import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { buildMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/site-content";
import { createAbsoluteUrl } from "@/lib/utils";

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(createAbsoluteUrl()),
  ...buildMetadata({
    title: "Maykell Interactive | Roblox Co-Development Partner",
    description:
      "Roblox co-development and outsourcing partner for game builds, feature work, live updates, and production support.",
  }),
  category: "technology",
  applicationName: "Maykell Interactive",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/icon", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
    shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
  appleWebApp: {
    capable: true,
    title: "Maykell Interactive",
    statusBarStyle: "black-translucent",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${manrope.variable} ${plexMono.variable} bg-[var(--color-ink-950)] font-sans text-[var(--color-fog-100)] antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <AnalyticsProvider />
        <SiteHeader
          studioName={settings.studioName}
          navLinks={settings.navLinks}
          responseSla={settings.responseSla}
        />
        <main id="main-content" className="relative z-10 pt-24 pb-28 md:pb-0" tabIndex={-1}>
          {children}
        </main>
        <MobileCtaBar responseSla={settings.responseSla} />
        <SiteFooter
          studioName={settings.studioName}
          email={settings.primaryEmail}
          socials={settings.socials}
        />
      </body>
    </html>
  );
}
