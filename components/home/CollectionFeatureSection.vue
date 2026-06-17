<template>
  <section class="feature-section">
    <div class="feature-card" :style="cardStyle">
      <div class="feature-overlay">
        <div class="feature-brand" :aria-label="logoAlt || title">
          <img
            v-if="logoImage"
            :src="logoImage"
            :alt="logoAlt || title"
            class="feature-brand-image"
            :class="logoClass"
          />
          <template v-else>
            {{ title }}
          </template>
        </div>

        <div class="feature-copy">
          <h2 class="feature-title">{{ title }}</h2>
          <p class="feature-text">
            {{ text }}
          </p>
          <GradientButton
            :to="to"
            size="lg"
            :variant="buttonVariant"
          >
            {{ buttonText }}
          </GradientButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ButtonVariant = 'default' | 'tapex' | 'torque' | 'exopek' | 'sportreact' | 'witty' | 'tunturi'

const props = withDefaults(defineProps<{
  backgroundImage: string
  title: string
  text: string
  to: string
  buttonVariant?: ButtonVariant
  buttonText?: string
  logoImage?: string
  logoAlt?: string
  logoClass?: string
  overlayStrength?: 'default' | 'strong'
  accentGradient?: string
}>(), {
  buttonVariant: 'default',
  buttonText: 'Jetzt entdecken',
  logoImage: '',
  logoAlt: '',
  logoClass: '',
  overlayStrength: 'default',
  accentGradient: 'rgba(10, 86, 146, 0.14), rgba(255, 191, 90, 0.12)'
})

const darkOverlay = computed(() => (
  props.overlayStrength === 'strong'
    ? 'rgba(6, 16, 29, 0.3), rgba(6, 16, 29, 0.62)'
    : 'rgba(6, 16, 29, 0.28), rgba(6, 16, 29, 0.58)'
))

const cardStyle = computed(() => ({
  background: [
    `linear-gradient(180deg, ${darkOverlay.value})`,
    `linear-gradient(120deg, ${props.accentGradient})`,
    `url('${props.backgroundImage}') center center / cover no-repeat`
  ].join(', ')
}))
</script>

<style scoped>
.feature-section {
  width: 100%;
  margin: 0;
}

.feature-card {
  position: relative;
  width: 100%;
  min-height: min(72vh, 46rem);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 24px 48px -30px rgba(15, 23, 42, 0.45);
}

.feature-overlay {
  position: relative;
  z-index: 1;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 3rem 1.5rem;
  text-align: center;
  pointer-events: auto;
}

.feature-brand {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  color: #ffffff;
}

.feature-brand-image {
  display: block;
  width: clamp(8.5rem, 16vw, 12rem);
  height: auto;
}

.feature-brand-image-tapex {
  width: clamp(6.5rem, 12vw, 9rem);
}

.feature-copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 2;
}

.feature-title {
  margin: 0;
  max-width: 15ch;
  font-size: clamp(2.2rem, 5vw, 4rem);
  line-height: 1.05;
  letter-spacing: -0.04em;
  color: #ffffff;
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.feature-text {
  margin: 0;
  max-width: 40rem;
  font-size: clamp(1rem, 1.8vw, 1.6rem);
  line-height: 1.4;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 4px 18px rgba(0, 0, 0, 0.28);
}

@media (max-width: 640px) {
  .feature-card {
    min-height: auto;
  }

  .feature-overlay {
    padding: 2.5rem 1.25rem;
  }

  .feature-title {
    max-width: 11ch;
    font-size: clamp(2rem, 9vw, 3rem);
  }

  .feature-text {
    font-size: 1rem;
  }
}
</style>
