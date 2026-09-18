import { useLanguage } from "../hooks/site";
import { CONTACT } from "../content/config";
import { PRIVACY_VERSION, privacyContent } from "../content/privacy";
import { SectionLabel } from "./shared";
import "./privacy.css";

export function PrivacyPage() {
  const { lang } = useLanguage();
  const p = privacyContent[lang];
  return (
    <section
      id="ochrana-osobnych-udajov"
      className="privacy-page"
      aria-labelledby="privacy-heading"
    >
      <div className="container privacy-document">
        <header className="privacy-intro">
          <SectionLabel>{p.label}</SectionLabel>
          <h1 id="privacy-heading" tabIndex={-1}>
            {p.title}
          </h1>
          <p>{p.intro}</p>
          <time dateTime={PRIVACY_VERSION}>{p.updated}</time>
        </header>
        <div className="privacy-body">
          <section
            className="privacy-controller"
            aria-labelledby="privacy-controller-heading"
          >
            <h2 id="privacy-controller-heading">{p.controller}</h2>
            <address>
              <strong>{p.company}</strong>
              {p.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
              <span>{p.companyId}</span>
              <a href={CONTACT.phoneTarget}>{CONTACT.phone}</a>
              <a href={CONTACT.target}>
                {p.contact} <span aria-hidden="true">↗</span>
              </a>
            </address>
            <p>{p.scope}</p>
          </section>
          {p.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="privacy-section"
              aria-labelledby={`privacy-${section.id}-heading`}
              tabIndex={-1}
            >
              <h2 id={`privacy-${section.id}-heading`}>{section.title}</h2>
              {section.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
              {section.items.length > 0 && (
                <dl>
                  {section.items.map(([label, text]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{text}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {section.after && <p>{section.after}</p>}
            </section>
          ))}
          <section
            className="privacy-sources"
            aria-labelledby="privacy-sources-heading"
          >
            <h2 id="privacy-sources-heading">{p.sources}</h2>
            <a
              href={`https://eur-lex.europa.eu/legal-content/${lang.toUpperCase()}/TXT/?uri=CELEX%3A32016R0679`}
            >
              {p.gdpr}
            </a>
            <a href="https://www.dataprotection.gov.sk/sk/ine/vzory-formulare-stiahnutie/navrh-zacatie-konania-ochrane-osobnych-udajov/">
              {p.authority}
            </a>
          </section>
        </div>
      </div>
    </section>
  );
}
