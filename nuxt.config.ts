// nuxt.config.ts - E-Commerce Webshop Config (Hydration Safe + LCP Optimized)
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/sitemap',
    'nuxt-simple-cookie-consent',
    '@nuxt/icon',
  ],

  css: ['~/assets/css/global.css'],

  // Component Auto-Import Configuration
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  // SSR Settings für Hydration Fix
  ssr: true,

  // CRITICAL: Hydration Mismatch Prevention
  experimental: {
    payloadExtraction: false,
    writeEarlyHints: false
  },

  nitro: {
    preset: 'cloudflare-pages',
    routeRules: {
      // Homepage
      '/': {
        ssr: true,
        headers: {
          'cache-control': 's-maxage=60, stale-while-revalidate=300',
        },
      },

      // Product pages (dynamic)
      '/products/**': {
        ssr: true,
        headers: {
          'cache-control': 's-maxage=300, stale-while-revalidate=600',
        }
      },

      // Category pages
      '/categories/**': {
        ssr: true,
        headers: {
          'cache-control': 's-maxage=300, stale-while-revalidate=600',
        }
      },

      // API routes
      '/api/**': {
        cors: true,
        headers: {
          'cache-control': 'max-age=60'
        }
      }
    }
  },

  // Runtime Config
  runtimeConfig: {
    public: {
      tenantId: process.env.TENANT_ID || 'default',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://shop.exopek.de',

      // Shopify Configuration
      shopify: {
        domain: process.env.SHOPIFY_DOMAIN,
        apiVersion: process.env.SHOPIFY_API_VERSION || '2023-10',
        accessToken: process.env.SHOPIFY_ACCESS_TOKEN
      }
    }
  },

  // Site Configuration for SEO and Sitemap
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://shop.exopek.de'
  },

  // Sitemap Configuration
  sitemap: {
    sources: [
      '/api/sitemap/products',
      '/api/sitemap/categories'
    ],
    exclude: [
      '/admin/**',
      '/api/**',
      '/checkout/**',
      '/cart'
    ]
  },

  // App Settings - Hydration Safe
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1',
      charset: 'utf-8',

      // Hydration Debug (development only)
      script: process.env.NODE_ENV === 'development' ? [
        {
          innerHTML: `
            window.__NUXT_HYDRATION_DEBUG__ = true;
            window.addEventListener('vite:beforeUpdate', () => {
              console.log('Hydration mismatch detected');
            });
          `
        }
      ] : []
    }
  },

  // Vite Build Optimization
  vite: {
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue', '@vue/shared'],
            'shopify-vendor': [] // Add Shopify SDK here when needed
          }
        }
      }
    }
  },

  // Cookie Consent Configuration (GDPR/DSGVO compliant)
  cookieConsent: {
    consentMode: true,

    cookies: {
      essential: {
        label: 'Essenzielle Cookies',
        description: 'Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.',
        required: true
      },
      analytics: {
        label: 'Analyse & Statistik',
        description: 'Diese Cookies helfen uns, die Nutzung unserer Website zu verstehen und zu verbessern.',
        required: false,
        src: 'https://www.googletagmanager.com/gtag/js',
        async: true,
        accepted: () => {
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('consent', 'update', {
              analytics_storage: 'granted'
            })
          }
        },
        declined: () => {
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('consent', 'update', {
              analytics_storage: 'denied'
            })
          }
        }
      },
      marketing: {
        label: 'Marketing',
        description: 'Diese Cookies werden verwendet, um Ihnen personalisierte Werbung anzuzeigen.',
        required: false
      },
      functional: {
        label: 'Funktional',
        description: 'Diese Cookies ermöglichen erweiterte Funktionalitäten wie z.B. die Speicherung Ihrer Präferenzen.',
        required: false
      }
    },

    cookieExpiryDays: 365,

    // Google Consent Mode v2
    googleConsentMode: {
      enabled: true,
      defaultConsent: {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        security_storage: 'granted'
      }
    }
  },
})
