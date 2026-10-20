<script setup lang="ts">
import { useShopifyStore } from '~/store/shopifyStore'
import { useShopifyCardStore } from '~/store/shopifyCardStore'

type BlogPost = {
  path: string
  title?: string
  description?: string
  category?: string
  date?: string
  heroImage?: string
}

const config = useRuntimeConfig()
const siteUrl = (config.public.siteUrl as string) || 'https://www.vitesse-sports.de'

const shopifyStore = useShopifyStore()
const shopifyCardStore = useShopifyCardStore()
const { openCart } = useCartSidebar()

const tApex = ref<any>(null)

onMounted(async () => {
  tApex.value = await (shopifyStore as any).fetchProductByHandle('t-apex')
})

function formatProductPrice(price: number) {
  if (!price) return ''
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price)
}

async function buyTApex() {
  if (!tApex.value?.variant_id) return
  await shopifyCardStore.addToCart(tApex.value.variant_id, 1)
  openCart()
}

const { data: posts } = await useAsyncData('blog-index-posts', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .all() as unknown as Promise<BlogPost[]>,
)

const formattedDate = (value?: string) => {
  if (!value) return ''
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(parsed)
}

const isoDate = (value?: string) => {
  if (!value) return undefined
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString()
}

const categoryLabel = (value?: string) => (value || '').trim() || 'Allgemein'

const latestPosts = computed(() => (posts.value || []).slice(0, 4))

const topCategories = computed(() => {
  const counts = new Map<string, number>()
  for (const post of posts.value || []) {
    const key = categoryLabel(post.category)
    counts.set(key, (counts.get(key) || 0) + 1)
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5)
})

useSeoMeta({
  title: 'Blog',
  description: 'Fachbeiträge zu Trainingswissenschaft, Rehabilitation und Leistungsdiagnostik für Studios, Reha-Einrichtungen und Leistungssport.',
  ogTitle: 'Blog | Vitesse Sports',
  ogType: 'website',
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/blog` }],
})
</script>

<template>
  <div class="blog-page">
    <div class="blog-page__inner">
      <header class="blog-page__header">
        <h1 class="blog-page__title">Vitesse Blog</h1>
        <p class="blog-page__lead">
          Fachbeiträge zu Training, Rehabilitation und Leistungsentwicklung.
        </p>
      </header>

      <div class="blog-page__layout">
        <section class="blog-grid" aria-label="Alle Beiträge">
          <NuxtLink
            v-for="post in posts || []"
            :key="post.path"
            :to="post.path"
            :aria-label="post.title"
            class="blog-card"
          >
            <div v-if="post.heroImage" class="blog-card__media">
              <img :src="post.heroImage" :alt="post.title || 'Beitragsbild'" loading="lazy" />
            </div>
            <p class="blog-card__category">{{ categoryLabel(post.category) }}</p>
            <h2 class="blog-card__title">{{ post.title }}</h2>
            <p v-if="post.description" class="blog-card__excerpt">{{ post.description }}</p>
            <time :datetime="isoDate(post.date)" class="blog-card__date">
              {{ formattedDate(post.date) }}
            </time>
          </NuxtLink>

          <p v-if="!(posts && posts.length)" class="blog-page__empty">Noch keine Beiträge.</p>
        </section>

        <aside class="blog-sidebar">
          <div class="blog-sidebar__sticky">
          <div v-if="tApex" class="sidebar-product-card">
            <NuxtLink to="/products/t-apex" class="sidebar-product-card__image-link">
              <img
                :src="tApex.featured_image"
                :alt="tApex.title"
                class="sidebar-product-card__img"
                loading="lazy"
              />
            </NuxtLink>
            <div class="sidebar-product-card__body">
              <p class="sidebar-product-card__title">{{ tApex.title }}</p>
              <p class="sidebar-product-card__price">{{ formatProductPrice(tApex.price) }}</p>
              <div class="sidebar-product-card__actions">
                <NuxtLink to="/products/t-apex" class="sidebar-product-card__btn sidebar-product-card__btn--outline">
                  Mehr erfahren
                </NuxtLink>
                <button class="sidebar-product-card__btn sidebar-product-card__btn--primary" @click="buyTApex">
                  Jetzt kaufen
                </button>
              </div>
            </div>
          </div>

          <div class="blog-sidebar__box">
            <h3 class="blog-sidebar__heading">Neu veröffentlicht</h3>
            <NuxtLink
              v-for="post in latestPosts"
              :key="`latest-${post.path}`"
              :to="post.path"
              class="blog-sidebar__item"
            >
              <span class="blog-sidebar__item-title">{{ post.title }}</span>
              <time :datetime="isoDate(post.date)" class="blog-sidebar__item-date">
                {{ formattedDate(post.date) }}
              </time>
            </NuxtLink>

            <h3 class="blog-sidebar__heading blog-sidebar__heading--spaced">Kategorien</h3>
            <div
              v-for="[name, count] in topCategories"
              :key="`cat-${name}`"
              class="blog-sidebar__category"
            >
              <span>{{ name }}</span>
              <span class="blog-sidebar__count">{{ count }}</span>
            </div>
          </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-page {
  background: var(--color-white);
  color: var(--color-gray-900);
  padding: var(--spacing-3xl) var(--spacing-lg);
}

.blog-page__inner {
  max-width: 1400px;
  margin: 0 auto;
}

.blog-page__header {
  margin-bottom: var(--spacing-2xl);
}

.blog-page__title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-gray-900);
}

.blog-page__lead {
  margin-top: var(--spacing-sm);
  font-size: var(--font-size-lg);
  color: var(--color-gray-700);
}

.blog-page__layout {
  display: grid;
  gap: var(--spacing-2xl);
  grid-template-columns: 1fr;
}

@media (min-width: 1024px) {
  .blog-page__layout {
    grid-template-columns: 3fr 1fr;
  }
}

.blog-grid {
  display: grid;
  gap: var(--spacing-xl);
  grid-template-columns: 1fr;
  align-content: start;
}

@media (min-width: 768px) {
  .blog-grid { grid-template-columns: repeat(2, 1fr); }
}

.blog-card {
  display: block;
  text-decoration: none;
  color: inherit;
}

.blog-card__media {
  overflow: hidden;
  background: var(--color-gray-100);
  margin-bottom: var(--spacing-md);
}

.blog-card__media img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.blog-card:hover .blog-card__media img {
  transform: scale(1.02);
}

.blog-card__category {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-primary);
}

.blog-card__title {
  margin-top: var(--spacing-xs);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  color: var(--color-gray-900);
}

.blog-card:hover .blog-card__title {
  color: var(--color-primary);
}

.blog-card__excerpt {
  margin-top: var(--spacing-sm);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--color-gray-700);
}

.blog-card__date {
  display: block;
  margin-top: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
}

.blog-page__empty {
  color: var(--color-gray-700);
}

.blog-sidebar__box {
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-lg);
  background: var(--color-white);
}

@media (min-width: 1024px) {
  .blog-sidebar__sticky {
    position: sticky;
    top: 140px;
  }
}

.blog-sidebar__heading {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-gray-700);
  margin-bottom: var(--spacing-md);
}

.blog-sidebar__heading--spaced {
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-gray-200);
}

.blog-sidebar__item {
  display: block;
  padding-bottom: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--color-gray-200);
  text-decoration: none;
}

.blog-sidebar__item:last-of-type {
  border-bottom: 0;
  margin-bottom: 0;
}

.blog-sidebar__item-title {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
}

.blog-sidebar__item:hover .blog-sidebar__item-title {
  color: var(--color-primary);
}

.blog-sidebar__item-date {
  display: block;
  margin-top: var(--spacing-xs);
  font-size: var(--font-size-xs);
  color: var(--color-gray-600);
}

.blog-sidebar__category {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
  color: var(--color-gray-700);
  margin-bottom: var(--spacing-sm);
}

.blog-sidebar__count {
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
}

.sidebar-product-card {
  margin-bottom: var(--spacing-lg);
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  background: var(--color-gray-900);
  color: var(--color-white);
}

.sidebar-product-card__image-link {
  display: block;
}

.sidebar-product-card__img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
}

.sidebar-product-card__body {
  padding: var(--spacing-md);
}

.sidebar-product-card__title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  overflow-wrap: break-word;
  word-break: break-word;
}

.sidebar-product-card__price {
  margin-top: var(--spacing-xs);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--color-white);
}

.sidebar-product-card__actions {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
}

.sidebar-product-card__btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: opacity 0.2s ease;
}

.sidebar-product-card__btn:hover {
  opacity: 0.85;
}

.sidebar-product-card__btn--outline {
  background: transparent;
  border: 1px solid var(--color-white);
  color: var(--color-white);
}

.sidebar-product-card__btn--primary {
  background: var(--color-primary);
  color: var(--color-white);
}
</style>
