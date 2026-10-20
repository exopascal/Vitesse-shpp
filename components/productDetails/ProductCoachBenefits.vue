<template>
  <section v-if="content.items?.length" class="pcb">
    <div class="pcb__inner">
      <h2 class="pcb__title">{{ content.title }}</h2>
      <p class="pcb__subtitle">{{ content.subtitle }}</p>
      <div v-if="content.links?.length" class="pcb__links">
        <NuxtLink
          v-for="link in content.links"
          :key="link.href"
          :to="link.href"
          class="pcb__link"
        >{{ link.label }} ›</NuxtLink>
      </div>

      <div class="pcb__grid">
        <div v-for="item in content.items" :key="item.label" class="pcb__item">
          <div class="pcb__icon-wrap">
            <img :src="item.icon" :alt="item.label" class="pcb__icon" loading="lazy" />
          </div>
          <p class="pcb__label">{{ item.label }}</p>
          <p class="pcb__tags">{{ item.tags.join(' · ') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ProductCoachBenefitsContent } from '~/utils/productDetailContent'

defineProps<{
  content: ProductCoachBenefitsContent
}>()
</script>

<style scoped>
.pcb {
  background: #f5f5f5;
  padding: 5rem 1.5rem;
}

.pcb__inner {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.pcb__title {
  margin: 0 0 1.25rem;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  line-height: 1.1;
  color: #121212;
}

.pcb__subtitle {
  margin: 0 auto 3.5rem;
  max-width: 680px;
  font-size: 1rem;
  line-height: 1.7;
  color: #5f584f;
}

.pcb__links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem 2rem;
  margin-top: -2rem;
  margin-bottom: 3.5rem;
}

.pcb__link {
  font-size: 0.9rem;
  font-weight: 600;
  color: #f26a21;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.15s ease;
}

.pcb__link:hover {
  border-bottom-color: #f26a21;
}

.pcb__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.pcb__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.pcb__icon-wrap {
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pcb__icon {
  height: 3rem;
  width: auto;
}

.pcb__label {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 800;
  color: #121212;
}

.pcb__tags {
  margin: 0;
  font-size: 0.875rem;
  color: #9b8f82;
  letter-spacing: 0.01em;
}

@media (max-width: 768px) {
  .pcb {
    padding: 3.5rem 1.5rem;
  }

  .pcb__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .pcb__grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
