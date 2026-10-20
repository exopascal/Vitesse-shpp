// nuxt.config.ts - E-Commerce Webshop Config (Hydration Safe + LCP Optimized)
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/sitemap',
    '@nuxt/icon',
    '@nuxt/a11y',
    '@nuxt/content',
  ],

  content: {
    database: {
      type: 'sqlite',
      filename: '.data/content/content.db',
    },
    experimental: {
      sqliteConnector: 'native',
    },
  },

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
    writeEarlyHints: true,
  },

  $production: {
    nitro: {
      preset: 'cloudflare-pages',
    },
  },

  nitro: {
    routeRules: {
      // Homepage
      '/': {
        ssr: true,
        headers: {
          'cache-control': 's-maxage=3600, stale-while-revalidate=86400',
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

      // Blog (Nuxt Content)
      '/blog/**': {
        ssr: true,
        headers: {
          'cache-control': 's-maxage=300, stale-while-revalidate=600',
        }
      },

      // API routes – CORS nur für eigene Domain erlauben (Origin aus .env)
      '/api/**': {
        cors: true,
        headers: {
          'Access-Control-Allow-Origin': process.env.NUXT_PUBLIC_SITE_URL || '',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'cache-control': 'max-age=60'
        }
      }
    }
  },

  // Runtime Config
  runtimeConfig: {
    public: {
      tenantId: process.env.TENANT_ID || 'default',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.vitesse-sports.de',

      // Shopify Configuration
      shopify: {
        domain: process.env.SHOPIFY_DOMAIN || 'flash-reflex-training.myshopify.com',
        apiVersion: process.env.SHOPIFY_API_VERSION || '2023-10',
        accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
        accountUrl: process.env.SHOPIFY_ACCOUNT_URL || ''
      }
    }
  },

  // Site Configuration for SEO and Sitemap
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.vitesse-sports.de'
  },

  // Sitemap Configuration
  sitemap: {
    sources: [
      '/api/sitemap/products',
      '/api/sitemap/categories',
      '/api/sitemap/blog'
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
      titleTemplate: '%s | Vitesse Sports',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/Vitesse-Bildmarke.png' },
        // Preconnect to Shopify CDN & API
        { rel: 'preconnect', href: 'https://cdn.shopify.com', crossorigin: '' },
        { rel: 'preconnect', href: 'https://flash-reflex-training.myshopify.com' },
        { rel: 'dns-prefetch', href: 'https://cdn.shopify.com' },
        // Preload LCP hero image
        { rel: 'preload', as: 'image', href: '/t-apex-zugwiderstandtraining-sprinttraining.jpg', fetchpriority: 'high' },
      ],
      meta: [
        { name: 'description', content: 'Premium Trainingsgeräte für Sprinttechnik, Widerstandstraining und Overspeed Training. Entdecke das Vitesse Sports Equipment.' },
        { property: 'og:site_name', content: 'Vitesse Sports' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'de_DE' },
        { name: 'robots', content: 'index, follow' },
      ],

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
            'pinia-vendor': ['pinia'],
          }
        }
      }
    }
  },

})
