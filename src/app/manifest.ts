import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Maykell Interactive",
    short_name: "Maykell",
    description:
      "Premium Roblox game studio portfolio focused on conversion-first case studies and qualified lead generation.",
    start_url: "/",
    display: "standalone",
    background_color: "#090A0D",
    theme_color: "#090A0D",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
