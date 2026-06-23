// Overrides nuxt-simple-cookie-consent's composable.
// Bugs in the module:
//  1. updatePreferences calls JSON.stringify() before assigning to useCookie().value,
//     causing double-serialization — cookie stores a JSON string of a JSON string.
//  2. Without consentVersion in config, isOutdatedVersion is always true → state resets on every load.
// This composable reads/writes cookies correctly and repairs legacy double-encoded values.

export function useCookieConsent() {
  const config = useRuntimeConfig().public.cookieConsent as {
    cookieName?: string
    consentVersion?: string
    categories: Record<string, { label: string; description: string; required?: boolean }>
    scripts?: unknown[]
  }

  const cookieName = config.cookieName || 'cookie_consent'
  const maxAge = 365 * 24 * 60 * 60
  const expiresInMs = 365 * 24 * 60 * 60 * 1000
  const baseOpts = { sameSite: 'lax' as const, maxAge, path: '/' }

  const prefCookie = useCookie<Record<string, boolean>>(cookieName, {
    ...baseOpts,
    default: () => ({} as Record<string, boolean>),
  })

  const tsCookie = useCookie<number | null>('cookie_consent_timestamp', {
    ...baseOpts,
    default: () => null,
  })

  const versionCookie = useCookie<string>('cookie_consent_version', { ...baseOpts })

  const preferences = useState<Record<string, boolean>>('cookieConsent', () => {
    const val = prefCookie.value
    return typeof val === 'object' && val !== null ? val : {}
  })

  // Repair legacy double-encoded state (module may have set it to a JSON string)
  if (typeof (preferences.value as unknown) === 'string') {
    try { preferences.value = JSON.parse(preferences.value as unknown as string) }
    catch { preferences.value = {} }
  }

  const isConsentExpired = computed(() => {
    const ts = tsCookie.value
    return ts !== null ? Date.now() - Number(ts) > expiresInMs : false
  })

  const hasUserMadeChoice = computed(() => {
    const prefs = preferences.value
    if (typeof prefs !== 'object' || prefs === null) return false
    return Object.entries(config.categories).some(([key, meta]) => {
      if (meta.required) return false
      return prefs[key] !== null && prefs[key] !== undefined
    })
  })

  function updatePreferences(newPrefs: Record<string, boolean>) {
    const updated: Record<string, boolean> = {}
    for (const [key, meta] of Object.entries(config.categories)) {
      updated[key] = meta.required ? true : !!newPrefs[key]
    }
    preferences.value = updated
    prefCookie.value = updated
    tsCookie.value = Date.now()
    versionCookie.value = config.consentVersion ?? '1'
  }

  const acceptAll = () => updatePreferences(
    Object.keys(config.categories).reduce((a, k) => ({ ...a, [k]: true }), {} as Record<string, boolean>)
  )

  const denyAll = () => updatePreferences(
    Object.entries(config.categories).reduce(
      (a, [k, m]) => ({ ...a, [k]: !!m.required }),
      {} as Record<string, boolean>
    )
  )

  const acceptCategories = (cats: string[]) => updatePreferences(
    Object.keys(config.categories).reduce(
      (a, k) => ({ ...a, [k]: cats.includes(k) }),
      {} as Record<string, boolean>
    )
  )

  const noop = (_cb: () => void) => {}
  const noopCat = (_cb: (category: string) => void) => {}

  return {
    preferences,
    categories: Object.keys(config.categories),
    categoryMeta: config.categories,
    scripts: (config.scripts ?? []) as unknown[],
    acceptAll,
    denyAll,
    acceptCategories,
    updatePreferences,
    resetPreferences: denyAll,
    hasUserMadeChoice,
    consentTimestamp: tsCookie,
    isConsentExpired,
    onConsentAccepted: noop,
    onConsentDenied: noop,
    onCategoryAccepted: noopCat,
    onScriptsInjected: noopCat,
    onScriptsRemoved: noopCat,
  }
}
