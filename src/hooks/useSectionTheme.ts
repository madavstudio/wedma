import { useLayoutEffect, useRef } from "react";
import type { RefObject } from "react";
import { useMotion } from "./site";

const linear = (channel: number) => {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};
const encoded = (luminance: number) =>
  255 *
  (luminance <= 0.0031308
    ? luminance * 12.92
    : 1.055 * luminance ** (1 / 2.4) - 0.055);

/** Paint only on scroll/resize, without a per-frame React render. */
export function useSectionTheme(ref: RefObject<HTMLElement | null>) {
  const { paused, reduced } = useMotion();
  const previous = useRef<number | null>(null);

  useLayoutEffect(() => {
    const section = ref.current;
    if (!section) return;
    let frame = 0;
    let inView = true;

    const paint = () => {
      frame = 0;
      if (document.hidden || document.body.style.position === "fixed") return;
      if (paused && previous.current !== null) return;
      const height = window.innerHeight;
      const top = section.getBoundingClientRect().top;
      const position = Math.max(
        0,
        Math.min(1, (height * 0.95 - top) / (height * 0.65)),
      );
      const progress =
        reduced || paused
          ? Number(position >= 0.3)
          : position * position * (3 - 2 * position);
      if (previous.current === progress) return;
      previous.current = progress;

      const background = Math.round(255 - 238 * progress);
      const luminance = linear(background);
      // Switch text polarity at the point where both black and white meet AA.
      // Interpolating white text into black text would erase contrast halfway.
      const dark = luminance < 0.179;
      const muted = dark
        ? Math.min(
            255,
            Math.max(156, Math.ceil(encoded(4.5 * (luminance + 0.05) - 0.05))),
          )
        : Math.max(
            0,
            Math.min(96, Math.floor(encoded((luminance + 0.05) / 4.5 - 0.05))),
          );

      section.style.setProperty(
        "--why-background",
        progress === 1
          ? "var(--surface-graphite)"
          : `rgb(${background} ${background} ${background})`,
      );
      section.style.setProperty("--why-foreground", dark ? "#fff" : "#000");
      section.style.setProperty(
        "--why-muted",
        `rgb(${muted} ${muted} ${muted})`,
      );
      section.style.setProperty("--why-line", dark ? "#ffffff24" : "#00000024");
      section.dataset.themeProgress = progress.toFixed(3);
    };
    const schedule = () => {
      if (!frame && inView) frame = requestAnimationFrame(paint);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      // Also settle the endpoint when the section leaves the viewport.
      if (!frame) frame = requestAnimationFrame(paint);
    });
    const resize = new ResizeObserver(() => {
      if (!frame) frame = requestAnimationFrame(paint);
    });
    observer.observe(section);
    resize.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    document.addEventListener("visibilitychange", schedule);
    paint();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [ref, paused, reduced]);
}
