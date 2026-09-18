import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";
import { translations } from "../src/content/translations.ts";
import { metrics } from "../src/content/metrics.ts";
import { CONTACT, SECTION_IDS, NAVIGATION } from "../src/content/config.ts";
const normalize = (text) => text.replace(/\s+/g, " ").trim();
const brief = normalize(
  readFileSync(
    new URL("../docs/revision-2026-09-18.md", import.meta.url),
    "utf8",
  ) +
    "\n" +
    readFileSync(new URL("../docs/brief.md", import.meta.url), "utf8") +
    "\n" +
    readFileSync(
      new URL("../docs/revision-2026-09-13.md", import.meta.url),
      "utf8",
    ) +
    "\n" +
    readFileSync(new URL("../docs/contact-brief.md", import.meta.url), "utf8") +
    "\n" +
    readFileSync(
      new URL("../docs/how-it-works-brief.md", import.meta.url),
      "utf8",
    ),
);
let count = 0;
const verify = (text) => {
  assert.ok(
    brief.includes(normalize(text)),
    `Text does not match supplied brief: ${text}`,
  );
  count++;
};
for (const language of ["sk", "en"]) {
  const t = translations[language];
  verify(t.hero.fixed);
  t.hero.phrases.forEach(verify);
  for (const name of ["mission", "platform", "why", "results"]) {
    const section = t[name];
    verify(section.label);
    verify(section.heading);
    if (section.body) verify(section.body);
    for (const card of section.cards ?? []) Object.values(card).forEach(verify);
    for (const benefit of section.benefits ?? [])
      Object.values(benefit).forEach(verify);
  }
  verify(t.how.label);
  verify(t.how.heading + " " + t.how.lead);
  t.how.steps.forEach((step) => Object.values(step).forEach(verify));
  [...t.how.documents, ...t.how.groups, ...t.how.alerts].forEach(verify);
  assert.equal(t.how.steps.length, 3);
  verify(t.cta.heading + t.cta.highlight);
  verify(t.cta.body);
  verify(t.footer.heading);
  for (const key of [
    "heading",
    "body",
    "label",
    "hint",
    "select",
    "placeholder",
    "consent",
    "submit",
    "sending",
    "success",
  ])
    verify(t.contact[key]);
  Object.values(t.contact.fields).forEach(verify);
  t.contact.interests.forEach(verify);
  verify(t.contact.failure + " info@wedma.sk.");
  for (const metric of metrics[language]) {
    [metric.value, metric.label, metric.description].forEach(verify);
    assert.equal(
      metric.display.join(" "),
      metric.value,
      "Visual grouping preserves the supplied metric",
    );
    assert.ok(!metric.value.includes("[X]"));
  }
  assert.equal(metrics[language].length, 3);
}
assert.deepEqual(SECTION_IDS, [
  "uvod",
  "nasa-misia",
  "co-je-wedma",
  "preco-wedma",
  "meratelne-vysledky",
  "ako-to-funguje",
  "ukazka",
  "kontakt",
  "footer",
]);
assert.equal(
  NAVIGATION[NAVIGATION.findIndex((item) => item.key === "results") + 1].target,
  "/#ako-to-funguje",
);
assert.equal(CONTACT.target, "/kontakt");
assert.equal(CONTACT.emailTarget, "mailto:info@wedma.sk");
assert.equal(CONTACT.phoneTarget, "tel:+421911511299");
assert.equal(CONTACT.company, "WEDMA s.r.o.");
assert.equal(CONTACT.person, "Lukáš Galo");
const manifest = JSON.parse(
  readFileSync(new URL("../docs/asset-manifest.json", import.meta.url), "utf8"),
);
for (const [name, sha] of Object.entries(manifest))
  assert.equal(
    createHash("sha256")
      .update(
        readFileSync(new URL(`../public/assets/${name}`, import.meta.url)),
      )
      .digest("hex"),
    sha,
    `Original asset changed: ${name}`,
  );
console.log(
  `PASS: ${count} supplied content strings in SK/EN, three client-supplied metrics, shared contacts, stable section IDs and ${Object.keys(manifest).length} original assets.`,
);
