"use client";

import dynamic from "next/dynamic";

const StudioInner = dynamic(() => import("./StudioInner"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
        background: "#0a0e10",
        color: "#9aa8af",
        fontFamily: "system-ui, sans-serif",
        fontSize: 14,
      }}
    >
      Loading Studio…
    </div>
  ),
});

export function Studio() {
  return <StudioInner />;
}
