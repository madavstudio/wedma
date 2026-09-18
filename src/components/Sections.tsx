import { useRef } from "react";
import { useInView, useLanguage, useMotion, useStickyFit } from "../hooks/site";
import { metrics } from "../content/metrics";
import { Button, SectionLabel, BenefitIcon } from "./shared";
import { MissionIllustration, DataIllustration } from "./Illustrations";
import { GeometryScene } from "./GeometryScene";
import { PlatformIllustration } from "./PlatformIllustration";
import { useSectionTheme } from "../hooks/useSectionTheme";
export function MissionSection() {
  const { t } = useLanguage();
  return (
    <section
      id="nasa-misia"
      className="section mission dark"
      aria-labelledby="mission-heading"
    >
      <div className="container mission-grid">
        <MissionIllustration />
        <div className="mission-copy">
          <SectionLabel>{t.mission.label}</SectionLabel>
          <h2 id="mission-heading">{t.mission.heading}</h2>
          <p>{t.mission.body}</p>
        </div>
      </div>
    </section>
  );
}
const moduleConnections = [
  "M200 110H320L344 86H456L480 110H600",
  "M600 110H720L744 134H856L880 110H1000",
];
export function PlatformSection() {
  const { t } = useLanguage();
  const { running } = useMotion();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  return (
    <section
      id="co-je-wedma"
      className="section platform"
      aria-labelledby="platform-heading"
    >
      <div className="container">
        <div className="section-intro">
          <SectionLabel>{t.platform.label}</SectionLabel>
          <h2 id="platform-heading">{t.platform.heading}</h2>
          <p>{t.platform.body}</p>
        </div>
        <div
          ref={ref}
          className="platform-system"
          data-animating={running && visible}
        >
          <div className="platform-connections" aria-hidden="true">
            <svg viewBox="0 0 1200 220" preserveAspectRatio="none" fill="none">
              {moduleConnections.map((d, i) => (
                <g className={`platform-trace platform-trace--${i}`} key={d}>
                  <path d={d} vectorEffect="non-scaling-stroke" />
                  <path
                    className="platform-pulse"
                    d={d}
                    pathLength="100"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              ))}
            </svg>
          </div>
          <div className="platform-grid">
            {t.platform.cards.map((card, i) => (
              <article
                className={`platform-module platform-module--${i}`}
                key={i}
              >
                <div className="platform-symbol" aria-hidden="true">
                  <PlatformIllustration index={i} />
                  <span className="module-index">0{i + 1}</span>
                </div>
                <h3>{card.title}</h3>
                <p className="platform-benefit">{card.benefit}</p>
                <p className="platform-description">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export function WhyWedmaSection() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  useSectionTheme(ref);
  return (
    <section
      ref={ref}
      id="preco-wedma"
      className="section why"
      aria-labelledby="why-heading"
    >
      <div className="container">
        <div className="section-intro">
          <SectionLabel>{t.why.label}</SectionLabel>
          <h2 id="why-heading">{t.why.heading}</h2>
        </div>
        <div className="why-grid">
          <DataIllustration />
          {t.why.benefits.map((benefit, i) => (
            <article className={`benefit benefit--${i}`} key={i}>
              <BenefitIcon index={i} />
              <h3>{benefit.title}</h3>
              <p>{benefit.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function ResultCard({ index }: { index: number }) {
  const { lang } = useLanguage();
  const item = metrics[lang][index];
  const ref = useRef<HTMLElement>(null);
  const fits = useStickyFit(ref, lang);
  return (
    <article
      ref={ref}
      className={`result-card ${fits ? "can-stick" : ""}`}
      style={{ zIndex: index + 1 }}
    >
      <div className="result-card-top">
        <div className="metric">{item.value}</div>
        <h3>{item.label}</h3>
      </div>
      <p>{item.description}</p>
      <span className="result-index" aria-hidden="true">
        0{index + 1} / 0{metrics[lang].length}
      </span>
    </article>
  );
}
export function ResultsSection() {
  const { t, lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const fits = useStickyFit(ref, lang);
  return (
    <section
      id="meratelne-vysledky"
      className="section results"
      aria-labelledby="results-heading"
    >
      <div className="container results-grid">
        <div ref={ref} className={`results-copy ${fits ? "can-stick" : ""}`}>
          <SectionLabel>{t.results.label}</SectionLabel>
          <h2 id="results-heading">{t.results.heading}</h2>
        </div>
        <div className="results-panel">
          {metrics[lang].map((_, i) => (
            <ResultCard key={i} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
export function DemoCtaSection() {
  const { t } = useLanguage();
  return (
    <section
      id="ukazka"
      className="demo-section"
      aria-labelledby="demo-heading"
    >
      <div className="demo-panel">
        <GeometryScene variant="cta" />
        <div className="demo-shade" />
        <div className="demo-copy">
          <h2 id="demo-heading">
            {t.cta.heading}
            <span className="highlight">{t.cta.highlight}</span>
          </h2>
          <p>{t.cta.body}</p>
          <Button variant="black">{t.demo}</Button>
        </div>
      </div>
    </section>
  );
}
