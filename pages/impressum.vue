<template>
  <main class="legal-page">
    <div class="legal-page__inner">
      <h1 class="legal-page__title">Impressum</h1>

      <section class="legal-section">
        <h2 class="legal-section__title">Angaben gemäß § 5 TMG</h2>
        <p class="legal-section__text">
          Wolfgang Alberg<br />
          Constanzeweg 9<br />
          51145 Köln
        </p>
      </section>

      <section class="legal-section">
        <h2 class="legal-section__title">Kontakt</h2>
        <p class="legal-section__text">
          Telefon:
          <a class="legal-link" href="tel:+4901716451868">01716451868</a><br />
          E-Mail:
          <a class="legal-link" href="mailto:info@vitesse-sports.de">info@vitesse-sports.de</a>
        </p>
      </section>

      <section class="legal-section">
        <h2 class="legal-section__title">EU-Streitschlichtung</h2>
        <p class="legal-section__text">
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
          <a
            class="legal-link"
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
          >https://ec.europa.eu/consumers/odr/</a>.<br />
          Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </p>
      </section>

      <section class="legal-section">
        <h2 class="legal-section__title">
          Verbraucherstreitbeilegung/Universalschlichtungsstelle
        </h2>
        <p class="legal-section__text">
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>
    </div>
  </main>
</template>

<script setup>
useHead({
  title: 'Impressum | Vitesse Sports',
  meta: [
    {
      name: 'description',
      content: 'Impressum und Anbieterkennzeichnung gemäß § 5 TMG von Vitesse Sports.',
    },
  ],
})
</script>

<style scoped>
.legal-page {
  padding: 3rem 0 5rem;
}

.legal-page__inner {
  width: min(820px, calc(100% - 2rem));
  margin: 0 auto;
}

.legal-page__title {
  margin: 0 0 2.5rem;
  font-size: var(--font-size-3xl, 1.875rem);
  font-weight: var(--font-weight-bold, 700);
  letter-spacing: -0.02em;
  color: var(--color-text-primary, #17120d);
}

.legal-section {
  margin-bottom: 2.25rem;
}

.legal-section__title {
  margin: 0 0 0.75rem;
  font-size: var(--font-size-lg, 1.125rem);
  font-weight: var(--font-weight-semibold, 600);
  color: var(--color-text-primary, #17120d);
}

.legal-section__text {
  margin: 0;
  font-size: var(--font-size-base, 1rem);
  line-height: var(--line-height-relaxed, 1.625);
  color: var(--color-text-secondary, #4b5563);
}

.legal-link {
  color: var(--color-brand-primary, #0f5e9c);
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color var(--transition-base, 0.2s ease);
}

.legal-link:hover {
  color: var(--color-brand-secondary, #f26a21);
}
</style>
