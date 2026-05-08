import Image from "next/image";
import Link from "next/link";
import { sanityClient } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/imageUrl";
import { HOMEPAGE_QUERY, type HomepageContent } from "./queries";

const CALENDLY_URL = "https://calendly.com/vellapps/30min";
const EMAIL = "vince@vellapps.com";
const GITHUB_URL = "https://github.com/vincentvella";
const LINKEDIN_URL = "https://www.linkedin.com/in/vincent-vella";

export const revalidate = 60;

const positions = [
  {
    role: "Lead Software Engineer",
    company: "Capital One",
    period: "2024 — present",
    note: "On the Shopping team — building tools that help millions of people find better deals.",
  },
  {
    role: "Senior Software Engineer",
    company: "Gopuff",
    period: "2020 — 2024",
    note: "Helped lead the rebuild of their main shopping app so one shared codebase could power their iPhone app, Android app, and website at once. Led a team of six engineers. Re-architected how the app talks to its data so it could keep up with growth — services handling tens of millions of requests every day.",
  },
  {
    role: "Software Engineer",
    company: "Holman",
    period: "2018 — 2020",
    note: "Built systems that watched a fleet of vehicles in real time and sent the right alerts (push, email, text) to the right people. Led a small team shipping the same app across iPhone, Android, and the web from one codebase.",
  },
  {
    role: "Software Developer",
    company: "Holman",
    period: "2016 — 2018",
    note: "A live dashboard tracking thousands of vehicles on a Google Map, updated every second.",
  },
];

export default async function Home() {
  const { services, work, process, faqs, stack } =
    await sanityClient.fetch<HomepageContent>(HOMEPAGE_QUERY);

  return (
    <main className="relative">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 hero-grid pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-6 pt-8 pb-24 sm:pt-10 sm:pb-32">
          <header className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-3" aria-label="Vellapps home">
              <Monogram />
              <span className="font-semibold text-lg tracking-tight text-text">
                Vellapps
              </span>
            </a>
            <nav className="hidden sm:flex items-center gap-7 text-sm text-text-muted">
              <a href="#services" className="hover:text-text transition-colors">Services</a>
              <a href="#work" className="hover:text-text transition-colors">Work</a>
              <a href="#process" className="hover:text-text transition-colors">Process</a>
              <a href="#faq" className="hover:text-text transition-colors">FAQ</a>
              <a
                href={CALENDLY_URL}
                className="rounded-md border border-border-strong bg-bg-elevated px-3 py-1.5 text-text hover:border-brand hover:text-brand transition-colors"
              >
                Book a call
              </a>
            </nav>
          </header>

          <div className="mt-16 sm:mt-24 flex flex-col items-center text-center">
            <Wordmark />
          </div>

          <div className="mt-16 sm:mt-20 max-w-3xl mx-auto text-center">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-brand">
              Hi, I&apos;m Vince
            </p>
            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-balance">
              Apps,{" "}
              <span className="text-brand">made on the side.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-text-muted leading-relaxed text-balance">
              Vellapps is my side gig. I help a handful of folks build the apps they actually want — websites, mobile apps, or both. Real custom work, written by me, usually in the evenings.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={CALENDLY_URL}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-5 h-12 text-bg font-semibold hover:bg-[color:color-mix(in_oklab,var(--color-brand)_88%,white)] transition-colors"
              >
                Grab 30 minutes
                <span aria-hidden>→</span>
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border-strong bg-bg-elevated/60 px-5 h-12 text-text font-medium hover:border-brand hover:text-brand transition-colors"
              >
                Or just email
              </a>
            </div>
            <p className="mt-8 text-sm text-text-faint font-mono">
              Right now: working on the next version of Caliburr · adding new features to velk
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand">
                01 · What I do
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
                Ways I can help
              </h2>
            </div>
            <p className="text-text-muted max-w-md text-sm sm:text-base text-balance">
              Most projects touch a couple of these. Tell me what you&apos;re trying to build and we&apos;ll figure out where to start together.
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {services.map((s) => (
              <li
                key={s._id}
                className="rounded-xl border border-border bg-bg-card p-6 hover:border-border-strong transition-colors"
              >
                <h3 className="text-lg font-semibold text-text">{s.title}</h3>
                <p className="mt-1 text-sm text-text-faint">{s.summary}</p>
                <p className="mt-4 text-text-muted leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="border-b border-border bg-bg-elevated/40">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <div className="mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand">
              02 · Stuff I&apos;ve made
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
              A few things I&apos;ve built
            </h2>
            <p className="mt-3 text-text-muted max-w-2xl text-balance">
              A handful of side projects. Caliburr is live; the rest are in various states of done. Happy to walk through any of them.
            </p>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2">
            {work.map((p, i) => {
              const dims =
                p.image?.asset && "metadata" in p.image.asset
                  ? p.image.asset.metadata?.dimensions
                  : undefined;
              // Anything narrower than ~landscape is treated as portrait so
              // mobile-app screenshots aren't cropped by object-cover.
              const isPortrait = dims ? dims.aspectRatio < 1.2 : false;
              const imageUrl = p.image
                ? isPortrait
                  ? urlForImage(p.image).width(800).fit("max").url()
                  : urlForImage(p.image)
                      .width(1280)
                      .height(800)
                      .fit("crop")
                      .url()
                : null;
              const Wrapper = p.href ? "a" : "div";
              const wrapperProps = p.href
                ? { href: p.href, target: "_blank", rel: "noopener noreferrer" }
                : {};

              return (
                <li key={p._id}>
                  <Wrapper
                    {...wrapperProps}
                    className={`group block h-full rounded-xl border border-border bg-bg-card overflow-hidden transition-colors ${
                      p.href ? "hover:border-brand" : "hover:border-border-strong"
                    }`}
                  >
                    {imageUrl && isPortrait ? (
                      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-gradient-to-br from-bg-card to-bg flex items-center justify-center">
                        <div
                          className="relative h-[88%] aspect-[9/19.5] rounded-[14%/6%] border-[3px] border-border-strong bg-bg shadow-[0_18px_50px_-10px_rgba(0,0,0,0.55)] overflow-hidden group-hover:-translate-y-0.5 transition-transform duration-500"
                          aria-hidden="false"
                        >
                          <span
                            aria-hidden
                            className="absolute top-[2.5%] left-1/2 -translate-x-1/2 w-[34%] h-[2.5%] rounded-full bg-border-strong z-10"
                          />
                          <Image
                            src={imageUrl}
                            alt={`${p.title} — ${p.tagline}`}
                            fill
                            sizes="(min-width: 640px) 18vw, 36vw"
                            priority={i < 2}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    ) : imageUrl ? (
                      <div className="relative aspect-[16/10] bg-bg overflow-hidden border-b border-border">
                        <Image
                          src={imageUrl}
                          alt={`${p.title} — ${p.tagline}`}
                          fill
                          sizes="(min-width: 640px) 50vw, 100vw"
                          priority={i < 2}
                          className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="relative aspect-[16/10] border-b border-border bg-gradient-to-br from-bg-card to-bg flex items-center justify-center">
                        <span className="font-mono text-text-faint text-sm">
                          {p.stack.slice(0, 3).join(" / ")}
                        </span>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="text-lg font-semibold text-text">
                          {p.title}
                        </h3>
                        {p.href && (
                          <span className="font-mono text-xs text-brand opacity-0 group-hover:opacity-100 transition-opacity">
                            visit ↗
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-text-muted">{p.tagline}</p>
                      <p className="mt-4 text-sm text-text-muted leading-relaxed">
                        {p.body}
                      </p>
                      <ul className="mt-5 flex flex-wrap gap-1.5">
                        {p.stack.map((tech) => (
                          <li
                            key={tech}
                            className="font-mono text-[11px] text-text-faint border border-border rounded px-1.5 py-0.5"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Wrapper>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <div className="mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand">
              03 · Day job
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
              Where I&apos;ve worked
            </h2>
            <p className="mt-3 text-text-muted max-w-2xl text-balance">
              Including this here in case you want to know who&apos;s actually building your thing. The short version: I&apos;ve been doing this for about a decade — building things that run on phones, on the web, and the systems behind both.
            </p>
          </div>

          <ol className="space-y-1">
            {positions.map((p, i) => (
              <li
                key={`${p.company}-${i}`}
                className="grid grid-cols-[auto,1fr] sm:grid-cols-[180px,1fr] gap-x-6 gap-y-2 items-baseline border-t border-border py-6"
              >
                <span className="font-mono text-xs text-text-faint uppercase tracking-wider">
                  {p.period}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-text">
                    {p.role}{" "}
                    <span className="text-brand font-normal">@ {p.company}</span>
                  </h3>
                  <p className="mt-2 text-sm text-text-muted leading-relaxed">
                    {p.note}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-faint mb-4">
              Tools I reach for
            </p>
            <ul className="flex flex-wrap gap-2">
              {stack.map((tech) => (
                <li
                  key={tech._id}
                  className="font-mono text-xs text-text-muted border border-border rounded-md px-2.5 py-1.5 bg-bg-card"
                >
                  {tech.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="border-b border-border bg-bg-elevated/40">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <div className="mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand">
              04 · How this goes
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
              What working with me looks like
            </h2>
            <p className="mt-3 text-text-muted max-w-2xl text-balance">
              No mystery. No long contracts before I&apos;ve done anything. Here&apos;s what to expect from the first email to long after launch.
            </p>
          </div>

          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <li
                key={step._id}
                className="rounded-xl border border-border bg-bg-card p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="grid place-items-center w-8 h-8 rounded-md bg-brand/15 text-brand font-mono text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-semibold text-text">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm text-text-muted leading-relaxed">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
          <div className="mb-10">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand">
              05 · Common questions
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
              Things people usually ask
            </h2>
            <p className="mt-3 text-text-muted text-balance">
              If yours isn&apos;t here, just email me — I&apos;d rather answer once than have you wonder.
            </p>
          </div>

          <ul className="border-t border-border">
            {faqs.map((q) => (
              <li key={q._id}>
                <details className="group border-b border-border">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer py-5 list-none [&::-webkit-details-marker]:hidden">
                    <span className="font-medium text-text text-base sm:text-lg">
                      {q.question}
                    </span>
                    <span
                      aria-hidden
                      className="text-brand text-2xl leading-none transition-transform duration-200 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="pb-5 -mt-1 text-text-muted leading-relaxed">
                    {q.answer}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative overflow-hidden">
        <div className="absolute inset-0 hero-grid pointer-events-none opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-6 py-24 sm:py-32 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand">
            06 · Say hi
          </p>
          <h2 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight text-balance">
            Got something to build?
          </h2>
          <p className="mt-5 text-lg text-text-muted leading-relaxed text-balance">
            Thirty minutes, free, no pitch deck. Tell me what you&apos;re trying to make and I&apos;ll tell you honestly whether I&apos;m the right person to help.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={CALENDLY_URL}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-6 h-12 text-bg font-semibold hover:bg-[color:color-mix(in_oklab,var(--color-brand)_88%,white)] transition-colors"
            >
              Grab 30 minutes
              <span aria-hidden>→</span>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border-strong bg-bg-elevated/60 px-6 h-12 text-text font-medium hover:border-brand hover:text-brand transition-colors"
            >
              Or just email
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-3">
            <Monogram />
            <p className="font-mono text-text-faint">
              © {new Date().getFullYear()} Vellapps LLC
            </p>
          </div>
          <ul className="flex items-center gap-6 text-text-muted">
            <li>
              <Link
                href="/privacy"
                className="hover:text-brand transition-colors"
              >
                Privacy
              </Link>
            </li>
            <li>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand transition-colors"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand transition-colors"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="hover:text-brand transition-colors"
              >
                Email
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </main>
  );
}

function Monogram() {
  return (
    <span
      aria-hidden
      className="grid place-items-center w-9 h-9 rounded-lg bg-brand text-bg font-extrabold text-xl shadow-[0_4px_18px_rgba(0,173,181,0.35)]"
    >
      V
    </span>
  );
}

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

function Wordmark() {
  let i = 0;
  return (
    <div
      className="wordmark flex flex-col gap-2 sm:gap-3"
      role="img"
      aria-label="Vellapps"
    >
      {TILE_ROWS.map((row, r) => (
        <div key={r} className="flex gap-2 sm:gap-3 justify-center">
          {row.map((t, c) => {
            const enterDelay = i * 0.05;
            i++;
            return (
              <span
                key={`${r}-${c}`}
                className="wordmark-enter"
                style={
                  { "--enter-delay": `${enterDelay}s` } as React.CSSProperties
                }
              >
                <span
                  aria-hidden
                  className="wordmark-tile inline-flex items-center justify-center w-[15vw] h-[15vw] max-w-[120px] max-h-[120px] min-w-[56px] min-h-[56px] rounded-[18%] text-bg font-black select-none cursor-default"
                  style={
                    {
                      "--tile-rotate": `${t.rotate}deg`,
                      fontSize: "clamp(28px, 8vw, 64px)",
                      letterSpacing: "-0.02em",
                    } as React.CSSProperties
                  }
                >
                  {t.char}
                </span>
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
