## Project omschrijving

Dit is de server side van de Trails Quiz game. Dit gedeelte van de applicatie beheert de verbinding met open AI en handelt de prompts.
Let op: Dit gedeelte van de app werkt niet zonder de [client side](https://github.com/olevanderheiden/programmeren8Opdracht1/tree/clientSide). Bekijk de installatie instructies van client om te zien hoe de game gespeeld moet worden en hoe je verbinding kan maken met de server side als je die lokaal installeert.

## Installatie

1. Clone de repository met git clone.
2. Installeer de packages die nodig zijn voor het server gedeelte met npm install.
3. Geef je eigen Azure open ai keys op in een .env file(een voorbeeld van het verwachte format is the vindenin .envEaxample) deze moet ge plaats worden in de root folder.
4. Start de server met npm run start.
5. Volg de installatie instructies van [client side](https://github.com/olevanderheiden/programmeren8Opdracht1/tree/clientSide).

## Mogelijke problemen

Het kan voorkomen dat het request naar open AI of niet goed word verwerkt of het verkeerde format(geen Json) terug geeft. Dit zal een error in de console veroorzaken. Wanneer dit gebeurt zal het request automatisch opnieuw worden gestuurd tot er succes word geboekt. Let echter wel op dat dit ook gebeurt wanneer de server niet aanstaat. Om een oneindige lijst aan errors te voorkomen word het aangeraden om de pagina te verversen en de controleren of de sever wel draait on/ofline.
