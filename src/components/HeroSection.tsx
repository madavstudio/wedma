import { useEffect, useRef, useState } from "react";
import { useInView, useLanguage, useMotion } from "../hooks/site";
import { Button } from "./shared";
import { GeometryScene } from "./GeometryScene";
export function HeroTextRotator() {
  const { t } = useLanguage();
  const { running, reduced } = useMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!running || !visible) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % 3), 2500);
    return () => clearInterval(timer);
  }, [running, visible]);
  return (
    <>
      <span className="sr-only">
        {t.hero.connector} {t.hero.phrases.join(" ")}
      </span>
      <span
        ref={ref}
        className={`rotator ${reduced ? "rotator--static" : ""}`}
        aria-hidden="true"
      >
        {t.hero.phrases.map((phrase, i) => (
          <span
            key={i}
            className={`rotator-line ${i === index ? "is-current" : i === (index + 2) % 3 ? "is-previous" : "is-next"}`}
          >
            {t.hero.connector}
            {"\u00a0"}
            {phrase}
          </span>
        ))}
      </span>
    </>
  );
}
export function HeroSection() {
  const { t } = useLanguage();
  const { running } = useMotion();
  const content = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const visible = useInView(stage);
  useEffect(() => {
    const el = content.current;
    if (!el) return;
    let frame = 0;
    const draw = () => {
      frame = 0;
      const mobile = window.innerWidth < 768;
      const p = running
        ? Math.min(1, Math.max(0, (window.scrollY - 30) / (mobile ? 430 : 300)))
        : 0;
      const e = p * p * (3 - 2 * p);
      el.style.setProperty(
        "--hero-drift",
        `${running && !mobile ? Math.min(window.scrollY, 330) * 0.65 : 0}px`,
      );
      el.style.setProperty("--hero-scale", String(1 - e * 0.12));
      el.style.setProperty("--hero-opacity", String(1 - e));
      el.style.setProperty(
        "--hero-blur",
        `${Math.max(0, (p - 0.62) / 0.38) * 12}px`,
      );
      el.inert = p >= 0.99;
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
      el.inert = false;
    };
  }, [running]);
  return (
    <section id="uvod" className="hero" aria-labelledby="hero-heading">
      <GeometryScene />
      <div className="hero-shade" />
      <div ref={stage} className="hero-stage">
        <div ref={content} className="hero-content">
          <p className="eyebrow">{t.slogan}</p>
          <h1 id="hero-heading">
            <span className="hero-fixed">{t.hero.fixed}</span>
            <HeroTextRotator />
          </h1>
          <Button>{t.demo}</Button>
          <a
            className="scroll-indicator"
            href="#nasa-misia"
            aria-label={t.access.scroll}
            data-animating={running && visible}
          >
            <span className="scroll-mouse" aria-hidden="true">
              <span className="scroll-wheel" />
            </span>
          </a>
        </div>
      </div>
      <div className="hero-continuation" aria-hidden="true" />
    </section>
  );
}
