import { buildShareImage, shareImageSize } from "@/lib/share-image";

export const alt = "Maykell Interactive social preview";
export const size = shareImageSize;
export const contentType = "image/png";

export default function TwitterImage() {
  return buildShareImage({
    title: "Roblox co-development support for teams that need work shipped.",
    description:
      "Case studies, delivery proof, and direct inquiry flow for clients hiring Roblox build, feature, and live support.",
  });
}
