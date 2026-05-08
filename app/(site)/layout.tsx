import { WebVitalsReporter } from "../components/WebVitalsReporter";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        defer
        src="/_/u.js"
        data-website-id="7ebd4549-885e-4c27-82c4-b3ba906b34bb"
        data-host-url="/_/u"
      ></script>
      <WebVitalsReporter />
      {children}
    </>
  );
}
