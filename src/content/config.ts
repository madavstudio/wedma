import { sitePath } from "../sitePaths.ts";
export const CONTACT = {
  target: sitePath("/kontakt"),
  emailTarget: "mailto:info@wedma.sk",
  email: "info@wedma.sk",
  company: "WEDMA s.r.o.",
  person: "Lukáš Galo",
  phone: "+421 911 511 299",
  phoneTarget: "tel:+421911511299",
} as const;
export const SECTION_IDS = [
  "uvod",
  "nasa-misia",
  "co-je-wedma",
  "preco-wedma",
  "meratelne-vysledky",
  "ako-to-funguje",
  "ukazka",
  "kontakt",
  "ochrana-osobnych-udajov",
  "footer",
] as const;
export const NAVIGATION = [
  { key: "solutions", target: sitePath("/#co-je-wedma") },
  { key: "why", target: sitePath("/#preco-wedma") },
  { key: "about", target: sitePath("/#nasa-misia") },
  { key: "results", target: sitePath("/#meratelne-vysledky") },
  { key: "how", target: sitePath("/#ako-to-funguje") },
  { key: "contact", target: CONTACT.target },
] as const;
export const ASSETS = sitePath("/assets/");
