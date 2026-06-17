<template>
  <div class="accessory-template">
    <ProductDetailsLayout
      :product="product"
      :selectedOptions="selectedOptions"
      :selectedVariant="selectedVariant"
      :quantity="quantity"
      :isLoading="isLoading"
      @addToCart="$emit('addToCart')"
      @selectOption="(optionName, optionValue) => $emit('selectOption', optionName, optionValue)"
      @incrementQuantity="$emit('incrementQuantity')"
      @decrementQuantity="$emit('decrementQuantity')"
    />

    <section class="accessory-story">
      <div class="accessory-story__inner">
        <div class="accessory-story__intro">
          <p class="accessory-story__eyebrow">Zubehoer</p>
          <h2 class="accessory-story__title">{{ content.banner.title }}</h2>
          <p class="accessory-story__text">{{ content.banner.text }}</p>
        </div>

        <div class="accessory-story__grid">
          <article
            v-for="item in content.features.items"
            :key="item.title"
            class="accessory-story__card"
          >
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { ProductDetailContent } from '~/utils/productDetailContent'

defineProps<{
  product: any
  selectedOptions: Record<string, string>
  selectedVariant: any
  quantity: number
  isLoading: boolean
  content: ProductDetailContent
}>()

defineEmits<{
  addToCart: []
  selectOption: [optionName: string, optionValue: string]
  incrementQuantity: []
  decrementQuantity: []
}>()
</script>

<style scoped>
.accessory-story {
  background: linear-gradient(180deg, #ffffff 0%, #f7f4ef 100%);
  padding: 2rem 1.5rem 4rem;
}

.accessory-story__inner {
  margin: 0 auto;
  max-width: 72rem;
}

.accessory-story__intro {
  max-width: 42rem;
  margin-bottom: 2rem;
}

.accessory-story__eyebrow {
  margin: 0 0 0.5rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #0f5e9c;
}

.accessory-story__title {
  margin: 0 0 0.75rem;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  line-height: 1.05;
  letter-spacing: -0.04em;
  color: #111827;
}

.accessory-story__text {
  margin: 0;
  max-width: 40rem;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #4b5563;
}

.accessory-story__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.accessory-story__card {
  border: 1px solid #e5ded3;
  border-radius: 1.25rem;
  background: rgba(255, 255, 255, 0.9);
  padding: 1.25rem;
  box-shadow: 0 18px 36px -28px rgba(15, 23, 42, 0.22);
}

.accessory-story__card h3 {
  margin: 0 0 0.55rem;
  font-size: 1.05rem;
  color: #111827;
}

.accessory-story__card p {
  margin: 0;
  line-height: 1.65;
  color: #6b7280;
}

@media (max-width: 900px) {
  .accessory-story__grid {
    grid-template-columns: 1fr;
  }
}
</style>
