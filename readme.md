## Project omschrijving

Dit is de Clientside van de Trails qiz game. Het bevat code om verbinding te maken met de severkant die de quizvragen laat generere door open Ai en vervolgens doorstuurd naar de client.
In dit gedeelte van de app kan je personages kiezen die de quiz hosten en tevens vragen beantwoorden over he Trails universum.

## Lokale installatie

1. Clone de repository met git clone
2. Open de index.html in je browser of start een locale server door op de go-live knop te drukken in visuel studio code

Tip Wil je de app gebruiken zonder de onlin server maar een lokale server gebruike clone dan ook de server kant. Gebruik de installatie instructies voor de server kant en verrander de url op regel 101 van script .js naar: `http://localhost:3000/quiz?request=${encodeURIComponent(request)}`. Wees er van bewust dat er nogsteeds verbinding gemaakt moet worden met met chatgpt en de app dus niet offline werkt.

## Hoe te spelen?

1. Selecteer het karakter die de quiz host. standaard is dat Estell Bright. Je kan uit het dropdown benu één van de personages kiezen of custom selecteren en een eigen karakter toevoegen. Dit kan ook een personage zijn dat niet in Trails vorkomt. Wil je dat Voldemort de quiz host dan kan dat! Wee er wel van bewust dat de vragen Trails gerelateerd blijven.
1. Druk op de Start quiz knop.
1. Beantwoord de meerkeuzenvraag die gesteld word.
1. Afhankelijk van wat je antwoord is zal de host reageren op je presaties en misschien zelfs over de vraag die eerder gesteld werd. Probeer een zo hoog mogelijke score te halen.

letop: Wanneer je van personage wisselt zal de score worden ge-reset. Tevens zal het nieuwe personage zich introduceren.
Tip: Personages die je toevoegd via het custom veld worden ook toegevoegd aan de dropdown dus je hoeft het zelfd personage niet nogmaals toetevoegen als je dat al hebt gedaan. Let wel het verversen van de pagina
reset de lijst van personages weer naar de default.
