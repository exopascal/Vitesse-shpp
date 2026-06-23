<template>
  <main class="shop-archive">
    <HeroSection
      v-if="isSprintCollectionArchive"
      kicker="Overspeed Training"
      title="Overspeed Training"
      text="Explosive Starts, beschleunigte Schritte und messbare Leistungssteigerung."
      background-video="/T-Apex-1080motion-seilzugtraining.mov"
      logo-image="/t-apex-logo.png.avif"
      logo-alt="T-APEX"
      button-text="T-Apex kaufen"
      href="/products/t-apex"
      button-variant="tapex"
    />

    <section v-else class="archive-hero">
      <p class="archive-kicker">Shop Archive</p>
      <h1>Alle Produkte</h1>
      <p class="archive-intro">
        Das gesamte Sortiment auf einen Blick. Filtere nach Kategorie, Verfügbarkeit
        oder Suchbegriff und gehe direkt in die Produktdetails.
      </p>
    </section>

    <section id="products-archive-controls" class="archive-controls">
      <div class="archive-toolbar">
        <label class="archive-search">
          <span class="archive-label">Suche</span>
          <input
            v-model="searchInput"
            type="search"
            placeholder="Produkt suchen"
            @keydown.enter="applyFilters"
          />
        </label>

        <label class="archive-select">
          <span class="archive-label">Sortierung</span>
          <select v-model="selectedSort" @change="applyFilters">
            <option value="created-desc">Neueste zuerst</option>
            <option value="price-asc">Preis aufsteigend</option>
            <option value="price-desc">Preis absteigend</option>
            <option value="title-asc">Name A-Z</option>
            <option value="title-desc">Name Z-A</option>
          </select>
        </label>

        <label class="archive-checkbox">
          <input v-model="onlyAvailable" type="checkbox" @change="applyFilters" />
          <span>Nur verfuegbare Produkte</span>
        </label>

        <div class="archive-actions">
          <GradientButton size="sm" @click="applyFilters">
            Filter anwenden
          </GradientButton>
          <button class="archive-reset" type="button" @click="resetFilters">
            Zuruecksetzen
          </button>
        </div>
      </div>

      <div v-if="collections.length" class="archive-collections">
        <button
          type="button"
          class="archive-chip"
          :class="{ 'archive-chip-active': !selectedCollection }"
          @click="setCollection('')"
        >
          Alle
        </button>
        <button
          v-for="collection in collections"
          :key="collection.handle"
          type="button"
          class="archive-chip"
          :class="{ 'archive-chip-active': selectedCollection === collection.handle }"
          @click="setCollection(collection.handle)"
        >
          {{ collection.title }}
        </button>
      </div>

      <div class="archive-meta">
        <p>{{ products.length }} Produkte</p>
      </div>
    </section>

    <CollectionGridSection
      v-if="isSprintCollectionArchive && sprintFeatureCards.length"
      :cards="sprintFeatureCards"
    />

    <section class="archive-results">
      <div v-if="pending" class="archive-state">
        Produkte werden geladen...
      </div>

      <div v-else-if="loadError" class="archive-state archive-state-error">
        {{ loadError }}
      </div>

      <div v-else-if="products.length === 0" class="archive-state">
        Keine Produkte fuer diese Filter gefunden.
      </div>

      <div v-else class="archive-grid">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useShopifyStore } from '~/store/shopifyStore'

useSeoMeta({
  title: 'Alle Produkte',
  description: 'Das gesamte Vitesse Sports Sortiment: T-APEX, Torque Tank MX, Exopek Pro und mehr. Premium Trainingsgeräte für Athleten auf höchstem Niveau.',
  ogTitle: 'Alle Produkte | Vitesse Sports',
  ogDescription: 'Das gesamte Sortiment an Premium Trainingsgeräten: Sprinttechnik, Widerstandstraining, Overspeed Training.',
})

const route = useRoute()
const router = useRouter()
const shopifyStore = useShopifyStore()

const searchInput = ref(typeof route.query.q === 'string' ? route.query.q : '')
const selectedCollection = ref(typeof route.query.collection === 'string' ? route.query.collection : '')
const selectedSort = ref(
  typeof route.query.sortBy === 'string' ? route.query.sortBy : 'created-desc'
)
const onlyAvailable = ref(route.query.available === 'true')

const queryState = computed(() => ({
  q: typeof route.query.q === 'string' ? route.query.q : '',
  collection: typeof route.query.collection === 'string' ? route.query.collection : '',
  sortBy: typeof route.query.sortBy === 'string' ? route.query.sortBy : 'created-desc',
  available: route.query.available === 'true',
}))
const isSprintCollectionArchive = computed(() => queryState.value.collection === 'sprinttraining')

const { data, pending, error } = await useAsyncData(
  () => `shop-archive-${JSON.stringify(queryState.value)}`,
  async () => {
    const [collections, fetchedProducts] = await Promise.all([
      shopifyStore.fetchAllCollections(),
      shopifyStore.fetchProducts({
        sortBy: queryState.value.sortBy as
          | 'price-asc'
          | 'price-desc'
          | 'title-asc'
          | 'title-desc'
          | 'created-desc'
          | 'created-asc',
        filterQuery: queryState.value.q,
        available: queryState.value.available ? true : undefined,
        limit: 48,
      }),
    ])

    const products = queryState.value.collection
      ? fetchedProducts.filter((product) =>
          product.collections?.includes(queryState.value.collection)
        )
      : fetchedProducts

    return {
      collections,
      products,
    }
  },
  { watch: [queryState] }
)

const collections = computed(() => data.value?.collections ?? [])
const products = computed(() => data.value?.products ?? [])
const loadError = computed(() => (error.value ? 'Die Produkte konnten nicht geladen werden.' : ''))
const sprintFeatureCards = computed(() => {
  if (!isSprintCollectionArchive.value) {
    return []
  }

  const featuredProducts = [
    products.value.find((product) => product.title?.toLowerCase().includes('t-apex')),
    products.value.find((product) => product.title?.toLowerCase().includes('torque')),
  ].filter(Boolean)

  return featuredProducts.map((product) => ({
    backgroundImage: product.featured_image || '',
    title: product.title,
    meta: `${formatPrice(product.price)} zzgl. 19% MwSt.`,
    text: product.description?.trim() || 'Direkt aus dem Shopify-Katalog geladen.',
    to: `/products/${product.handle}`,
    buttonVariant: product.title?.toLowerCase().includes('torque') ? 'torque' : 'tapex',
    buttonText: 'Zum Produkt',
    logoImage: product.title?.toLowerCase().includes('torque')
      ? '/Torque_USA_black-orange_2000x.png.webp'
      : '/t-apex-logo.png.avif',
    logoAlt: product.title
  }))
})

watch(queryState, (nextState) => {
  searchInput.value = nextState.q
  selectedCollection.value = nextState.collection
  selectedSort.value = nextState.sortBy
  onlyAvailable.value = nextState.available
})

function applyFilters() {
  const query: Record<string, string> = {}

  if (searchInput.value.trim()) {
    query.q = searchInput.value.trim()
  }

  if (selectedCollection.value) {
    query.collection = selectedCollection.value
  }

  if (selectedSort.value && selectedSort.value !== 'created-desc') {
    query.sortBy = selectedSort.value
  }

  if (onlyAvailable.value) {
    query.available = 'true'
  }

  router.push({ path: '/products', query })
}

function setCollection(collectionHandle: string) {
  selectedCollection.value = collectionHandle
  applyFilters()
}

function resetFilters() {
  searchInput.value = ''
  selectedCollection.value = ''
  selectedSort.value = 'created-desc'
  onlyAvailable.value = false
  router.push({ path: '/products', query: {} })
}

function formatPrice(price: number) {
  if (!price) {
    return ''
  }

  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}
</script>

<style scoped>
.shop-archive {
  min-height: 100vh;
  padding: 3rem 0 4rem;
  background:
    radial-gradient(circle at top left, rgba(102, 179, 243, 0.12), transparent 24rem),
    linear-gradient(180deg, #f7fbf8 0%, #ffffff 100%);
}

.archive-hero,
.archive-controls,
.archive-results {
  max-width: 76rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.archive-hero {
  margin-bottom: 2rem;
}

.archive-kicker {
  margin: 0 0 0.75rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #15803d;
}

.archive-hero h1 {
  margin: 0;
  font-size: clamp(2.6rem, 5vw, 4.5rem);
  line-height: 0.95;
  color: #0f172a;
}

.archive-intro {
  max-width: 44rem;
  margin: 1rem 0 0;
  font-size: 1.05rem;
  line-height: 1.6;
  color: #4b5563;
}

.archive-controls {
  margin-bottom: 2rem;
}

.archive-toolbar {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(11rem, 0.9fr) auto auto;
  gap: 1rem;
  align-items: end;
  padding: 1.25rem;
  border: 1px solid #e5e7eb;
  border-radius: 1.25rem;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(12px);
}

.archive-label {
  display: block;
  margin-bottom: 0.45rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #475569;
}

.archive-search input,
.archive-select select {
  width: 100%;
  min-height: 3rem;
  padding: 0.75rem 0.9rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.9rem;
  background: white;
  font: inherit;
  color: #0f172a;
}

.archive-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  min-height: 3rem;
  padding-bottom: 0.2rem;
  color: #334155;
}

.archive-actions {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.archive-reset {
  min-height: 3rem;
  padding: 0 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.9rem;
  background: white;
  color: #334155;
  font: inherit;
  cursor: pointer;
}

.archive-meta {
  margin-top: 0.9rem;
  color: #64748b;
}

.archive-collections {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.archive-chip {
  padding: 0.7rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 999px;
  background: white;
  color: #334155;
  font: inherit;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.archive-chip:hover {
  border-color: #0f5e9c;
  color: #0f5e9c;
}

.archive-chip-active {
  border-color: transparent;
  background: linear-gradient(120deg, #0f5e9c 0%, #66b3f3 56%, #ffbf5a 100%);
  color: white;
  box-shadow: 0 16px 30px -20px rgba(5, 54, 97, 0.28);
}

.archive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1.25rem;
}

.archive-state {
  padding: 1.25rem 1.5rem;
  border: 1px solid #d1d5db;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.9);
  color: #1f2937;
}

.archive-state-error {
  border-color: #fecaca;
  background: #fff1f2;
  color: #b91c1c;
}

@media (max-width: 960px) {
  .archive-toolbar {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .archive-actions {
    grid-column: 1 / -1;
  }
}

@media (max-width: 640px) {
  .shop-archive {
    padding-top: 2rem;
  }

  .archive-hero,
  .archive-controls,
  .archive-results {
    padding: 0 1rem;
  }

  .archive-toolbar {
    grid-template-columns: 1fr;
  }

  .archive-actions {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }

  .archive-reset {
    width: 100%;
  }
}
</style>
