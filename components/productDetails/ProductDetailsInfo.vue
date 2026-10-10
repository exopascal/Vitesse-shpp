<template>
  <div class="space-y-4 pb-4">
    <div class="rounded-[28px] bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
      <div class="mb-3 flex flex-wrap items-center gap-2">
        <span
          class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.04em]"
          :class="isAvailable ? 'border-[#bde4ce] text-[#17633d]' : 'border-[#f5c0ba] text-[#9f2d22]'"
        >
          {{ isAvailable ? 'Sofort verfügbar' : 'Aktuell nicht verfügbar' }}
        </span>
      </div>

      <h1 class="break-words text-[1.5rem] font-black leading-[1.05] tracking-tight text-[#17120d] sm:text-[1.75rem] lg:text-[2rem]">
        {{ product?.title || 'Product Title' }}
      </h1>

      <p v-if="product?.subtitle || shortDescription" class="mt-3 max-w-2xl text-base leading-7 text-[#5f5549]">
        {{ product?.subtitle || shortDescription }}
      </p>

      <div class="mt-5 flex flex-wrap items-end gap-3">
        <span class="text-[2rem] font-black text-[#17120d] sm:text-[2.25rem]">{{ formatPrice(currentPrice) }}</span>
        <span v-if="comparePrice" class="pb-1 text-base font-medium text-[#8a7f72] line-through">
          {{ formatPrice(comparePrice) }}
        </span>
        <TaxNote class="pb-1.5" />
      </div>

      <div class="mt-8 space-y-5">
        <div v-if="hasRealVariants" class="space-y-5">
          <div v-for="option in product.options" :key="option.name" class="space-y-2.5">
            <div class="flex items-center justify-between gap-3">
              <label class="text-sm font-semibold tracking-[0.02em] text-[#5a5045]">
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
          <div class="flex w-full items-center rounded-full border border-[#ded5c8] bg-[#fbf8f3] p-1">
            <button
              type="button"
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl text-[#17120d] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-35"
              :disabled="quantity <= 1"
              @click="decrementQuantity"
            >
              -
            </button>
            <span class="flex-1 text-center text-base font-semibold text-[#17120d]">{{ quantity }}</span>
            <button
              type="button"
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl text-[#17120d] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-35"
              :disabled="selectedVariant && quantity >= selectedVariant.quantityAvailable"
              @click="incrementQuantity"
            >
              +
            </button>
          </div>

          <button
            type="button"
            class="min-h-[3.25rem] rounded-full bg-[#111827] px-6 text-sm font-bold tracking-[0.04em] text-white transition hover:bg-[#374151] disabled:cursor-not-allowed disabled:bg-[#c9c1b6]"
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
        <h2 class="text-lg font-bold tracking-[0.02em] text-[#17120d]">Produktdetails</h2>
        <div v-if="product?.description" class="relative mt-4">
          <div
            class="prose prose-sm max-w-none overflow-hidden text-[#4f463b] prose-p:text-[#4f463b] prose-li:text-[#4f463b] prose-strong:text-[#17120d] [&_img]:max-w-full [&_img]:h-auto [&_table]:w-full [&_table]:table-fixed [&_iframe]:max-w-full transition-all duration-300"
            :style="isDescriptionExpanded ? {} : { maxHeight: '7rem', overflow: 'hidden' }"
          >
            <div v-html="product.description"></div>
          </div>
          <div
            v-if="!isDescriptionExpanded"
            class="pointer-events-none absolute bottom-8 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"
          ></div>
          <button
            type="button"
            class="relative mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#ded5c8] bg-[#fbf8f3] px-4 py-2 text-sm font-semibold text-[#17120d] transition hover:bg-[#f0e9e0] hover:border-[#c9bfb3]"
            @click="isDescriptionExpanded = !isDescriptionExpanded"
          >
            <span>{{ isDescriptionExpanded ? 'Weniger anzeigen' : 'Mehr lesen' }}</span>
            <svg
              class="h-4 w-4 transition-transform duration-200"
              :class="isDescriptionExpanded ? 'rotate-180' : ''"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        <p v-else class="mt-4 text-sm leading-6 text-[#6e6458]">
          Weitere Produktdetails folgen.
        </p>
      </article>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const isDescriptionExpanded = ref(false)

const props = defineProps({
  product: {
    type: Object,
    default: null,
  },
  shortDescription: {
    type: String,
    default: '',
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

const variantCount = computed(() => product.value?.variants?.length || 1)

const hasRealVariants = computed(() => {
  const options = product.value?.options
  if (!options?.length) return false
  if (options.length === 1 && options[0].name === 'Title') return false
  return true
})

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
