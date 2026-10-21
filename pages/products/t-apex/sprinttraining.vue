<script setup lang="ts">
import tApexJson from '~/content/products/t-apex.json'

const featuresAccordion = tApexJson.featuresAccordion

const siteUrl = (useRuntimeConfig().public.siteUrl as string) || 'https://www.vitesse-sports.de'
const canonical = `${siteUrl}/products/t-apex/sprinttraining`

useSeoMeta({
  title: 'T-Apex Sprinttraining – Seilzugtraining für Beschleunigung, Topspeed & Overspeed',
  description: 'T-Apex im Sprinttraining: Kontrollierter Widerstand und Overspeed-Unterstützung für Start, Beschleunigung und Topspeed – mit Echtzeit-Kraft- und Geschwindigkeitsdaten.',
  ogTitle: 'T-Apex Sprinttraining | Vitesse Sports',
  ogDescription: 'Kontrollierter Widerstand, Overspeed-Unterstützung und Echtzeit-Daten für alle Sprintphasen. T-Apex Sprinttraining für Leichtathleten und Teamsportler.',
  ogType: 'website',
  ogUrl: canonical,
})

useHead({
  link: [{ rel: 'canonical', href: canonical }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'T-Apex Sprinttraining',
        description: 'Kontrolliertes Seilzugtraining für Sprinter – Widerstand, Overspeed und Echtzeit-Feedback.',
        url: canonical,
        isPartOf: { '@type': 'WebSite', url: siteUrl },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'T-Apex', item: `${siteUrl}/products/t-apex` },
          { '@type': 'ListItem', position: 3, name: 'Sprinttraining', item: canonical },
        ],
      }),
    },
  ],
})

const activeFeature = ref(0)

const features = [
  {
    title: '90 kg Höchstwiderstand',
    description: 'Digitaler Zugwiderstand bis 90 kg – stufenlos einstellbar für explosive Starts, maximale Beschleunigung und phasenspezifische Belastung ohne Reibungsverlust.',
    image: 'https://cdn.shopify.com/s/files/1/0347/9214/5029/files/t-apex-produkt-90kg-spitzenwiderstand.jpg?v=1792337202',
    alt: 'Sprinter im Antritt mit T-Apex – 90 kg Spitzenwiderstand',
  },
  {
    title: 'Absolut mobil',
    description: 'Mit eingebauten Rädern und ausziehbarem Griff lässt sich T-Apex in Sekunden transportieren – vom Kraftraum auf den Platz, von der Halle auf die Bahn.',
    image: 'https://cdn.shopify.com/s/files/1/0347/9214/5029/files/t-apex-produkt-absolut-mobil.jpg?v=1792337202',
    alt: 'T-Apex Transport auf der Laufbahn – eingebaute Räder und ausziehbarer Griff',
  },
  {
    title: 'Bis zu zwei Wochen Akkulaufzeit',
    description: 'Der Hochleistungsakku läuft bis zu zwei Wochen ohne Nachladen – für intensive Trainingsblöcke ohne Unterbrechung und ohne Abhängigkeit von Steckdosen.',
    image: 'https://cdn.shopify.com/s/files/1/0347/9214/5029/files/t-apex-produkt-zwei-wochen-akku-kapazitaet.jpg?v=1792337202',
    alt: 'T-Apex Akkulaufzeit zwei Wochen – Athlet im Training',
  },
]

const phases = [
  {
    label: 'Start & Antritt',
    heading: 'Explosive Startpower trainieren',
    body: 'Widerstandsbasierte Starts bauen horizontale Kraftproduktion auf. T-Apex setzt den Reiz präzise dosiert – wiederholbar und ohne Reibungsverlust durch wechselnden Untergrund.',
    image: 'https://cdn.shopify.com/s/files/1/0347/9214/5029/files/t-apex-sprinttraining-startposition.jpg?v=1792333471',
    alt: 'Sprinter in Startposition mit T-Apex Seilzugtraining',
  },
  {
    label: 'Beschleunigung',
    heading: 'Beschleunigungsmechanik gezielt entwickeln',
    body: 'Von 0 bis 30 Meter entscheidet die Kraftkurve. T-Apex erlaubt kontrolliertes Laden durch die gesamte Beschleunigungsphase – mit Echtzeit-Feedback zu Kraft und Leistung pro Schritt.',
    image: 'https://cdn.shopify.com/s/files/1/0347/9214/5029/files/t-apex-sprinttraining-beschleunigung_webp.jpg?v=1792333468',
    alt: 'Sprinter in Beschleunigungsphase mit T-Apex Widerstand',
  },
  {
    label: 'Topspeed',
    heading: 'Maximale Sprintgeschwindigkeit strukturiert trainieren',
    body: 'Im Topspeed-Bereich zählt jede Millisekunde Bodenkontaktzeit. Hochgeschwindigkeitsläufe mit und ohne Unterstützung machen diesen Bereich trainierbar – und messbar.',
    image: 'https://cdn.shopify.com/s/files/1/0347/9214/5029/files/t-apex-sprinttraining-antritt-100-meter_webp.jpg?v=1792333470',
    alt: 'Sprinter bei maximaler Sprintgeschwindigkeit mit T-Apex',
  },
  {
    label: 'Overspeed',
    heading: 'Supramaximale Geschwindigkeit kontrolliert erleben',
    body: 'Mit dem Overspeed-Modus läuft der Athlet schneller als sein freies Maximum. Das trainiert neuromuskuläre Muster bei höherer Schrittfrequenz – strukturiert und sicher dosiert.',
    image: 'https://cdn.shopify.com/s/files/1/0347/9214/5029/files/t-apex-sprinttraining-overspeed.jpg?v=1792333469',
    alt: 'Overspeed Training mit T-Apex assistiertem Sprinten',
  },
]

const dataPoints = [
  { value: 'Geschwindigkeit', desc: 'Splitzeiten und Topspeed je Wiederholung' },
  { value: 'Kraft', desc: 'Zugkraft und horizontale Kraftproduktion' },
  { value: 'Leistung', desc: 'Watt pro Schritt und über die Distanz' },
  { value: 'Symmetrie', desc: 'Links-Rechts-Vergleich der Bewegungsleistung' },
]

const blogPosts = [
  {
    href: '/blog/overspeed-training-wie-es-wirkt-wer-profitiert',
    category: 'Overspeed',
    title: 'Overspeed Training: Wie es wirkt und wer am meisten davon profitiert',
    desc: 'Zwei Studien erklären, was beim assistierten Sprint biomechanisch passiert – und welche Athleten diese Methode am stärksten voranbringt.',
  },
  {
    href: '/blog/seilzugtraining-sprinttraining-widerstand-oder-unterstuetzung',
    category: 'Seilzugtraining',
    title: 'Seilzugtraining: Was Widerstand und Unterstützung in einer Session bewirken',
    desc: 'Zwei kontrollierte Studien zeigen, welche Methode wann einen Akuteffekt hat – und was die Pausenzeit entscheidet.',
  },
  {
    href: '/blog/motorisiertes-widerstandstraining-vs-schlitten-studie',
    category: 'Forschung',
    title: 'Motorisiertes Widerstandstraining vs. klassischer Schlitten',
    desc: 'Eine kontrollierte Studie mit 48 Athleten über 8 Wochen liefert klare Zahlen zum Unterschied.',
  },
]
</script>

<template>
  <div class="sprint-page">

    <!-- Breadcrumb -->
    <nav class="sprint-breadcrumb" aria-label="Breadcrumb">
      <div class="sprint-breadcrumb__inner">
        <NuxtLink to="/">Home</NuxtLink>
        <span aria-hidden="true">›</span>
        <NuxtLink to="/products/t-apex">T-Apex</NuxtLink>
        <span aria-hidden="true">›</span>
        <span>Sprinttraining</span>
      </div>
    </nav>

    <!-- Hero -->
    <section class="sprint-hero">
      <img
        class="sprint-hero__image"
        src="https://cdn.shopify.com/s/files/1/0347/9214/5029/files/t-apex-sprinttraining-antrittsgeschwindigkeit.webp?v=1792333462"
        alt="Sprinter beim T-Apex Sprinttraining – Antrittsgeschwindigkeit"
        fetchpriority="high"
      />
      <div class="sprint-hero__overlay" />
      <div class="sprint-hero__content">
        <div class="sprint-hero__text">
          <p class="sprint-hero__kicker">T-Apex Sprinttraining</p>
          <h1 class="sprint-hero__title">T-Apex Seilzugtraining.<br>Schneller. Messbar. Kontrolliert.</h1>
          <p class="sprint-hero__sub">Kontrollierter Widerstand, Overspeed-Unterstützung und Echtzeit-Daten für alle Sprintphasen – von der Startposition bis zum Topspeed.</p>
          <NuxtLink to="/products/t-apex" class="sprint-hero__cta">Zum T-Apex</NuxtLink>
        </div>
        <div class="sprint-hero__product">
          <img
            src="https://cdn.shopify.com/s/files/1/0347/9214/5029/files/t-apex-produktfoto-freigestellt.png?v=1792334177"
            alt="T-Apex Seilzugsystem freigestellt"
            class="sprint-hero__product-img"
            loading="eager"
          />
        </div>
      </div>
    </section>

    <!-- Features Accordion -->
    <ProductFeaturesAccordion :content="featuresAccordion" />

    <!-- Phasen -->
    <section class="sprint-phases">
      <div class="sprint-phases__inner">
        <header class="sprint-phases__header">
          <p class="sprint-section-kicker">Trainingsstruktur</p>
          <h2 class="sprint-section-title">T-Apex Sprinttraining nach Phase</h2>
          <p class="sprint-section-lead">Jede Sprintphase hat eigene biomechanische Anforderungen. T-Apex lässt sich für jede davon präzise konfigurieren.</p>
        </header>

        <div class="sprint-phases__grid">
          <article
            v-for="phase in phases"
            :key="phase.label"
            class="sprint-phase-card"
          >
            <div class="sprint-phase-card__media">
              <img :src="phase.image" :alt="phase.alt" loading="lazy" />
            </div>
            <div class="sprint-phase-card__body">
              <p class="sprint-phase-card__label">{{ phase.label }}</p>
              <h3 class="sprint-phase-card__title">{{ phase.heading }}</h3>
              <p class="sprint-phase-card__text">{{ phase.body }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Video Coaching -->
    <section class="sprint-coaching">
      <div class="sprint-coaching__inner">
        <div class="sprint-coaching__video-wrap">
          <video
            src="https://cdn.shopify.com/videos/c/vp/decdad182e5b413da217b2c84eb7a239/decdad182e5b413da217b2c84eb7a239.HD-720p-1.6Mbps-98037461.mp4"
            autoplay
            muted
            loop
            playsinline
            class="sprint-coaching__video"
          />
        </div>
        <div class="sprint-coaching__text">
          <p class="sprint-section-kicker">Coaching & Auswertung</p>
          <h2 class="sprint-section-title">Daten, die Trainer brauchen</h2>
          <p class="sprint-coaching__body">T-Apex erfasst jede Wiederholung – Kraft, Geschwindigkeit, Leistung und Symmetrie in Echtzeit. Trainer sehen sofort, ob die Belastung stimmt, und können die nächste Serie gezielt anpassen.</p>
          <ul class="sprint-coaching__list">
            <li v-for="point in dataPoints" :key="point.value">
              <strong>{{ point.value }}</strong> — {{ point.desc }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Antritt Video -->
    <section class="sprint-video-full">
      <video
        src="https://cdn.shopify.com/videos/c/vp/6479400182ff41748a0e526f5b756a3a/6479400182ff41748a0e526f5b756a3a.HD-720p-4.5Mbps-98037460.mp4"
        autoplay
        muted
        loop
        playsinline
        class="sprint-video-full__video"
      />
    </section>

    <!-- Vergleich -->
    <section class="sprint-compare">
      <div class="sprint-compare__inner">
        <header class="sprint-compare__header">
          <p class="sprint-section-kicker">Warum T-Apex</p>
          <h2 class="sprint-section-title">Kontrollierter als Schlitten. Präziser als Bänder.</h2>
        </header>
        <div class="sprint-compare__grid">
          <div class="sprint-compare__card sprint-compare__card--muted">
            <h3>Schlitten</h3>
            <p>Fixes Gewicht, unkonstante Reibung je nach Untergrund, kein Feedback.</p>
          </div>
          <div class="sprint-compare__card sprint-compare__card--muted">
            <h3>Widerstandsbänder</h3>
            <p>Mobil, aber keine präzise Laststeuerung und keine Messdaten.</p>
          </div>
          <div class="sprint-compare__card sprint-compare__card--primary">
            <h3>T-Apex</h3>
            <p>Digitaler Widerstand 0–15 kgf in 0,1-kgf-Schritten. Echtzeit-Kraft, Geschwindigkeit und Leistung. Overspeed bis 14 m/s.</p>
            <NuxtLink to="/products/t-apex" class="sprint-compare__link">Produkt ansehen →</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Aus dem Blog -->
    <section class="sprint-blog">
      <div class="sprint-blog__inner">
        <header class="sprint-blog__header">
          <p class="sprint-section-kicker">Forschung & Praxis</p>
          <h2 class="sprint-section-title">Wissenschaft hinter dem T-Apex Sprinttraining</h2>
        </header>
        <div class="sprint-blog__grid">
          <NuxtLink
            v-for="post in blogPosts"
            :key="post.href"
            :to="post.href"
            class="sprint-blog__card"
          >
            <p class="sprint-blog__category">{{ post.category }}</p>
            <h3 class="sprint-blog__title">{{ post.title }}</h3>
            <p class="sprint-blog__excerpt">{{ post.desc }}</p>
            <span class="sprint-blog__read">Artikel lesen →</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="sprint-cta">
      <div class="sprint-cta__inner">
        <img
          src="https://cdn.shopify.com/s/files/1/0347/9214/5029/files/t-apex-sprinttraining-drei-athleten-startbahn.jpg?v=1792333466"
          alt="Drei Sprinter mit T-Apex auf der Startbahn"
          class="sprint-cta__image"
          loading="lazy"
        />
        <div class="sprint-cta__overlay" />
        <div class="sprint-cta__content">
          <h2 class="sprint-cta__title">Bereit für strukturiertes Sprinttraining?</h2>
          <p class="sprint-cta__sub">T-Apex. Kontrolliert. Messbar. Individuell.</p>
          <div class="sprint-cta__actions">
            <NuxtLink to="/products/t-apex" class="sprint-cta__btn sprint-cta__btn--primary">T-Apex entdecken</NuxtLink>
            <NuxtLink to="/blog" class="sprint-cta__btn sprint-cta__btn--outline">Alle Blogartikel</NuxtLink>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.sprint-page {
  background: var(--color-white);
  color: var(--color-gray-900);
}

/* Breadcrumb */
.sprint-breadcrumb {
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-gray-50);
  border-bottom: 1px solid var(--color-gray-200);
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
}

.sprint-breadcrumb__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.sprint-breadcrumb a {
  color: inherit;
  text-decoration: none;
}

.sprint-breadcrumb a:hover {
  color: var(--color-primary);
}

/* Shared typography */
.sprint-section-kicker {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.sprint-section-title {
  font-size: clamp(1.6rem, 3vw, 2.25rem);
  font-weight: var(--font-weight-bold);
  line-height: 1.15;
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-md);
}

.sprint-section-lead {
  font-size: var(--font-size-lg);
  color: var(--color-gray-600);
  max-width: 640px;
  line-height: 1.6;
}

/* Hero */
.sprint-hero {
  position: relative;
  height: 90vh;
  min-height: 560px;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.sprint-hero__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

.sprint-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 100%);
}

.sprint-hero__content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  color: var(--color-white);
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: var(--spacing-2xl);
  width: 100%;
}

@media (min-width: 768px) {
  .sprint-hero__content {
    grid-template-columns: 1fr 1fr;
  }
}

.sprint-hero__product {
  display: flex;
  align-items: center;
  justify-content: center;
}

.sprint-hero__product-img {
  width: 100%;
  max-width: 720px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 32px 64px rgba(0, 0, 0, 0.6));
}

.sprint-hero__text {
  display: flex;
  flex-direction: column;
}

.sprint-hero__kicker {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
}

.sprint-hero__title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  line-height: 1.05;
  margin-bottom: var(--spacing-lg);
  max-width: 700px;
}

.sprint-hero__sub {
  font-size: var(--font-size-lg);
  color: rgba(255,255,255,0.85);
  max-width: 560px;
  line-height: 1.6;
  margin-bottom: var(--spacing-2xl);
}

.sprint-hero__cta {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-2xl);
  background: var(--color-primary);
  color: var(--color-white);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--border-radius-md);
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.sprint-hero__cta:hover {
  opacity: 0.88;
}

/* Phases */
.sprint-phases {
  padding: var(--spacing-5xl) var(--spacing-lg);
  background: var(--color-white);
}

.sprint-phases__inner {
  max-width: 1200px;
  margin: 0 auto;
}

.sprint-phases__header {
  margin-bottom: var(--spacing-3xl);
}

.sprint-phases__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-xl);
}

@media (min-width: 768px) {
  .sprint-phases__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .sprint-phases__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.sprint-phase-card {
  border-radius: var(--border-radius-2xl);
  overflow: hidden;
  border: 1px solid var(--color-gray-200);
  background: var(--color-white);
  box-shadow: 0 4px 24px rgba(0,0,0,0.05);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.sprint-phase-card:hover {
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.sprint-phase-card__media {
  aspect-ratio: 4/3;
  overflow: hidden;
}

.sprint-phase-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.sprint-phase-card:hover .sprint-phase-card__media img {
  transform: scale(1.04);
}

.sprint-phase-card__body {
  padding: var(--spacing-lg);
}

.sprint-phase-card__label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.sprint-phase-card__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-sm);
  line-height: 1.3;
}

.sprint-phase-card__text {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  line-height: 1.7;
}

/* Coaching */
.sprint-coaching {
  background: #f7f4ef;
  padding: var(--spacing-5xl) var(--spacing-lg);
}

.sprint-coaching__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-3xl);
  align-items: center;
}

@media (min-width: 1024px) {
  .sprint-coaching__inner {
    grid-template-columns: 1fr 1fr;
  }
}

.sprint-coaching__video-wrap {
  border-radius: var(--border-radius-2xl);
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(0,0,0,0.12);
}

.sprint-coaching__video {
  display: block;
  width: 100%;
  height: auto;
}

.sprint-coaching__body {
  font-size: var(--font-size-base);
  color: var(--color-gray-700);
  line-height: 1.7;
  margin-bottom: var(--spacing-xl);
}

.sprint-coaching__list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: var(--spacing-md);
}

.sprint-coaching__list li {
  font-size: var(--font-size-sm);
  color: var(--color-gray-700);
  padding-left: var(--spacing-md);
  border-left: 2px solid var(--color-primary);
  line-height: 1.6;
}

.sprint-coaching__list strong {
  color: var(--color-gray-900);
}

/* Full-width video */
.sprint-video-full {
  background: #000;
  overflow: hidden;
}

.sprint-video-full__video {
  display: block;
  width: 100%;
  max-height: 70vh;
  object-fit: cover;
}

/* Compare */
.sprint-compare {
  padding: var(--spacing-5xl) var(--spacing-lg);
  background: var(--color-white);
}

.sprint-compare__inner {
  max-width: 1200px;
  margin: 0 auto;
}

.sprint-compare__header {
  margin-bottom: var(--spacing-3xl);
}

.sprint-compare__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
}

@media (min-width: 768px) {
  .sprint-compare__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.sprint-compare__card {
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-2xl);
  border: 1px solid var(--color-gray-200);
}

.sprint-compare__card h3 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-md);
}

.sprint-compare__card p {
  font-size: var(--font-size-sm);
  line-height: 1.7;
}

.sprint-compare__card--muted {
  background: var(--color-gray-50);
  color: var(--color-gray-600);
}

.sprint-compare__card--muted h3 {
  color: var(--color-gray-700);
}

.sprint-compare__card--primary {
  background: var(--color-gray-900);
  color: var(--color-white);
  border-color: transparent;
}

.sprint-compare__card--primary h3 {
  color: var(--color-white);
}

.sprint-compare__card--primary p {
  color: rgba(255,255,255,0.8);
}

.sprint-compare__link {
  display: inline-block;
  margin-top: var(--spacing-lg);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  text-decoration: none;
}

.sprint-compare__link:hover {
  text-decoration: underline;
}

/* Blog */
.sprint-blog {
  padding: var(--spacing-5xl) var(--spacing-lg);
  background: var(--color-gray-50);
  border-top: 1px solid var(--color-gray-200);
}

.sprint-blog__inner {
  max-width: 1200px;
  margin: 0 auto;
}

.sprint-blog__header {
  margin-bottom: var(--spacing-3xl);
}

.sprint-blog__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
}

@media (min-width: 768px) {
  .sprint-blog__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.sprint-blog__card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding: var(--spacing-xl);
  background: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius-xl);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.sprint-blog__card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
}

.sprint-blog__category {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-primary);
}

.sprint-blog__title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  line-height: 1.4;
  overflow-wrap: break-word;
}

.sprint-blog__excerpt {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  line-height: 1.6;
  flex: 1;
}

.sprint-blog__read {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin-top: auto;
}

/* CTA */
.sprint-cta {
  position: relative;
  overflow: hidden;
  min-height: 480px;
  display: flex;
  align-items: center;
}

.sprint-cta__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sprint-cta__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.45) 100%);
}

.sprint-cta__inner {
  position: relative;
  width: 100%;
}

.sprint-cta__content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-5xl) var(--spacing-lg);
  color: var(--color-white);
}

.sprint-cta__title {
  font-size: clamp(1.8rem, 4vw, 2.75rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: var(--spacing-md);
}

.sprint-cta__sub {
  font-size: var(--font-size-lg);
  color: rgba(255,255,255,0.8);
  margin-bottom: var(--spacing-2xl);
}

.sprint-cta__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.sprint-cta__btn {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-2xl);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.sprint-cta__btn:hover {
  opacity: 0.88;
}

.sprint-cta__btn--primary {
  background: var(--color-primary);
  color: var(--color-white);
}

.sprint-cta__btn--outline {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.6);
  color: var(--color-white);
}

/* ── Features Accordion ── */
.sprint-spec {
  background: #111;
  color: var(--color-white);
  padding: var(--spacing-3xl) var(--spacing-lg);
}

.sprint-spec__outer {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

/* Image card container */
.sprint-spec__card {
  position: relative;
  overflow: hidden;
  border-radius: var(--border-radius-2xl);
  min-height: 480px;
  display: flex;
  align-items: center;
}

/* Images stacked inside card */
.sprint-spec__img-wrap {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.55s ease;
}

.sprint-spec__img-wrap.is-visible {
  opacity: 1;
}

.sprint-spec__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Dark gradient over left portion of card */
.sprint-spec__gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.88) 0%,
    rgba(0, 0, 0, 0.72) 35%,
    rgba(0, 0, 0, 0.15) 60%,
    transparent 80%
  );
  z-index: 1;
}

/* Accordion overlay inside card */
.sprint-spec__content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  padding: var(--spacing-3xl) var(--spacing-2xl);
  width: 100%;
  max-width: 460px;
}

.sprint-spec__label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-primary);
  padding-left: var(--spacing-xs);
}

.sprint-spec__items {
  display: flex;
  flex-direction: column;
}

.sprint-spec__item {
  all: unset;
  cursor: pointer;
  display: block;
  padding: var(--spacing-lg) 0;
  border-top: 1px solid rgba(255,255,255,0.15);
  text-align: left;
}

.sprint-spec__item:last-child {
  border-bottom: 1px solid rgba(255,255,255,0.15);
}

.sprint-spec__item-title {
  display: block;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: rgba(255,255,255,0.4);
  transition: color 0.25s ease;
  line-height: 1.3;
}

.sprint-spec__item.is-active .sprint-spec__item-title {
  color: var(--color-white);
}

.sprint-spec__item-desc {
  margin-top: var(--spacing-sm);
  font-size: var(--font-size-sm);
  line-height: 1.7;
  color: rgba(255,255,255,0.7);
  max-width: 360px;
}

/* Desc transition */
.spec-desc-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.spec-desc-leave-active {
  transition: opacity 0.15s ease;
}
.spec-desc-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.spec-desc-leave-to {
  opacity: 0;
}
</style>
