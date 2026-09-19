export type SitePage = "home" | "contact" | "privacy";
export const pageSlugs: Record<SitePage, string> = {
  home: "",
  contact: "kontakt",
  privacy: "ochrana-osobnych-udajov",
};
export const metadata = {
  sk: {
    home: {
      title: "WEDMA — Dokumentácia, povinnosti a energie v jednom systéme",
      description:
        "WEDMA spája dokumentáciu, prevádzkové povinnosti a energie. Stráži termíny, sleduje spotrebu a prináša odpovede z vašich dokumentov.",
    },
    contact: {
      title: "Kontakt a ukážka systému — WEDMA",
      description:
        "Dohodnite si ukážku WEDMA pre vašu prevádzku. Spoločne prejdeme termíny, dokumentáciu a energie a nájdeme priestor na úsporu času a financií.",
    },
    privacy: {
      title: "Ochrana osobných údajov — WEDMA",
      description:
        "Informácie o spracúvaní osobných údajov na webe WEDMA, účeloch, uchovávaní údajov a vašich právach pri kontakte s WEDMA s.r.o.",
    },
    imageAlt: "Čierne a oranžové logo WEDMA na bielom pozadí",
  },
  en: {
    home: {
      title: "WEDMA — Documents, compliance and energy in one system",
      description:
        "WEDMA brings documents, operational obligations and energy together. Keep track of deadlines and consumption and find answers in your documents.",
    },
    contact: {
      title: "Contact and product demo — WEDMA",
      description:
        "Arrange a WEDMA demo for your operation. Explore deadlines, documentation and energy with us and find opportunities to save time and reduce costs.",
    },
    privacy: {
      title: "Privacy notice — WEDMA",
      description:
        "How WEDMA handles personal data on this website, why information is processed, how long it is kept and your rights when contacting WEDMA s.r.o.",
    },
    imageAlt: "Black and orange WEDMA logo on a white background",
  },
};
