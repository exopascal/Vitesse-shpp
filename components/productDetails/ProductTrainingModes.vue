<template>
  <section class="ptm">
    <div class="ptm__inner">
      <div class="ptm__header">
        <div class="ptm__header-left">
          <p class="ptm__kicker">Ein System · Drei Methoden</p>
          <h2 class="ptm__title">Ein System. Diverse Trainingsmöglichkeiten.</h2>
          <p class="ptm__lead">
            T-Apex unterstützt Widerstands-, Richtungs- und Overspeed-Training –
            Beschleunigung, Richtungskontrolle und Überschnelligkeitsarbeit in einer Einheit.
          </p>
        </div>
        <NuxtLink to="/blog" class="ptm__header-cta">
          Zum Blog
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </NuxtLink>
      </div>

      <div class="ptm__grid">
        <figure class="ptm__item">
          <img
            src="https://cdn.shopify.com/s/files/1/0347/9214/5029/files/t-apex-sprinttraining-zeitmessung.jpg?v=1792333469"
            alt="T-Apex Sprinttraining mit Zeitmessung"
            loading="lazy"
            class="ptm__img"
          />
          <div class="ptm__overlay">
            <h3 class="ptm__overlay-title">Widerstandstraining mit konstantem Zug</h3>
            <p class="ptm__overlay-desc">Stabile Last über die gesamte Sprintdistanz – für stärkere Starts und kontrollierte Beschleunigung.</p>
          </div>
        </figure>

        <figure class="ptm__item">
          <img
            src="https://cdn.shopify.com/s/files/1/0347/9214/5029/files/t-apex-fussball-richtungswechsel_webp.jpg?v=1792333469"
            alt="T-Apex Fußball Richtungswechsel"
            loading="lazy"
            class="ptm__img"
          />
          <div class="ptm__overlay">
            <h3 class="ptm__overlay-title">Bremsarbeit und Richtungswechsel</h3>
            <p class="ptm__overlay-desc">Kontrollierter Widerstand in der Gegenrichtung – Lateralbewegung, Richtungswechsel und Neubeschleunigung messbar trainieren.</p>
          </div>
        </figure>

        <figure class="ptm__item">
          <img
            src="https://cdn.shopify.com/s/files/1/0347/9214/5029/files/t-apex-sprinttraining-overspeed.jpg?v=1792333469"
            alt="T-Apex Overspeed Sprinttraining"
            loading="lazy"
            class="ptm__img"
          />
          <div class="ptm__overlay">
            <h3 class="ptm__overlay-title">Overspeed: bis 14 m/s unterstützte Sprints</h3>
            <p class="ptm__overlay-desc">Überschnelligkeitsarbeit mit progressiver Unterstützung – Schrittfrequenz und Topspeed-Mechanik gezielt entwickeln.</p>
          </div>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ptm {
  background: #0f0f0f;
  padding: 5rem 1.5rem;
}

.ptm__inner {
  max-width: 1200px;
  margin: 0 auto;
}

.ptm__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 3rem;
}

.ptm__header-left {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 640px;
}

.ptm__kicker {
  margin: 0;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #ef4544;
}

.ptm__title {
  margin: 0;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  line-height: 1.1;
  color: #ffffff;
}

.ptm__lead {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.7;
  color: #9ca3af;
}

.ptm__header-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  white-space: nowrap;
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffffff;
  text-decoration: none;
  flex-shrink: 0;
  transition: color 0.2s ease;
}

.ptm__header-cta:hover {
  color: #ef4544;
}

.ptm__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.ptm__item {
  position: relative;
  margin: 0;
  overflow: hidden;
  border-radius: 8px;
  cursor: default;
}

.ptm__img {
  display: block;
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.4s ease;
}

.ptm__item:hover .ptm__img {
  transform: scale(1.04);
}

/* Overlay */
.ptm__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
  border-radius: 8px;
}

.ptm__overlay-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;
}

.ptm__overlay-desc {
  margin: 0;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.85);
  line-height: 1.5;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 0.35s ease, opacity 0.3s ease, margin-top 0.3s ease;
}

.ptm__item:hover .ptm__overlay-desc {
  max-height: 5rem;
  opacity: 1;
  margin-top: 0.4rem;
}

@media (max-width: 768px) {
  .ptm {
    padding: 3.5rem 1.5rem;
  }

  .ptm__header {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 2rem;
  }

  .ptm__grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  /* Always show desc on mobile (no hover) */
  .ptm__overlay-desc {
    max-height: 5rem;
    opacity: 1;
    margin-top: 0.4rem;
  }
}
</style>
