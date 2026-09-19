# WEDMA — GitHub a Vercel

> Aktualizácia 19. 9. 2026: aktívny formulár odosiela priamo na `https://formspree.io/f/mljddqjn`. Pre toto zapojenie netreba `RESEND_API_KEY`, `CONTACT_FROM` ani `CONTACT_ORIGIN`. Príjemcu a povolené domény spravujete vo Formspree. Nižšie uvedené serverové nastavenia zostávajú iba pre voliteľný pôvodný adaptér.

Projekt: React 19 + TypeScript + Vite. Repozitár: https://github.com/madavstudio/wedma.
Zdrojové súbory sú priamo v koreni repozitára, nie v ďalšom priečinku `wedma`.
Existujúci vzhľad, obsah, animácie a SK/EN prepínač zostávajú zachované.

## Nastavenia pri importe do Vercelu

| Nastavenie        | Hodnota                 |
| ----------------- | ----------------------- |
| Git Repository    | `madavstudio/wedma`     |
| Production Branch | `main`                  |
| Framework Preset  | `Vite`                  |
| Root Directory    | `./` (koreň repozitára) |
| Install Command   | `npm ci`                |
| Build Command     | `npm run build`         |
| Output Directory  | `dist`                  |
| Node.js Version   | `24.x`                  |

`vercel.json` obsahuje build, smerovanie a serverovú funkciu pre formulár.
Vercel nespúšťa `npm start`; tento príkaz je len pre samostatný Node server.
GitHub workflow iba kontroluje projekt. Neobsahuje krok na publikovanie webu.

## Environment variables

| Názov            | Kedy ho nastaviť                                                    | Hodnota                                                                                                                                                    |
| ---------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SITE_URL`       | Odporúčané po pripojení finálnej domény; verejná hodnota pri builde | Úplná HTTPS adresa webu, napríklad `https://vasa-domena.sk/`. Nepoužiť URL GitHub repozitára.                                                              |
| `RESEND_API_KEY` | Povinné na doručovanie formulára                                    | Súkromný API kľúč Resend s oprávnením odosielať.                                                                                                           |
| `CONTACT_FROM`   | Povinné na doručovanie formulára                                    | Odosielateľ na doméne overenej v Resend, napríklad `WEDMA <web@vasa-domena.sk>`.                                                                           |
| `CONTACT_ORIGIN` | Voliteľné                                                           | Jedna povolená adresa vrátane HTTPS bez koncového lomítka. Bežne nechať prázdne: formulár prijíma požiadavky z vlastnej adresy nasadenia vrátane náhľadov. |

Premenné formulára nastavte v nastaveniach Vercelu, nie v zdrojovom kóde.
Nemajú prefix `VITE_`. Príjemca správ je aktuálne `info@wedma.sk` v `server/contact.ts`.
Bez kľúča a overeného odosielateľa web funguje, formulár však oznámi nedostupné doručovanie.
Skutočné doručenie treba overiť po nasadení a konfigurácii; vývojové testy e-maily neposielajú.
`HOST` ani `PORT` na Verceli nenastavujte.

Ak `SITE_URL` chýba, build použije systémovú `VERCEL_PROJECT_PRODUCTION_URL`,
prípadne `VERCEL_URL`. Nechajte vo Verceli zapnuté automatické sprístupnenie systémových
premenných. Mimo Vercelu slúži `config/site.json` ako adresa existujúceho náhľadu.
Po zmene domény alebo `SITE_URL` treba nový build.

## URL, favicon a zdieľanie

- `/`, `/kontakt` a `/ochrana-osobnych-udajov` majú vlastný produkčný HTML súbor,
  titulok, popis a kanonickú adresu dostupnú aj bez vykonania JavaScriptu.
- Podstránky majú explicitné pravidlá smerovania. Obnovenie ani priame otvorenie
  odkazu nezávisí od predchádzajúcej návštevy úvodu.
- API `/api/contact` zostáva samostatnou serverovou funkciou a nevracia HTML úvodu.
- Favicon: presný biely a oranžový symbol WEDMA na čiernom podklade so zaoblenými rohmi, SVG, ICO,
  PNG 16/32 a Apple Touch Icon 180 px.
- Zdieľanie: WEDMA názov, popisy konkrétnej stránky, Open Graph a Twitter metadata
  a PNG loga 512 × 512. `sitemap.xml` a `robots.txt` vznikajú pri builde.
- Prepnutie SK/EN aktualizuje aj titulok a popis v prehliadači. Sociálne siete
  dostávajú slovenské metadata, pretože oba jazyky zdieľajú rovnaké URL.
- Existujúce náhľady odkazov a ikony môžu mať prehliadače a sociálne siete v cache.

## Overenie pred publikovaním

```sh
npm ci
npm run lint
npm run test:content
npm run test:how
npm run test:contact
npm run build
npm run test:deployment
npm start
```

Lokálny produkčný náhľad: `http://127.0.0.1:4173`.
Testy formulára overujú aj spracované telo požiadavky používané Vercelom a
limity veľkosti. Obmedzenie frekvencie je v pamäti jednej inštancie; pri škálovaní
nenahrádza zdieľaný limiter. Idempotentný kľúč sa odovzdáva aj doručovacej službe.

## Ďalší postup

Keď chcete web publikovať, vo Verceli zvoľte Add New → Project a importujte
`madavstudio/wedma`. Skontrolujte nastavenia vyššie, vložte doručovacie premenné
a až potom kliknite Deploy. Následne pripojte doménu a overte priamy vstup
na obe podstránky, ich obnovenie, favicon, náhľad pri zdieľaní a doručenie formulára.
Táto príprava samotný deployment nevykonáva.
