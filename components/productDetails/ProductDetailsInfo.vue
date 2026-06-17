<template>
  <div class="space-y-4 pb-4">
    <div class="rounded-[28px] bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
      <div class="mb-5 flex flex-wrap items-center gap-3 text-sm text-[#756a5d]">
        <span class="inline-flex items-center rounded-full bg-[#f4ede4] px-3 py-1 font-medium uppercase tracking-[0.14em]">
          {{ product?.vendor || 'T-Apex' }}
        </span>
        <span
          class="inline-flex items-center rounded-full px-3 py-1 font-medium"
          :class="isAvailable ? 'bg-[#e7f7ef] text-[#17633d]' : 'bg-[#fce8e5] text-[#9f2d22]'"
        >
          {{ isAvailable ? 'Sofort verfuegbar' : 'Aktuell nicht verfuegbar' }}
        </span>
      </div>

      <h1 class="max-w-[16ch] text-3xl font-black uppercase leading-[0.95] text-[#17120d] sm:text-4xl lg:text-[3.25rem]">
        {{ product?.title || 'Product Title' }}
      </h1>

      <p v-if="product?.subtitle" class="mt-4 max-w-2xl text-base leading-7 text-[#5f5549]">
        {{ product.subtitle }}
      </p>

      <div class="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#4f463b]">
        <div class="flex items-center gap-1.5" aria-label="Bewertungen">
          <span
            v-for="star in 5"
            :key="star"
            class="text-lg"
            :class="star <= filledStars ? 'text-[#f26a21]' : 'text-[#d5cabd]'"
          >
            ★
          </span>
        </div>
        <span class="font-semibold">{{ ratingLabel }}</span>
        <span v-if="reviewCountLabel" class="text-[#7d7164]">{{ reviewCountLabel }}</span>
      </div>

      <div class="mt-6 flex flex-wrap items-end gap-3">
        <span class="text-3xl font-black text-[#17120d] sm:text-4xl">{{ formatPrice(currentPrice) }}</span>
        <span v-if="comparePrice" class="pb-1 text-lg font-medium text-[#8a7f72] line-through">
          {{ formatPrice(comparePrice) }}
        </span>
        <TaxNote class="pb-1.5" />
      </div>

      <div class="mt-8 space-y-5">
        <div v-if="product?.options?.length" class="space-y-5">
          <div v-for="option in product.options" :key="option.name" class="space-y-2.5">
            <div class="flex items-center justify-between gap-3">
              <label class="text-sm font-semibold uppercase tracking-[0.12em] text-[#5a5045]">
                {{ option.name }}
              </label>
              <span class="text-sm text-[#8b8073]">
                {{ selectedOptions[option.name] || 'Bitte waehlen' }}
              </span>
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="value in option.values"
                :key="value"
                type="button"
                :disabled="!isOptionValueAvailable(option.name, value)"
                :class="[
                  'rounded-full border px-4 py-2 text-sm font-semibold transition',
                  selectedOptions[option.name] === value
                    ? 'border-[#17120d] bg-[#17120d] text-white'
                    : 'border-[#ded5c8] bg-[#fbf8f3] text-[#2f2922] hover:border-[#17120d]',
                  !isOptionValueAvailable(option.name, value) ? 'cursor-not-allowed opacity-40' : ''
                ]"
                @click="selectOption(option.name, value)"
              >
                {{ value }}
              </button>
            </div>
          </div>
        </div>

        <div class="grid gap-3 sm:grid-cols-[auto_1fr]">
          <div class="inline-flex items-center rounded-full border border-[#ded5c8] bg-[#fbf8f3] p-1">
            <button
              type="button"
              class="flex h-11 w-11 items-center justify-center rounded-full text-xl text-[#17120d] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-35"
              :disabled="quantity <= 1"
              @click="decrementQuantity"
            >
              -
            </button>
            <span class="min-w-[3rem] text-center text-base font-semibold text-[#17120d]">{{ quantity }}</span>
            <button
              type="button"
              class="flex h-11 w-11 items-center justify-center rounded-full text-xl text-[#17120d] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-35"
              :disabled="selectedVariant && quantity >= selectedVariant.quantityAvailable"
              @click="incrementQuantity"
            >
              +
            </button>
          </div>

          <button
            type="button"
            class="min-h-[3.25rem] rounded-full bg-[#f26a21] px-6 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#dc5d18] disabled:cursor-not-allowed disabled:bg-[#c9c1b6]"
            :disabled="!isAvailable || isLoading"
            @click="addToCart"
          >
            <span v-if="isLoading">Wird hinzugefuegt...</span>
            <span v-else-if="!isAvailable">Nicht verfuegbar</span>
            <span v-else>In den Warenkorb</span>
          </button>
        </div>
      </div>
    </div>

    <div class="grid gap-4">
      <article class="rounded-[24px] border border-[#ebe2d7] bg-white p-6">
        <h2 class="text-lg font-bold uppercase tracking-[0.08em] text-[#17120d]">Produktdetails</h2>
        <div v-if="product?.description" class="prose prose-sm mt-4 max-w-none text-[#4f463b] prose-p:text-[#4f463b] prose-li:text-[#4f463b] prose-strong:text-[#17120d]">
          <div v-html="product.description"></div>
        </div>
        <p v-else class="mt-4 text-sm leading-6 text-[#6e6458]">
          Weitere Produktdetails folgen.
        </p>
      </article>

      <article class="rounded-[24px] border border-[#ebe2d7] bg-white p-6">
        <h2 class="text-lg font-bold uppercase tracking-[0.08em] text-[#17120d]">Technische Daten</h2>
        <dl class="mt-4 space-y-3">
          <div class="flex items-center justify-between gap-4 border-b border-[#f1ebe2] pb-3 text-sm">
            <dt class="text-[#7c7165]">Marke</dt>
            <dd class="font-semibold text-[#17120d]">{{ product?.vendor || 'T-Apex' }}</dd>
          </div>
          <div class="flex items-center justify-between gap-4 border-b border-[#f1ebe2] pb-3 text-sm">
            <dt class="text-[#7c7165]">Produktcode</dt>
            <dd class="font-semibold text-[#17120d]">{{ product?.handle || '-' }}</dd>
          </div>
          <div class="flex items-center justify-between gap-4 border-b border-[#f1ebe2] pb-3 text-sm">
            <dt class="text-[#7c7165]">Varianten</dt>
            <dd class="font-semibold text-[#17120d]">{{ variantCount }}</dd>
          </div>
          <div class="flex items-center justify-between gap-4 text-sm">
            <dt class="text-[#7c7165]">Status</dt>
            <dd class="font-semibold text-[#17120d]">{{ isAvailable ? 'Verfuegbar' : 'Nicht verfuegbar' }}</dd>
          </div>
        </dl>
      </article>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    default: null,
  },
  selectedOptions: {
    type: Object,
    default: () => ({}),
  },
  selectedVariant: {
    type: Object,
    default: null,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['selectOption', 'incrementQuantity', 'decrementQuantity', 'addToCart'])

const product = computed(() => props.product ?? null)

const isAvailable = computed(() => {
  if (props.selectedVariant) return props.selectedVariant.availableForSale
  return product.value?.available || false
})

const currentPrice = computed(() => props.selectedVariant?.price || product.value?.price || 0)
const comparePrice = computed(() => props.selectedVariant?.compareAtPrice || product.value?.compare_at_price || 0)
const ratingValue = computed(() => product.value?.reviewSummary?.ratingValue)
const reviewCount = computed(() => product.value?.reviewSummary?.reviewCount)
const filledStars = computed(() => Math.round(ratingValue.value || 0))
const ratingLabel = computed(() => (ratingValue.value ? `${ratingValue.value.toFixed(1)} / 5` : 'Noch keine Bewertungen'))
const reviewCountLabel = computed(() => {
  if (!reviewCount.value) return ''
  return `${reviewCount.value} Bewertungen`
})
const variantCount = computed(() => product.value?.variants?.length || 1)

function selectOption(optionName, optionValue) {
  emit('selectOption', optionName, optionValue)
}

function incrementQuantity() {
  emit('incrementQuantity')
}

function decrementQuantity() {
  emit('decrementQuantity')
}

function addToCart() {
  emit('addToCart')
}

function isOptionValueAvailable(optionName, optionValue) {
  if (!product.value?.variants?.length) return false

  const testOptions = { ...props.selectedOptions, [optionName]: optionValue }

  return product.value.variants.some((variant) => {
    const optionsMatch = variant.selectedOptions.every((option) => {
      return !testOptions[option.name] || testOptions[option.name] === option.value
    })

    return optionsMatch && variant.availableForSale
  })
}

function formatPrice(price) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(price || 0)
}
</script>
