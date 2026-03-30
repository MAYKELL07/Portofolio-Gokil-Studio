import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

function truncateWords(text: string, maxWords: number) {
  const words = text.split(/\s+/).filter(Boolean);

  if (words.length <= maxWords) {
    return text;
  }

  return `${words.slice(0, maxWords).join(" ").replace(/[.,;:!?-]+$/, "")}...`;
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function getMobileSummary(text: string, maxWords = 18) {
  const normalized = text.replace(/\s+/g, " ").trim();

  if (!normalized) {
    return "";
  }

  const sentences = normalized
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  const firstSentence = sentences[0] || normalized;
  const secondSentence = sentences[1];

  if (!secondSentence) {
    return truncateWords(firstSentence, maxWords);
  }

  const firstSentenceWordCount = firstSentence.split(/\s+/).filter(Boolean).length;
  const combined = `${firstSentence} ${secondSentence}`;

  if (firstSentenceWordCount <= Math.floor(maxWords * 0.6)) {
    return truncateWords(combined, maxWords);
  }

  return truncateWords(firstSentence, maxWords);
}

export function getProjectPreviewImage(project: {
  galleryMedia?: Array<{ imageUrl?: string; posterUrl?: string }>;
  coverImageUrl?: string;
}) {
  return (
    project.galleryMedia?.[0]?.imageUrl ||
    project.galleryMedia?.[0]?.posterUrl ||
    project.coverImageUrl ||
    undefined
  );
}

export function createAbsoluteUrl(path = "/") {
  const baseUrl =
    process.env.SITE_URL?.replace(/\/$/, "") ??
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://example.com";

  return new URL(path, `${baseUrl}/`).toString();
}
