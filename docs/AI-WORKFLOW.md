# Effektivt arbete med AI

## Avgränsa uppgiften
Ange mål, berörd sida eller fil och hur resultatet ska kontrolleras. Exempel:

> Justera mobilmenyn i `frontend/src/components/Header.tsx` och berörd CSS
> i `frontend/src/styles/global.css`. På små skärmar ska alla länkar få plats
> utan horisontell scroll. Kontrollera typningen och beskriv den visuella kontrollen.

Låt `AGENTS.md` innehålla korta, stabila projektregler. Lägg ämnesspecifika
detaljer i separata dokument och länka dit. Undvik att kopiera samma information
till flera filer eller läsa all dokumentation inför varje liten ändring.

## Byt chatt vid ett nytt ämne
Starta en ny chatt när nästa uppgift är orelaterad. Fortsätt i samma chatt när
tidigare diskussion behövs för den pågående uppgiften. Du startar själv den nya
chatten i verktyget.

Vid behov, be om en kort överlämning och klistra in den i nästa chatt:

```text
Mål:
Berörda filer:
Genomförda ändringar:
Viktiga beslut:
Kontroller och resultat:
Kvar att göra / blockerare:
```

Håll överlämningen aktuell och kort; kopiera inte hela chatthistoriken eller
långa testloggar. Markdown är ingen separat tokenbesparing: vinsten kommer av
att relevant information ersätter onödiga sökningar och upprepningar.
