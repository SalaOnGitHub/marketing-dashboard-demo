# Pulse Marketing-Dashboards

Eine eigenständige, interaktive Demo mit vier Marketing-Ansichten und ausschließlich fiktiven Beispieldaten.

[Demo öffnen](https://salaongithub.github.io/marketing-dashboard-demo/)

Direkt zu [Management](https://salaongithub.github.io/marketing-dashboard-demo/#management), [Paid Performance](https://salaongithub.github.io/marketing-dashboard-demo/#paid-performance), [B2B-Funnel](https://salaongithub.github.io/marketing-dashboard-demo/#b2b-funnel) oder [Content & Social](https://salaongithub.github.io/marketing-dashboard-demo/#content-social).

- **Management:** tägliche Umsatz- oder Lead-Verläufe mit dem vorherigen Zeitraum vergleichen, einzelne Tage per Maus oder Regler erkunden.
- **Paid Performance:** Werbekanal auswählen; ROAS, Kosten je Lead und Veränderungen zum Vergleichszeitraum ansehen.
- **B2B-Funnel:** Entwicklung derselben Juli-Kohorte verfolgen; Monatsendstände bis Oktober und Fortschritt seit Ende September vergleichen.
- **Content & Social:** Impressionen, Engagementrate, Sitzungen und Leads mit dem vorherigen Zeitraum vergleichen.

## Zeitvergleiche und Erklärungen

„Letzter Monat“ vergleicht den vollständigen Oktober 2026 mit September 2026. „Letzte Woche“ vergleicht 26. Oktober–1. November mit 19.–25. Oktober 2026. Unter **„Eigener Zeitraum“** lassen sich aktueller Zeitraum und Vergleich unabhängig mit vier Datumsfeldern wählen. Verfügbare Beispieldaten: **1. September bis 1. November 2026 einschließlich**. Auch überlappende, unterschiedlich lange und eintägige Bereiche sind erlaubt. Start- und Endtag zählen mit; Tagesgrenzen werden unabhängig von Sommer-/Winterzeit als UTC-Kalendertage verarbeitet.

Alle periodischen KPIs, Tabellen, Content-Beiträge und Verläufe werden aus denselben täglichen Beispieldaten berechnet; ein Kalendertag bleibt beim Umschalten identisch. ROAS, Kosten je Lead und Engagementrate entstehen aus den jeweiligen Summen. Für eigene Zeiträume sind keine Budget- oder Ergebnisziele hinterlegt; stattdessen zeigt die Budgetkarte einen Ausgabenvergleich. Unterschiedliche Tagesanzahlen werden sichtbar ausgewiesen, da Summen von der Dauer abhängen.

Geteilte Links enthalten die angewendeten Datumsfilter als URL-Parameter: period, from, to, compareFrom und compareTo. Gültige Filter im Link haben Vorrang vor lokal gespeicherten Auswahlen. Die Schnellfilter entfernen eigene Datumsparameter; die Navigation zwischen den vier Ansichten behält die angewendeten Filter.

Änderungen von Raten stehen in Prozentpunkten. Die feste Juli-Kohorte ist bewusst unabhängig vom Wochen-/Monatsumschalter. Die ?-Schaltflächen erklären Begriffe, Berechnung und Grenzen per Hover, Tastaturfokus oder Klick/Tap; Escape schließt die Erklärung.

## Hosting

Die Dateien benötigen keinen Build und kein Backend. Für GitHub Pages den Repository-Branch und den Ordner `/ (root)` als Veröffentlichungsquelle auswählen. `.nojekyll` schaltet Jekyll-Verarbeitung aus.

## Lokal öffnen

`index.html` direkt im Browser öffnen, oder im Verzeichnis `python -m http.server 8080` starten und `http://localhost:8080` öffnen.

## Teilen und Datenschutz

Jede Ansicht hat einen eigenen URL-Hash (`#management`, `#paid-performance`, `#b2b-funnel`, `#content-social`). „Ansicht teilen“ kopiert den aktuellen Link. Auswahlen bleiben in `localStorage` des jeweiligen Browsers. Es werden keine Nutzerdaten an Dritte übertragen; die Demo lädt keine externen Bibliotheken und braucht weder Login noch API-Schlüssel. Hosting-Zugriffslogs unterliegen dem jeweiligen Hoster.

Alle Zahlen, Unternehmen und Inhalte sind Beispieldaten. Sie lassen keine Rückschlüsse auf reale Kampagnen zu.
