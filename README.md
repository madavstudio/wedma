# WEDMA

> Aktualizácia 19. 9. 2026: aktívny formulár odosiela priamo na `https://formspree.io/f/mljddqjn`. Pre toto zapojenie netreba `RESEND_API_KEY`, `CONTACT_FROM` ani `CONTACT_ORIGIN`. Príjemcu a povolené domény spravujete vo Formspree. Nižšie uvedené serverové nastavenia zostávajú iba pre voliteľný pôvodný adaptér.

Kompletný prezentačný web v Reacte, TypeScripte a Vite. Obsahuje fixnú navigáciu, hero, misiu, predstavenie platformy, výhody, výsledky, trojkrokovú sekciu Ako to funguje, CTA panel a footer. Kontaktný formulár je na samostatnej podstránke `/kontakt`. Slovenčina je predvolená; angličtina zahŕňa aj popisy ilustrácií a prístupné názvy.

## Spustenie

Použite Node.js 22.18+ alebo 24 LTS a npm. Z adresára `wedma`:

```sh
npm ci
npm run dev -- --port 5173
```

Lokálny náhľad: http://127.0.0.1:5173/

```sh
npm run build         # TypeScript a produkčný build do dist/
npm run preview       # náhľad produkčného buildu
npm run lint          # ESLint vrátane React hooks
npm run test:content  # kontrola 182 dodaných textov, metrík, kontaktov a assetov
npm run test:how      # kotvy, plynulé prechody a vratnosť časovej osi
npm run test:contact  # izolované testy API a e-mailového adaptéra
npm run test:deployment # produkčné metadata, favicon a smerovanie
npm start            # produkčný klient a kontaktné API na Node serveri
```

Prezentačný klient má kontaktné API na Node.js; doručovanie vyžaduje serverovú konfiguráciu podľa [docs/contact.md](docs/contact.md). Fonty a grafika sa načítavajú z projektu. Spustený náhľad používa výhradne lokálne rozhranie 127.0.0.1.

## Kde upravovať obsah

| Obsah                                      | Súbor                                |
| ------------------------------------------ | ------------------------------------ |
| Texty a preklady SK / EN                   | `src/content/translations.ts`        |
| Popisy ilustrácií                          | `src/content/illustration-labels.ts` |
| Spoločný kontaktný cieľ, telefón, e-mail   | `src/content/config.ts`              |
| Metriky v oboch jazykoch                   | `src/content/metrics.ts`             |
| Farby, typografia, rozostupy, responzivita | `src/styles.css`                     |
| Mobilné a tabletové kompozície            | `src/responsive.css`                 |
| Priestorový model a projekcia              | `src/components/GeometryScene.tsx`   |
| Riadenie pohybu, jazyk a úložisko          | `src/hooks/site.tsx`                 |
| Pôvodné zadanie                            | `docs/brief.md`                      |

Tri metriky používajú hodnoty a texty dodané klientom 18. 9. 2026. Aktualizované SK/EN znenie je v `docs/revision-2026-09-18.md` a zahŕňa ho obsahová kontrola.

Všetky kontaktné CTA používajú `CONTACT.target = "/kontakt"`. E-mail vo footeri používa samostatný `CONTACT.emailTarget`. Kontaktná podstránka má presné SK/EN texty, vlastné SVG, validáciu a rozhranie `/api/contact`. Bez `RESEND_API_KEY` a overeného `CONTACT_FROM` sa nezobrazí úspech. Konfigurácia a nasadenie sú v [docs/contact.md](docs/contact.md).

## Animácie a prístupnosť

- Zdieľaný model dutých kociek používa samostatné 3D plochy, ortografickú projekciu, odstránenie vnútorných stien a triedenie plôch podľa hĺbky. Pri scrollovaní sa mení projekcia hrán a otvorov. Nejde o otáčanie plochého obrázka. Hero a CTA používajú samostatné meranie a priebeh animácie kociek.
- SVG model nepotrebuje WebGL ani externú animačnú knižnicu. Dodané SVG zostáva statickým fallbackom pred prvým vykreslením geometrie.
- Hero rotuje tri frázy so stabilnou rezervovanou výškou. Čítačka obrazovky dostáva stabilný text všetkých benefitov.
- Misia má slabé impulzy za panelmi. Mobil aj desktop používajú rovnakú pôvodnú ilustráciu a animované spojenia. Sekcia Prečo WEDMA začína bielym pozadím a pri vstupe cez scroll stmavne. SVG ilustrácia bez loga obsahuje oranžové impulzy v synaptickej sieti a neutrálne dátové jadro. Text aj deliace linky sa prispôsobujú farbe pozadia; pri obmedzenom pohybe sa téma prepne bez animácie.
- Sekcia Čo je WEDMA používa vlastné dekoratívne SVG schémy s grafitovými povrchmi podľa ilustrácie misie. Pôvodné farby #F2801E, #00D23A a #0094F3 sú použité na hranách a detailoch, bez farebných výplní a bez loga uprostred. Na menších obrazovkách sa moduly usporiadajú pozdĺž zvislej linky; animácia spojení a obrysov rešpektuje viditeľnosť sekcie aj globálne nastavenie pohybu.
- Výsledkové karty majú zaoblené rohy, čierne hodnoty a zjednodušené pozadie v palete hero s dvoma geometrickými motívmi. Používajú spoločnú sticky hornú hranicu. Prichytenie funguje aj na mobile a v nízkom okne, pokiaľ sa karta zmestí pod navigáciu. Nadmerne vysoký obsah a obmedzený pohyb zostávajú v bežnom toku.
- Nastavenie `prefers-reduced-motion` je rešpektované. Pri tomto nastavení sa všetky hero benefity zobrazia naraz. Manuálne tlačidlo pozastavenia bolo na požiadanie odstránené; staršia uložená voľba pozastavenia sa ignoruje. Animácie sa zastavujú mimo relevantnej sekcie a pri skrytej karte.
- Mobilné menu používa natívny modálny `dialog`, uzamknutie pozadia, Escape, návrat fokusu a obnovenie polohy stránky.
- SVG inštancie majú jedinečné ID. Dekorácie majú `aria-hidden`. Odkazy, telefón a e-mail sú funkčné, fokus je viditeľný.

## Overenie

Podrobnosti sú v `docs/verification.md`. Vývojový audit `/tests/visual.html` používa axe-core. Nepatrí do produkčného buildu. Podporuje izolované scenáre:

- `/tests/visual.html` — audit štandardného zobrazenia;
- `/tests/visual.html?font=200&motion=reduce` — dvojnásobná veľkosť textu a simulácia systémového obmedzenia pohybu;
- `/tests/visual.html?storage=blocked` — zablokované lokálne úložisko.
- `/tests/responsive-browser.html?lang=en&view=how&stage=1` — prechod menu, hero, benefitov, výsledkov a všetkých krokov animácie; skryté JSON výsledky v `#responsive-qa-report`. Podporuje `view=menu`, `view=footer` a ID sekcií. Veľkosť okna nastavuje prehliadač.

Výsledok auditu sa zobrazí ako JSON za footerom. Ide o vývojovú pomôcku, nie súčasť webu pre návštevníkov.

## Podklady a nasadenie

Originály v `public/assets/` sú bajtovo identické s dodaným archívom. Pracovné verzie ilustrácií sú v `src/assets/`. Synced `sources/` a pôvodný archív neboli menené.

Projekt má existujúci verejný náhľad. Postup pre GitHub a Vercel je v [docs/vercel.md](docs/vercel.md): presné nastavenia, kontaktný formulár, doména, favicon a zdieľanie. Táto príprava nevykonáva deployment. Produkčný build vytvára samostatné HTML stránky s metadátami pre úvod, kontakt a ochranu údajov. Kanonickú adresu určuje `SITE_URL` alebo adresa projektu vo Verceli.

## Ako to funguje

Nová sekcia `#ako-to-funguje` nadväzuje na výsledky a predchádza CTA. Presné SK/EN texty sú v `src/content/how-it-works.ts`; používajú spoločný jazykový slovník. Zadanie je uložené v `docs/how-it-works-brief.md`.

`HowItWorksSection` riadi jednu SVG scénu podľa polôh troch textových blokov. `howScene.ts` obsahuje deterministickú časovú os a renderer stabilných SVG vrstiev. Prechod prebieha v posledných 35 % medzi čítacími kotvami, s krátkym dobehom; renderovanie po ustálení aj mimo obrazovky stojí. Desktopová scéna je prichytená 24 px pod skutočnou spodnou hranou navigácie. Na mobiloch a tabletoch sa rovnaká animácia pripne nad text krokov; jej výška sa odvodí od dostupného okna a najvyššieho textového bloku. Pri nízkom širokom okne zostáva scéna vedľa textu. Statické varianty sa používajú pri obmedzenom pohybe.

Pohybová kontrola v `/tests/visual.html?benchmark=how#ako-to-funguje` prejde scénu nadol, naspäť a rýchlym skokom do koncového stavu. Meria dobu snímok, synchronizáciu markerov a úplnú viditeľnosť scény.

Prepínač jazyka v hlavičke a mobilnom menu otvára vlastnú viditeľnú ponuku SK a EN priamo pri šípke. Jazyk sa zmení až po výbere možnosti.
