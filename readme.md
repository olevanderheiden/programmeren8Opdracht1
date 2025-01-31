## Project omschrijving

In deze game kan je een quiz spelen over de Trail/kiseki game serie gehost door 1 van de belangrijke characters van de serie. Probeer een zo hoog mogelijke score te behalen.

## Installatie

1. Clone de repository met git clone.
2. Navigeer naar het sever gedeelte via de terminal (cd server)
3. Installeer de packages die nodig zijn voor het server gedeelte met npm install(zorg dat je in de server map staat).
4. Geef je eigen Azure open ai keys op in een .env file(een voorbeeld van het verwachte format is the vindenin .envEaxample)
5. Start de server met npm run start(zorg dat je in de server map staat).
6. open de html pagina(te vinden in de client map) in je browser of start deze als een server door op de go-live knop te drukken in visual studio code.
7. Test de functionaliteit van de app door op start quiz te drukke of een karakter te kiezen in de dropdown.

## Hoe te spelen?

Druk op de Start quiz knop. Beantwoord de meerkeuzenvraag die gesteld word. Afhankelijk van wat je antwoord is zal de host reageren op je presaties en misschien zelfs over de vraag die eerder gesteld werd. Probeer een zo hoog mogelijke score te halen.

letop: Wanneer je van personage wisselt zal de score worden ge-reset. Tevens zal het nieuwe personage zich introduceren.
