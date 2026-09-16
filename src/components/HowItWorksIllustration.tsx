import { useId, useLayoutEffect, useRef } from "react";
import { useLanguage } from "../hooks/site";
import { createHowScenePainter } from "../hooks/howScene";

// The four documents keep their identities while their data joins the same hub.
const accents = ["#F8C14D", "#0094F3", "#00D23A"];
const inputAccents = ["#F2801E", "#0094F3", "#00D23A", "#F8C14D"];
const documents = [
  [112, 188],
  [244, 112],
  [376, 112],
  [508, 188],
];
const inputs = [
  "M112 240 310 540",
  "M244 164 310 540",
  "M376 164 310 540",
  "M508 240 310 540",
];

export function HowItWorksIllustration({
  stage = 0,
  animated = false,
}: {
  stage?: number;
  animated?: boolean;
}) {
  const { t } = useLanguage();
  const id = `how-${useId().replace(/:/g, "")}`;
  const ref = useRef<SVGSVGElement>(null);
  useLayoutEffect(() => {
    if (ref.current) createHowScenePainter(ref.current)(stage);
  }, [stage]);
  return (
    <svg
      ref={ref}
      className="how-scene"
      data-how-animated={animated || undefined}
      viewBox="0 50 620 840"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-card`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#1B1E21" />
          <stop offset="1" stopColor="#151719" />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop stopColor="#F2801E" stopOpacity=".14" />
          <stop offset="1" stopColor="#F2801E" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id={`${id}-side`}
          x1="95"
          y1="650"
          x2="525"
          y2="705"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#080808" />
          <stop offset=".5" stopColor="#252525" />
          <stop offset="1" stopColor="#0A0A0A" />
        </linearGradient>
        <linearGradient
          id={`${id}-top`}
          x1="310"
          y1="580"
          x2="310"
          y2="720"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#303030" />
          <stop offset="1" stopColor="#141414" />
        </linearGradient>
        <linearGradient id={`${id}-scan`}>
          <stop stopColor="#F2801E" stopOpacity="0" />
          <stop offset=".5" stopColor="#FFB16C" />
          <stop offset="1" stopColor="#F2801E" stopOpacity="0" />
        </linearGradient>
      </defs>

      <ellipse
        data-how-glow
        cx="310"
        cy="548"
        rx="290"
        ry="300"
        fill={`url(#${id}-glow)`}
      />
      <g
        data-how-input-base
        stroke="#34383D"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        {inputs.map((d) => (
          <path key={d} d={d} strokeOpacity=".55" />
        ))}
      </g>
      <g stroke="#F2801E" strokeWidth="1.8" strokeLinecap="round">
        {inputs.map((d, i) => (
          <path
            key={d}
            data-how-input
            stroke={inputAccents[i]}
            d={d}
            pathLength="100"
            strokeDasharray="100"
          />
        ))}
      </g>
      <g stroke="#FFBB80" strokeWidth="4" strokeLinecap="round">
        {inputs.map((d, i) => (
          <path
            key={d}
            data-how-signal={i}
            stroke={inputAccents[i]}
            d={d}
            pathLength="100"
            strokeDasharray=".5 99.5"
          />
        ))}
      </g>

      {documents.map(([x, y], i) => (
        <g
          key={i}
          data-how-document={i}
          data-x={x}
          data-y={y}
          transform={`translate(${x} ${y})`}
        >
          <rect
            x="-45"
            y="-48"
            width="90"
            height="104"
            rx="18"
            fill={`url(#${id}-card)`}
            stroke="#34383D"
            strokeWidth="1.25"
          />
          <g
            stroke="#E6E6E6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {i === 0 ? (
              <path d="M17 5V23H-17V-19H5" />
            ) : i === 1 ? (
              <path d="M0-13C-6-19-14-20-21-17V18C-13 15-6 17 0 22C6 17 13 15 21 18V-17C14-20 6-19 0-13ZM0-13V22" />
            ) : (
              <path d="M-17-23H8L20-11V25H-17Z" />
            )}
            <g data-how-document-lines stroke={inputAccents[i]} strokeWidth="2">
              {i === 0 ? (
                <path d="m-9-2 8 8 20-23M-8 15H6" />
              ) : i === 1 ? (
                <path d="M-14-7l7 2M-14 2l7 2M7-5l7-2M7 4l7-2" />
              ) : i === 2 ? (
                <path d="M8-23V-11H20M-8 0H10M-8 9H10M-8 18H2" />
              ) : (
                <path d="M8-23V-11H20M-9 0l3 3 5-6M5 1H12M-9 13l3 3 5-6M5 14H12" />
              )}
            </g>
          </g>
          <circle cx="28" cy="39" r="3" fill={inputAccents[i]} />
          <text
            data-how-document-label
            y="86"
            textAnchor="middle"
            fill="#C0C0C0"
          >
            {t.how.documents[i]}
          </text>
        </g>
      ))}

      <g data-how-scan opacity="0">
        <path d="M64 0H556" stroke={`url(#${id}-scan)`} strokeWidth="2" />
        <path
          d="M64 6H556"
          stroke={`url(#${id}-scan)`}
          strokeWidth="10"
          opacity=".08"
        />
      </g>

      <g data-how-data opacity="0">
        <path
          d="M104 338H516M120 338V346M120 392V420L280 500M310 338V346M310 392V486M500 338V346M500 414V420L340 500"
          stroke="#41454B"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {[104, 310, 516].map((x, i) => (
          <path key={x} d={`M${x} 333l5 5-5 5-5-5Z`} fill={accents[i]} />
        ))}
        {[120, 310, 500].map((x, i) => (
          <g key={x} transform={`translate(${x} 278)`}>
            <rect
              x="-37"
              y="-37"
              width="74"
              height="74"
              rx="17"
              fill="#24272B"
              stroke="#41454B"
              strokeWidth="1.25"
            />
            <path
              d="M-12-37H12"
              stroke={accents[i]}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="25" cy="25" r="3" fill={accents[i]} />
            <g
              stroke="#E6E6E6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {i === 0 ? (
                <>
                  <rect x="-16" y="-13" width="32" height="30" rx="4" />
                  <path
                    d="M-8-18V-9M8-18V-9M-16-3H16"
                    stroke={accents[i]}
                    strokeWidth="2.5"
                  />
                  <path d="M-8 7H-4M5 7H9" strokeWidth="2.5" />
                </>
              ) : i === 1 ? (
                <>
                  <rect x="-13" y="-13" width="26" height="26" rx="4" />
                  <path d="M-7-21V-13M7-21V-13M-7 13V21M7 13V21M-21-7H-13M-21 7H-13M13-7H21M13 7H21" />
                  <rect
                    x="-4"
                    y="-4"
                    width="8"
                    height="8"
                    rx="2"
                    stroke={accents[i]}
                    strokeWidth="2.5"
                  />
                </>
              ) : (
                <>
                  <circle cy="-8" r="8" stroke={accents[i]} strokeWidth="2.5" />
                  <path d="M-16 19V13C-16 1 16 1 16 13V19Z" />
                </>
              )}
            </g>
            <text y="94" textAnchor="middle" fill="#D2D2D2">
              {i === 2
                ? t.how.groups[i].split(" ").map((word, line) => (
                    <tspan key={word} x="0" dy={line ? "28" : "0"}>
                      {word}
                    </tspan>
                  ))
                : t.how.groups[i]}
            </text>
          </g>
        ))}
      </g>

      <g data-how-base>
        <ellipse
          cx="310"
          cy="672"
          rx="254"
          ry="84"
          stroke="#F2801E"
          strokeOpacity=".4"
          strokeWidth="1.2"
        />
        <path
          d="M95 638V673C95 708 191 736 310 736S525 708 525 673V638Z"
          fill={`url(#${id}-side)`}
          stroke="#3F3F3F"
        />
        <ellipse
          cx="310"
          cy="638"
          rx="215"
          ry="63"
          fill={`url(#${id}-top)`}
          stroke="#525252"
        />
        <path
          d="M125 684C180 718 438 725 495 684"
          stroke="#F2801E"
          strokeOpacity=".6"
        />
        <rect
          x="230"
          y="486"
          width="160"
          height="160"
          rx="30"
          fill="#080808"
          transform="translate(0 10)"
        />
        <rect x="230" y="486" width="160" height="160" rx="30" fill="#FFF" />
        <rect
          x="237"
          y="493"
          width="146"
          height="146"
          rx="25"
          stroke="#D8D8D6"
        />
        <g
          stroke="#191919"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m278 552 32-18 32 18-32 18Z" />
          <path d="m278 566 32 18 32-18M278 580l32 18 32-18" />
          <path d="m310 598 32-18" stroke="#F2801E" />
        </g>
      </g>

      <g data-how-output opacity="0">
        <path
          data-how-output-line
          d="M310 708V774M90 774H530"
          pathLength="100"
          strokeDasharray="100"
          stroke="#F2801E"
          strokeWidth="1.5"
        />
        {[90, 310, 530].map((x) => (
          <path key={x} d={`M${x} 769l5 5-5 5-5-5Z`} fill="#F2801E" />
        ))}
        <g
          transform="translate(310 730)"
          fill="#1B1E21"
          stroke="#F2801E"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m0-20 15 6v12C15 9 0 17 0 17S-15 9-15-2v-12Z" />
          <path d="m-7-2 5 5 10-11" stroke="#FFF" />
        </g>
        {[110, 310, 510].map((x, i) => (
          <g key={x} data-how-alert={i}>
            <path d={`M${x} 774V803`} stroke="#41454B" strokeWidth="2" />
            <rect
              x={x - 91}
              y="803"
              width="182"
              height="49"
              rx="13"
              fill="#1F2225"
              stroke="#34383D"
              strokeWidth="1.25"
            />
            <rect
              x={x - 12}
              y="802"
              width="24"
              height="2.5"
              rx="1.25"
              fill={accents[i]}
            />
            <text
              className="how-alert-label"
              x={x}
              y="834"
              textAnchor="middle"
              fill="#E6E6E6"
            >
              {t.how.alerts[i]}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
