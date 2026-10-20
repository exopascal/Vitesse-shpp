<script setup lang="ts">
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
}

const { data: posts } = await useAsyncData('product-blog-teaser', () =>
  queryCollection('blog').order('date', 'DESC').all() as unknown as Promise<BlogPost[]>,
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

      <ul class="blog-teaser__grid">
        <li v-for="post in posts" :key="post.path" class="blog-teaser__item">
          <NuxtLink :to="post.path" class="blog-teaser__card">
            <p v-if="post.category" class="blog-teaser__category">{{ post.category }}</p>
            <h3 class="blog-teaser__card-title">{{ post.title }}</h3>
            <p v-if="post.description" class="blog-teaser__excerpt">{{ post.description }}</p>
            <time v-if="post.date" class="blog-teaser__date">{{ formattedDate(post.date) }}</time>
          </NuxtLink>
        </li>
      </ul>

      <div class="blog-teaser__cta">
        <NuxtLink to="/blog" class="blog-teaser__cta-link">Alle Beiträge lesen</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.blog-teaser {
  background: var(--color-gray-50);
  padding: var(--spacing-3xl) var(--spacing-lg);
  border-top: 1px solid var(--color-gray-200);
}

.blog-teaser__inner {
  max-width: 1200px;
  margin: 0 auto;
}

.blog-teaser__header {
  margin-bottom: var(--spacing-2xl);
  max-width: 640px;
}

.blog-teaser__kicker {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.blog-teaser__title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-gray-900);
}

.blog-teaser__lead {
  margin-top: var(--spacing-md);
  font-size: var(--font-size-lg);
  color: var(--color-gray-600);
  line-height: var(--line-height-normal);
}

.blog-teaser__grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
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

.blog-teaser__card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg);
  background: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius-xl);
  text-decoration: none;
  color: inherit;
  height: 100%;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.blog-teaser__card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.blog-teaser__category {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-primary);
}

.blog-teaser__card-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  color: var(--color-gray-900);
  overflow-wrap: break-word;
  word-break: break-word;
}

.blog-teaser__card:hover .blog-teaser__card-title {
  color: var(--color-primary);
}

.blog-teaser__excerpt {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
  color: var(--color-gray-600);
  flex: 1;
  overflow-wrap: break-word;
  word-break: break-word;
}

.blog-teaser__date {
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
  margin-top: auto;
}

.blog-teaser__cta {
  margin-top: var(--spacing-2xl);
  text-align: center;
}

.blog-teaser__cta-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-md) var(--spacing-xl);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-800);
  text-decoration: none;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.blog-teaser__cta-link:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}
</style>
