<template>
  <section class="pch">
    <img
      src="https://cdn.shopify.com/s/files/1/0347/9214/5029/files/t-apex-produkt-cinematic-hero.jpg?v=1792333453"
      alt="T-Apex – Smarter Widerstand für professionelles Sprinttraining"
      loading="eager"
      class="pch__bg"
    />
    <div class="pch__overlay" />

    <div class="pch__inner">
      <div class="pch__content">
        <p class="pch__kicker">Warum T-Apex</p>
        <h2 class="pch__title">Zugwiderstand und Overspeed<br>in einem System</h2>
        <p class="pch__lead">Zugwiderstand von 0–15 kgf für explosive Starts und Beschleunigung. Overspeed-Modus bis 14 m/s für Topspeed-Arbeit und Schrittfrequenz – in einem Gerät.</p>

        <!-- Variant selector -->
        <div
          v-for="option in visibleOptions"
          :key="option.name"
          class="pch__option-group"
        >
          <p class="pch__option-label">{{ option.name }}</p>
          <div class="pch__option-values">
            <button
              v-for="value in option.values"
              :key="value"
              class="pch__option-btn"
              :class="{ 'pch__option-btn--active': selectedOptions[option.name] === value }"
              @click="$emit('selectOption', option.name, value)"
            >
              {{ value }}
            </button>
          </div>
        </div>

        <button
          class="pch__cta"
          :disabled="!isAvailable"
          @click="$emit('addToCart')"
        >
          {{ isAvailable ? 'In den Warenkorb' : 'Nicht verfügbar' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  product: any
  selectedOptions: Record<string, string>
  selectedVariant: any
}>()

defineEmits<{
  selectOption: [name: string, value: string]
  addToCart: []
}>()

const visibleOptions = computed(() => {
  if (!props.product?.options) return []
  return props.product.options.filter((o: any) => o.values?.length > 1)
})

const isAvailable = computed(() => {
  if (props.selectedVariant) return props.selectedVariant.availableForSale
  return props.product?.available ?? false
})
</script>

<style scoped>
.pch {
  position: relative;
  min-height: 720px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.pch__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
}

.pch__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 55%, transparent 100%);
  z-index: 1;
}

.pch__inner {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 5rem 2rem;
}

.pch__content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-width: 480px;
}

.pch__kicker {
  margin: 0;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #ef4544;
}

.pch__title {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.25rem);
  font-weight: 900;
  line-height: 1.05;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: -0.01em;
}

.pch__lead {
  margin: 0;
  font-size: 1rem;
  line-height: 1.65;
  color: rgba(255,255,255,0.75);
}

/* Variant selector */
.pch__option-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.pch__option-label {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
}

.pch__option-values {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.pch__option-btn {
  padding: 0.4rem 1rem;
  border: 1px solid rgba(255,255,255,0.35);
  border-radius: 999px;
  background: transparent;
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.pch__option-btn:hover {
  border-color: rgba(255,255,255,0.7);
}

.pch__option-btn--active {
  background: #ffffff;
  color: #0a0a0a;
  border-color: #ffffff;
  font-weight: 700;
}

/* CTA */
.pch__cta {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  padding: 0.85rem 2rem;
  background: #ef4544;
  color: #ffffff;
  border: none;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: background 0.2s ease;
  margin-top: 0.25rem;
}

.pch__cta:hover:not(:disabled) {
  background: #d03232;
}

.pch__cta:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .pch {
    min-height: 420px;
  }

  .pch__overlay {
    background: rgba(0,0,0,0.45);
  }

  .pch__inner {
    padding: 3.5rem 1.5rem;
  }

  .pch__content {
    max-width: 100%;
  }
}
</style>
