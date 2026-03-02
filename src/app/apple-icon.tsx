import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          borderRadius: 42,
          background:
            "radial-gradient(circle at top right, rgba(76,201,255,0.24), transparent 34%), linear-gradient(160deg, #11131A, #090A0D)",
          color: "#4CC9FF",
          fontFamily: "sans-serif",
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: "-0.06em",
        }}
      >
        MI
      </div>
    ),
    size,
  );
}
