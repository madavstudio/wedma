export const CONTACT = {
  target: "/kontakt",
  emailTarget: "mailto:info@wedma.sk",
  email: "info@wedma.sk",
  phone: "+421 904 418 299",
  phoneTarget: "tel:+421904418299",
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
  "footer",
] as const;
export const NAVIGATION = [
  { key: "solutions", target: "/#co-je-wedma" },
  { key: "why", target: "/#preco-wedma" },
  { key: "about", target: "/#nasa-misia" },
  { key: "results", target: "/#meratelne-vysledky" },
  { key: "how", target: "/#ako-to-funguje" },
  { key: "contact", target: CONTACT.target },
] as const;
export const ASSETS = "/assets/";
