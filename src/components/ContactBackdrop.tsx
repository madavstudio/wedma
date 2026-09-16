import { useId } from "react";

/** Peripheral hollow frames use the same graphite and orange palette as the hero. */
export function ContactBackdrop() {
  const id = `contact-backdrop-${useId().replace(/:/g, "")}`;
  return (
    <svg
      className="contact-backdrop"
      viewBox="0 0 1440 760"
      preserveAspectRatio="xMinYMin slice"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#fff" />
          <stop offset=".3" stopColor="#fff" stopOpacity=".9" />
          <stop offset=".78" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-top`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F6A45E" />
          <stop offset="1" stopColor="#E6E6E6" />
        </linearGradient>
        <linearGradient id={`${id}-front`} x1="0" y1="0" x2="0.07" y2="1">
          <stop stopColor="#0D1B1E" />
          <stop offset=".35" stopColor="#51351F" />
          <stop offset=".7" stopColor="#F2801E" />
          <stop offset="1" stopColor="#E6E6E6" />
        </linearGradient>
        <linearGradient id={`${id}-side`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#0D1B1E" />
          <stop offset=".56" stopColor="#51351F" />
          <stop offset="1" stopColor="#F2801E" />
        </linearGradient>
        <mask id={`${id}-mask`}>
          <rect width="1440" height="760" fill={`url(#${id}-fade)`} />
        </mask>
        <g id={`${id}-cube`}>
          <path
            d="M0 0 220 126 0 252-220 126ZM0 52 130 126 0 200-130 126Z"
            fill={`url(#${id}-top)`}
            fillRule="evenodd"
          />
          <path
            d="M-220 126 0 252V506L-220 380ZM-175 204-45 278V428L-175 354Z"
            fill={`url(#${id}-front)`}
            fillRule="evenodd"
          />
          <path
            d="M0 252 220 126V380L0 506ZM45 278 175 204V354L45 428Z"
            fill={`url(#${id}-side)`}
            fillRule="evenodd"
          />
        </g>
      </defs>
      <g mask={`url(#${id}-mask)`} opacity=".24">
        <use href={`#${id}-cube`} transform="translate(54 -70) scale(1.1)" />
        <use
          href={`#${id}-cube`}
          transform="translate(1275 -270) scale(.9)"
          opacity=".85"
        />
      </g>
    </svg>
  );
}
