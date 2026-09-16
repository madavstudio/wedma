import { useEffect, useId, useRef } from "react";
import { ASSETS } from "../content/config";
import { useMotion } from "../hooks/site";

const diamond =
  "M0-62Q5-62 11-59L110-6Q121 0 110 6L11 59Q0 65-11 59L-110 6Q-121 0-110-6L-11-59Q-5-62 0-62Z";
export function ContactIllustration() {
  const id = `contact-${useId().replace(/:/g, "")}`;
  const ref = useRef<SVGSVGElement>(null);
  const { reduced } = useMotion();
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    if (reduced) {
      svg.dataset.entered = "true";
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          svg.dataset.entered = "true";
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(svg);
    return () => observer.disconnect();
  }, [reduced]);
  return (
    <svg
      ref={ref}
      className="contact-illustration"
      viewBox="0 0 640 420"
      aria-hidden="true"
      focusable="false"
      fill="none"
    >
      <defs>
        <radialGradient id={`${id}-fade`}>
          <stop stopColor="white" />
          <stop offset=".55" stopColor="white" stopOpacity=".75" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id={`${id}-grid`}>
          <rect width="640" height="420" fill={`url(#${id}-fade)`} />
        </mask>
        <linearGradient id={`${id}-surface`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#E6E6E6" />
        </linearGradient>
        <filter
          id={`${id}-shadow`}
          x="-30%"
          y="-50%"
          width="160%"
          height="220%"
        >
          <feDropShadow
            dx="0"
            dy="12"
            stdDeviation="10"
            floodColor="#191919"
            floodOpacity=".24"
          />
        </filter>
      </defs>
      <g
        mask={`url(#${id}-grid)`}
        stroke="#FFFFFF"
        strokeOpacity=".18"
        strokeWidth=".8"
      >
        {Array.from({ length: 19 }, (_, i) => (
          <g key={i} className={i % 2 ? "contact-grid-fine" : undefined}>
            <path d={`M${i * 48 - 400} 0l780 420`} />
            <path d={`M${i * 48 - 100} 0l-780 420`} />
          </g>
        ))}
      </g>
      <path
        d="M199 157 534 339"
        stroke="#FFFFFF"
        strokeOpacity=".4"
        strokeWidth="1.5"
      />
      <path
        className="contact-impulse"
        d="M199 157 534 339"
        pathLength="100"
        stroke="#F2801E"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {[
        { x: 198, y: 144, scale: 1 },
        { x: 348, y: 237, scale: 0.55 },
        { x: 438, y: 287, scale: 0.55 },
        { x: 528, y: 337, scale: 0.55 },
      ].map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y}) scale(${p.scale})`}>
          <g className={`contact-platform contact-platform--${i}`}>
            <g filter={`url(#${id}-shadow)`}>
              <path
                d={diamond}
                transform="translate(0 18)"
                fill={i === 0 ? "#F2801E" : "#E7E8E8"}
                stroke={i === 0 ? "#DC741D" : "#C9CCCE"}
              />
              <path
                d="M-116 0V18L0 80 116 18V0L0 62Z"
                fill={i === 0 ? "#F2801E" : "#ECEDED"}
              />
              <path
                d="M0 62V80L116 18V0Z"
                fill={i === 0 ? "#DF751D" : "#E2E4E4"}
              />
              <path
                d={diamond}
                fill={`url(#${id}-surface)`}
                stroke="#fff"
                strokeWidth="1.25"
              />
            </g>
            <g transform="matrix(.85 .46 -.85 .46 0 0)">
              {i === 0 ? (
                <image
                  href={`${ASSETS}wedma-symbol-color.png`}
                  x="-60"
                  y="-32.5"
                  width="120"
                  height="65"
                />
              ) : (
                <g
                  stroke="#34383D"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {i === 1 ? (
                    <>
                      <path d="M-30-22H30V16H4L-14 30V16H-30Z" />
                      <path d="M-16-7H16M-16 3H6" stroke="#F2801E" />
                    </>
                  ) : i === 2 ? (
                    <>
                      <rect x="-27" y="-24" width="54" height="50" rx="6" />
                      <path d="M-14-32V-17M14-32V-17M-27-10H27" />
                      <path d="m-10 7 7 7 15-18" stroke="#F2801E" />
                    </>
                  ) : (
                    <>
                      <rect x="-32" y="-22" width="64" height="44" rx="5" />
                      <path d="m-30-17 30 23 30-23" stroke="#F2801E" />
                    </>
                  )}
                </g>
              )}
            </g>
          </g>
        </g>
      ))}
    </svg>
  );
}
