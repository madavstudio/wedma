import { contactContent } from "./contact.ts";
import { howItWorks } from "./how-it-works.ts";
export type Language = "sk" | "en";
export const translations = {
  sk: {
    how: howItWorks.sk,
    contact: contactContent.sk,
    title: "WEDMA — Jeden systém pre poriadok vo vašej prevádzke",
    description:
      "WEDMA spája dokumentáciu, povinnosti a energie do jedného prehľadu. Dáta aj AI zostávajú vo vašej firme.",
    slogan: "OWN YOUR DATA. OWN YOUR RULES.",
    demo: "Chcem ukážku",
    contactUs: "Kontaktujte nás",
    nav: {
      solutions: "Riešenia",
      why: "Prečo WEDMA",
      about: "O nás",
      results: "Výsledky",
      how: "Ako to funguje",
      contact: "Kontakt",
    },
    access: {
      skip: "Preskočiť na hlavný obsah",
      nav: "Hlavná navigácia",
      footerNav: "Navigácia footera",
      language: "Jazyk stránky",
      open: "Otvoriť menu",
      close: "Zatvoriť menu",
      menu: "Menu",
      logo: "WEDMA — späť na začiatok",
      pause: "Pozastaviť animácie",
      resume: "Spustiť animácie",
      scroll: "Prejsť na našu misiu",
    },
    hero: {
      fixed: "Jeden systém pre poriadok v celej vašej prevádzke. S",
      phrases: [
        "lehotami pod kontrolou.",
        "prehľadom o energiách.",
        "odpoveďami z dokumentov.",
      ],
    },
    mission: {
      label: "NAŠA MISIA",
      heading: "Budúcnosť prevádzky je pod kontrolou.",
      body: "Chceme, aby firmy nemuseli hasiť problémy, ktoré sa dali predvídať. Naším cieľom je premeniť neprehľadné povinnosti na istotu, že termíny, spotreba energií aj dokumentácia sú pod kontrolou — a dáta zostávajú tam, kam patria: vo vašej firme.",
    },
    platform: {
      label: "ČO JE WEDMA",
      heading: "Bezpečnosť. Energie. Dokumentácia. Jeden systém.",
      body: "WEDMA je jednotná platforma, ktorá spája prevádzkovú dokumentáciu, zákonné povinnosti a energie do jedného prehľadu. Sama vyhľadá dôležité termíny, upozorní vopred a všetky dáta necháva priamo u vás.",
      cards: [
        {
          title: "Bezpečnosť & compliance",
          benefit: "Nič dôležité nezmeškáte.",
          body: "WEDMA stráži školenia, lekárske prehliadky, revízie technických zariadení aj kontroly požiarnej ochrany. Jasne ukáže, čo je v poriadku, čo sa blíži a na čo treba reagovať. Upozorní vás 90, 30 a 7 dní vopred.",
        },
        {
          title: "Energetika",
          benefit: "Vidíte, kde tečú peniaze.",
          body: "Elektrina, plyn, teplo aj voda v jednom prehľade. Vidíte, kde a koľko spotrebúvate, dostanete predikciu nákladov a upozornenie na neobvyklé výkyvy. Z nameraných dát získate odporúčania, kde možno spotrebu optimalizovať.",
        },
        {
          title: "AI asistent",
          benefit: "Odpovede bez zdĺhavého hľadania.",
          body: "Opýtate sa bežnou rečou — napríklad, kedy je ďalšia revízia kotolne — a dostanete odpoveď priamo z vašich dokumentov aj s odkazom na zdroj. Asistent pripraví podklady a odporúčania, rozhodnutie však zostáva na človeku.",
        },
      ],
    },
    why: {
      label: "PREČO WEDMA",
      heading: "Viac kontroly. Menej priestoru na chyby.",
      benefits: [
        {
          title: "Dáta zostávajú pod vašou kontrolou",
          body: "Celý systém vrátane AI beží lokálne na vašom serveri. Citlivé informácie neopúšťajú firmu a pravidlá ich používania určujete vy.",
        },
        {
          title: "Čas sa vracia ľuďom",
          body: "WEDMA preberá sledovanie lehôt, čítanie dokumentov a prípravu podkladov. Váš tím sa môže sústrediť na prácu, ktorá posúva prevádzku dopredu.",
        },
        {
          title: "Pripravení skôr, než treba",
          body: "Blížiace sa povinnosti vidíte včas a potrebné podklady máte poruke. Kontrola, revízia ani nečakaný termín vás nezastihnú nepripravených.",
        },
        {
          title: "Začnete podľa svojich priorít",
          body: "Nemusíte meniť všetko naraz. WEDMA možno zavádzať po moduloch a rozširovať postupne podľa toho, čo vaša prevádzka potrebuje najviac.",
        },
      ],
    },
    results: {
      label: "MERATEĽNÉ VÝSLEDKY",
      heading:
        "Firmy využívajú WEDMA na znižovanie prevádzkových nákladov a získanie času svojich ľudí späť.",
    },
    cta: {
      heading: "Zistite, kde môže vaša prevádzka ",
      highlight: "ušetriť čas a peniaze.",
      body: "Na krátkej ukážke prejdeme váš konkrétny príklad — lehoty, dokumentáciu aj spotrebu energií. Uvidíte, kde môže WEDMA odbremeniť váš tím, znížiť riziká a vytvoriť priestor na reálne úspory.",
    },
    footer: {
      heading: "Porozprávajme sa o vašej prevádzke.",
      navigation: "Navigácia",
      mission: "Naša misia",
      platform: "Čo je WEDMA",
      why: "Prečo WEDMA",
      results: "Merateľné výsledky",
      how: "Ako to funguje",
      company: "Údaje o firme",
      businessId: "IČO: 57759855",
      contact: "Kontakt",
      copyright: "Všetky práva vyhradené.",
      back: "Späť na začiatok",
    },
  },
  en: {
    how: howItWorks.en,
    contact: contactContent.en,
    title: "WEDMA — One system for an organised operation",
    description:
      "WEDMA brings documentation, obligations and energy into one overview. Your data and AI stay within your company.",
    slogan: "OWN YOUR DATA. OWN YOUR RULES.",
    demo: "Request a demo",
    contactUs: "Contact us",
    nav: {
      solutions: "Solutions",
      why: "Why WEDMA",
      about: "About us",
      results: "Results",
      how: "How it works",
      contact: "Contact",
    },
    access: {
      skip: "Skip to main content",
      nav: "Main navigation",
      footerNav: "Footer navigation",
      language: "Page language",
      open: "Open menu",
      close: "Close menu",
      menu: "Menu",
      logo: "WEDMA — back to top",
      pause: "Pause animations",
      resume: "Resume animations",
      scroll: "Go to our mission",
    },
    hero: {
      fixed: "One system to bring order to your entire operation. With",
      phrases: [
        "deadlines under control.",
        "a clear view of energy use.",
        "answers from your documents.",
      ],
    },
    mission: {
      label: "OUR MISSION",
      heading: "The future of your operation is under control.",
      body: "We want companies to stop firefighting problems they could have anticipated. Our goal is to turn a maze of obligations into the confidence that deadlines, energy consumption and documentation are under control — while your data stays where it belongs: within your company.",
    },
    platform: {
      label: "WHAT IS WEDMA",
      heading: "Safety. Energy. Documentation. One system.",
      body: "WEDMA is a unified platform that brings operational documentation, statutory obligations and energy into one clear overview. It identifies important deadlines, alerts you in advance and keeps all your data on your own premises.",
      cards: [
        {
          title: "Safety & compliance",
          benefit: "Never miss what matters.",
          body: "WEDMA tracks training, medical examinations, technical equipment inspections and fire safety checks. It clearly shows what is in order, what is coming up and what needs attention. It alerts you 90, 30 and 7 days in advance.",
        },
        {
          title: "Energy management",
          benefit: "See where your money goes.",
          body: "Electricity, gas, heat and water in one overview. See where and how much you consume, receive cost forecasts and get alerts about unusual fluctuations. Turn measured data into recommendations on where consumption can be optimised.",
        },
        {
          title: "AI assistant",
          benefit: "Answers without the lengthy search.",
          body: "Ask in everyday language — for example, when the next boiler room inspection is due — and receive an answer directly from your documents, with a link to the source. The assistant prepares supporting materials and recommendations, while the decision remains with a person.",
        },
      ],
    },
    why: {
      label: "WHY WEDMA",
      heading: "More control. Less room for error.",
      benefits: [
        {
          title: "Your data stays under your control",
          body: "The entire system, including AI, runs locally on your server. Sensitive information stays within your company, and you set the rules for how it is used.",
        },
        {
          title: "Give people their time back",
          body: "WEDMA takes over deadline tracking, document reading and the preparation of supporting materials. Your team can focus on work that moves your operation forward.",
        },
        {
          title: "Ready before you need to be",
          body: "See upcoming obligations in time and keep the necessary materials at hand. Inspections, equipment checks and unexpected deadlines won’t catch you unprepared.",
        },
        {
          title: "Start with your priorities",
          body: "You don’t have to change everything at once. WEDMA can be introduced module by module and expanded gradually according to what your operation needs most.",
        },
      ],
    },
    results: {
      label: "MEASURABLE RESULTS",
      heading:
        "Companies use WEDMA to reduce operating costs and give their teams time back.",
    },
    cta: {
      heading: "Discover where your operation can ",
      highlight: "save time and money.",
      body: "In a short demo, we’ll walk through your specific use case — deadlines, documentation and energy consumption. You’ll see where WEDMA can ease your team’s workload, reduce risks and create opportunities for real savings.",
    },
    footer: {
      heading: "Let’s talk about your operation.",
      navigation: "Navigation",
      mission: "Our mission",
      platform: "What is WEDMA",
      why: "Why WEDMA",
      results: "Measurable results",
      how: "How it works",
      company: "Company details",
      businessId: "Business ID: 57759855",
      contact: "Contact",
      copyright: "All rights reserved.",
      back: "Back to top",
    },
  },
};
