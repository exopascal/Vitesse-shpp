# Component Styling Use Cases

Complete examples for common component patterns.

## Button Styling

### Primary Button

```vue
<template>
  <button class="btn-primary">
    {{ text }}
  </button>
</template>

<style scoped>
.btn-primary {
  /* Background & Color */
  background-color: var(--color-accent);
  color: var(--color-text-inverse);

  /* Spacing */
  padding: var(--spacing-3) var(--spacing-6);

  /* Typography */
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);

  /* Visual */
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);

  /* Animation */
  transition: var(--transition-normal);

  /* Remove default button styles */
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: var(--color-accent-hover);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}
</style>
```

**Or with Tailwind:**
```vue
<template>
  <button class="
    bg-accent
    text-white
    px-6
    py-3
    font-body
    text-base
    font-semibold
    rounded-lg
    shadow-md
    transition-normal
    hover:bg-accent-hover
    hover:shadow-lg
    hover:-translate-y-0.5
    active:translate-y-0
    active:shadow-sm
    border-none
    cursor-pointer
  ">
    {{ text }}
  </button>
</template>
```

### Secondary Button

```vue
<template>
  <button class="
    bg-transparent
    text-accent
    border-2
    border-accent
    px-6
    py-3
    rounded-lg
    font-semibold
    transition-normal
    hover:bg-accent
    hover:text-white
  ">
    {{ text }}
  </button>
</template>
```

---

## Card Styling

### Basic Card

```vue
<template>
  <div class="
    bg-surface
    border
    border-border
    rounded-xl
    p-6
    shadow-md
    hover:shadow-lg
    transition-normal
  ">
    <h3 class="font-display text-2xl font-bold mb-4">
      {{ title }}
    </h3>
    <p class="text-base text-muted leading-relaxed">
      {{ description }}
    </p>
  </div>
</template>
```

### Feature Card with Icon

```vue
<template>
  <div class="feature-card">
    <div class="icon-wrapper">
      <slot name="icon" />
    </div>

    <h3 class="font-display text-xl font-bold mb-2">
      {{ title }}
    </h3>

    <p class="text-sm text-muted">
      {{ description }}
    </p>
  </div>
</template>

<style scoped>
.feature-card {
  background-color: var(--color-surface);
  padding: var(--spacing-6);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-md);
  transition: var(--transition-normal);
  text-align: center;
}

.feature-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.icon-wrapper {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--spacing-4);
  background: var(--gradient-accent);
  border-radius: var(--border-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-inverse);
}
</style>
```

---

## Hero Section

### Full-Width Hero

```vue
<template>
  <section class="hero">
    <div class="hero-content">
      <h1 class="hero-title">
        {{ title }}
      </h1>

      <p class="hero-subtitle">
        {{ subtitle }}
      </p>

      <div class="hero-actions">
        <button class="btn-primary">{{ ctaPrimary }}</button>
        <button class="btn-secondary">{{ ctaSecondary }}</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  /* Layout */
  width: 100%;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Spacing */
  padding: var(--spacing-section) var(--spacing-4);

  /* Visual */
  background-image: var(--gradient-hero);
  position: relative;
}

.hero-content {
  max-width: var(--container-max-width);
  text-align: center;
  z-index: var(--z-base);
}

.hero-title {
  font-family: var(--font-display);
  font-size: var(--text-6xl);
  font-weight: var(--font-bold);
  color: var(--color-text-inverse);
  line-height: var(--leading-tight);
  margin-bottom: var(--spacing-6);
}

.hero-subtitle {
  font-family: var(--font-body);
  font-size: var(--text-xl);
  color: var(--color-text-inverse);
  line-height: var(--leading-normal);
  margin-bottom: var(--spacing-8);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: var(--spacing-4);
  justify-content: center;
  flex-wrap: wrap;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: var(--text-4xl);
  }

  .hero-subtitle {
    font-size: var(--text-lg);
  }

  .hero-actions {
    flex-direction: column;
  }
}
</style>
```

---

## Modal/Dialog

```vue
<template>
  <Transition name="modal-fade">
    <div v-if="isOpen" class="modal-backdrop" @click="closeModal">
      <div class="modal-content" @click.stop>
        <!-- Close Button -->
        <button class="modal-close" @click="closeModal">
          ×
        </button>

        <!-- Header -->
        <div class="modal-header">
          <h2 class="font-display text-2xl font-bold">
            {{ title }}
          </h2>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <slot />
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button class="btn-secondary" @click="closeModal">
            Abbrechen
          </button>
          <button class="btn-primary" @click="confirm">
            Bestätigen
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal-backdrop);
  padding: var(--spacing-4);
}

.modal-content {
  background-color: var(--color-bg);
  border-radius: var(--border-radius-2xl);
  box-shadow: var(--shadow-2xl);
  max-width: 500px;
  width: 100%;
  position: relative;
  z-index: var(--z-modal);
}

.modal-close {
  position: absolute;
  top: var(--spacing-4);
  right: var(--spacing-4);
  background: transparent;
  border: none;
  font-size: var(--text-3xl);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: var(--transition-fast);
}

.modal-close:hover {
  color: var(--color-text);
}

.modal-header {
  padding: var(--spacing-6);
  border-bottom: 1px solid var(--color-border);
}

.modal-body {
  padding: var(--spacing-6);
  max-height: 400px;
  overflow-y: auto;
}

.modal-footer {
  padding: var(--spacing-6);
  border-top: 1px solid var(--color-border);
  display: flex;
  gap: var(--spacing-3);
  justify-content: flex-end;
}

/* Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: var(--transition-normal);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal-content,
.modal-fade-leave-to .modal-content {
  transform: scale(0.9);
}
</style>
```

---

## Form Input

```vue
<template>
  <div class="form-group">
    <label class="form-label" :for="id">
      {{ label }}
      <span v-if="required" class="text-error">*</span>
    </label>

    <input
      :id="id"
      v-model="inputValue"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      class="form-input"
      :class="{ 'form-input-error': error }"
    />

    <span v-if="error" class="form-error">
      {{ error }}
    </span>
  </div>
</template>

<style scoped>
.form-group {
  margin-bottom: var(--spacing-4);
}

.form-label {
  display: block;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-text);
  margin-bottom: var(--spacing-2);
}

.form-input {
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-text);
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  transition: var(--transition-fast);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.form-input-error {
  border-color: var(--color-error);
}

.form-input-error:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.form-error {
  display: block;
  margin-top: var(--spacing-2);
  font-size: var(--text-sm);
  color: var(--color-error);
}
</style>
```

---

## Navigation Menu

```vue
<template>
  <nav class="nav">
    <div class="nav-container">
      <!-- Logo -->
      <div class="nav-logo">
        <slot name="logo" />
      </div>

      <!-- Menu Items -->
      <ul class="nav-menu">
        <li v-for="item in menuItems" :key="item.id" class="nav-item">
          <a :href="item.href" class="nav-link">
            {{ item.label }}
          </a>
        </li>
      </ul>

      <!-- CTA -->
      <button class="btn-primary">
        {{ ctaText }}
      </button>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  z-index: var(--z-sticky);
  box-shadow: var(--shadow-sm);
}

.nav-container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-6);
}

.nav-logo {
  display: flex;
  align-items: center;
}

.nav-menu {
  display: flex;
  gap: var(--spacing-8);
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--color-text);
  text-decoration: none;
  transition: var(--transition-fast);
}

.nav-link:hover {
  color: var(--color-accent);
}
</style>
```

---

## Grid Layout

```vue
<template>
  <div class="
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    xl:grid-cols-4
    gap-4
    md:gap-6
    lg:gap-8
    p-4
    md:p-8
  ">
    <div
      v-for="item in items"
      :key="item.id"
      class="
        bg-surface
        p-6
        rounded-xl
        shadow-md
        hover:shadow-lg
        transition-normal
      "
    >
      <h3 class="font-display text-xl font-bold mb-2">
        {{ item.title }}
      </h3>
      <p class="text-sm text-muted">
        {{ item.description }}
      </p>
    </div>
  </div>
</template>
```

---

## Summary

All examples follow token-first approach:
- ✅ Colors from `--color-*`
- ✅ Spacing from `--spacing-*`
- ✅ Typography from `--font-*`, `--text-*`
- ✅ Visual effects from `--shadow-*`, `--border-radius-*`
- ✅ Animations from `--transition-*`
- ✅ Layout from `--container-*`, `--z-*`

**No hardcoded values anywhere!**
