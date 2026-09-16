# Overenie WEDMA — 13. 9. 2026

## Automatické kontroly

- Produkčný build cez Vite a TypeScript: úspešný.
- ESLint: bez chýb a upozornení.
- Obsahová kontrola: 92 dodaných reťazcov v SK a EN zodpovedá zadaniu.
- Všetky štyri metriky v oboch jazykoch obsahujú doslovné `[X]`.
- Kontaktné CTA majú spoločný e-mailový cieľ; telefón používa `tel:+421904418299`.
- Všetkých 12 originálnych assetov bolo porovnaných priamo s archívom: identické bajty.
- V DOM neboli nájdené duplicitné SVG ID, neexistujúce interné ciele ani rozbité obrázky.
- Konzola pripojeného prehliadača: bez chýb a upozornení implementácie.

## Skutočný prehliadač

V pripojenom prehliadači bol skontrolovaný živý lokálny web, jeho screenshoty a DOM:

- Šírky 360, 390, 768, 1024, 1280, 1440, 1920 a 2560 px v SK aj EN: bez horizontálneho pretekania.
- Nízke okno s výškou 600 px a 200 % veľkosť textu pri šírkach 360, 390, 768, 1280 a 1440 px: bez pretekania po oprave zalamovania a adaptívnej navigácie.
- Vizuálne skontrolované hero, misia, produktové karty, výhody, výsledky, CTA, footer a otvorené menu. Mobilná misia používa pôvodné symboly vo vlastnej čitateľnej kompozícii.
- Navigácia mení farby a logo; rovnaký priestor loga drží položky na mieste.
- Priamy odkaz a obnovenie stránky na `#nasa-misia` inicializujú správnu sekciu aj svetlú navigáciu.
- Prepnutie SK → EN v misii zachovalo hornú polohu sekcie; preložili sa aj texty v ilustrácii. Angličtina zostala zachovaná po obnovení stránky.
- Prepínanie jazyka fungovalo aj pri zámerne nedostupnom localStorage.
- Mobilný dialog presúva fokus, obmedzuje prístup k pozadiu, zatvára sa cez Escape a vracia fokus na spúšťacie tlačidlo.
- Globálne pozastavenie animácií fungovalo a prežilo obnovenie stránky. Opätovné spustenie obnovilo pohyb.
- Simulované `prefers-reduced-motion` zobrazilo všetky hero benefity a vyplo prichytenie výsledkových kariet.
- Na desktope bolo vizuálne overené prekrývanie výsledkových kariet na spoločnej hornej hrane.

## Audit prístupnosti

Axe-core, pravidlá WCAG 2 A/AA a WCAG 2.1 AA:

- Štandardné zobrazenie: 0 automaticky zistených porušení, 23 úspešných kontrol v záverečnom behu.
- 200 % text + obmedzený pohyb: 0 automaticky zistených porušení v testovanom scenári.
- Nedostupné lokálne úložisko: 0 automaticky zistených porušení v testovanom scenári.

Automatický audit nenahrádza úplné manuálne testovanie so všetkými čítačkami obrazovky. Testy fyzických iOS/Android zariadení, ďalších prehliadačových jadier a výkonu na budúcej produkčnej doméne zatiaľ neprebehli.

## Revízia hero, navigácie a pätičky

- Nový jazykový výber v pätičke prepne SK → EN, synchronizuje ostatné výbery a zachová jazyk po obnovení. Následne bol obnovený slovenský jazyk.
- Vizuálne overený úvod, priebeh a záver rotácie pri 1440 × 900 px; scéna dosiahla `1.000` pri scrollY 710 px, ešte pred prekrytím misiou. Trajektória je súvislá bez samostatného záverečného presunu.
- Pri scrollY 200 px na 1440 × 900 a 390 × 844 px sa polygóny geometrie neprekrývali s kontrolovanými textovými riadkami vrátane 16 px odstupu.
- Úvod na 390 × 844 a 1280 × 600 px bol bez pretekania a bez prieniku kociek do kontrolovaného textu.
- Pri 200 % texte na úzkej obrazovke sa dekoratívna geometria skryje, ak obsah presiahne výšku okna; text má čisté gradientové pozadie.
- Axe v revidovaných štandardných, mobilných a zväčšených scenároch: 0 automaticky zistených porušení, 22 úspešných kontrol.
- Znova prešli produkčný build, ESLint a všetkých 92 obsahových kontrol.

## Aktualizácia 14. 9. 2026

Aktuálne hero používa optimalizované vykresľovanie, bez gradientu na hranici misie. Mobil používa rovnakú ilustráciu misie ako desktop. Podrobnosti a meranie sú v [revízii zo 14. septembra](revision-2026-09-14.md); táto revízia nahrádza skorší popis mobilnej ilustrácie a prechodového gradientu.

Sekcia Čo je WEDMA bola následne prepracovaná na prepojenú kompozíciu bez samostatných hranatých kariet. Responzívne, obsahové a prístupnostné kontroly sú uvedené v tej istej revízii.

Aktuálne mobilné a tabletové rozloženie, pohyb na všetkých šírkach a nová navigácia sú popísané v [responzívnej revízii](responsive-2026-09-14.md). Tá nahrádza skoršie statické mobilné správanie výsledkov a sekcie Ako to funguje.
