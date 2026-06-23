<template>
  <main class="home-page">
    <HeroSection
      kicker="Spitzenprodukte. Spitzenleistung."
      title="Unser Equipment steht für Leistungssteigerung und erhöhte Performance."
      background-image="/spitzenprodukte-sprinttraining-widerstandstraining-speedtraining.jpg"
      button-text="Jetzt entdecken"
      to="/collections/widerstandstraining"
      size-variant="home"
    />

    <section class="brand-strip-section" aria-label="Unsere Marken">
      <div class="brand-strip-column">
        <component
          v-for="brand in homeBrands"
          :key="brand.slug"
          :is="brand.url ? NuxtLink : 'span'"
          :to="brand.url"
          class="brand-strip-logo"
          :class="[
            `brand-strip-logo-${brand.slug}`,
            { 'brand-strip-logo-link': brand.url }
          ]"
        >
          <img
            v-if="brand.image"
            :src="brand.image"
            :alt="brand.name"
            class="brand-strip-logo-image"
            :class="brand.imageClass"
          />
          <template v-else>
            {{ brand.name }}
          </template>
        </component>
      </div>
    </section>

    <section class="intro-section">
      <div class="intro-card">
        <div class="intro-copy">
          <h2 class="intro-title">
            <span class="intro-title-static">Equipment für</span>
            <span class="intro-rotator">
              <Transition name="rotating-word" mode="out-in">
                <span :key="activeIntroWord" class="intro-rotating-word">
                  {{ activeIntroWord }}
                </span>
              </Transition>
            </span>
          </h2>
          <p class="intro-subhead">
            Sportausrüstung für Widerstandstraining, Sprinttraining und präzise
            Zeitmessung im modernen Athletiktraining.
          </p>
          <p class="intro-text">
            Moderne Trainingssysteme ermöglichen es, Geschwindigkeit, Kraft und
            Reaktionsfähigkeit gezielt zu verbessern und im entscheidenden
            Moment das letzte Prozent Leistung herauszuholen. Produkte von
            Vitesse kommen im Athletiktraining, im Leistungs- und Spitzensport
            sowie in Olympiastützpunkten zum Einsatz. Entwickelt für maximale
            Performance und messbare Fortschritte im Training.
          </p>
        </div>

        <div class="intro-links">
          <NuxtLink to="/products" class="gradient-text-link">
            Unsere Produkte
          </NuxtLink>
          <NuxtLink to="/collections" class="gradient-text-link">
            Unsere Marken
          </NuxtLink>
        </div>
      </div>
    </section>

    <CollectionFeatureSection
      v-for="feature in featureSections"
      :key="feature.title"
      v-bind="feature"
    />

    <CollectionGridSection
      v-for="(section, index) in collectionGridSections"
      :key="index"
      :cards="section"
    />

  </main>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, resolveComponent } from 'vue'

useSeoMeta({
  title: 'Premium Trainingsgeräte für Spitzenleistung',
  description: 'Vitesse Sports – Equipment für Sprinttechnik, Overspeed Training und Widerstandstraining. T-APEX, Torque Tank MX und mehr. Jetzt entdecken.',
  ogTitle: 'Vitesse Sports | Premium Trainingsgeräte',
  ogDescription: 'Equipment für Sprinttechnik, Overspeed Training und Widerstandstraining. Entdecke T-APEX, Torque Tank MX und mehr.',
  ogImage: '/spitzenprodukte-sprinttraining-widerstandstraining-speedtraining.jpg',
  ogUrl: 'https://checkout.vitesse-sports.de',
})

// Aufgelöste Komponente statt String 'NuxtLink' (siehe GradientButton): der
// String wird von <component :is> nicht aufgelöst und bliebe ohne Navigation.
const NuxtLink = resolveComponent('NuxtLink')

type ButtonVariant = 'default' | 'tapex' | 'torque' | 'exopek' | 'sportreact' | 'witty' | 'tunturi'
type FeatureSection = {
  backgroundImage: string
  title: string
  text: string
  to: string
  buttonVariant: ButtonVariant
  logoImage: string
  logoAlt: string
  logoClass?: string
  overlayStrength?: 'default' | 'strong'
  accentGradient?: string
}
type GridCard = {
  backgroundImage: string
  backgroundSize?: string
  backgroundPosition?: string
  title: string
  text: string
  to: string
  buttonVariant: ButtonVariant
  logoImage: string
  logoAlt: string
  logoClass?: string
  overlayStrength?: 'default' | 'strong'
  accentGradient?: string
}

const homeBrands = [
  { name: 'T-APEX', slug: 'tapex', image: '/t-apex-logo.png.avif', imageClass: 'brand-strip-logo-image-tapex', url: '/products?collection=sprinttraining&q=t-apex' },
  { name: 'TORQUE', slug: 'torque', image: '/Torque_USA_black-orange_2000x.png.webp', imageClass: 'brand-strip-logo-image-torque', url: '/products?q=torque' },
  { name: 'EXOPEK', slug: 'exopek', image: '/Exopek_Logo_horizontal-Wortmarke-bildmarke_schwarz.png', imageClass: 'brand-strip-logo-image-exopek', url: '/products?q=exopek' },
  { name: 'SPORTREACT', slug: 'sportreact', image: '/sportreact-logo.png', imageClass: 'brand-strip-logo-image-sportreact', url: '/products?q=sportreact' },
  { name: 'HP COSMOS', slug: 'hp-cosmos', image: '/hp-cosmos-logo.png', imageClass: 'brand-strip-logo-image-hp-cosmos', url: '/products?q=hp%20cosmos' },
]
const introWords = [
  'Spitzensport.',
  'Fitness.',
  'Olympiastützpunkte.',
  'Vereine.',
]
const featureSections: FeatureSection[] = [
  {
    backgroundImage: '/t-apex-zugwiderstandtraining-sprinttraining.jpg',
    title: 'Die Zukunft des Seilzugtrainings',
    text: 'Trainiere Smart und Dynamisch. Steigert Deine Leistung messbar.',
    to: '/products/t-apex',
    buttonVariant: 'tapex',
    logoImage: '/t-apex-logo.weiss.svg',
    logoAlt: 'T-APEX',
    logoClass: 'feature-brand-image-tapex'
  },
    {
      backgroundImage: '/torque-widerstandstraining-schlittentraining.jpg',
      title: 'Beladbarer Schlitten auf Rädern.',
      text: 'Maximale Belastung - stufenloser Widerstand. Auf jedem Untergrund.',
      to: '/collections/torque',
      buttonVariant: 'torque',
      logoImage: '/Torque_USA_weiß-orange_2000x.webp',
      logoAlt: 'TORQUE',
      overlayStrength: 'strong' as const,
      accentGradient: 'rgba(236, 106, 41, 0.08), rgba(236, 106, 41, 0.14)'
  }
]
const collectionGridSections: GridCard[][] = [
  [
    {
      backgroundImage: '/sportreact-reaktionsgeschwindigkeit-laser-gates.jpg',
      title: 'Reagiere schneller. Klüger. Smarter.',
      text: 'Trainiere Wahrnehmung und Reaktion mit intelligentem Licht-, Sound- und Vibrationsfeedback.',
      to: '/collections/sportreact',
      buttonVariant: 'sportreact',
      logoImage: '/sportreact-logo.png',
      logoAlt: 'SPORTREACT'
    },
    {
      backgroundImage: '/exopek-widerstandstraining-performance-widerstandsbaender.jpg',
      title: 'Maximaler Widerstand. In jeder Bewegung.',
      text: 'Mehr Kraft, Kontrolle und Explosivität. Das Powerhouse auf deinem Rücken.',
      to: '/products/exopek-pro',
      buttonVariant: 'exopek',
      logoImage: '/Exopek_Logo_Wortmarke-Bildmarke_weiss.png',
      logoAlt: 'EXOPEK',
      overlayStrength: 'strong' as const,
      accentGradient: 'rgba(187, 54, 48, 0.08), rgba(187, 54, 48, 0.14)'
    }
  ],
  [
    {
      backgroundImage: '/zeitmessung-witty-microgate-lichtschranke.jpg',
      title: 'Präzise Zeitmessung.',
      text: 'Millisekundengenaue Erfassung und innovative Sensorik.',
      to: '/collections/witty',
      buttonVariant: 'witty',
      logoImage: '/hp-cosmos-logo.png',
      logoAlt: 'HP Cosmos',
      overlayStrength: 'strong' as const,
      accentGradient: 'rgba(44, 113, 184, 0.08), rgba(44, 113, 184, 0.18)'
    },
    {
      backgroundImage: '/tunturi-schlittentraining-power.jpg',
      backgroundSize: '145%',
      backgroundPosition: 'center center',
      title: 'Maximale Vielseitigkeit für Training & Reha.',
      text: 'Klassisches Lauftraining, Power-Schlitten-Modus und Reha-Programme in einem Gerät.',
      to: '/products/tunturi-platinum-tr30-core-treadmill',
      buttonVariant: 'tunturi',
      logoImage: '/tunturi-logo.png',
      logoAlt: 'TUNTURI',
      overlayStrength: 'strong' as const,
      accentGradient: 'rgba(37, 99, 43, 0.08), rgba(37, 99, 43, 0.16)'
    }
  ]
]
const activeIntroWordIndex = ref(0)
let introWordTimer: ReturnType<typeof setInterval> | null = null

const activeIntroWord = computed(() => introWords[activeIntroWordIndex.value] ?? introWords[0])
onMounted(() => {
  introWordTimer = setInterval(() => {
    activeIntroWordIndex.value = (activeIntroWordIndex.value + 1) % introWords.length
  }, 2200)
})

onBeforeUnmount(() => {
  if (introWordTimer) {
    clearInterval(introWordTimer)
  }
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  padding: 0 0 4rem;
  background:
    radial-gradient(circle at top left, rgba(34, 197, 94, 0.14), transparent 28rem),
    linear-gradient(180deg, #f7fbf8 0%, #ffffff 100%);
}

.brand-strip-section {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem 1.5rem;
}

.brand-strip-column {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1.25rem 2.25rem;
}

.brand-strip-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #0f172a;
  opacity: 1;
  white-space: nowrap;
  text-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
  transition: transform 180ms ease, filter 180ms ease;
  cursor: default;
}

.brand-strip-logo-link {
  cursor: pointer;
}

.brand-strip-logo-image {
  display: block;
  max-width: 100%;
  height: auto;
  opacity: 1;
  filter: grayscale(1) saturate(0);
}

.brand-strip-logo-image-tapex {
  width: clamp(8rem, 14vw, 11rem);
}

.brand-strip-logo-image-hp-cosmos {
  width: clamp(8.5rem, 13vw, 10.5rem);
}

.brand-strip-logo-image-exopek {
  width: clamp(8rem, 12vw, 9.5rem);
}

.brand-strip-logo-image-torque {
  width: clamp(8rem, 13vw, 10.5rem);
}

.brand-strip-logo-image-sportreact {
  width: clamp(10rem, 16vw, 13rem);
}

.brand-strip-logo-link:hover {
  transform: translateY(-1px);
}

.brand-strip-logo-link:hover .brand-strip-logo-image {
  filter: grayscale(0) saturate(1);
}

.brand-strip-logo-tapex {
  padding-inline: 0.25rem;
}

.eyebrow {
  margin: 0 0 0.75rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #15803d;
}

.products-section {
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.intro-section {
  padding: 0 1.5rem;
  margin: 0 0 4rem;
}

.intro-card {
  max-width: 62rem;
  margin: 0 auto;
  padding: 0.5rem 1.5rem 0;
  text-align: center;
}

.intro-copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.intro-eyebrow {
  margin: 0;
  font-size: 0.72rem;
  line-height: 1.4;
  color: #4b5563;
}

.intro-title {
  margin: 0;
  max-width: 28ch;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15em;
  font-size: clamp(1.9rem, 3.8vw, 2.9rem);
  line-height: 0.98;
  letter-spacing: -0.04em;
  color: #0f172a;
  font-weight: 700;
}

.intro-title-static {
  display: block;
}

.intro-rotator {
  display: grid;
  min-width: 14ch;
  min-height: 1.1em;
  place-items: center;
  text-align: center;
}

.intro-rotating-word {
  display: inline-block;
  font-weight: 800;
  background: linear-gradient(120deg, #0f5e9c 0%, #66b3f3 56%, #ffbf5a 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.intro-subhead {
  margin: 0;
  max-width: 48rem;
  font-size: clamp(1.08rem, 1.8vw, 1.42rem);
  line-height: 1.45;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #1f2937;
}

.intro-text {
  margin: 1rem 0 0;
  max-width: 43rem;
  font-size: 1.08rem;
  line-height: 1.65;
  color: #9ca3af;
}

.intro-links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  justify-content: center;
  gap: 2.5rem;
  margin-top: 2rem;
}

.gradient-text-link {
  font-weight: 700;
  text-decoration: none;
  background: linear-gradient(120deg, #0f5e9c 0%, #66b3f3 56%, #ffbf5a 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.gradient-text-link::after {
  content: ' >';
}

.rotating-word-enter-active,
.rotating-word-leave-active {
  transition: opacity 220ms ease, transform 220ms ease;
}

.rotating-word-enter-from {
  opacity: 0;
  transform: translateY(0.35em);
}

.rotating-word-leave-to {
  opacity: 0;
  transform: translateY(-0.2em);
}

.feature-section + .feature-section,
.feature-section + .brand-collection-section,
.brand-collection-section + .brand-collection-section,
.brand-collection-section + .products-section {
  margin-top: 0.75rem;
}

.section-header {
  margin-bottom: 1.5rem;
}

.section-header h2 {
  margin: 0;
  font-size: clamp(1.7rem, 3vw, 2.5rem);
  color: #111827;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1.25rem;
}

.state-card {
  padding: 1.25rem 1.5rem;
  border: 1px solid #d1d5db;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.9);
  color: #1f2937;
}

.state-card-error {
  border-color: #fecaca;
  background: #fff1f2;
  color: #b91c1c;
}

@media (max-width: 640px) {
  .home-page {
    padding-left: 0;
    padding-right: 0;
  }

  .brand-strip-section {
    padding: 1rem;
  }

  .brand-strip-column {
    gap: 0.85rem 1.35rem;
  }

  .brand-strip-logo-torque {
    font-size: clamp(1.5rem, 8vw, 2rem);
  }

  .brand-strip-logo-sportreact {
    font-size: clamp(1.75rem, 11vw, 2.6rem);
  }

  .intro-section {
    padding: 0 1rem;
    margin-bottom: 3rem;
  }

  .intro-card {
    padding: 0.25rem 0 0;
  }

  .intro-title {
    font-size: clamp(1.9rem, 9vw, 2.5rem);
  }

  .intro-rotator {
    min-width: 0;
    text-align: center;
  }

  .intro-text {
    font-size: 1rem;
  }

  .intro-subhead {
    font-size: 1.05rem;
  }

  .intro-links {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }

  .products-section {
    padding: 0 1rem;
  }

}
</style>
