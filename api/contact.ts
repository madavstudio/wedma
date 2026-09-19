import {
  createContactHandler,
  createResendTransport,
} from "../server/contact.ts";

export default createContactHandler({
  send: createResendTransport(process.env),
  origin: process.env.CONTACT_ORIGIN,
  clientAddress: (req) => {
    // Vercel overwrites this header; never trust it on an ordinary Node server.
    if (process.env.VERCEL !== "1") return undefined;
    const address = req.headers["x-vercel-forwarded-for"];
    return typeof address === "string"
      ? address.split(",")[0].trim()
      : undefined;
  },
});
