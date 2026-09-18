export const PRIVACY_PATH = "/ochrana-osobnych-udajov";
export const PRIVACY_VERSION = "2026-09-18";

export const privacyContent = {
  sk: {
    label: "VAŠE SÚKROMIE",
    title: "Ochrana osobných údajov",
    intro:
      "Prehľadne o tom, aké údaje získavame pri návšteve webu a pri kontakte s WEDMA, prečo ich potrebujeme a aké máte práva.",
    updated: "Aktualizované 18. septembra 2026",
    controller: "Prevádzkovateľ",
    company: "WEDMA s.r.o.",
    address: ["Novozámocká 55/58", "949 05 Nitra, Slovenská republika"],
    companyId: "IČO: 57759855",
    contact: "Kontaktná stránka",
    scope:
      "Tieto informácie sa týkajú prezentačného webu a komunikácie so záujemcami. Spracúvanie dokumentov v samotnej aplikácii WEDMA sa riadi samostatnými zmluvnými podmienkami a dohodou o spracúvaní údajov konkrétneho zákazníka.",
    sections: [
      {
        id: "udaje",
        title: "Aké údaje spracúvame",
        paragraphs: [
          "Údaje nám poskytujete priamo vy pri kontakte. Pri načítaní webu vznikajú aj technické údaje potrebné na jeho doručenie a ochranu.",
        ],
        items: [
          [
            "Kontaktná požiadavka",
            "Meno, priezvisko, pracovný e-mail, firma, zvolená oblasť záujmu a obsah správy. Vo formulári sú tieto polia povinné. Telefón a pracovná pozícia sú nepovinné.",
          ],
          [
            "Technické údaje",
            "IP adresa, čas požiadavky, požadovaná adresa stránky, údaje o prehliadači a technickom priebehu spojenia, ktoré spracúva hostingová infraštruktúra.",
          ],
          [
            "Nastavenie jazyka",
            "Vo vašom prehliadači si pamätáme zvolený jazyk SK alebo EN. Rozpísaný formulár zostáva iba v pamäti otvorenej stránky; do lokálneho úložiska ho neukladáme.",
          ],
        ],
        after:
          "Do správy nevkladajte zdravotné údaje, rodné čísla, heslá ani osobné údaje iných osôb, ktoré nie sú potrebné na vybavenie otázky. Formulár neslúži na nahrávanie prevádzkovej dokumentácie.",
      },
      {
        id: "ucely",
        title: "Prečo údaje potrebujeme",
        paragraphs: [
          "Právny základ závisí od účelu komunikácie. Zaškrtnutie políčka vo formulári potvrdzuje oboznámenie sa s týmito informáciami; samo osebe nie je marketingovým súhlasom.",
        ],
        items: [
          [
            "Žiadosť o ukážku alebo ponuku",
            "Ak vystupujete ako budúca zmluvná strana, údaje sú potrebné na vykonanie opatrení pred uzatvorením zmluvy na vašu žiadosť — článok 6 ods. 1 písm. b) GDPR.",
          ],
          [
            "Firemná a všeobecná komunikácia",
            "Pri kontakte v mene firmy alebo pri všeobecnej otázke je základom náš oprávnený záujem odpovedať na požiadavku a viesť súvisiacu obchodnú komunikáciu — článok 6 ods. 1 písm. f) GDPR.",
          ],
          [
            "Bezpečnosť webu a ochrana práv",
            "Nevyhnutné technické údaje pomáhajú zabezpečiť prevádzku a predchádzať zneužitiu. Oprávneným záujmom je bezpečnosť služby a ochrana právnych nárokov — článok 6 ods. 1 písm. f) GDPR. Žiadosti týkajúce sa vašich práv vybavujeme na splnenie povinností podľa GDPR — článok 6 ods. 1 písm. c).",
          ],
        ],
        after:
          "Poskytnutie údajov je dobrovoľné. Bez kontaktných údajov a informácií o požiadavke ju však nevieme vybaviť cez formulár. Nepovinné polia môžete nechať prázdne. Formulár vás neprihlasuje na odber reklamných správ.",
      },
      {
        id: "uchovavanie",
        title: "Ako dlho údaje uchovávame",
        paragraphs: [
          "Doba uchovávania sa určuje podľa stavu požiadavky a dôvodu, pre ktorý sú údaje ešte potrebné. Samotné vyplnenie formulára nie je dôvodom na neobmedzené uchovávanie.",
        ],
        items: [
          [
            "Otázky a požiadavky",
            "Počas vybavovania požiadavky a priamo súvisiacej nadväzujúcej komunikácie. Po jej uzavretí sa údaje vymažú, pokiaľ konkrétna zákonná povinnosť alebo potreba ochrany právneho nároku nevyžaduje ich ďalšie uchovanie.",
          ],
          [
            "Zmluva alebo právny nárok",
            "Ak vznikne zmluvný vzťah, relevantné údaje sa uchovávajú počas jeho trvania a počas lehôt uložených príslušnými predpismi. Údaje potrebné pre konkrétny spor sa uchovávajú do jeho právoplatného ukončenia alebo uplynutia príslušnej premlčacej lehoty.",
          ],
          [
            "Prehliadač a technická prevádzka",
            "Voľba jazyka zostáva v prehliadači do jej zmeny alebo vymazania údajov webu. Rozpísaný formulár sa odstráni po obnovení alebo zatvorení stránky. Technické záznamy sa uchovávajú podľa potreby zabezpečenia prevádzky a riešenia konkrétnych bezpečnostných udalostí. Informácie o uchovávaní u jednotlivých poskytovateľov vám poskytneme na požiadanie.",
          ],
        ],
        after: "",
      },
      {
        id: "prijemcovia",
        title: "Kto môže mať k údajom prístup",
        paragraphs: [
          "V potrebnom rozsahu majú k údajom prístup osoby vybavujúce vašu požiadavku a poskytovatelia webhostingu, komunikačných a IT služieb. Príjemcami môžu byť aj odborní poradcovia pri ochrane právnych nárokov a orgány verejnej moci, ak to vyžaduje zákon.",
          "Hosting môže zahŕňať spracúvanie technických údajov aj mimo Európskeho hospodárskeho priestoru vrátane USA. Prenosy sa opierajú o rozhodnutie o primeranosti ochrany alebo o štandardné zmluvné doložky a príslušné záruky podľa GDPR. Informácie o príjemcoch a kópiu uplatňovaných záruk si môžete vyžiadať prostredníctvom kontaktov uvedených na tejto stránke.",
        ],
        items: [],
        after: "",
      },
      {
        id: "cookies",
        title: "Cookies a nastavenia prehliadača",
        paragraphs: [
          "Vo vlastnej časti webu WEDMA nie sú nasadené reklamné pixely ani analytické meranie návštevnosti. Písmo a grafika sa načítavajú z rovnakého webu. Na uloženie vami zvoleného jazyka používame lokálne úložisko prehliadača s názvom wedma-language; nejde o reklamný identifikátor.",
          "Voľbu jazyka môžete zmeniť v hlavičke alebo odstrániť vymazaním údajov stránky v prehliadači. V tom prípade sa obnoví predvolená slovenčina. Technické mechanizmy samotného hostingu sa riadia pravidlami jeho poskytovateľa. Ak pribudne nepovinné sledovanie, musí byť pred aktiváciou vyriešená príslušná informačná povinnosť a voľba súhlasu.",
        ],
        items: [],
        after: "",
      },
      {
        id: "prava",
        title: "Aké máte práva",
        paragraphs: [
          "Za podmienok GDPR môžete požiadať o prístup k údajom a ich kópiu, opravu, vymazanie alebo obmedzenie spracúvania. Ak je automatizované spracúvanie založené na zmluve alebo súhlase, môžete mať aj právo na prenosnosť údajov.",
        ],
        items: [
          [
            "Namietanie",
            "Proti spracúvaniu na základe oprávneného záujmu môžete namietať z dôvodov týkajúcich sa vašej konkrétnej situácie. Námietku posúdime a údaje ďalej nespracúvame, ak nepreukážeme závažné oprávnené dôvody alebo dôvod ochrany právnych nárokov.",
          ],
          [
            "Odvolanie prípadného súhlasu",
            "Ak pri inom, osobitne určenom účele udelíte súhlas, môžete ho kedykoľvek odvolať bez vplyvu na zákonnosť predchádzajúceho spracúvania. Potvrdenie oboznámenia sa s týmito zásadami nie je takýmto súhlasom.",
          ],
          [
            "Uplatnenie práv",
            "Žiadosť môžete poslať poštou na sídlo WEDMA s.r.o. uvedené vyššie alebo nás kontaktovať telefonicky či cez kontaktnú stránku. Podľa potreby primerane overíme vašu totožnosť. Spravidla odpovieme do jedného mesiaca; pri zložitej žiadosti možno lehotu predĺžiť o ďalšie dva mesiace, pričom vás o tom a dôvodoch včas informujeme.",
          ],
          [
            "Sťažnosť",
            "Ak sa domnievate, že spracúvanie porušuje vaše práva, môžete sa obrátiť na Úrad na ochranu osobných údajov Slovenskej republiky alebo iný príslušný dozorný orgán. Najprv nás kontaktovať nemusíte.",
          ],
        ],
        after: "",
      },
      {
        id: "rozhodovanie",
        title: "Automatizované rozhodovanie",
        paragraphs: [
          "Kontaktný formulár neslúži na profilovanie ani na automatizované rozhodovanie s právnymi alebo obdobne významnými účinkami. Vaše požiadavky vybavujú poverené osoby.",
        ],
        items: [],
        after: "",
      },
    ],
    sources: "Súvisiace informácie",
    gdpr: "GDPR — nariadenie (EÚ) 2016/679",
    authority: "Úrad na ochranu osobných údajov SR — podanie návrhu",
  },
  en: {
    label: "YOUR PRIVACY",
    title: "Privacy notice",
    intro:
      "How we handle information when you visit this website or contact WEDMA, why we need it and what rights you have.",
    updated: "Updated 18 September 2026",
    controller: "Data controller",
    company: "WEDMA s.r.o.",
    address: ["Novozámocká 55/58", "949 05 Nitra, Slovak Republic"],
    companyId: "Company ID: 57759855",
    contact: "Contact page",
    scope:
      "This notice covers the marketing website and communication with prospective customers. Processing documents in the WEDMA application is governed by separate customer contracts and the relevant data processing agreement.",
    sections: [
      {
        id: "udaje",
        title: "What information we process",
        paragraphs: [
          "You provide information directly when contacting us. Loading the website also involves technical information needed to deliver and protect it.",
        ],
        items: [
          [
            "Contact enquiries",
            "First name, last name, work email, company, selected area of interest and message. These fields are required in the form. Phone number and job title are optional.",
          ],
          [
            "Technical information",
            "IP address, request time, requested page address, browser details and technical connection information processed by the hosting infrastructure.",
          ],
          [
            "Language preference",
            "Your browser remembers the selected language, SK or EN. An unfinished form stays only in the open page’s memory; we do not save it in local storage.",
          ],
        ],
        after:
          "Do not include health information, national identifiers, passwords or unnecessary personal information about other people in your message. This form is not for uploading operational documents.",
      },
      {
        id: "ucely",
        title: "Why we need this information",
        paragraphs: [
          "The legal basis depends on the purpose of the communication. The checkbox confirms that you have read this notice; it is not marketing consent.",
        ],
        items: [
          [
            "Requesting a demo or quotation",
            "If you are a prospective contracting party, processing is necessary to take steps at your request before entering into a contract — Article 6(1)(b) GDPR.",
          ],
          [
            "Business and general communication",
            "When you contact us on behalf of a company or with a general question, our legitimate interest is to respond and manage related business communication — Article 6(1)(f) GDPR.",
          ],
          [
            "Website security and legal rights",
            "Necessary technical information supports operation and prevents abuse. Our legitimate interests are service security and protecting legal claims — Article 6(1)(f) GDPR. We handle data-rights requests to meet our GDPR obligations — Article 6(1)(c).",
          ],
        ],
        after:
          "Providing information is voluntary. Without contact details and the details of your enquiry, however, we cannot handle it through the form. You may leave optional fields empty. Submitting the form does not subscribe you to advertising messages.",
      },
      {
        id: "uchovavanie",
        title: "How long information is kept",
        paragraphs: [
          "Retention depends on the status of your enquiry and the reason the information is still needed. Completing the form is not a reason for indefinite retention.",
        ],
        items: [
          [
            "Questions and enquiries",
            "While the enquiry and directly related follow-up communication are being handled. After closure, the information is deleted unless a specific legal obligation or the protection of a legal claim requires further retention.",
          ],
          [
            "Contracts or legal claims",
            "If a contractual relationship results, relevant information is retained for its duration and applicable statutory retention periods. Information needed for a specific dispute is retained until its final resolution or the applicable limitation period expires.",
          ],
          [
            "Browser and technical operation",
            "Your language preference remains until you change it or clear the website’s browser data. The unfinished form is removed on reload or when the page is closed. Technical records are retained as needed to keep the service secure and investigate specific security incidents. You can request information about retention by individual providers.",
          ],
        ],
        after: "",
      },
      {
        id: "prijemcovia",
        title: "Who may access information",
        paragraphs: [
          "To the extent necessary, information is accessible to people handling your enquiry and providers of website hosting, communication and IT services. Professional advisers protecting legal claims and public authorities may also receive information where required by law.",
          "Hosting may involve processing technical information outside the European Economic Area, including in the United States. Transfers rely on an adequacy decision or Standard Contractual Clauses and applicable GDPR safeguards. You can request information about recipients and a copy of the applicable safeguards using the contact details on this page.",
        ],
        items: [],
        after: "",
      },
      {
        id: "cookies",
        title: "Cookies and browser preferences",
        paragraphs: [
          "WEDMA’s own website code does not include advertising pixels or visitor analytics. Fonts and graphics load from the same website. We use a local browser storage entry named wedma-language to remember the language you select; it is not an advertising identifier.",
          "You can change your language in the header or remove the preference by clearing the site’s browser data. The default Slovak language will then return. The hosting provider’s technical mechanisms are governed by its rules. If optional tracking is introduced, the relevant notice and consent choice must be addressed before activation.",
        ],
        items: [],
        after: "",
      },
      {
        id: "prava",
        title: "Your rights",
        paragraphs: [
          "Subject to the GDPR conditions, you can request access and a copy, correction, deletion or restriction of processing. Where automated processing is based on consent or a contract, you may also have a right to data portability.",
        ],
        items: [
          [
            "Objecting",
            "You may object to processing based on legitimate interests for reasons relating to your situation. We will assess the objection and stop that processing unless we demonstrate compelling legitimate grounds or grounds for protecting legal claims.",
          ],
          [
            "Withdrawing any separate consent",
            "If you give consent for another specifically identified purpose, you may withdraw it at any time without affecting the lawfulness of earlier processing. Acknowledging this notice is not such consent.",
          ],
          [
            "Exercising your rights",
            "Send a request by post to WEDMA s.r.o. at the registered address above, or contact us by phone or through the contact page. We may reasonably verify your identity where necessary. We generally respond within one month. A complex request may require an extension of up to two additional months, and we will notify you of the extension and reasons in time.",
          ],
          [
            "Complaints",
            "If you believe processing infringes your rights, you can complain to the Office for Personal Data Protection of the Slovak Republic or another competent supervisory authority. You do not have to contact us first.",
          ],
        ],
        after: "",
      },
      {
        id: "rozhodovanie",
        title: "Automated decisions",
        paragraphs: [
          "The contact form is not used for profiling or automated decisions with legal or similarly significant effects. Your enquiries are handled by authorised people.",
        ],
        items: [],
        after: "",
      },
    ],
    sources: "Related information",
    gdpr: "GDPR — Regulation (EU) 2016/679",
    authority: "Slovak data protection authority — complaints",
  },
};
