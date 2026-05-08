import { ImageResponse } from "next/og";

export const alt = "Vellapps — Apps, made on the side.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TILES = ["V", "E", "L", "L", "A", "P", "P", "S"];

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0e10",
          backgroundImage: [
            "radial-gradient(circle at 50% 0%, rgba(0,173,181,0.28), transparent 55%)",
            "linear-gradient(rgba(31,42,48,0.55) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(31,42,48,0.55) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "100% 100%, 64px 64px, 64px 64px",
          color: "#e6edf0",
          fontFamily: "sans-serif",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", gap: 14 }}>
          {TILES.slice(0, 4).map((c, i) => (
            <Tile key={`a-${i}`}>{c}</Tile>
          ))}
        </div>
        <div style={{ display: "flex", gap: 14, marginTop: 14 }}>
          {TILES.slice(4).map((c, i) => (
            <Tile key={`b-${i}`}>{c}</Tile>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 64,
            fontSize: 56,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "#e6edf0",
            textAlign: "center",
          }}
        >
          Apps,{" "}
          <span style={{ color: "#00ADB5", marginLeft: 14 }}>made on the side.</span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontSize: 24,
            color: "#9aa8af",
            letterSpacing: "0.02em",
          }}
        >
          Vincent Vella · vellapps.com
        </div>
      </div>
    ),
    { ...size },
  );
}

function Tile({ children }: { children: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 110,
        height: 110,
        borderRadius: 22,
        background: "#00ADB5",
        color: "#0a0e10",
        fontSize: 72,
        fontWeight: 800,
        boxShadow: "0 12px 40px rgba(0,173,181,0.35)",
      }}
    >
      {children}
    </div>
  );
}
