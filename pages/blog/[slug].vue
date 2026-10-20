<script setup lang="ts">
import { useShopifyStore } from '~/store/shopifyStore'
import { useShopifyCardStore } from '~/store/shopifyCardStore'

const config = useRuntimeConfig()
const siteUrl = (config.public.siteUrl as string) || 'https://www.vitesse-sports.de'
const PUBLISHER_NAME = 'Vitesse Sports'

const route = useRoute()
const slug = route.params.slug as string

const { data: post } = await useAsyncData(`blog-${slug}`, () =>
  queryCollection('blog').path(`/blog/${slug}`).first(),
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Beitrag nicht gefunden', fatal: true })
}

const { data: relatedPosts } = await useAsyncData(`blog-related-${slug}`, async () => {
  const all = await queryCollection('blog').order('date', 'DESC').all()
  return all.filter((entry) => entry.path !== `/blog/${slug}`).slice(0, 4)
})

const canonical = `${siteUrl}/blog/${slug}`

const publishedDate = computed(() => {
  if (!post.value?.date) return null
  const date = new Date(post.value.date)
  if (Number.isNaN(date.getTime())) return post.value.date
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
})

const publishedDateISO = computed(() => {
  if (!post.value?.date) return undefined
  const date = new Date(post.value.date)
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
})

const heroImage = computed(() => post.value?.heroImage as string | undefined)
const heroImageAlt = computed(
  () => (post.value?.heroImageAlt as string) || (post.value?.title as string) || 'Beitragsbild',
)
const subhead = computed(() => post.value?.subhead as string | undefined)
const headerHighlight = computed(() => post.value?.headerHighlight as string | undefined)

const tocLinks = computed(() => {
  const links = (post.value?.body?.toc?.links || []) as Array<{ id: string; text: string }>
  return links
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  headline: post.value.title,
  description: post.value.description,
  datePublished: post.value.date,
  dateModified: post.value.date,
  author: { '@type': 'Organization', name: PUBLISHER_NAME },
  publisher: { '@type': 'Organization', name: PUBLISHER_NAME },
  articleSection: post.value.category,
  inLanguage: 'de-DE',
}

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

useSeoMeta({
  title: post.value.title,
  description: post.value.description,
  ogTitle: post.value.title,
  ogDescription: post.value.description,
  ogType: 'article',
})

useHead({
  link: [{ rel: 'canonical', href: canonical }],
  script: [
    {
      key: 'ldjson-blog',
      type: 'application/ld+json',
      innerHTML: JSON.stringify(jsonLd),
    },
  ],
})
</script>

<template>
  <div class="blog-article">
    <article class="blog-article__inner">
      <nav class="blog-article__breadcrumb" aria-label="Breadcrumb">
        <NuxtLink to="/blog">Blog</NuxtLink>
        <span aria-hidden="true">›</span>
        <span class="blog-article__breadcrumb-current">{{ post?.title }}</span>
      </nav>

      <header class="blog-article__header">
        <p v-if="subhead" class="blog-article__subhead">{{ subhead }}</p>
        <h1 class="blog-article__title">{{ post?.title }}</h1>
        <p v-if="post?.description" class="blog-article__description">{{ post.description }}</p>
        <p v-if="headerHighlight" class="blog-article__highlight">
          <strong>{{ headerHighlight }}</strong>
        </p>
        <div class="blog-article__meta">
          <span class="blog-article__author">{{ PUBLISHER_NAME }}</span>
          <time v-if="publishedDate" :datetime="publishedDateISO">
            Veröffentlicht am {{ publishedDate }}
          </time>
        </div>
      </header>

      <figure v-if="heroImage" class="blog-article__hero">
        <img :src="heroImage" :alt="heroImageAlt" loading="lazy" />
      </figure>

      <section v-if="tocLinks.length" class="blog-article__toc" aria-label="Kapitelübersicht">
        <h2>In diesem Artikel</h2>
        <ul>
          <li v-for="link in tocLinks" :key="link.id">
            <a :href="`#${link.id}`">{{ link.text }}</a>
          </li>
        </ul>
      </section>

      <div class="blog-article__layout">
        <ContentRenderer v-if="post" :value="post" class="blog-content" />

        <aside class="blog-article__related">
          <div class="blog-article__related-sticky">
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

          <div class="blog-article__related-box">
            <p class="blog-article__related-heading">Weitere Beiträge</p>
            <NuxtLink
              v-for="entry in relatedPosts"
              :key="entry.path"
              :to="entry.path"
              class="blog-article__related-item"
            >
              {{ entry.title }}
            </NuxtLink>
          </div>
          </div>
        </aside>
      </div>
    </article>
  </div>
</template>

<style scoped>
.blog-article {
  background: var(--color-white);
  color: var(--color-gray-900);
  padding: var(--spacing-3xl) var(--spacing-lg);
}

.blog-article__inner {
  max-width: 1100px;
  margin: 0 auto;
}

.blog-article__breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
}

.blog-article__breadcrumb a {
  color: inherit;
  text-decoration: none;
}

.blog-article__breadcrumb a:hover {
  color: var(--color-primary);
}

.blog-article__breadcrumb-current {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--color-gray-800);
}

.blog-article__header {
  margin-top: var(--spacing-lg);
  padding-bottom: var(--spacing-xl);
  border-bottom: 1px solid var(--color-gray-200);
}

.blog-article__subhead {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-gray-600);
}

.blog-article__title {
  margin-top: var(--spacing-sm);
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-gray-900);
}

.blog-article__description {
  margin-top: var(--spacing-md);
  max-width: 48rem;
  font-size: var(--font-size-lg);
  color: var(--color-gray-700);
}

.blog-article__highlight {
  margin-top: var(--spacing-md);
  max-width: 48rem;
  font-size: var(--font-size-lg);
}

.blog-article__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
}

.blog-article__author {
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-800);
}

.blog-article__hero {
  margin-top: var(--spacing-xl);
  overflow: hidden;
  border-radius: var(--border-radius-xl);
  border: 1px solid var(--color-gray-200);
  background: var(--color-gray-100);
}

.blog-article__hero img {
  display: block;
  width: 100%;
  max-height: 540px;
  object-fit: cover;
}

.blog-article__toc {
  margin-top: var(--spacing-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius-xl);
  background: var(--color-gray-50);
}

.blog-article__toc h2 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
}

.blog-article__toc ul {
  margin-top: var(--spacing-md);
  display: grid;
  gap: var(--spacing-sm);
  list-style: none;
  padding: 0;
}

.blog-article__toc a {
  color: var(--color-gray-700);
  text-underline-offset: 4px;
}

.blog-article__toc a:hover {
  color: var(--color-gray-900);
  text-decoration: underline;
}

.blog-article__layout {
  display: grid;
  gap: var(--spacing-2xl);
  margin-top: var(--spacing-2xl);
  grid-template-columns: 1fr;
}

@media (min-width: 1024px) {
  .blog-article__layout {
    grid-template-columns: 3fr 2fr;
  }
}

.blog-article__related-box {
  border-top: 1px solid var(--color-gray-300);
}

@media (min-width: 1024px) {
  .blog-article__related-sticky {
    position: sticky;
    top: 140px;
  }
}

.blog-article__related-heading {
  padding: var(--spacing-md) 0;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-gray-700);
}

.blog-article__related-item {
  display: block;
  padding: var(--spacing-md) 0;
  border-top: 1px solid var(--color-gray-200);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  color: var(--color-gray-900);
  text-decoration: none;
}

.blog-article__related-item:hover {
  color: var(--color-primary);
}

/* Artikel-Typografie (ersetzt Tailwind-Typography / @nuxt/ui prose aus dem Train-Hybrid-Projekt) */
.blog-content {
  min-width: 0;
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  color: var(--color-gray-800);
}

.blog-content :deep(h2) {
  margin: var(--spacing-2xl) 0 var(--spacing-md);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-gray-900);
}

.blog-content :deep(h3) {
  margin: var(--spacing-xl) 0 var(--spacing-sm);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
}

.blog-content :deep(p) {
  margin: 0 0 var(--spacing-md);
}

.blog-content :deep(ul),
.blog-content :deep(ol) {
  margin: 0 0 var(--spacing-md);
  padding-left: var(--spacing-lg);
}

.blog-content :deep(ul) { list-style: disc; }
.blog-content :deep(ol) { list-style: decimal; }

.blog-content :deep(li) {
  margin-bottom: var(--spacing-xs);
}

.blog-content :deep(a) {
  color: var(--color-primary);
  text-underline-offset: 3px;
}

.blog-content :deep(blockquote) {
  margin: var(--spacing-lg) 0;
  padding-left: var(--spacing-md);
  border-left: 3px solid var(--color-primary);
  color: var(--color-gray-700);
  font-style: italic;
}

.blog-content :deep(table) {
  width: 100%;
  margin: var(--spacing-lg) 0;
  border-collapse: collapse;
  font-size: var(--font-size-sm);
}

.blog-content :deep(th),
.blog-content :deep(td) {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-gray-200);
  text-align: left;
}

.blog-content :deep(th) {
  background: var(--color-gray-50);
  font-weight: var(--font-weight-semibold);
}

.blog-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: var(--border-radius-md);
}

.blog-content :deep(hr) {
  margin: var(--spacing-xl) 0;
  border: 0;
  border-top: 1px solid var(--color-gray-200);
}

.sidebar-product-card {
  margin-top: var(--spacing-lg);
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
