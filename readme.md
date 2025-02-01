## Project omschrijving

Dit is de Clientside van de Trails qiz game. Het bevat code om verbinding te maken met de severkant die de quizvragen laat generere door open Ai en vervolgens doorstuurd naar de client.
In dit gedeelte van de app kan je personages kiezen die de quiz hosten en tevens vragen beantwoorden over he Trails universum.

## Online versie gebruiken

1. Check of de server side aan staat. Bezoek daar voor: https://didactic-trout-wgrvvqqpwj6c75w-3000.app.github.dev. Als het goed gaat krijg je een pagina met de titel Error en de text `Cannot GET /`.
   Krijg je dit resultaat dan kan je door gaan naar stap 2.
   Is dit niet het geval contacteer dan de server beheerder op 1034047@hr.nl
2. Bezoek de client side op https://olevanderheiden.github.io/programmeren8Opdracht1/
3. Test of je vragen krijgt of Errors. Krijg je errors dan staat de server waarschijnlijk op prive. Benader in dat geval de server beheerder per e-mail(zie stap 1)

## Lokale installatie

1. Clone de repository met git clone
2. Open de index.html in je browser of start een locale server door op de go-live knop te drukken in visuel studio code

Tip Wil je de app gebruiken zonder de onlin server en in plaats daar van een lokale server gebruiken? clone dan ook de server kant. Gebruik de installatie instructies voor de server kant en verrander de url op regel 101 van script .js naar: `http://localhost:3000/quiz?request=${encodeURIComponent(request)}`. Wees er van bewust dat er nogsteeds verbinding gemaakt moet worden met met chatgpt en de app dus niet offline werkt.

Tip Het is makkelijker om de [Main Branch](https://github.com/olevanderheiden/programmeren8Opdracht1) te clonen als je een lokale server wilt gebruiken omdat deze zowel de client als server side bevat.

## Hoe te spelen?

1. Selecteer het karakter die de quiz host. standaard is dat Estell Bright. Je kan uit het dropdown benu één van de personages kiezen of custom selecteren en een eigen karakter toevoegen. Dit kan ook een personage zijn dat niet in Trails vorkomt. Wil je dat Voldemort de quiz host dan kan dat! Wee er wel van bewust dat de vragen Trails gerelateerd blijven.
1. Druk op de Start quiz knop.
1. Beantwoord de meerkeuzenvraag die gesteld word.
1. Afhankelijk van wat je antwoord is zal de host reageren op je presaties en misschien zelfs over de vraag die eerder gesteld werd. Probeer een zo hoog mogelijke score te halen.

letop: Wanneer je van personage wisselt zal de score worden ge-reset. Tevens zal het nieuwe personage zich introduceren.
Tip: Personages die je toevoegd via het custom veld worden ook toegevoegd aan de dropdown dus je hoeft het zelfd personage niet nogmaals toetevoegen als je dat al hebt gedaan. Let wel het verversen van de pagina
reset de lijst van personages weer naar de default.
