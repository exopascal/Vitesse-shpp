<template>
  <section class="pds">
    <div class="pds__inner">
      <div class="pds__header">
        <p class="pds__kicker">T-Apex Software</p>
        <h2 class="pds__title">Was der T-Apex misst</h2>
        <p class="pds__lead">
          T-Apex erfasst Kraft, Geschwindigkeit, Leistung, Distanz und Timing –
          und erstellt aus jeder Session übersichtliche Berichte zur Auswertung,
          zum Vergleich und für das Langzeit-Tracking.
        </p>
        <div class="pds__sub">
          <div class="pds__sub-item">
            <h3 class="pds__sub-title">Geschwindigkeit, Kraft und Leistung in Echtzeit</h3>
            <p class="pds__sub-text">Jede Wiederholung liefert Werte zu Topspeed, Kraftpeak und Leistungsabgabe – direkt während der Session.</p>
          </div>
          <div class="pds__sub-item">
            <h3 class="pds__sub-title">Symmetrie-Analyse und Trendbericht</h3>
            <p class="pds__sub-text">Seitenasymmetrien erkennen, Fortschritte über Zeiträume verfolgen, Trainingsblöcke vergleichen.</p>
          </div>
        </div>
      </div>

      <div class="pds__tabs" role="tablist">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="pds__tab"
          :class="{ 'pds__tab--active': activeTab === tab.id }"
          role="tab"
          :aria-selected="activeTab === tab.id"
          @click="activeTab = tab.id"
        >
          <component :is="tab.icon" class="pds__tab-icon" aria-hidden="true" />
          {{ tab.label }}
        </button>
      </div>

      <div class="pds__stage">
        <Transition name="pds-fade">
          <img
            :key="activeTab"
            :src="currentImage.src"
            :alt="currentImage.alt"
            class="pds__img"
            loading="lazy"
          />
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, defineComponent, h } from 'vue'

const activeTab = ref('session')

const IconSession = defineComponent({
  render: () => h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('rect', { x: 3, y: 3, width: 18, height: 18, rx: 2 }),
    h('path', { d: 'M3 9h18' }),
    h('path', { d: 'M9 21V9' }),
  ])
})

const IconComparison = defineComponent({
  render: () => h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M18 20V10' }),
    h('path', { d: 'M12 20V4' }),
    h('path', { d: 'M6 20v-6' }),
  ])
})

const IconTrend = defineComponent({
  render: () => h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('polyline', { points: '22 7 13.5 15.5 8.5 10.5 2 17' }),
    h('polyline', { points: '16 7 22 7 22 13' }),
  ])
})

const tabs = [
  { id: 'session',    label: 'Session',   icon: IconSession },
  { id: 'comparison', label: 'Vergleich', icon: IconComparison },
  { id: 'trend',      label: 'Trend',     icon: IconTrend },
]

const images: Record<string, { src: string; alt: string }> = {
  session: {
    src: 'https://cdn.shopify.com/s/files/1/0347/9214/5029/files/t-apex-produkt-auswertung-tablet-details.jpg?v=1792333467',
    alt: 'T-Apex Session-Auswertung im Tablet-Dashboard',
  },
  comparison: {
    src: 'https://cdn.shopify.com/s/files/1/0347/9214/5029/files/t-apex-produkt-auswertung-tablet-geschwindigkeit.jpg?v=1792333467',
    alt: 'T-Apex Vergleichsauswertung im Tablet-Dashboard',
  },
  trend: {
    src: 'https://cdn.shopify.com/s/files/1/0347/9214/5029/files/t-apex-produkt-auswertung-tablet.jpg?v=1792333466',
    alt: 'T-Apex Trend-Auswertung im Tablet-Dashboard',
  },
}

const currentImage = computed(() => images[activeTab.value])
</script>

<style scoped>
.pds {
  background: #0f0f0f;
  padding: 5rem 1.5rem;
}

.pds__inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
}

.pds__header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 680px;
}

.pds__kicker {
  margin: 0;
  display: inline-block;
  padding: 0.25rem 0.85rem;
  background: #ef4544;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border-radius: 999px;
}

.pds__title {
  margin: 0;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  line-height: 1.15;
  color: #ffffff;
}

.pds__lead {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.7;
  color: #9ca3af;
}

/* H3 sub-sections */
.pds__sub {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  width: 100%;
  max-width: 720px;
}

.pds__sub-item {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.pds__sub-title {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 700;
  color: #ffffff;
}

.pds__sub-text {
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.55;
  color: #6b7280;
}

@media (max-width: 600px) {
  .pds__sub {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

/* Tab switcher */
.pds__tabs {
  display: flex;
  gap: 0.5rem;
  background: rgba(255,255,255,0.07);
  padding: 0.3rem;
  border-radius: 999px;
}

.pds__tab {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: rgba(255,255,255,0.55);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
  white-space: nowrap;
}

.pds__tab:hover {
  color: #fff;
}

.pds__tab--active {
  background: #ef4544;
  color: #ffffff;
}

.pds__tab-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

/* Image stage */
.pds__stage {
  width: 100%;
}

.pds__img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 12px;
}

/* Cross-fade — leaving image goes absolute so container height never collapses */
.pds__stage {
  position: relative;
}

.pds-fade-enter-active,
.pds-fade-leave-active {
  transition: opacity 0.25s ease;
}

.pds-fade-leave-active {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pds-fade-enter-from,
.pds-fade-leave-to {
  opacity: 0;
}

@media (max-width: 600px) {
  .pds {
    padding: 3.5rem 1.5rem;
  }

  .pds__tabs {
    width: 100%;
    justify-content: center;
  }

  .pds__tab {
    padding: 0.5rem 0.85rem;
    font-size: 0.8rem;
  }
}
</style>
