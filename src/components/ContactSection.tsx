import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { useLanguage } from "../hooks/site";
import { PRIVACY_PATH } from "../content/privacy";
import { CONTACT } from "../content/config";
import {
  EMPTY_CONTACT,
  INTERESTS,
  LIMITS,
  validateContact,
} from "../contact/schema";
import type {
  ContactErrors,
  ContactField,
  ContactValues,
} from "../contact/schema";
import { Arrow } from "./shared";
import { ContactBackdrop } from "./ContactBackdrop";
import { ContactIllustration } from "./ContactIllustration";
import "./contact.css";

const inputFields = [
  { name: "firstName", auto: "given-name", half: true },
  { name: "lastName", auto: "family-name", half: true },
  { name: "email", auto: "email", type: "email" },
  { name: "phone", auto: "tel", type: "tel" },
  { name: "company", auto: "organization", half: true },
  { name: "role", auto: "organization-title", half: true },
] as const;
export function ContactSection() {
  const { t, lang } = useLanguage();
  const c = t.contact;
  const [values, setValues] = useState<ContactValues>({ ...EMPTY_CONTACT });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const form = useRef<HTMLFormElement>(null);
  const inFlight = useRef(false);
  const attempt = useRef<{ body: string; key: string } | null>(null);
  const [formHeight, setFormHeight] = useState<number>();
  function update<K extends ContactField>(key: K, value: ContactValues[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    if (errors[key])
      setErrors((previous) => ({
        ...previous,
        [key]: validateContact(next).errors[key],
      }));
  }
  function focusError(next: ContactErrors) {
    const first = Object.keys(next).find((key) => next[key as ContactField]);
    requestAnimationFrame(() =>
      document.getElementById(`contact-${first}`)?.focus(),
    );
  }
  function errorText(field: ContactField) {
    const error = errors[field];
    if (!error) return "";
    if (error === "tooLong" && field in LIMITS)
      return c.errors.tooLong.replace(
        "{limit}",
        String(LIMITS[field as keyof typeof LIMITS]),
      );
    if (error === "invalid") return c.errors.invalid;
    return field in c.errors
      ? c.errors[field as keyof typeof c.errors]
      : c.errors.invalid;
  }
  function errorNode(field: ContactField) {
    return errors[field] ? (
      <p id={`contact-${field}-error`} className="contact-field-error">
        {errorText(field)}
      </p>
    ) : null;
  }
  const accessibility = (field: ContactField) => ({
    id: `contact-${field}`,
    name: field,
    "aria-invalid": errors[field] ? (true as const) : undefined,
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
  });
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || status === "success") return;
    const validated = validateContact(values);
    setErrors(validated.errors);
    if (Object.keys(validated.errors).length) {
      focusError(validated.errors);
      return;
    }
    inFlight.current = true;
    setStatus("sending");
    // Retried, unchanged enquiries reuse the same idempotency key, in memory only.
    const body = JSON.stringify(validated.values);
    try {
      if (attempt.current?.body !== body)
        attempt.current = { body, key: crypto.randomUUID() };
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": attempt.current!.key,
        },
        body: JSON.stringify({ ...validated.values, language: lang }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (response.ok && result.accepted === true) {
        setFormHeight(form.current?.getBoundingClientRect().height);
        setValues({ ...EMPTY_CONTACT });
        setStatus("success");
        attempt.current = null;
      } else {
        // Only known validation codes may enter the UI; never render server prose.
        if (
          response.status === 422 &&
          result.errors &&
          typeof result.errors === "object"
        ) {
          const safe: ContactErrors = {};
          for (const field of Object.keys(EMPTY_CONTACT) as ContactField[]) {
            const code = result.errors[field];
            if (
              [
                "required",
                "email",
                "interest",
                "consent",
                "tooLong",
                "invalid",
              ].includes(code)
            )
              safe[field] = code;
          }
          setErrors(safe);
          focusError(safe);
        }
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  }
  return (
    <section
      id="kontakt"
      className="contact-section"
      aria-labelledby="contact-heading"
    >
      <ContactBackdrop />
      <div className="container contact-grid">
        <div className="contact-copy">
          <div className="contact-art-frame">
            <ContactIllustration />
          </div>
          <h2 id="contact-heading" tabIndex={-1}>
            {c.heading}
          </h2>
          <p>{c.body}</p>
        </div>
        <form
          ref={form}
          className="contact-form"
          aria-label={c.label}
          aria-busy={status === "sending"}
          noValidate
          autoComplete="off"
          onSubmit={submit}
          style={status === "success" ? { minHeight: formHeight } : undefined}
        >
          <div
            className="contact-announcement"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {status === "success" && (
              <div className="contact-success">
                <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
                  <circle
                    cx="20"
                    cy="20"
                    r="18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="m12 20 6 6 11-13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>{c.success}</p>
              </div>
            )}
            {status === "error" && (
              <p className="contact-send-error">
                {c.failure} <a href={CONTACT.emailTarget}>{CONTACT.email}</a>.
              </p>
            )}
          </div>
          {status === "success" ? (
            <button
              type="button"
              className="contact-again"
              onClick={() => {
                setStatus("idle");
                setFormHeight(undefined);
                requestAnimationFrame(() =>
                  document.getElementById("contact-firstName")?.focus(),
                );
              }}
            >
              {c.again}
              <Arrow />
            </button>
          ) : (
            <>
              <fieldset
                className="contact-fields"
                disabled={status === "sending"}
              >
                <legend className="sr-only">{c.label}</legend>
                {inputFields.map((field) => (
                  <div
                    key={field.name}
                    className={`contact-field ${"half" in field ? "contact-field--half" : ""}`}
                  >
                    <label htmlFor={`contact-${field.name}`}>
                      {c.fields[field.name]}
                    </label>
                    <input
                      {...accessibility(field.name)}
                      type={"type" in field ? field.type : "text"}
                      autoComplete={
                        ["firstName", "lastName"].includes(field.name)
                          ? "off"
                          : field.auto
                      }
                      value={values[field.name]}
                      maxLength={LIMITS[field.name]}
                      required={!["phone", "role"].includes(field.name)}
                      onChange={(event) =>
                        update(field.name, event.target.value)
                      }
                    />
                    {errorNode(field.name)}
                  </div>
                ))}
                <div className="contact-field">
                  <label htmlFor="contact-interest">{c.fields.interest}</label>
                  <div className="contact-select-wrap">
                    <select
                      {...accessibility("interest")}
                      required
                      value={values.interest}
                      onChange={(event) =>
                        update("interest", event.target.value)
                      }
                    >
                      <option value="">{c.select}</option>
                      {INTERESTS.map((value, index) => (
                        <option value={value} key={value}>
                          {c.interests[index]}
                        </option>
                      ))}
                    </select>
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d="m4 6 4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  {values.interest && (
                    <span className="contact-selected-area">
                      {
                        c.interests[
                          INTERESTS.indexOf(
                            values.interest as (typeof INTERESTS)[number],
                          )
                        ]
                      }
                    </span>
                  )}
                  {errorNode("interest")}
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-message">{c.fields.message}</label>
                  <textarea
                    {...accessibility("message")}
                    rows={5}
                    required
                    maxLength={LIMITS.message}
                    placeholder={c.placeholder}
                    value={values.message}
                    onChange={(event) => update("message", event.target.value)}
                  />
                  {errorNode("message")}
                </div>
                <div className="contact-consent">
                  <p
                    id="contact-privacy-summary"
                    className="contact-privacy-summary"
                  >
                    {c.privacySummary}{" "}
                    <a href={PRIVACY_PATH}>{c.privacyLink}</a>.
                  </p>
                  <label htmlFor="contact-consent">
                    <span className="contact-check-target">
                      <input
                        {...accessibility("consent")}
                        aria-describedby={`contact-privacy-summary${errors.consent ? " contact-consent-error" : ""}`}
                        type="checkbox"
                        required
                        checked={values.consent}
                        onChange={(event) =>
                          update("consent", event.target.checked)
                        }
                      />
                    </span>
                    <span>{c.consent}</span>
                  </label>
                  {errorNode("consent")}
                </div>
              </fieldset>
              <button
                type="submit"
                disabled={status === "sending"}
                className="button button--black contact-submit"
              >
                <span className="contact-submit-label">
                  <span
                    style={{
                      visibility: status === "sending" ? "hidden" : "visible",
                    }}
                  >
                    {c.submit}
                  </span>
                  {status === "sending" && (
                    <span className="contact-sending-label">{c.sending}</span>
                  )}
                </span>
                {status === "sending" ? (
                  <span className="contact-spinner" aria-hidden="true" />
                ) : (
                  <Arrow />
                )}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
