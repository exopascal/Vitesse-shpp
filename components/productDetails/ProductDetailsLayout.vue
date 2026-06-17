<template>
  <section class="product-details-layout bg-[#f7f4ef] py-6 lg:py-10">
    <div class="mx-auto max-w-[1500px] px-4 lg:px-8">
      <div class="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.9fr)] lg:gap-10">
        <div class="lg:sticky lg:top-6 lg:self-start">
          <div class="overflow-hidden rounded-[28px] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <div class="relative aspect-[4/3] bg-[#f3efe8]">
              <img
                :src="currentImage"
                :alt="currentImageAlt"
                class="h-full w-full object-cover"
              />
            </div>

            <div
              v-if="galleryItems.length > 1"
              class="flex gap-3 overflow-x-auto border-t border-[#ebe5dc] px-4 py-4 sm:px-5"
            >
              <button
                v-for="(item, index) in galleryItems"
                :key="`${item.src}-${index}`"
                type="button"
                :class="[
                  'relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border transition',
                  currentImageIndex === index
                    ? 'border-[#f26a21] ring-2 ring-[#f7c9ae]'
                    : 'border-[#e7dfd3] hover:border-[#c9bcab]'
                ]"
                @click="currentImageIndex = index"
              >
                <img :src="item.src" :alt="item.alt" class="h-full w-full object-cover" />
              </button>
            </div>
          </div>
        </div>

        <div class="lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto lg:pr-1">
          <ProductDetailsInfo
            :product="product"
            :selectedOptions="internalSelectedOptions"
            :selectedVariant="selectedVariant"
            :quantity="internalQuantity"
            :isLoading="internalIsLoading"
            @selectOption="handleSelectOption"
            @incrementQuantity="handleIncrementQuantity"
            @decrementQuantity="handleDecrementQuantity"
            @addToCart="handleAddToCart"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useShopifyCardStore } from '../../store/shopifyCardStore'

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

const shopifyCardStore = useShopifyCardStore()
const { openCart } = useCartSidebar()

const product = computed(() => props.product ?? null)

const internalSelectedOptions = ref({ ...props.selectedOptions })
const internalQuantity = ref(props.quantity || 1)
const internalIsLoading = ref(false)
const currentImageIndex = ref(0)

watch(
  () => props.selectedOptions,
  (nextValue) => {
    internalSelectedOptions.value = { ...(nextValue || {}) }
  },
  { deep: true }
)

watch(
  product,
  () => {
    currentImageIndex.value = 0
  }
)

const selectedVariant = computed(() => {
  if (!product.value?.variants?.length) return null

  return (
    product.value.variants.find((variant) =>
      variant.selectedOptions.every((option) => internalSelectedOptions.value[option.name] === option.value)
    ) || null
  )
})

const galleryItems = computed(() => {
  const images = product.value?.images || []
  const alts = product.value?.imageAlts || []

  if (!images.length && product.value?.featured_image) {
    return [
      {
        src: product.value.featured_image,
        alt: product.value?.title || 'Product image',
      },
    ]
  }

  return images.map((src, index) => ({
    src,
    alt: alts[index] || `${product.value?.title || 'Product'} image ${index + 1}`,
  }))
})

const currentGalleryItem = computed(() => {
  if (!galleryItems.value.length) {
    return {
      src: 'https://placehold.co/1200x900',
      alt: product.value?.title || 'Product image',
    }
  }

  return galleryItems.value[currentImageIndex.value] || galleryItems.value[0]
})

const currentImage = computed(() => currentGalleryItem.value.src)
const currentImageAlt = computed(() => currentGalleryItem.value.alt)

function handleSelectOption(optionName, optionValue) {
  internalSelectedOptions.value = {
    ...internalSelectedOptions.value,
    [optionName]: optionValue,
  }
  emit('selectOption', optionName, optionValue)
}

function handleIncrementQuantity() {
  if (selectedVariant.value && internalQuantity.value < selectedVariant.value.quantityAvailable) {
    internalQuantity.value += 1
  } else if (!selectedVariant.value) {
    internalQuantity.value += 1
  }

  emit('incrementQuantity')
}

function handleDecrementQuantity() {
  if (internalQuantity.value > 1) {
    internalQuantity.value -= 1
  }

  emit('decrementQuantity')
}

async function handleAddToCart() {
  if (!product.value) return

  const isAvailable = selectedVariant.value
    ? selectedVariant.value.availableForSale
    : product.value.available

  if (!isAvailable) return

  internalIsLoading.value = true

  try {
    const variantId = selectedVariant.value?.id || product.value.variant_id

    if (!variantId) {
      throw new Error('Missing product variant ID')
    }

    await shopifyCardStore.addToCart(variantId, internalQuantity.value)
    await new Promise((resolve) => setTimeout(resolve, 250))
    await shopifyCardStore.getCartData()
    openCart()
    emit('addToCart')
  } catch (error) {
    console.error('Error adding to cart:', error)
  } finally {
    internalIsLoading.value = false
  }
}
</script>
