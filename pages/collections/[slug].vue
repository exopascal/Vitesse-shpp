<template>
  <div class="collection-page">
    <div v-if="isLoading" class="state-message">
      Collection wird geladen...
    </div>

    <div v-else-if="error" class="state-message state-message--error">
      {{ error }}
    </div>

    <div v-else-if="!collection" class="state-message state-message--empty">
      Collection nicht gefunden.
    </div>

    <div v-else>
      <!-- Brand Hero -->
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
        :size-variant="collectionHero.sizeVariant"
        :overlay="collectionHero.overlay ?? true"
      />

      <!-- Fallback Hero (collections without configured content) -->
      <div v-else class="fallback-hero">
        <div
          v-if="collection.image"
          class="fallback-hero__bg"
          :style="{ backgroundImage: `url('${collection.image}')` }"
        />
        <div class="fallback-hero__overlay" />
        <div class="fallback-hero__content">
          <p class="fallback-hero__kicker">Kollektion</p>
          <h1 class="fallback-hero__title">{{ collection.title }}</h1>
        </div>
      </div>

      <!-- Breadcrumb / Toolbar -->
      <nav class="collection-toolbar" aria-label="Navigation">
        <div class="collection-toolbar__inner">
          <ol class="breadcrumb">
            <li class="breadcrumb__item">
              <NuxtLink to="/" class="breadcrumb__link">Home</NuxtLink>
            </li>
            <li class="breadcrumb__sep" aria-hidden="true">/</li>
            <li class="breadcrumb__item">
              <NuxtLink to="/collections" class="breadcrumb__link">Kategorien</NuxtLink>
            </li>
            <li class="breadcrumb__sep" aria-hidden="true">/</li>
            <li class="breadcrumb__item breadcrumb__item--current" aria-current="page">
              {{ collection.title }}
            </li>
          </ol>

          <div class="toolbar-meta">
            <span v-if="!isLoadingProducts" class="toolbar-meta__count">
              {{ displayedProducts.length }}&thinsp;Produkte
            </span>
          </div>
        </div>
      </nav>

      <!-- Brand Section (immer sichtbar) -->
      <section v-if="brandContent" class="seo-section">
        <div class="seo-section__inner">
          <component
            :is="brandContent.titleTag ?? 'h2'"
            class="seo-section__title"
            :class="{ 'seo-section__title--gradient': brandContent.titleTag === 'h1' }"
            :style="brandContent.titleTag === 'h1' ? { backgroundImage: brandGradient } : {}"
          >{{ brandContent.title }}</component>
          <p v-if="brandContent.subtitle" class="seo-section__subtitle">{{ brandContent.subtitle }}</p>
          <p class="seo-section__body">{{ brandContent.body }}</p>
        </div>
      </section>

      <!-- Hub: One section per sub-category with product grid -->
      <template v-if="subCollections.length">
        <section
          v-for="sub in subCollections"
          :key="sub.handle"
          class="hub-section"
        >
          <div class="hub-section__inner">
            <div class="hub-section__header">
              <div class="hub-section__heading-group">
                <h2 class="hub-section__title" :style="{ backgroundImage: brandGradient }">{{ sub.title }}</h2>
                <p class="hub-section__desc">{{ sub.description }}</p>
              </div>
              <NuxtLink :to="`/collections/${sub.handle}`" class="hub-section__all-link">
                Alle {{ sub.title }} ansehen →
              </NuxtLink>
            </div>

            <div v-if="hubProducts?.[sub.handle]?.length" class="products-grid hub-section__grid">
              <NuxtLink
                v-for="product in hubProducts[sub.handle]"
                :key="product.id"
                :to="`/products/${product.handle}`"
                class="product-card"
              >
                <div class="product-card__image">
                  <img v-if="product.featured_image" :src="product.featured_image" :alt="product.title" />
                  <div v-else class="product-card__image-placeholder">{{ product.title.charAt(0) }}</div>
                  <span v-if="product.on_sale" class="sale-badge">Sale</span>
                </div>
                <div class="product-card__info">
                  <h3 class="product-card__name">{{ product.title }}</h3>
                  <div class="product-card__price">
                    <span v-if="product.on_sale && product.compare_at_price" class="price-original">{{ formatPrice(product.compare_at_price) }}</span>
                    <span class="price-current">{{ formatPrice(product.price) }}</span>
                  </div>
                  <TaxNote />
                  <span class="product-card__stock" :class="product.available ? 'product-card__stock--in' : 'product-card__stock--out'">
                    {{ product.available ? 'Verfügbar' : 'Ausverkauft' }}
                  </span>
                </div>
              </NuxtLink>
            </div>
            <div v-else class="state-message">Produkte werden geladen…</div>
          </div>
        </section>
      </template>

      <!-- Products Grid -->
      <section v-else id="collection-products" class="products-section">
        <div class="products-section__inner">
          <header class="products-section__header">
            <p
              class="products-section__kicker"
              :style="{ backgroundImage: brandGradient }"
            >{{ productsSectionTitle }}</p>
          </header>

          <div v-if="isLoadingProducts" class="state-message">
            Produkte werden geladen...
          </div>

          <div v-else-if="products.length === 0" class="state-message">
            Keine Produkte in dieser Collection gefunden.
          </div>

          <div v-else class="products-grid">
            <NuxtLink
              v-for="product in displayedProducts"
              :key="product.id"
              :to="`/products/${product.handle}`"
              class="product-card"
            >
              <div class="product-card__image">
                <img
                  v-if="product.featured_image"
                  :src="product.featured_image"
                  :alt="product.title"
                />
                <div v-else class="product-card__image-placeholder">
                  {{ product.title.charAt(0) }}
                </div>

                <span v-if="product.on_sale" class="sale-badge">Sale</span>
              </div>

              <div class="product-card__info">
                <h3 class="product-card__name">{{ product.title }}</h3>
                <div class="product-card__price">
                  <span
                    v-if="product.on_sale && product.compare_at_price"
                    class="price-original"
                  >
                    {{ formatPrice(product.compare_at_price) }}
                  </span>
                  <span class="price-current">
                    {{ formatPrice(product.price) }}
                  </span>
                </div>
                <TaxNote />
                <span
                  class="product-card__stock"
                  :class="product.available ? 'product-card__stock--in' : 'product-card__stock--out'"
                >
                  {{ product.available ? 'Verfügbar' : 'Ausverkauft' }}
                </span>
              </div>
            </NuxtLink>
          </div>

          <div v-if="hasNextPage" class="load-more">
            <button class="load-more__btn" :disabled="isLoadingMore" @click="loadMore">
              <span v-if="isLoadingMore">Wird geladen…</span>
              <span v-else>Mehr Produkte laden</span>
            </button>
          </div>
        </div>
      </section>
      <!-- Vorteile Section -->
      <section v-if="brandContent?.goals?.length" class="vorteile-section">
        <div class="vorteile-section__inner">
          <h2
            class="vorteile-section__title"
            :style="{ backgroundImage: brandGradient }"
          >
            {{ brandContent.goalsTitle ?? `Die Vorteile von ${collection.title}` }}
          </h2>
          <div class="seo-goals">
            <article
              v-for="goal in brandContent.goals"
              :key="goal.title"
              class="seo-goal-card"
            >
              <h3 class="seo-goal-card__title">{{ goal.title }}</h3>
              <p class="seo-goal-card__text">{{ goal.description }}</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useShopifyStore } from '../../store/shopifyStore'
import { getCollectionHeroContent, getCollectionSeoContent } from '~/utils/collectionDetailContent'
import { getCollectionBrandGradient, getCollectionSubCollections } from '~/utils/collectionPageConfig'
import { createBreadcrumbSchema, schemaToString } from '~/utils/schemas/productSchema'

const route = useRoute()
const shopifyStore = useShopifyStore()
const slug = computed(() => route.params.slug as string)

const { data: collection, pending: isLoading, error: collectionError } = await useAsyncData(
  () => `collection-${slug.value}`,
  () => shopifyStore.fetchCollection(slug.value),
  { watch: [slug] }
)

const { data: initialPageData, pending: isLoadingProducts } = await useAsyncData(
  () => `collection-products-${slug.value}`,
  () => shopifyStore.fetchCollectionPage(slug.value, 12),
  { watch: [slug] }
)

const { data: hubProducts } = await useAsyncData(
  () => `collection-hub-${slug.value}`,
  async () => {
    const subs = getCollectionSubCollections(slug.value)
    if (!subs.length) return {} as Record<string, import('~/types/domain/shopify').ShopifyProduct[]>
    const entries = await Promise.all(
      subs.map(async (sub) => {
        const products = await shopifyStore.fetchProductsByCollection(sub.handle, 6)
        return [sub.handle, products] as const
      })
    )
    return Object.fromEntries(entries) as Record<string, import('~/types/domain/shopify').ShopifyProduct[]>
  },
  { watch: [slug] }
)

const extraProducts = ref<import('~/types/domain/shopify').ShopifyProduct[]>([])
const endCursor = ref<string | null>(null)
const hasNextPage = ref(false)
const isLoadingMore = ref(false)

watch(initialPageData, (data) => {
  extraProducts.value = []
  endCursor.value = data?.endCursor ?? null
  hasNextPage.value = data?.hasNextPage ?? false
}, { immediate: true })

async function loadMore() {
  if (!hasNextPage.value || isLoadingMore.value) return
  isLoadingMore.value = true
  try {
    const result = await shopifyStore.fetchCollectionPage(slug.value, 12, endCursor.value ?? undefined)
    extraProducts.value.push(...result.products)
    endCursor.value = result.endCursor
    hasNextPage.value = result.hasNextPage
  } finally {
    isLoadingMore.value = false
  }
}

const error = computed(() => collectionError.value ? 'Fehler beim Laden der Collection' : null)
const products = computed(() => [
  ...(initialPageData.value?.products ?? []),
  ...extraProducts.value,
])

const collectionHero = computed(() => getCollectionHeroContent(collection.value, slug.value))
const brandGradient = computed(() => getCollectionBrandGradient(slug.value))
const collectionSeoContent = computed(() => getCollectionSeoContent(collection.value, slug.value))
const subCollections = computed(() => getCollectionSubCollections(slug.value))

// Immer befüllt: SEO-Content wenn vorhanden, sonst Shopify-Collection-Daten als Fallback
const brandContent = computed(() => {
  if (collectionSeoContent.value) return collectionSeoContent.value
  const c = collection.value
  if (!c?.description) return null
  return { title: c.title, body: c.description, goals: undefined, productsSectionTitle: undefined }
})

const productsSectionTitle = computed(() => {
  if (subCollections.value.length) {
    return `${collection.value?.title || 'Tunturi'} — Gerätekategorien.`
  }
  if (collectionSeoContent.value?.productsSectionTitle) {
    return collectionSeoContent.value.productsSectionTitle
  }
  return `Unsere Produkte für ${collection.value?.title || 'diese Collection'}.`
})

const collectionPriorities: Record<string, string[]> = {
  sprinttraining: ['t-apex', 'torque-tank-mx', 'exopek-pro'],
}

const displayedProducts = computed(() => {
  const prioritizedHandles = collectionPriorities[slug.value]
  if (!prioritizedHandles) return products.value

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

function formatPrice(price: number): string {
  if (!price) return '€0,00'
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price)
}

watch(collection, (c) => {
  if (!c) return

  const siteUrl = useRuntimeConfig().public.siteUrl as string
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
</script>

<style scoped>
/* ─── Page Shell ─────────────────────────────────────────────────────────── */
.collection-page {
  min-height: 100vh;
  background: #ffffff;
}

/* ─── State Messages ─────────────────────────────────────────────────────── */
.state-message {
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
  font-size: 1rem;
}

.state-message--error { color: #b91c1c; }
.state-message--empty { color: #9ca3af; }

/* ─── Fallback Hero (immer dunkel – Bild-Overlay) ────────────────────────── */
.fallback-hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: min(72vh, 46rem);
  width: 100%;
  overflow: hidden;
  text-align: center;
}

.fallback-hero__bg {
  position: absolute;
  inset: 0;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.fallback-hero__overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(6, 16, 29, 0.35), rgba(6, 16, 29, 0.65)),
    linear-gradient(120deg, rgba(10, 86, 146, 0.25), rgba(255, 191, 90, 0.15));
  pointer-events: none;
}

.fallback-hero__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  padding: 3rem 1.5rem;
  max-width: 56rem;
}

.fallback-hero__kicker {
  margin: 0;
  font-size: clamp(0.7rem, 1.2vw, 0.85rem);
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}

.fallback-hero__title {
  margin: 0;
  font-size: clamp(2.6rem, 6vw, 6.2rem);
  font-weight: 800;
  line-height: 0.9;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  color: #ffffff;
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.28);
}

.fallback-hero__text {
  margin: 0;
  max-width: 40rem;
  font-size: clamp(0.98rem, 1.55vw, 1.25rem);
  line-height: 1.5;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.88);
  text-shadow: 0 4px 18px rgba(0, 0, 0, 0.22);
}

/* ─── Breadcrumb Toolbar ─────────────────────────────────────────────────── */
.collection-toolbar {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  border-bottom: 1px solid #e5e7eb;
}

.collection-toolbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1500px;
  margin: 0 auto;
  padding: 0.85rem 2rem;
  gap: 1rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}

.breadcrumb__item {
  font-size: 0.875rem;
  color: #6b7280;
  white-space: nowrap;
}

.breadcrumb__item--current {
  color: #0f172a;
  font-weight: 600;
}

.breadcrumb__link {
  color: #6b7280;
  text-decoration: none;
  transition: color 150ms ease;
}

.breadcrumb__link:hover {
  color: #0f172a;
}

.breadcrumb__sep {
  color: #d1d5db;
  font-size: 0.875rem;
  user-select: none;
}

.toolbar-meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-shrink: 0;
}

.toolbar-meta__count {
  font-size: 0.875rem;
  color: #6b7280;
  white-space: nowrap;
}

/* ─── SEO Section ────────────────────────────────────────────────────────── */
.seo-section {
  background: #f7fbf8;
  padding: 3.5rem 0 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.seo-section__inner {
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 2rem;
}

.seo-section__title {
  margin: 0 0 1rem;
  max-width: 64rem;
  font-size: clamp(2rem, 3vw, 3.2rem);
  line-height: 1.02;
  letter-spacing: -0.04em;
  color: #0f172a;
}

.seo-section__title--gradient {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.seo-section__subtitle {
  margin: 0.5rem 0 1.25rem;
  max-width: 52rem;
  font-size: clamp(1.1rem, 1.8vw, 1.5rem);
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.02em;
  color: #374151;
}

.seo-section__body {
  margin: 0;
  max-width: 62rem;
  font-size: 1.08rem;
  line-height: 1.75;
  color: #4b5563;
  white-space: pre-line;
}

.seo-goals {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.25rem;
  margin-top: 2rem;
}

.seo-goal-card {
  padding: 1.4rem 1.45rem;
  border-radius: 1.15rem;
  background: #ffffff;
  border: 1px solid rgba(23, 18, 13, 0.06);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
}

.seo-goal-card__title {
  margin: 0 0 0.7rem;
  font-size: clamp(1.1rem, 1.4vw, 1.35rem);
  line-height: 1.2;
  letter-spacing: -0.03em;
  color: #0f172a;
}

.seo-goal-card__text {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.65;
  color: #4b5563;
}

/* ─── Products Section ───────────────────────────────────────────────────── */
.products-section {
  padding: clamp(3rem, 6vw, 5rem) 0 4rem;
  background: #ffffff;
}

.products-section__inner {
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 2rem;
}

.products-section__header {
  margin-bottom: 2rem;
}

.products-section__kicker {
  margin: 0;
  font-size: clamp(1.5rem, 2.8vw, 2.5rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.04em;
  /* backgroundImage is set inline via brandGradient */
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

/* ─── Products Grid ──────────────────────────────────────────────────────── */
.products-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.8rem;
}

/* ─── Product Card ───────────────────────────────────────────────────────── */
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

.product-card__image {
  height: 22rem;
  position: relative;
  overflow: hidden;
  background: #ffffff;
}

.product-card__image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  padding: 1.5rem;
  transition: transform 260ms ease;
}

.product-card:hover .product-card__image img {
  transform: scale(1.04);
}

.product-card__image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
  color: #9ca3af;
  background: linear-gradient(135deg, #f5f5f5, #e5e5e5);
}

.sale-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #e74c3c;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.product-card__info {
  padding: 1.35rem 1.45rem 1.5rem;
}

.product-card__name {
  margin: 0 0 0.9rem;
  font-size: clamp(1.1rem, 1.4vw, 1.4rem);
  font-weight: 700;
  color: #17120d;
  line-height: 1.15;
  letter-spacing: -0.03em;
}

.product-card__price {
  margin-bottom: 0.5rem;
}

.price-original {
  text-decoration: line-through;
  color: #9ca3af;
  margin-right: 0.5rem;
  font-size: 0.9rem;
}

.price-current {
  font-weight: 700;
  color: #17120d;
  font-size: 1.35rem;
  letter-spacing: -0.03em;
}

.product-card__stock {
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 0.88rem;
  font-weight: 600;
}

.product-card__stock--in  { color: #27ae60; }
.product-card__stock--out { color: #e74c3c; }

/* ─── Load More ──────────────────────────────────────────────────────────── */
.load-more {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

.load-more__btn {
  padding: 0.85rem 2.5rem;
  border: 2px solid #0f5e9c;
  border-radius: 999px;
  background: transparent;
  color: #0f5e9c;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 200ms ease,
    color 200ms ease;
}

.load-more__btn:hover:not(:disabled) {
  background: #0f5e9c;
  color: #ffffff;
}

.load-more__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ─── Hub Sections (one per sub-category) ────────────────────────────────── */
.hub-section {
  padding: clamp(2.5rem, 5vw, 4rem) 0;
  border-bottom: 1px solid #f1f5f9;
}

.hub-section:last-of-type {
  border-bottom: none;
}

.hub-section__inner {
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hub-section__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 1.75rem;
  flex-wrap: wrap;
}

.hub-section__heading-group {
  flex: 1;
  min-width: 0;
}

.hub-section__title {
  margin: 0 0 0.35rem;
  font-size: clamp(1.6rem, 2.8vw, 2.6rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.05;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.hub-section__desc {
  margin: 0;
  font-size: 0.92rem;
  color: #6b7280;
  line-height: 1.55;
}

.hub-section__all-link {
  flex-shrink: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: #52a730;
  text-decoration: none;
  white-space: nowrap;
  transition: opacity 150ms ease;
}

.hub-section__all-link:hover {
  opacity: 0.75;
}

.hub-section__grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

/* ─── Vorteile Section ───────────────────────────────────────────────────── */
.vorteile-section {
  padding: clamp(3rem, 6vw, 5rem) 0 4rem;
  background: #f7fbf8;
  border-top: 1px solid #e5e7eb;
}

.vorteile-section__inner {
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 2rem;
}

.vorteile-section__title {
  margin: 0 0 2rem;
  font-size: clamp(1.5rem, 2.4vw, 2.2rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

/* ─── Responsive ─────────────────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hub-section__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .fallback-hero {
    min-height: 100svh;
  }

  .fallback-hero__title {
    font-size: clamp(2rem, 10vw, 4rem);
    overflow-wrap: break-word;
  }

  .collection-toolbar__inner {
    padding: 0.75rem 1rem;
  }

  .seo-section {
    padding: 2.5rem 0 1rem;
  }

  .seo-section__inner {
    padding: 0 1rem;
  }

  .seo-section__title {
    font-size: clamp(1.6rem, 7vw, 2.4rem);
  }

  .seo-goals {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .products-section {
    padding: 2.5rem 0 3rem;
  }

  .products-section__inner {
    padding: 0 1rem;
  }

  .products-section__kicker {
    font-size: clamp(1.4rem, 8vw, 2rem);
  }

  .products-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
  }

  .hub-section__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hub-section__header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .product-card__image {
    height: 12rem;
  }

  .product-card__info {
    padding: 0.9rem 1rem 1rem;
  }

  .product-card__name {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .price-current {
    font-size: 1.05rem;
  }
}
</style>
