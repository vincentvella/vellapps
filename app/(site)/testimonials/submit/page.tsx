import type { Metadata } from "next";
import Link from "next/link";
import { SubmitForm } from "./SubmitForm";

export const metadata: Metadata = {
  title: "Submit a testimonial",
  description:
    "Share what it was like working with Vellapps. I review every submission before it goes public.",
  alternates: { canonical: "/testimonials/submit" },
  robots: { index: false, follow: true },
};

export default function SubmitTestimonialPage() {
  return (
    <main id="main" className="relative">
      <section className="border-b border-border">
        <div className="mx-auto max-w-2xl px-6 pt-10 pb-12 sm:pt-14 sm:pb-16">
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
              href="/testimonials"
              className="text-sm text-text-muted hover:text-brand transition-colors"
            >
              See others →
            </Link>
          </header>

          <div className="mt-12">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-brand">
              Kind words
            </p>
            <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.1]">
              Share what it was like working together
            </h1>
            <p className="mt-4 text-text-muted leading-relaxed">
              If we&apos;ve worked on something and you&apos;d be willing to
              share a few words, I&apos;d love to hear it. I read every
              submission and only publish ones you&apos;ve consented to.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-2xl px-6 py-12 sm:py-16">
          <SubmitForm />
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-2xl px-6 py-10 flex items-center justify-between text-sm">
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
