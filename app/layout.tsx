import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vellapps.com"),
  title: {
    default: "Vellapps — Apps, made on the side.",
    template: "%s · Vellapps",
  },
  description:
    "Vellapps is Vince Vella's side outfit. Custom web and mobile apps for a handful of folks at a time. React, React Native, Next.js, Expo — built by hand.",
  applicationName: "Vellapps",
  authors: [{ name: "Vincent Vella" }],
  keywords: [
    "freelance software engineer",
    "React Native consultant",
    "Next.js developer",
    "Expo developer",
    "fractional engineer",
    "MVP development",
    "technical advisor",
    "cross-platform mobile",
  ],
  openGraph: {
    title: "Vellapps — Apps, made on the side.",
    description:
      "Vince Vella's side outfit. Custom web and mobile apps, built by hand for a handful of folks at a time.",
    url: "https://vellapps.com",
    siteName: "Vellapps",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vellapps — Apps, made on the side.",
    description:
      "Vince Vella's side outfit. Custom web and mobile apps, built by hand.",
    creator: "@vellapps",
  },
  robots: { index: true, follow: true },
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
