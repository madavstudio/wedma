import { sitePath, localPath } from "../sitePaths";
import { updateMetadata } from "./useMetadata";
import type { SitePage } from "../content/metadata";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLanguage } from "./site";
import { PRIVACY_PATH } from "../content/privacy";

const pageFor = (path: string, hash = ""): SitePage => {
  const normalized = path.replace(/\/$/, "");
  if (normalized === PRIVACY_PATH) return "privacy";
  if (normalized === sitePath("/kontakt") || hash === "#kontakt")
    return "contact";
  return "home";
};
export function useSiteNavigation() {
  const { lang } = useLanguage();
  const [route, setRoute] = useState(() => ({
    page: pageFor(location.pathname, location.hash),
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
      history.replaceState(null, "", sitePath("/kontakt"));
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
      if (url.origin !== location.origin || url.hash === "#main-content")
        return;
      const page = pageFor(url.pathname, url.hash);
      if (page === "home" && localPath(url.pathname) !== "/") return;
      event.preventDefault();
      history.replaceState(
        { ...history.state, wedmaY: scrollY },
        "",
        location.href,
      );
      const next =
        page === "contact"
          ? sitePath("/kontakt")
          : page === "privacy"
            ? PRIVACY_PATH + url.hash
            : sitePath(`/${url.hash}`);
      if (location.pathname + location.hash !== next)
        history.pushState(null, "", next);
      pending.current = {
        hash: page === "contact" ? "" : url.hash,
        focus: true,
        smooth: page === route.page,
      };
      setRoute((previous) => ({ page, revision: previous.revision + 1 }));
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
        page: pageFor(location.pathname, location.hash),
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
  }, [route.page]);
  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      const nav = pending.current;
      let id =
        route.page === "privacy"
          ? "privacy-heading"
          : route.page === "contact"
            ? "contact-heading"
            : "uvod";
      try {
        if (nav.hash) id = decodeURIComponent(nav.hash.slice(1));
      } catch {
        /* Keep the page heading for malformed anchors. */
      }
      const target = document.getElementById(id);
      if (nav.focus && route.page !== "home")
        target?.focus({ preventScroll: true });
      if (nav.y !== undefined)
        window.scrollTo({ top: nav.y, behavior: "instant" });
      else if (route.page !== "home" && !nav.hash)
        window.scrollTo({ top: 0, behavior: "instant" });
      else
        target?.scrollIntoView({
          behavior:
            nav.smooth && document.documentElement.dataset.motion !== "off"
              ? "smooth"
              : "instant",
        });
    });
    return () => cancelAnimationFrame(frame);
  }, [route]);
  useEffect(() => {
    updateMetadata(route.page, lang);
  }, [route.page, lang]);
  return route.page;
}
