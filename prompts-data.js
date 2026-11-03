/* Eigenständig formulierte, editierbare Arbeitsvorlagen. Keine KI-Ausführung. */
window.MARKETING_PROMPTS = [
  {
    id: 'launch-briefing',
    title: 'Launch-Briefing',
    category: 'Strategie',
    description: 'Ein Startplan für ein neues Angebot.',
    useWhen: 'Vor einem Produktstart.',
    inputs: ['Angebot', 'Zielgruppe', 'Budget', 'Termin'],
    output: 'Kompaktes Briefing',
    prompt: `Plane den Start von [ANGEBOT] für [ZIELGRUPPE] bis [TERMIN] mit [BUDGET]. Stelle zuerst höchstens drei notwendige Rückfragen. Erstelle dann eine Tabelle mit Botschaft, Kanal, Aufgabe, Verantwortlichkeit und messbarem Ziel. Kennzeichne Annahmen. Erfinde keine Marktdaten oder Erfolgsprognosen. Schließe mit dem wichtigsten nächsten Schritt.`,
    nextStep: 'Aufgaben mit dem Team abstimmen.',
    source: {
      label: 'Inspiriert von Wissence',
      url: 'https://www.wissence.at/post/ki-marketing-prompts-komplexe-use-cases',
      note: 'Eigenständig formuliert.'
    }
  },
  {
    id: 'attribution-pruefen',
    title: 'Attribution prüfen',
    category: 'Analyse & KPIs',
    description: 'Welche Kanäle bekommen Erfolge zugerechnet?',
    useWhen: 'Vor einer Budgetentscheidung.',
    inputs: ['Kanaldaten', 'Messregeln'],
    output: 'Prüfliste',
    prompt: `Prüfe [KANALDATEN] unter [MESSREGELN]. Frage nach fehlenden Angaben. Erkläre einfach, was die Zuordnung von Abschlüssen zeigen kann und was sie nicht beweist. Nenne Datenlücken, mögliche Doppelzählungen und drei Prüfungen vor einer Budgetänderung. Erfinde keine zusätzlichen Verkäufe, Kausalwirkungen oder Modellberechnungen.`,
    nextStep: 'Messlücken zuerst klären.',
    source: {
      label: 'Inspiriert von Wissence',
      url: 'https://www.wissence.at/post/ki-marketing-prompts-komplexe-use-cases',
      note: 'Eigenständig formuliert.'
    }
  },
  {
    id: 'zielgruppen-belege',
    title: 'Zielgruppen aus Belegen',
    category: 'Strategie',
    description: 'Kundenbedürfnisse aus echten Rückmeldungen verstehen, statt Personas zu erfinden.',
    useWhen: 'Wenn du Interviews, Supportfragen oder Umfrageantworten gesammelt hast.',
    inputs: ['Anonymisierte Rückmeldungen', 'Angebot', 'Fragestellung'],
    output: 'Bedürfnisse, Belege und offene Fragen',
    prompt: `Hilf mir, die Bedürfnisse möglicher Kunden für [ANGEBOT] zu verstehen.

Meine Fragestellung: [FRAGESTELLUNG]
Anonymisierte Rückmeldungen: [RÜCKMELDUNGEN]

Nutze ausschließlich dieses Material. Wenn Angaben zum Kontext oder zur Herkunft fehlen, stelle zuerst bis zu drei Rückfragen. Gib jeder Rückmeldung eine Referenz wie R1 oder R2.

Erstelle eine Tabelle mit wiederkehrendem Bedürfnis, konkretem Beleg, möglichem Kaufhindernis und einer dazu passenden Botschaft. Trenne klar zwischen einer Beobachtung im Material und deiner Interpretation. Zitiere nur tatsächlich enthaltene Aussagen; kürze sie bei Bedarf, ohne ihre Bedeutung zu ändern.

Erfinde keine demografischen Daten, Persönlichkeitseigenschaften oder repräsentativen Marktanteile. Eine kleine Stichprobe beschreibt nicht automatisch den gesamten Markt. Wenn das Material keine tragfähige Gruppierung erlaubt, sage das.

Schließe mit fünf neutral formulierten Interviewfragen, die die wichtigsten Wissenslücken schließen könnten. Erkläre Fachbegriffe in einem kurzen Satz.`,
    nextStep: 'Die offenen Fragen in echten Kundengesprächen prüfen.',
    source: { label: 'Eigene Vorlage', url: null, note: 'Eigenständig formulierte Arbeitsvorlage.' }
  },
  {
    id: 'positionierung-schaerfen',
    title: 'Positionierung schärfen',
    category: 'Strategie',
    description: 'In klaren Worten sagen, für wen dein Angebot welchen Nutzen hat.',
    useWhen: 'Wenn dein Angebot schwer zu erklären ist oder sehr austauschbar klingt.',
    inputs: ['Angebot und Zielgruppe', 'Belegbare Stärken', 'Bekannte Alternativen'],
    output: 'Drei Botschaften mit Belegprüfung',
    prompt: `Formuliere eine verständliche Positionierung für [ANGEBOT] für [ZIELGRUPPE].

Belegbare Stärken und Nachweise: [STÄRKEN UND BELEGE]
Vom Kunden genutzte Alternativen: [ALTERNATIVEN]
Gewünschter Ton: [TONALITÄT]

Frage zuerst nach fehlenden Angaben, die eine belastbare Aussage verhindern. Arbeite danach drei unterschiedliche Positionierungsvorschläge aus. Jeder besteht aus einem Satz mit Zielgruppe, Problem und Nutzen sowie einer kurzen Überschrift und einer unterstützenden Erklärung.

Zeige zu jeder Aussage, welcher meiner Belege sie trägt. Kennzeichne Aussagen ohne Beleg als zu prüfende Hypothese. Erfinde weder Wettbewerbermerkmale noch Alleinstellungsmerkmale. Verwende keine unbelegten Superlative, Garantien oder Zahlen.

Bewerte die Vorschläge nach Verständlichkeit, Relevanz und belegbarer Unterscheidung. Begründe deine Einschätzung kurz anhand der Eingaben, ohne eine Marktwirkung vorherzusagen. Schließe mit drei Fragen, mit denen ich die Botschaft bei echten Interessenten testen kann.`,
    nextStep: 'Eine Botschaft auswählen und mit Interessenten besprechen.',
    source: { label: 'Eigene Vorlage', url: null, note: 'Eigenständig formulierte Arbeitsvorlage.' }
  },
  {
    id: 'content-plan',
    title: 'Content-Plan',
    category: 'Content & Social',
    description: 'Aus einem Ziel einen machbaren Plan mit konkreten Beitragsideen machen.',
    useWhen: 'Wenn dir regelmäßig gute Themen fehlen oder zu viele Kanäle Arbeit machen.',
    inputs: ['Ziel und Zielgruppe', 'Kanäle und Zeitraum', 'Verfügbare Zeit', 'Freigegebene Inhalte'],
    output: 'Ein realistischer Redaktionsplan',
    prompt: `Erstelle einen Content-Plan für [ZEITRAUM] für [ANGEBOT] und [ZIELGRUPPE].

Ziel: [MARKETINGZIEL]
Kanäle: [KANÄLE]
Verfügbare Arbeitszeit pro Woche: [STUNDEN]
Freigegebenes Wissen und vorhandene Inhalte: [MATERIAL]
Tonalität: [TONALITÄT]

Stelle zuerst bis zu drei Rückfragen, falls Ziel, Kapazität oder Material unklar sind. Plane nur einen Umfang, der zur angegebenen Arbeitszeit passt. Gib bei Aufwandsschätzungen an, dass sie grobe Planungsannahmen sind.

Liefere eine Tabelle mit Termin, Kanal, Leserfrage, Kernbotschaft, Format, erster Textzeile, Handlungsaufforderung und benötigtem Material. Jeder Beitrag soll eine konkrete Frage der Zielgruppe beantworten. Verwende nur belegbare Aussagen aus meinem Material. Markiere Themen, für die noch Recherche oder eine Freigabe erforderlich ist.

Nenne zum Schluss eine passende Erfolgskennzahl für das Ziel und eine einfache Routine zur Auswertung. Erfinde keine Reichweitenprognosen und behaupte keine garantierten Algorithmusvorteile.`,
    nextStep: 'Die ersten zwei Beiträge ausarbeiten und Materiallücken schließen.',
    source: { label: 'Eigene Vorlage', url: null, note: 'Eigenständig formulierte Arbeitsvorlage.' }
  },
  {
    id: 'inhalte-mehrfach-nutzen',
    title: 'Inhalte mehrfach nutzen',
    category: 'Content & Social',
    description: 'Einen vorhandenen Beitrag in drei passende Formate verwandeln.',
    useWhen: 'Wenn ein guter Artikel, Vortrag oder Leitfaden bereits vorliegt.',
    inputs: ['Originaltext', 'Zielgruppe', 'Drei Zielformate', 'Tonalität'],
    output: 'Drei Entwürfe mit Quellenabgleich',
    prompt: `Verwandle den folgenden freigegebenen Originaltext in [DREI ZIELFORMATE, Z. B. LINKEDIN-POST, NEWSLETTER-ABSATZ, VIDEO-SKRIPT].

Zielgruppe: [ZIELGRUPPE]
Tonalität: [TONALITÄT]
Längen und weitere Vorgaben: [VORGABEN]
Originaltext: [ORIGINALTEXT]

Frage nach, wenn ein Format oder eine Längenvorgabe unklar ist. Formuliere pro Format eine passende Einleitung, eine klare Kernbotschaft und eine natürliche Handlungsaufforderung. Passe die Form an den jeweiligen Kanal an.

Erhalte die Bedeutung des Originals. Ergänze keine Studien, Zahlen, Kundenzitate oder Produktversprechen. Kennzeichne eine neue Idee ausdrücklich als Vorschlag, der noch belegt oder freigegeben werden muss. Wenn der Originaltext selbst eine unbelegte Aussage enthält, markiere sie zur Prüfung.

Zeige nach den Entwürfen in einer kurzen Tabelle, aus welchem Abschnitt die jeweilige Kernbotschaft stammt. Nenne außerdem, welche Aussagen ich vor einer Veröffentlichung prüfen sollte.`,
    nextStep: 'Entwürfe fachlich prüfen und an den tatsächlichen Kanal anpassen.',
    source: { label: 'Eigene Vorlage', url: null, note: 'Eigenständig formulierte Arbeitsvorlage.' }
  },
  {
    id: 'anzeigenvarianten',
    title: 'Anzeigenvarianten',
    category: 'Paid & Conversion',
    description: 'Mehrere klare Werbeansätze aus belegbaren Vorteilen entwickeln.',
    useWhen: 'Wenn du neue Anzeigenideen für eine klar definierte Zielgruppe brauchst.',
    inputs: ['Angebot und Zielgruppe', 'Plattform und Textgrenzen', 'Belegte Vorteile', 'Zielseite'],
    output: 'Sechs Varianten und eine Testidee',
    prompt: `Entwickle sechs Anzeigenvarianten für [ANGEBOT] auf [PLATTFORM].

Zielgruppe und ihr konkretes Problem: [ZIELGRUPPE UND PROBLEM]
Freigegebene Vorteile und Belege: [VORTEILE UND BELEGE]
Text der Zielseite: [ZIELSEITENTEXT]
Textgrenzen und Tonalität: [VORGABEN]
Gewünschte Handlung: [HANDLUNG]

Frage zuerst nach fehlenden Textgrenzen oder Belegen. Verwende nur die bereitgestellten Fakten. Erstelle je zwei Varianten mit Fokus auf Problem, Nutzen und Anwendung. Gib Überschrift, Anzeigentext und Handlungsaufforderung aus. Zeige bei festen Textgrenzen die Zeichenanzahl einschließlich Leerzeichen und prüfe sie sorgfältig.

Vermeide erfundene Rabatte, künstliche Verknappung, unbelegte Garantien und Kundenzitate. Die Anzeige muss zum tatsächlichen Inhalt der Zielseite passen.

Markiere für jede Variante, welchen Nutzen sie betont und welcher Beleg ihn trägt. Empfiehl zum Schluss zwei Varianten für einen ersten Vergleich und formuliere eine prüfbare Hypothese. Sage nicht voraus, welche Anzeige gewinnen wird.`,
    nextStep: 'Textgrenzen und aktuelle Plattformregeln vor dem Einsatz prüfen.',
    source: { label: 'Eigene Vorlage', url: null, note: 'Eigenständig formulierte Arbeitsvorlage.' }
  },
  {
    id: 'landingpage-pruefen',
    title: 'Landingpage prüfen',
    category: 'Paid & Conversion',
    description: 'Unklare Botschaften und mögliche Hürden auf einer Zielseite finden.',
    useWhen: 'Wenn Besucher ankommen, aber die gewünschte Handlung selten ausführen.',
    inputs: ['Seitentext oder Screenshot', 'Besucherquelle', 'Zielgruppe', 'Gewünschte Handlung'],
    output: 'Priorisierte Verbesserungen und Textvorschläge',
    prompt: `Prüfe die folgende Landingpage für [ZIELGRUPPE]. Besucher kommen über [BESUCHERQUELLE ODER ANZEIGENTEXT]. Sie sollen [GEWÜNSCHTE HANDLUNG] ausführen.

Vorliegender Seitentext oder Screenshot: [SEITENINHALT]
Bekannte Nutzungsdaten oder Rückmeldungen: [BELEGE ODER KEINE VORHANDEN]

Sage zuerst, welche Teile du tatsächlich beurteilen kannst. Stelle bis zu drei notwendige Rückfragen. Leite aus einem Text oder Screenshot keine Ladezeiten, mobile Funktion oder tatsächliches Nutzerverhalten ab.

Prüfe Verständlichkeit, Übereinstimmung mit der Anzeige, Nutzenversprechen, Nachweise und die Klarheit des nächsten Schritts. Liefere eine Tabelle mit sichtbarer Beobachtung, möglicher Auswirkung als Hypothese, konkreter Änderung und benötigtem Nachweis. Priorisiere höchstens fünf Änderungen nach nachvollziehbaren Kriterien.

Schreibe anschließend einen alternativen Einstiegsbereich mit Überschrift, kurzem Absatz und Schaltflächentext. Nutze nur belegte Produktvorteile. Erfinde keine Siegel, Bewertungen oder Conversion-Steigerungen. Schließe mit einem einfachen Vorschlag, wie wir die wichtigste Hypothese mit Nutzern oder einem geeigneten Test prüfen können.`,
    nextStep: 'Eine Änderung auswählen und deren Wirkung gezielt überprüfen.',
    source: { label: 'Eigene Vorlage', url: null, note: 'Eigenständig formulierte Arbeitsvorlage.' }
  },
  {
    id: 'ab-test-planen',
    title: 'A/B-Test planen',
    category: 'Paid & Conversion',
    description: 'Aus einer Idee einen fairen Vergleich mit vorher festgelegter Auswertung machen.',
    useWhen: 'Wenn du eine konkrete Änderung ausprobieren und ihre Wirkung messen willst.',
    inputs: ['Ausgangsversion und Änderung', 'Besucherzahl und Ausgangsrate', 'Geschäftsziel'],
    output: 'Ein Testplan ohne erfundene Ergebnisse',
    prompt: `Plane einen A/B-Test für [SEITE ODER KAMPAGNE].

Geschäftsziel: [ZIEL]
Ausgangsversion: [VERSION A]
Geplante einzelne Änderung: [VERSION B]
Verfügbarer Traffic, bisherige Erfolgsrate und Datenzeitraum: [DATEN]
Rahmenbedingungen: [BUDGET, SAISON ODER TECHNIK]

Frage zuerst nach fehlenden entscheidenden Angaben. Formuliere eine prüfbare Hypothese und begründe sie mit vorhandenen Beobachtungen. Schlage eine primäre Erfolgskennzahl und höchstens zwei Kontrollkennzahlen vor. Erkläre die Kennzahlen einfach.

Beschreibe faire Zuteilung, benötigte Messereignisse und mögliche Störfaktoren. Lege fest, welche Bedingungen für eine Auswertung erfüllt sein müssen und wie ein unklarer Ausgang berichtet wird. Ändere möglichst nur eine Variable.

Erfinde keine Stichprobengröße, Laufzeit, statistische Signifikanz oder Testergebnisse. Wenn Daten für die Planung fehlen, liste sie auf. Trenne praktische Relevanz von statistischer Unsicherheit. Liefere einen kompakten Plan und eine leere Ergebnistabelle, die wir erst nach dem Test befüllen.`,
    nextStep: 'Messung und Auswertung vor dem Start abstimmen.',
    source: { label: 'Eigene Vorlage', url: null, note: 'Eigenständig formuliert. Fachlicher Lesetipp: Google Ads Experimente.' }
  },
  {
    id: 'email-strecke',
    title: 'E-Mail-Strecke',
    category: 'E-Mail & CRM',
    description: 'Drei hilfreiche E-Mails für eine passende, bestehende Empfängergruppe entwerfen.',
    useWhen: 'Wenn neue Interessenten nach einer Anmeldung Orientierung brauchen.',
    inputs: ['Empfängergruppe und Anlass', 'Angebot', 'Freigegebene Inhalte', 'Ziel'],
    output: 'Drei E-Mails mit klarer Aufgabe',
    prompt: `Entwirf eine dreiteilige E-Mail-Strecke für [EMPFÄNGERGRUPPE] nach [ANLASS]. Die Gruppe darf die geplanten E-Mails erhalten.

Angebot: [ANGEBOT]
Ziel der Strecke: [ZIEL]
Bekannte Interessen und vorhandene Datenfelder: [ANGABEN]
Freigegebene Inhalte und Belege: [MATERIAL]
Tonalität und gewünschter Rhythmus: [VORGABEN]

Frage nach fehlenden Angaben. Definiere eine einfache, mit den vorhandenen Daten umsetzbare Auswahlregel für die Empfänger. Unterstelle keine unbekannten Interessen.

Erstelle drei E-Mails: Orientierung, konkrete Hilfe und ein passender nächster Schritt. Gib jeweils Zweck, vorgeschlagenen Versandzeitpunkt, zwei ehrliche Betreffzeilen, Vorschautext, kurzen E-Mail-Text und eine Handlungsaufforderung aus. Kennzeichne die Zeitpunkte als Planungsvorschläge.

Erfinde keine Kundenstimmen, Ergebnisse, Rabatte oder Dringlichkeit. Verwende Personalisierung nur für tatsächlich vorhandene Angaben und nenne eine neutrale Ersatzformulierung.

Schlage abschließend passende Erfolgskriterien und eine Regel vor, wann die Strecke endet oder pausiert. Behaupte keine garantierten Öffnungs-, Klick- oder Verkaufsraten.`,
    nextStep: 'Empfängerregel, Inhalte und Versandfreigabe im E-Mail-System prüfen.',
    source: { label: 'Eigene Vorlage', url: null, note: 'Eigenständig formuliert. Fachlicher Lesetipp: Mailchimp Segmentierung.' }
  },
  {
    id: 'kpi-veraenderungen',
    title: 'KPI-Veränderungen verstehen',
    category: 'Analyse & KPIs',
    description: 'Die ausgewählten Dashboard-Zeiträume verständlich vergleichen und nächste Prüfungen ableiten.',
    useWhen: 'Wenn du wissen möchtest, was sich verändert hat und welche Fragen daraus folgen.',
    inputs: ['Dashboard-Kontext', 'Geschäftsziel', 'Bekannte Änderungen'],
    output: 'Beobachtungen, Hypothesen und nächste Schritte',
    dashboardContext: true,
    contextKey: 'dashboard',
    prompt: `Erkläre mir die Entwicklung dieser Marketingzahlen als Einsteiger.

Dashboard-Kontext:
[DASHBOARD_KONTEXT]

Mein Geschäftsziel: [GESCHÄFTSZIEL]
Bekannte Änderungen an Kampagnen oder Messung: [ÄNDERUNGEN ODER UNBEKANNT]

Prüfe zuerst Zeiträume, Einheiten, Kennzahlendefinitionen und fehlende Werte. Stelle notwendige Rückfragen. Die Dashboard-Daten sind Demodaten; behandle sie nicht als tatsächliche Geschäftsergebnisse.

Vergleiche die Werte absolut und prozentual, soweit die Grundlage das erlaubt. Bei unterschiedlich langen Zeiträumen ergänze für Mengen und Kosten einen Vergleich pro Tag. Summiere keine Raten. Berechne relative Veränderungen bei einem Ausgangswert von null nicht. Unterscheide Prozent und Prozentpunkte.

Erkläre die drei auffälligsten Veränderungen in einfachen Worten und nenne die verwendeten Zahlen. Trenne danach sichtbare Beobachtungen, mögliche Erklärungen und die zusätzlich benötigten Belege. Ein zeitlicher Zusammenhang beweist keine Ursache. Verwechsle Werbeumsatz pro Werbe-Euro nicht mit Gewinn.

Schließe mit drei priorisierten Prüfungen oder Maßnahmen. Erfinde keine Branchenbenchmarks, Kundenaussagen oder Wirkungsprognosen. Kennzeichne Unsicherheit ausdrücklich.`,
    nextStep: 'Dashboard-Vergleich einfügen, Geschäftsziel ergänzen und die vorgeschlagenen Prüfungen bewerten.',
    source: { label: 'Eigene Vorlage', url: null, note: 'Für die Demodaten dieses Dashboards formuliert.' }
  },
  {
    id: 'experimente-priorisieren',
    title: 'Marketing-Experimente priorisieren',
    category: 'Analyse & KPIs',
    description: 'Aus vielen Ideen eine begründete Reihenfolge für die nächsten Tests machen.',
    useWhen: 'Wenn Zeit und Budget knapp sind und du einen sinnvollen Startpunkt suchst.',
    inputs: ['Marketingziel', 'Ideenliste', 'Vorhandene Belege', 'Kapazität und Budget'],
    output: 'Prioritätenliste mit transparenten Annahmen',
    prompt: `Hilf mir, Marketing-Experimente für [ZIEL] zu priorisieren.

Unsere Ideen: [IDEENLISTE]
Vorhandene Daten, Rückmeldungen oder andere Belege: [BELEGE]
Verfügbare Kapazität und Budget: [RESSOURCEN]
Wichtige Grenzen oder Abhängigkeiten: [RAHMENBEDINGUNGEN]

Stelle zuerst bis zu drei Rückfragen, falls Ziel oder Ressourcen unklar sind. Bewerte jede Idee qualitativ nach Zielbezug, vorhandener Evidenz, Umsetzungsaufwand und Messbarkeit. Zeige die Kriterien und ihre Bedeutung vor der Bewertung. Kennzeichne Aufwandsschätzungen und andere Annahmen.

Liefere eine Tabelle mit Idee, zugrunde liegender Beobachtung, prüfbarer Hypothese, benötigten Daten, Aufwand und Empfehlung. Wenn Belege fehlen, benenne die Lücke, statt scheinbar präzise Erfolgsscores oder Umsatzprognosen zu erfinden.

Empfiehl höchstens drei nächste Experimente. Beschreibe jeweils die kleinste sinnvolle Umsetzung, eine primäre Erfolgskennzahl und ein Kriterium für Weiterführen, Überarbeiten oder Stoppen. Die Kriterien sind Vorschläge zur Abstimmung, keine bereits erzielten Ergebnisse. Schließe mit einem konkreten ersten Arbeitsschritt.`,
    nextStep: 'Ein Experiment auswählen und vor dem Start einen Messplan festlegen.',
    source: { label: 'Eigene Vorlage', url: null, note: 'Eigenständig formulierte Arbeitsvorlage.' }
  }
];

window.MARKETING_PROMPT_SOURCES = [
  {
    label: 'Wissence: KI Marketing Prompts',
    url: 'https://www.wissence.at/post/ki-marketing-prompts-komplexe-use-cases',
    note: 'Inspiration für Launch und Attribution; eigenständig formuliert.'
  },
  {
    label: 'Google Ads: Experimente planen',
    url: 'https://support.google.com/google-ads/answer/7281575?hl=de',
    note: 'Zum Weiterlesen: Hypothesen, einzelne Variablen und Erfolgskriterien für Tests.'
  },
  {
    label: 'Mailchimp: E-Mail-Segmentierung',
    url: 'https://mailchimp.com/resources/email-segmentation/',
    note: 'Zum Weiterlesen: Empfängergruppen anhand vorhandener Merkmale und Interessen bilden.'
  }
];
