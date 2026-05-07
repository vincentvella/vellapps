import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#00ADB5",
          color: "#0a0e10",
          fontSize: 44,
          fontWeight: 800,
          borderRadius: 14,
          fontFamily: "sans-serif",
        }}
      >
        V
      </div>
    ),
    { ...size },
  );
}
