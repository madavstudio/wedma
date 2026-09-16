import { useId, useMemo, useRef } from "react";
import missionSource from "../assets/mission.svg?raw";
import dataSource from "../assets/data.svg?raw";
import { useInView, useLanguage, useMotion } from "../hooks/site";
import { missionEnglish } from "../content/illustration-labels";
function namespaceSvg(source: string, prefix: string) {
  return source
    .replace(/id="([^"]+)"/g, `id="${prefix}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${prefix}-$1)`)
    .replace("<svg ", '<svg aria-hidden="true" focusable="false" ');
}
const signalPaths = [
  "M110 180H470L550 260V420H557",
  "M250 550H400L470 620V665H557",
  "M55 680H285L415 733",
  "M827 120V230L930 277",
  "M1050 170H1170L1260 240",
  "M1550 540H1240L1168 420H1097",
  "M1630 1010H1300L1240 733",
  "M827 1170V900",
  "M380 1100V1010L620 988",
  "M1530 170V300H1400",
];
export function MissionIllustration() {
  const { lang } = useLanguage();
  const { running } = useMotion();
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref);
  const uid = useId().replace(/:/g, "");
  const source = useMemo(() => {
    let svg = missionSource.replaceAll("#F9801C", "#F2801E");
    if (lang === "en")
      for (const [sk, en] of Object.entries(missionEnglish))
        svg = svg.replaceAll(`>${sk}<`, `>${en}<`);
    return namespaceSvg(svg, `mission-${uid}`);
  }, [lang, uid]);
  return (
    <figure
      ref={ref}
      className="mission-illustration"
      data-animating={running && visible}
    >
      <div className="mission-art">
        <svg
          className="mission-signals"
          viewBox="0 0 1654 1190"
          fill="none"
          aria-hidden="true"
        >
          {signalPaths.map((d, i) => (
            <g key={d}>
              <path
                d={d}
                stroke="white"
                strokeOpacity=".055"
                strokeWidth="1.5"
              />
              <path
                className="signal-pulse"
                d={d}
                pathLength="100"
                stroke={i % 3 === 0 ? "#F2801E" : "white"}
                strokeOpacity={i % 3 === 0 ? ".2" : ".15"}
                strokeWidth="2.5"
                strokeDasharray="5 95"
                style={{
                  animationDelay: `-${i * 0.61}s`,
                  animationDuration: `${5.2 + (i % 3) * 0.65}s`,
                }}
              />
            </g>
          ))}
        </svg>
        <div
          className="inline-art"
          dangerouslySetInnerHTML={{ __html: source }}
        />
      </div>
    </figure>
  );
}
export function DataIllustration() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const { running } = useMotion();
  const uid = useId().replace(/:/g, "");
  const source = useMemo(() => namespaceSvg(dataSource, `data-${uid}`), [uid]);
  return (
    <div
      ref={ref}
      className="data-illustration inline-art"
      data-animating={running && visible}
      dangerouslySetInnerHTML={{ __html: source }}
    />
  );
}
