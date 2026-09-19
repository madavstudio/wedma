# Kontakt WEDMA

Kontakt je na samostatnej podstránke `/kontakt`. Hlavná stránka končí CTA panelom a footerom; formulár sa v jej rozložení ani v strome prístupnosti nezobrazuje. Má vlastnú SVG ilustráciu, presné zadanie v SK/EN a osem polí plus povinný súhlas. Všetky kontaktné CTA smerujú na túto podstránku; samostatný e-mail a telefón vo footeri zostávajú `mailto:` a `tel:`. Nadpis dostane fokus po aktivácii kontaktného odkazu, prvé pole sa automaticky neotvára. Klientská navigácia zachová rozpísaný formulár v pamäti aj pri návrate na hlavnú stránku a späť. Odkazy z kontaktu na sekcie hlavnej stránky používajú `/#id`; priamy reload `/kontakt` podporuje Vite aj produkčný Node server.

## Čo je potrebné na reálne doručovanie

**Doručovacie údaje neboli dodané. Aktuálny náhľad preto validnú požiadavku odmietne stavom 503 a návštevníkovi zobrazí pravdivú chybu s odkazom na info@wedma.sk. Nezobrazuje úspech.**

Server je pripravený na e-mailový transport Resend cez `POST /api/contact`. Vyžaduje serverové premenné:

- `RESEND_API_KEY`: kľúč s oprávnením posielať e-maily.
- `CONTACT_FROM`: overená odosielateľská adresa, napríklad `WEDMA <website@vasa-overena-domena.sk>`; doména musí byť overená v Resend.
- `CONTACT_ORIGIN` (voliteľné): jedna povolená verejná adresa vrátane protokolu, bez koncového lomítka. Bez tejto hodnoty sa prijímajú požiadavky z vlastného originu nasadenia.

Žiadna premenná nesmie mať prefix `VITE_`. `.env` a `.env.*` sú ignorované verziovaním, `.env.example` obsahuje prázdny vzor. Nastavte hodnoty v prostredí servera alebo v lokálnom `.env` a reštartujte proces. Tajomstvá nevkladajte do klienta ani do chatu.

Príjemca je pevne nastavený na `info@wedma.sk`; návštevníkov e-mail je iba `Reply-To`. Správa sa posiela ako obyčajný text. Úspech je potvrdený až po úspešnej odpovedi poskytovateľa s ID prijatej správy; nejde o tvrdenie, že adresát už správu prečítal alebo že sa neskôr nemôže vrátiť ako nedoručiteľná.

Rozhranie vychádza z oficiálnej dokumentácie [odosielania e-mailu](https://resend.com/docs/api-reference/emails/send-email) a [idempotentných požiadaviek](https://resend.com/docs/dashboard/emails/idempotency-keys). Nepoužíva klientsky SDK ani externé skripty formulárovej služby.

## Lokálny a produkčný server

- `npm run dev -- --port 5173`: Vite + lokálne API z rovnakého originu.
- `npm run build`: typová kontrola klienta aj servera a klientsky build v `dist/`.
- `npm run preview`: produkčný klient vo Vite preview, s rovnakým kontaktným middleware.
- `npm start`: samostatný Node server, ktorý obsluhuje `dist/` a `/api/contact`. Načíta voliteľný `.env`. Predvolené rozhranie `127.0.0.1:4173`; meniť možno pomocou `HOST` a `PORT`.

Node.js 22.18+ je potrebný pre spúšťanie serverových TypeScript súborov. Odporúčaná a overená verzia je 24.x. Čisto statické nahratie priečinka `dist/` samo osebe e-maily odosielať nebude. Existujúci verejný náhľad je statický. Pre Vercel je pripravený adaptér `api/contact.ts`; postup a nastavenia sú v [vercel.md](vercel.md). Vercel zostaví klienta a zabalí serverové závislosti funkcie z celého repozitára.

## Validácia, duplicity a súkromie

- Klient aj server používajú `src/contact/schema.ts`: neprázdne orezané povinné údaje, medzinárodné mená, formát e-mailu bez zákazu verejných domén, nepovinný telefón, povolené interné hodnoty výberu a výslovný súhlas.
- Správa najviac 3000 znakov, e-mail 254, mená 100, firma a pozícia 200, telefón 80. Server prijíma iba JSON do 16 KiB.
- Text sa v e-maile interpretuje iba ako dáta; žiadne používateľské HTML, príjemcovia ani hlavičky odosielateľa sa z neho nevytvárajú.
- Limit päť pokusov za 15 minút podľa zahashovanej IP. Samostatný Node server používa socket; adaptér na Verceli používa platformou nastavenú `x-vercel-forwarded-for`, iba keď `VERCEL=1`. Pamäťový limit platí pre jednu inštanciu. Viac inštancií vyžaduje zdieľaný limiter alebo limit na platforme.
- Pri opakovaní nezmeneného formulára ostáva rovnaký náhodný idempotency key. Server súčasné rovnaké požiadavky spája a potvrdený výsledok uchováva 24 hodín; kľúč posiela aj poskytovateľovi. Zmena obsahu s rovnakým kľúčom je konflikt 409.
- Pamäť servera obsahuje dočasné hashované identifikátory a výsledky, bez perzistentnej databázy. Reštart vymaže lokálny limiter/cache; deduplikácia poskytovateľa sa uplatní podľa jeho pravidiel. Neistý výsledok možno opakovať s rovnakým kľúčom.
- Údaje zostávajú v pamäti formulára počas vypĺňania a sú odovzdané poskytovateľovi výhradne pri odoslaní. Nie sú v analytike, konzole, URL ani lokálnom úložisku. Reset nastane až po potvrdenom úspechu.
- Povinné potvrdenie odkazuje na stránku ochrany osobných údajov a potvrdzuje oboznámenie sa s informáciami; nejde o marketingový súhlas.

## Overenie

`npm run test:contact` používa lokálny HTTP server a injektovaný testovací transport. Žiadne testovacie e-maily sa neposielajú. Overuje validáciu, chýbajúcu konfiguráciu, veľkosť požiadavky, origin/content type, súbežné duplicity, opakovanie zlyhania, rate limit a formát požiadavky poskytovateľovi.

`/tests/contact-browser.html` je oddelená vývojová pomôcka s lokálne simulovaným `fetch` iba pre `/api/contact`. Overuje prázdny stav, chyby, fokus, jazyky, zachovanie hodnôt, priebeh, duplicity, neúspech a úspech; výsledky sú v `#contact-qa-report`. Varianty `?view=error` a `?view=success` zastavia test na danom stave. Testovacie súbory sa nedostanú do produkčného buildu a produkčný server ich neservíruje.
