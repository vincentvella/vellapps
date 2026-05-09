import { ImageResponse } from "next/og";

export const alt = "Vellapps — Apps, made on the side.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TILE_ROWS: ReadonlyArray<ReadonlyArray<{ char: string; rotate: number }>> = [
  [
    { char: "V", rotate: -1.5 },
    { char: "E", rotate: 1 },
    { char: "L", rotate: -0.5 },
    { char: "L", rotate: 2 },
  ],
  [
    { char: "A", rotate: -1 },
    { char: "P", rotate: 1.5 },
    { char: "P", rotate: -2 },
    { char: "S", rotate: 0.5 },
  ],
];

async function loadGoogleFont(family: string, weight: number): Promise<ArrayBuffer | null> {
  // Satori only accepts TTF / OTF / WOFF — *not* WOFF2. Use an older Safari
  // UA so Google's CSS API serves the WOFF variant.
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10) AppleWebKit/537.36 (KHTML, like Gecko) Version/8.0 Safari/537.85.10",
      },
    },
  ).then((r) => r.text());
  // Google segments the response per Unicode range (cyrillic, latin-ext,
  // latin). The latin block is last. Match WOFF specifically.
  const matches = [
    ...css.matchAll(/src:\s*url\(([^)]+)\)\s*format\('woff'\)/g),
  ];
  const url = matches[matches.length - 1]?.[1];
  if (!url) return null;
  return await fetch(url).then((r) => r.arrayBuffer());
}

export default async function OG() {
  const [geistBlack, geistSemibold] = await Promise.all([
    loadGoogleFont("Geist", 900),
    loadGoogleFont("Geist", 600),
  ]);

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
          fontFamily: "Geist",
          padding: 80,
        }}
      >
        {TILE_ROWS.map((row, r) => (
          <div
            key={r}
            style={{
              display: "flex",
              gap: 18,
              marginTop: r === 0 ? 0 : 18,
            }}
          >
            {row.map((t, i) => (
              <Tile key={`${r}-${i}`} rotate={t.rotate}>
                {t.char}
              </Tile>
            ))}
          </div>
        ))}

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
    {
      ...size,
      fonts: [
        ...(geistBlack
          ? [{ name: "Geist", data: geistBlack, weight: 900 as const, style: "normal" as const }]
          : []),
        ...(geistSemibold
          ? [{ name: "Geist", data: geistSemibold, weight: 600 as const, style: "normal" as const }]
          : []),
      ],
    },
  );
}

function Tile({ children, rotate }: { children: string; rotate: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 130,
        height: 130,
        borderRadius: 26,
        background:
          "linear-gradient(170deg, #1ABBC2 0%, #00ADB5 55%, #009BA2 100%)",
        color: "#0a0e10",
        fontFamily: "Geist",
        fontSize: 88,
        fontWeight: 900,
        letterSpacing: "-0.02em",
        transform: `rotate(${rotate}deg)`,
        boxShadow: [
          "inset 0 1px 0 0 rgba(255,255,255,0.24)",
          "inset 0 -1px 0 0 rgba(0,0,0,0.18)",
          "0 14px 36px -10px rgba(0,173,181,0.45)",
        ].join(", "),
      }}
    >
      {children}
    </div>
  );
}
