import { useLayoutEffect, useRef } from "react";
import { useLanguage, useMotion } from "../hooks/site";
import { clamp, createHowScenePainter, howProgress } from "../hooks/howScene";
import { SectionLabel } from "./shared";
import { HowItWorksIllustration } from "./HowItWorksIllustration";
import "./how-it-works.css";

function ScrollWords({ text }: { text: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((word, i) => (
          <span key={i}>
            <span data-how-word>{word}</span>{" "}
          </span>
        ))}
      </span>
    </>
  );
}

function HowItWorksStep({ index }: { index: number }) {
  const { t } = useLanguage();
  const step = t.how.steps[index];
  return (
    <article
      className="how-step"
      id={`ako-to-funguje-krok-${index + 1}`}
      aria-labelledby={`how-step-${index + 1}-title`}
      data-how-step={index}
    >
      <div className="how-static-scene">
        <HowItWorksIllustration stage={index} />
      </div>
      <div className="how-step-copy">
        <span className="how-step-marker" aria-hidden="true" />
        <p className="how-step-label eyebrow">{step.label}</p>
        <h3 id={`how-step-${index + 1}-title`}>{step.title}</h3>
        <p className="how-step-body">{step.body}</p>
      </div>
    </article>
  );
}

export function HowItWorksSection() {
  const { t, lang } = useLanguage();
  const { paused, reduced } = useMotion();
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = ref.current;
    if (!section) return;
    const svg = section.querySelector<SVGSVGElement>("[data-how-animated]");
    const header = document.querySelector<HTMLElement>(".site-header");
    const intro = section.querySelector<HTMLElement>(".how-intro")!;
    const steps = [...section.querySelectorAll<HTMLElement>("[data-how-step]")];
    const copies = steps.map((step) =>
      step.querySelector<HTMLElement>(".how-step-copy")!,
    );
    const words = [...intro.querySelectorAll<HTMLElement>("[data-how-word]")];
    if (!svg) return;
    const paintScene = createHowScenePainter(svg);
    let anchors = [0, 1, 2],
      reading = 0,
      introTop = 0,
      introHeight = 1,
      scenePinStart = 0;
    let frame = 0,
      last = 0,
      current = 0,
      currentEntry = 1,
      initialized = false;
    let inView = true,
      enabled = true,
      needsMeasure = true;
    const measure = () => {
      const compact =
        innerWidth < 600 || (innerWidth < 1000 && innerHeight >= 600);
      section.dataset.compact = String(compact);
      const gutter = section
        .querySelector<HTMLElement>(".container")!
        .getBoundingClientRect().left;
      section.style.setProperty("--how-inline-bleed", `${gutter}px`);
      const headerBottom = header?.getBoundingClientRect().bottom ?? 100;
      const top = headerBottom + (compact ? 12 : 24);
      const available = Math.max(160, innerHeight - top - 24);
      const largestCopy = Math.max(...copies.map((copy) => copy.offsetHeight));
      const sceneHeight = compact
        ? Math.min(
            innerWidth < 600 ? 420 : 520,
            Math.max(160, available * 0.56),
            Math.max(160, available - largestCopy - 56),
          )
        : Math.min(780, available);
      section.style.setProperty("--how-sticky-top", `${top}px`);
      section.style.setProperty("--how-scene-height", `${sceneHeight}px`);
      section.style.setProperty(
        "--how-reading-height",
        `${Math.max(200, available - sceneHeight)}px`,
      );
      reading = compact
        ? top + sceneHeight + (available - sceneHeight) * 0.5
        : top + available * 0.5;
      section.dataset.readingLine = String(reading);
      const sticky = section.querySelector<HTMLElement>(".how-sticky-scene")!;
      scenePinStart =
        section.querySelector(".how-composition")!.getBoundingClientRect().top +
        scrollY +
        parseFloat(getComputedStyle(sticky).marginTop) -
        top;
      anchors = copies.map((el) => {
        const r = el.getBoundingClientRect();
        return r.top + scrollY + r.height * 0.5;
      });
      const r = intro.getBoundingClientRect();
      introTop = r.top + scrollY;
      introHeight = r.height;
      enabled = !paused && !reduced;
      needsMeasure = false;
    };
    const render = (time: number) => {
      frame = 0;
      if (document.hidden || document.body.style.position === "fixed") {
        last = 0;
        return;
      }
      if (needsMeasure) measure();
      section.dataset.scenePinned = String(
        enabled &&
          section.dataset.compact === "true" &&
          scrollY >= scenePinStart,
      );
      const target = howProgress(scrollY + reading, anchors);
      const entry = clamp(
        1 + (scrollY + reading - anchors[0]) / (innerHeight * 0.65),
      );
      const dt = last ? Math.min(64, time - last) : 16.7;
      last = time;
      // A short exponential tail settles in ~350ms. Large jumps resolve immediately.
      const snap = !initialized || Math.abs(target - current) > 1.2 || !enabled;
      const alpha = 1 - Math.exp(-dt / 90);
      current = snap ? target : current + (target - current) * alpha;
      currentEntry = snap
        ? entry
        : currentEntry + (entry - currentEntry) * alpha;
      if (Math.abs(target - current) < 0.001) current = target;
      if (Math.abs(entry - currentEntry) < 0.001) currentEntry = entry;
      initialized = true;
      if (enabled) paintScene(current, currentEntry);
      const active = Math.round(current);
      section.dataset.activeStep = String(active + 1);
      steps.forEach((step, i) => (step.dataset.active = String(i === active)));
      const reveal = enabled
        ? clamp(
            (scrollY + innerHeight * 0.86 - introTop) /
              (introHeight + innerHeight * 0.2),
          )
        : 1;
      words.forEach((word, i) => {
        const color = Math.round(
          176 + 79 * clamp((reveal - i / words.length) * 7),
        );
        word.style.color = `rgb(${color} ${color} ${color})`;
      });
      if (enabled && inView && (current !== target || currentEntry !== entry))
        frame = requestAnimationFrame(render);
      else last = 0;
    };
    const schedule = () => {
      if (!frame && inView && !document.hidden)
        frame = requestAnimationFrame(render);
    };
    const resized = () => {
      needsMeasure = true;
      schedule();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) {
          needsMeasure = true;
          initialized = false;
          schedule();
        } else {
          cancelAnimationFrame(frame);
          frame = 0;
          last = 0;
        }
      },
      { rootMargin: "100px" },
    );
    const resize = new ResizeObserver(resized);
    observer.observe(section);
    resize.observe(section);
    resize.observe(document.body);
    if (header) resize.observe(header);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resized, { passive: true });
    document.addEventListener("visibilitychange", schedule);
    render(performance.now());
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resized);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [lang, paused, reduced]);

  return (
    <section
      ref={ref}
      id="ako-to-funguje"
      className="how-it-works section dark"
      data-static={paused || reduced}
      aria-labelledby="how-heading"
    >
      <div className="container">
        <div className="how-intro">
          <SectionLabel>{t.how.label}</SectionLabel>
          <div className="how-intro-text">
            <h2 id="how-heading">
              <ScrollWords text={t.how.heading} />
            </h2>{" "}
            <p>
              <ScrollWords text={t.how.lead} />
            </p>
          </div>
        </div>
        <div className="how-composition">
          <div className="how-sticky-scene">
            <HowItWorksIllustration animated />
          </div>
          <div className="how-steps">
            {t.how.steps.map((_, i) => (
              <HowItWorksStep key={i} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
