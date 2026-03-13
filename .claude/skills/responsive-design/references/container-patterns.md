# Container Patterns

Full-width and constrained container patterns.

## Full-Width Container

```vue
<template>
  <!-- Full-width background, constrained content -->
  <section class="w-full bg-primary py-12 md:py-16">
    <div class="
      max-w-7xl
      mx-auto
      px-4
      md:px-8
    ">
      <!-- Constrained content -->
    </div>
  </section>
</template>
```

## Constrained Container

```vue
<template>
  <!-- Constrained container with design token -->
  <div
    class="
      container
      mx-auto
      px-4
      md:px-8
    "
    :style="{ maxWidth: 'var(--container-max-width)' }"
  >
    <!-- Content -->
  </div>
</template>
```

## Multiple Sections

```vue
<template>
  <!-- Alternating full-width and constrained -->
  <div>
    <!-- Full-width hero -->
    <section class="w-full bg-gradient py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 md:px-8">
        <h1>Hero Content</h1>
      </div>
    </section>

    <!-- Constrained features -->
    <section class="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
      <h2>Features</h2>
    </section>

    <!-- Full-width CTA -->
    <section class="w-full bg-accent py-12 md:py-16">
      <div class="max-w-4xl mx-auto px-4 md:px-8 text-center">
        <h2>Call to Action</h2>
      </div>
    </section>
  </div>
</template>
```
