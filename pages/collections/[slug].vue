<template>
  <div class="collection-page">
    <div v-if="isLoading" class="loading">
      Collection wird geladen...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else-if="!collection" class="not-found">
      Collection nicht gefunden.
    </div>
    
    <div v-else>
      <div class="collection-fallback">
        <HeroSection
          v-if="collectionHero"
          :kicker="collectionHero.kicker"
          :title="collectionHero.title"
          :text="collectionHero.text"
          :background-video="collectionHero.backgroundVideo"
          :background-image="collectionHero.backgroundImage"
          :button-text="collectionHero.buttonText"
          :href="collectionHero.href"
          :button-variant="collectionHero.buttonVariant"
        />

        <section v-if="collectionSeoContent" class="collection-seo-section">
          <div class="collection-seo-inner">
            <h2 class="collection-seo-title">{{ collectionSeoContent.title }}</h2>
            <p class="collection-seo-text">{{ collectionSeoContent.body }}</p>
            <div
              v-if="collectionSeoContent.goals?.length"
              class="collection-seo-goals-grid"
            >
              <article
                v-for="goal in collectionSeoContent.goals"
                :key="goal.title"
                class="collection-seo-goal-card"
              >
                <h3 class="collection-seo-goal-title">{{ goal.title }}</h3>
                <p class="collection-seo-goal-text">{{ goal.description }}</p>
              </article>
            </div>
          </div>
        </section>

        <!-- Collection Header -->
        <div v-else class="collection-header">
          <div v-if="collection.image" class="collection-banner">
            <img :src="collection.image" :alt="collection.title" />
          </div>
          
          <div class="collection-info">
            <h1>{{ collection.title }}</h1>
            <p v-if="collection.description" class="description">
              {{ collection.description }}
            </p>
            <span class="product-count">
              {{ collection.productsCount }} Produkte
            </span>
          </div>
        </div>
        
        <!-- Products Grid -->
        <div id="collection-products" class="products-section">
          <div class="products-section-header">
            <p class="products-section-kicker">{{ productsSectionTitle }}</p>
          </div>

          <div v-if="isLoadingProducts" class="loading-products">
            Produkte werden geladen...
          </div>
          
          <div v-else-if="products.length === 0" class="no-products">
            Keine Produkte in dieser Collection gefunden.
          </div>
          
          <div v-else class="products-grid">
            <NuxtLink 
              v-for="product in displayedProducts" 
              :key="product.id"
              :to="`/products/${product.handle}`"
              class="product-card"
            >
              <div class="product-image">
                <img 
                  v-if="product.featured_image" 
                  :src="product.featured_image" 
                  :alt="product.title"
                />
                <div v-else class="no-image">
                  {{ product.title.charAt(0) }}
                </div>
                
                <div v-if="product.on_sale" class="sale-badge">
                  Sale
                </div>
              </div>
              
              <div class="product-info">
                <h3>{{ product.title }}</h3>
                <div class="price">
                  <span 
                    v-if="product.on_sale && product.compare_at_price" 
                    class="original-price"
                  >
                    {{ formatPrice(product.compare_at_price) }}
                  </span>
                  <span class="current-price">
                    {{ formatPrice(product.price) }}
                  </span>
                </div>
                <TaxNote />
                <div class="availability">
                  <span v-if="product.available" class="in-stock">
                    Verfügbar
                  </span>
                  <span v-else class="out-of-stock">
                    Ausverkauft
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useShopifyStore } from '../../store/shopifyStore'
import { getCollectionHeroContent, getCollectionSeoContent } from '~/utils/collectionDetailContent'
import { createBreadcrumbSchema, schemaToString } from '~/utils/schemas/productSchema'

// Route und Store
const route = useRoute()
const shopifyStore = useShopifyStore()

// Daten
const collection = ref<any>(null)
const products = ref<any[]>([])
const isLoading = ref(true)
const isLoadingProducts = ref(false)
const error = ref<string | null>(null)

// Slug aus Route
const slug = computed(() => route.params.slug as string)

const collectionHero = computed(() => getCollectionHeroContent(collection.value, slug.value))
const collectionSeoContent = computed(() => getCollectionSeoContent(collection.value, slug.value))
const productsSectionTitle = computed(() => {
  if (collectionSeoContent.value?.productsSectionTitle) {
    return collectionSeoContent.value.productsSectionTitle
  }

  return `Unsere Produkte für ${collection.value?.title || 'diese Collection'}.`
})
const displayedProducts = computed(() => {
  if (slug.value !== 'sprinttraining') {
    return products.value
  }

  const prioritizedHandles = [
    't-apex',
    'torque-tank-mx',
    'exopek-pro',
  ]

  const priorityMap = new Map(prioritizedHandles.map((handle, index) => [handle, index]))

  return [...products.value].sort((left, right) => {
    const leftPriority = priorityMap.get(left.handle) ?? Number.MAX_SAFE_INTEGER
    const rightPriority = priorityMap.get(right.handle) ?? Number.MAX_SAFE_INTEGER

    if (leftPriority !== rightPriority) {
      return leftPriority - rightPriority
    }

    return left.title.localeCompare(right.title)
  })
})

// Collection laden
async function loadCollection() {
  try {
    isLoading.value = true
    error.value = null
    
    console.log('Loading collection:', slug.value)
    collection.value = await (shopifyStore as any).fetchCollection(slug.value)
    
    if (!collection.value) {
      error.value = 'Collection nicht gefunden'
      return
    }
    
    console.log('Loaded collection:', collection.value)
  } catch (err) {
    console.error('Error loading collection:', err)
    error.value = 'Fehler beim Laden der Collection'
  } finally {
    isLoading.value = false
  }
}

// Produkte der Collection laden
async function loadCollectionProducts() {
  if (!collection.value) return
  
  try {
    isLoadingProducts.value = true
    
    console.log('Loading products for collection:', slug.value)
    products.value = await (shopifyStore as any).fetchProductsByCollection(slug.value, 24)
    
    console.log('Loaded products:', products.value)
  } catch (err) {
    console.error('Error loading collection products:', err)
  } finally {
    isLoadingProducts.value = false
  }
}

// Preis formatieren
function formatPrice(price: number): string {
  if (!price) return '�0,00'
  
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

// SEO: reaktiv wenn collection geladen ist
watch(collection, (c) => {
  if (!c) return

  const siteUrl = 'https://checkout.vitesse-sports.de'
  const url = `${siteUrl}/collections/${c.handle}`
  const seoContent = collectionSeoContent.value
  const title = seoContent?.title ?? c.title
  const description = c.description
    ? c.description.slice(0, 160)
    : `${c.title} – Alle Produkte der Collection bei Vitesse Sports.`

  useSeoMeta({
    title,
    description,
    ogTitle: `${title} | Vitesse Sports`,
    ogDescription: description,
    ogImage: c.image ?? '',
    ogUrl: url,
  })

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Collections', url: `${siteUrl}/collections` },
    { name: c.title, url },
  ])

  useHead({
    script: [
      { type: 'application/ld+json', innerHTML: schemaToString(breadcrumbSchema) },
    ],
  })
}, { immediate: true })

// Beim Mount laden
onMounted(async () => {
  await loadCollection()
  await loadCollectionProducts()
})

// Bei Änderung der Route neu laden
watch(
  () => route.params.slug,
  async () => {
    if (route.params.slug) {
      await loadCollection()
      await loadCollectionProducts()
    }
  }
)
</script>

<style scoped>
.collection-page {
  min-height: 100vh;
  background: #ffffff;
}

.collection-seo-section {
  background: #ffffff;
  padding: 3.5rem 0 1.5rem;
}

.collection-seo-inner {
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 1rem;
}

.collection-seo-title {
  margin: 0 0 1rem;
  max-width: 64rem;
  font-size: clamp(2rem, 3vw, 3.2rem);
  line-height: 1.02;
  letter-spacing: -0.04em;
  color: #17120d;
}

.collection-seo-text {
  margin: 0;
  max-width: 62rem;
  font-size: 1.08rem;
  line-height: 1.75;
  color: #4b5563;
}

.collection-seo-goals-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
  margin-top: 2rem;
}

.collection-seo-goal-card {
  padding: 1.4rem 1.45rem;
  border-radius: 1.15rem;
  background: #ffffff;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
}

.collection-seo-goal-title {
  margin: 0 0 0.7rem;
  font-size: clamp(1.15rem, 1.5vw, 1.45rem);
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: #17120d;
}

.collection-seo-goal-text {
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.65;
  color: #4b5563;
}

.loading, .error, .not-found {
  text-align: center;
  padding: 3rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin: 2rem;
}

.error {
  background-color: #fee;
  color: #c33;
}

.not-found {
  background-color: #f0f8ff;
  color: #666;
}

/* Collection Header */
.collection-header {
  margin-bottom: 3rem;
}

.collection-banner {
  height: 300px;
  overflow: hidden;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.collection-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.collection-info {
  text-align: center;
  padding: 0 2rem;
}

.collection-info h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.collection-info .description {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.product-count {
  color: #888;
  font-size: 0.9rem;
  font-weight: 500;
}

/* Products Section */
.products-section {
  margin-top: clamp(3rem, 7vw, 6rem);
  padding: clamp(2rem, 4vw, 3rem) 2rem 3rem;
  background: #ffffff;
}

.products-section-header {
  max-width: 1500px;
  margin: 0 auto 1.75rem;
}

.products-section-kicker {
  margin: 0;
  font-size: clamp(1.5rem, 2.8vw, 2.5rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.04em;
  background: linear-gradient(90deg, #0f5e9c 0%, #2f76bb 28%, #74baff 72%, #ffbf5a 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.loading-products, .no-products {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.1rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.8rem;
  max-width: 1500px;
  margin: 0 auto;
}

.product-card {
  display: block;
  position: relative;
  background: linear-gradient(180deg, #ffffff 0%, #fbfaf7 100%);
  border: 1px solid rgba(23, 18, 13, 0.06);
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 18px 44px -28px rgba(15, 23, 42, 0.18);
  transition:
    transform 220ms ease,
    box-shadow 220ms ease,
    border-color 220ms ease;
  text-decoration: none;
  color: inherit;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 28px 60px -30px rgba(15, 23, 42, 0.26);
  border-color: rgba(242, 106, 33, 0.18);
}

.product-image {
  height: 22rem;
  position: relative;
  overflow: hidden;
  background: #ffffff;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
  padding: 1.5rem;
  transition: transform 260ms ease;
}

.product-card:hover .product-image img {
  transform: scale(1.04);
}

.no-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
  color: #999;
  background: linear-gradient(135deg, #f5f5f5, #e5e5e5);
}

.sale-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #e74c3c;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.product-info {
  padding: 1.35rem 1.45rem 1.5rem;
}

.product-info h3 {
  margin: 0 0 0.9rem 0;
  font-size: clamp(1.15rem, 1.4vw, 1.45rem);
  font-weight: 700;
  color: #17120d;
  line-height: 1.15;
  letter-spacing: -0.03em;
}

.price {
  margin-bottom: 0.7rem;
}

.original-price {
  text-decoration: line-through;
  color: #999;
  margin-right: 0.5rem;
  font-size: 0.9rem;
}

.current-price {
  font-weight: 700;
  color: #17120d;
  font-size: 1.35rem;
  letter-spacing: -0.03em;
}

.availability {
  font-size: 0.95rem;
}

.in-stock {
  color: #27ae60;
  font-weight: 600;
}

.out-of-stock {
  color: #e74c3c;
  font-weight: 600;
}

@media (max-width: 640px) {
  .collection-seo-section {
    padding: 2.5rem 0 1rem;
  }

  .collection-seo-title {
    font-size: clamp(1.9rem, 8vw, 2.7rem);
  }

  .collection-seo-text {
    font-size: 1rem;
  }

  .collection-seo-goals-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .collection-seo-goal-card {
    padding: 1.15rem 1.1rem;
  }

  .products-section {
    margin-top: 2.5rem;
    padding: 1.5rem 1rem 2rem;
  }

  .products-section-header {
    margin-bottom: 1.25rem;
  }

  .products-section-kicker {
    font-size: clamp(1.4rem, 8vw, 2rem);
  }

  .products-grid {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }

  .product-image {
    height: 18rem;
  }
}
</style>
