export default defineNuxtPlugin(() => {
  const { onCategoryAccepted, onConsentDenied } = useCookieConsent()

  onCategoryAccepted('analytics', () => {
    if (window.gtag) {
      window.gtag('consent', 'update', { analytics_storage: 'granted' })
    }
  })

  onConsentDenied(() => {
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      })
    }
  })
})
