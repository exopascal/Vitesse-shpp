import { useCookieConsent } from '~/composables/useCookieConsent'

export default defineNuxtPlugin(() => {
  const { onCategoryAccepted, onConsentDenied } = useCookieConsent()

  onCategoryAccepted((category) => {
    if (category === 'analytics' && (window as unknown as Record<string, unknown>).gtag) {
      ;(window as unknown as { gtag: Function }).gtag('consent', 'update', { analytics_storage: 'granted' })
    }
  })

  onConsentDenied(() => {
    if ((window as unknown as Record<string, unknown>).gtag) {
      ;(window as unknown as { gtag: Function }).gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      })
    }
  })
})
