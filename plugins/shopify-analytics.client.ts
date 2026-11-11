// Shopify Analytics for headless storefront.
// Tracking values (uniqueToken / visitToken) come from Shopify via our Storefront API
// proxy (/api/shopify-proxy), which reads them from the Server-Timing header and keeps
// Shopify's cookies first-party. The deprecated _shopify_y / _shopify_s cookies are no
// longer generated client-side.
// See: https://shopify.dev/docs/storefronts/headless/legacy/hydrogen/migrate/cookies-custom-setup
// Page views are sent to Shopify Monorail (same endpoint as hydrogen-react).
// Only runs when Klaro analytics consent is granted.

const MONORAIL_ENDPOINT = '/.well-known/shopify/monorail/unstable/produce_batch'
const SCHEMA_TREKKIE = 'trekkie_storefront_page_view/1.4'
const SCHEMA_CUSTOM = 'custom_storefront_customer_tracking/1.2'
const HEADLESS_APP_ID = '12875497473'

interface TrackingValues {
  shopId: string | null
  uniqueToken: string | null
  visitToken: string | null
}

// Random IDs for per-event fields (event_id, microSessionId) — NOT for visitor/session tokens
function generateToken(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

// Fetches Shopify's tracking values through the proxy. Each call also refreshes
// Shopify's first-party cookies, which keeps the visit (session) window rolling.
async function fetchTrackingValues(): Promise<TrackingValues | null> {
  try {
    return await $fetch<TrackingValues>('/api/shopify-proxy', { credentials: 'same-origin' })
  } catch {
    return null // Non-critical — analytics must not break the storefront
  }
}

// --- Page type mapping ---

function getPageType(path: string): string {
  if (path === '/') return 'index'
  if (path.startsWith('/products/')) return 'product'
  if (path.startsWith('/categories/')) return 'collection'
  if (path === '/blog') return 'blog'
  if (path.startsWith('/blog/')) return 'article'
  return 'page'
}

// --- Monorail event builder ---
// Payloads mirror hydrogen-react 2026.4 (analytics-schema-*.mjs formatPayload).

// Same logic as hydrogen-react getNavigationType()
function getNavigationType(): [string, string] {
  try {
    const entry = performance.getEntriesByType?.('navigation')?.[0] as PerformanceNavigationTiming | undefined
    if (entry?.type) return [String(entry.type), 'PerformanceNavigationTiming']
  } catch { /* fall through */ }
  return ['unknown', 'unknown']
}

function getCanonicalUrl(fallback: string): string {
  return document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href || fallback
}

function buildPageViewEvents(params: {
  shopNumericId: number
  shopDomain: string
  uniqueToken: string
  visitToken: string
  pageType: string
  url: string
  path: string
  referrer: string
  title: string
  // Actual consent state from Klaro — never hardcode to true
  analyticsAllowed: boolean
  marketingAllowed: boolean
  saleOfDataAllowed: boolean
}) {
  const now = Date.now()
  const [navigationType, navigationApi] = getNavigationType()
  const trekkiePayload = {
    appClientId: HEADLESS_APP_ID,
    isMerchantRequest: false,
    hydrogenSubchannelId: '0',
    isPersistentCookie: true,
    uniqToken: params.uniqueToken,
    visitToken: params.visitToken,
    microSessionId: generateToken(),
    microSessionCount: 1,
    url: params.url,
    path: params.path,
    search: location.search,
    referrer: params.referrer,
    title: params.title,
    shopId: params.shopNumericId,
    currency: 'EUR',
    contentLanguage: 'de',
    pageType: params.pageType,
  }
  const customPayload = {
    source: 'headless',
    asset_version_id: '2026.4.4',
    hydrogenSubchannelId: '0',
    is_persistent_cookie: true,
    deprecated_visit_token: params.visitToken,
    unique_token: params.uniqueToken,
    event_time: now,
    event_id: generateToken(),
    event_source_url: params.url,
    referrer: params.referrer,
    user_agent: navigator.userAgent,
    navigation_type: navigationType,
    navigation_api: navigationApi,
    shop_id: params.shopNumericId,
    currency: 'EUR',
    ccpa_enforced: false,
    gdpr_enforced: true,
    gdpr_enforced_as_string: 'true',
    analytics_allowed: params.analyticsAllowed,
    marketing_allowed: params.marketingAllowed,
    sale_of_data_allowed: params.saleOfDataAllowed,
    // SDK constant PAGE_RENDERED_EVENT_NAME is lowercase
    event_name: 'page_rendered',
    canonical_url: getCanonicalUrl(params.url),
  }
  return [
    { schema_id: SCHEMA_TREKKIE, payload: trekkiePayload, metadata: { event_created_at_ms: now } },
    { schema_id: SCHEMA_CUSTOM, payload: customPayload, metadata: { event_created_at_ms: now } },
  ]
}

async function sendToMonorail(events: object[], shopDomain: string) {
  try {
    const response = await fetch(`https://${shopDomain}${MONORAIL_ENDPOINT}`, {
      method: 'POST',
      headers: { 'content-type': 'text/plain' },
      body: JSON.stringify({ events, metadata: { event_sent_at_ms: Date.now() } }),
      keepalive: true,
    })
    // Like hydrogen-react: a 207 or a body with per-event result[].status signals rejected events
    const text = await response.text()
    if (!response.ok) {
      console.warn('[shopify-analytics] Monorail request failed:', response.status, text)
    } else if (text) {
      const json = JSON.parse(text) as { result?: { status: number, message?: string }[] }
      json.result?.forEach((r) => {
        if (r.status !== 200) console.warn('[shopify-analytics] Monorail rejected event:', r.status, r.message)
      })
    }
  } catch {
    // Non-critical — analytics must not break the storefront
  }
}

// --- Plugin ---

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const shopDomain = config.public.shopify.domain as string

  let analyticsConsented = false

  // Maps the visitor's Klaro choices to Shopify's consent fields.
  // Marketing / sale of data: true only if the visitor accepted a service with that purpose.
  function getConsentState() {
    const manager = (window as any).klaro?.getManager?.()
    const services: { name: string, purposes?: string[] }[] = manager?.config?.services ?? []
    const hasPurposeConsent = (purpose: string) =>
      services.some(s => s.purposes?.includes(purpose) && manager?.getConsent?.(s.name))
    return {
      analyticsAllowed: analyticsConsented,
      marketingAllowed: hasPurposeConsent('marketing'),
      saleOfDataAllowed: hasPurposeConsent('marketing'),
    }
  }

  async function trackPageView() {
    if (!shopDomain) return
    const values = await fetchTrackingValues()
    // Extract numeric ID from "gid://shopify/Shop/12345"
    const shopNumericId = Number(values?.shopId?.match(/\/(\d+)$/)?.[1] ?? 0)
    if (!shopNumericId || !values?.uniqueToken || !values?.visitToken) {
      console.debug('[shopify-analytics] No tracking values from Shopify, skipping page view')
      return
    }

    const events = buildPageViewEvents({
      shopNumericId,
      shopDomain,
      uniqueToken: values.uniqueToken,
      visitToken: values.visitToken,
      pageType: getPageType(location.pathname),
      url: location.href,
      path: location.pathname,
      referrer: document.referrer,
      title: document.title,
      ...getConsentState(),
    })
    await sendToMonorail(events, shopDomain)
    console.debug('[shopify-analytics] page_viewed sent:', location.pathname)
  }

  async function onConsentGranted() {
    if (analyticsConsented) return // already active (Klaro restore + onAccept can both fire)
    analyticsConsented = true
    await trackPageView()
  }

  function onConsentRevoked() {
    analyticsConsented = false
  }

  window.addEventListener('shopify-analytics:consent', onConsentGranted)
  window.addEventListener('shopify-analytics:revoke', onConsentRevoked)

  // Restore consent from previous visit (Klaro reads vs_klaro cookie)
  nuxtApp.hook('app:mounted', async () => {
    const manager = (window as any).klaro?.getManager?.()
    if (manager?.getConsent?.('shopify-analytics')) {
      await onConsentGranted()
    }
  })

  // Track every client-side navigation (also refreshes Shopify's session via the proxy)
  nuxtApp.hook('page:finish', async () => {
    if (!analyticsConsented) return
    await trackPageView()
  })
})
