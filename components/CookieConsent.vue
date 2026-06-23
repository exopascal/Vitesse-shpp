<template>
  <Teleport to="body">
    <Transition name="cookie-modal">
      <div
        v-if="showModal"
        class="cookie-overlay"
        @click.self="handleOverlayClick"
      >
        <div class="cookie-modal" role="dialog" aria-modal="true" aria-labelledby="cookie-title">

          <!-- Header -->
          <div class="cookie-modal__header">
            <span class="cookie-modal__icon">🍪</span>
            <h2 id="cookie-title" class="cookie-modal__title">Deine Privatsphäre</h2>
            <p class="cookie-modal__subtitle">
              Wir verwenden Cookies, um dir die beste Erfahrung auf unserer Website zu bieten.
              Du kannst selbst entscheiden, welche Kategorien du erlaubst.
            </p>
          </div>

          <!-- Category Toggles (only shown in detail view) -->
          <div v-if="showDetails" class="cookie-modal__categories">
            <div
              v-for="category in categoryList"
              :key="category.key"
              class="cookie-category"
            >
              <div class="cookie-category__info">
                <span class="cookie-category__name">{{ category.label }}</span>
                <span class="cookie-category__desc">{{ category.description }}</span>
              </div>
              <button
                class="cookie-toggle"
                :class="{ 'cookie-toggle--on': localPrefs[category.key], 'cookie-toggle--disabled': category.required }"
                :disabled="category.required"
                :aria-checked="localPrefs[category.key]"
                role="switch"
                @click="toggleCategory(category.key, category.required)"
              >
                <span class="cookie-toggle__thumb" />
              </button>
            </div>
          </div>

          <!-- Actions -->
          <div class="cookie-modal__actions" :class="{ 'cookie-modal__actions--stacked': showDetails }">
            <button v-if="!showDetails" class="cookie-btn cookie-btn--ghost" @click="showDetails = true">
              Anpassen
            </button>
            <button class="cookie-btn cookie-btn--secondary" @click="handleDenyAll">
              Nur Notwendige
            </button>
            <button v-if="showDetails" class="cookie-btn cookie-btn--secondary" @click="handleSaveSelection">
              Auswahl speichern
            </button>
            <button class="cookie-btn cookie-btn--primary" @click="handleAcceptAll">
              Alle akzeptieren
            </button>
          </div>

          <!-- Footer Links -->
          <div class="cookie-modal__footer">
            <NuxtLink to="/datenschutz" class="cookie-link">Datenschutzerklärung</NuxtLink>
            <span class="cookie-link-divider">·</span>
            <NuxtLink to="/impressum" class="cookie-link">Impressum</NuxtLink>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const {
  preferences,
  categoryMeta,
  categories,
  acceptAll,
  denyAll,
  acceptCategories,
  hasUserMadeChoice,
  isConsentExpired,
} = useCookieConsent()

const showModal = computed(() => !hasUserMadeChoice.value || isConsentExpired.value)
const showDetails = ref(false)

// Local copy of preferences for the detail toggle view
const localPrefs = ref<Record<string, boolean>>({})

watch(showModal, (visible) => {
  if (visible) {
    for (const key of categories) {
      localPrefs.value[key] = preferences.value[key] ?? false
    }
  }
}, { immediate: true })

// Build category list from module meta
const categoryList = computed(() =>
  categories.map((key) => ({
    key,
    label: categoryMeta[key]?.label ?? key,
    description: categoryMeta[key]?.description ?? '',
    required: categoryMeta[key]?.required ?? false,
  }))
)

function toggleCategory(key: string, required?: boolean) {
  if (required) return
  localPrefs.value[key] = !localPrefs.value[key]
}

function handleAcceptAll() {
  acceptAll()
  showDetails.value = false
}

function handleDenyAll() {
  denyAll()
  showDetails.value = false
}

function handleSaveSelection() {
  const accepted = Object.entries(localPrefs.value)
    .filter(([, v]) => v)
    .map(([k]) => k)
  acceptCategories(accepted)
  showDetails.value = false
}

// Don't close on overlay click — user must make an active choice (GDPR)
function handleOverlayClick() {}
</script>

<style scoped>
/* Overlay */
.cookie-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md, 1rem);
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
}

/* Modal */
.cookie-modal {
  width: 100%;
  max-width: 480px;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-bg-elevated);
  border-radius: var(--radius-2xl, 1rem);
  padding: var(--spacing-xl, 2rem);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg, 1.5rem);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
}

/* Header */
.cookie-modal__header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs, 0.5rem);
  text-align: center;
}

.cookie-modal__icon {
  font-size: 2rem;
  line-height: 1;
}

.cookie-modal__title {
  font-family: var(--font-display);
  font-size: var(--text-xl, 1.25rem);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
}

.cookie-modal__subtitle {
  font-size: var(--text-sm, 0.875rem);
  color: var(--color-text-tertiary);
  line-height: 1.5;
  margin: 0;
}

/* Categories */
.cookie-modal__categories {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm, 0.75rem);
  max-height: 280px;
  overflow-y: auto;
  padding-right: 2px;
}

.cookie-category {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md, 1rem);
  padding: var(--spacing-sm, 0.75rem) var(--spacing-md, 1rem);
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-lg, 0.5rem);
}

.cookie-category__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.cookie-category__name {
  font-size: var(--text-sm, 0.875rem);
  font-weight: 600;
  color: var(--color-text-primary);
}

.cookie-category__desc {
  font-size: var(--text-xs, 0.75rem);
  color: var(--color-text-tertiary);
  line-height: 1.4;
}

/* Toggle Switch */
.cookie-toggle {
  position: relative;
  flex-shrink: 0;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background: var(--color-bg-elevated);
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
  padding: 0;
}

.cookie-toggle--on {
  background: var(--color-brand-primary);
}

.cookie-toggle--disabled {
  background: var(--color-brand-dark);
  cursor: not-allowed;
  opacity: 0.7;
}

.cookie-toggle__thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--color-white);
  transition: transform 0.2s ease;
}

.cookie-toggle--on .cookie-toggle__thumb {
  transform: translateX(20px);
}

/* Actions */
.cookie-modal__actions {
  display: flex;
  gap: var(--spacing-sm, 0.75rem);
}

.cookie-modal__actions--stacked {
  flex-wrap: wrap;
}

.cookie-btn {
  flex: 1;
  padding: 0.625rem var(--spacing-md, 1rem);
  border-radius: var(--radius-lg, 0.5rem);
  font-size: var(--text-sm, 0.875rem);
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: opacity 0.15s ease, transform 0.1s ease;
  white-space: nowrap;
}

.cookie-btn:active {
  transform: scale(0.98);
}

.cookie-btn--primary {
  background: var(--color-brand-primary);
  color: var(--color-text-on-brand);
}

.cookie-btn--primary:hover {
  background: var(--color-brand-dark);
}

.cookie-btn--secondary {
  background: var(--color-bg-elevated);
  color: var(--color-text-secondary);
}

.cookie-btn--secondary:hover {
  background: var(--color-bg-tertiary);
  color: var(--color-text-primary);
}

.cookie-btn--ghost {
  background: transparent;
  color: var(--color-text-tertiary);
  border: 1px solid var(--color-bg-elevated);
}

.cookie-btn--ghost:hover {
  color: var(--color-text-primary);
  border-color: var(--color-text-tertiary);
}

/* Footer */
.cookie-modal__footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm, 0.75rem);
}

.cookie-link {
  font-size: var(--text-xs, 0.75rem);
  color: var(--color-text-disabled);
  text-decoration: none;
  transition: color 0.15s ease;
}

.cookie-link:hover {
  color: var(--color-text-tertiary);
}

.cookie-link-divider {
  color: var(--color-text-disabled);
  font-size: var(--text-xs, 0.75rem);
}

@media (max-width: 480px) {
  .cookie-modal {
    padding: 1.25rem;
  }

  .cookie-modal__actions {
    flex-wrap: wrap;
  }

  .cookie-btn {
    min-width: calc(50% - 0.375rem);
  }

  .cookie-btn--primary {
    flex: 1 0 100%;
  }
}

/* Transition */
.cookie-modal-enter-active,
.cookie-modal-leave-active {
  transition: opacity 0.25s ease;
}

.cookie-modal-enter-active .cookie-modal,
.cookie-modal-leave-active .cookie-modal {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.cookie-modal-enter-from,
.cookie-modal-leave-to {
  opacity: 0;
}

.cookie-modal-enter-from .cookie-modal,
.cookie-modal-leave-to .cookie-modal {
  transform: translateY(16px) scale(0.97);
  opacity: 0;
}
</style>
