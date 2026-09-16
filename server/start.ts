import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { createContactHandler, createResendTransport } from "./contact.ts";
const root = resolve(fileURLToPath(new URL("../dist", import.meta.url)));
const contact = createContactHandler({
  send: createResendTransport(process.env),
  origin: process.env.CONTACT_ORIGIN,
});
const types: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".json": "application/json",
};
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(
      new URL(req.url ?? "/", "http://localhost").pathname,
    );
    if (pathname === "/api/contact") {
      await contact(req, res);
      return;
    }
    if (pathname.startsWith("/api/")) {
      res.writeHead(404);
      res.end();
      return;
    }
    if (!["GET", "HEAD"].includes(req.method ?? "")) {
      res.writeHead(405);
      res.end();
      return;
    }
    if (pathname.split("/").some((p) => p.startsWith("."))) {
      res.writeHead(404);
      res.end();
      return;
    }
    const file = resolve(
      root,
      "." +
        (["/", "/kontakt", "/kontakt/"].includes(pathname)
          ? "/index.html"
          : pathname),
    );
    if (!file.startsWith(root + sep)) {
      res.writeHead(404);
      res.end();
      return;
    }
    const info = await stat(file).catch(() => null);
    if (!info?.isFile()) {
      res.writeHead(404);
      res.end();
      return;
    }
    res.writeHead(200, {
      "Content-Type": types[extname(file)] ?? "application/octet-stream",
      "Content-Length": info.size,
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Cache-Control":
        extname(file) === ".html" ? "no-cache" : "public, max-age=3600",
    });
    if (req.method === "HEAD") res.end();
    else
      createReadStream(file)
        .on("error", () => res.destroy())
        .pipe(res);
  } catch {
    if (!res.headersSent) res.writeHead(400);
    res.end();
  }
});
server.requestTimeout = 15000;
server.headersTimeout = 10000;
server.listen(
  Number(process.env.PORT ?? 4173),
  process.env.HOST ?? "127.0.0.1",
);
