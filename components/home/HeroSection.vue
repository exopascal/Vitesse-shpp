<template>
  <section
    class="hero-section"
    :class="[
      { 'hero-section-full': fullHeight },
      `hero-section-${sizeVariant}`
    ]"
  >
    <div class="hero-card">
      <video
        v-if="backgroundVideo"
        class="hero-media"
        :poster="backgroundImage || undefined"
        autoplay
        muted
        loop
        playsinline
      >
        <source :src="backgroundVideo" />
      </video>
      <div
        v-else-if="backgroundImage"
        class="hero-media hero-media-image"
        :style="{ backgroundImage: `url('${backgroundImage}')` }"
      ></div>

      <div class="hero-overlay"></div>

      <div class="hero-content">
        <img
          v-if="logoImage"
          :src="logoImage"
          :alt="logoAlt || title"
          class="hero-logo"
          :class="logoClass"
        />
        <p v-if="kicker" class="hero-kicker">{{ kicker }}</p>
        <h1 class="hero-title">{{ title }}</h1>
        <p v-if="text" class="hero-text">{{ text }}</p>
        <GradientButton
          v-if="buttonText && (to || href)"
          :to="to"
          :href="href"
          size="lg"
          :inverse="inverseButton"
          :variant="buttonVariant"
        >
          {{ buttonText }}
        </GradientButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type ButtonVariant = 'default' | 'tapex' | 'torque' | 'exopek' | 'sportreact' | 'witty' | 'tunturi'

withDefaults(defineProps<{
  title: string
  kicker?: string
  text?: string
  backgroundImage?: string
  backgroundVideo?: string
  logoImage?: string
  logoAlt?: string
  logoClass?: string
  buttonText?: string
  to?: string
  href?: string
  inverseButton?: boolean
  buttonVariant?: ButtonVariant
  fullHeight?: boolean
  sizeVariant?: 'default' | 'home'
}>(), {
  kicker: '',
  text: '',
  backgroundImage: '',
  backgroundVideo: '',
  logoImage: '',
  logoAlt: '',
  logoClass: '',
  buttonText: '',
  to: '',
  href: '',
  inverseButton: true,
  buttonVariant: 'default',
  fullHeight: true,
  sizeVariant: 'default'
})
</script>

<style scoped>
.hero-section {
  width: 100%;
}

.hero-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-height: min(72vh, 46rem);
  width: 100%;
  border-radius: 0;
  text-align: center;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    0 24px 48px -30px rgba(15, 23, 42, 0.55);
}

.hero-section-full .hero-card {
  min-height: 100vh;
}

.hero-section-home.hero-section-full .hero-card {
  min-height: 45vh;
}

.hero-media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.hero-media-image {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(6, 16, 29, 0.32), rgba(6, 16, 29, 0.56)),
    linear-gradient(120deg, rgba(10, 86, 146, 0.28), rgba(255, 191, 90, 0.18));
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  padding: 3rem 1.5rem;
  width: 100%;
  pointer-events: auto;
}

.hero-logo {
  display: block;
  width: clamp(8.5rem, 16vw, 12rem);
  height: auto;
}

.hero-kicker {
  margin: 0;
  max-width: 15ch;
  font-size: clamp(2.6rem, 6vw, 6.2rem);
  font-weight: 800;
  line-height: 0.9;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  color: #ffffff;
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.28);
}

.hero-title {
  margin: 0;
  max-width: 40rem;
  font-size: clamp(1rem, 1.8vw, 2rem);
  line-height: 1.35;
  font-weight: 500;
  letter-spacing: -0.04em;
  color: #ffffff;
  text-shadow: 0 4px 18px rgba(0, 0, 0, 0.22);
}

.hero-text {
  margin: 0;
  max-width: 40rem;
  font-size: clamp(0.98rem, 1.55vw, 1.25rem);
  line-height: 1.5;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 4px 18px rgba(0, 0, 0, 0.22);
}

.hero-section-home .hero-kicker {
  max-width: 13ch;
  font-size: clamp(3.1rem, 7vw, 6.8rem);
}

.hero-section-home .hero-title {
  max-width: 40rem;
  font-size: clamp(1rem, 1.8vw, 2rem);
  line-height: 1.35;
  font-weight: 500;
}

.hero-section-home .hero-text {
  max-width: 44rem;
  font-size: clamp(0.92rem, 1.2vw, 1.12rem);
  font-weight: 400;
}

@media (max-width: 640px) {
  .hero-card,
  .hero-section-full .hero-card {
    min-height: 100svh;
  }

  .hero-section-home.hero-section-full .hero-card {
    min-height: 45vh;
  }

  .hero-content {
    padding: 2.5rem 1.25rem;
  }

  .hero-kicker {
    max-width: 100%;
    font-size: clamp(2rem, 10vw, 4rem);
    overflow-wrap: break-word;
  }

  .hero-title {
    font-size: 1rem;
  }

  .hero-text {
    font-size: 1rem;
  }

  .hero-section-home .hero-kicker {
    max-width: 100%;
    font-size: clamp(1.8rem, 8vw, 4.6rem);
    overflow-wrap: break-word;
  }

  .hero-section-home .hero-title {
    max-width: 22rem;
    font-size: clamp(1.35rem, 5.5vw, 2rem);
    overflow-wrap: break-word;
  }

  .hero-section-home .hero-text {
    font-size: 0.9rem;
    font-weight: 400;
  }
}
</style>
