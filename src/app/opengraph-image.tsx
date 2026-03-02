import { buildShareImage, shareImageSize } from "@/lib/share-image";

export const alt = "Maykell Interactive";
export const size = shareImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return buildShareImage({
    title: "Roblox experiences built for retention and real-world delivery.",
    description:
      "Premium, conversion-first portfolio for client work, branded worlds, and scalable Roblox production.",
  });
}
