<template>
  <section
    v-if="faqItems.length"
    class="bg-[#1c1c1c] py-16 text-white sm:py-20"
  >
    <div class="mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <p class="text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">
          {{ resolvedTitle }}
        </p>
        <p v-if="resolvedSubtitle" class="mt-3 text-sm font-semibold text-white/80 sm:text-base">
          {{ resolvedSubtitle }}
        </p>
      </div>

      <div class="mt-10 space-y-2 sm:mt-12">
        <article
          v-for="(item, index) in faqItems"
          :key="`${item.question}-${index}`"
          class="overflow-hidden border border-black/15 bg-white text-[#1d1d1d]"
        >
          <button
            type="button"
            class="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6 sm:py-6"
            :aria-expanded="isOpen(index)"
            @click="toggleItem(index)"
          >
            <span class="text-xl font-medium leading-snug sm:text-[1.85rem] sm:leading-[1.2]">
              {{ item.question }}
            </span>
            <span
              class="mt-1 flex h-8 w-8 shrink-0 items-center justify-center text-[#1d1d1d] transition-transform duration-200"
              :class="isOpen(index) ? 'rotate-180' : ''"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" class="h-5 w-5 fill-none stroke-current stroke-[2.2]">
                <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </button>

          <div v-show="isOpen(index)" class="border-t border-[#e8e3dc] px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
            <div class="space-y-4 text-sm leading-7 text-[#2f2f2f] sm:text-base">
              <p
                v-for="(paragraph, paragraphIndex) in item.answer"
                :key="`${index}-${paragraphIndex}`"
                class="whitespace-pre-line"
              >
                {{ paragraph }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { ShopifyProduct } from '~/types/domain/shopify'
import type { ProductFaqContent, ProductFaqItem } from '~/utils/productDetailContent'
import { getProductDetailContent } from '~/utils/productDetailContent'

const props = defineProps({
  product: {
    type: Object as () => ShopifyProduct | null,
    default: null,
  },
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  items: {
    type: Array as () => ProductFaqItem[],
    default: () => [],
  },
  initiallyOpen: {
    type: Array as () => number[],
    default: () => [],
  },
  content: {
    type: Object as () => ProductFaqContent | null,
    default: null,
  },
})

const product = computed<ShopifyProduct | null>(() => props.product ?? null)

const derivedContent = computed<ProductFaqContent | null>(() => {
  if (props.content) return props.content

  if (props.items.length) {
    return {
      title: props.title || 'FAQs',
      subtitle: props.subtitle || 'Wir beantworten Deine Fragen',
      items: props.items,
      initiallyOpen: props.initiallyOpen,
    }
  }

  const handle = product.value?.handle?.trim()
  if (!handle) return null

  return getProductDetailContent(product.value).faq
})

const resolvedTitle = computed(() => derivedContent.value?.title || props.title || 'FAQs')
const resolvedSubtitle = computed(
  () => derivedContent.value?.subtitle || props.subtitle || 'Wir beantworten Deine Fragen'
)
const faqItems = computed(() => derivedContent.value?.items || [])
const openItems = ref<number[]>([])

watch(
  derivedContent,
  () => {
    openItems.value = [...(derivedContent.value?.initiallyOpen || props.initiallyOpen || [])]
  },
  { immediate: true }
)

function isOpen(index: number) {
  return openItems.value.includes(index)
}

function toggleItem(index: number) {
  openItems.value = isOpen(index)
    ? openItems.value.filter((value) => value !== index)
    : [...openItems.value, index]
}
</script>
