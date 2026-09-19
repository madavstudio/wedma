import { metadata, pageSlugs, type SitePage } from "../content/metadata";
import type { Language } from "../content/translations";
export function updateMetadata(page: SitePage, lang: Language) {
  const copy = metadata[lang][page];
  const set = (selector: string, value: string) =>
    document.querySelector(selector)?.setAttribute("content", value);
  const url = new URL(pageSlugs[page], import.meta.env.VITE_SITE_URL).href;
  document.title = copy.title;
  set('meta[name="description"]', copy.description);
  set('meta[property="og:title"]', copy.title);
  set('meta[property="og:description"]', copy.description);
  set('meta[property="og:locale"]', lang === "sk" ? "sk_SK" : "en_GB");
  set(
    'meta[property="og:locale:alternate"]',
    lang === "sk" ? "en_GB" : "sk_SK",
  );
  set('meta[property="og:url"]', url);
  set('meta[property="og:image:alt"]', metadata[lang].imageAlt);
  set('meta[name="twitter:title"]', copy.title);
  set('meta[name="twitter:description"]', copy.description);
  set('meta[name="twitter:image:alt"]', metadata[lang].imageAlt);
  document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
}
