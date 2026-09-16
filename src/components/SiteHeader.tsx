import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ASSETS, NAVIGATION, SECTION_IDS } from "../content/config";
import { useLanguage } from "../hooks/site";
import { Arrow, Button, LanguageSwitcher } from "./shared";
export function SiteHeader({ contactPage = false }: { contactPage?: boolean }) {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(
    () => contactPage || window.scrollY > 60,
  );
  const [active, setActive] = useState("uvod");
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const measure = () =>
      setCompact(
        window.innerWidth <
          Math.max(
            1320,
            parseFloat(getComputedStyle(document.documentElement).fontSize) *
              82.5,
          ),
      );
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.documentElement);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(contactPage || window.scrollY > 60);
      let current = contactPage ? "kontakt" : "uvod";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (
          el &&
          el.getClientRects().length > 0 &&
          el.getBoundingClientRect().top <= window.innerHeight * 0.38
        )
          current = id;
      }
      setActive(current);
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
    };
  }, [contactPage]);
  useEffect(() => {
    if (!open) return;
    const el = dialog.current;
    if (!el) return;
    const y = window.scrollY;
    const triggerElement = trigger.current;
    const previous = document.body.style.cssText;
    el.showModal();
    document.body.style.position = "fixed";
    document.body.style.top = `-${y}px`;
    document.body.style.width = "100%";
    const resize = () => {
      if (
        window.innerWidth >=
        Math.max(
          1320,
          parseFloat(getComputedStyle(document.documentElement).fontSize) *
            82.5,
        )
      )
        setOpen(false);
    };
    window.addEventListener("resize", resize);
    return () => {
      el.close();
      const restoredY = -parseFloat(document.body.style.top) || y;
      document.body.style.cssText = previous;
      window.scrollTo({ top: restoredY, behavior: "instant" });
      triggerElement?.focus({ preventScroll: true });
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  return (
    <header
      ref={headerRef}
      className={`site-header ${scrolled ? "is-scrolled" : ""} ${compact ? "is-compact" : ""}`}
    >
      <a href="/#uvod" className="brand" aria-label={t.access.logo}>
        <img
          className="nav-symbol nav-symbol--initial"
          src={`${ASSETS}wedma-symbol-color-dark.png`}
          width="1080"
          height="585"
          alt=""
          fetchPriority="high"
        />
        <img
          className="nav-symbol nav-symbol--scrolled"
          src={`${ASSETS}wedma-symbol-color.png`}
          width="1080"
          height="585"
          alt=""
        />
      </a>
      <nav className="desktop-navigation" aria-label={t.access.nav}>
        {NAVIGATION.map((item) => (
          <a
            key={item.key}
            href={item.target}
            aria-current={
              item.target === `/#${active}` ||
              (active === "kontakt" && item.target === "/kontakt")
                ? "location"
                : undefined
            }
          >
            {t.nav[item.key]}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <LanguageSwitcher />
        <Button variant="nav">{t.demo}</Button>
      </div>
      <button
        ref={trigger}
        className="menu-trigger"
        aria-label={t.access.open}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(true)}
      >
        <span className="hamburger" aria-hidden="true" />
      </button>
      <dialog
        ref={dialog}
        id="mobile-navigation"
        className="mobile-menu"
        aria-label={t.access.nav}
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        <div className="mobile-menu-inner">
          <div className="mobile-menu-top">
            <a
              href="/#uvod"
              className="mobile-menu-brand"
              aria-label={t.access.logo}
              onClick={() => setOpen(false)}
            >
              <img
                src={`${ASSETS}wedma-symbol-color.png`}
                width="72"
                height="39"
                alt=""
              />
            </a>
            <div className="mobile-menu-tools">
              <LanguageSwitcher />
              <button
                autoFocus
                className="menu-close"
                aria-label={t.access.close}
                onClick={() => setOpen(false)}
              >
                <span className="menu-cross" aria-hidden="true" />
              </button>
            </div>
          </div>
          <nav aria-label={t.access.nav}>
            {NAVIGATION.map((item) => (
              <a
                key={item.key}
                href={item.target}
                aria-current={
                  item.target === `/#${active}` ||
                  (active === "kontakt" && item.target === "/kontakt")
                    ? "location"
                    : undefined
                }
                onClick={(event) => {
                  if (item.target.startsWith("#")) event.preventDefault();
                  setOpen(false);
                }}
              >
                {t.nav[item.key]}
                <Arrow />
              </a>
            ))}
          </nav>
          <div className="mobile-menu-bottom">
            <p className="eyebrow">{t.slogan}</p>
            <Button variant="black" onClick={() => setOpen(false)}>
              {t.demo}
            </Button>
          </div>
        </div>
      </dialog>
    </header>
  );
}
