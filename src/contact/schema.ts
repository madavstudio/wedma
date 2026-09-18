export const INTERESTS = [
  "safety",
  "energy",
  "assistant",
  "complete",
  "advice",
] as const;
export const LIMITS = {
  firstName: 100,
  lastName: 100,
  email: 254,
  phone: 80,
  company: 200,
  role: 200,
  message: 3000,
} as const;
export const TEXT_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "company",
  "role",
  "message",
] as const;
export type ContactValues = Record<(typeof TEXT_FIELDS)[number], string> & {
  interest: string;
  // Legacy field name: acknowledgement of the privacy notice, not GDPR consent.
  consent: boolean;
};
export type ContactField = keyof ContactValues;
export type ContactError =
  "required" | "email" | "interest" | "consent" | "tooLong" | "invalid";
export type ContactErrors = Partial<Record<ContactField, ContactError>>;
export const EMPTY_CONTACT: ContactValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  role: "",
  interest: "",
  message: "",
  consent: false,
};
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/u;
export function validateContact(input: unknown): {
  values: ContactValues;
  errors: ContactErrors;
} {
  const raw =
    input && typeof input === "object" && !Array.isArray(input)
      ? (input as Record<string, unknown>)
      : {};
  const values = { ...EMPTY_CONTACT };
  const errors: ContactErrors = {};
  for (const field of TEXT_FIELDS) {
    const value =
      raw[field] === undefined && ["phone", "role"].includes(field)
        ? ""
        : raw[field];
    values[field] = typeof value === "string" ? value.trim() : "";
    if (typeof value !== "string") errors[field] = "invalid";
    else if (value.length > LIMITS[field]) errors[field] = "tooLong";
    // Names remain international; only control characters are excluded.
    else if (
      [...value].some(
        (c) =>
          (c.charCodeAt(0) < 32 &&
            !(field === "message" && "\n\r\t".includes(c))) ||
          c.charCodeAt(0) === 127,
      )
    )
      errors[field] = "invalid";
    else if (!["phone", "role"].includes(field) && !values[field])
      errors[field] = "required";
  }
  if (!emailPattern.test(values.email)) errors.email = "email";
  values.interest = typeof raw.interest === "string" ? raw.interest : "";
  if (!(INTERESTS as readonly string[]).includes(values.interest))
    errors.interest = "interest";
  values.consent = raw.consent === true;
  if (!values.consent) errors.consent = "consent";
  return { values, errors };
}
