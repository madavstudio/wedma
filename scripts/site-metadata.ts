import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import type { Plugin, ResolvedConfig } from "vite";
import { metadata, pageSlugs, type SitePage } from "../src/content/metadata.ts";

const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
export function normaliseSiteUrl(value: string) {
  const url = new URL(value);
  if (
    !/^https?:$/.test(url.protocol) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  )
    throw new Error(
      "SITE_URL must be a full HTTP(S) website URL without credentials, query or fragment.",
    );
  url.pathname = url.pathname.replace(/\/?$/, "/");
  return url.href;
}
export function metadataHtml(page: SitePage, siteUrl: string) {
  const copy = metadata.sk[page];
  const canonical = new URL(pageSlugs[page], siteUrl).href;
  const image = new URL("icon-512.png", siteUrl).href;
  return `<!-- metadata:start -->
    <title>${escape(copy.title)}</title>
    <meta name="description" content="${escape(copy.description)}" />
    <meta name="application-name" content="WEDMA" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${escape(canonical)}" />
    <meta property="og:site_name" content="WEDMA" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="sk_SK" />
    <meta property="og:locale:alternate" content="en_GB" />
    <meta property="og:title" content="${escape(copy.title)}" />
    <meta property="og:description" content="${escape(copy.description)}" />
    <meta property="og:url" content="${escape(canonical)}" />
    <meta property="og:image" content="${escape(image)}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="512" />
    <meta property="og:image:height" content="512" />
    <meta property="og:image:alt" content="${escape(metadata.sk.imageAlt)}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escape(copy.title)}" />
    <meta name="twitter:description" content="${escape(copy.description)}" />
    <meta name="twitter:image" content="${escape(image)}" />
    <meta name="twitter:image:alt" content="${escape(metadata.sk.imageAlt)}" />
    <!-- metadata:end -->`;
}
const replaceMetadata = (html: string, page: SitePage, siteUrl: string) =>
  html.replace(
    /<!-- metadata:start -->[\s\S]*?<!-- metadata:end -->/,
    metadataHtml(page, siteUrl),
  );
export function siteMetadataPlugin(siteUrl: string): Plugin {
  let config: ResolvedConfig;
  return {
    name: "wedma-static-metadata",
    configResolved(value) {
      config = value;
    },
    transformIndexHtml: {
      order: "pre",
      handler(html, context) {
        const path = context.originalUrl?.split("?")[0] ?? context.path;
        const page = path
          .replace(/\/$/, "")
          .endsWith("/ochrana-osobnych-udajov")
          ? "privacy"
          : path.replace(/\/$/, "").endsWith("/kontakt")
            ? "contact"
            : "home";
        return replaceMetadata(html, page, siteUrl);
      },
    },
    async closeBundle() {
      if (config.command !== "build") return;
      const output = resolve(config.root, config.build.outDir);
      const html = await readFile(resolve(output, "index.html"), "utf8");
      for (const page of ["contact", "privacy"] as const) {
        const directory = resolve(output, pageSlugs[page]);
        await mkdir(directory, { recursive: true });
        const copy = metadata.sk[page];
        const fallback = `<noscript><main style="font-family:Arial;padding:3rem;max-width:55rem;margin:auto"><h1>${escape(copy.title)}</h1><p>${escape(copy.description)}</p><p>Telefón: <a href="tel:+421911511299">+421 911 511 299</a></p><a href="${escape(new URL(siteUrl).pathname)}">WEDMA</a></main></noscript>`;
        await writeFile(
          resolve(directory, "index.html"),
          replaceMetadata(html, page, siteUrl).replace(
            /<noscript\b[^>]*>[\s\S]*?<\/noscript\s*>/,
            fallback,
          ),
        );
      }
      const urls = Object.values(pageSlugs)
        .map(
          (slug) =>
            `<url><loc>${escape(new URL(slug, siteUrl).href)}</loc></url>`,
        )
        .join("");
      await writeFile(
        resolve(output, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>\n`,
      );
      await writeFile(
        resolve(output, "robots.txt"),
        `User-agent: *\nAllow: /\nSitemap: ${new URL("sitemap.xml", siteUrl).href}\n`,
      );
    },
  };
}
