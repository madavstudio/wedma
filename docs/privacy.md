# Ochrana osobných údajov — odovzdanie 18. 9. 2026

Samostatná stránka `/ochrana-osobnych-udajov` v SK/EN. Odkaz je v spodnom riadku päty namiesto „Späť na začiatok“ a pri kontaktnom formulári; nie je v hlavnej navigácii. Vlastný obsah zásad neobsahuje pevnú e-mailovú adresu ani názvy poskytovateľa náhľadu podľa požiadavky klienta. Prevádzkovateľ, sídlo, telefón a kontaktná stránka sú uvedené.

## Formulár

Povinné, predvolene nezaškrtnuté políčko potvrdzuje oboznámenie sa s informačnou povinnosťou. Nie je to povinný marketingový súhlas. Pri bežnej predzmluvnej komunikácii sa základ určuje podľa účelu a postavenia kontaktujúcej osoby: čl. 6 ods. 1 písm. b) alebo f) GDPR. Zachovaný názov poľa `consent` je iba kompatibilita existujúceho rozhrania. Frontend aj server vyžadujú skutočnú hodnotu `true`. Záznam pre doručenie obsahuje verziu oznámenia. Otvorenie zásad samo políčko neoznačí a nestratí rozpísané údaje.

## Rozsah overenia a nasadenie

V zdrojovom kóde nie je návštevnícka analytika, reklamný pixel ani ukladanie formulára do localStorage. Lokálne sa ukladá jazyk; formulár je len v pamäti otvorenej stránky. Technické spracúvanie prevádzkovateľom hostingu je oddelené od lokálneho nasadenia zákazníckej aplikácie. Informácia o možných prenosoch mimo EHP a zárukách zostáva v oznámení bez názvu poskytovateľa.

Aktuálna hostingová konfigurácia publikuje statický `dist`. Serverové `/api/contact` tým nie je nasadené. Serverový kód podporuje poskytovateľa doručenia až po konfigurácii; testy používajú výlučne náhradu doručenia, žiadne e-maily neposielajú. UI nesmie oznámiť úspech bez potvrdenia servera.

Pred ostrým spustením prevádzkovateľ musí potvrdiť skutočných dodávateľov hostingu a komunikácie, ich postavenie, spracovateľské zmluvy, záruky prenosu a doby uchovávania vrátane záloh. V oznámení sú kritériá uchovávania; deklarované vymazanie po ukončení komunikácie treba aj prakticky nastaviť. Poskytovateľ pošty, prípadné CRM a ďalšie použitie údajov neboli potvrdené. Nepovažovať implementáciu webu za overenie celej prevádzky firmy podľa GDPR. Pri zmene hostingu alebo pridaní marketingu oznámenie aktualizovať.

## Podklady

- GDPR, najmä čl. 5, 6, 12–22 a 44–49: https://eur-lex.europa.eu/legal-content/SK/TXT/?uri=CELEX%3A32016R0679
- Slovenský dozorný orgán: https://www.dataprotection.gov.sk/sk/ine/vzory-formulare-stiahnutie/navrh-zacatie-konania-ochrane-osobnych-udajov/

## Kontroly

- Typová kontrola, lint a kontrola schválených textov.
- Izolované serverové testy vrátane odmietnutia nezaškrtnutého, chýbajúceho a neplatného potvrdenia.
- Prehliadač: cesta zásad, povinné potvrdenie, zachovanie konceptu, SK/EN, kontrola prístupnosti a šírky stránky.

Výsledok: zostavenie aj lint prešli, 176 schválených textov zachovaných, 9 serverových testov úspešných. Prehliadač pri šírke 1280 aj 375 px: všetky kontrolované scenáre úspešné, bez zistených WCAG AA porušení a bez vodorovného pretekania. Samostatná kontrola mobilnej podstránky potvrdila neprítomnosť názvov poskytovateľa a zmienok o umelej inteligencii v obsahu zásad.
