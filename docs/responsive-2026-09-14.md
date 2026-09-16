# Responzívne kompozície WEDMA

Mobilná navigácia používa dvojčiarkovú ikonu bez textu MENU. SK/EN zostáva viditeľné v hlavičke a šípka otvára výber. Natívny modálny dialog vypĺňa okno; na tablete má dva stĺpce odkazov, na mobile jeden. Zachovaný je Escape, uzamknutie pozadia, návrat fokusu a dotykové ciele minimálne 44 px. Vizuálna referencia navigácie: https://naka.com/ a https://qualytics.ai/. Použité sú vlastné komponenty a typografia WEDMA.

Prečo WEDMA má od 768 px benefity po oboch stranách SVG. Na telefóne je SVG vycentrované pod nadpisom s 24 px odstupom a šírkou najviac 200 px. Všetky štyri benefity sú pod ním v dvoch rovnako širokých stĺpcoch a dvoch riadkoch. SVG zostáva v bežnom toku bez prichytenia pri scrollovaní. Popisy sa neskrývajú. Farby a animované synapsie zostávajú zachované.

Hero má upravenú typografiu, rezervu pre hlavičku a vertikálne rozostupy. Pôvodná geometria funguje aj na mobile; jej prichytenie sa zapne, keď sa úvodná kompozícia zmestí do okna. V nízkom širokom okne má hero samostatnú kompaktnú sadzbu.

Výsledkové karty sa animujú prichytením aj na mobile. Ich horná hranica vychádza zo skutočnej výšky hlavičky. V nízkom širokom okne je text karty usporiadaný do dvoch stĺpcov. Ak sa obsah nezmestí pod hlavičku, karta zostáva v bežnom toku, aby sa dala celá prečítať.

Ako to funguje používa na všetkých bežných veľkostiach tú istú SVG scénu a časovú os. Na mobile a tablete na výšku je animácia pripnutá nad textom, na širokom okne vedľa neho. Výška scény rezervuje miesto najdlhšiemu textu aktuálneho jazyka. Všetky tri fázy fungujú v oboch smeroch scrollovania. Dlhý popis zodpovedných osôb má dva riadky. Vývojová referencia zachovania pohybu na mobile: https://qualytics.ai/trusted-context-at-use. Žiadne externé assety sa nepreberali.

Mobilný footer používa menší horizontálny logotyp, dvojstĺpcovú navigáciu, údaje spoločnosti a kontakt vedľa seba. Slogan zostáva samostatne uprostred úplne dole.

## Overenie

Prehliadačový fixture prechádza celú stránku, kontroluje viditeľnosť hlavičky, menu, pozície benefitov, prichytenie výsledkov, finálnu polohu hero geometrie, všetky fázy Ako to funguje vrátane spätného scrollovania, neprekrývanie popiskov a vodorovné pretečenie. Súčasťou je axe audit WCAG A/AA.

Overené veľkosti: 320 × 568, 390 × 844, 768 × 1024, 1024 × 768, 844 × 390 a 1440 × 900. SK aj EN texty. Ide o veľkosti okna v pripojenom prehliadači, nie o meranie fyzických zariadení.

Build, ESLint, obsahová kontrola 182 textov/12 pôvodných assetov a test časovej osi prešli. Pôvodné referenčné súbory sa nemenili.

V konečných behoch matice nebolo vodorovné pretečenie ani automaticky zistené porušenie WCAG A/AA. Pri šírke 390 px prešiel aj scenár s 200 % textom a obmedzeným pohybom; všetky tri statické fázy zostali dostupné. Mobilný footer má pri štandardnom texte približne 715 px. Menu na 320 × 568 px zobrazuje všetky odkazy, CTA aj slogan bez nutnosti scrollovania; pri väčšom texte sa môže prirodzene posúvať.

Izolovaný kontaktný browser fixture pri 390 px prešiel vrátane výberu SK/EN cez šípku, návratu z mobilného menu a zachovania rozpracovaného formulára. Testovací transport neposielal skutočné správy. Manuálne overený Escape pre jazykový výber a menu vrátane návratu fokusu.

Mobilná časová os pri 390 × 844 px: 349 snímok, p95 17,1 ms, maximum 17,7 ms, žiadny nesúlad aktívneho kroku a SVG. Koncová fáza bola 2, spätný návrat 0 a skok opäť 2; scéna sa zmestila do okna. Toto meranie platí pre pripojený prehliadač.

## Mobilné doladenie

V Prečo WEDMA je na mobile odstránené sticky prichytenie SVG. Pozadie prichytenej scény Ako to funguje zakrýva celú šírku displeja vrátane bočných okrajov; po prichytení siaha aj za hlavičku. Pred vstupom scény sa tento horný kryt nepredlžuje do úvodného textu. Farebné značky upozornení 90/30/7 dní sú krátke akcenty na hornej hrane štítkov, mimo textu. Značka aktívneho jazyka je 14 px SVG s 1,5 px geometrickým ťahom namiesto fontovej fajky.
