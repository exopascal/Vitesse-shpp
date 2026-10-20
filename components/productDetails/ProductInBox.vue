<script setup lang="ts">
import type { ProductInBoxContent } from '~/utils/productDetailContent'

defineProps<{
  content: ProductInBoxContent
}>()
</script>

<template>
  <section class="pib">
    <div class="pib__inner">
      <h2 class="pib__title">{{ content.title ?? 'Lieferumfang' }}</h2>

      <div class="pib__grid">
        <div
          v-for="item in content.items"
          :key="item.label"
          class="pib__card"
          :class="{ 'pib__card--large': item.large }"
        >
          <div class="pib__media">
            <img
              :src="item.image"
              :alt="item.alt"
              loading="lazy"
              class="pib__img"
            />
          </div>
          <p class="pib__label">{{ item.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pib {
  background: #fff;
  padding: 5rem 1.5rem;
}

.pib__inner {
  max-width: 1200px;
  margin: 0 auto;
}

.pib__title {
  margin: 0 0 2rem;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 800;
  color: #121212;
}

.pib__grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.75rem;
}

.pib__card {
  background: #f5f5f5;
  border-radius: 10px;
  padding: 1.5rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

/* Must come after .pib__card to win the cascade */
.pib__card--large {
  grid-column: span 3;
}

.pib__media {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.pib__card--large .pib__media {
  min-height: 220px;
}

.pib__card:not(.pib__card--large) .pib__media {
  min-height: 110px;
}

.pib__img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
}

.pib__label {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: #121212;
  text-align: center;
  align-self: flex-end;
  width: 100%;
}

/* Tablet: 2 große + 3er-Raster für kleine */
@media (max-width: 1024px) and (min-width: 601px) {
  .pib__grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

/* Mobile: alles 2-spaltig, große Items full-width */
@media (max-width: 600px) {
  .pib__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  .pib__card--large {
    grid-column: span 2;
  }

  .pib__card--large .pib__media {
    min-height: 160px;
  }

  .pib__card:not(.pib__card--large) .pib__media {
    min-height: 80px;
  }
}
</style>
