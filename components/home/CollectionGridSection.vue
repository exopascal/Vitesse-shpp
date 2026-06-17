<template>
  <section class="brand-collection-section">
    <div class="brand-collection-grid">
      <article
        v-for="card in cards"
        :key="card.title"
        class="brand-collection-card"
        :style="cardStyle(card)"
      >
        <div class="brand-collection-overlay">
          <div class="brand-collection-copy">
            <div class="brand-collection-logo" :aria-label="card.logoAlt || card.title">
              <img
                v-if="card.logoImage"
                :src="card.logoImage"
                :alt="card.logoAlt || card.title"
                class="brand-collection-logo-image"
                :class="card.logoClass"
              />
              <template v-else>
                {{ card.title }}
              </template>
            </div>
            <h2 class="brand-collection-title">
              {{ card.title }}
            </h2>
            <p v-if="card.meta" class="brand-collection-meta">
              {{ card.meta }}
            </p>
            <p class="brand-collection-text">
              {{ card.text }}
            </p>
            <GradientButton
              :to="card.to"
              size="lg"
              :variant="card.buttonVariant"
            >
              {{ card.buttonText || 'Jetzt entdecken' }}
            </GradientButton>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
type ButtonVariant = 'default' | 'tapex' | 'torque' | 'exopek' | 'sportreact' | 'witty' | 'tunturi'

type GridCard = {
  title: string
  text: string
  to: string
  backgroundImage: string
  backgroundSize?: string
  backgroundPosition?: string
  meta?: string
  buttonVariant?: ButtonVariant
  buttonText?: string
  logoImage?: string
  logoAlt?: string
  logoClass?: string
  overlayStrength?: 'default' | 'strong'
  accentGradient?: string
}

const props = defineProps<{
  cards: GridCard[]
}>()

const cardStyle = (card: GridCard) => {
  const darkOverlay = card.overlayStrength === 'strong'
    ? 'rgba(6, 16, 29, 0.26), rgba(6, 16, 29, 0.68)'
    : 'rgba(6, 16, 29, 0.22), rgba(6, 16, 29, 0.62)'

  const accentGradient = card.accentGradient || 'rgba(210, 180, 55, 0.08), rgba(210, 180, 55, 0.16)'

  return {
    background: [
      `linear-gradient(180deg, ${darkOverlay})`,
      `linear-gradient(120deg, ${accentGradient})`,
      `url('${card.backgroundImage}') ${card.backgroundPosition || 'center center'} / ${card.backgroundSize || 'cover'} no-repeat`
    ].join(', ')
  }
}
</script>

<style scoped>
.brand-collection-section {
  padding: 0 1.5rem;
  margin: 0;
}

.brand-collection-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.brand-collection-card {
  min-height: min(84vh, 58rem);
  position: relative;
  overflow: hidden;
  background-color: #0f172a;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 24px 48px -30px rgba(15, 23, 42, 0.45);
}

.brand-collection-overlay {
  min-height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 1.5rem;
  text-align: center;
  pointer-events: auto;
}

.brand-collection-copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.1rem;
  max-width: 29rem;
}

.brand-collection-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.55rem;
  color: #ffffff;
}

.brand-collection-logo-image {
  display: block;
  width: clamp(8rem, 14vw, 12rem);
  height: auto;
}


.brand-collection-title {
  margin: 0;
  max-width: 15ch;
  font-size: clamp(2rem, 3vw, 3rem);
  line-height: 1.08;
  letter-spacing: -0.04em;
  color: #ffffff;
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.32);
}

.brand-collection-text {
  margin: 0;
  max-width: 28rem;
  font-size: clamp(1rem, 1.7vw, 1.45rem);
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 4px 18px rgba(0, 0, 0, 0.24);
}

.brand-collection-meta {
  margin: -0.2rem 0 0;
  font-size: clamp(1rem, 1.3vw, 1.25rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: rgba(255, 255, 255, 0.94);
  text-shadow: 0 4px 18px rgba(0, 0, 0, 0.24);
}

@media (max-width: 640px) {
  .brand-collection-section {
    padding: 0 1rem;
    margin-bottom: 0;
  }

  .brand-collection-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .brand-collection-card {
    min-height: 34rem;
  }

  .brand-collection-overlay {
    padding: 2.25rem 1.25rem;
  }

  .brand-collection-title {
    font-size: clamp(1.9rem, 9vw, 2.8rem);
  }

  .brand-collection-text {
    font-size: 1rem;
  }

  .brand-collection-meta {
    font-size: 1rem;
  }
}
</style>
