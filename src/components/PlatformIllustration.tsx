import { useId } from "react";

/** Decorative UI schematics, using the graphite surfaces of the mission artwork. */
export function PlatformIllustration({ index }: { index: number }) {
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
            d="M103 87L133 99V119C133 138 117 151 103 158C89 151 73 138 73 119V99L103 87Z"
            stroke="#E2E5E7"
            strokeWidth="1.8"
          />
          <path
            d="M91 121L100 130L117 111"
            className="schematic-accent"
            strokeWidth="2"
          />
          {[99, 122, 145].map((y) => (
            <g key={y}>
              <rect
                x="156"
                y={y - 5}
                width="10"
                height="10"
                rx="2"
                stroke="#62686D"
              />
              <path
                d={`M158 ${y}L160 ${y + 2}L164 ${y - 2}`}
                className="schematic-accent"
              />
              <path d={`M177 ${y - 2}H230M177 ${y + 3}H210`} stroke="#555B60" />
            </g>
          ))}
        </g>
      )}
      {index === 1 && (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M60 100H240M60 124H240M60 148H240M90 89V156M138 89V156M186 89V156M234 89V156"
            stroke="#34383D"
            strokeOpacity=".65"
          />
          <path
            d="M60 140L86 123L113 132L141 105L168 115L197 93L237 102"
            className="schematic-accent"
            strokeWidth="1.8"
          />
          <circle
            cx="141"
            cy="105"
            r="3.5"
            fill="#202326"
            className="schematic-accent"
            strokeWidth="1.5"
          />
          <circle
            cx="197"
            cy="93"
            r="3.5"
            fill="#202326"
            className="schematic-accent"
            strokeWidth="1.5"
          />
          <path
            d="M60 160H81M105 160H126M150 160H171M195 160H216"
            stroke="#62686D"
          />
        </g>
      )}
      {index === 2 && (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M76 89H102L115 102V152C115 156 112 159 108 159H76C72 159 69 156 69 152V96C69 92 72 89 76 89Z"
            stroke="#7A8187"
            strokeWidth="1.4"
          />
          <path
            d="M102 89V102H115M80 114H103M80 122H99M80 130H103M80 138H93"
            stroke="#62686D"
          />
          <path
            d="M115 145H133L143 135"
            className="schematic-accent"
            strokeWidth="1.5"
          />
          <path
            d="M141 92H223C229 92 234 97 234 103V132C234 138 229 143 223 143H166L148 156V143H141C135 143 130 138 130 132V103C130 97 135 92 141 92Z"
            fill="#1B1E21"
            stroke="#CAD0D4"
            strokeWidth="1.5"
          />
          <path
            d="M167 105C168 113 172 117 180 118C172 119 168 123 167 131C166 123 162 119 154 118C162 117 166 113 167 105Z"
            className="schematic-accent"
            strokeWidth="1.6"
          />
          <path d="M193 114H216M193 122H210" stroke="#6D747A" />
        </g>
      )}
    </svg>
  );
}
