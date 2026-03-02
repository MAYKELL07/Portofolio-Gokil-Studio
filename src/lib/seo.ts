import type { Metadata } from "next";

import { createAbsoluteUrl } from "@/lib/utils";

type MetadataArgs = {
  title: string;
  description: string;
  path?: string;
  imagePath?: string;
  twitterImagePath?: string;
  imageAlt?: string;
  openGraphType?: "website" | "article";
};

export function buildMetadata({
  title,
  description,
  path = "/",
  imagePath = "/opengraph-image",
  twitterImagePath = "/twitter-image",
  imageAlt = title,
  openGraphType = "website",
}: MetadataArgs): Metadata {
  const canonical = createAbsoluteUrl(path);
  const imageUrl = createAbsoluteUrl(imagePath);
  const twitterImageUrl = createAbsoluteUrl(twitterImagePath);

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Maykell Interactive",
      locale: "en_US",
      type: openGraphType,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: twitterImageUrl,
          alt: imageAlt,
        },
      ],
    },
  };
}
