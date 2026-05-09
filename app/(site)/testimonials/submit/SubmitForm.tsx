"use client";

import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { displayName } from "../format";
import { submitTestimonial, type SubmitState } from "./actions";

const initialState: SubmitState = { status: "idle" };

const BODY_MIN = 30;
const BODY_MAX = 1500;
const BODY_NEAR_MAX = BODY_MAX - 100;

function BodyCounter({ length }: { length: number }) {
  const belowMin = length < BODY_MIN;
  const nearMax = length >= BODY_NEAR_MAX;

  const tone = belowMin
    ? "text-text-faint"
    : nearMax
      ? "text-amber-400"
      : "text-brand";

  const visibleLabel = belowMin
    ? `${length} / ${BODY_MIN} chars`
    : `${length} / ${BODY_MAX} chars`;

  // A separate, more verbose phrasing for screen readers — the visible
  // version is terse to keep the field header tidy.
  const srLabel = belowMin
    ? `${length} of ${BODY_MIN} characters minimum`
    : nearMax
      ? `${length} of ${BODY_MAX} characters used, approaching limit`
      : `${length} of ${BODY_MAX} characters used`;

  return (
    <span className={`text-xs font-mono tabular-nums ${tone}`}>
      <span aria-hidden="true">
        {!belowMin ? "✓ " : ""}
        {visibleLabel}
      </span>
      <span className="sr-only" aria-live="polite">
        {srLabel}
      </span>
    </span>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-lg bg-brand px-5 py-3 text-bg font-semibold shadow-[0_4px_18px_rgba(0,173,181,0.35)] hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? "Sending…" : "Submit testimonial"}
    </button>
  );
}

export function SubmitForm() {
  const [state, formAction] = useActionState(submitTestimonial, initialState);
  const [renderedAt, setRenderedAt] = useState<number>(0);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [body, setBody] = useState("");
  const successRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setRenderedAt(Date.now());
  }, []);

  // When the form succeeds, move keyboard focus to the success message so
  // screen readers announce it and Tab continues from the right place.
  useEffect(() => {
    if (state.status === "success") {
      successRef.current?.focus();
    }
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div
        ref={successRef}
        role="status"
        tabIndex={-1}
        className="rounded-xl border border-brand/30 bg-brand/5 p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
      >
        <h2 className="text-xl font-semibold text-text mb-2">
          Thanks — really appreciate this!
        </h2>
        <p className="text-text-muted leading-relaxed">
          I&apos;ll review and, if it&apos;s a fit, post it on the
          testimonials page. If any questions come up I&apos;ll reach out!
        </p>
      </div>
    );
  }

  const showPreview =
    name.trim().length > 0 || body.trim().length > 0 || company.trim().length > 0;

  const bodyHasError = state.status === "error";

  return (
    <form action={formAction} className="space-y-5" noValidate={false}>
      <input type="hidden" name="rendered_at" value={renderedAt} />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <Field
        id="name"
        label="Your name"
        required
        hint={
          name.trim()
            ? `Will display as “${displayName(name)}” — only your last initial is shown publicly.`
            : "Only the first letter of your last name will be shown publicly."
        }
      >
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={120}
          autoComplete="name"
          aria-required="true"
          aria-describedby="name-hint"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClasses}
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field id="role" label="Role">
          <input
            id="role"
            name="role"
            type="text"
            placeholder="e.g. Founder"
            autoComplete="organization-title"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={inputClasses}
          />
        </Field>
        <Field id="company" label="Company" required>
          <input
            id="company"
            name="company"
            type="text"
            required
            maxLength={160}
            autoComplete="organization"
            aria-required="true"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={inputClasses}
          />
        </Field>
      </div>

      <Field
        id="email"
        label="Email"
        hint="In case I have a follow-up question. Never displayed publicly."
      >
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          aria-describedby="email-hint"
          className={inputClasses}
        />
      </Field>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <label
            htmlFor="body"
            className="block text-sm font-medium text-text"
          >
            Your testimonial
            <span aria-hidden="true" className="text-brand"> *</span>
            <span className="sr-only"> (required)</span>
          </label>
          <BodyCounter length={body.length} />
        </div>
        <textarea
          id="body"
          name="body"
          required
          minLength={BODY_MIN}
          maxLength={BODY_MAX}
          rows={6}
          aria-required="true"
          aria-describedby="body-hint"
          aria-invalid={bodyHasError && body.length < BODY_MIN}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className={`${inputClasses} resize-y`}
        />
        <p id="body-hint" className="text-xs text-text-faint">
          Plain language works best. What were we trying to do? How did it
          go? What stuck with you?
        </p>
      </div>

      <label className="flex items-start gap-3 text-sm text-text-muted">
        <input
          type="checkbox"
          name="consent"
          required
          aria-required="true"
          className="mt-1 h-4 w-4 rounded border-border accent-[var(--color-brand)]"
        />
        <span>
          I&apos;m OK with my first name, last initial, role, company, and
          testimonial being shown publicly on vellapps.com.
        </span>
      </label>

      <div role="alert" aria-live="polite" className="min-h-0">
        {state.status === "error" ? (
          <p className="text-sm text-red-400">{state.message}</p>
        ) : null}
      </div>

      {showPreview ? (
        <section
          aria-labelledby="preview-heading"
          className="space-y-3 pt-2"
        >
          <h2
            id="preview-heading"
            className="font-mono text-xs uppercase tracking-[0.22em] text-text-faint"
          >
            Public preview
          </h2>
          <figure className="relative overflow-hidden rounded-2xl border border-border bg-bg-card px-6 py-7 sm:px-8 sm:py-9">
            <span
              aria-hidden
              className="pointer-events-none absolute top-2 left-3 select-none font-serif text-[5rem] leading-[0.8] text-brand/25"
            >
              &ldquo;
            </span>
            <blockquote className="relative text-base sm:text-lg leading-relaxed text-text">
              {body.trim() ? (
                body.trim()
              ) : (
                <span className="text-text-faint italic">
                  Your testimonial will appear here…
                </span>
              )}
            </blockquote>
            <figcaption className="relative mt-6 pt-5 border-t border-border">
              <p className="font-semibold text-text">
                {name.trim() ? displayName(name) : "—"}
              </p>
              {(role.trim() || company.trim()) && (
                <p className="mt-0.5 text-sm text-text-muted">
                  {[role.trim(), company.trim()].filter(Boolean).join(", ")}
                </p>
              )}
            </figcaption>
          </figure>
          <p className="text-xs text-text-faint">
            Your email and full last name are never displayed.
          </p>
        </section>
      ) : null}

      <SubmitButton />
    </form>
  );
}

const inputClasses =
  "block w-full rounded-lg border border-border bg-bg px-4 py-3 text-text placeholder:text-text-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:border-brand";

function Field({
  id,
  label,
  required,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-text">
        {label}
        {required ? (
          <>
            <span aria-hidden="true" className="text-brand"> *</span>
            <span className="sr-only"> (required)</span>
          </>
        ) : null}
      </label>
      {children}
      {hint ? (
        <p id={hintId} className="text-xs text-text-faint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
