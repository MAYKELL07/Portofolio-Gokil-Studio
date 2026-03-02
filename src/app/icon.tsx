import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          borderRadius: 120,
          background:
            "radial-gradient(circle at top right, rgba(76,201,255,0.24), transparent 34%), linear-gradient(160deg, #11131A, #090A0D)",
          border: "16px solid rgba(255,255,255,0.08)",
          color: "#F4F6FB",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 220,
            height: 220,
            borderRadius: 72,
            background: "rgba(76,201,255,0.12)",
            color: "#4CC9FF",
            fontSize: 116,
            fontWeight: 700,
            letterSpacing: "-0.06em",
          }}
        >
          MI
        </div>
      </div>
    ),
    size,
  );
}
