import {
  useEffect,
  useId,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { CONTACT } from "../content/config";
import { useLanguage } from "../hooks/site";
export function Arrow({
  direction = "right",
}: {
  direction?: "right" | "down" | "up";
}) {
  return (
    <svg
      className={`arrow arrow--${direction}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Button({
  children,
  variant = "orange",
  onClick,
  className = "",
}: PropsWithChildren<{
  variant?: "orange" | "black" | "nav";
  onClick?: () => void;
  className?: string;
}>) {
  return (
    <a
      className={`button button--${variant} ${className}`}
      href={CONTACT.target}
      onClick={onClick}
    >
      {children}
      <Arrow />
    </a>
  );
}
export function SectionLabel({ children }: PropsWithChildren) {
  return (
    <div className="section-label">
      <span aria-hidden="true" />
      {children}
    </div>
  );
}
export function LanguageSwitcher() {
  const { lang, t, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const optionsId = useId();
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  return (
    <div
      ref={root}
      className="language-control"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          event.stopPropagation();
          setOpen(false);
          trigger.current?.focus();
        }
        if (open && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
          event.preventDefault();
          const options = [
            ...(root.current?.querySelectorAll<HTMLButtonElement>(
              ".language-option",
            ) ?? []),
          ];
          const index = options.indexOf(
            document.activeElement as HTMLButtonElement,
          );
          options[
            (index + (event.key === "ArrowDown" ? 1 : options.length - 1)) %
              options.length
          ]?.focus();
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        className="language-switch"
        aria-label={t.access.language}
        aria-expanded={open}
        aria-controls={optionsId}
        onClick={() => setOpen(!open)}
      >
        {lang.toUpperCase()}
        <svg
          className="language-chevron"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="m3.5 5.75 4.5 4.5 4.5-4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        id={optionsId}
        className="language-options"
        role="group"
        aria-label={t.access.language}
        hidden={!open}
      >
        {(["sk", "en"] as const).map((value) => (
          <button
            key={value}
            type="button"
            className="language-option"
            data-language={value}
            aria-pressed={lang === value}
            onClick={() => {
              setLanguage(value);
              setOpen(false);
              trigger.current?.focus();
            }}
          >
            <span>{value.toUpperCase()}</span>
            <svg
              className="language-check"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="m3 8 3.25 3.25L13 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}

export function BenefitIcon({ index }: { index: number }) {
  const paths = [
    <>
      <path d="m24 5 15 6v11c0 10-15 20-15 20S9 32 9 22V11Z" />
      <path d="m17 23 5 5 10-11" />
    </>,
    <>
      <path d="M9 16a17 17 0 1 1-2 16M9 6v10H0" />
      <path d="M24 13v12l8 5" />
    </>,
    <>
      <rect x="7" y="10" width="34" height="32" rx="3" />
      <path d="M15 5v10M33 5v10M7 20h34m-23 10 5 5 9-10" />
    </>,
    <>
      <rect x="17" y="5" width="14" height="13" rx="1" />
      <rect x="3" y="30" width="14" height="13" rx="1" />
      <rect x="31" y="30" width="14" height="13" rx="1" />
      <path d="M24 18v7H10v5m14-5h14v5" />
    </>,
  ];
  return (
    <svg
      className="benefit-icon"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[index]}
    </svg>
  );
}
