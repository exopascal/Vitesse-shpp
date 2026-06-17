# Shopify Agent Idea

## Ziel

Ein Agentensystem soll Shopify-Produktdaten verbessern, ohne neue Fakten zu erfinden. Das LLM arbeitet nur mit vorhandenen, freigegebenen Quellen und macht daraus bessere Texte, klarere Struktur und fundierte Empfehlungen.

## Kernprinzip

Shopify bleibt die primäre Datenquelle im Shop. Zusaetzlich koennen Herstellerdaten als verifizierte Quelle genutzt werden. Das LLM darf Inhalte:

- umformulieren
- nachformulieren
- zusammenfassen
- strukturieren
- sprachlich verbessern
- in passende Content-Slots fuer PDP und SEO aufteilen

Das LLM darf keine neuen Fakten erfinden.

## Moegliche Quellen

- Shopify Produktdaten
- Shopify Metafields
- Tags
- Collections
- Vendor
- bestehende SEO-Felder
- Herstellerdaten

## Hauptfunktionen

### 1. Content Enrichment

Aus bestehenden Shopify- und Herstellerdaten werden bessere Inhalte fuer die Produktseite erzeugt.

Beispiele:

- kurze Produktbeschreibung verbessern
- Bullet Points bzw. USPs aus vorhandenen Daten ableiten
- technische Informationen lesbarer darstellen
- FAQ aus bestehenden Informationen strukturieren
- SEO Title und Meta Description verbessern

### 2. Data Backfill

Wenn wichtige Shopify-Felder fehlen, kann der Agent Vorschlaege fuer die Befuellung machen.

Beispiele:

- Material
- Features
- Pflegehinweise
- SEO Title
- Meta Description
- strukturierte Metafields

Wichtig: Diese Inhalte sollten zunaechst als Vorschlag gespeichert und nicht blind direkt nach Shopify geschrieben werden.

### 3. Content Monitoring Agent

Ein Agent prueft Produktseiten laufend auf Qualitaet, Konsistenz und SEO-Basis und spricht Empfehlungen aus.

Beispiele fuer Checks:

- Beschreibung zu kurz
- wichtige Produktvorteile fehlen
- Meta Description fehlt oder ist zu generisch
- SEO Title schwaechelt
- Herstellerdaten werden nicht genutzt
- uneinheitliche Tonalitaet
- Duplicate-Content-Risiko
- wichtige Metafields fehlen

## Prioritaet der Quellen

Um Widersprueche zu vermeiden, sollte eine feste Reihenfolge gelten:

1. Herstellerdaten
2. verifizierte Shopify Metafields
3. bestehende Shopify Produktbeschreibung
4. Tags, Collections und sonstige Hilfsdaten

Wenn die Datenlage schwach oder widerspruechlich ist, soll der Agent defensiv reagieren und eher eine Empfehlung ausgeben als Inhalte frei zu formulieren.

## Output des Agenten

Der Agent sollte strukturierten Output liefern, zum Beispiel:

- `issues`
- `recommendations`
- `suggested_copy`
- `seo_suggestions`
- `source_fields_used`
- `confidence`
- `warnings`
- `generated_at`

## Guardrails

- keine neuen Fakten
- keine unbelegten Aussagen zu Material, Herkunft, Zertifizierungen, Wirkung oder Lieferzeit
- nur freigegebene Datenquellen verwenden
- strukturierter Output statt freier Text
- Ergebnisse cachen oder vorab berechnen, nicht bei jedem Request live
- kritische Aenderungen nur mit Review oder Freigabe

## Sinnvolle Architektur

### Enrichment Pipeline

1. Produktdaten aus Shopify laden
2. Herstellerdaten zuordnen
3. Fehlende oder schwache Content-Bereiche erkennen
4. LLM erzeugt Vorschlaege auf Basis vorhandener Daten
5. Vorschlaege validieren
6. Inhalte als interne Suggestions oder AI-Felder speichern
7. optional nach Review nach Shopify zurueckschreiben

### Monitoring Flow

1. Produkte regelmaessig scannen
2. Qualitaetsregeln und SEO-Regeln anwenden
3. LLM fuer Bewertung und Verbesserungsvorschlaege nutzen
4. Issues und Empfehlungen je Produkt speichern
5. Redaktion oder Admin-UI fuer Review bereitstellen

## Strategische Idee

Das System soll nicht nur Text generieren, sondern wie ein Content-Manager fuer den Shop arbeiten:

- Produktdaten verbessern
- Luecken erkennen
- SEO-Potenziale sichtbar machen
- konsistente Markensprache sichern
- Empfehlungen fuer Shopify-Datenpflege geben

## Empfehlung fuer die Umsetzung

Am besten startet das Projekt nicht mit vollautomatischem Schreiben nach Shopify, sondern mit:

- Analyse
- Vorschlaegen
- Review
- kontrolliertem Sync

So bleibt das System robust, nachvollziehbar und rechtlich sicherer.

## Naechste sinnvolle Schritte

- Datenmodell fuer Suggestions und AI-Felder definieren
- Prompt-Design mit striktem Faktenverbot ausarbeiten
- Regeln fuer Source Priority und Validierung festlegen
- Monitoring-Checks definieren
- Review- und Sync-Flow fuer Shopify entwerfen
