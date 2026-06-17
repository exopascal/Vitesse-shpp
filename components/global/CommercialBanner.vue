<template>
  <section class="commercial-banner" aria-label="Aktuelle Angebote und Hinweise">
    <div class="commercial-banner__inner">
      <p class="commercial-banner__text">
        Verkauf nur an Geschäftskunden (B2B) – Kein Verkauf an Verbraucher
      </p>
    </div>
  </section>
</template>

<style scoped>
.commercial-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1050;
  background:
    radial-gradient(120% 180% at 50% 0%, rgba(60, 121, 189, 0.3), transparent 60%),
    linear-gradient(90deg, #13263c 0%, #0a1422 100%);
  color: #ffffff;
  box-shadow: 0 12px 26px -20px rgba(15, 23, 42, 0.5);
}

.commercial-banner__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  min-height: 3rem;
  padding: 0.7rem 1.25rem;
  text-align: center;
}

.commercial-banner__label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
}

.commercial-banner__text {
  margin: 0;
  font-size: 0.98rem;
  font-weight: 600;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .commercial-banner__inner {
    flex-direction: column;
    gap: 0.35rem;
    padding: 0.75rem 1rem;
  }

  .commercial-banner__text {
    font-size: 0.92rem;
  }
}
</style>
