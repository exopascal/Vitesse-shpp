<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { ProductHighlightsContent } from '~/utils/productDetailContent'

const props = defineProps<{
  product?: {
    title?: string
  } | null
  content: ProductHighlightsContent
}>()

const sectionRef = ref<HTMLElement | null>(null)
const railRef = ref<HTMLElement | null>(null)
const activeIndex = ref(0)
const isAutoplayActive = ref(false)
const hasCompletedCycle = ref(false)

const autoplayIntervalMs = 4000

let autoplayTimer: ReturnType<typeof setInterval> | null = null
let observer: IntersectionObserver | null = null
let gsapApi: any = null
let scrollTriggerApi: any = null
let railTween: any = null
let autoplayTrigger: any = null

const title = computed(() => props.product?.title || 'T-Apex')
const cards = computed(() => props.content.items || [])

function scrollToCard(index: number, immediate = false) {
  if (!railRef.value) return

  const cardsInRail = railRef.value.querySelectorAll<HTMLElement>('.product-highlights-card')
  const targetCard = cardsInRail[index]

  if (!targetCard) return

  const railBounds = railRef.value.getBoundingClientRect()
  const cardBounds = targetCard.getBoundingClientRect()
  const targetScrollLeft = railRef.value.scrollLeft + (cardBounds.left - railBounds.left)

  railTween?.kill?.()

  if (immediate || !gsapApi) {
    railRef.value.scrollLeft = targetScrollLeft
    return
  }

  railTween = gsapApi.to(railRef.value, {
    scrollLeft: targetScrollLeft,
    duration: 1.1,
    ease: 'power3.inOut',
    overwrite: 'auto',
  })
}

function startAutoplay() {
  if (autoplayTimer || cards.value.length < 2) return

  isAutoplayActive.value = true
  hasCompletedCycle.value = false

  autoplayTimer = setInterval(() => {
    if (activeIndex.value >= cards.value.length - 1) {
      hasCompletedCycle.value = true
      stopAutoplay()
      return
    }

    activeIndex.value += 1
  }, autoplayIntervalMs)
}

function stopAutoplay() {
  isAutoplayActive.value = false

  if (!autoplayTimer) return

  clearInterval(autoplayTimer)
  autoplayTimer = null
}

function goToCard(index: number) {
  activeIndex.value = index
}

function toggleAutoplay() {
  if (hasCompletedCycle.value) {
    activeIndex.value = 0
    nextTick(() => {
      scrollToCard(0, true)
      startAutoplay()
    })
    return
  }

  if (isAutoplayActive.value) {
    stopAutoplay()
    return
  }

  startAutoplay()
}

watch(activeIndex, (index) => {
  scrollToCard(index)
})

onMounted(async () => {
  await nextTick()
  scrollToCard(0, true)

  if (!import.meta.client) return

  try {
    const [{ gsap }, scrollTriggerModule] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ])

    gsapApi = gsap
    scrollTriggerApi = scrollTriggerModule.ScrollTrigger
    gsapApi.registerPlugin(scrollTriggerApi)

    if (sectionRef.value) {
      autoplayTrigger = scrollTriggerApi.create({
        trigger: sectionRef.value,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          startAutoplay()
        },
      })
    }
  } catch {
    if (sectionRef.value) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            startAutoplay()
            observer?.disconnect()
            observer = null
          }
        },
        { threshold: 0.25 }
      )

      observer.observe(sectionRef.value)
    }
  }
})

onBeforeUnmount(() => {
  stopAutoplay()
  observer?.disconnect()
  observer = null
  autoplayTrigger?.kill?.()
  autoplayTrigger = null
  railTween?.kill?.()
  railTween = null
})
</script>

<template>
  <section ref="sectionRef" class="product-highlights-section">
    <div class="product-highlights-container">
      <div class="product-highlights-header">
        <div>
          <p class="product-highlights-kicker">{{ props.content.kicker }}</p>
          <h2 class="product-highlights-title">{{ props.content.title || title }}</h2>
        </div>
        <NuxtLink :to="props.content.ctaHref" class="product-highlights-link">
          {{ props.content.ctaLabel }}
        </NuxtLink>
      </div>

      <div ref="railRef" class="product-highlights-rail">
        <article
          v-for="(card, index) in cards"
          :key="card.body"
          class="product-highlights-card"
          :class="{ 'is-active': index === activeIndex }"
        >
          <div class="product-highlights-card-copy">
            <p class="product-highlights-card-text">{{ card.body }}</p>
          </div>
          <div class="product-highlights-card-media">
            <img class="product-highlights-card-image" :src="card.image" :alt="card.alt" loading="lazy" />
          </div>
        </article>
      </div>

      <div class="product-highlights-controls">
        <div class="product-highlights-dots">
          <button
            v-for="(_, index) in cards"
            :key="index"
            type="button"
            class="product-highlights-dot"
            :class="{
              'is-active': index === activeIndex,
              'is-progressing': index === activeIndex && isAutoplayActive && !hasCompletedCycle,
            }"
            :aria-label="`Gehe zu Highlight ${index + 1}`"
            :aria-pressed="index === activeIndex"
            @click="goToCard(index)"
          ></button>
        </div>
        <button
          type="button"
          class="product-highlights-play"
          :aria-label="
            hasCompletedCycle
              ? 'Slider neu starten'
              : isAutoplayActive
                ? 'Autoplay pausieren'
                : 'Autoplay starten'
          "
          @click="toggleAutoplay"
        >
          <span v-if="hasCompletedCycle" class="product-highlights-restart" aria-hidden="true">
            <span class="product-highlights-restart-arc"></span>
            <span class="product-highlights-restart-head"></span>
          </span>
          <span v-else-if="isAutoplayActive" class="product-highlights-pause" aria-hidden="true">
            <span></span>
            <span></span>
          </span>
          <span v-else class="product-highlights-play-triangle" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.product-highlights-section {
  overflow-x: hidden;
  overflow-y: visible;
  background:
    radial-gradient(circle at top right, rgba(242, 106, 33, 0.14), transparent 22rem),
    linear-gradient(180deg, #efe8dc 0%, #f7f4ef 100%);
  color: #17120d;
}

.product-highlights-container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-width: 1500px;
  height: 80vh;
  height: 80svh;
  margin: 0 auto;
  padding: 1.5rem 1rem;
}

.product-highlights-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  flex: 0 0 15%;
  min-height: 15%;
}

.product-highlights-kicker {
  margin: 0 0 0.4rem;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #7b6e61;
}

.product-highlights-title {
  margin: 0;
  font-size: clamp(2.2rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 0.96;
  text-transform: uppercase;
}

.product-highlights-link {
  color: #f26a21;
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: none;
}

.product-highlights-rail {
  display: grid;
  grid-auto-columns: calc(100% - 12rem);
  grid-auto-flow: column;
  gap: 1.25rem;
  flex: 0 0 calc(80% - 4rem);
  height: calc(80% - 4rem);
  margin: 2rem 0;
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}

.product-highlights-rail::-webkit-scrollbar {
  display: none;
}

.product-highlights-card {
  display: grid;
  grid-template-columns: minmax(0, 35%) minmax(0, 65%);
  align-items: stretch;
  gap: 0;
  min-height: 100%;
  padding: 0;
  border: 1px solid rgba(23, 18, 13, 0.08);
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 16px 36px rgba(23, 18, 13, 0.08);
  overflow: hidden;
}

.product-highlights-card-copy {
  display: flex;
  align-items: center;
  padding: 2rem;
}

.product-highlights-card-text {
  margin: 0;
  font-size: clamp(1.55rem, 2.2vw, 2.35rem);
  font-weight: 700;
  line-height: 1.12;
}

.product-highlights-card-media {
  position: relative;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  min-height: 100%;
  border-top-left-radius: 2rem;
  border-bottom-left-radius: 2rem;
  overflow: hidden;
}

.product-highlights-card-media::before {
  content: '';
  position: absolute;
  inset: auto 12% 6% 12%;
  height: 14%;
  border-radius: 999px;
  background: rgba(242, 106, 33, 0.12);
  filter: blur(24px);
  z-index: 0;
}

.product-highlights-card-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 0;
  object-fit: cover;
  object-position: center center;
}

.product-highlights-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex: 0 0 5%;
  min-height: 5%;
}

.product-highlights-dots {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  min-width: 11.5rem;
  padding: 0.95rem 1.5rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.74);
}

.product-highlights-dot {
  position: relative;
  width: 0.4rem;
  height: 0.4rem;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: rgba(23, 18, 13, 0.3);
  cursor: pointer;
  overflow: hidden;
  transition: width 160ms ease, background 160ms ease;
}

.product-highlights-dot.is-active {
  width: 1.9rem;
  background: rgba(23, 18, 13, 0.12);
}

.product-highlights-dot.is-active::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(23, 18, 13, 0.75);
  transform-origin: left center;
}

.product-highlights-dot.is-progressing::after {
  animation: product-highlights-progress 4000ms linear forwards;
}

.product-highlights-play {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.9rem;
  height: 2.9rem;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.82);
  cursor: pointer;
}

.product-highlights-play-triangle {
  width: 0;
  height: 0;
  margin-left: 0.125rem;
  border-top: 0.45rem solid transparent;
  border-bottom: 0.45rem solid transparent;
  border-left: 0.7rem solid #17120d;
}

.product-highlights-pause {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.product-highlights-pause span {
  display: block;
  width: 0.25rem;
  height: 0.875rem;
  border-radius: 999px;
  background: #17120d;
}

.product-highlights-restart {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.05rem;
  height: 1.05rem;
}

.product-highlights-restart-arc {
  width: 1rem;
  height: 1rem;
  border: 0.16rem solid #17120d;
  border-right-color: transparent;
  border-radius: 50%;
  transform: rotate(-25deg);
}

.product-highlights-restart-head {
  position: absolute;
  top: 0.02rem;
  right: 0.02rem;
  width: 0;
  height: 0;
  border-top: 0.22rem solid transparent;
  border-bottom: 0.22rem solid transparent;
  border-left: 0.32rem solid #17120d;
  transform: rotate(20deg);
}

@keyframes product-highlights-progress {
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
}

@media (max-width: 900px) {
  .product-highlights-card {
    grid-template-columns: 1fr;
    align-items: stretch;
  }

  .product-highlights-card-copy {
    max-width: none;
  }

  .product-highlights-card-media {
    min-height: 12rem;
  }
}

@media (max-width: 640px) {
  .product-highlights-container {
    padding: 1rem;
  }

  .product-highlights-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .product-highlights-title {
    font-size: 2.35rem;
  }

  .product-highlights-rail {
    grid-auto-columns: calc(100% - 3.5rem);
  }

  .product-highlights-card {
    gap: 1.25rem;
  }

  .product-highlights-card-copy {
    padding: 1.25rem;
  }

  .product-highlights-card-text {
    font-size: 1.45rem;
  }

  .product-highlights-card-media {
    min-height: 7rem;
  }

  .product-highlights-card-image {
    border-radius: 0;
  }

  .product-highlights-dots {
    padding: 0.75rem 1rem;
  }

  .product-highlights-play {
    width: 2.75rem;
    height: 2.75rem;
  }
}
</style>
