export const missionEnglish: Record<string, string> = {
  DOKUMENTY: "DOCUMENTS",
  Prevádzková: "Operational",
  dokumentácia: "documentation",
  "VŠETKO NA JEDNOM MIESTE": "EVERYTHING IN ONE PLACE",
  TERMÍNY: "DEADLINES",
  "Automatické stráženie": "Automatic tracking",
  "Revízia elektro": "Electrical inspection",
  "ZOSTÁVA 14 DNÍ": "14 DAYS REMAINING",
  "NIČ NEZMEŠKÁTE": "NEVER MISS A DEADLINE",
  "AI ASISTENT": "AI ASSISTANT",
  "Odpoveď so zdrojom": "Answers with sources",
  "Čítam dokumenty…": "Reading documents…",
  "Revízia je naplánovaná.": "Inspection is scheduled.",
  "Zdroj: revízna správa": "Source: inspection report",
  ENERGIE: "ENERGY",
  "Spotreba pod kontrolou": "Consumption under control",
  "−12.4 % OPROTI MIN. MESIACU": "−12.4% VS. LAST MONTH",
  "REVÍZIE &amp; SERVIS": "INSPECTIONS &amp; SERVICE",
  "Všetky povinnosti včas": "Every obligation on time",
  ELEKTRO: "ELECTRIC",
  SERVIS: "SERVICE",
  ŠKOLENIA: "TRAINING",
  POISTKY: "INSURANCE",
  BOZP: "H&S",
};

export const illustrationUi = {
  sk: {
    checks: ["Školenia", "Revízie", "Požiarna ochrana"],
    conversation: [
      {
        question: ["Koľko revízií je aktuálne", "neplatných?"],
        reading: "Čítam revízne správy…",
        answer: "Aktuálne sú neplatné 3 revízie.",
        source: "Zdroj: revízne správy",
      },
      {
        question: ["Ktoré zariadenia", "potrebujú kontrolu?"],
        reading: "Prechádzam zariadenia…",
        answer: "Kotolňa a dva rozvádzače.",
        source: "Zdroj: evidencia zariadení",
      },
      {
        question: ["Priprav mi podklady", "na najbližšiu kontrolu."],
        reading: "Pripravujem podklady…",
        answer: "Podklady sú pripravené.",
        source: "3 správy · prehľad termínov",
      },
    ],
  },
  en: {
    checks: ["Training", "Inspections", "Fire safety"],
    conversation: [
      {
        question: ["How many inspections", "are currently overdue?"],
        reading: "Reading inspection reports…",
        answer: "3 inspections are currently overdue.",
        source: "Source: inspection reports",
      },
      {
        question: ["Which equipment", "needs an inspection?"],
        reading: "Checking equipment records…",
        answer: "The boiler room and two switchboards.",
        source: "Source: equipment records",
      },
      {
        question: ["Prepare the documents", "for the next inspection."],
        reading: "Preparing the documents…",
        answer: "Your documents are ready.",
        source: "3 reports · deadline overview",
      },
    ],
  },
};
