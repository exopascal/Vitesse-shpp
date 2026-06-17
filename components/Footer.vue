<template>
  <footer class="site-footer">
    <div class="site-footer__glow" aria-hidden="true" />

    <div class="site-footer__inner">
      <div class="site-footer__brand">
        <NuxtLink to="/" class="site-footer__logo" aria-label="Vitesse Sports Startseite">
          <img
            src="/Vitesse-Wortmarke-Bildmarke.png"
            alt="Vitesse Sports"
            class="site-footer__logo-image"
          />
        </NuxtLink>

        <p class="site-footer__copy">
          Performance Equipment fuer Sprint, Athletik und modernes Training.
        </p>

        <a class="site-footer__contact" href="mailto:info@vitesse-sports.de">
          info@vitesse-sports.de
        </a>
      </div>

      <nav class="site-footer__nav" aria-label="Footer Navigation">
        <div
          v-for="section in footerSections"
          :key="section.title"
          class="site-footer__column"
        >
          <h2 class="site-footer__title">{{ section.title }}</h2>
          <ul class="site-footer__links">
            <li v-for="link in section.links" :key="link.label">
              <NuxtLink :to="link.to" class="site-footer__link">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <div class="site-footer__bottom">
      <p>© {{ currentYear }} Vitesse Sports. Alle Rechte vorbehalten.</p>
      <div class="site-footer__legal">
        <NuxtLink to="/" class="site-footer__legal-link">Startseite</NuxtLink>
        <NuxtLink to="/products" class="site-footer__legal-link">Produkte</NuxtLink>
        <NuxtLink to="/collections" class="site-footer__legal-link">Kollektionen</NuxtLink>
        <NuxtLink to="/impressum" class="site-footer__legal-link">Impressum</NuxtLink>
        <NuxtLink to="/agb" class="site-footer__legal-link">AGB</NuxtLink>
        <NuxtLink to="/datenschutz" class="site-footer__legal-link">Datenschutz</NuxtLink>
      </div>

      <p class="site-footer__disclaimer">
        Alle Angebote richten sich ausschließlich an Unternehmer (§ 14 BGB). Ein
        Verbraucher-Widerrufsrecht sowie die Pflicht zum Widerrufsbutton (§ 356a BGB)
        sind nicht anwendbar.
      </p>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()

const footerSections = [
  {
    title: 'Shop',
    links: [
      { label: 'Produkte', to: '/products' },
      { label: 'Kollektionen', to: '/collections' },
      { label: 'Neuheiten', to: '/products' }
    ]
  },
  {
    title: 'Inspiration',
    links: [
      { label: 'Sprinttraining', to: '/collections' },
      { label: 'Widerstandstraining', to: '/collections' },
      { label: 'Athletik Equipment', to: '/products' }
    ]
  },
  {
    title: 'Service',
    links: [
      { label: 'Startseite', to: '/' },
      { label: 'Produkte entdecken', to: '/products' },
      { label: 'Kollektionen ansehen', to: '/collections' }
    ]
  }
]
</script>

<style scoped>
.site-footer {
  position: relative;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background:
    radial-gradient(circle at top, rgba(60, 121, 189, 0.28), transparent 38%),
    linear-gradient(180deg, #13263c 0%, #0a1422 100%);
  overflow: hidden;
}

.site-footer__glow {
  position: absolute;
  inset: -8rem auto auto 50%;
  width: 28rem;
  height: 28rem;
  background: rgba(106, 163, 218, 0.2);
  filter: blur(110px);
  transform: translateX(-50%);
  pointer-events: none;
}

.site-footer__inner,
.site-footer__bottom {
  position: relative;
  z-index: 1;
  width: min(1200px, calc(100% - 2rem));
  margin: 0 auto;
}

.site-footer__inner {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1.85fr);
  gap: 3rem;
  padding: 4.5rem 0 2.5rem;
}

.site-footer__brand {
  display: grid;
  gap: 1rem;
  align-content: start;
}

.site-footer__logo {
  display: inline-flex;
  width: fit-content;
}

.site-footer__logo-image {
  width: min(220px, 60vw);
  height: auto;
}

.site-footer__copy {
  max-width: 28rem;
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
}

.site-footer__contact {
  width: fit-content;
  color: var(--color-white);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
  transition: color var(--transition-base);
}

.site-footer__contact:hover {
  color: #6aa3da;
}

.site-footer__nav {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

.site-footer__column {
  display: grid;
  gap: 1rem;
}

.site-footer__title {
  margin: 0;
  color: var(--color-white);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.site-footer__links {
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.site-footer__link,
.site-footer__legal-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  transition:
    color var(--transition-base),
    transform var(--transition-base);
}

.site-footer__link:hover,
.site-footer__legal-link:hover {
  color: var(--color-white);
  transform: translateX(2px);
}

.site-footer__bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.5rem 0 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--color-text-tertiary);
  font-size: var(--font-size-sm);
}

.site-footer__bottom p {
  margin: 0;
}

.site-footer__bottom .site-footer__disclaimer {
  flex-basis: 100%;
  margin-top: 0.75rem;
  font-size: 0.72rem;
  line-height: 1.5;
  color: var(--color-text-tertiary);
  opacity: 0.75;
}

.site-footer__legal {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

@media (max-width: 900px) {
  .site-footer__inner {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding-top: 3.5rem;
  }

  .site-footer__nav {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .site-footer__inner,
  .site-footer__bottom {
    width: min(1200px, calc(100% - 1.5rem));
  }

  .site-footer__nav {
    grid-template-columns: 1fr;
  }

  .site-footer__bottom {
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 1.5rem;
  }
}
</style>
