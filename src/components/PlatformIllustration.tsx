import { useId, type CSSProperties } from "react";
import { useLanguage } from "../hooks/site";
import { illustrationUi } from "../content/illustration-labels";

/** Decorative UI schematics, using the graphite surfaces of the mission artwork. */
export function PlatformIllustration({ index }: { index: number }) {
  const { lang } = useLanguage();
  const ui = illustrationUi[lang];
  const gradientId = `module-surface-${useId().replace(/:/g, "")}`;
  return (
    <svg
      className="platform-schematic"
      viewBox="0 0 300 220"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="36"
          y1="33"
          x2="264"
          y2="182"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#202326" />
          <stop offset="1" stopColor="#151719" />
        </linearGradient>
      </defs>
      <ellipse
        cx="150"
        cy="198"
        rx="110"
        ry="8"
        fill="#191919"
        opacity=".035"
      />
      <g stroke="#D7DBDD" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 110H36M264 110H296M16 78H24L36 90M16 142H24L36 130M264 90L276 78H284M264 130L276 142H284" />
        <circle cx="4" cy="110" r="3" fill="white" />
        <circle cx="296" cy="110" r="3" fill="white" />
        <path d="M114 18V33M138 24V33M162 24V33M186 18V33M114 182V198M138 182V192M162 182V192M186 182V198" />
      </g>
      <rect
        x="36"
        y="43"
        width="228"
        height="149"
        rx="21"
        fill="#151719"
        stroke="#34383D"
      />
      <rect
        x="36"
        y="33"
        width="228"
        height="149"
        rx="21"
        fill={`url(#${gradientId})`}
        stroke="#454A4F"
      />
      <rect
        x="44"
        y="41"
        width="212"
        height="133"
        rx="15"
        stroke="#FFFFFF"
        strokeOpacity=".045"
      />
      <g
        className="schematic-accent"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M57 33H120M205 182H243C255 182 264 173 264 161"
          strokeWidth="1.5"
        />
        <path
          className="schematic-signal"
          d="M57 33H243C255 33 264 42 264 54V161C264 173 255 182 243 182H57C45 182 36 173 36 161V54C36 42 45 33 57 33Z"
          pathLength="100"
          strokeWidth="1.5"
        />
        <circle cx="59" cy="58" r="3" />
      </g>
      <g stroke="#4C5156" strokeLinecap="round">
        <path d="M71 58H108M115 58H132M58 76H242" />
        <path d="M229 55V61M235 55V61M241 55V61" />
      </g>
      {index === 0 && (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M88 91L110 100V118C110 133 99 144 88 150C77 144 66 133 66 118V100Z"
            stroke="#E2E5E7"
            strokeWidth="1.8"
          />
          <path
            className="ui-motion ui-check"
            pathLength="1"
            d="m78 119 7 7 13-15"
            stroke="#F2801E"
            strokeWidth="2.2"
          />
          {ui.checks.map((label, i) => (
            <g
              key={label}
              style={{ "--ui-delay": `${i * 0.65}s` } as CSSProperties}
            >
              <rect
                x="126"
                y={87 + i * 26}
                width="116"
                height="23"
                rx="5"
                fill="#24272B"
              />
              <circle cx="138" cy={98 + i * 26} r="5.5" stroke="#495057" />
              <path
                className="ui-motion ui-check"
                pathLength="1"
                d={`m135 ${98 + i * 26} 2 2 4-4`}
                stroke={i === 2 ? "#F8C14D" : "#00D23A"}
                strokeWidth="1.4"
              />
              <text x="150" y={101 + i * 26} fill="#CFD3D6" fontSize="8.5">
                {label}
              </text>
            </g>
          ))}
          <path d="M66 164H234" stroke="#34383D" strokeWidth="2" />
          <path
            className="ui-motion ui-draw"
            pathLength="1"
            d="M66 164H234"
            stroke="#F2801E"
            strokeWidth="2"
          />
        </g>
      )}
      {index === 1 && (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M58 96H242M58 120H242M58 144H242"
            stroke="#34383D"
            strokeOpacity=".7"
          />
          {[28, 38, 33, 49, 44, 61, 54, 72, 66, 84].map((h, i) => (
            <rect
              key={i}
              className="ui-motion ui-bar"
              x={60 + i * 18}
              y={166 - h * 0.87}
              width="12"
              height={h * 0.87}
              rx="1.5"
              fill="#00D23A"
              opacity={0.24 + i * 0.075}
              style={{ "--ui-delay": `${i * 0.12}s` } as CSSProperties}
            />
          ))}
          <path
            className="ui-motion ui-draw"
            pathLength="1"
            d="M66 143C103 138 132 127 162 117S216 98 234 91"
            stroke="#F2801E"
            strokeWidth="2.4"
          />
          <circle
            className="ui-motion ui-status"
            cx="234"
            cy="91"
            r="3"
            fill="#F2801E"
          />
        </g>
      )}
      {index === 2 && (
        <g className="ui-chat">
          <g className="ui-motion ui-chat-question">
            <rect x="91" y="84" width="152" height="32" rx="7" fill="#2B2E32" />
            <text x="101" y="97" fill="#E6E6E6" fontSize="8.2">
              <tspan x="101">{ui.question[0]}</tspan>
              <tspan x="101" dy="11">
                {ui.question[1]}
              </tspan>
            </text>
          </g>
          <g className="ui-motion ui-chat-thinking">
            <rect
              x="58"
              y="125"
              width="151"
              height="25"
              rx="7"
              fill="#0094F3"
              fillOpacity=".035"
              stroke="#0094F3"
              strokeOpacity=".28"
            />
            {[68, 73, 78].map((x, i) => (
              <circle
                className="ui-motion ui-dot"
                key={x}
                cx={x}
                cy="138"
                r="1.3"
                fill="#0094F3"
                style={{ "--ui-delay": `${i * 0.18}s` } as CSSProperties}
              />
            ))}
            <text x="87" y="140" fill="#AABFCF" fontSize="8">
              {ui.reading}
            </text>
          </g>
          <g className="ui-motion ui-chat-answer">
            <rect
              x="58"
              y="124"
              width="178"
              height="43"
              rx="7"
              fill="#1A242C"
              stroke="#0094F3"
              strokeOpacity=".24"
            />
            <text x="68" y="138" fill="#E6E6E6" fontSize="8.4">
              {ui.answer}
            </text>
            <path
              d="M68 147h6l3 3v9h-9Zm6 0v4h3"
              stroke="#0094F3"
              strokeWidth=".8"
              strokeLinejoin="round"
            />
            <text x="84" y="156" fill="#79BEE9" fontSize="7.7">
              {ui.source}
            </text>
          </g>
        </g>
      )}
    </svg>
  );
}
