import { Suspense } from "react";
import Script from "next/script";

import { PostHogAnalyticsProvider } from "@/components/analytics/posthog-analytics-provider";
import { RouteAnalyticsTracker } from "@/components/analytics/route-analytics-tracker";

export function AnalyticsProvider() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim();
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim();
  const hasPostHog = Boolean(posthogKey && posthogHost);
  const hasAnalytics = Boolean(gaId || plausibleDomain || hasPostHog);

  return (
    <>
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                send_page_view: false,
                anonymize_ip: true,
                allow_google_signals: false,
                allow_ad_personalization_signals: false
              });
            `}
          </Script>
        </>
      ) : null}
      {plausibleDomain ? (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      ) : null}
      <PostHogAnalyticsProvider>
        {hasAnalytics ? (
          <Suspense fallback={null}>
            <RouteAnalyticsTracker />
          </Suspense>
        ) : null}
      </PostHogAnalyticsProvider>
    </>
  );
}
