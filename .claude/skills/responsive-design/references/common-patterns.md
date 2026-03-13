# Common Responsive Patterns

7 essential responsive patterns with complete examples.

## Pattern 1: Stacked to Side-by-Side

```vue
<template>
  <!-- Mobile: Stacked vertically -->
  <!-- Desktop: Side-by-side -->
  <div class="
    flex
    flex-col          /* Mobile: Stack */
    md:flex-row       /* Laptop+: Side-by-side */
    gap-4
    md:gap-8
  ">
    <div class="w-full md:w-1/2">
      <!-- Left content -->
    </div>
    <div class="w-full md:w-1/2">
      <!-- Right content -->
    </div>
  </div>
</template>
```

## Pattern 2: Hidden on Mobile / Visible on Desktop

```vue
<template>
  <!-- Hide on mobile, show on desktop -->
  <div class="hidden md:block">
    <DesktopMenu />
  </div>

  <!-- Show on mobile, hide on desktop -->
  <div class="block md:hidden">
    <MobileMenu />
  </div>
</template>
```

## Pattern 3: Grid Column Variations

```vue
<template>
  <div class="
    grid
    grid-cols-1       /* Mobile: 1 column */
    sm:grid-cols-2    /* Tablet: 2 columns */
    md:grid-cols-3    /* Laptop: 3 columns */
    lg:grid-cols-4    /* Desktop: 4 columns */
    gap-4
    md:gap-6
  ">
    <Card v-for="item in items" :key="item.id" />
  </div>
</template>
```

## Pattern 4: Container Max-Width

```vue
<template>
  <!-- Use design token -->
  <div
    class="container mx-auto px-4 md:px-8"
    :style="{ maxWidth: 'var(--container-max-width)' }"
  >
    <!-- Content constrained to max-width -->
  </div>

  <!-- Or use Tailwind max-w -->
  <div class="max-w-7xl mx-auto px-4 md:px-8">
    <!-- Content constrained to 1280px -->
  </div>
</template>
```

## Pattern 5: Hero Section Responsive

```vue
<template>
  <section class="
    relative
    min-h-[400px]     /* Mobile: 400px */
    md:min-h-[500px]  /* Laptop: 500px */
    lg:min-h-[600px]  /* Desktop: 600px */
    flex
    items-center
    px-4
    md:px-8
    py-12
    md:py-16
  ">
    <div class="
      max-w-7xl
      mx-auto
      text-center       /* Mobile: Centered */
      md:text-left      /* Desktop: Left */
    ">
      <h1 class="
        text-4xl
        md:text-5xl
        lg:text-6xl
        font-bold
        mb-4
        md:mb-6
      ">
        {{ title }}
      </h1>

      <!-- CTAs: Stacked on mobile, inline on desktop -->
      <div class="
        flex
        flex-col          /* Mobile: Stack */
        sm:flex-row       /* Tablet+: Inline */
        gap-3
        sm:gap-4
        justify-center    /* Mobile: Center */
        md:justify-start  /* Desktop: Left */
      ">
        <Button variant="primary">{{ ctaPrimary }}</Button>
        <Button variant="secondary">{{ ctaSecondary }}</Button>
      </div>
    </div>
  </section>
</template>
```

## Pattern 6: Card Grid Responsive

```vue
<template>
  <div class="
    grid
    grid-cols-1       /* Mobile: 1 column */
    sm:grid-cols-2    /* Tablet: 2 columns */
    lg:grid-cols-3    /* Desktop: 3 columns */
    xl:grid-cols-4    /* Large: 4 columns */
    gap-4
    md:gap-6
    lg:gap-8
  ">
    <div
      v-for="card in cards"
      :key="card.id"
      class="
        bg-surface
        p-4
        md:p-6
        rounded-lg
        shadow-md
        hover:shadow-lg
        transition-normal
      "
    >
      <h3 class="text-xl md:text-2xl font-bold mb-2">
        {{ card.title }}
      </h3>
      <p class="text-base md:text-lg text-muted">
        {{ card.description }}
      </p>
    </div>
  </div>
</template>
```

## Pattern 7: Image Responsive

```vue
<template>
  <!-- Responsive images -->
  <img
    :src="imageSrc"
    :alt="imageAlt"
    class="
      w-full            /* Full width */
      h-auto            /* Maintain aspect ratio */
      rounded-lg
      object-cover
      max-h-[300px]     /* Mobile: Max 300px */
      md:max-h-[400px]  /* Laptop: Max 400px */
      lg:max-h-[500px]  /* Desktop: Max 500px */
    "
  />

  <!-- Background image with responsive height -->
  <div
    class="
      w-full
      h-64              /* Mobile: 256px */
      md:h-80           /* Laptop: 320px */
      lg:h-96           /* Desktop: 384px */
      bg-cover
      bg-center
      rounded-lg
    "
    :style="{ backgroundImage: `url(${imageSrc})` }"
  />
</template>
```

## Bonus: Typography Scaling

```vue
<template>
  <h1 class="
    text-3xl          /* Mobile: 30px */
    md:text-4xl       /* Laptop: 36px */
    lg:text-5xl       /* Desktop: 48px */
    xl:text-6xl       /* Large: 60px */
    font-bold
    leading-tight
    md:leading-none
  ">
    {{ title }}
  </h1>

  <p class="
    text-base         /* Mobile: 16px */
    md:text-lg        /* Laptop+: 18px */
    leading-normal
  ">
    {{ description }}
  </p>
</template>
```

## Bonus: Spacing & Padding

```vue
<template>
  <section class="
    px-4              /* Mobile: 1rem */
    md:px-8           /* Laptop: 2rem */
    lg:px-12          /* Desktop: 3rem */
    py-8              /* Mobile: 2rem */
    md:py-12          /* Laptop: 3rem */
    lg:py-16          /* Desktop: 4rem */
  ">
    <div class="max-w-7xl mx-auto">
      <!-- Content -->
    </div>
  </section>
</template>
```
