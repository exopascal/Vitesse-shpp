# Bug Report for Jan S.

## Date
2026-03-16

## Topic
Homepage CTA buttons in [`pages/index.vue`](/Users/pascal/Dev/vitesse-shopify-shop/webshop/pages/index.vue) are not clickable in the running storefront.

## Summary
The homepage visually renders all primary CTA buttons in the hero and collection sections, but the buttons do not react to clicks in the running storefront.

The affected CTAs include at least:
- T-Apex hero CTA
- Torque CTA
- Sportreact CTA
- Exopek CTA
- HP Cosmos / Witty CTA
- Tunturi CTA

This means the issue is not tied to one single route target. It affects the general clickability of homepage CTA elements.

## Observed behavior
- Buttons on the homepage are rendered with the expected labels and visual styles.
- Clicking the buttons does not navigate to the configured `to` destinations.
- The configured route targets in [`pages/index.vue`](/Users/pascal/Dev/vitesse-shopify-shop/webshop/pages/index.vue) were updated repeatedly and are not the apparent root cause.
- The issue affects buttons across multiple homepage components, not just one section.

## Scope
Affected rendering path:

- [pages/index.vue](/Users/pascal/Dev/vitesse-shopify-shop/webshop/pages/index.vue)
- [components/home/HeroSection.vue](/Users/pascal/Dev/vitesse-shopify-shop/webshop/components/home/HeroSection.vue)
- [components/home/CollectionFeatureSection.vue](/Users/pascal/Dev/vitesse-shopify-shop/webshop/components/home/CollectionFeatureSection.vue)
- [components/home/CollectionGridSection.vue](/Users/pascal/Dev/vitesse-shopify-shop/webshop/components/home/CollectionGridSection.vue)
- [components/global/GradientButton.vue](/Users/pascal/Dev/vitesse-shopify-shop/webshop/components/global/GradientButton.vue)
- [layouts/default.vue](/Users/pascal/Dev/vitesse-shopify-shop/webshop/layouts/default.vue)
- [components/global/CommercialBanner.vue](/Users/pascal/Dev/vitesse-shopify-shop/webshop/components/global/CommercialBanner.vue)

## Investigation performed
- Verified that the homepage CTA route targets in [`pages/index.vue`](/Users/pascal/Dev/vitesse-shopify-shop/webshop/pages/index.vue) point to valid product and collection URLs.
- Checked for obvious blocking layers in the homepage sections and set non-interactive layers such as media/overlays to `pointer-events: none` where appropriate.
- Checked the sticky commercial subheader introduced below the main header and made it non-interactive to avoid click interception.
- Inspected the shared CTA component [`components/global/GradientButton.vue`](/Users/pascal/Dev/vitesse-shopify-shop/webshop/components/global/GradientButton.vue).
- A temporary attempt to change the internal `NuxtLink` resolution inside `GradientButton.vue` was reverted because it made the runtime behavior worse and did not solve the issue.

## Current status
The root cause is still unresolved.

The most likely remaining causes are:
- a runtime interaction issue in the rendered header/layout stack
- a click-blocking layer outside the homepage section components
- a deeper issue in how the shared `GradientButton` is rendered in the current storefront runtime

## Important note
This is currently a runtime bug, not just a configuration bug.

Changing the `to` values in [`pages/index.vue`](/Users/pascal/Dev/vitesse-shopify-shop/webshop/pages/index.vue) does not fix the problem by itself, because the buttons remain non-clickable regardless of the configured target.

## Recommended next step
1. Inspect the rendered DOM in the browser on the homepage and confirm which element sits on top of the CTA buttons at click time.
2. Check computed `pointer-events`, stacking context, and active bounding boxes for:
   - the homepage hero/content wrappers
   - the sticky/fixed header and subheader
   - the shared `GradientButton` root element
3. Confirm whether the actual rendered CTA element is a proper `<a>` / `NuxtLink` in the final DOM.
4. If the DOM is correct, test whether a parent wrapper prevents pointer interaction.

## Date
2026-03-14

## Topic
Mega Menu products no longer loading in the webshop header.

## Summary
The mega menu in [`components/global/Header.vue`](/Users/pascal/Dev/vitesse-shopify-shop/webshop/components/global/Header.vue) depended on a fixed list of Shopify collection handles. If those configured handles no longer matched the current Shopify collections or returned no products, the mega menu rendered without populated product cards.

The header logic has been adjusted so the mega menu now:
- prefers configured collections when they still exist and contain products
- filters out empty collections
- falls back to available shop collections when the configured handles are outdated or empty
- uses image-based fallback cards only as a last resort

## Observed behavior
- Products in the mega menu stopped appearing.
- The menu structure still existed, but the product-backed collection cards were missing or empty.
- The issue was isolated to the collection data assembly in the header, not to the mega menu template itself.
- On the homepage, the brand logos are not linked yet:
  - the T-Apex logo should link to `/products/t-apex`
  - the Exopek logo should link to `/products/exopek-pro`
- A follow-up implementation attempt in [`pages/index.vue`](/Users/pascal/Dev/vitesse-shopify-shop/webshop/pages/index.vue) added `NuxtLink` targets for both logos, but the links still do not work in the running storefront.

## Root cause
The collection menu data builder in [`components/global/Header.vue`](/Users/pascal/Dev/vitesse-shopify-shop/webshop/components/global/Header.vue#L368) used a hardcoded configuration:

- `widerstandstraining`
- `sprinttraining`
- `zeitmessung-leistungsanalyse`
- `sprint-und-explosivkrafttraining`
- `reaktionsgeschwindigkeit-kognitives-training`

If Shopify no longer exposed those exact handles, or if those collections existed but were empty, the mega menu had no valid product payload to render.

## Fix applied
Updated [`components/global/Header.vue`](/Users/pascal/Dev/vitesse-shopify-shop/webshop/components/global/Header.vue#L396) to:

- build collection cards via a shared helper
- attach `productCount` per collection
- keep only collections with actual products for the mega menu
- retry with the first available Shopify collections when the configured set yields no populated cards
- fall back to image-backed cards only if no populated collection cards are available at all

## Typecheck status
Attempted on 2026-03-14:

```bash
yarn --cwd webshop nuxi typecheck
```

### Initial blocker
At first, the command could not complete because `vue-tsc` was not locally available and `nuxi` tried to resolve it from the registry.

Observed blocking error:

```text
npm ERR! code ENOTFOUND
npm ERR! syscall getaddrinfo
npm ERR! network request to https://registry.npmjs.org/vue-tsc failed
```

### Tooling fix applied
`vue-tsc` was installed locally as a dev dependency:

```bash
yarn --cwd webshop add -D vue-tsc
```

After that, `typecheck` ran and returned real project errors.

### Mega menu related typecheck finding
One typecheck error was introduced by the mega menu patch itself and has already been fixed:

```text
components/global/Header.vue(397,14): error TS8010:
Type annotations can only be used in TypeScript files.
```

Cause:
- a TypeScript type annotation was added inside a plain `<script setup>` block

Fix:
- removed the inline TypeScript annotation from [`components/global/Header.vue`](/Users/pascal/Dev/vitesse-shopify-shop/webshop/components/global/Header.vue)

### Remaining typecheck errors
The project still has multiple unrelated TypeScript issues after the mega menu fix:

- `composables/useDesignTokensOptimized.ts`
  - `Property 'data' does not exist on type 'never'`
- `composables/useGradientActionButtonAnimation.ts`
  - incorrect `MaybeElement` / ref typing passed into `useElementHover`
- `nuxt.config.ts`
  - missing Node typings for `process`
  - invalid `consentMode` option on module config
  - missing `window.gtag` typing
- `playwright.config.ts`
  - missing Node typings for `process`
- `plugins/design-tokens.client.ts`
  - missing Node typings for `process`
- `plugins/generate-custom-css.client.ts`
  - `Property 'data' does not exist on type 'never'`
  - missing Node typings for `process`
- `server/api/sitemap/categories.ts`
  - `defineSitemapEventHandler` not exported from `#imports`
  - implicit `any` parameter
- `server/api/sitemap/products.ts`
  - `defineSitemapEventHandler` not exported from `#imports`
  - implicit `any` parameter
- `store/shopifyCardStore.ts`
  - `process` typings missing
  - invalid header typing for `X-Shopify-Storefront-Access-Token`
- `store/shopifyStore.ts`
  - invalid header typing for `X-Shopify-Storefront-Access-Token`
- `utils/seo/recommendations.ts`
  - missing local module files/types for `page-discovery.js` and `link-graph.js`
  - implicit `any` parameters

## Additional warnings seen during typecheck startup
- `@nuxt/icon` is disabled because it requires Nuxt `>= 4.0.0`, while the project is running Nuxt `3.21.2`
- runtime config serialization warnings for `public.cookieConsent.cookies.analytics.accepted`
- runtime config serialization warnings for `public.cookieConsent.cookies.analytics.declined`

These warnings appeared before the `vue-tsc` failure and are not the root cause of the mega menu product-loading issue.

## Files involved
- [`components/global/Header.vue`](/Users/pascal/Dev/vitesse-shopify-shop/webshop/components/global/Header.vue)
- [`store/shopifyStore.ts`](/Users/pascal/Dev/vitesse-shopify-shop/webshop/store/shopifyStore.ts)
- [`package.json`](/Users/pascal/Dev/vitesse-shopify-shop/webshop/package.json)
- [`pages/index.vue`](/Users/pascal/Dev/vitesse-shopify-shop/webshop/pages/index.vue)

## Remaining verification gap
The mega menu fix is implemented and the direct header typecheck issue is fixed. A clean project-wide typecheck still fails due to multiple pre-existing or unrelated TypeScript problems listed above.

The homepage logo-link issue remains unresolved. A direct implementation attempt in [`pages/index.vue`](/Users/pascal/Dev/vitesse-shopify-shop/webshop/pages/index.vue) did not produce working links in the actual storefront, so the root cause likely sits outside the simple logo data mapping or requires runtime verification in the rendered homepage stack.

## Recommended next step
1. Fix the project-wide TypeScript baseline, starting with missing Node typings and the invalid sitemap handler imports.
2. Re-run `yarn --cwd webshop nuxi typecheck` until the baseline is clean.
3. Verify the header in `yarn --cwd webshop dev` against the current Shopify collections and confirm the mega menu now shows populated collection cards.
4. Inspect the live homepage rendering path for [`pages/index.vue`](/Users/pascal/Dev/vitesse-shopify-shop/webshop/pages/index.vue) and determine why the `NuxtLink`-based logo links are not taking effect at runtime.
