<template>
  <section class="product-features-section">
    <div class="product-features-container">
      <header class="product-features-header">
        <h2>{{ content.title }}</h2>
      </header>

      <div class="product-features-grid">
        <article v-for="feature in content.items" :key="feature.title" class="product-feature-card">
          <div class="product-feature-image-wrap">
            <img :src="feature.image" :alt="feature.alt" class="product-feature-image" loading="lazy" />
          </div>
          <div class="product-feature-content">
            <h3 class="product-feature-title">{{ feature.title }}</h3>
            <p class="product-feature-description">{{ feature.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ProductFeaturesContent } from '~/utils/productDetailContent'

defineProps<{
  content: ProductFeaturesContent
}>()
</script>

<style scoped>
.product-features-section {
  background:
    linear-gradient(180deg, #ffffff 0%, #f8f5ef 100%);
  padding: 4rem 0 5rem;
}

.product-features-container {
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 1rem;
}

.product-features-header {
  margin-bottom: 2rem;
}

.product-features-header h2 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.3rem);
  font-weight: 900;
  line-height: 1;
  text-transform: uppercase;
  color: #121212;
}

.product-features-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

.product-feature-card {
  overflow: hidden;
  border: 1px solid rgba(18, 18, 18, 0.08);
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 22px 60px rgba(15, 23, 42, 0.06);
}

.product-feature-image-wrap {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #ece7df;
}

.product-feature-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 220ms ease;
}

.product-feature-card:hover .product-feature-image {
  transform: scale(1.04);
}

.product-feature-content {
  padding: 1.5rem;
}

.product-feature-title {
  margin: 0 0 0.75rem;
  font-size: 1.35rem;
  font-weight: 800;
  line-height: 1.05;
  color: #121212;
}

.product-feature-description {
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.7;
  color: #5f584f;
}

@media (max-width: 960px) {
  .product-features-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .product-features-section {
    padding: 3rem 0 4rem;
  }

  .product-feature-content {
    padding: 1.25rem;
  }
}
</style>
