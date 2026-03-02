import { ImageResponse } from "next/og";

export const shareImageSize = {
  width: 1200,
  height: 630,
};

type ShareImageOptions = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function buildShareImage({
  eyebrow = "Maykell Interactive",
  title,
  description,
}: ShareImageOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          padding: "56px",
          backgroundColor: "#090A0D",
          backgroundImage:
            "radial-gradient(circle at top right, rgba(76,201,255,0.28), transparent 30%), radial-gradient(circle at bottom left, rgba(139,92,246,0.18), transparent 26%)",
          color: "#F4F6FB",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            borderRadius: 42,
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(17,19,26,0.82)",
            padding: "48px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 64,
                height: 64,
                borderRadius: 24,
                background: "rgba(76,201,255,0.14)",
                color: "#4CC9FF",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              MI
            </div>
            <div style={{ fontSize: 20, letterSpacing: "0.24em", textTransform: "uppercase" }}>
              {eyebrow}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.02, maxWidth: 900 }}>
              {title}
            </div>
            <div style={{ fontSize: 28, color: "#C8CFDA", maxWidth: 820 }}>
              {description}
            </div>
          </div>
        </div>
      </div>
    ),
    shareImageSize,
  );
}
