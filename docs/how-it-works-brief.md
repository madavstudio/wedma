# DOPLNKOVÝ PROMPT PRE CODEX — SEKCIA „AKO TO FUNGUJE“

Rozšír existujúcu webovú stránku WEDMA o sekciu „Ako to funguje“. Implementuj ju ako súčasť existujúceho projektu, s jeho komponentmi, typografiou, prekladmi a animačnými pravidlami.

Aktuálna stránka:

http://127.0.0.1:5173/#meratelne-vysledky

Vizuálna a pohybová referencia:

https://qualytics.ai/

Použi sekciu „How It Works“ a dodané štyri screenshoty. Jej princíp prispôsob trom krokom WEDMA: ľavá technologická ilustrácia zostáva počas scrollovania prichytená a plynulo sa mení podľa pravých textových blokov.

Výsledkom má byť kompletná funkčná sekcia s vlastnou programovo vytvorenou SVG animáciou.

## 1. Rozsah zmeny a umiestnenie

Sekciu vlož presne v tomto poradí:

1. existujúce Merateľné výsledky;
2. nová sekcia Ako to funguje;
3. existujúci oranžový CTA panel;
4. existujúci footer.

Nová sekcia má ID:

`ako-to-funguje`

Tento doplnok aktualizuje predchádzajúce zadanie: sekcia „Ako to funguje“ sa teraz stáva súčasťou webu.

Doplň odkaz „Ako to funguje“ do hlavnej navigácie, mobilného menu a navigácie footera. Použi existujúcu navigačnú konfiguráciu a rovnaké správanie aktívnej sekcie.

Vo footeri umiestni nový odkaz za „Merateľné výsledky“. V hlavnej navigácii ho umiestni za „Výsledky“. Ak desktopová navigácia prestáva mať dostatok priestoru, prepni na mobilný variant skôr; nezmenšuj text na nečitateľnú veľkosť.

Zachovaj ostatné sekcie, kontaktné ciele, prepínač jazykov aj existujúce animácie.

## 2. Nadviazanie na aktuálny dizajn WEDMA

Najprv prečítaj aktuálne komponenty a dizajnové tokeny projektu.

Existujúca stránka používa:

- Geist Variable;
- výrazné nadpisy s tesnejším riadkovaním;
- malé monospace označenia sekcií;
- oranžový kapsulový marker;
- čiernu a bielu;
- jemné sivé deliace línie;
- plávajúcu bielu navigáciu po scrollovaní.

Novú sekciu navrhni v tomto systéme.

Pozadie zvoľ tmavé, zhodné s aktuálnou sekciou „Prečo WEDMA“, ktorá používa približne #111111. Použi existujúci token tejto plochy.

Farebnosť:

- pozadie: existujúca tmavá plocha;
- hlavné texty: #FFFFFF;
- odseky: približne #B0B0B0 až #C0C0C0;
- hlavný akcent: oranžová WEDMA #F2801E;
- neaktívne vedenia ilustrácie: tlmená sivá;
- deliace línie: biela s opacity približne 10–14 %.

Zelenú a modrú v tejto sekcii nepoužívaj ako ďalšie dominantné akcenty. Ilustrácia má byť súdržná, prevažne oranžová na tmavom pozadí.

Prechod z bielych výsledkov na tmavú sekciu je čistý. Po jej dokončení nasleduje biela vonkajšia plocha existujúceho CTA panela.

## 3. Štruktúra sekcie

Sekcia má dve hlavné časti:

A. široký úvodný text nad celou kompozíciou;

B. dvojstĺpcový priebeh s animáciou vľavo a tromi krokmi vpravo.

Použi rovnaký obsahový kontajner ako zvyšok stránky, orientačne 1320–1440 px.

Horné odsadenie na desktope približne 112–144 px. Na mobile približne 64–80 px, podľa existujúceho systému.

Úvod zarovnaj doľava. Nemá byť vycentrovaný ako produktové sekcie.

Pod úvodom nechaj približne 56–80 px a pridaj jemnú horizontálnu deliacu čiaru.

Spodná dvojstĺpcová kompozícia začína pod touto hranicou.

## 4. Presný slovenský úvod

Označenie:

AKO TO FUNGUJE

Text:

WEDMA mení statické dokumenty na živý prehľad o vašej prevádzke. Po nahratí prečíta ich obsah, rozpozná termíny, zariadenia a zodpovedné osoby a spojí ich na jednom mieste. Od tej chvíle priebežne sleduje vaše povinnosti a upozorní vás skôr, než si termín vyžiada okamžitú pozornosť.

Zachovaj celý text presne. Technický zápis `&#x20;` zo zadania nie je súčasťou zobrazovaného obsahu.

### Vizuálne spracovanie úvodu

Označenie má existujúci monospace štýl a malú oranžovú kapsulu pred textom.

Úvodná výpoveď má byť veľká a dominantná, podobne ako na prvom screenshote:

- približne 36–44 px na veľkom desktope;
- riadkovanie približne 1,2–1,3;
- normálna až stredná hrúbka;
- šírka takmer celého kontajnera;
- prirodzené zalamovanie;
- dostatok priestoru medzi označením a textom.

Prvú vetu môžeš použiť ako H2 a zostávajúce vety ako nadväzujúci lead odsek. Vizuálne majú tvoriť jeden súvislý textový blok s rovnakou alebo veľmi podobnou veľkosťou písma.

Nezmenšuj zvyšok úvodu na drobný bežný odsek.

### Jemné zvýrazňovanie pri scrollovaní

Referencia postupne zosvetľuje slová úvodného textu pri scrollovaní. Tento princíp môžeš použiť aj tu:

- slová prechádzajú z čitateľnej tlmenej sivej do bielej;
- priebeh je viazaný na polohu úvodu v okne;
- text nemení polohu ani mierku;
- nezobrazuj typewriter efekt;
- každé slovo je čitateľné už pred zvýraznením;
- rozdelenie na slová nesmie poškodiť medzery, zalamovanie ani čítačku obrazovky.

Pri reduced motion alebo vypnutých animáciách zobraz celý text priamo vo finálnej farbe.

## 5. Desktopová kompozícia krokov

Použi približne:

- 40 % šírky pre ilustráciu;
- 60 % pre textové kroky.

Ľavý panel je vizuálne otvorený, bez kartového podkladu.

Pravý stĺpec oddeľ jemnou vertikálnou líniou. Jednotlivé kroky oddeľ horizontálnymi čiarami. Môžu mať jemné krátke prerušovanie podobné referencii, ale zachovaj nenápadnosť.

Pravé bloky:

- bez samostatných zaoblených kariet;
- rovnaké tmavé pozadie ako sekcia;
- veľkorysé vertikálne odsadenie;
- text zarovnaný doľava;
- všetky tri bloky zostávajú v prirodzenom toku dokumentu.

Orientačná minimálna výška jedného kroku je 50–60svh. Pri veľkom monitore ju rozumne obmedz približne na 480–560 px. Obsah môže výšku vždy zväčšiť.

Horný nábeh pravého stĺpca môže mať približne 20–30svh, aby mala ilustrácia priestor na vstup. Vyváž ho tak, aby sa prvý krok objavil včas a nevznikla dlhá prázdna obrazovka.

## 6. Presné texty krokov

### KROK 1

Označenie:

KROK 1

Nadpis:

Nahráte prevádzkové podklady

Opis:

Revízne správy, záznamy o školeniach, zmluvy a protokoly vložíte na jedno miesto. Nemusíte ich ručne prepisovať do ďalších tabuliek.

### KROK 2

Označenie:

KROK 2

Nadpis:

WEDMA nájde, čo je dôležité

Opis:

Z dokumentov vyberie termíny, zariadenia a zodpovedné osoby. Informácie usporiada tak, aby ste ihneď videli súvislosti a ďalšie povinnosti.

### KROK 3

Označenie:

KROK 3

Nadpis:

Prehľad pracuje ďalej

Opis:

Priebežne ukazuje stav súladu a blížiace sa lehoty. Upozornenia dostanete 90, 30 a 7 dní vopred, takže viete, čo treba riešiť ako prvé.

### Typografia krokov

- označenie: približne 13–15 px, monospace alebo existujúci štýl drobných popisov;
- nadpis: približne 28–34 px;
- opis: približne 18–20 px;
- riadkovanie opisu: približne 1,5–1,65;
- maximálna šírka opisu: približne 52–60 znakov na riadok.

Pred nadpisovou skupinou vlož malý oranžový kruhový marker približne 12–16 px.

Opis zarovnaj s textom nadpisu, nie s ľavým okrajom markeru.

Texty všetkých krokov zostávajú čitateľné. Aktuálny krok môže mať výraznejší marker a označenie, ale neaktívne kroky neznižuj na takmer neviditeľnú opacity.

## 7. Ľavá ilustrácia — spoločný vizuálny základ

Naprogamuj jednu vlastnú vrstvenú SVG scénu, ktorá sa postupne mení.

Základný charakter podľa referencie:

- priestorová základňa v spodnej časti;
- na nej centrálny čip WEDMA;
- nad ním vedenia rozbiehajúce sa do vejára;
- malé dokumenty alebo dátové uzly na týchto vedeniach;
- jemná oranžová žiara;
- tenké oranžové a sivé línie;
- eliptické obrysy okolo základne;
- postupne sa objavujúca horizontálna dátová os.

Vytvor vlastnú scénu WEDMA. Nepreberaj logo Qualytics ani logá databáz a služieb z referencie.

### Nadviazanie na existujúce ilustrácie

Preskúmaj najmä:

- `wedma-data.svg`;
- `wedma-sekcia-poslanie-firmy.svg`;
- existujúci komponent WEDMA symbolu;
- štýl ikon v sekcii „Prečo WEDMA“.

Použi ich ako základ tvarov, perspektívy a kresby.

Ak má aktuálna stránka samostatný vektorový symbol WEDMA, použi ho. Nenahrádzaj ho obyčajným písmenom W ani iným logom.

Ak je potrebné vytvoriť nové prvky, kresli ich ako natívne SVG. Nepoužívaj generovaný rastrový obrázok alebo vložené video.

### Proporcie

Ako pracovný súradnicový systém použi napríklad viewBox približne 620 × 960.

Na desktope ilustráciu zobraz orientačne v šírke 400–520 px a výške podľa dostupného priestoru.

Scéna sa škáluje so zachovaním pomeru strán. Obsah musí zostať v bezpečnom výreze aj pri menšom okne.

### Vrstvy

Rozdeľ scénu minimálne na:

- jemnú žiaru;
- základňu a jej elipsy;
- WEDMA čip;
- vstupné trasy;
- dokumentové uzly;
- skenovací prvok;
- rozpoznané údaje;
- výstupnú os;
- upozornenia 90 / 30 / 7 dní.

Všetky vrstvy majú stabilné pozície a definované prechodové stavy. Nevytváraj náhodnú animáciu pri každom renderovaní.

## 8. Stav ilustrácie pre KROK 1 — nahratie dokumentov

Vysvetľovaná myšlienka:

Rôzne prevádzkové dokumenty sa zhromaždia v jednom systéme.

Zobraz:

- centrálny čip WEDMA v spodnej tretine ilustrácie;
- dve tenké eliptické línie okolo základne;
- približne 5–7 vstupných vedení rozbiehajúcich sa nahor;
- štyri jednoduché symboly dokumentov;
- malé oranžové signály smerujúce po vedeniach k centrálnemu čipu.

Dokumenty môžu niesť krátke označenia:

- Revízie
- Školenia
- Zmluvy
- Protokoly

Symboly sú jednoduché obrysové listy s jemne naznačenými riadkami alebo prehnutým rohom.

Pri scrollovaní:

1. dokumenty sa jemne objavia;
2. vedenia sa postupne rozsvietia;
3. niekoľko svetelných bodov prejde smerom k WEDMA;
4. základňa krátko zosilní žiaru.

Použi približne 6–10 malých signálov, nie hustý roj častíc.

Táto grafika ilustruje nahrávanie. Nevytváraj skutočné tlačidlo uploadu, dropzone ani výber súborov.

## 9. Stav ilustrácie pre KROK 2 — rozpoznanie informácií

Vysvetľovaná myšlienka:

WEDMA z dokumentov vyberie konkrétne údaje a usporiada ich.

Zachovaj rovnakú základňu, symbol a hlavné vedenia.

Pri prechode z prvého kroku:

- dokumentové uzly sa mierne preskupia;
- cez ich oblasť prejde tenká horizontálna skenovacia línia;
- textové riadky dokumentov sa vizuálne zjednodušia na usporiadané dátové bloky;
- objavia sa tri skupiny údajov.

Skupiny:

- Termíny — symbol kalendára;
- Zariadenia — jednoduchý technický symbol;
- Zodpovedné osoby — symbol osoby.

Horizontálna os môže mať malý diamantový bod v strede a dva menšie na koncoch, podobne ako technická kresba referencie.

Vedenia sa postupne menia zo sivej na oranžovú. Nové skupiny zostávajú zreteľne prepojené s centrálnym čipom.

Prechod musí pôsobiť ako reorganizácia tej istej scény. Neprepínaj celý obrázok obyčajným crossfade medzi tromi nesúvisiacimi ilustráciami.

Nevymýšľaj konkrétne mená osôb, termíny revízií ani skutočné firemné dokumenty.

## 10. Stav ilustrácie pre KROK 3 — priebežný prehľad

Vysvetľovaná myšlienka:

Usporiadané informácie vytvárajú prehľad a včasné upozornenia.

Pri prechode z druhého kroku:

- rozpoznané údaje zostávajú v hornej časti, ale vizuálne sa upokoja;
- centrálna základňa sa môže mierne zdvihnúť, aby vznikol priestor pre výstupy;
- pod ňou sa vykreslí jednoduchá vodorovná os;
- z osi sa odvodia tri upozornenia.

Označenia upozornení:

- 90 dní vopred
- 30 dní vopred
- 7 dní vopred

Použi malé čisté štítky, kalendárové uzly alebo obrysové panely. Musia zostať súčasťou technickej ilustrácie, nie veľkými produktovými kartami.

Doplň jednoduchý symbol prehľadu alebo štít s potvrdením. Nezobrazuj fiktívne „100 % súlad“.

Pri scrollovaní sa výstupné vedenia a upozornenia postupne zvýraznia v poradí 90 → 30 → 7.

Toto poradie znázorňuje systém upozornení. Nesmie pôsobiť ako reálne odpočítavanie času.

Finálny stav:

- usporiadaná scéna;
- čitateľné tri intervaly;
- stabilný WEDMA symbol;
- jemná oranžová žiara;
- prehľadné prepojenie vstupov a výstupov.

## 11. Presné správanie pri scrollovaní

### Ľavý sticky panel

Na desktope zostáva ľavá ilustrácia prichytená počas prechodu všetkými tromi krokmi.

Horný odstup odvoď od skutočnej spodnej hrany navigácie a pridaj približne 24 px.

Výšku scény odvoď od zostávajúcej výšky okna. Jej základňa ani výstupné štítky nesmú byť skryté pod navigáciou alebo mimo spodného okraja.

Prichytený panel má spoločného rodiča s tromi pravými krokmi a uvoľní sa pri konci tejto kompozície.

### Pravé kroky

Textové bloky sa posúvajú prirodzene so stránkou. Nie sú carousel, accordion ani prekrývajúce sa výsledkové karty.

Na obrazovke môže byť súčasne viditeľný aktuálny krok a časť nasledujúceho.

### Synchronizácia

Použi jednu spoločnú scrollovaciu časovú os pre celú ilustráciu.

Pre každý textový krok odmeraj jeho polohu. Ako čítaciu úroveň použi približne stred dostupného priestoru pod navigáciou.

Definuj tri hlavné kotvy:

- pri čítacej úrovni prvého kroku je zreteľný stav nahratia;
- pri čítacej úrovni druhého kroku je dokončené rozpoznanie údajov;
- pri čítacej úrovni tretieho kroku je zreteľný prehľad s upozorneniami.

Medzi kotvami plynulo interpoluj transformácie, vykreslenie ciest a nepriehľadnosť jednotlivých vrstiev.

Prechod sústreď približne do posledných 25–35 % cesty k nasledujúcej kotve. Každý hlavný stav tak zostane dostatočne dlho rozpoznateľný.

Aktívny textový marker aj ilustrácia musia vychádzať z rovnakej logiky priebehu, aby sa nerozchádzali.

### Vyhladenie

Referencia používa plynulé scrollové riadenie s približne polsekundovým dobehom. Pre WEDMA použi jemné vyhladenie približne 250–500 ms podľa odozvy zariadenia.

Pohyb musí byť:

- plynulý;
- vratný pri scrollovaní nahor;
- deterministický;
- správny aj po rýchlom preskočení sekcie;
- správny pri načítaní stránky priamo na jej kotve.

Nepúšťaj ilustráciu automaticky ako video po vstupe do sekcie. Jej hlavný postup určuje scroll používateľa.

Po zastavení scrollu sa hlavná scéna ustáli. Nepotrebuje nekonečné pohupovanie.

Na konci nechaj dostatok priestoru na prečítanie tretieho kroku. Potom sa ľavý panel prirodzene uvoľní a nasleduje CTA.

## 12. Responzívne správanie

### Desktop

Dva stĺpce, ľavá prichytená scéna, pravé kroky v prirodzenom toku.

### Tablet a užšie obrazovky

Približne pod 1000 px prejdi na jeden stĺpec.

Poradie:

1. úvod;
2. kompaktná ilustrácia;
3. kroky.

Ak je dostatok výšky, ilustrácia môže zostať prichytená v menšom pásme pod navigáciou a reagovať na kroky pod ňou. Nesmie zabrať väčšinu čitateľnej plochy.

### Mobil

- úvod približne 25–30 px;
- nadpisy krokov približne 23–27 px;
- odseky 16–18 px;
- bočné odsadenie podľa existujúcej stránky, približne 20–24 px;
- kroky bez zbytočnej pevnej výšky;
- označenia v ilustrácii musia zostať čitateľné.

Na úzkych alebo nízkych mobilných obrazovkách uprednostni tri kompaktné statické varianty tej istej scény pri príslušných krokoch. Každý krok tak má priamo pri sebe zrozumiteľný vizuálny stav.

Táto mobilná adaptácia používa rovnaké SVG vrstvy a rovnaký vizuálny jazyk.

Nezavádzaj horizontálny slider ani skryté textové panely vyžadujúce gesto.

## 13. Jazyky SK / EN

Napoj sekciu na existujúci slovník a prepínač jazykov.

ID sekcie sa nemení. Prelož aj krátke označenia vo vnútri ilustrácie.

### EN úvod

Označenie:

HOW IT WORKS

Text:

WEDMA turns static documents into a live overview of your operation. Once uploaded, it reads their contents, identifies deadlines, equipment and responsible people, and brings them together in one place. From then on, it continuously tracks your obligations and alerts you before a deadline demands immediate attention.

### STEP 1

You upload your operational documents

Upload inspection reports, training records, contracts and protocols to one place. There’s no need to manually copy them into more spreadsheets.

### STEP 2

WEDMA finds what matters

It extracts deadlines, equipment and responsible people from your documents. It organises the information so you can immediately see the connections and upcoming obligations.

### STEP 3

Your overview keeps working

It continuously shows compliance status and upcoming deadlines. You receive alerts 90, 30 and 7 days in advance, so you know what to address first.

### EN ilustrácia

- Revízie → Inspections
- Školenia → Training
- Zmluvy → Contracts
- Protokoly → Protocols
- Termíny → Deadlines
- Zariadenia → Equipment
- Zodpovedné osoby → Responsible people
- 90 dní vopred → 90 days ahead
- 30 dní vopred → 30 days ahead
- 7 dní vopred → 7 days ahead

Po zmene jazyka prepočítaj výšky a scrollové kotvy. Zachovaj približne rovnaký krok a pozíciu návštevníka.

## 14. Technická realizácia a prístupnosť

Použi existujúci framework a animačné nástroje projektu.

Odporúčané rozdelenie:

- `HowItWorksSection`;
- `HowItWorksStep`;
- `HowItWorksIllustration`;
- spoločná dátová definícia krokov;
- jedna scrollová časová os.

Pre kresbu použi natívne SVG:

- `path`, `g`, `ellipse`, masky a gradienty;
- vykresľovanie čiar cez dash offset;
- transformácie vrstiev;
- mierne opacity prechody;
- jedinečné SVG ID.

Nepotrebuješ WebGL ani nový 3D engine. Priestorový vzhľad možno vytvoriť konzistentnou izometrickou kresbou.

Lottie referencie slúži na štúdium pohybu. Nevkladaj pôvodnú animáciu Qualytics do WEDMA.

Technické pravidlá:

- nevytváraj nový vnútorný scrollbar;
- nezachytávaj koliesko myši;
- nepoužívaj globálne selektory zasahujúce do hero alebo výsledkov;
- pri odpojení komponentu odstráň listenery a animácie;
- mimo obrazovky zastav nepotrebné aktualizácie;
- pri skrytej karte zastav vykresľovanie;
- zachovaj správne správanie pri zmene veľkosti okna;
- animácia nesmie spôsobiť layout shift.

Rešpektuj existujúci prepínač „Pozastaviť animácie“ aj `prefers-reduced-motion`.

Pri obmedzení pohybu:

- úvod je celý čitateľný;
- kroky zostávajú viditeľné;
- zobraz statické stavy ilustrácie pri krokoch;
- nepoužívaj scrollové zvýrazňovanie slov ani pohyb scény.

SVG je vysvetľujúca ilustrácia. Dôležité informácie už obsahujú texty krokov, preto dekoratívne vrstvy skry pred čítačkami obrazovky.

Zmenu aktívneho kroku neoznamuj opakovane cez rušivý live región.

Pri načítavaní ilustrácie rezervuj jej priestor. Pri chybe vykreslenia zachovaj statický fallback a všetky texty. Nezobrazuj falošné stavy nahratia alebo spracovania skutočného súboru.

## 15. Overenie a finálny výsledok

Skontroluj v prehliadači:

- sekcia nasleduje bezprostredne po `#meratelne-vysledky`;
- existujúce CTA zostáva za novou sekciou;
- navigácia obsahuje funkčný nový odkaz;
- všetky slovenské texty presne zodpovedajú zadaniu;
- SK / EN funguje vrátane ilustrácie;
- ľavá scéna je jedna súdržná animácia s tromi rozpoznateľnými stavmi;
- stav ilustrácie zodpovedá čítanému kroku;
- scrollovanie hore aj dole funguje bez preskokov;
- posledný krok aj jeho ilustrácia sú celé čitateľné;
- pri rýchlom scrollovaní sa nezobrazuje oneskorený nesprávny stav;
- mobilná verzia má čitateľný obsah a primerane veľkú grafiku;
- reduced motion a pozastavenie animácií fungujú;
- existujúce výsledkové karty, navigácia a CTA fungujú aj po vložení sekcie;
- build a relevantné projektové kontroly prejdú.

Vizuálny výsledok má vyjadriť jednu súvislú premenu:

**dokumenty → rozpoznané údaje → priebežný prehľad a včasné upozornenia.**

Zachovaj kompozičnú presnosť referencie a identitu už existujúceho webu WEDMA.

## Aktualizácia podľa následnej požiadavky používateľa

Úvodný odsek skrátiť približne na polovicu. Ilustráciu priblížiť Prečo WEDMA a Našej misii s jemnými akcentmi #00D23A, #0094F3 a zlatou #F8C14D; zachovať grafitové plochy a oranžovú identitu.

Aktuálny SK úvod:
WEDMA mení statické dokumenty na živý prehľad o vašej prevádzke. Rozpozná termíny, zariadenia a zodpovedné osoby, spojí ich do prehľadu a včas upozorní na blížiace sa povinnosti.

Aktuálny EN úvod:
WEDMA turns static documents into a live overview of your operation. It identifies deadlines, equipment and responsible people, brings them into one overview and alerts you to upcoming obligations.


### Ďalšie skrátenie a minimalistická ilustrácia

Podľa používateľa skrátený opis opäť približne na polovicu, logo nahradené vlastným symbolom dátových vrstiev. Pri rozpoznaní dokumenty ustúpia údajom, aby sa scéna nezapĺňala.

WEDMA mení statické dokumenty na živý prehľad o vašej prevádzke. Usporiada údaje z dokumentov a včas upozorní na povinnosti.

WEDMA turns static documents into a live overview of your operation. It organises document data and alerts you to upcoming obligations.
