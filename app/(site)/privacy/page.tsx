import type { Metadata } from "next";
import Link from "next/link";

const LAST_UPDATED = "May 8, 2026";
const EMAIL = "vince@vellapps.com";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How vellapps.com handles visitor data — analytics, cookies, third parties.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy",
    description:
      "How vellapps.com handles visitor data — analytics, cookies, third parties.",
    url: "/privacy",
    type: "article",
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://vellapps.com" },
    { "@type": "ListItem", position: 2, name: "Privacy", item: "https://vellapps.com/privacy" },
  ],
};

export default function PrivacyPage() {
  return (
    <main id="main" className="relative">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 pt-10 pb-16 sm:pt-14 sm:pb-20">
          <header className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 text-text-muted hover:text-text transition-colors"
              aria-label="Back to Vellapps home"
            >
              <span
                aria-hidden
                className="grid place-items-center w-9 h-9 rounded-lg bg-brand text-bg font-extrabold text-xl shadow-[0_4px_18px_rgba(0,173,181,0.35)]"
              >
                V
              </span>
              <span className="font-semibold text-lg tracking-tight text-text">
                Vellapps
              </span>
            </Link>
            <Link
              href="/"
              className="text-sm text-text-muted hover:text-brand transition-colors"
            >
              ← Back home
            </Link>
          </header>

          <div className="mt-16 sm:mt-20">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-brand">
              The fine print
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
              Privacy
            </h1>
            <p className="mt-4 text-sm text-text-faint font-mono">
              Last updated: {LAST_UPDATED}
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20 space-y-10 text-text-muted leading-relaxed">
          <p className="text-text">
            This site is the landing page for Vellapps LLC — my freelance
            practice. There are no accounts, no comments, and nothing for sale
            on the site directly. Bookings happen through Calendly; everything
            else happens by email. The privacy story is short and I&apos;d like
            to keep it that way.
          </p>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-text tracking-tight mb-3">
              Analytics
            </h2>
            <p>
              When this site is instrumented with analytics, it&apos;s a
              self-hosted instance of{" "}
              <a
                href="https://umami.is"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
              >
                Umami
              </a>{" "}
              that I run on infrastructure I own. Umami records the page URL,
              the referring URL, your country (derived from IP, then
              discarded), browser, and device type. It does not set cookies,
              does not fingerprint you, and does not share data with any third
              party.
            </p>
            <p className="mt-4">
              The site also reports anonymous Core Web Vitals (page-load and
              interaction timings — LCP, CLS, INP, FCP, TTFB) to the same
              Umami instance as custom events so I can keep the site fast. No
              personal data is attached to those events.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-text tracking-tight mb-3">
              Booking a call
            </h2>
            <p>
              The &ldquo;Grab 30 minutes&rdquo; button goes to Calendly. If you
              book a call, Calendly collects the information you enter
              (typically your name and email) under its own privacy practices.
              I receive that so I can show up to the meeting and follow up with
              you. I don&apos;t use it for anything else.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-text tracking-tight mb-3">
              Email
            </h2>
            <p>
              If you email me, I read it, save it, and may reply. That&apos;s
              it. I don&apos;t add you to a mailing list — there isn&apos;t
              one.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-text tracking-tight mb-3">
              Records I keep about leads &amp; clients
            </h2>
            <p>
              If you reach out about a project or hire me, I keep a private
              record so I can quote, do the work, and invoice. That record
              lives in a content store hosted by{" "}
              <a
                href="https://www.sanity.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
              >
                Sanity
              </a>{" "}
              and is only accessible to me. Depending on the stage of our
              conversation it may include: your name, contact email or phone,
              what you&apos;re trying to build, anything you&apos;ve mentioned
              about budget, the project scope and status, time logged against
              the project, and invoice details (amount, dates, status). It
              does not include payment card information — invoicing happens
              outside this system.
            </p>
            <p className="mt-4">
              These records exist purely for running the engagement and the
              business records around it. They are not used for marketing,
              not shared with third parties, and not joined with the
              analytics data above. If you&apos;d like a copy of what I have
              about you, or want it deleted (subject to whatever I&apos;m
              required to retain for tax purposes), email me.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-text tracking-tight mb-3">
              Hosting
            </h2>
            <p>
              The site is hosted on Vercel. Vercel sees inbound requests as
              part of serving the page and may log IP addresses for security
              and abuse prevention under their own privacy practices. I
              don&apos;t pull those logs into anything.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-text tracking-tight mb-3">
              What I don&apos;t do
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>No advertising, ad networks, or retargeting pixels.</li>
              <li>
                No third-party trackers or analytics beyond what&apos;s above.
              </li>
              <li>No selling, renting, or sharing of any visitor data.</li>
              <li>No newsletter or mailing list to opt in or out of.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-text tracking-tight mb-3">
              Questions
            </h2>
            <p>
              Questions about this page, or want any record of your visit
              removed from the analytics database? Email me at{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
              >
                {EMAIL}
              </a>
              .
            </p>
          </section>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-10 flex items-center justify-between text-sm">
          <p className="font-mono text-text-faint">
            © {new Date().getFullYear()} Vellapps LLC
          </p>
          <Link
            href="/"
            className="text-text-muted hover:text-brand transition-colors"
          >
            ← Back home
          </Link>
        </div>
      </footer>
    </main>
  );
}
