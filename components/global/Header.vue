<template>
  <header class="header" :class="{ 'header-scrolled': isScrolled }">
    <div class="header-container">
      <!-- Logo Section -->
      <div class="header-logo">
        <NuxtLink to="/" class="logo-link">
          <img v-if="logo" :src="logo" :alt="siteName" class="logo-image" />
          <span v-else-if="siteName === 'Vitesse Sports'" class="logo-wordmark" aria-label="Vitesse Sports">
            <span class="logo-wordmark-vitesse">Vitesse</span>
            <span class="logo-wordmark-sports">Sports</span>
          </span>
          <span v-else class="logo-text">{{ siteName }}</span>
        </NuxtLink>
        <span class="b2b-badge">Geschäftskunde</span>
      </div>

      <!-- Desktop Navigation -->
      <nav class="desktop-nav" :class="{ 'nav-hidden': isMobileMenuOpen }">
        <ul class="nav-list">
          <li 
            v-for="(item, index) in navigationItems" 
            :key="index"
            class="nav-item"
            :class="{ 'has-dropdown': item.children && item.children.length > 0 }"
            @mouseenter="showMegaMenu(index)"
            @mouseleave="hideMegaMenu()"
          >
            <NuxtLink 
              v-if="!item.children || item.children.length === 0"
              :to="item.url || '/'"
              class="nav-link"
              :class="{ 'active': isActiveRoute(item.url) }"
            >
              {{ item.title }}
            </NuxtLink>
            
            <button 
              v-else
              class="nav-link dropdown-trigger"
              :class="{ 'active': activeMegaMenu === index }"
              @click="toggleMegaMenu(index)"
            >
              {{ item.title }}
              <svg class="dropdown-icon" :class="{ 'rotated': activeMegaMenu === index }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <!-- Mega Menu -->
            <div 
              v-if="item.children && item.children.length > 0"
              class="mega-menu"
              :class="{ 'mega-menu-active': activeMegaMenu === index }"
            >
              <div class="mega-menu-container">
                <div class="mega-menu-grid">
                  <div 
                    v-for="(category, catIndex) in item.children" 
                    :key="catIndex"
                    class="mega-menu-category"
                  >
                    <h3 class="category-title">{{ category.title }}</h3>
                    <ul class="category-links">
                      <li v-for="(link, linkIndex) in category.children" :key="linkIndex">
                        <NuxtLink :to="link.url || '/'" class="category-link">
                          {{ link.title }}
                        </NuxtLink>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div v-if="item.featuredProducts?.length" class="mega-menu-highlights">
                  <div class="mega-menu-highlights-header">
                    <h4 class="mega-menu-highlights-title">Unsere Highlights</h4>
                  </div>
                  <div class="mega-menu-highlights-grid">
                    <article
                      v-for="product in item.featuredProducts"
                      :key="product.id"
                      class="highlight-card"
                    >
                      <NuxtLink
                        :to="`/products/${product.handle}`"
                        class="highlight-card-link"
                        @click="hideMegaMenu"
                      >
                        <img
                          v-if="product.featured_image"
                          :src="product.featured_image"
                          :alt="product.title"
                          class="highlight-card-image"
                        />
                        <div v-else class="highlight-card-image highlight-card-image-placeholder">
                          {{ product.title.charAt(0) }}
                        </div>
                        <div class="highlight-card-copy">
                          <p class="highlight-card-title">{{ product.title }}</p>
                          <p class="highlight-card-price">{{ formatPrice(product.price) }} <TaxNote /></p>
                        </div>
                      </NuxtLink>
                      <button
                        type="button"
                        class="highlight-card-button"
                        :disabled="!product.available || addingHighlightId === product.id"
                        @click.stop.prevent="addHighlightToCart(product)"
                      >
                        <span v-if="addingHighlightId === product.id">Wird hinzugefuegt...</span>
                        <span v-else-if="product.available">In den Warenkorb</span>
                        <span v-else>Nicht verfuegbar</span>
                      </button>
                    </article>
                  </div>
                </div>

                <!-- Featured Content -->
                <div v-else-if="item.featured" class="mega-menu-featured">
                  <div class="featured-content">
                    <img v-if="item.featured.image" :src="item.featured.image" :alt="item.featured.title" class="featured-image" />
                    <div class="featured-text">
                      <h4 class="featured-title">{{ item.featured.title }}</h4>
                      <p class="featured-description">{{ item.featured.description }}</p>
                      <NuxtLink v-if="item.featured.url" :to="item.featured.url" class="featured-link">
                        {{ item.featured.buttonText || 'Mehr erfahren' }}
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </nav>

      <!-- Header Actions -->
      <div class="header-actions">
        <!-- Search -->
        <button v-if="showSearch" @click="toggleSearch" class="action-btn search-btn">
          <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </button>

        <!-- User Account -->
        <a v-if="showAccount" :href="accountUrl" class="action-btn account-btn" aria-label="Mein Konto">
          <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        </a>

        <!-- Shopping Cart -->
        <button v-if="showCart" @click="toggleCart" class="action-btn cart-btn">
          <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.4 8L5 7m2 6l3 8m-3-8h10m-10 0a1 1 0 100 2 1 1 0 000-2zm10 0a1 1 0 100 2 1 1 0 000-2z"/>
          </svg>
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </button>

        <!-- Mobile Menu Toggle -->
        <button @click="toggleMobileMenu" class="mobile-menu-toggle">
          <svg v-if="!isMobileMenuOpen" class="hamburger-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else class="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Search Overlay -->
    <Transition name="search-fade">
      <div v-if="isSearchOpen" class="search-overlay">
        <div class="search-panel">
          <div class="search-container">
            <input 
              ref="searchInput"
              v-model="searchQuery"
              type="text" 
              placeholder="Nach Produkten suchen..."
              class="search-input"
              @keyup.enter="performSearch"
            />
            <button @click="performSearch" class="search-submit">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>
            <button @click="toggleSearch" class="search-close">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div v-if="searchQuery.trim()" class="search-results">
            <div v-if="isSearching" class="search-results-state">
              Produkte werden gesucht...
            </div>

            <div v-else-if="searchError" class="search-results-state search-results-state-error">
              {{ searchError }}
            </div>

            <div v-else-if="searchResults.length" class="search-results-list">
              <NuxtLink
                v-for="product in searchResults"
                :key="product.id"
                :to="`/products/${product.handle}`"
                class="search-result-card"
                @click="handleProductSelection"
              >
                <img
                  v-if="product.featured_image"
                  :src="product.featured_image"
                  :alt="product.title"
                  class="search-result-image"
                />
                <div v-else class="search-result-image search-result-image-placeholder">
                  {{ product.title.charAt(0) }}
                </div>

                <div class="search-result-content">
                  <p class="search-result-title">{{ product.title }}</p>
                  <p v-if="product.vendor" class="search-result-vendor">{{ product.vendor }}</p>
                  <p class="search-result-price">{{ formatPrice(product.price) }} <TaxNote /></p>
                </div>
              </NuxtLink>
            </div>

            <div v-else-if="hasSearched" class="search-results-state">
              Keine Produkte gefunden.
            </div>

            <button type="button" class="search-results-more" @click="performSearch">
              Alle Ergebnisse anzeigen
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Mobile Sidebar -->
    <Transition name="sidebar">
      <div v-if="isMobileMenuOpen" class="mobile-sidebar-overlay" @click="closeMobileMenu">
        <nav class="mobile-sidebar" @click.stop>
          <div class="mobile-sidebar-header">
            <div class="mobile-logo">
              <img v-if="logo" :src="logo" :alt="siteName" class="logo-image" />
              <span v-else-if="siteName === 'Vitesse Sports'" class="logo-wordmark" aria-label="Vitesse Sports">
                <span class="logo-wordmark-vitesse">Vitesse</span>
                <span class="logo-wordmark-sports">Sports</span>
              </span>
              <span v-else class="logo-text">{{ siteName }}</span>
            </div>
            <button @click="closeMobileMenu" class="mobile-close">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div class="mobile-nav-content">
            <ul class="mobile-nav-list">
              <li v-for="(item, index) in navigationItems" :key="index" class="mobile-nav-item">
                <div class="mobile-nav-group">
                  <NuxtLink 
                    v-if="!item.children || item.children.length === 0"
                    :to="item.url || '/'"
                    class="mobile-nav-link"
                    @click="closeMobileMenu"
                  >
                    {{ item.title }}
                  </NuxtLink>
                  
                  <button 
                    v-else
                    class="mobile-nav-link mobile-dropdown-trigger"
                    :class="{ 'active': activeMobileDropdown === index }"
                    @click="toggleMobileDropdown(index)"
                  >
                    {{ item.title }}
                    <svg class="mobile-dropdown-icon" :class="{ 'rotated': activeMobileDropdown === index }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>

                  <!-- Mobile Dropdown -->
                  <div 
                    v-if="item.children && item.children.length > 0"
                    class="mobile-dropdown"
                    :class="{ 'mobile-dropdown-active': activeMobileDropdown === index }"
                  >
                    <div v-for="(category, catIndex) in item.children" :key="catIndex" class="mobile-category">
                      <h4 class="mobile-category-title">{{ category.title }}</h4>
                      <ul class="mobile-category-links">
                        <li v-for="(link, linkIndex) in category.children" :key="linkIndex">
                          <NuxtLink 
                            :to="link.url || '/'" 
                            class="mobile-category-link"
                            @click="closeMobileMenu"
                          >
                            {{ link.title }}
                          </NuxtLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            <!-- Mobile Actions -->
            <div class="mobile-actions">
              <button v-if="showSearch" @click="openMobileSearch" class="mobile-action-btn">
                <svg class="mobile-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                Suchen
              </button>
              
              <a v-if="showAccount" :href="accountUrl" class="mobile-action-btn" @click="closeMobileMenu">
                <svg class="mobile-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                Mein Konto
              </a>
            </div>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useShopifyCardStore } from '~/store/shopifyCardStore'
import { useShopifyStore } from '~/store/shopifyStore'

const props = defineProps({
  // Logo Configuration
  logo: {
    type: String,
    default: ''
  },
  siteName: {
    type: String,
    default: 'My Store'
  },
  
  // Navigation wird über props nicht mehr konfiguriert - statisch
  
  // Feature Toggles
  showSearch: {
    type: Boolean,
    default: true
  },
  showAccount: {
    type: Boolean,
    default: true
  },
  showCart: {
    type: Boolean,
    default: true
  },
  
  // Cart
  cartCount: {
    type: Number,
    default: 0
  },
  
  // Styling
  backgroundColor: {
    type: String,
    default: '#ffffff'
  },
  textColor: {
    type: String,
    default: '#1f2937'
  },
  accentColor: {
    type: String,
    default: '#3b82f6'
  }
})

const emit = defineEmits(['search', 'toggle-cart'])
const { toggleCart: toggleGlobalCart, openCart } = useCartSidebar()

const route = useRoute()
const router = useRouter()
const shopifyStore = useShopifyStore()
const shopifyCardStore = useShopifyCardStore()

const fallbackShopChildren = [
  {
    title: 'Unsere Marken',
    children: [
      { title: 'Sportreact', url: '/collections/sportreact' },
      { title: 'T-Apex', url: '/collections/t-apex' },
      { title: 'EXOPEK', url: '/collections/exopek' },
      { title: 'Witty', url: '/collections/witty' },
      { title: 'Tunturi', url: '/collections/tunturi' },
      { title: 'Torque', url: '/collections/torque' },
      { title: 'IVO Trainer', url: '/collections/ivo-trainer' }
    ]
  },
  {
    title: 'Unsere Kollektionen',
    children: [
      { title: 'Widerstandstraining', url: '/collections/widerstandstraining' },
      { title: 'Reaktionsgeschwindigkeit & kognitives Training', url: '/collections/reaktionsgeschwindigkeit-kognitives-training' },
      { title: 'Zeitmessung & Leistungsanalyse', url: '/collections/zeitmessung-leistungsanalyse' },
      { title: 'Sprinttraining', url: '/collections/sprinttraining' }
    ]
  }
]

const preferredCollectionHandles = [
  'widerstandstraining',
  'reaktionsgeschwindigkeit-kognitives-training',
  'zeitmessung-leistungsanalyse',
  'sprinttraining'
]

const brandLinks = [
  { title: 'Sportreact', url: '/collections/sportreact' },
  { title: 'T-Apex', url: '/collections/t-apex' },
  { title: 'EXOPEK', url: '/collections/exopek' },
  { title: 'Witty', url: '/collections/witty' },
  { title: 'Tunturi', url: '/collections/tunturi' },
  { title: 'Torque', url: '/collections/torque' },
  { title: 'IVO Trainer', url: '/collections/ivo-trainer' }
]

const highlightedProductConfigs = [
  { query: 't-apex', matches: ['t-apex'] },
  { query: 'exopek pro', matches: ['exopek pro'] },
  { query: 'witty zeitmesser microgate', matches: ['witty', 'microgate'] },
  { query: 'sportreact academy bundle', matches: ['sportreact academy bundle', 'academy bundle'] }
]

const { data: shopCollections } = await useAsyncData('header-shop-collections', async () => {
  const collections = await shopifyStore.fetchAllCollections()

  const prioritizedCollections = preferredCollectionHandles
    .map((handle) => collections.find((collection) => collection.handle === handle))
    .filter(Boolean)

  const fallbackCollections = collections.filter(
    (collection) => !preferredCollectionHandles.includes(collection.handle)
  )

  return [...prioritizedCollections, ...fallbackCollections].slice(0, 8).map((collection) => ({
    title: collection.title,
    handle: collection.handle,
    url: `/collections/${collection.handle}`,
    image: collection.image || '',
    description: collection.description || ''
  }))
})

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

const { data: highlightedProducts } = await useAsyncData('header-highlight-products', async () => {
  const products = await Promise.all(
    highlightedProductConfigs.map(async (config) => {
      const matches = await shopifyStore.fetchProducts({
        filterQuery: config.query,
        sortBy: 'title-asc',
        limit: 8,
      })

      const selectedProduct = matches.find((product) => {
        const haystack = `${normalizeText(product.title)} ${normalizeText(product.handle)}`
        return config.matches.every((needle) => haystack.includes(normalizeText(needle)))
      }) || matches[0]

      return selectedProduct || null
    })
  )

  return products.filter(Boolean)
})

const navigationItems = computed(() => {
  const collectionLinks = shopCollections.value ?? []
  const featuredCollection = collectionLinks[0]
  const featuredProducts = highlightedProducts.value ?? []
  const curatedCollectionLinks = preferredCollectionHandles.map((handle) => {
    const collection = collectionLinks.find((entry) => entry.handle === handle)

    if (collection) {
      return {
        title: collection.title,
        url: collection.url
      }
    }

    return fallbackShopChildren[1].children.find((entry) => entry.url.endsWith(`/${handle}`))
  }).filter(Boolean)

  return [
  {
    title: 'Sprint',
    url: '/collections/sprinttraining'
  },
  {
    title: 'Kollektion',
    children: collectionLinks.length > 0
      ? [
          {
            title: 'Unsere Marken',
            children: brandLinks
          },
          {
            title: 'Unsere Kollektionen',
            children: curatedCollectionLinks
          }
        ]
      : fallbackShopChildren,
    featuredProducts,
    featured: featuredCollection
      ? {
          title: featuredCollection.title,
          description: featuredCollection.description || 'Direkt in die passende Kollektion wechseln.',
          image: featuredCollection.image,
          url: featuredCollection.url,
          buttonText: 'Kollektion ansehen'
        }
      : {
          title: 'Shop entdecken',
          description: 'Direkt zu allen Produkten und verfuegbaren Kollektionen.',
          image: '',
          url: '/products',
          buttonText: 'Zum Shop'
        }
  },
  {
    title: 'Widerstand',
    url: '/collections/widerstandstraining'
  },
  {
    title: 'Witty',
    url: '/collections/witty'
  }
]
})

// State
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeMegaMenu = ref(-1)
const activeMobileDropdown = ref(-1)
const isSearchOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)
const searchResults = ref([])
const isSearching = ref(false)
const addingHighlightId = ref('')
const searchError = ref('')
const hasSearched = ref(false)
let searchDebounceTimer = null

// Computed
const isActiveRoute = (url) => {
  if (!url) return false
  return route.path === url || route.path.startsWith(url + '/')
}

const formatPrice = (price) => {
  if (!price) {
    return ''
  }

  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

// Methods
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const resetSearchState = () => {
  searchResults.value = []
  isSearching.value = false
  searchError.value = ''
  hasSearched.value = false
}

const fetchSearchResults = async () => {
  const query = searchQuery.value.trim()

  if (!query) {
    resetSearchState()
    return
  }

  isSearching.value = true
  searchError.value = ''

  try {
    searchResults.value = await shopifyStore.searchProducts(query, 6)
    hasSearched.value = true
  } catch (error) {
    console.error('Header search failed:', error)
    searchResults.value = []
    searchError.value = 'Die Suche ist aktuell nicht verfuegbar.'
    hasSearched.value = true
  } finally {
    isSearching.value = false
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
  activeMobileDropdown.value = -1
}

const showMegaMenu = (index) => {
  activeMegaMenu.value = index
}

const hideMegaMenu = () => {
  activeMegaMenu.value = -1
}

const toggleMegaMenu = (index) => {
  activeMegaMenu.value = activeMegaMenu.value === index ? -1 : index
}

const toggleMobileDropdown = (index) => {
  activeMobileDropdown.value = activeMobileDropdown.value === index ? -1 : index
}

const toggleSearch = async () => {
  isSearchOpen.value = !isSearchOpen.value
  if (isSearchOpen.value) {
    await nextTick()
    searchInput.value?.focus()
  } else {
    searchQuery.value = ''
    resetSearchState()
  }
}

const toggleCart = () => {
  toggleGlobalCart()
  emit('toggle-cart')
}

const accountUrl = useRuntimeConfig().public.shopify.accountUrl

const performSearch = async () => {
  const query = searchQuery.value.trim()

  if (!query) {
    return
  }

  const nextQuery = route.path === '/products'
    ? { ...route.query, q: query }
    : { q: query }

  emit('search', query)
  isSearchOpen.value = false
  await router.push({ path: '/products', query: nextQuery })
  searchQuery.value = ''
}

const handleProductSelection = () => {
  isSearchOpen.value = false
  searchQuery.value = ''
  resetSearchState()
}

const addHighlightToCart = async (product) => {
  if (!product?.variant_id || !product.available || addingHighlightId.value) {
    return
  }

  addingHighlightId.value = product.id

  try {
    await shopifyCardStore.addToCart(product.variant_id, 1)
    openCart()
    hideMegaMenu()
  } catch (error) {
    console.error('Error adding highlighted product to cart:', error)
  } finally {
    addingHighlightId.value = ''
  }
}

const openMobileSearch = () => {
  closeMobileMenu()
  setTimeout(() => {
    toggleSearch()
  }, 300)
}

watch(searchQuery, () => {
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer)
  }

  const query = searchQuery.value.trim()

  if (!query) {
    resetSearchState()
    return
  }

  searchDebounceTimer = window.setTimeout(() => {
    fetchSearchResults()
  }, 250)
})

watch(() => route.fullPath, () => {
  if (!isSearchOpen.value) {
    return
  }

  isSearchOpen.value = false
  searchQuery.value = ''
  resetSearchState()
})

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer)
  }
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 48px;
  left: 0;
  right: 0;
  z-index: 1000;
  background: v-bind(backgroundColor);
  color: v-bind(textColor);
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.header-scrolled {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

/* Logo */
.header-logo {
  flex-shrink: 0;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-image {
  height: 40px;
  width: auto;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: v-bind(textColor);
}

.logo-wordmark {
  display: inline-flex;
  align-items: baseline;
  gap: 0.35rem;
  font-size: clamp(1.15rem, 1.45vw, 1.75rem);
  font-weight: 900;
  font-style: italic;
  letter-spacing: 0.02em;
  line-height: 0.9;
  text-transform: uppercase;
}

.logo-wordmark-vitesse {
  color: #005eb8;
}

.logo-wordmark-sports {
  color: #ffab3d;
}

/* B2B Badge */
.header-logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.b2b-badge {
  display: inline-block;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: #f0f7ff;
  border: 1px solid #bfdbfe;
  color: #1d4ed8;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
}

/* Desktop Navigation */
.desktop-nav {
  display: none;
  flex: 1;
  justify-content: center;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem 0;
  text-decoration: none;
  color: v-bind(textColor);
  font-weight: 500;
  transition: color 0.2s ease;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.nav-link:hover,
.nav-link.active {
  color: v-bind(accentColor);
}

.dropdown-icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.2s ease;
}

.dropdown-icon.rotated {
  transform: rotate(180deg);
}

/* Mega Menu */
.mega-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: min(1120px, calc(100vw - 2rem));
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  opacity: 0;
  visibility: hidden;
  transform: translateX(-50%) translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1001;
}

.mega-menu-active {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.mega-menu-container {
  padding: 2rem;
  display: flex;
  gap: 2rem;
}

.mega-menu-grid {
  flex: 0 0 360px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
}

.mega-menu-category {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.category-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  border-bottom: 2px solid v-bind(accentColor);
  padding-bottom: 0.5rem;
}

.category-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-link {
  color: #6b7280;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.category-link:hover {
  color: v-bind(accentColor);
}

.mega-menu-featured {
  flex: 1;
  background: #f9fafb;
  border-radius: 8px;
  padding: 1.5rem;
}

.mega-menu-highlights {
  flex: 1 1 0;
  min-width: 0;
  padding: 0.75rem;
  border-radius: 12px;
  background: linear-gradient(180deg, #f8fbfd 0%, #eef4f8 100%);
  border: 1px solid rgba(15, 94, 156, 0.08);
}

.mega-menu-highlights-header {
  margin-bottom: 0.5rem;
}

.mega-menu-highlights-title {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f172a;
}

.mega-menu-highlights-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.4rem;
}

.highlight-card {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.32rem;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(203, 213, 225, 0.7);
}

.highlight-card-link {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  text-decoration: none;
}

.highlight-card-image {
  width: 100%;
  aspect-ratio: 1 / 0.72;
  border-radius: 5px;
  object-fit: cover;
  background: #e5e7eb;
}

.highlight-card-image-placeholder {
  display: grid;
  place-items: center;
  color: #475569;
  font-size: 1.25rem;
  font-weight: 700;
}

.highlight-card-copy {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.highlight-card-title {
  margin: 0;
  font-size: 0.64rem;
  line-height: 1.1;
  font-weight: 600;
  color: #0f172a;
}

.highlight-card-price {
  margin: 0;
  font-size: 0.6rem;
  color: #0f5e9c;
  font-weight: 700;
}

.highlight-card-button {
  min-height: 1.55rem;
  border: none;
  border-radius: 999px;
  background: #f26a21;
  color: white;
  font-size: 0.54rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.2s ease, opacity 0.2s ease;
}

.highlight-card-button:hover {
  background: #da5b17;
}

.highlight-card-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.featured-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.featured-image {
  width: 100%;
  border-radius: 6px;
}

.featured-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
}

.featured-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.featured-link {
  display: inline-block;
  background: v-bind(accentColor);
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s ease;
  text-align: center;
}

.featured-link:hover {
  background: color-mix(in srgb, v-bind(accentColor) 90%, black);
}

/* Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.action-btn {
  position: relative;
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s ease;
  color: v-bind(textColor);
}

.action-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.action-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.cart-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #ef4444;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.125rem 0.375rem;
  border-radius: 10px;
  min-width: 1.25rem;
  text-align: center;
  line-height: 1;
}

.mobile-menu-toggle {
  display: block;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: v-bind(textColor);
}

.hamburger-icon,
.close-icon {
  width: 1.5rem;
  height: 1.5rem;
}

/* Search Overlay */
.search-overlay {
  position: fixed;
  top: 118px;
  left: 0;
  right: 0;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem;
  z-index: 999;
}

.search-panel {
  max-width: 600px;
  margin: 0 auto;
}

.search-container {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  border-color: v-bind(accentColor);
}

.search-submit,
.search-close {
  padding: 0.75rem;
  background: v-bind(accentColor);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.search-close {
  background: #6b7280;
}

.search-submit:hover {
  background: color-mix(in srgb, v-bind(accentColor) 90%, black);
}

.search-close:hover {
  background: #4b5563;
}

.search-submit svg,
.search-close svg {
  width: 1.25rem;
  height: 1.25rem;
}

.search-results {
  margin-top: 0.9rem;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  background: #f8fafc;
  overflow: hidden;
}

.search-results-list {
  display: flex;
  flex-direction: column;
}

.search-result-card {
  display: grid;
  grid-template-columns: 4.5rem minmax(0, 1fr);
  gap: 0.9rem;
  align-items: center;
  padding: 0.9rem 1rem;
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.2s ease;
}

.search-result-card:hover {
  background: rgba(255, 255, 255, 0.9);
}

.search-result-card:last-child {
  border-bottom: none;
}

.search-result-image {
  width: 4.5rem;
  height: 4.5rem;
  object-fit: cover;
  border-radius: 0.8rem;
  background: #e5e7eb;
}

.search-result-image-placeholder {
  display: grid;
  place-items: center;
  font-size: 1.25rem;
  font-weight: 700;
  color: #475569;
}

.search-result-content {
  min-width: 0;
}

.search-result-title,
.search-result-vendor,
.search-result-price {
  margin: 0;
}

.search-result-title {
  font-weight: 600;
  color: #0f172a;
}

.search-result-vendor {
  margin-top: 0.2rem;
  font-size: 0.85rem;
  color: #64748b;
}

.search-result-price {
  margin-top: 0.35rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f766e;
}

.search-results-state {
  padding: 1rem;
  font-size: 0.95rem;
  color: #475569;
}

.search-results-state-error {
  color: #b91c1c;
}

.search-results-more {
  width: 100%;
  padding: 0.9rem 1rem;
  border: none;
  border-top: 1px solid #e5e7eb;
  background: white;
  color: v-bind(accentColor);
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.search-results-more:hover {
  background: #eff6ff;
}

/* Mobile Sidebar */
.mobile-sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1002;
}

.mobile-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 320px;
  max-width: 85vw;
  background: white;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.mobile-sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.mobile-logo .logo-image {
  height: 32px;
}

.mobile-logo .logo-text {
  font-size: 1.25rem;
  font-weight: 600;
}

.mobile-logo .logo-wordmark {
  font-size: 1.2rem;
}

.mobile-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #6b7280;
}

.mobile-close svg {
  width: 1.25rem;
  height: 1.25rem;
}

.mobile-nav-content {
  flex: 1;
  padding: 1rem;
}

.mobile-nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.mobile-nav-item {
  border-bottom: 1px solid #f3f4f6;
}

.mobile-nav-group {
  display: flex;
  flex-direction: column;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  text-decoration: none;
  color: #1f2937;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  text-align: left;
}

.mobile-nav-link:hover,
.mobile-nav-link.active {
  color: v-bind(accentColor);
}

.mobile-dropdown-icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.2s ease;
}

.mobile-dropdown-icon.rotated {
  transform: rotate(180deg);
}

.mobile-dropdown {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.mobile-dropdown-active {
  max-height: 500px;
}

.mobile-category {
  padding: 0.5rem 0;
  border-left: 2px solid v-bind(accentColor);
  padding-left: 1rem;
  margin: 0.5rem 0;
}

.mobile-category-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #1f2937;
}

.mobile-category-links {
  list-style: none;
  margin: 0;
  padding: 0;
}

.mobile-category-link {
  display: block;
  padding: 0.5rem 0;
  color: #6b7280;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.mobile-category-link:hover {
  color: v-bind(accentColor);
}

.mobile-actions {
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-action-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f9fafb;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  color: #1f2937;
  transition: background-color 0.2s ease;
}

.mobile-action-btn:hover {
  background: #f3f4f6;
}

.mobile-action-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Transitions */
.search-fade-enter-active,
.search-fade-leave-active {
  transition: all 0.3s ease;
}

.search-fade-enter-from,
.search-fade-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.sidebar-enter-active,
.sidebar-leave-active {
  transition: all 0.3s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(-100%);
}

.sidebar-enter-active .mobile-sidebar-overlay,
.sidebar-leave-active .mobile-sidebar-overlay {
  transition: opacity 0.3s ease;
}

.sidebar-enter-from .mobile-sidebar-overlay,
.sidebar-leave-to .mobile-sidebar-overlay {
  opacity: 0;
}

/* Responsive */
@media (min-width: 768px) {
  .desktop-nav {
    display: flex;
  }
  
  .mobile-menu-toggle {
    display: none;
  }
}

@media (max-width: 767px) {
  .header-container {
    padding: 0 0.5rem;
  }
  
  .nav-hidden {
    display: none;
  }

  .search-container {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto auto;
  }

  .search-result-card {
    grid-template-columns: 3.75rem minmax(0, 1fr);
  }

  .search-result-image {
    width: 3.75rem;
    height: 3.75rem;
  }
}

/* Large Screens */
@media (min-width: 1200px) {
  .mega-menu {
    width: 1120px;
  }
  
  .mega-menu-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
