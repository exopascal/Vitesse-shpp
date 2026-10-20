<script setup lang="ts">
type BlogPost = {
  path: string
  title?: string
  category?: string
  heroImage?: string
  heroImageAlt?: string
}

const { data: posts } = await useAsyncData('product-blog-strip', () =>
  queryCollection('blog').order('date', 'DESC').all() as unknown as Promise<BlogPost[]>,
)
</script>

<template>
  <section v-if="posts?.length" class="blog-strip">
    <div class="blog-strip__inner">
      <p class="blog-strip__kicker">Forschung & Praxis</p>
      <div class="blog-strip__track-wrap">
        <ul class="blog-strip__scroll">
        <li v-for="post in posts" :key="post.path" class="blog-strip__item">
          <NuxtLink :to="post.path" class="blog-strip__card">
            <div class="blog-strip__image-wrap">
              <img
                v-if="post.heroImage"
                :src="post.heroImage"
                :alt="post.heroImageAlt || post.title || ''"
                class="blog-strip__image"
                loading="lazy"
              />
              <div v-else class="blog-strip__image-placeholder" />
            </div>
            <div class="blog-strip__body">
              <p v-if="post.category" class="blog-strip__category">{{ post.category }}</p>
              <h3 class="blog-strip__title">{{ post.title }}</h3>
            </div>
          </NuxtLink>
        </li>
        </ul>
        <div class="blog-strip__fade" aria-hidden="true" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.blog-strip {
  padding: 3rem 0;
  background: #f7f5f2;
  border-top: 1px solid #e8e3dc;
  border-bottom: 1px solid #e8e3dc;
  overflow: hidden;
}

.blog-strip__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.blog-strip__track-wrap {
  position: relative;
}

.blog-strip__kicker {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #ef4544;
  margin: 0 0 1.25rem;
}

.blog-strip__scroll {
  list-style: none;
  margin: 0;
  padding: 0.25rem 0 1.25rem;
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.blog-strip__scroll::-webkit-scrollbar {
  display: none;
}

.blog-strip__fade {
  pointer-events: none;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 1.25rem;
  width: 5rem;
  background: linear-gradient(to right, transparent, #f7f5f2);
}

.blog-strip__item {
  flex: 0 0 280px;
  scroll-snap-align: start;
}

@media (min-width: 768px) {
  .blog-strip__item {
    flex: 0 0 300px;
  }
}

.blog-strip__card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  height: 100%;
  border: 1px solid #e8e3dc;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.blog-strip__card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.blog-strip__image-wrap {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #e8e3dc;
  flex-shrink: 0;
}

.blog-strip__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.blog-strip__card:hover .blog-strip__image {
  transform: scale(1.04);
}

.blog-strip__image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #e8e3dc 0%, #d4cfc8 100%);
}

.blog-strip__body {
  padding: 1rem 1.1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.blog-strip__category {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #ef4544;
  margin: 0;
}

.blog-strip__title {
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.35;
  color: #121212;
  margin: 0;
  overflow-wrap: break-word;
  word-break: break-word;
}

.blog-strip__card:hover .blog-strip__title {
  color: #ef4544;
}
</style>
