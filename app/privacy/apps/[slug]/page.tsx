import type { Metadata } from "next";
import Link from "next/link";

const LAST_UPDATED = "May 7, 2026";
const EMAIL = "vince@vellapps.com";
const PUBLISHER = "Vellapps LLC";

type AppPrivacy = {
  name: string;
  tagline?: string;
  collects?: string[];
  thirdParties?: string[];
  hasAccountDeletion?: boolean;
};

// Registered apps. Unknown slugs fall back to a generic stub policy
// using a slug-derived name — useful for first submissions before
// the app collects anything meaningful.
const APPS: Record<string, AppPrivacy> = {
  caliburr: {
    name: "Caliburr",
    tagline: "Coffee dial-in app",
    collects: [
      "Your account email (via Sign in with Apple or Sign in with Google)",
      "Recipes, equipment entries, and other content you create in the app",
      "Photos you upload to your recipes or equipment listings",
    ],
    thirdParties: [
      "Apple — Sign in with Apple, App Store subscription management",
      "Google — Sign in with Google",
      "Supabase — account, content, and image storage",
      "RevenueCat — subscription management for backer features",
    ],
    hasAccountDeletion: true,
  },
  "stash-note": {
    name: "Stash Note",
    tagline: "Cross-platform notes",
    collects: [
      "Your account email (via Sign in with Apple or Sign in with Google)",
      "Your notes and any media you embed in them",
    ],
    thirdParties: [
      "Apple — Sign in with Apple",
      "Google — Sign in with Google",
      "Supabase — account and note storage, sync",
    ],
    hasAccountDeletion: true,
  },
  "pod-haven": {
    name: "Pod Haven",
    tagline: "Local-first podcast listener",
    collects: [
      "Nothing on a server. Pod Haven is local-first — your subscriptions, episodes, and play state stay on your device.",
    ],
    thirdParties: [],
    hasAccountDeletion: false,
  },
  equipless: {
    name: "Equipless",
    tagline: "Habit-building workout tracker",
    collects: [
      "Your account email (if you choose to sign in)",
      "Workout history and routines you create",
    ],
    thirdParties: [
      "Apple — Sign in with Apple",
      "Google — Sign in with Google",
    ],
    hasAccountDeletion: true,
  },
};

function deriveAppFromSlug(slug: string): AppPrivacy {
  const name = slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  return { name };
}

function getApp(slug: string): AppPrivacy {
  return APPS[slug] ?? deriveAppFromSlug(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);
  const title = `${app.name} — Privacy`;
  const description = `Privacy policy for ${app.name}, an app published by ${PUBLISHER}.`;
  return {
    title,
    description,
    alternates: { canonical: `/privacy/apps/${slug}` },
    openGraph: {
      title,
      description,
      url: `/privacy/apps/${slug}`,
      type: "article",
    },
  };
}

export default async function AppPrivacyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = getApp(slug);
  const isRegistered = slug in APPS;

  return (
    <main className="relative">
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
              href="/privacy"
              className="text-sm text-text-muted hover:text-brand transition-colors"
            >
              Site privacy →
            </Link>
          </header>

          <div className="mt-16 sm:mt-20">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-brand">
              {app.tagline ?? "App"}
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
              {app.name} privacy
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
            This is the privacy policy for{" "}
            <strong className="text-text">{app.name}</strong>, a mobile
            application published by {PUBLISHER}. The privacy story is short
            and I&apos;d like to keep it that way.
          </p>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-text tracking-tight mb-3">
              What the app collects
            </h2>
            {app.collects && app.collects.length > 0 ? (
              <ul className="list-disc space-y-2 pl-6">
                {app.collects.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>
                {app.name} collects only what you explicitly provide while
                using it. There is no background tracking, no advertising
                identifier collection, no contact-list scraping, and no
                location tracking.
              </p>
            )}
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-text tracking-tight mb-3">
              Third-party services
            </h2>
            {app.thirdParties && app.thirdParties.length > 0 ? (
              <>
                <p className="mb-3">
                  The app uses the following services. Each operates under its
                  own privacy practices.
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  {app.thirdParties.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p>
                The app does not integrate any third-party advertising,
                analytics, or tracking SDKs. Standard Apple and Google
                operating-system services apply (crash reports, OS-level
                telemetry) under their own privacy practices.
              </p>
            )}
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-text tracking-tight mb-3">
              Children&apos;s privacy
            </h2>
            <p>
              {app.name} is not directed at children under 13 and does not
              knowingly collect personal information from children under 13.
              If you believe a child has provided personal information, please
              email{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
              >
                {EMAIL}
              </a>{" "}
              and the data will be deleted promptly.
            </p>
          </section>

          {app.hasAccountDeletion !== false && (
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-text tracking-tight mb-3">
                Account &amp; data deletion
              </h2>
              <p>
                You can delete your account and all associated data from
                within the app&apos;s settings at any time. If the in-app
                option isn&apos;t working, email{" "}
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
                >
                  {EMAIL}
                </a>{" "}
                from the address tied to your account and the deletion will be
                processed manually.
              </p>
            </section>
          )}

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-text tracking-tight mb-3">
              What this app does not do
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>No advertising or ad networks.</li>
              <li>No selling, renting, or sharing of your data.</li>
              <li>
                No retargeting pixels or third-party tracking SDKs beyond what
                is listed above.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-text tracking-tight mb-3">
              Contact
            </h2>
            <p>
              Questions about this policy or your data? Email{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
              >
                {EMAIL}
              </a>
              .
            </p>
          </section>

          {!isRegistered && (
            <p className="text-xs text-text-faint font-mono pt-6 border-t border-border">
              This is a generic stub policy. As {app.name} grows, this page
              will be updated to reflect what the app actually does.
            </p>
          )}
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-10 flex items-center justify-between text-sm">
          <p className="font-mono text-text-faint">
            © {new Date().getFullYear()} {PUBLISHER}
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
