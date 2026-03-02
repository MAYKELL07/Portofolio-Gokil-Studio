import type { MetadataRoute } from "next";

import { createAbsoluteUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: createAbsoluteUrl("/sitemap.xml"),
    host: createAbsoluteUrl(),
  };
}
