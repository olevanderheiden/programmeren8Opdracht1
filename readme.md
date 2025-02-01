## Project omschrijving

In deze game kan je een quiz spelen over de Trail/kiseki game serie gehost door 1 van de belangrijke characters van de serie(of iemand die je zelf kiest). Probeer een zo hoog mogelijke score te behalen. 
Dit is een experimentele versie die gebruik maakt van chat together ai in plaats van azure open ai. Deze versie is minder stabiel en word daarom afgeraden gebruikt te worden behalve wanneer chat together je enige optie is of als je wil experimenteren.

## Locale Installatie

1. Clone de repository met git clone.
2. Navigeer naar het sever gedeelte via de terminal (cd server)
3. Installeer de packages die nodig zijn voor het server gedeelte met npm install(zorg dat je in de server map staat).
4. Geef je eigen Chat together ai keys op in een .env file(een voorbeeld van het verwachte format is the vinden in .envEaxample) de regel voor LANGSMITH_API_KEY wordt ook gebruikt voor chat together.
5. Start de server met npm run start(zorg dat je in de server map staat).
6. open de html pagina(te vinden in de client map) in je browser of start deze als een server door op de go-live knop te drukken in visual studio code.
7. Test de functionaliteit van de app door op start quiz te drukken of een karakter te kiezen in de dropdown.

## Hoe te spelen?

1. Selecteer het karakter die de quiz host. standaard is dat Estell Bright. Je kan uit het dropdown benu één van de personages kiezen of custom selecteren en een eigen karakter toevoegen.
   Dit kan ook een personage zijn dat niet in Trails vorkomt. Wil je dat Voldemort de quiz host dan kan dat! Wees er wel van bewust dat de vragen Trails gerelateerd blijven.
2. Druk op de Start quiz knop.
3. Beantwoord de meerkeuzenvraag die gesteld word.
4. Afhankelijk van wat je antwoord is zal de host reageren op je presaties en misschien zelfs over de vraag die eerder gesteld werd.
   Probeer een zo hoog mogelijke score te halen.

letop: Wanneer je van personage wisselt zal de score worden gereset. Tevens zal het nieuwe personage zich introduceren.
Tip: Personages die je toevoegd via het custom veld worden ook toegevoegd aan de dropdown dus je hoeft het zelfd personage niet nogmaals toetevoegen als je dat al hebt gedaan.
Let wel het verversen van de pagina reset de lijst van personages weer naar de default.
