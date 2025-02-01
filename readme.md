## Project omschrijving

In deze game kan je een quiz spelen over de Trail/kiseki game serie gehost door 1 van de belangrijke karakters van de serie (of iemand die je zelf kiest). Probeer een zo hoog mogelijke score te behalen. Dit is een experimentele versie die gebruik maakt van Croq AI inpaats van Azure open AI. Deze versie is minder stabiel en wordt alleen aangeraden als je geen Azure open AI key hebt.

## Locale Installatie

1. Clone de repository met git clone.
2. Navigeer naar het sever gedeelte via de terminal (cd server)
3. Installeer de packages die nodig zijn voor het server gedeelte met npm install (zorg dat je in de server map staat).
4. Geef je eigen Croq open AI keys op in een .env file (een voorbeeld van het verwachte format is te vinden in .envEaxample)
5. Start de server met npm run start (zorg dat je in de server map staat).
6. Open de html pagina (te vinden in de client map) in je browser of start deze als een server door op de go-live knop te drukken in visual studio code.
7. Test de functionaliteit van de app door op start quiz te drukken of een karakter te kiezen in de dropdown.

## Hoe te spelen?

1. Selecteer het karakter die de quiz host. Standaard is dat Estell Bright. Je kan uit het dropdown menu één van de personages kiezen of custom selecteren en een eigen karakter toevoegen.
   Dit kan ook een personage zijn dat niet in Trails voorkomt. Wil je dat Voldemort de quiz host dan kan dat! Wees je er wel van bewust dat de vragen Trails gerelateerd blijven.
2. Druk op de Start quiz knop.
3. Beantwoord de meerkeuzevraag die gesteld wordt.
4. Afhankelijk van wat je antwoord is, zal de host reageren op je prestaties en misschien zelfs over de vraag die eerder gesteld werd.
   Probeer een zo hoog mogelijke score te halen.

Let op: Wanneer je van personage wisselt zal de score worden gereset. Tevens zal het nieuwe personage zich introduceren.
Tip: Personages die je toevoegt via het custom veld worden ook toegevoegd aan de dropdown dus je hoeft hetzelfde personage niet nogmaals toe te voegen als je dat al hebt gedaan.
Let wel... het verversen van de pagina reset de lijst van personages weer naar de default.
