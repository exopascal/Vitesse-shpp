<template>
  <section class="use-case-links">
    <div class="use-case-links__inner">
      <header class="use-case-links__header">
        <p class="use-case-links__kicker">Einsatzbereiche</p>
        <h2 class="use-case-links__title">T-Apex in deiner Sportart</h2>
        <p class="use-case-links__lead">
          Ob Leichtathletik oder Fußball – T-Apex ist für die spezifischen Schnelligkeitsanforderungen jeder Sportart konfigurierbar.
        </p>
      </header>

      <div class="use-case-links__grid">
        <NuxtLink to="/products/t-apex/sprinttraining" class="use-case-links__card">
          <div class="use-case-links__card-media">
            <img
              src="https://cdn.shopify.com/s/files/1/0347/9214/5029/files/t-apex-sprinttraining-antritt-100-meter_webp.jpg?v=1792333470"
              alt="Sprinter beim T-Apex Sprinttraining auf der Bahn"
              loading="lazy"
            />
          </div>
          <div class="use-case-links__card-body">
            <p class="use-case-links__card-tag">Leichtathletik</p>
            <h3 class="use-case-links__card-title">Sprinttraining</h3>
            <p class="use-case-links__card-desc">
              Kontrollierter Widerstand und Overspeed-Unterstützung für Start, Beschleunigung und Topspeed – mit Echtzeit-Daten für jede Phase.
            </p>
            <span class="use-case-links__card-cta">Sprinttraining entdecken →</span>
          </div>
        </NuxtLink>

        <NuxtLink to="/products/t-apex/fussball" class="use-case-links__card">
          <div class="use-case-links__card-media">
            <img
              src="https://cdn.shopify.com/s/files/1/0347/9214/5029/files/t-apex-fussball-coaching-junior_webp.jpg?v=1792333470"
              alt="Fußballer mit T-Apex im positionsspezifischen Training"
              loading="lazy"
            />
          </div>
          <div class="use-case-links__card-body">
            <p class="use-case-links__card-tag">Fußball</p>
            <h3 class="use-case-links__card-title">Fußballtraining</h3>
            <p class="use-case-links__card-desc">
              Positionsspezifische Schnelligkeit für Antritt, Lateralbewegung und Richtungswechsel – messbar und feldtauglich.
            </p>
            <span class="use-case-links__card-cta">Fußballtraining entdecken →</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.use-case-links {
  background: var(--color-gray-50);
  padding: var(--spacing-5xl) var(--spacing-lg);
  border-top: 1px solid var(--color-gray-200);
}

.use-case-links__inner {
  max-width: 1200px;
  margin: 0 auto;
}

.use-case-links__header {
  margin-bottom: var(--spacing-3xl);
  max-width: 640px;
}

.use-case-links__kicker {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.use-case-links__title {
  font-size: clamp(1.6rem, 3vw, 2.25rem);
  font-weight: var(--font-weight-bold);
  line-height: 1.15;
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-md);
}

.use-case-links__lead {
  font-size: var(--font-size-lg);
  color: var(--color-gray-600);
  line-height: 1.6;
}

.use-case-links__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-xl);
}

@media (min-width: 768px) {
  .use-case-links__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.use-case-links__card {
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius-2xl);
  overflow: hidden;
  border: 1px solid var(--color-gray-200);
  background: var(--color-white);
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
}

.use-case-links__card:hover {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transform: translateY(-3px);
  border-color: var(--color-primary);
}

.use-case-links__card-media {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.use-case-links__card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.use-case-links__card:hover .use-case-links__card-media img {
  transform: scale(1.04);
}

.use-case-links__card-body {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding: var(--spacing-xl);
  flex: 1;
}

.use-case-links__card-tag {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-primary);
}

.use-case-links__card-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  line-height: 1.2;
}

.use-case-links__card-desc {
  font-size: var(--font-size-base);
  color: var(--color-gray-600);
  line-height: 1.65;
  flex: 1;
}

.use-case-links__card-cta {
  display: inline-block;
  margin-top: var(--spacing-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
}
</style>
