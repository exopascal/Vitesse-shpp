---
name: seo-content
description: SEO-Analyse und Texterstellung für Produktseiten. Legt strukturierte Inhalte in content/seo/<handle>.md ab und überträgt freigegebene Texte in content/products/<handle>.json. Nutzen wenn: SEO-Briefing erstellt, Keywords recherchiert, Produkttexte optimiert oder neue Produkte aufgebaut werden sollen.
---

# SEO Content Workflow

Strukturierte Ablage von SEO-Analyse und Produkttexten für dieses Projekt.

---

## Dateistruktur

```
content/
  seo/
    _template.md          # Template für neue Produkte
    t-apex.md             # SEO-Datei pro Produkt
    exopek-pro.md
    …
  products/
    t-apex.json           # Render-ready content (Produktionsstand)
    …
```

**Regel:** SEO-Analyse und Rohtexte → `content/seo/<handle>.md`. Freigegebene, finale Texte → `content/products/<handle>.json`.

---

## Neues Produkt anlegen

1. Shopify-Handle aus der URL ermitteln (z.B. `t-apex` aus `/products/t-apex`)
2. Template kopieren: `cp content/seo/_template.md content/seo/<handle>.md`
3. Handle und Datum im Header eintragen
4. Sections füllen (siehe unten)
5. Nach Freigabe: Texte in `content/products/<handle>.json` übertragen

---

## Sections und ihr Mapping

| Section in `.md`   | Ziel in `.json`       | Zweck |
|--------------------|-----------------------|-------|
| Meta-Tags          | `pages/products/[id].vue` via `useHead` | Google SERP |
| Highlights         | `highlights.items[].body` | Hero-Bereich |
| Features           | `features.items[]`    | Feature-Grid |
| Banner-Text        | `banner.title` + `banner.text` | Mid-Page Banner |
| FAQ                | `faq.items[]`         | FAQ + Schema.org |
| H1/Struktur        | Informell, für Redaktion | Seitenarchitektur |

---

## Qualitätskriterien

**Keywords:**
- Primär-Keyword im Title, H1, ersten 100 Wörtern
- Sekundär-Keywords natürlich verteilt
- Keine Keyword-Stuffing

**Texte:**
- Title: 50–60 Zeichen
- Meta-Description: 150–160 Zeichen, mit CTA
- FAQ-Antworten: 2–4 Sätze, direkt und konkret
- Feature-Beschreibungen: nutzenorientiert, nicht technisch-listig

**Tonalität:**
- Direkt, leistungsorientiert
- Deutsch, Du-Form wenn passend zur Marke
- Keine generischen Phrasen ("hochwertig", "einzigartig")

---

## In JSON übertragen

Nach Freigabe der MD-Datei nur die finalen Texte übernehmen:

```bash
# Zieldatei prüfen
cat content/products/<handle>.json

# Texte manuell übertragen oder per Claude Code
```

Bei Übertragung durch Claude Code: Nur freigegebene Sections übertragen, Bildpfade und bestehende Struktur nicht verändern.

---

## Bestehende Produkte

| Handle | SEO-Datei | JSON | Status |
|--------|-----------|------|--------|
| `t-apex` | `content/seo/t-apex.md` | `content/products/t-apex.json` | — |
| `exopek-pro` | `content/seo/exopek-pro.md` | `content/products/exopek-pro.json` | — |
| `tunturi` | `content/seo/tunturi.md` | `content/products/tunturi.json` | — |
| `optogait` | `content/seo/optogait.md` | `content/products/optogait.json` | — |

---

## Verwandte Dateien

- `utils/productDetailContent.ts` — lädt JSON-Content, definiert Interfaces
- `utils/productPageConfig.ts` — mappt Shopify-Handle → contentKey
- `utils/schemas/productSchema.ts` — Schema.org für FAQ + Produkt
- `utils/seo/recommendations.ts` — SEO-Empfehlungsengine
