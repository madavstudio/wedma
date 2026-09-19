import { sitePath } from "../sitePaths";
import { ASSETS, CONTACT } from "../content/config";
import { useLanguage } from "../hooks/site";
import { PRIVACY_PATH, privacyContent } from "../content/privacy";
import { Button } from "./shared";
export function SiteFooter() {
  const { t, lang } = useLanguage();
  return (
    <footer id="footer" className="site-footer dark">
      <div className="container">
        <div className="footer-contact">
          <h2>{t.footer.heading}</h2>
          <Button>{t.contactUs}</Button>
        </div>
        <div className="footer-grid">
          <div className="footer-brand">
            <a href={sitePath("/#uvod")} aria-label={t.access.logo}>
              <picture>
                <source
                  media="(max-width: 767px)"
                  srcSet={ASSETS + "wedma-logo.png"}
                />
                <img
                  src={ASSETS + "wedma-cele-logo-o.png"}
                  alt=""
                  width="1080"
                  height="792"
                  loading="lazy"
                />
              </picture>
            </a>
          </div>
          <nav aria-label={t.access.footerNav}>
            <h3>{t.footer.navigation}</h3>
            <a href={sitePath("/#nasa-misia")}>{t.footer.mission}</a>
            <a href={sitePath("/#co-je-wedma")}>{t.footer.platform}</a>
            <a href={sitePath("/#preco-wedma")}>{t.footer.why}</a>
            <a href={sitePath("/#meratelne-vysledky")}>{t.footer.results}</a>
            <a href={sitePath("/#ako-to-funguje")}>{t.footer.how}</a>
            <a href={CONTACT.target}>{t.footer.contact}</a>
          </nav>
          <div className="footer-company">
            <h3>{t.footer.company}</h3>
            <address>
              <strong>{CONTACT.company}</strong>
              <span>Novozámocká 55/58</span>
              <span>949 05 Nitra</span>
              <span className="business-id">{t.footer.businessId}</span>
              <span>{t.footer.taxId}</span>
            </address>
          </div>
          <div className="footer-details">
            <h3>{t.footer.contact}</h3>
            <p className="footer-person">{CONTACT.person}</p>
            <a href={CONTACT.phoneTarget}>{CONTACT.phone}</a>
            <a href={CONTACT.emailTarget}>{CONTACT.email}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} WEDMA. {t.footer.copyright}
          </p>
          <p className="footer-slogan eyebrow">{t.slogan}</p>
          <a href={PRIVACY_PATH} className="footer-privacy">
            {privacyContent[lang].title}
          </a>
        </div>
      </div>
    </footer>
  );
}
