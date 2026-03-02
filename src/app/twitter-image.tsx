import { buildShareImage, shareImageSize } from "@/lib/share-image";

export const alt = "Maykell Interactive social preview";
export const size = shareImageSize;
export const contentType = "image/png";

export default function TwitterImage() {
  return buildShareImage({
    title: "Premium Roblox production, presented like a real partner.",
    description:
      "Case studies, delivery proof, and direct project intake built for buyers evaluating game studio execution.",
  });
}
