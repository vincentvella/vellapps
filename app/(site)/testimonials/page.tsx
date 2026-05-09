import type { Metadata } from "next";
import Link from "next/link";
import { sanityClient } from "@/sanity/lib/client";
import { displayName } from "./format";

type ApprovedTestimonial = {
  _id: string;
  name: string;
  role?: string;
  company?: string;
  body: string;
  featured?: boolean;
  approvedAt?: string;
  relatedWork?: { _id: string; title: string; href?: string; slug: string };
};

const QUERY = `*[_type == "testimonial" && status == "approved"] | order(featured desc, approvedAt desc, _createdAt desc) {
  _id, name, role, company, body, featured, approvedAt,
  "relatedWork": relatedWork->{ _id, title, href, "slug": slug.current }
}`;

export const metadata: Metadata = {
  title: "Client Testimonials",
  description:
    "Kind words from people I've built things with — small business owners, founders, and folks who needed a real developer.",
  alternates: { canonical: "/testimonials" },
  openGraph: {
    title: "Client Testimonials · Vellapps",
    description:
      "Kind words from people I've built things with — small business owners, founders, and folks who needed a real developer.",
    url: "/testimonials",
    type: "article",
  },
};

export const revalidate = 60;

export default async function TestimonialsPage() {
  const testimonials = await sanityClient.fetch<ApprovedTestimonial[]>(QUERY);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://vellapps.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Testimonials",
        item: "https://vellapps.com/testimonials",
      },
    ],
  };

  const reviewLds = testimonials.map((t) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    reviewBody: t.body,
    author: {
      "@type": "Person",
      name: [t.role, t.company].filter(Boolean).join(", ") || t.name,
    },
    itemReviewed: {
      "@type": "ProfessionalService",
      "@id": "https://vellapps.com/#vellapps",
      name: "Vellapps LLC",
    },
    ...(t.approvedAt ? { datePublished: t.approvedAt } : {}),
  }));

  return (
    <main id="main" className="relative">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {reviewLds.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}
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
              href="/testimonials/submit"
              className="text-sm text-text-muted hover:text-brand transition-colors"
            >
              Add yours →
            </Link>
          </header>

          <div className="mt-16 sm:mt-20">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-brand">
              In their words
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
              Testimonials
            </h1>
            <p className="mt-4 text-text-muted leading-relaxed max-w-prose">
              Kind words from folks I&apos;ve built things with. If
              we&apos;ve worked together and you&apos;d like to add yours,{" "}
              <Link
                href="/testimonials/submit"
                className="text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
              >
                drop one in
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          {testimonials.length === 0 ? (
            <p className="text-text-muted">
              Nothing posted yet — check back soon.
            </p>
          ) : (
            <ul className="space-y-8">
              {testimonials.map((t) => (
                <li key={t._id}>
                  <figure
                    className={`relative overflow-hidden rounded-2xl border ${
                      t.featured
                        ? "border-brand/40 bg-brand/[0.04] shadow-[0_4px_28px_rgba(0,173,181,0.10)]"
                        : "border-border bg-bg-card"
                    } px-7 py-9 sm:px-12 sm:py-12`}
                  >
                    {t.featured && (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute top-2 left-3 sm:top-4 sm:left-6 select-none font-serif text-[6rem] sm:text-[8rem] leading-[0.8] text-brand/25"
                      >
                        &ldquo;
                      </span>
                    )}
                    <blockquote className="relative text-lg sm:text-xl leading-relaxed text-text">
                      {t.body}
                    </blockquote>
                    <figcaption className="relative mt-8 pt-6 border-t border-border flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <div>
                        <p className="font-semibold text-text">
                          {displayName(t.name)}
                        </p>
                        {(t.role || t.company) && (
                          <p className="mt-0.5 text-sm text-text-muted">
                            {[t.role, t.company].filter(Boolean).join(", ")}
                          </p>
                        )}
                      </div>
                      {t.relatedWork && (
                        <p className="text-xs font-mono text-text-faint">
                          About:{" "}
                          {t.relatedWork.href ? (
                            <a
                              href={t.relatedWork.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-brand hover:underline"
                            >
                              {t.relatedWork.title}
                              <span className="sr-only">
                                {" "}
                                (opens in new tab)
                              </span>
                            </a>
                          ) : (
                            <Link
                              href={`/#work-${t.relatedWork.slug}`}
                              className="text-brand hover:underline"
                            >
                              {t.relatedWork.title}
                            </Link>
                          )}
                        </p>
                      )}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          )}
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
