<script setup lang="ts">
import type { ProductFeaturesAccordionContent } from '~/utils/productDetailContent'

const props = defineProps<{
  content: ProductFeaturesAccordionContent
}>()

const activeFeature = ref(0)
</script>

<template>
  <section class="pfa">
    <div class="pfa__outer">
      <p class="pfa__label">{{ props.content.label ?? 'Leistung. Mobilität. Ausdauer.' }}</p>

      <div class="pfa__card">
        <div
          v-for="(f, i) in props.content.items"
          :key="`img-${i}`"
          class="pfa__img-wrap"
          :class="{ 'is-visible': activeFeature === i }"
        >
          <img :src="f.image" :alt="f.alt" loading="lazy" />
        </div>

        <div class="pfa__gradient" />

        <div class="pfa__content">
          <div class="pfa__items">
            <button
              v-for="(f, i) in props.content.items"
              :key="f.title"
              class="pfa__item"
              :class="{ 'is-active': activeFeature === i }"
              @click="activeFeature = i"
            >
              <span class="pfa__item-title">{{ f.title }}</span>
              <Transition name="pfa-desc">
                <p v-if="activeFeature === i" class="pfa__item-desc" v-html="f.description" />
              </Transition>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pfa {
  background: #111;
  color: #fff;
  padding: var(--spacing-3xl) var(--spacing-lg);
}

.pfa__outer {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.pfa__label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-primary);
}

.pfa__card {
  position: relative;
  overflow: hidden;
  border-radius: var(--border-radius-2xl);
  min-height: 580px;
  display: flex;
  align-items: center;
}

.pfa__img-wrap {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.55s ease;
}

.pfa__img-wrap.is-visible {
  opacity: 1;
}

.pfa__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pfa__gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.88) 0%,
    rgba(0, 0, 0, 0.72) 35%,
    rgba(0, 0, 0, 0.15) 60%,
    transparent 80%
  );
  z-index: 1;
}

.pfa__content {
  position: relative;
  z-index: 2;
  padding: var(--spacing-3xl) var(--spacing-2xl);
  width: 100%;
  max-width: 460px;
}

.pfa__items {
  display: flex;
  flex-direction: column;
}

.pfa__item {
  all: unset;
  cursor: pointer;
  display: block;
  padding: var(--spacing-lg) 0;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  text-align: left;
}

.pfa__item:last-child {
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.pfa__item-title {
  display: block;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.25s ease;
  line-height: 1.3;
}

.pfa__item.is-active .pfa__item-title {
  color: #fff;
}

.pfa__item-desc {
  margin-top: var(--spacing-sm);
  font-size: var(--font-size-sm);
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.7);
  max-width: 360px;
}

.pfa__item-desc :deep(a) {
  color: #fff;
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  transition: border-color 0.15s ease;
}

.pfa__item-desc :deep(a:hover) {
  border-bottom-color: #fff;
}

.pfa-desc-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.pfa-desc-leave-active {
  transition: opacity 0.15s ease;
}
.pfa-desc-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.pfa-desc-leave-to {
  opacity: 0;
}
</style>
