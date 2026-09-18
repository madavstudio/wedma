import { useLanguage } from "./hooks/site";
import { SiteHeader } from "./components/SiteHeader";
import { HeroSection } from "./components/HeroSection";
import {
  MissionSection,
  PlatformSection,
  WhyWedmaSection,
  ResultsSection,
  DemoCtaSection,
} from "./components/Sections";
import { SiteFooter } from "./components/SiteFooter";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { PrivacyPage } from "./components/PrivacyPage";
import { ContactSection } from "./components/ContactSection";
import { useSiteNavigation } from "./hooks/useSiteNavigation";
export default function App() {
  const { t } = useLanguage();
  const page = useSiteNavigation();
  const contactPage = page === "contact";
  return (
    <>
      <a className="skip-link" href="#main-content">
        {t.access.skip}
      </a>
      <SiteHeader contactPage={contactPage} privacyPage={page === "privacy"} />
      <main id="main-content">
        {page === "home" && (
          <>
            <HeroSection />
            <MissionSection />
            <PlatformSection />
            <WhyWedmaSection />
            <ResultsSection />
            <HowItWorksSection />
            <DemoCtaSection />
          </>
        )}
        {page === "privacy" && <PrivacyPage />}
        {/* Keep a draft in memory during navigation; hidden content is not in the page layout or accessibility tree. */}
        <div hidden={!contactPage}>
          <ContactSection />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
