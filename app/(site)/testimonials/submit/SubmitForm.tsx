"use client";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { attribution, displayName } from "../format";
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

  const label = belowMin
    ? `${length} / ${BODY_MIN} chars`
    : `${length} / ${BODY_MAX} chars`;

  return (
    <span
      className={`text-xs font-mono tabular-nums ${tone}`}
      aria-live="polite"
    >
      {!belowMin ? <span aria-hidden="true">✓ </span> : null}
      {label}
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

  useEffect(() => {
    setRenderedAt(Date.now());
  }, []);

  if (state.status === "success") {
    return (
      <div className="rounded-xl border border-brand/30 bg-brand/5 p-6">
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

  return (
    <form action={formAction} className="space-y-5">
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
          className={inputClasses}
        />
      </Field>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <label
            htmlFor="body"
            className="block text-sm font-medium text-text"
          >
            Your testimonial<span className="text-brand"> *</span>
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
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className={`${inputClasses} resize-y`}
        />
        <p className="text-xs text-text-faint">
          Plain language works best. What were we trying to do? How did it
          go? What stuck with you?
        </p>
      </div>

      <label className="flex items-start gap-3 text-sm text-text-muted">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 rounded border-border accent-[var(--color-brand)]"
        />
        <span>
          I&apos;m OK with my first name, last initial, role, company, and
          testimonial being shown publicly on vellapps.com.
        </span>
      </label>

      {state.status === "error" ? (
        <p className="text-sm text-red-400">{state.message}</p>
      ) : null}

      {showPreview ? (
        <div className="space-y-3 pt-2">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-text-faint">
            Public preview
          </p>
          <div className="rounded-2xl border border-border bg-bg p-6">
            <blockquote className="text-base sm:text-lg leading-relaxed text-text text-balance">
              {body.trim() ? (
                `“${body.trim()}”`
              ) : (
                <span className="text-text-faint italic">
                  Your testimonial will appear here…
                </span>
              )}
            </blockquote>
            <p className="mt-4 text-sm font-mono text-text-muted">
              —{" "}
              {name.trim() || company.trim()
                ? attribution({
                    name: name.trim() || "—",
                    role: role.trim() || undefined,
                    company: company.trim() || undefined,
                  })
                : "—"}
            </p>
          </div>
          <p className="text-xs text-text-faint">
            Your email and full last name are never displayed.
          </p>
        </div>
      ) : null}

      <SubmitButton />
    </form>
  );
}

const inputClasses =
  "block w-full rounded-lg border border-border bg-bg px-4 py-3 text-text placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/60";

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
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-text">
        {label}
        {required ? <span className="text-brand"> *</span> : null}
      </label>
      {children}
      {hint ? <p className="text-xs text-text-faint">{hint}</p> : null}
    </div>
  );
}
