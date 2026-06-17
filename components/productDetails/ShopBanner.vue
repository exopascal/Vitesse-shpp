<template>
  <section class="shop-banner-section">
    <div class="shop-banner-container">
      <header class="shop-banner-header">
        <h2 class="shop-banner-title">{{ content.title }}</h2>
        <p class="shop-banner-text">{{ content.text }}</p>
      </header>

      <div class="shop-banner-media">
        <video
          v-if="videoSrc"
          :src="videoSrc"
          :poster="content.image"
          class="shop-banner-video"
          autoplay
          muted
          loop
          playsinline
        ></video>
        <img
          v-else
          :src="content.image"
          :alt="content.alt"
          class="shop-banner-image"
          loading="lazy"
        />
        <div class="shop-banner-overlay"></div>

        <a
          v-if="content.actionHref && content.actionLabel"
          :href="content.actionHref"
          target="_blank"
          rel="noreferrer"
          class="shop-banner-action"
        >
          {{ content.actionLabel }}
          <span aria-hidden="true" class="shop-banner-action-arrow">›</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ProductBannerContent } from '~/utils/productDetailContent'

const props = defineProps<{
  content: ProductBannerContent
}>()

const videoSrc = computed(() => {
  const href = props.content.actionHref || ''

  return /\.(mp4|webm|mov)$/i.test(href) ? href : ''
})
</script>

<style scoped>
.shop-banner-section {
  background: #ffffff;
  padding: 4rem 0 5rem;
}

.shop-banner-container {
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 1rem;
}

.shop-banner-header {
  max-width: 52rem;
  margin: 0 auto 2.75rem;
  text-align: center;
}

.shop-banner-title {
  margin: 0;
  font-size: clamp(2.5rem, 4.8vw, 4.25rem);
  font-weight: 900;
  line-height: 0.98;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  color: #050505;
}

.shop-banner-text {
  max-width: 46rem;
  margin: 1.15rem auto 0;
  font-size: 1rem;
  line-height: 1.7;
  color: #5b544c;
}

.shop-banner-media {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 1rem;
  aspect-ratio: 16 / 9;
  background: #e9e4dc;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.08);
}

.shop-banner-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.shop-banner-video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.shop-banner-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0.24) 100%);
  pointer-events: none;
}

.shop-banner-action {
  position: absolute;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.9rem 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.78);
  color: #ffffff;
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  transition:
    transform 180ms ease,
    background 180ms ease,
    border-color 180ms ease;
}

.shop-banner-action:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.92);
}

.shop-banner-action-arrow {
  font-size: 1rem;
  line-height: 1;
}

@media (max-width: 640px) {
  .shop-banner-section {
    padding: 3rem 0 4rem;
  }

  .shop-banner-header {
    margin-bottom: 1.75rem;
  }

  .shop-banner-text {
    font-size: 0.95rem;
  }

  .shop-banner-media {
    aspect-ratio: 4 / 3;
    border-radius: 0.9rem;
  }

  .shop-banner-action {
    padding: 0.8rem 1rem;
    font-size: 0.85rem;
  }
}
</style>
