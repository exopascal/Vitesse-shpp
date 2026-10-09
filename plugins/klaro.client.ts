import 'klaro/dist/klaro.min.css'
import '~/assets/css/klaro-overrides.css'

const config = {
  version: 1,
  elementID: 'klaro',
  storageMethod: 'cookie',
  cookieName: 'vs_klaro',
  cookieExpiresAfterDays: 365,
  default: false,
  mustConsent: false,
  acceptAll: true,
  hideDeclineAll: false,
  lang: 'de',
  styling: {
    theme: ['dark', 'bottom', 'wide'],
  },
  translations: {
    de: {
      privacyPolicyUrl: '/datenschutz',
      consentNotice: {
        description:
          'Wir verwenden Cookies und ähnliche Technologien auf unserer Website. Einige sind notwendig, andere helfen uns, das Angebot zu verbessern.',
      },
      consentModal: {
        title: 'Deine Privatsphäre',
        description:
          'Hier kannst du einsehen und anpassen, welche Informationen wir über dich sammeln. Einträge ohne Häkchen sind optional.',
      },
      purposes: {
        essential: { title: 'Essenzielle Cookies', description: 'Für die Grundfunktionen der Website erforderlich.' },
        analytics: { title: 'Analyse & Statistik', description: 'Helfen uns zu verstehen, wie Besucher die Website nutzen.' },
        marketing: { title: 'Marketing', description: 'Werden verwendet, um personalisierte Werbung anzuzeigen.' },
        functional: { title: 'Funktional', description: 'Ermöglichen erweiterte Funktionen wie gespeicherte Präferenzen.' },
      },
    },
  },
  services: [
    {
      name: 'essential',
      title: 'Essenzielle Cookies',
      purposes: ['essential'],
      required: true,
    },
    {
      name: 'shopify-cart',
      title: 'Shopify Warenkorb',
      purposes: ['functional'],
      required: false,
      description: 'Speichert deinen Warenkorb zwischen Seitenbesuchen (localStorage).',
    },
    // Analytics- und Marketing-Services hier ergänzen, sobald aktiv.
    // Beispiel Google Analytics:
    // {
    //   name: 'google-analytics',
    //   title: 'Google Analytics',
    //   purposes: ['analytics'],
    //   cookies: [/^_ga/, /^_gid/],
    //   onAccept: `gtag('consent', 'update', { analytics_storage: 'granted' })`,
    //   onDecline: `gtag('consent', 'update', { analytics_storage: 'denied' })`,
    // },
  ],
}

export default defineNuxtPlugin(async () => {
  const klaroModule = await import('klaro')
  const klaro = (klaroModule as any).default ?? klaroModule
  klaro.setup(config)
})
