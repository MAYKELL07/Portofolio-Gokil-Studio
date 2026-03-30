import Image from "next/image";
import { Image as ImageIcon, Play } from "lucide-react";
import clsx from "clsx";
import type { ReactNode } from "react";

import { MediaReveal } from "@/components/animation/media-reveal";

type MediaRatio = "landscape" | "standard" | "square" | "portrait" | "free";

const ratioClasses: Record<MediaRatio, string> = {
  landscape: "aspect-[16/9]",
  standard: "aspect-[4/3]",
  square: "aspect-square",
  portrait: "aspect-[9/16]",
  free: "",
};

const MEDIA_BLUR_DATA_URL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#2a170f"/>
        <stop offset="50%" stop-color="#120908"/>
        <stop offset="100%" stop-color="#3b2416"/>
      </linearGradient>
    </defs>
    <rect width="64" height="64" fill="url(#g)"/>
  </svg>`,
)}`;


type MediaSurfaceProps = {
  src?: string;
  alt?: string;
  ratio?: MediaRatio;
  sizes: string;
  quality?: number;
  className?: string;
  priority?: boolean;
  decorative?: boolean;
  interactive?: boolean;
  overlayClassName?: string;
  imageClassName?: string;
  children?: ReactNode;
};

function MediaSurface({
  src,
  alt,
  ratio = "standard",
  sizes,
  quality = 72,
  className,
  priority = false,
  decorative = false,
  interactive = false,
  overlayClassName,
  imageClassName,
  children,
}: MediaSurfaceProps) {
  const resolvedSrc = src || "/placeholders/studio-signal-texture.svg";
  const canUseBlur =
    Boolean(src) && typeof resolvedSrc === "string" && !resolvedSrc.toLowerCase().endsWith(".svg");
  const usePriority = priority && Boolean(src);

  return (
    <MediaReveal className="media-reveal">
      <div
        aria-hidden={decorative || undefined}
        className={clsx(
          "media-surface",
          ratioClasses[ratio],
          interactive && "media-surface-interactive",
          className,
        )}
      >
        <Image
          src={resolvedSrc}
          alt={decorative ? "" : alt || ""}
          fill
          priority={usePriority}
          sizes={sizes}
          quality={quality}
          placeholder={canUseBlur ? "blur" : "empty"}
          blurDataURL={canUseBlur ? MEDIA_BLUR_DATA_URL : undefined}
          loading={usePriority ? "eager" : "lazy"}
          unoptimized={
            typeof resolvedSrc === "string" && resolvedSrc.toLowerCase().endsWith(".svg")
          }
          className={clsx("media-surface-image", imageClassName)}
        />
        <div
          className={clsx(
            "media-surface-overlay",
            "bg-[linear-gradient(180deg,rgba(17,19,21,0.08),rgba(17,19,21,0.62))]",
            overlayClassName,
          )}
        />
        {children ? <div className="media-surface-content">{children}</div> : null}
      </div>
    </MediaReveal>
  );
}

export function HeroMedia({
  src,
  alt,
  className,
  priority = false,
}: {
  src?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
}) {
  const resolvedSrc = src || "/placeholders/studio-signal-texture.svg";
  const canUseBlur =
    Boolean(src) && typeof resolvedSrc === "string" && !resolvedSrc.toLowerCase().endsWith(".svg");
  const usePriority = priority && Boolean(src);

  return (
    <div className={clsx("pointer-events-none absolute inset-0", className)}>
      <Image
        src={resolvedSrc}
        alt={alt || ""}
        fill
        priority={usePriority}
        sizes="(max-width: 1023px) 100vw, 42vw"
        quality={72}
        placeholder={canUseBlur ? "blur" : "empty"}
        blurDataURL={canUseBlur ? MEDIA_BLUR_DATA_URL : undefined}
        loading={usePriority ? "eager" : "lazy"}
        unoptimized={typeof resolvedSrc === "string" && resolvedSrc.toLowerCase().endsWith(".svg")}
        className="media-surface-image opacity-24"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,19,21,0.16),rgba(17,19,21,0.84))]" />
    </div>
  );
}

export function DecorativeBackgroundMedia({
  src,
  ratio = "landscape",
  className,
  sizes,
  quality,
  overlayClassName,
  imageClassName,
  children,
}: {
  src?: string;
  ratio?: MediaRatio;
  className?: string;
  sizes: string;
  quality?: number;
  overlayClassName?: string;
  imageClassName?: string;
  children?: ReactNode;
}) {
  return (
    <MediaSurface
      src={src}
      decorative
      ratio={ratio}
      sizes={sizes}
      quality={quality}
      className={className}
      overlayClassName={overlayClassName}
      imageClassName={imageClassName}
    >
      {children}
    </MediaSurface>
  );
}

export function ProjectCoverMedia({
  src,
  alt,
  ratio = "standard",
  sizes = "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw",
  quality = 72,
  className,
  interactive = true,
  overlayClassName,
  children,
}: {
  src?: string;
  alt?: string;
  ratio?: MediaRatio;
  sizes?: string;
  quality?: number;
  className?: string;
  interactive?: boolean;
  overlayClassName?: string;
  children?: ReactNode;
}) {
  return (
    <MediaSurface
      src={src}
      alt={alt}
      ratio={ratio}
      sizes={sizes}
      quality={quality}
      className={className}
      interactive={interactive}
      overlayClassName={overlayClassName ?? "bg-[linear-gradient(180deg,rgba(17,19,21,0.1),rgba(17,19,21,0.72))]"}
    >
      {children}
    </MediaSurface>
  );
}

export function GalleryMediaCard({
  src,
  alt,
  title,
  description,
  caption,
  type = "image",
  ratio = "standard",
  className,
  featured = false,
}: {
  src?: string;
  alt?: string;
  title: string;
  description: string;
  caption?: string;
  type?: "image" | "video";
  ratio?: MediaRatio;
  className?: string;
  featured?: boolean;
}) {
  const isVideo = type === "video";

  return (
    <article
      className={clsx(
        "interactive-card overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/[0.03]",
        featured && "md:shadow-[0_26px_70px_rgba(0,0,0,0.34)]",
        className,
      )}
    >
      <MediaSurface
        src={src}
        alt={alt}
        ratio={ratio}
        sizes="(max-width: 767px) 100vw, 50vw"
        quality={72}
        overlayClassName="bg-[linear-gradient(180deg,rgba(17,19,21,0.08),rgba(17,19,21,0.58))]"
        className="rounded-none border-x-0 border-t-0 border-b border-white/6"
      >
        <div className={clsx("flex items-end justify-between gap-3 p-4", featured && "p-5 md:p-6")}>
          <span
            className={clsx(
              "chip border-white/10 bg-[rgba(17,19,21,0.72)] text-xs text-white",
              featured && "px-4 py-2",
            )}
          >
            {featured ? (isVideo ? "Featured video" : "Featured image") : isVideo ? "Video" : "Image"}
          </span>
          <div
            className={clsx(
              "flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-black/18 text-white transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
              featured && "h-11 w-11",
            )}
          >
            {isVideo ? <Play className="h-4 w-4" /> : <ImageIcon className="h-4 w-4" />}
          </div>
        </div>
      </MediaSurface>
      <div className={clsx("p-5", featured && "p-6")}>
        <div className={clsx("font-semibold text-white", featured ? "text-base md:text-lg" : "text-sm")}>
          {title}
        </div>
        {caption ? (
          <div className="mt-2 text-xs uppercase tracking-[0.16em] text-[var(--color-fog-500)]">
            {caption}
          </div>
        ) : null}
        <div
          className={clsx(
            "mt-3 text-[var(--color-fog-300)]",
            featured ? "text-sm leading-7 md:text-base md:leading-8" : "text-sm leading-7",
          )}
        >
          {description}
        </div>
      </div>
    </article>
  );
}
