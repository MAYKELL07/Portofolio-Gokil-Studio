import { createImageUrlBuilder } from "@sanity/image-url";

import { sanityClient } from "@/sanity/lib/client";

export type SanityImageSource =
  | {
      asset?: unknown;
      [key: string]: unknown;
    }
  | null
  | undefined;

type SanityImageFormat = "jpg" | "png" | "webp";

export type SanityImageTransformOptions = {
  width?: number;
  height?: number;
  quality?: number;
  format?: SanityImageFormat;
  fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "min" | "scale";
};

let cachedImageBuilder: ReturnType<typeof createImageUrlBuilder> | null | undefined;

function getImageBuilder() {
  if (cachedImageBuilder !== undefined) {
    return cachedImageBuilder;
  }

  cachedImageBuilder = sanityClient ? createImageUrlBuilder(sanityClient) : null;
  return cachedImageBuilder;
}

export function urlForImage(source: SanityImageSource) {
  if (!source) {
    return null;
  }

  try {
    return getImageBuilder()?.image(source) ?? null;
  } catch {
    return null;
  }
}

export function resolveSanityImageUrl(
  source: SanityImageSource,
  options?: SanityImageTransformOptions,
) {
  const image = urlForImage(source);

  if (!image) {
    return "";
  }

  const sanitizedWidth =
    typeof options?.width === "number" && Number.isFinite(options.width) && options.width > 0
      ? Math.round(options.width)
      : undefined;
  const sanitizedHeight =
    typeof options?.height === "number" && Number.isFinite(options.height) && options.height > 0
      ? Math.round(options.height)
      : undefined;
  const sanitizedQuality =
    typeof options?.quality === "number" && Number.isFinite(options.quality)
      ? Math.min(100, Math.max(20, Math.round(options.quality)))
      : undefined;

  let builder = image;

  if (sanitizedWidth) {
    builder = builder.width(sanitizedWidth);
  }

  if (sanitizedHeight) {
    builder = builder.height(sanitizedHeight);
  }

  if (sanitizedWidth || sanitizedHeight) {
    builder = builder.fit(options?.fit ?? "max");
  }

  if (sanitizedQuality) {
    builder = builder.quality(sanitizedQuality);
  }

  builder = options?.format ? builder.format(options.format) : builder.auto("format");

  return builder.url();
}
