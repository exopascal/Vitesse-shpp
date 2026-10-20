<script setup lang="ts">
import tApexJson from '~/content/products/t-apex.json'

const featuresAccordion = tApexJson.featuresAccordion

const siteUrl = (useRuntimeConfig().public.siteUrl as string) || 'https://www.vitesse-sports.de'
const canonical = `${siteUrl}/products/t-apex/fussball`

useSeoMeta({
  title: 'T-Apex Fußballtraining – Seilzugtraining für Antritt, Lateralität & Richtungswechsel',
  description: 'T-Apex im Fußball: Positionsspezifisches Seilzugtraining für Beschleunigung, Lateralbewegung und Richtungswechsel – mit Echtzeit-Kraft- und Geschwindigkeitsdaten.',
  ogTitle: 'T-Apex Fußballtraining | Vitesse Sports',
  ogDescription: 'Kontrollierter Widerstand für alle spielrelevanten Schnelligkeitsmuster im Fußball. T-Apex – messbar, positionsspezifisch, feldtauglich.',
  ogType: 'website',
  ogUrl: canonical,
})

useHead({
  link: [{ rel: 'canonical', href: canonical }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'T-Apex Fußballtraining',
      description: 'Seilzugtraining für Fußball – Antritt, Lateralität, Richtungswechsel und positionsspezifische Schnelligkeit mit T-Apex.',
      url: canonical,
      isPartOf: { '@type': 'WebSite', url: siteUrl },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'T-Apex', item: `${siteUrl}/products/t-apex` },
          { '@type': 'ListItem', position: 3, name: 'Fußballtraining', item: canonical },
        ],
      },
    }),
  }],
})

const drills = [
  {
    label: 'Lineare Beschleunigung',
    heading: 'Explosiver Antritt aus dem Stand',
    body: 'Antritte auf 5–20 m sind die häufigste Schnelligkeitsanforderung im Fußball. T-Apex belastet diese Phase mit konstantem Zugwiderstand – messbar in Kraft pro Schritt und Antrittsqualität über Wiederholungen.',
    image: 'https://cdn.shopify.com/s/files/1/0347/9214/5029/files/t-apex-fussball-antritt_webp.jpg?v=1792333469',
    alt: 'Fußballer im explosiven Antritt mit T-Apex Zugwiderstand',
  },
  {
    label: 'Lateralbewegung',
    heading: 'Seitwärtsbewegung unter Widerstand',
    body: 'Seitwärtsbewegungen sind im Fußball spielentscheidend – Pressing, Verschieben, Zweikämpfe auf dem Flügel. T-Apex macht laterale Kraft messbar und zeigt Asymmetrien zwischen rechts und links.',
    image: 'https://cdn.shopify.com/s/files/1/0347/9214/5029/files/t-apex-fussball-richtungswechsel_webp.jpg?v=1792333469',
    alt: 'Fußballer in Lateralbewegung mit T-Apex Seilzugtraining',
  },
  {
    label: 'Richtungswechsel',
    heading: 'Abbremsen und sofort neubeschleunigen',
    body: 'Richtungswechsel beginnen mit einem Bremsvorgang. T-Apex provoziert exzentrischen Krafteinsatz beim Abbremsen und macht die anschließende Neubeschleunigung direkt vergleichbar – Sprint für Sprint.',
    image: 'https://cdn.shopify.com/s/files/1/0347/9214/5029/files/t-apex-fussball-richtungswechsel_webp.jpg?v=1792333469',
    alt: 'Richtungswechsel-Training mit T-Apex auf dem Fußballplatz',
  },
  {
    label: 'Wiederholungssprints',
    heading: 'Qualität über die gesamte Serie halten',
    body: 'Außenspieler und Stürmer müssen nach kurzen Pausen wieder maximal beschleunigen. T-Apex dokumentiert den Leistungsabfall über eine Serie und zeigt, wann die Qualität nachlässt.',
    image: 'https://cdn.shopify.com/s/files/1/0347/9214/5029/files/t-apex-fussball-coaching-junior_webp.jpg?v=1792333470',
    alt: 'Junioren im Fußball-Wiederholungssprint-Training mit T-Apex',
  },
]

const positions = [
  {
    name: 'Außenspieler',
    focus: 'Beschleunigung & Wiederholungssprints – aus dem Zweikampf heraus und auf dem Flügel',
    icon: '⚡',
  },
  {
    name: 'Mittelfeldspieler',
    focus: 'Richtungswechsel, Neubeschleunigung & Pressing-Läufe auf engem Raum',
    icon: '🔄',
  },
  {
    name: 'Innenverteidiger',
    focus: 'Kurzraum-Antritt & Bremskontrolle bei Zweikämpfen und Herauslaufen',
    icon: '🛡',
  },
  {
    name: 'Stürmer',
    focus: 'Explosive Tiefenläufe & Antritte in Kontersituationen',
    icon: '🎯',
  },
]

const dataPoints = [
  { value: 'Geschwindigkeit', desc: 'Splitzeiten und Topspeed je Sprint' },
  { value: 'Kraft', desc: 'Zugkraft und horizontale Kraftproduktion pro Schritt' },
  { value: 'Leistung', desc: 'Watt-Verlauf über die Distanz' },
  { value: 'Symmetrie', desc: 'Links-Rechts-Vergleich für Lateral- und Antrittsbewegungen' },
]

const blogPosts = [
  {
    href: '/blog/seilzugtraining-fussball-beschleunigung-lateral-richtungswechsel',
    category: 'Fußball',
    title: 'Seilzugtraining im Fußball: Beschleunigung, Lateralität und Richtungswechsel',
    desc: 'Wie T-Apex alle spielrelevanten Schnelligkeitsmuster im Fußball trainierbar macht – von der Linie bis zum Cut.',
  },
  {
    href: '/blog/positionsspezifisches-fussballtraining-t-apex',
    category: 'Fußball',
    title: 'Positionsspezifisches Fußballtraining mit Widerstand',
    desc: 'Warum Außenspieler, Mittelfeldspieler und Innenverteidiger unterschiedlich trainieren müssen – und wie T-Apex das ermöglicht.',
  },
  {
    href: '/blog/seilzugtraining-sprinttraining-widerstand-oder-unterstuetzung',
    category: 'Seilzugtraining',
    title: 'Widerstand oder Unterstützung: Was eine Sprint-Session akut bewirkt',
    desc: 'Zwei kontrollierte Studien zeigen, welche Methode wann einen Akuteffekt hat – relevant für die Planung von Fußball-Speedblöcken.',
  },
]
</script>

<template>
  <div class="football-page">

    <!-- Breadcrumb -->
    <nav class="football-breadcrumb" aria-label="Breadcrumb">
      <div class="football-breadcrumb__inner">
        <NuxtLink to="/">Home</NuxtLink>
        <span aria-hidden="true">›</span>
        <NuxtLink to="/products/t-apex">T-Apex</NuxtLink>
        <span aria-hidden="true">›</span>
        <span>Fußballtraining</span>
      </div>
    </nav>

    <!-- Hero -->
    <section class="football-hero">
      <img
        class="football-hero__image"
        src="https://cdn.shopify.com/s/files/1/0347/9214/5029/files/t-apex-fussball-antritt_webp.jpg?v=1792333469"
        alt="Fußballer im explosiven Antritt mit T-Apex auf dem Trainingsfeld"
        fetchpriority="high"
      />
      <div class="football-hero__overlay" />
      <div class="football-hero__content">
        <div class="football-hero__text">
          <p class="football-hero__kicker">T-Apex Fußballtraining</p>
          <h1 class="football-hero__title">T-Apex. Fußball-Schnelligkeit.<br>Messbar. Positionsspezifisch.</h1>
          <p class="football-hero__sub">Kontrollierter Widerstand und Echtzeit-Daten für alle spielrelevanten Schnelligkeitsmuster – vom explosiven Antritt bis zum Richtungswechsel.</p>
          <NuxtLink to="/products/t-apex" class="football-hero__cta">Zum T-Apex</NuxtLink>
        </div>
        <div class="football-hero__product">
          <img
            src="https://cdn.shopify.com/s/files/1/0347/9214/5029/files/t-apex-produktfoto-freigestellt.png?v=1792334177"
            alt="T-Apex Seilzugsystem freigestellt"
            class="football-hero__product-img"
            loading="eager"
          />
        </div>
      </div>
    </section>

    <!-- Features Accordion -->
    <ProductFeaturesAccordion :content="featuresAccordion" />

    <!-- Drills -->
    <section class="football-drills">
      <div class="football-drills__inner">
        <header class="football-drills__header">
          <p class="football-section-kicker">Trainingsformen</p>
          <h2 class="football-section-title">T-Apex Fußballtraining nach Bewegungsmuster</h2>
          <p class="football-section-lead">Fußball-Schnelligkeit entsteht selten in gerader Linie. T-Apex ist für alle spielrelevanten Bewegungsmuster konfigurierbar.</p>
        </header>

        <div class="football-drills__grid">
          <article
            v-for="drill in drills"
            :key="drill.label"
            class="football-drill-card"
          >
            <div class="football-drill-card__media">
              <img :src="drill.image" :alt="drill.alt" loading="lazy" />
            </div>
            <div class="football-drill-card__body">
              <p class="football-drill-card__label">{{ drill.label }}</p>
              <h3 class="football-drill-card__title">{{ drill.heading }}</h3>
              <p class="football-drill-card__text">{{ drill.body }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Positions -->
    <section class="football-positions">
      <div class="football-positions__inner">
        <div class="football-positions__media">
          <video
            src="https://cdn.shopify.com/videos/c/vp/decdad182e5b413da217b2c84eb7a239/decdad182e5b413da217b2c84eb7a239.HD-720p-1.6Mbps-98037461.mp4"
            autoplay
            muted
            loop
            playsinline
            class="football-positions__video"
          />
        </div>
        <div class="football-positions__text">
          <p class="football-section-kicker">Positionsspezifisch</p>
          <h2 class="football-section-title">Jede Position hat eigene Anforderungen</h2>
          <p class="football-positions__intro">T-Apex ermöglicht es, Widerstand, Distanz und Modus je nach Position zu konfigurieren – ohne Umbau, direkt über das Tablet.</p>
          <ul class="football-positions__list">
            <li v-for="pos in positions" :key="pos.name" class="football-positions__item">
              <strong>{{ pos.name }}</strong>
              <span>{{ pos.focus }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Full-width video -->
    <section class="football-video-full">
      <video
        src="https://cdn.shopify.com/videos/c/vp/6479400182ff41748a0e526f5b756a3a/6479400182ff41748a0e526f5b756a3a.HD-720p-4.5Mbps-98037460.mp4"
        autoplay
        muted
        loop
        playsinline
        class="football-video-full__video"
      />
    </section>

    <!-- Data -->
    <section class="football-data">
      <div class="football-data__inner">
        <p class="football-section-kicker">Coaching & Auswertung</p>
        <h2 class="football-section-title">Daten, die Trainer brauchen</h2>
        <p class="football-data__lead">T-Apex erfasst jede Wiederholung – Kraft, Geschwindigkeit, Leistung und Symmetrie in Echtzeit. Trainer sehen sofort, ob die Belastung stimmt, und können die nächste Serie gezielt anpassen.</p>
        <ul class="football-data__list">
          <li v-for="point in dataPoints" :key="point.value">
            <strong>{{ point.value }}</strong> — {{ point.desc }}
          </li>
        </ul>
      </div>
    </section>

    <!-- Aus dem Blog -->
    <section class="football-blog">
      <div class="football-blog__inner">
        <header class="football-blog__header">
          <p class="football-section-kicker">Forschung & Praxis</p>
          <h2 class="football-section-title">Wissenschaft hinter dem T-Apex Fußballtraining</h2>
        </header>
        <div class="football-blog__grid">
          <NuxtLink
            v-for="post in blogPosts"
            :key="post.href"
            :to="post.href"
            class="football-blog__card"
          >
            <p class="football-blog__category">{{ post.category }}</p>
            <h3 class="football-blog__title">{{ post.title }}</h3>
            <p class="football-blog__excerpt">{{ post.desc }}</p>
            <span class="football-blog__read">Artikel lesen →</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="football-cta">
      <div class="football-cta__inner">
        <img
          src="https://cdn.shopify.com/s/files/1/0347/9214/5029/files/t-apex-fussball-richtungswechsel_webp.jpg?v=1792333469"
          alt="Fußballer mit T-Apex beim Richtungswechsel-Training"
          class="football-cta__image"
          loading="lazy"
        />
        <div class="football-cta__overlay" />
        <div class="football-cta__content">
          <h2 class="football-cta__title">Bereit für positionsspezifisches Fußballtraining?</h2>
          <p class="football-cta__sub">T-Apex. Kontrolliert. Messbar. Feldtauglich.</p>
          <div class="football-cta__actions">
            <NuxtLink to="/products/t-apex" class="football-cta__btn football-cta__btn--primary">T-Apex entdecken</NuxtLink>
            <NuxtLink to="/products/t-apex/sprinttraining" class="football-cta__btn football-cta__btn--outline">Sprinttraining ansehen</NuxtLink>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.football-page {
  background: var(--color-white);
  color: var(--color-gray-900);
}

/* Breadcrumb */
.football-breadcrumb {
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-gray-50);
  border-bottom: 1px solid var(--color-gray-200);
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
}

.football-breadcrumb__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.football-breadcrumb a {
  color: inherit;
  text-decoration: none;
}

.football-breadcrumb a:hover {
  color: var(--color-primary);
}

/* Shared typography */
.football-section-kicker {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.football-section-title {
  font-size: clamp(1.6rem, 3vw, 2.25rem);
  font-weight: var(--font-weight-bold);
  line-height: 1.15;
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-md);
}

.football-section-lead {
  font-size: var(--font-size-lg);
  color: var(--color-gray-600);
  max-width: 640px;
  line-height: 1.6;
}

/* Hero */
.football-hero {
  position: relative;
  height: 90vh;
  min-height: 560px;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.football-hero__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

.football-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 100%);
}

.football-hero__content {
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
  .football-hero__content {
    grid-template-columns: 1fr 1fr;
  }
}

.football-hero__product {
  display: flex;
  align-items: center;
  justify-content: center;
}

.football-hero__product-img {
  width: 100%;
  max-width: 720px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 32px 64px rgba(0, 0, 0, 0.6));
}

.football-hero__text {
  display: flex;
  flex-direction: column;
}

.football-hero__kicker {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
}

.football-hero__title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  line-height: 1.05;
  margin-bottom: var(--spacing-lg);
  max-width: 700px;
}

.football-hero__sub {
  font-size: var(--font-size-lg);
  color: rgba(255,255,255,0.85);
  max-width: 560px;
  line-height: 1.6;
  margin-bottom: var(--spacing-2xl);
}

.football-hero__cta {
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

.football-hero__cta:hover {
  opacity: 0.88;
}

/* Drills */
.football-drills {
  padding: var(--spacing-5xl) var(--spacing-lg);
  background: var(--color-white);
}

.football-drills__inner {
  max-width: 1200px;
  margin: 0 auto;
}

.football-drills__header {
  margin-bottom: var(--spacing-3xl);
}

.football-drills__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-xl);
}

@media (min-width: 768px) {
  .football-drills__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .football-drills__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.football-drill-card {
  border-radius: var(--border-radius-2xl);
  overflow: hidden;
  border: 1px solid var(--color-gray-200);
  background: var(--color-white);
  box-shadow: 0 4px 24px rgba(0,0,0,0.05);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.football-drill-card:hover {
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.football-drill-card__media {
  aspect-ratio: 4/3;
  overflow: hidden;
}

.football-drill-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.football-drill-card:hover .football-drill-card__media img {
  transform: scale(1.04);
}

.football-drill-card__body {
  padding: var(--spacing-lg);
}

.football-drill-card__label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.football-drill-card__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-sm);
  line-height: 1.3;
}

.football-drill-card__text {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  line-height: 1.7;
}

/* Positions */
.football-positions {
  background: #f7f4ef;
  padding: var(--spacing-5xl) var(--spacing-lg);
}

.football-positions__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-3xl);
  align-items: center;
}

@media (min-width: 1024px) {
  .football-positions__inner {
    grid-template-columns: 1fr 1fr;
  }
}

.football-positions__media {
  border-radius: var(--border-radius-2xl);
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(0,0,0,0.12);
}

.football-positions__video {
  display: block;
  width: 100%;
  height: auto;
}

.football-positions__intro {
  font-size: var(--font-size-base);
  color: var(--color-gray-700);
  line-height: 1.7;
  margin-bottom: var(--spacing-xl);
}

.football-positions__list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: var(--spacing-md);
}

.football-positions__item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--color-gray-700);
  padding-left: var(--spacing-md);
  border-left: 2px solid var(--color-primary);
  line-height: 1.6;
}

.football-positions__item strong {
  font-size: var(--font-size-base);
  color: var(--color-gray-900);
  font-weight: var(--font-weight-semibold);
}

/* Full-width video */
.football-video-full {
  background: #000;
  overflow: hidden;
}

.football-video-full__video {
  display: block;
  width: 100%;
  max-height: 70vh;
  object-fit: cover;
}

/* Data */
.football-data {
  padding: var(--spacing-5xl) var(--spacing-lg);
  background: var(--color-white);
}

.football-data__inner {
  max-width: 800px;
  margin: 0 auto;
}

.football-data__lead {
  font-size: var(--font-size-base);
  color: var(--color-gray-700);
  line-height: 1.7;
  margin-bottom: var(--spacing-xl);
}

.football-data__list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: var(--spacing-md);
}

.football-data__list li {
  font-size: var(--font-size-sm);
  color: var(--color-gray-700);
  padding-left: var(--spacing-md);
  border-left: 2px solid var(--color-primary);
  line-height: 1.6;
}

.football-data__list strong {
  color: var(--color-gray-900);
}

/* Blog */
.football-blog {
  padding: var(--spacing-5xl) var(--spacing-lg);
  background: var(--color-gray-50);
  border-top: 1px solid var(--color-gray-200);
}

.football-blog__inner {
  max-width: 1200px;
  margin: 0 auto;
}

.football-blog__header {
  margin-bottom: var(--spacing-3xl);
}

.football-blog__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
}

@media (min-width: 768px) {
  .football-blog__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.football-blog__card {
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

.football-blog__card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
}

.football-blog__category {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-primary);
}

.football-blog__title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  line-height: 1.4;
  overflow-wrap: break-word;
}

.football-blog__excerpt {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  line-height: 1.6;
  flex: 1;
  overflow-wrap: break-word;
}

.football-blog__read {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin-top: auto;
}

/* CTA */
.football-cta {
  position: relative;
  overflow: hidden;
  min-height: 480px;
  display: flex;
  align-items: center;
}

.football-cta__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.football-cta__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.45) 100%);
}

.football-cta__inner {
  position: relative;
  width: 100%;
}

.football-cta__content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-5xl) var(--spacing-lg);
  color: var(--color-white);
}

.football-cta__title {
  font-size: clamp(1.8rem, 4vw, 2.75rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: var(--spacing-md);
}

.football-cta__sub {
  font-size: var(--font-size-lg);
  color: rgba(255,255,255,0.8);
  margin-bottom: var(--spacing-2xl);
}

.football-cta__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.football-cta__btn {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-2xl);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.football-cta__btn:hover {
  opacity: 0.88;
}

.football-cta__btn--primary {
  background: var(--color-primary);
  color: var(--color-white);
}

.football-cta__btn--outline {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.6);
  color: var(--color-white);
}
</style>
