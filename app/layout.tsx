import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vellapps.com"),
  title: {
    default: "Vellapps — Custom Web & Mobile App Development by Vince Vella",
    template: "%s · Vellapps",
  },
  description:
    "Custom websites and iPhone / Android apps, built by hand by Vince Vella. Site rescues, redesigns, take-overs from previous developers, and small fixes. Free 30-minute intro call, fixed-price quotes, no retainers.",
  applicationName: "Vellapps",
  authors: [{ name: "Vincent Vella", url: "https://www.vincevella.com" }],
  creator: "Vincent Vella",
  publisher: "Vellapps LLC",
  category: "technology",
  keywords: [
    "freelance web developer",
    "freelance app developer",
    "custom website development",
    "React Native developer",
    "Next.js developer",
    "Expo developer",
    "iPhone app developer",
    "Android app developer",
    "mobile app development",
    "WordPress migration",
    "site rescue",
    "small business website",
    "fractional engineer",
    "MVP development",
    "Vince Vella",
    "Vellapps",
  ],
  openGraph: {
    title: "Vellapps — Custom Web & Mobile App Development",
    description:
      "Custom websites, iPhone and Android apps, redesigns, and rescue work — built by Vince Vella. Free 30-minute intro call, fixed-price quotes, no retainers.",
    url: "https://vellapps.com",
    siteName: "Vellapps",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vellapps — Custom Web & Mobile App Development",
    description:
      "Custom websites, iPhone and Android apps, and rescue work for folks who need a real developer.",
    creator: "@vellapps",
    site: "@vellapps",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://vellapps.com",
    types: { "application/json+ld": "https://vellapps.com" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="darkreader-lock" />
      </head>
      <body className="min-h-full bg-bg text-text" suppressHydrationWarning>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
