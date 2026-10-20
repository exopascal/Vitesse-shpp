<template>
  <section class="penv">
    <div class="penv__inner">

      <div class="penv__header">
        <div class="penv__headline">
          <h2 class="penv__title">Mobil und einsatzbereit in Minuten</h2>
          <p class="penv__text">
            Der T-Apex ist konzipiert für feldbasiertes Schnelligkeitstraining, Widerstandsbewegung
            und multidirektionales Training – mit langer Seilreichweite, hoher Lastkapazität und
            robuster Hardware für intensive Sessions.
          </p>
        </div>
        <NuxtLink to="/blog" class="penv__expert-link">Mehr im Blog erfahren →</NuxtLink>
      </div>

      <div class="penv__images">
        <img
          src="https://cdn.shopify.com/s/files/1/0347/9214/5029/files/t-apex-produkftoto-seil.jpg?v=1792333463"
          alt="T-Apex Produktfoto mit Seil"
          class="penv__img"
          loading="lazy"
        />
        <img
          src="https://cdn.shopify.com/s/files/1/0347/9214/5029/files/t-apex-produkt-auf-sprintbahn.jpg?v=1792333469"
          alt="T-Apex Produkt auf der Sprintbahn"
          class="penv__img"
          loading="lazy"
        />
      </div>

      <div class="penv__stats">
        <div class="penv__stat">
          <span class="penv__stat-value">120m</span>
          <span class="penv__stat-label">Maximale Seilreichweite</span>
        </div>
        <div class="penv__stat">
          <span class="penv__stat-value">2mm</span>
          <span class="penv__stat-label">Seilstärke</span>
        </div>
        <div class="penv__stat">
          <span class="penv__stat-value">300kg</span>
          <span class="penv__stat-label">Maximaler Zugwiderstand</span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.penv {
  background: #fff;
  padding: 4rem 1.5rem;
}

.penv__inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Header row */
.penv__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
}

.penv__headline {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 600px;
}

.penv__title {
  margin: 0;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 800;
  line-height: 1.2;
  color: #111;
}

.penv__text {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.65;
  color: #6b7280;
}

.penv__expert-link {
  white-space: nowrap;
  font-size: 0.875rem;
  font-weight: 600;
  color: #111;
  text-decoration: none;
  padding-top: 0.25rem;
  transition: color 0.2s ease;
}

.penv__expert-link:hover {
  color: #ef4544;
}

/* Images */
.penv__images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.penv__img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  aspect-ratio: 4 / 3;
}

/* Stats */
.penv__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.penv__stat {
  background: #1a1a1a;
  border-radius: 8px;
  padding: 1.75rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.penv__stat-value {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  color: #ffffff;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.penv__stat-label {
  font-size: 0.8rem;
  color: #9ca3af;
  line-height: 1.4;
}

/* Mobile */
@media (max-width: 640px) {
  .penv {
    padding: 3rem 1rem;
  }

  .penv__header {
    flex-direction: column;
    gap: 1rem;
  }

  .penv__images {
    grid-template-columns: 1fr;
  }

  .penv__stats {
    grid-template-columns: 1fr;
  }
}
</style>
