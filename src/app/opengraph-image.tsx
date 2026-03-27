import { buildShareImage, shareImageSize } from "@/lib/share-image";

export const alt = "Maykell Interactive";
export const size = shareImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return buildShareImage({
    title: "Roblox build support for launches, features, systems, and live updates.",
    description:
      "Client-facing Roblox outsourcing and co-development partner for game teams, brands, and agencies.",
  });
}
