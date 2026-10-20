<template>
  <section class="ucs">
    <div class="ucs__inner" :class="{ 'ucs__inner--reversed': imageRight }">
      <div class="ucs__media">
        <img
          :src="image"
          :alt="imageAlt"
          loading="lazy"
          class="ucs__img"
        />
      </div>

      <div class="ucs__body">
        <p class="ucs__kicker">{{ kicker }}</p>
        <h2 class="ucs__title">{{ title }}</h2>
        <p class="ucs__text">{{ text }}</p>
        <NuxtLink :to="link" class="ucs__cta">
          {{ linkLabel }}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  image: string
  imageAlt: string
  kicker: string
  title: string
  text: string
  link: string
  linkLabel: string
  imageRight?: boolean
  imageAspectRatio?: string
}>()

const aspectRatio = computed(() => props.imageAspectRatio ?? '4 / 3')
</script>

<style scoped>
.ucs {
  background: #fff;
  padding: 5rem 1.5rem;
}

.ucs__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}

.ucs__inner--reversed {
  direction: rtl;
}

.ucs__inner--reversed > * {
  direction: ltr;
}

.ucs__media {
  overflow: hidden;
  border-radius: 12px;
}

.ucs__img {
  display: block;
  width: 100%;
  aspect-ratio: v-bind(aspectRatio);
  object-fit: cover;
}

.ucs__body {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.ucs__kicker {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #ef4544;
}

.ucs__title {
  margin: 0;
  font-size: clamp(1.6rem, 2.5vw, 2.25rem);
  font-weight: 800;
  line-height: 1.1;
  color: #121212;
}

.ucs__text {
  margin: 0;
  font-size: 1rem;
  line-height: 1.75;
  color: #5f584f;
  max-width: 480px;
}

.ucs__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  align-self: flex-start;
  padding: 0.75rem 1.5rem;
  background: #121212;
  color: #fff;
  text-decoration: none;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
  transition: background 0.2s ease;
}

.ucs__cta:hover {
  background: #ef4544;
}

@media (max-width: 768px) {
  .ucs {
    padding: 3.5rem 1.5rem;
  }

  .ucs__inner {
    grid-template-columns: 1fr;
    gap: 2rem;
    direction: ltr;
  }
}
</style>
