import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { PropsWithChildren, RefObject } from "react";
import { translations } from "../content/translations";
import type { Language } from "../content/translations";
import { SECTION_IDS } from "../content/config";
export function readPreference(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function savePreference(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Session-only settings remain usable. */
  }
}
const LanguageContext = createContext({
  lang: "sk" as Language,
  t: translations.sk,
  setLanguage: (lang: Language) => {
    void lang;
  },
});
export function LanguageProvider({ children }: PropsWithChildren) {
  const [lang, setLang] = useState<Language>(() =>
    readPreference("wedma-language") === "en" ? "en" : "sk",
  );
  const anchor = useRef<{ id: string; offset: number } | null>(null);
  const setLanguage = (next: Language) => {
    if (next === lang) return;
    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => !!el && el.getClientRects().length > 0);
    const howSection = document.getElementById("ako-to-funguje");
    const howSteps = [
      ...document.querySelectorAll<HTMLElement>("[data-how-step]"),
    ];
    const inHowSteps =
      howSection &&
      howSteps.length &&
      howSteps[0].getBoundingClientRect().top < innerHeight * 0.7 &&
      howSection.getBoundingClientRect().bottom > innerHeight * 0.3;
    const nearestStep = inHowSteps
      ? howSteps.reduce((nearest, item) =>
          Math.abs(item.getBoundingClientRect().top - 160) <
          Math.abs(nearest.getBoundingClientRect().top - 160)
            ? item
            : nearest,
        )
      : null;
    const section =
      nearestStep ??
      sections.find((el) => el.getBoundingClientRect().bottom > 150) ??
      sections[0];
    if (section)
      anchor.current = {
        id: section.id,
        offset: section.getBoundingClientRect().top,
      };
    savePreference("wedma-language", next);
    setLang(next);
  };
  useLayoutEffect(() => {
    document.documentElement.lang = lang;
    document.title = translations[lang].title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", translations[lang].description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", translations[lang].title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", translations[lang].description);
    document
      .querySelector('meta[property="og:locale"]')
      ?.setAttribute("content", lang === "sk" ? "sk_SK" : "en_GB");
    if (anchor.current) {
      const el = document.getElementById(anchor.current.id);
      if (el) {
        const delta = el.getBoundingClientRect().top - anchor.current.offset;
        if (document.body.style.position === "fixed")
          document.body.style.top = `${parseFloat(document.body.style.top) - delta}px`;
        else window.scrollBy({ top: delta, behavior: "instant" });
      }
      anchor.current = null;
    }
  }, [lang]);
  return (
    <LanguageContext.Provider
      value={{ lang, t: translations[lang], setLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
export function useLanguage() {
  return useContext(LanguageContext);
}
const MotionContext = createContext({
  paused: false,
  reduced: false,
  running: true,
});
export function MotionProvider({ children }: PropsWithChildren) {
  const [reduced, setReduced] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const paused = false;
  const [visible, setVisible] = useState(() => !document.hidden);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    const visibility = () => setVisible(!document.hidden);
    query.addEventListener("change", update);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      query.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  useLayoutEffect(() => {
    document.documentElement.dataset.motion = paused || reduced ? "off" : "on";
    document.documentElement.dataset.visible = visible ? "yes" : "no";
  }, [paused, reduced, visible]);
  return (
    <MotionContext.Provider
      value={{
        paused,
        reduced,
        running: !paused && !reduced && visible,
      }}
    >
      {children}
    </MotionContext.Provider>
  );
}
export function useMotion() {
  return useContext(MotionContext);
}
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  margin = "0px",
) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => setVisible(entries[0].isIntersecting),
      { rootMargin: margin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, margin]);
  return visible;
}
export function useStickyFit(
  ref: RefObject<HTMLElement | null>,
  dependency: unknown,
) {
  const [fits, setFits] = useState(false);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const headerBottom =
        document.querySelector(".site-header")?.getBoundingClientRect()
          .bottom ?? 100;
      const top = headerBottom + 20;
      el.style.setProperty("--sticky-top", `${top}px`);
      setFits(el.offsetHeight < window.innerHeight - top - 20);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [ref, dependency]);
  return fits;
}
