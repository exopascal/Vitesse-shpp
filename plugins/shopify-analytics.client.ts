// Initializes Shopify first-party tracking cookies on the storefront domain.
// Only runs when Klaro analytics consent is granted.
//
// _shopify_y: unique visitor token (1 year) — generated client-side if absent
// _shopify_s: session token (30 min rolling) — regenerated per session
//
// Shopify's tracking JS only runs in myshopify.com context, so we generate
// these tokens ourselves as first-party cookies on the storefront domain.
// This matches what hydrogen-react does internally as fallback.

function getCookie(name: string): string {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : ''
}

function generateToken(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // Fallback for older environments
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

function setFirstPartyCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  const secure = location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax${secure}`
}

function ensureTrackingCookies() {
  // _shopify_y: unique visitor, 1 year
  if (!getCookie('_shopify_y')) {
    setFirstPartyCookie('_shopify_y', generateToken(), 365)
  }
  // _shopify_s: session, refresh to 30 min on every page
  setFirstPartyCookie('_shopify_s', getCookie('_shopify_s') || generateToken(), 0.021) // ~30 min
}

async function callProxy(): Promise<string | null> {
  try {
    const result = await $fetch<{ shopId: string | null }>('/api/shopify-proxy')
    return result?.shopId ?? null
  } catch {
    return null
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  let analyticsConsented = false

  async function onConsentGranted() {
    analyticsConsented = true
    ensureTrackingCookies()
    console.debug('[shopify-analytics] Tracking cookies set:', {
      _shopify_y: getCookie('_shopify_y').slice(0, 8) + '...',
      _shopify_s: getCookie('_shopify_s').slice(0, 8) + '...',
    })
    await callProxy()
  }

  function onConsentRevoked() {
    analyticsConsented = false
  }

  // Klaro fires these custom events via the onAccept/onDecline callbacks
  window.addEventListener('shopify-analytics:consent', onConsentGranted)
  window.addEventListener('shopify-analytics:revoke', onConsentRevoked)

  // If consent was already given in a previous visit (Klaro restores from vs_klaro cookie)
  nuxtApp.hook('app:mounted', async () => {
    const manager = (window as any).klaro?.getManager?.()
    if (manager?.getConsent?.('shopify-analytics')) {
      await onConsentGranted()
    }
  })

  // Keep _shopify_s rolling on each navigation (30-min session window)
  nuxtApp.hook('page:finish', () => {
    if (analyticsConsented) {
      ensureTrackingCookies()
    }
  })
})
