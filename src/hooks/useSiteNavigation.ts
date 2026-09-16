import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLanguage } from "./site";
const contactPath = (path: string) => path.replace(/\/$/, "") === "/kontakt";
export function useSiteNavigation() {
  const { lang, t } = useLanguage();
  const [route, setRoute] = useState(() => ({
    contact: contactPath(location.pathname) || location.hash === "#kontakt",
    revision: 0,
  }));
  const pending = useRef<{
    hash: string;
    y?: number;
    focus: boolean;
    smooth: boolean;
  }>({ hash: location.hash, focus: false, smooth: false });
  useEffect(() => {
    if (location.hash === "#kontakt")
      history.replaceState(null, "", "/kontakt");
    const click = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (!link || link.target || link.hasAttribute("download")) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin) return;
      const contact = contactPath(url.pathname) || url.hash === "#kontakt";
      if (
        !contact &&
        !(url.pathname === "/" && url.hash && url.hash !== "#main-content")
      )
        return;
      event.preventDefault();
      history.replaceState(
        { ...history.state, wedmaY: scrollY },
        "",
        location.href,
      );
      const next = contact ? "/kontakt" : `/${url.hash}`;
      if (location.pathname + location.hash !== next)
        history.pushState(null, "", next);
      pending.current = {
        hash: contact ? "" : url.hash,
        focus: true,
        smooth: contact === route.contact,
      };
      setRoute((previous) => ({ contact, revision: previous.revision + 1 }));
    };
    const back = () => {
      pending.current = {
        hash: location.hash,
        y:
          typeof history.state?.wedmaY === "number"
            ? history.state.wedmaY
            : undefined,
        focus: true,
        smooth: false,
      };
      setRoute((previous) => ({
        contact: contactPath(location.pathname),
        revision: previous.revision + 1,
      }));
    };
    document.addEventListener("click", click);
    window.addEventListener("popstate", back);
    const oldRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    return () => {
      document.removeEventListener("click", click);
      window.removeEventListener("popstate", back);
      history.scrollRestoration = oldRestoration;
    };
  }, [route.contact]);
  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      const nav = pending.current;
      if (route.contact && nav.focus)
        document
          .getElementById("contact-heading")
          ?.focus({ preventScroll: true });
      if (nav.y !== undefined)
        window.scrollTo({ top: nav.y, behavior: "instant" });
      else if (route.contact)
        window.scrollTo({
          top: 0,
          behavior:
            nav.smooth && document.documentElement.dataset.motion !== "off"
              ? "smooth"
              : "instant",
        });
      else {
        let id = "uvod";
        try {
          id = decodeURIComponent(nav.hash.slice(1)) || "uvod";
        } catch {
          /* Malformed hashes fall back to the hero. */
        }
        document
          .getElementById(id)
          ?.scrollIntoView({
            behavior:
              nav.smooth && document.documentElement.dataset.motion !== "off"
                ? "smooth"
                : "instant",
          });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [route]);
  useEffect(() => {
    document.title = route.contact
      ? `${lang === "sk" ? "Kontakt" : "Contact"} — WEDMA`
      : t.title;
  }, [route.contact, lang, t.title]);
  return route.contact;
}
