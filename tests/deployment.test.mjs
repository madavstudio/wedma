import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { metadata, pageSlugs } from "../src/content/metadata.ts";

const read = (path) => readFile(new URL("../" + path, import.meta.url), "utf8");
const unescape = (value) => value.replaceAll("&amp;", "&");
const readAttribute = (html, prefix) => {
  const found = html.match(new RegExp(prefix + '"([^"]+)"'));
  assert.ok(found, "Missing " + prefix);
  return unescape(found[1]);
};
for (const page of Object.keys(pageSlugs)) {
  test(
    page + ": route has crawler-readable WEDMA metadata and working assets",
    async () => {
      const slug = pageSlugs[page];
      const html = await read(
        "dist/" + (slug ? slug + "/" : "") + "index.html",
      );
      assert.ok(
        html.includes("<title>" + metadata.sk[page].title + "</title>"),
      );
      assert.ok(
        html.includes('content="' + metadata.sk[page].description + '"'),
      );
      assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1);
      const canonical = new URL(readAttribute(html, 'rel="canonical" href='));
      assert.equal(canonical.protocol, "https:");
      assert.ok(canonical.pathname.endsWith(slug));
      assert.equal(
        readAttribute(html, 'property="og:url" content='),
        canonical.href,
      );
      const image = new URL(
        readAttribute(html, 'property="og:image" content='),
      );
      assert.equal(image.origin, canonical.origin);
      assert.ok(html.includes('name="twitter:card" content="summary"'));
      assert.ok(html.includes('rel="apple-touch-icon"'));
      assert.ok(!html.includes("%BASE_URL%"));
      assert.ok(!html.includes("/src/main.tsx"));
      if (page !== "home")
        assert.ok(html.includes("<h1>" + metadata.sk[page].title + "</h1>"));
      const base = canonical.pathname.slice(
        0,
        canonical.pathname.length - slug.length,
      );
      for (const match of html.matchAll(/(?:src|href)="(\/[^"]+)"/g)) {
        const path = match[1];
        if (!/\.(?:js|css|svg|png|ico)$/.test(path)) continue;
        assert.ok(
          path.startsWith(base),
          "Asset must use the site base: " + path,
        );
        await access(
          new URL("../dist/" + path.slice(base.length), import.meta.url),
        );
      }
      const sitemap = await read("dist/sitemap.xml");
      assert.ok(sitemap.includes("<loc>" + canonical.href + "</loc>"));
    },
  );
}
test("Vercel serves distinct subpages and retains the contact function", async () => {
  const config = JSON.parse(await read("vercel.json"));
  assert.equal(config.framework, "vite");
  assert.equal(config.outputDirectory, "dist");
  assert.equal(config.trailingSlash, false);
  for (const slug of Object.values(pageSlugs).filter(Boolean)) {
    const route = config.rewrites.find((r) => r.source === "/" + slug);
    assert.equal(route?.destination, "/" + slug + "/index.html");
    await access(new URL("../dist" + route.destination, import.meta.url));
  }
  assert.ok(!config.rewrites.some((r) => r.source.includes("*")));
  await access(new URL("../api/contact.ts", import.meta.url));
});
test("favicon and share PNG exist at their declared sizes", async () => {
  for (const [file, size] of [
    ["favicon-16.png", 16],
    ["favicon-32.png", 32],
    ["apple-touch-icon.png", 180],
    ["icon-512.png", 512],
  ]) {
    const data = await readFile(new URL("../dist/" + file, import.meta.url));
    assert.equal(data.readUInt32BE(16), size);
    assert.equal(data.readUInt32BE(20), size);
  }
  assert.ok((await read("dist/favicon.svg")).includes("#fff"));
  const robots = await read("dist/robots.txt");
  assert.ok(robots.includes("Sitemap: https://"));
});
