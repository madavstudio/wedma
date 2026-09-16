Vytvor a implementuj kontaktnú sekciu pre existujúcu webovú stránku WEDMA. Sekcia musí nadviazať na jej aktuálny vizuálny štýl, komponenty, navigáciu a jazykové verzie.

Existujúcu stránku si najskôr prezri na adrese:
[WEDMA – aktuálna implementácia](http://127.0.0.1:5173/#uvod)

Vizuálnou referenciou je priložený screenshot kontaktnej stránky NAKA: vzdušná kompozícia na bielom pozadí, ilustrácia a text v ľavom stĺpci, minimalistický formulár v pravom stĺpci.

Výsledok musí pôsobiť ako individuálne navrhnutá súčasť WEDMA, precízne spracovaná vo Figme a následne implementovaná do funkčnej stránky.

## 1. Rozsah a umiestnenie

Implementuj kontaktnú sekciu s identifikátorom `kontakt` do existujúcej hlavnej stránky:

**Merateľné výsledky → Ako to funguje → existujúca CTA sekcia → Kontakt → Footer.**

Kontaktná sekcia bude cieľom navigácie „Kontakt“ a tlačidiel vyzývajúcich na ukážku alebo kontakt.

Použi existujúci projekt, jeho technológie, komponenty a dizajnové tokeny. Najskôr skontroluj aktuálnu implementáciu a znovu použi vhodné riešenia.

Táto požiadavka nahrádza predchádzajúce odloženie kontaktnej sekcie. Kontaktný formulár teraz vytvor a integruj.

## 2. Účel a používateľský postup

Návštevník má jednoducho:

1. Pochopiť, že ukážka bude prispôsobená jeho prevádzke.
2. Vybrať oblasť, ktorá ho zaujíma.
3. Stručne opísať svoj problém.
4. Zanechať kontaktné údaje.
5. Odoslať požiadavku a dostať jednoznačnú informáciu o výsledku.

Formulár má pôsobiť profesionálne a prívetivo. Texty ani ovládanie nesmú vytvárať dojem komplikovaného obchodného procesu.

## 3. Rozloženie sekcie

Podľa referenčného screenshotu použi:

- **Vľavo:** originálna SVG ilustrácia, pod ňou H2 a vysvetľujúci odsek.
- **Vpravo:** kontaktný formulár.

Toto rozloženie je záväzné; ilustrácia a formulár sa nachádzajú v samostatných stĺpcoch.

### Desktop

- Biele pozadie celej sekcie.
- Obsah zarovnaj na rovnaký kontajner ako ostatné sekcie WEDMA.
- Orientačná maximálna šírka obsahu: 1320–1440 px, podľa existujúceho webu.
- Použi dvojstĺpcový grid približne `0.9fr 1.1fr`.
- Medzera medzi stĺpcami: približne 72–112 px podľa dostupnej šírky.
- Horný a dolný vnútorný odstup: približne 112–144 px.
- Hornú hranu ilustrácie zarovnaj s hornou časťou formulára.
- Obidva stĺpce nech prirodzene určujú výšku obsahu.
- Bez pripínania stĺpcov počas scrollovania a bez vnútorného scrollovania formulára.

Nadviazanie na predchádzajúcu CTA sekciu uprav tak, aby sa nesčítali dva neprimerane veľké prázdne odstupy. Spodný okraj kontaktu musí čisto prejsť do existujúceho tmavého footeru.

## 4. Vizuálny štýl

Prevezmi z existujúcej WEDMA:

- Typografiu Geist pre nadpisy, odseky a formulár.
- Geist Mono pre malé sekčné označenia, ak sa už používa.
- Existujúci spôsob zaoblenia tlačidiel.
- Oranžový akcent a jeho aktuálny dizajnový token.
- Rozostupy, hrúbky čiar, štýl šípok a focus stavov.
- Čiernu, bielu a neutrálne sivé odtiene.

Farebný základ:

- Pozadie: `#FFFFFF`.
- Hlavný text: existujúca čierna alebo takmer čierna WEDMA.
- Sekundárny text: dostatočne kontrastná neutrálna sivá.
- Brand akcent: existujúca oranžová WEDMA; referenčná hodnota je `#F2801E`.
- Jemné výplne polí a deliace čiary odvoď od existujúcich neutrálnych tokenov.

Formulár neumiestňuj do výraznej samostatnej karty s veľkým tieňom. Je súčasťou otvorenej bielej kompozície.

Referenčný screenshot určuje kompozíciu a vizuálnu striedmosť. Farby, logo, typografia a detaily ovládania musia patriť značke WEDMA.

## 5. Originálna SVG ilustrácia

Vytvor vlastnú ilustráciu programovo ako inline SVG alebo samostatný SVG komponent, napríklad `ContactIllustration`.

### Kompozícia

Nadviaž na izometrickú ilustráciu zo screenshotu:

- Jemná izometrická mriežka na bielom pozadí.
- Mriežka postupne mizne smerom k okrajom.
- Jedna dominantná vyvýšená platforma v ľavej hornej až strednej časti.
- Tri menšie platformy pokračujú diagonálne smerom doprava nadol.
- Všetky platformy majú spoločnú perspektívu, konzistentné hrany a podobnú hrúbku.

Dominantná platforma:

- Biela horná plocha.
- Jemný sivý obrys.
- Oranžová bočná plocha naznačujúca priestorovú hrúbku.
- V strede existujúci symbol WEDMA vo vhodnom kontrastnom prevedení.
- Použi skutočný symbol značky z projektu; nevytváraj jeho približnú náhradu.

Menšie platformy:

- Biele plochy.
- Jemné sivé bočné hrany.
- Jednoduché symboly konverzácie, kalendára a správy alebo obálky.
- Jednotná hrúbka obrysov.
- Jemné oranžové akcenty prepájajúce ilustráciu so zvyškom stránky.

### Spracovanie

- Orientačný `viewBox`: `0 0 640 420`.
- Responzívne škálovanie so zachovaním pomeru strán.
- Ilustrácia na desktope približne 480–580 px široká podľa kontajnera.
- Tenký neutrálny rám okolo ilustrácie podobne ako na referencii.
- Jemné tiene pod platformami, bez výrazného lesku.
- Veľa bieleho priestoru.
- Všetky SVG identifikátory filtrov, masiek a gradientov musia byť jedinečné.

Ilustrácia má vyjadrovať spojenie prevádzkových údajov, komunikácie a konkrétnej pomoci.

### Animácia

Použi decentný jednorazový nástup pri vstupe do viewportu:

- Postupné zobrazenie platformy a menších prvkov.
- Posun maximálne 8–12 px.
- Trvanie približne 500–700 ms.
- Krátke, jemné prejdenie oranžového impulzu po spojovacej línii.

Celá sekvencia sa ukončí do niekoľkých sekúnd. Potom zostáva ilustrácia pokojná. Animácia nesmie rušiť vypĺňanie formulára.

Pri `prefers-reduced-motion` zobraz hotovú statickú ilustráciu.

Ilustrácia je dekoratívna: nesmie vstupovať do poradia klávesového ovládania ani predstierať klikateľné tlačidlá.

## 6. Text ľavého stĺpca

Pod ilustráciou zobraz tento obsah bez skracovania alebo prepisovania:

### H2

Poďme dostať vašu prevádzku pod kontrolu.

### Podtext

Napíšte nám, čo dnes vo svojej prevádzke potrebujete vyriešiť. Pripravíme ukážku zameranú na vaše termíny, dokumentáciu alebo spotrebu energií a spoločne sa pozrieme, kde môže WEDMA priniesť najväčší prínos.

### Typografia a rozostupy

- Odstup medzi ilustráciou a H2 približne 36–48 px.
- H2 orientačne 44–56 px na veľkom desktope, prispôsobený šírke stĺpca.
- Riadkovanie H2 približne 1.08–1.15.
- Použi váhu písma zodpovedajúcu ostatným hlavným nadpisom webu.
- Prirodzené zalomenie približne do troch riadkov; nevynucuj ho pevnými zalomeniami na všetkých zariadeniach.
- Odstup pod H2 približne 24 px.
- Podtext orientačne 17–18 px s riadkovaním 1.6.
- Text zarovnaj vľavo.

## 7. Formulár: obsah a poradie

Nad formulárom zobraz malé označenie:

**KONTAKTNÝ FORMULÁR**

Použi štýl sekčných označení WEDMA, vrátane jemného oranžového prvku, ak je súčasťou existujúceho systému.

Pod označením môže byť stručná pomôcka:

**Polia označené * sú povinné.**

Vytvor presne tieto polia:

| Poradie | Viditeľný názov | Typ | Povinnosť |
|---|---|---|---|
| 1 | Meno* | Text | Povinné |
| 2 | Priezvisko* | Text | Povinné |
| 3 | Pracovný e-mail* | E-mail | Povinné |
| 4 | Telefón | Telefón | Nepovinné |
| 5 | Firma* | Text | Povinné |
| 6 | Pracovná pozícia | Text | Nepovinné |
| 7 | Čo vás zaujíma?* | Výber jednej možnosti | Povinné |
| 8 | Čo dnes potrebujete vyriešiť?* | Viacriadkový text | Povinné |

### Rozloženie polí na desktope

- Meno a Priezvisko vedľa seba.
- Pracovný e-mail na celú šírku.
- Telefón na celú šírku.
- Firma a Pracovná pozícia vedľa seba.
- Čo vás zaujíma? na celú šírku.
- Čo dnes potrebujete vyriešiť? na celú šírku.
- Súhlas pod textovým poľom.
- Odosielacie tlačidlo pod súhlasom.

### Možnosti poľa „Čo vás zaujíma?“

Predvolená prázdna voľba:

**Vyberte oblasť**

Možnosti presne v tomto poradí:

1. Bezpečnosť, BOZP a revízie
2. Energetika a náklady
3. AI asistent a dokumentácia
4. Kompletné riešenie WEDMA
5. Zatiaľ sa chcem poradiť

Predvolená prázdna voľba nesmie byť platnou odpoveďou.

### Placeholder viacriadkového poľa

Stručne nám opíšte svoju prevádzku alebo oblasť, ktorú chcete dostať pod kontrolu.

### Povinný súhlas

Súhlasím so spracovaním osobných údajov na účely vybavenia mojej požiadavky.*

Checkbox musí byť pri prvom zobrazení nezaškrtnutý. Celý text súhlasu nech funguje ako jeho label.

Ak projekt obsahuje platnú stránku s informáciami o spracovaní osobných údajov, príslušnú časť textu môžeš prepojiť na tento existujúci cieľ. Nevytváraj nefunkčný právny odkaz.

### Tlačidlo

Chcem ukážku

### Správa po úspešnom odoslaní

Ďakujeme. Vašu správu sme prijali a čoskoro sa vám ozveme.

Nepridávaj ďalšie polia zo screenshotu, napríklad webovú adresu, krajinu alebo marketingový súhlas.

## 8. Dizajn polí a tlačidla

### Polia

- Trvalé viditeľné labely nad ovládacími prvkami.
- Placeholder slúži iba ako pomôcka.
- Výška jednoriadkových polí približne 52–56 px.
- Text v poliach minimálne 16 px.
- Jemná neutrálna výplň, približne `#F7F7F7`.
- Tenký sivý okraj s dostatočnou rozlíšiteľnosťou.
- Malé zaoblenie približne 4–8 px podľa existujúceho systému.
- Vnútorné odsadenie približne 14–16 px.
- Medzera medzi labelom a poľom približne 8 px.
- Medzera medzi skupinami polí približne 20–24 px.
- Textarea minimálne 144–168 px vysoká, s možnosťou vertikálneho zväčšenia.

Pre výber oblasti uprednostni natívny `select` upravený do vizuálu WEDMA. Vlastný komponent použi iba vtedy, ak už existuje a má korektne vyriešené klávesové ovládanie a prístupnosť.

### Tlačidlo

Na bielom pozadí použi čierne tlačidlo s bielym textom a existujúcou šípkou WEDMA.

- Zaoblenie a typografia z existujúcich CTA.
- Výška minimálne 52 px.
- Na desktope prirodzená šírka podľa obsahu.
- Na mobile celá šírka formulára.
- Hover: jemná zmena povrchu a posun šípky približne o 3 px.
- Active: krátka vizuálna odozva bez posunu okolitého obsahu.
- Focus: jasne viditeľný kontrastný obrys.

## 9. Stavy a validácia

Implementuj skutočné stavy formulára:

### Prázdny stav

- Žiadne chybové hlásenia pri prvom otvorení.
- Prázdne hodnoty.
- Nevybraná oblasť.
- Nezaškrtnutý súhlas.

### Hover a focus

- Jemne zvýraznený okraj poľa.
- Focus musí byť viditeľný aj bez zmeny farby textu.
- Nevypínaj outline bez rovnocennej náhrady.

### Vyplnený stav

- Jasne čitateľné hodnoty.
- Zachované labely.
- Bez zbytočných zelených potvrdení pri každom poli.

### Neplatný vstup

Validuj pri pokuse o odoslanie a následne primerane pri úprave už označeného poľa. Nezobrazuj chyby počas prvého písania každého znaku.

Použi stručné hlásenia pri konkrétnych poliach, napríklad:

- „Zadajte meno.“
- „Zadajte priezvisko.“
- „Zadajte platný e-mail.“
- „Zadajte názov firmy.“
- „Vyberte oblasť záujmu.“
- „Stručne opíšte, čo potrebujete vyriešiť.“
- „Na odoslanie požiadavky je potrebný váš súhlas.“

Po neúspešnej validácii zameraj prvé neplatné pole. Chybu komunikuj textom aj vizuálnym označením.

Pravidlá:

- Povinné texty nesmú pozostávať iba z medzier.
- Mená musia podporovať diakritiku, medzery, pomlčky a apostrofy.
- Pri e-maile over formát; neblokuj automaticky verejné e-mailové domény.
- Telefón je nepovinný a podporuje medzinárodné formáty.
- Voľba záujmu musí patriť do povoleného zoznamu.
- Správa má rozumný limit, napríklad 3000 znakov, zhodný na klientovi aj serveri.
- Rovnaké podstatné pravidlá overuj aj na serveri.

### Odosielanie

- Tlačidlo zmení text na „Odosielam…“.
- Zobraz malý indikátor priebehu bez zmeny šírky tlačidla.
- Zablokuj opakované odoslanie počas prebiehajúcej požiadavky.
- Zachovaj vyplnené údaje.
- Formulár označ cez `aria-busy`.

### Úspech

Po potvrdenom prijatí požiadavky zobraz presný úspešný text zo zadania.

- Potvrdenie musí byť výrazné a pokojné.
- Použi jednoduchý symbol potvrdenia.
- Oznám výsledok asistívnym technológiám.
- Zabráň výraznému skoku výšky sekcie.
- Môžeš ponúknuť nenápadné tlačidlo „Poslať ďalšiu správu“.
- Formulár resetuj až po potvrdenom úspechu.

### Chyba odoslania

Pri chybe spojenia, servera alebo nepotvrdenom výsledku zobraz:

„Odoslanie sa nepodarilo potvrdiť. Skúste to znova alebo nám napíšte na info@wedma.sk.“

E-mail musí byť funkčný odkaz. Zachovaj všetky hodnoty aj zvolenú oblasť.

## 10. Skutočné odosielanie a spracovanie dát

Formulár musí byť pripravený na reálne doručenie požiadavky.

- Najskôr skontroluj, či projekt už obsahuje formulárový endpoint alebo serverovú integráciu.
- Existujúce vhodné riešenie znovu použi.
- Ak chýba, vytvor serverové rozhranie kompatibilné s projektom a jeho nasadením, napríklad `POST /api/contact`.
- Cieľový kontakt WEDMA je `info@wedma.sk`.
- Pri e-mailovom transporte nastav návštevníkov e-mail ako `Reply-To`; odosielateľ musí používať nakonfigurovanú overenú adresu.
- Tajné kľúče a prihlasovacie údaje patria výhradne na server.
- Použi premenné prostredia a popíš potrebnú konfiguráciu.
- Uplatni serverovú validáciu, limit veľkosti požiadavky a primeranú ochranu pred opakovaným odosielaním.
- Používateľský text bezpečne spracuj ako dáta.
- Osobné údaje neukladaj do analytiky, konzoly ani lokálneho úložiska prehliadača.

Úspešnú správu zobraz iba po potvrdenom prijatí požiadavky serverom alebo nakonfigurovanou službou.

Ak chýba doručovacia konfigurácia, aplikácia nesmie predstierať úspech. Zachovaj formulár, zobraz pravdivý chybový stav a v dokumentácii uveď chýbajúce nastavenie.

Testovacie odpovede a simulované odoslanie používaj výhradne v oddelených testoch. Samotné otvorenie e-mailového klienta nepovažuj za úspešné odoslanie formulára.

## 11. Napojenie na navigáciu

Aktualizuj spoločný cieľ kontaktovania na `#kontakt`:

- Hlavné CTA „Chcem ukážku“ v headeri.
- CTA v hero sekcii.
- CTA v záverečnom prezentačnom paneli.
- Footerové tlačidlo na kontakt.
- Existujúcu položku „Kontakt“ v navigácii.

Nevytváraj duplicitnú položku navigácie.

Pri prechode:

- Zohľadni výšku plávajúceho headera pomocou `scroll-margin-top`.
- Pri ovládaní klávesnicou zabezpeč logické presunutie fokusu na nadpis sekcie.
- Neotváraj automaticky mobilnú klávesnicu fokusovaním prvého inputu.
- Rešpektuj nastavenie obmedzeného pohybu.
- Zachovaj aktuálny jazyk aj už vyplnené údaje.

Samostatné odkazy na e-mail a telefón vo footeri naďalej používajú `mailto:` a `tel:`.

## 12. Responzívne správanie

### Veľký desktop

Plná dvojstĺpcová kompozícia s výraznou ilustráciou vľavo a pohodlným formulárom vpravo.

### Notebook a širší tablet

- Zmenši medzeru medzi stĺpcami približne na 40–56 px.
- Primerane uprav nadpis a ilustráciu.
- Zachovaj pohodlnú šírku formulárových polí.

### Úzky tablet a mobil

Keď už dva stĺpce nie sú pohodlne čitateľné, prejdi na jeden stĺpec.

Poradie:

1. Kompaktnejšia SVG ilustrácia.
2. H2.
3. Podtext.
4. Označenie formulára.
5. Formulár.

Mobilnú ilustráciu uprav na nižšiu kompozíciu približne 200–240 px, aby neodsunula text a formulár zbytočne ďaleko. Zjednoduš hustotu mriežky a sekundárne dekorácie.

- Bočné odsadenie približne 20–24 px.
- H2 približne 32–38 px.
- Odseky a vstupy minimálne 16 px.
- Všetky polia pod sebou vrátane mena a priezviska.
- Tlačidlo na celú šírku.
- Checkbox s pohodlnou klikateľnou plochou minimálne 44 × 44 px.
- Žiadny horizontálny posuv.
- Chybové hlásenia a dlhé možnosti výberu sa musia celé zobraziť.

## 13. Jazykové verzie SK / EN

Použi existujúci jazykový systém stránky. Prelož všetky labely, možnosti, pomocné texty, chyby, stav odosielania aj potvrdenie.

Prepnutie jazyka nesmie vymazať formulár. Možnosti výberu používajú stabilné interné hodnoty nezávislé od preložených názvov.

Použi tieto anglické texty:

**H2**

Let’s bring your operation under control.

**Podtext**

Tell us what you need to solve in your operation today. We’ll prepare a demo focused on your deadlines, documentation or energy consumption, and explore together where WEDMA can deliver the greatest value.

**Označenie formulára**

CONTACT FORM

**Pomôcka**

Fields marked * are required.

**Polia**

- First name*
- Last name*
- Work email*
- Phone
- Company*
- Job title
- What are you interested in?*
- What do you need to solve today?*

**Predvolená voľba**

Select an area

**Možnosti**

- Safety, occupational health and inspections
- Energy and costs
- AI assistant and documentation
- Complete WEDMA solution
- I’d like some advice first

**Placeholder správy**

Briefly describe your operation or the area you’d like to bring under control.

**Súhlas**

I agree to the processing of my personal data for the purpose of handling my enquiry.*

**Tlačidlo**

Request a demo

**Odosielanie**

Sending…

**Úspech**

Thank you. We’ve received your message and will be in touch soon.

**Chyba odoslania**

We couldn’t confirm your submission. Please try again or email us at info@wedma.sk.

**Ďalšia správa**

Send another message

## 14. Prístupnosť a technická kvalita

- Použi sémantický `section`, H2, `form`, `label`, natívne vstupy a tlačidlá.
- Formulár pomenuj pomocou jeho viditeľného nadpisu.
- Každý label správne prepoj s poľom.
- Použi vhodné `autocomplete`: `given-name`, `family-name`, `email`, `tel`, `organization`, `organization-title`.
- Chybové hlásenia prepoj cez `aria-describedby`.
- Použi `aria-invalid` pre neplatné polia.
- Výsledok odoslania oznám bez opakovaného čítania celého formulára.
- Zachovaj logické poradie tabulátora.
- Over kontrast textov, ovládacích prvkov a focus stavov.
- SVG nesmie spôsobovať posuny obsahu pri načítaní.
- Formulár nesmie závisieť od dokončenia animácie.
- Nové štýly ohranič na príslušné komponenty.
- Zdieľané komponenty a jazykové slovníky uprav konzistentne s existujúcou architektúrou.

## 15. Overenie a očakávaný výsledok

Over sekciu na šírkach približne 375, 768, 1024 a 1440 px.

Skontroluj:

- Umiestnenie medzi CTA a footerom.
- Funkčnosť všetkých odkazov smerujúcich na kontakt.
- Zhodu ilustrácie, typografie a tlačidiel so značkou WEDMA.
- Presnosť slovenských textov a úplnosť anglických prekladov.
- Validáciu povinných polí a správne fungovanie nepovinného telefónu.
- Ovládanie klávesnicou a mobilnou dotykovou obrazovkou.
- Zachovanie údajov pri chybe a prepnutí jazyka.
- Stavy odosielania, potvrdeného úspechu a chyby pomocou testovacieho transportu.
- Zabránenie opakovanému odoslaniu počas prebiehajúcej požiadavky.
- Správanie pri chýbajúcej serverovej konfigurácii.
- Neprítomnosť horizontálneho posuvu a zakrytých polí.

Finálnym výsledkom má byť integrovaná kontaktná sekcia s originálnou SVG ilustráciou, presným obsahom, kvalitným responzívnym formulárom a pravdivými stavmi odosielania. Musí vizuálne nadviazať na existujúcu WEDMA a kompozične rešpektovať dodaný screenshot.

## Následná zmena zadania — samostatná podstránka

Používateľ po náhľade schválil dizajn a požiadal presunúť kontakt z hlavnej stránky na samostatnú kontaktnú podstránku. Finálny cieľ je `/kontakt`, so zachovaným dizajnom, obsahom a funkčnosťou. Táto zmena nahrádza pôvodné umiestnenie medzi CTA a footerom; hlavná stránka formulár nezobrazuje.
