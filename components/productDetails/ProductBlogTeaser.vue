<script setup lang="ts">
import { computed } from 'vue'
import type { ProductBlogTeaserContent } from '~/utils/productDetailContent'

const props = defineProps<{
  content: ProductBlogTeaserContent
}>()

type BlogPost = {
  path: string
  title?: string
  description?: string
  category?: string
  date?: string
  heroImage?: string
  heroImageAlt?: string
}

const { data: posts } = await useAsyncData('product-blog-teaser', () =>
  queryCollection('blog').order('date', 'DESC').all() as unknown as Promise<BlogPost[]>,
)

const postChunks = computed(() => {
  if (!posts.value) return []
  const chunks: BlogPost[][] = []
  for (let i = 0; i < posts.value.length; i += 3) {
    chunks.push(posts.value.slice(i, i + 3))
  }
  return chunks
})

const formattedDate = (value?: string) => {
  if (!value) return ''
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }).format(parsed)
}
</script>

<template>
  <section v-if="posts && posts.length" class="blog-teaser">
    <div class="blog-teaser__inner">
      <header class="blog-teaser__header">
        <p class="blog-teaser__kicker">{{ props.content.kicker ?? 'Forschung & Praxis' }}</p>
        <h2 class="blog-teaser__title">{{ props.content.title ?? 'Wissenschaft für die Trainingsplanung' }}</h2>
        <p class="blog-teaser__lead">
          {{ props.content.lead ?? 'Studienbasierte Beiträge direkt aus der Forschung in die Praxis übersetzt.' }}
        </p>
      </header>

      <div
        v-for="(chunk, ci) in postChunks"
        :key="ci"
        class="blog-teaser__row"
      >
        <ul class="blog-teaser__grid">
          <li v-for="post in chunk" :key="post.path" class="blog-teaser__item">
            <NuxtLink :to="post.path" class="blog-teaser__card">
              <div class="blog-teaser__card-image-wrap">
                <img
                  v-if="post.heroImage"
                  :src="post.heroImage"
                  :alt="post.heroImageAlt || post.title || ''"
                  class="blog-teaser__card-image"
                  loading="lazy"
                />
                <div v-else class="blog-teaser__card-image-placeholder" />
              </div>
              <div class="blog-teaser__card-body">
                <p v-if="post.category" class="blog-teaser__category">{{ post.category }}</p>
                <h3 class="blog-teaser__card-title">{{ post.title }}</h3>
                <p v-if="post.description" class="blog-teaser__excerpt">{{ post.description }}</p>
                <time v-if="post.date" class="blog-teaser__date">{{ formattedDate(post.date) }}</time>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="blog-teaser__cta">
        <NuxtLink to="/blog" class="blog-teaser__cta-link">Alle Beiträge lesen</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.blog-teaser {
  background: #f7f5f2;
  padding: 5rem 1.5rem 4rem;
  border-top: 1px solid #e8e3dc;
}

.blog-teaser__inner {
  max-width: 1200px;
  margin: 0 auto;
}

.blog-teaser__header {
  margin-bottom: 3rem;
  max-width: 640px;
}

.blog-teaser__kicker {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #ef4544;
  margin: 0 0 0.75rem;
}

.blog-teaser__title {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  line-height: 1.1;
  color: #121212;
  margin: 0 0 1rem;
}

.blog-teaser__lead {
  font-size: 1rem;
  color: #5f584f;
  line-height: 1.7;
  margin: 0;
}

/* Row sections */
.blog-teaser__row {
  padding: 2.5rem 0;
  border-top: 1px solid #e8e3dc;
}

.blog-teaser__row:last-of-type {
  border-bottom: 1px solid #e8e3dc;
}

/* 3-column grid */
.blog-teaser__grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .blog-teaser__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .blog-teaser__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Card */
.blog-teaser__card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  height: 100%;
  border: 1px solid #e8e3dc;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.blog-teaser__card:hover {
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.09);
  transform: translateY(-2px);
}

/* Hero image */
.blog-teaser__card-image-wrap {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #e8e3dc;
  flex-shrink: 0;
}

.blog-teaser__card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.blog-teaser__card:hover .blog-teaser__card-image {
  transform: scale(1.04);
}

.blog-teaser__card-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #e8e3dc 0%, #d4cfc8 100%);
}

/* Card body */
.blog-teaser__card-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.25rem 1.25rem 1.5rem;
  flex: 1;
}

.blog-teaser__category {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #ef4544;
  margin: 0;
}

.blog-teaser__card-title {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.35;
  color: #121212;
  margin: 0;
  overflow-wrap: break-word;
  word-break: break-word;
}

.blog-teaser__card:hover .blog-teaser__card-title {
  color: #ef4544;
}

.blog-teaser__excerpt {
  font-size: 0.85rem;
  line-height: 1.6;
  color: #5f584f;
  flex: 1;
  margin: 0;
  overflow-wrap: break-word;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-teaser__date {
  font-size: 0.75rem;
  color: #9b9189;
  margin-top: 0.5rem;
}

/* CTA */
.blog-teaser__cta {
  margin-top: 2.5rem;
  text-align: center;
}

.blog-teaser__cta-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.85rem 2rem;
  border: 1.5px solid #1d1d1d;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #1d1d1d;
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease;
}

.blog-teaser__cta-link:hover {
  background: #1d1d1d;
  color: #fff;
}
</style>
