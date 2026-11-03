# Pulse Marketing-Dashboards

Eine eigenständige, interaktive Demo mit vier Marketing-Ansichten und ausschließlich fiktiven Beispieldaten.

[Demo öffnen](https://salaongithub.github.io/marketing-dashboard-demo/)

Direkt zu [Management](https://salaongithub.github.io/marketing-dashboard-demo/#management), [Paid Performance](https://salaongithub.github.io/marketing-dashboard-demo/#paid-performance), [B2B-Funnel](https://salaongithub.github.io/marketing-dashboard-demo/#b2b-funnel) oder [Content & Social](https://salaongithub.github.io/marketing-dashboard-demo/#content-social).

- **Management:** Umsatz- oder Lead-Verlauf umschalten; Budgetziele und Kanalbeiträge vergleichen.
- **Paid Performance:** Werbekanal auswählen und ROAS oder Kosten je Lead vergleichen.
- **B2B-Funnel:** Zusammengehörige Lead-Kohorte mit Übergangsraten und CRM-Ergebnissen.
- **Content & Social:** Impressionen oder Leads je Kanal und erfolgreichste Inhalte ansehen.

## Hosting

Die Dateien benötigen keinen Build und kein Backend. Für GitHub Pages den Repository-Branch und den Ordner `/ (root)` als Veröffentlichungsquelle auswählen. `.nojekyll` schaltet Jekyll-Verarbeitung aus.

## Lokal öffnen

`index.html` direkt im Browser öffnen, oder im Verzeichnis `python -m http.server 8080` starten und `http://localhost:8080` öffnen.

## Teilen und Datenschutz

Jede Ansicht hat einen eigenen URL-Hash (`#management`, `#paid-performance`, `#b2b-funnel`, `#content-social`). „Ansicht teilen“ kopiert den aktuellen Link. Auswahlen bleiben in `localStorage` des jeweiligen Browsers. Es werden keine Nutzerdaten an Dritte übertragen; die Demo lädt keine externen Bibliotheken und braucht weder Login noch API-Schlüssel. Hosting-Zugriffslogs unterliegen dem jeweiligen Hoster.

Alle Zahlen, Unternehmen und Inhalte sind Beispieldaten. Sie lassen keine Rückschlüsse auf reale Kampagnen zu.
