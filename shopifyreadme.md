# Shopify Produktseiten im Projekt

## Ziel

Produktseiten sollen im Frontend reproduzierbar ueber eine zentrale Konfiguration gesteuert werden.
Dabei gibt es aktuell zwei Template-Typen:

- `main`: fuer Hauptprodukte mit grosser Storytelling-Seite
- `accessory`: fuer kleinere Produkte oder Zubehoer mit kompakterem Aufbau

Die Entscheidung, welches Template verwendet wird, soll nicht in mehreren Dateien per individueller Sonderlogik verteilt sein.
Stattdessen wird sie zentral ueber produktbezogene Eintraege gepflegt.

## Zentrale Steuerung

Die zentrale Datei ist:

- [utils/productPageConfig.ts](/Users/pascal/Dev/vitesse-shopify-shop/webshop/utils/productPageConfig.ts)

Die Regel im Projekt ist:

- jedes Produkt mit eigenem Shopify-Handle bekommt genau einen Eintrag
- jeder Eintrag bekommt genau ein `template`
- jeder Eintrag bekommt genau einen eigenen `contentKey`
- fuer jeden `contentKey` gibt es einen eigenen Content-Builder
- nur wenn produktbezogener Content noch nicht gepflegt ist, faellt die Seite auf `buildDefaultContent()` zurueck

In [utils/productPageConfig.ts](/Users/pascal/Dev/vitesse-shopify-shop/webshop/utils/productPageConfig.ts) wird pro Produkt definiert:

- `handles`: Liste der Shopify-Handles
- `template`: `main` oder `accessory`
- `contentKey`: welcher Content-Baustein verwendet wird

Beispiel:

```ts
{
  handles: ['optogait'],
  template: 'accessory',
  contentKey: 'optogait',
}
```

## Template-Logik

Die Produktseite selbst liegt in:

- [pages/products/[id].vue](/Users/pascal/Dev/vitesse-shopify-shop/webshop/pages/products/%5Bid%5D.vue)

Diese Seite liest den Handle aus der Route und loest ueber `resolveProductPagePreset(handle)` auf:

- welches Template genutzt wird
- welcher Content geladen wird

Aktueller Aufbau:

- `main` verwendet:
  - [components/productDetails/ProductDetailsLayout.vue](/Users/pascal/Dev/vitesse-shopify-shop/webshop/components/productDetails/ProductDetailsLayout.vue)
  - [components/productDetails/ProductHighlights.vue](/Users/pascal/Dev/vitesse-shopify-shop/webshop/components/productDetails/ProductHighlights.vue)
  - [components/productDetails/ShopBanner.vue](/Users/pascal/Dev/vitesse-shopify-shop/webshop/components/productDetails/ShopBanner.vue)
  - [components/productDetails/ProductFeatures.vue](/Users/pascal/Dev/vitesse-shopify-shop/webshop/components/productDetails/ProductFeatures.vue)

- `accessory` verwendet:
  - [components/productDetails/AccessoryProductTemplate.vue](/Users/pascal/Dev/vitesse-shopify-shop/webshop/components/productDetails/AccessoryProductTemplate.vue)

## Content-Logik

Die inhaltlichen Bausteine pro Produkttyp liegen in:

- [utils/productDetailContent.ts](/Users/pascal/Dev/vitesse-shopify-shop/webshop/utils/productDetailContent.ts)

Dort werden produktspezifische Content-Builder gepflegt, zum Beispiel:

- `buildTApexContent`
- `buildExopekProContent`
- `buildTunturiContent`
- `buildOptogaitContent`
- `buildDefaultContent`

Die Auswahl erfolgt nicht mehr direkt ueber verstreute `if/else`-Handle-Abfragen, sondern ueber den `contentKey` aus `productPageConfig.ts`.
Die redaktionelle Regel ist dabei: kein gemeinsamer Content-Key fuer unterschiedliche Produkte, solange es sich nicht nur um einen temporaeren Fallback handelt.

## Workflow fuer neue Produkte

### Fall 1: Produkt ist neu, aber es gibt noch keinen eigenen Content

Nur Eintrag in:

- [utils/productPageConfig.ts](/Users/pascal/Dev/vitesse-shopify-shop/webshop/utils/productPageConfig.ts)

Beispiel:

```ts
{
  handles: ['neues-zubehoer'],
  template: 'accessory',
  contentKey: 'default',
}
```

Hinweis:
`default` ist nur ein Zwischenzustand. Sobald Inhalte vorliegen, bekommt das Produkt einen eigenen `contentKey` und einen eigenen Builder.

### Fall 2: Produkt bekommt eigenen Content

1. In [utils/productPageConfig.ts](/Users/pascal/Dev/vitesse-shopify-shop/webshop/utils/productPageConfig.ts) neuen Eintrag anlegen
2. Einen eigenen `contentKey` vergeben
3. In [utils/productDetailContent.ts](/Users/pascal/Dev/vitesse-shopify-shop/webshop/utils/productDetailContent.ts) einen passenden Content-Builder anlegen
4. Den neuen `contentKey` im Switch von `getProductDetailContent()` verdrahten

Beispiel:

```ts
{
  handles: ['witty-zwischenzeit-kit'],
  template: 'accessory',
  contentKey: 'witty-zwischenzeit-kit',
}
```

Und dazu:

```ts
function buildWittyZwischenzeitKitContent(product?: ShopifyProduct | null): ProductDetailContent {
  // produktspezifische Inhalte
}
```

### Fall 3: Neues eigenes Layout fuer weitere Produkttypen

Wenn spaeter mehr als `main` und `accessory` benoetigt wird:

1. Neues Template als Komponente unter `components/productDetails/` anlegen
2. `ProductPageTemplate` in [utils/productPageConfig.ts](/Users/pascal/Dev/vitesse-shopify-shop/webshop/utils/productPageConfig.ts) erweitern
3. Routing-Logik in [pages/products/[id].vue](/Users/pascal/Dev/vitesse-shopify-shop/webshop/pages/products/%5Bid%5D.vue) um das neue Template erweitern

## Alias-Route

Falls im Projekt oder extern noch Singular-Links verwendet werden, existiert zusaetzlich:

- [pages/product/[id].vue](/Users/pascal/Dev/vitesse-shopify-shop/webshop/pages/product/%5Bid%5D.vue)

Diese Route leitet `/product/<handle>` auf `/products/<handle>` weiter.

## Aktuelle Beispiele

Aktuell konfiguriert:

- `t-apex` -> `main`
- `exopek-pro` -> `main`
- `tunturi-platinum-tr30-core-treadmill` -> `main`
- `optogait` -> `accessory`

## Empfehlung

Neue Produkte immer zuerst in `productPageConfig.ts` registrieren.
Danach sollte jedes Produkt einen eigenen `contentKey` und einen eigenen Content-Builder erhalten.
`buildDefaultContent()` ist als Fallback gedacht, nicht als dauerhafte Gruppierungsstrategie fuer mehrere Produkte.

So bleibt die Produktarchitektur:

- zentral steuerbar
- redaktionell sauber pro Produkt getrennt
- klar zwischen Template-Wahl und Content-Wahl getrennt

## Collections

Die gleiche Logik gilt auch fuer Collection-Seiten.

Zentrale Dateien:

- [utils/collectionPageConfig.ts](/Users/pascal/Dev/vitesse-shopify-shop/webshop/utils/collectionPageConfig.ts)
- [utils/collectionDetailContent.ts](/Users/pascal/Dev/vitesse-shopify-shop/webshop/utils/collectionDetailContent.ts)
- [pages/collections/[slug].vue](/Users/pascal/Dev/vitesse-shopify-shop/webshop/pages/collections/%5Bslug%5D.vue)

Regel:

- jede Collection mit eigenem Shopify-Slug bekommt einen eigenen Eintrag
- jeder Eintrag bekommt ein eigenes `template`
- jeder Eintrag bekommt einen eigenen `contentKey`
- fuer jeden `contentKey` gibt es einen eigenen Content-Builder
- wenn kein Collection-Preset gepflegt ist, rendert die Seite auf den Standard-Fallback zurueck

Aktuell konfiguriert:

- `sprinttraining`, `t-apex` -> `hero`
- `witty` -> `hero`
- `sportreact` -> `hero`

Beispiel:

```ts
{
  slugs: ['sportreact'],
  template: 'hero',
  contentKey: 'sportreact',
}
```
