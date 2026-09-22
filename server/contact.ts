import { createHash, randomBytes } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import { PRIVACY_VERSION } from "../src/content/privacy.ts";
import { validateContact } from "../src/contact/schema.ts";
import type { ContactValues } from "../src/contact/schema.ts";

export type ContactTransport = (
  values: ContactValues,
  key: string,
) => Promise<boolean>;
const MAX_BYTES = 16 * 1024;
const WINDOW = 15 * 60 * 1000;
const IDEMPOTENCY_TTL = 24 * 60 * 60 * 1000;
export function createResendTransport(
  env: Record<string, string | undefined>,
  fetcher: typeof fetch = fetch,
): ContactTransport | undefined {
  const key = env.RESEND_API_KEY?.trim(),
    from = env.CONTACT_FROM?.trim();
  if (!key || !from || /[\r\n]/.test(from) || !from.includes("@"))
    return undefined;
  return async (values, requestKey) => {
    const body = [
      "Kontaktný formulár WEDMA",
      "",
      `Meno: ${values.firstName} ${values.lastName}`,
      `E-mail: ${values.email}`,
      `Telefón: ${values.phone || "—"}`,
      `Firma: ${values.company}`,
      `Pozícia: ${values.role || "—"}`,
      `Oblasť: ${values.interest}`,
      "Potvrdenie oboznámenia sa s informáciami o spracúvaní údajov: áno",
      `Verzia informácií: ${PRIVACY_VERSION}`,
      "",
      "Správa:",
      values.message,
    ].join("\n");
    const response = await fetcher("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `wedma-contact/${requestKey}`,
      },
      body: JSON.stringify({
        from,
        to: ["wedma@hyllebaer.com"],
        reply_to: values.email,
        subject: "WEDMA — nová požiadavka na ukážku",
        text: body,
      }),
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) return false;
    const result = (await response.json()) as { id?: unknown };
    return typeof result.id === "string" && result.id.length > 0;
  };
}
export function createContactHandler(
  options: {
    send?: ContactTransport;
    origin?: string;
    now?: () => number;
    rateLimit?: number;
    clientAddress?: (req: IncomingMessage) => string | undefined;
  } = {},
) {
  const now = options.now ?? Date.now;
  const salt = randomBytes(32);
  const digest = (value: string) =>
    createHash("sha256").update(salt).update(value).digest("hex");
  const rates = new Map<string, { count: number; expires: number }>();
  const attempts = new Map<
    string,
    { digest: string; expires: number; promise: Promise<boolean> }
  >();
  return async (req: IncomingMessage, res: ServerResponse) => {
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("X-Content-Type-Options", "nosniff");
    const reply = (status: number, body: object) => {
      if (!res.writableEnded && !res.destroyed) {
        res.statusCode = status;
        res.end(JSON.stringify(body));
      }
    };
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      reply(405, { accepted: false });
      return;
    }
    const origin = req.headers.origin;
    const allowedOrigins = options.origin
      ? [options.origin]
      : [`http://${req.headers.host}`, `https://${req.headers.host}`];
    if (
      req.headers["sec-fetch-site"] === "cross-site" ||
      (origin && !allowedOrigins.includes(origin))
    ) {
      reply(403, { accepted: false });
      return;
    }
    if (
      req.headers["content-type"]?.split(";")[0].trim() !== "application/json"
    ) {
      reply(415, { accepted: false });
      return;
    }
    const time = now();
    for (const [key, value] of rates)
      if (value.expires <= time) rates.delete(key);
    for (const [key, value] of attempts)
      if (value.expires <= time) attempts.delete(key);
    // A deployment adapter may supply an identity from its trusted platform.
    const ip = digest(
      options.clientAddress?.(req) ?? req.socket.remoteAddress ?? "unknown",
    );
    const rate = rates.get(ip) ?? { count: 0, expires: time + WINDOW };
    if (rates.size >= 10000 && !rates.has(ip)) {
      reply(503, { accepted: false });
      return;
    }
    rates.set(ip, rate);
    if (++rate.count > (options.rateLimit ?? 5)) {
      res.setHeader(
        "Retry-After",
        String(Math.ceil((rate.expires - time) / 1000)),
      );
      reply(429, { accepted: false });
      return;
    }
    if (Number(req.headers["content-length"]) > MAX_BYTES) {
      req.resume();
      reply(413, { accepted: false });
      return;
    }
    let input: unknown;
    try {
      const parsed = (req as IncomingMessage & { body?: unknown }).body;
      if (parsed !== undefined) {
        const raw = Buffer.isBuffer(parsed)
          ? parsed.toString("utf8")
          : typeof parsed === "string"
            ? parsed
            : JSON.stringify(parsed);
        if (Buffer.byteLength(raw, "utf8") > MAX_BYTES)
          throw new Error("large");
        input = JSON.parse(raw);
      } else {
        const raw = await new Promise<string>((resolve, reject) => {
          const chunks: Buffer[] = [];
          let size = 0;
          const timer = setTimeout(() => {
            reject(new Error("timeout"));
            req.resume();
          }, 10000);
          req.on("data", (chunk: Buffer) => {
            size += chunk.length;
            if (size > MAX_BYTES) {
              clearTimeout(timer);
              chunks.length = 0;
              reject(new Error("large"));
            } else chunks.push(chunk);
          });
          req.once("end", () => {
            clearTimeout(timer);
            resolve(Buffer.concat(chunks).toString("utf8"));
          });
          req.once("error", () => {
            clearTimeout(timer);
            reject(new Error("read"));
          });
          req.once("aborted", () => {
            clearTimeout(timer);
            reject(new Error("read"));
          });
        });
        input = JSON.parse(raw);
      }
    } catch (error) {
      reply(error instanceof Error && error.message === "large" ? 413 : 400, {
        accepted: false,
      });
      return;
    }
    const { values, errors } = validateContact(input);
    if (Object.keys(errors).length) {
      reply(422, { accepted: false, errors });
      return;
    }
    const key = req.headers["idempotency-key"];
    if (
      typeof key !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        key,
      )
    ) {
      reply(400, { accepted: false });
      return;
    }
    if (!options.send) {
      reply(503, { accepted: false, code: "delivery_unavailable" });
      return;
    }
    const hash = digest(JSON.stringify(values));
    const previous = attempts.get(key);
    if (previous && previous.digest !== hash) {
      reply(409, { accepted: false });
      return;
    }
    if (!previous && attempts.size >= 10000) {
      reply(503, { accepted: false });
      return;
    }
    const attempt = previous ?? {
      digest: hash,
      expires: time + IDEMPOTENCY_TTL,
      promise: Promise.resolve()
        .then(() => options.send!(values, key))
        .catch(() => false),
    };
    attempts.set(key, attempt);
    const accepted = await attempt.promise;
    if (!accepted) attempts.delete(key);
    reply(accepted ? 200 : 502, { accepted });
  };
}
